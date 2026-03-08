import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // We will do the DB validation here.
        // NOTE: NextAuth 5 middleware triggers authorize in Edge runtime
        // so we must fetch via a non-Prisma route or accept that Prisma Client
        // runs via Accelerate in Edge.

        const { z } = await import("zod");
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          // Prisma can't run in Vercel Edge without Accelerate/driver adapters
          // Since authorize runs during POST /api/auth/callback/credentials (Node.js runtime, normally)
          // we can import prisma dynamically or just use standard import IF middleware doesn't import this file
          const { prisma } = await import("./lib/prisma");
          const bcrypt = (await import("bcryptjs")).default;

          const admin = await prisma.admin.findUnique({
            where: { email },
          });

          if (!admin) return null;

          const passwordsMatch = await bcrypt.compare(password, admin.password);
          if (passwordsMatch) return admin;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).role = token.role as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
