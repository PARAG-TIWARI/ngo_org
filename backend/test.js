const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function test() {
  try {
    const a = await prisma.activity.create({
      data: {
        title: 'Test',
        description: 'Test',
        date: '2026-05-21',
        location: 'Bhopal',
        images: {
          create: [{ imageUrl: 'test.jpg', caption: 'test' }]
        }
      }
    });
    console.log('Success:', a);
  } catch(e) {
    console.error('Prisma Error:', e);
  } finally {
    await prisma.$disconnect();
  }
}
test();
