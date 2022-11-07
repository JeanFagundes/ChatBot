/* eslint-disable no-unused-expressions */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.presencial.create({
    data: {
      phoneId: '5511954406674',
      user: 'jean',
      starting: true,
      escritorio: 'faria',
    },
  });
}

main();
