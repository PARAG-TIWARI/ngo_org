const prisma = require('./src/prisma');

async function find() {
  try {
    const activity = await prisma.activity.findFirst({
      where: { title: 'plant' },
      include: { images: true }
    });
    console.log('Database Record:', JSON.stringify(activity, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

find();
