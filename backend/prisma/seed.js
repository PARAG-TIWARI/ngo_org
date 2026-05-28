const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Seed default admin user
const hashedPassword = await bcrypt.hash('NGOadmin@2019', 10);

await prisma.admin.upsert({
  where: { username: 'admin' },
  update: {
    password: hashedPassword,
  },
  create: {
    username: 'admin',
    password: hashedPassword,
  },
});

console.log('✅ Default admin user created (username: admin, password: NGOadmin@2019)');
  // Seed default settings
  const defaultSettings = [
    {
      key: 'slogan',
      value: 'सेवा ही परमो धर्म: — समाज सेवा से ही राष्ट्र निर्माण होता है',
    },
    {
      key: 'about_text',
      value:
        'महर्षि दयानंद जन कल्याण संस्था एक गैर-लाभकारी संगठन है जो समाज के वंचित और जरूरतमंद वर्गों की सेवा में समर्पित है। हम शिक्षा, स्वास्थ्य, महिला सशक्तिकरण और ग्रामीण विकास के क्षेत्र में कार्यरत हैं। हमारा उद्देश्य एक समतामूलक और आत्मनिर्भर समाज का निर्माण करना है।',
    },
    {
      key: 'mission_text',
      value:
        'हमारा मिशन समाज के प्रत्येक वर्ग को शिक्षा, स्वास्थ्य और रोजगार के समान अवसर प्रदान करना है। हम ग्रामीण और शहरी क्षेत्रों में जागरूकता अभियान, कौशल विकास कार्यक्रम और सामुदायिक सेवा के माध्यम से सकारात्मक परिवर्तन लाने के लिए प्रतिबद्ध हैं।',
    },
    {
      key: 'vision_text',
      value:
        'एक ऐसे भारत की कल्पना जहाँ प्रत्येक नागरिक को शिक्षा, स्वास्थ्य और जीवन की बुनियादी सुविधाएँ उपलब्ध हों। जहाँ महिलाएँ सशक्त हों, युवा कुशल हों और गाँव आत्मनिर्भर हों।',
    },
    {
      key: 'phone',
      value: '+91 98765 43210',
    },
    {
      key: 'email',
      value: 'info@mdjankalyan.org',
    },
    {
      key: 'address',
      value: 'ग्राम पंचायत भवन, मुख्य मार्ग, जिला - उदाहरण, राज्य - मध्य प्रदेश, भारत - 462001',
    },
    {
      key: 'facebook',
      value: 'https://facebook.com/mdjankalyansanstha',
    },
    {
      key: 'instagram',
      value: 'https://instagram.com/mdjankalyansanstha',
    },
    {
      key: 'whatsapp',
      value: '+91 98765 43210',
    },
    {
      key: 'upi_id',
      value: 'mdjankalyan@upi',
    },
    {
      key: 'bank_name',
      value: 'State Bank of India',
    },
    {
      key: 'bank_account',
      value: '1234567890123456',
    },
    {
      key: 'bank_ifsc',
      value: 'SBIN0001234',
    },
  ];

  for (const setting of defaultSettings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }

  console.log('✅ Default settings seeded successfully');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
