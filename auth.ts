import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: authConfig.pages,
  callbacks: authConfig.callbacks,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

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
});
