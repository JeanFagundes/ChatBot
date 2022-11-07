// /* eslint-disable no-unused-expressions */
// const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient();

// async function main() {
//   const user = await prisma.presencial.create({
//     data: {
//       phoneId: '5511954406674',
//       user: 'jean',
//       starting: true,
//       escritorio: 'faria',
//     },
//   });
// }

// // essas linhas de codigo ficao no receiveMessage, testando a escrita de arquivos.

// const user = await prisma.presencial.findUnique({
//   where: {
//     id: 1,
//   },
// });

// if (user) {
//   console.log(user.escritorio);
//   if (user.escritorio !== null) {
//     const updateUser = await prisma.presencial.update({
//       where: {
//         id: user.id,
//       },
//       data: {
//         data: answer,
//       },
//     });
//   }
// }

// main();
