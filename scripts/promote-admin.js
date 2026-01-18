const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const email = 'admin@barunateknik.com';

    console.log(`Checking role for ${email}...`);

    const user = await prisma.admin.findUnique({
        where: { email },
    });

    if (!user) {
        console.log('User not found!');
        return;
    }

    console.log(`Current role: ${user.role}`);

    if (user.role !== 'superadmin') {
        console.log('Updating role to superadmin...');
        await prisma.admin.update({
            where: { email },
            data: { role: 'superadmin' },
        });
        console.log('Update successful!');
    } else {
        console.log('User is already superadmin.');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
