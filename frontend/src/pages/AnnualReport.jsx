import { useState, useMemo, useEffect } from 'react';
import { 
  FileText, 
  Search, 
  BookOpen, 
  MapPin, 
  Info, 
  Shield, 
  Heart, 
  Leaf, 
  Sparkles,
  Plus,
  X,
  Image as ImageIcon,
  Calendar,
  Users,
  Music,
  Award,
  TreePine,
  Shirt,
  PersonStanding
} from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

/* ======================================================================
   2024-25 DATA
   ====================================================================== */

// Structured data for the 25 schools and their planted medicinal herbs from the PDF
const schoolsData = [
  {
    id: 1,
    name: "Sarswati Vidhya Mandir Hr Sec Resident. Kerwa Dem Road Bhopal",
    nameHindi: "सरस्वती विद्या मंदिर उच्चतर माध्यमिक आवासीय विद्यालय, केरवा डैम रोड, भोपाल",
    plants: ["Googal", "Ashwagandha", "Agnimanth", "Mithi Tulsi", "Insulin", "Morenga", "Sarpgandha", "Patharchatta", "Adusa", "Sadabahar", "Sita Ashoka", "Satawari bel", "Kanchnaar", "Sagargota", "Aloe vera", "Mithi Neem", "Awla", "Harjod"]
  },
  {
    id: 2,
    name: "Chetna Velly International School, Mungaliya Chhap Bhopal",
    nameHindi: "चेतना वैली इंटरनेशनल स्कूल, मुंगालिया छाप, भोपाल",
    plants: ["Googal", "Kanchnaar", "Sagargota", "Ashwagandha", "Agnimanth", "Kalmegh", "Mithi Tulsi", "Mithi Neem", "Insulin", "Morenga", "Sarpgandha", "Patharchatta", "Harjod", "Adusa", "Aloe vera", "Satawari bel", "Sadabahar", "Awla", "Sita Ashoka", "Harr", "Giloy", "Arjun"]
  },
  {
    id: 3,
    name: "The Iconic School, Suraj Nagar Bhopal",
    nameHindi: "द आइकॉनिक स्कूल, सूरज नगर, भोपाल",
    plants: ["Googal", "Kanchnaar", "Sagargota", "Ashwagandha", "Agnimanth", "Kalmegh", "Mithi Tulsi", "Mithi Neem", "Insulin", "Satparni", "Morenga", "Sarpgandha", "Pippali", "Ulatkambal", "Patharchatta", "Bhui Awla", "Giloy", "Harjod", "Adusa", "Aloe vera", "Satawari bel", "Sadabahar"]
  },
  {
    id: 4,
    name: "Jawahar Navodaya Vidhyalaya , Ratibad Bhopal",
    nameHindi: "जवाहर नवोदय विद्यालय, रातीबड़, भोपाल",
    plants: ["Ashwagandha", "Sarpgandha", "Kalmegh", "Mithi Tulsi", "Insulin", "Patharchatta", "Aloe vera", "Sadabahar", "Morenga", "Mithi Neem", "Adusa", "Somvalli", "Awla", "Sita Ashoka", "Kanchnaar", "Nirgundi", "Tulsi", "Bahera", "Van Tulsi"]
  },
  {
    id: 5,
    name: "Govt Sardar Patel Primery School, Suraj Nagar Bhopal",
    nameHindi: "शासकीय सरदार पटेल प्राथमिक विद्यालय, सूरज नगर, भोपाल",
    plants: ["Googal", "Kanchnaar", "Sagargota", "Ashwagandha", "Agnimanth", "Kalmegh", "Mithi Tulsi", "Insulin", "Morenga", "Sarpgandha", "Patharchatta", "Adusa", "Aloe vera", "Satawari bel", "Sadabahar", "Awla", "Sita Ashoka", "Giloy", "Tulsi", "Mithi Neem", "Harjod"]
  },
  {
    id: 6,
    name: "Milestone Public School, Kolar road Bhopal",
    nameHindi: "माइलस्टोन पब्लिक स्कूल, कोलार रोड, भोपाल",
    plants: ["Googal", "Kanchnaar", "Sagargota", "Ashwagandha", "Agnimanth", "Kalmegh", "Mithi Tulsi", "Mithi Neem", "Insulin", "Morenga", "Sarpgandha", "Patharchatta", "Harjod", "Adusa", "Aloe vera", "Sadabahar", "Awla", "Sita Ashoka", "Harr", "Giloy", "Arjun", "Van Tulsi", "Somvalli"]
  },
  {
    id: 7,
    name: "Vindhyachal Academy School Kolar Road Bhopal",
    nameHindi: "विंध्याचल एकेडमी स्कूल, कोलार रोड, भोपाल",
    plants: ["Ashwagandha", "Sarpgandha", "Kalmegh", "Mithi Tulsi", "Insulin", "Patharchatta", "Sadabahar", "Morenga", "Mithi Neem", "Adusa", "Somvalli", "Kapoor Tulsi", "Awla", "Sita Ashoka", "Kanchnaar"]
  },
  {
    id: 8,
    name: "Mother Tersa Senior Secondary Co-Ed , Kolar Road Bhopal",
    nameHindi: "मदर टेरेसा सीनियर सेकेंडरी को-एड स्कूल, कोलार रोड, भोपाल",
    plants: ["Adusa", "Ashwagandha", "Sarpgandha", "Kalmegh", "Mithi Tulsi", "Insulin", "Patharchatta", "Aloe vera", "Sadabahar", "Morenga", "Mithi Neem", "Awla", "Sita Ashoka", "Kanchnaar", "Harr", "Giloy", "Arjun"]
  },
  {
    id: 9,
    name: "Govt MACT Middle School, MACT Bhopal",
    nameHindi: "शासकीय एम.ए.सी.टी. माध्यमिक विद्यालय, एम.ए.सी.टी. परिसर, भोपाल",
    plants: ["Sahatoot", "Sadabahar", "Patharchatta", "Kalmegh", "Mithi Tulsi", "Satawari bel", "Giloy", "Harjod", "Insulin", "Adusa", "Googal", "Sagargota", "Awla", "Mithi Neem", "Tulsi", "Aloe vera"]
  },
  {
    id: 10,
    name: "Sarswati Vidhya Mandir, Shivaji Nagar Bhopal",
    nameHindi: "सरस्वती विद्या मंदिर, शिवाजी नगर, भोपाल",
    plants: ["Sahatoot", "Ashwagandha", "Sadabahar", "Patharchatta", "Kalmegh", "Mithi Tulsi", "Satawari bel", "Giloy", "Insulin", "Adusa", "Sagargota", "Harjod", "Tulsi", "Mithi Neem", "Aloe vera", "Morenga", "Bahera", "Awla", "Nirgundi", "Kanchnaar", "Sita Ashoka", "Harr"]
  },
  {
    id: 11,
    name: "Narayan Education Institute, South T T Nagar Bhopal",
    nameHindi: "नारायण एजुकेशन इंस्टीट्यूट, साउथ टी.टी. नगर, भोपाल",
    plants: ["Ashwagandha", "Googal", "Agnimanth", "Sahatoot", "Sagargota", "Kalmegh", "Mithi Tulsi", "Giloy", "Mithi Neem", "Insulin", "Satawari bel", "Patharchatta", "Kanchnaar", "Satparni", "Bhui Awla", "Apamarg", "Nirgundi", "Harjod", "Sita Ashoka", "Atibala", "Bahera", "Arjun", "Kapoor Tulsi"]
  },
  {
    id: 12,
    name: "Govt Hr Sc. School, Kotra Sultanabad Bhopal",
    nameHindi: "शासकीय उच्चतर माध्यमिक विद्यालय, कोटरा सुल्तानाबाद, भोपाल",
    plants: ["Patharchatta", "Googal", "Kanchnaar", "Kapok", "Satparni", "Aloe vera", "Giloy", "Kalmegh", "Mithi Neem", "Satawari bel", "Chirchita", "Jason", "Awla", "Mithi Tulsi", "Ashwagandha", "Insulin", "Sahatoot", "Dumbel", "Harjod", "Van Tulsi"]
  },
  {
    id: 13,
    name: "Kamla neharu High Sec. school, Kotra Sultanabad Bhopal",
    nameHindi: "कमला नेहरू उच्चतर माध्यमिक विद्यालय, कोटरा सुल्तानाबाद, भोपाल",
    plants: ["Ashwagandha", "Harjod", "Dumbel", "Insulin", "Mithi Tulsi", "Awla", "Sadabahar", "Kalmegh", "Satawari bel", "Patharchatta", "Adusa", "Nirgundi", "Atibala", "Bahera", "Van Tulsi", "Aloe vera", "Tulsi"]
  },
  {
    id: 14,
    name: "Saraswati Vidhya mandir Kotra Sultanabad Bhopal",
    nameHindi: "सरस्वती विद्या मंदिर, कोटरा सुल्तानाबाद, भोपाल",
    plants: ["Ashwagandha", "Googal", "Agnimanth", "Sagargota", "Sahatoot", "Kalmegh", "Mithi Tulsi", "Giloy", "Insulin", "Satawari bel", "Patharchatta", "Kanchnaar", "Satparni", "Bhui Awla", "Apamarg", "Madhuparni", "Aloe vera"]
  },
  {
    id: 15,
    name: "Sarwati Shishu Mandir, Harshwardhan Nagar Bhopal",
    nameHindi: "सरस्वती शिशु मंदिर, हर्षवर्धन नगर, भोपाल",
    plants: ["Sahatoot", "Ashwagandha", "Agnimanth", "Sadabahar", "Patharchatta", "Kalmegh", "Mithi Tulsi", "Brahmi", "Satawari bel", "Aloe vera", "Giloy", "Harjod", "Insulin", "Apamarg", "Adusa", "Morenga", "Satparni", "Van Tulsi", "Nirgundi", "Googal", "Kanchnaar", "Sita Ashoka"]
  },
  {
    id: 16,
    name: "Govt. Naveen Girls H Sec School Tulsi Nagar Bhopal",
    nameHindi: "शासकीय नवीन कन्या उच्चतर माध्यमिक विद्यालय, तुलसी नगर, भोपाल",
    plants: ["Sahatoot", "Ashwagandha", "Sadabahar", "Agnimanth", "Patharchatta", "Kalmegh", "Mithi Tulsi", "Brahmi", "Satawari bel", "Aloe vera", "Giloy", "Harjod", "Insulin", "Apamarg", "Adusa", "Googal", "Bhui Awla", "Morenga", "Bahera", "Nirgundi", "Awla", "Jamun"]
  },
  {
    id: 17,
    name: "Sarswati Vidhya Mandir, E4 Arera Coloney Bhopal",
    nameHindi: "सरस्वती विद्या मंदिर, ई-4 अरेरा कॉलोनी, भोपाल",
    plants: ["Googal", "Kanchnaar", "Mithi Neem", "Agnimanth", "Awla", "Sagargota", "Morenga", "Sahatoot", "Insulin", "Satparni", "Sadabahar", "Patharchatta", "Adusa", "Ulatkambal", "Aloe vera", "Ashwagandha", "Satawari bel", "Van Tulsi"]
  },
  {
    id: 18,
    name: "Banyan Tree School, Suraj Nagar Road Bisankhedi Bhopal",
    nameHindi: "बनयान ट्री स्कूल, सूरज नगर रोड, बिशनखेड़ी, भोपाल",
    plants: ["Googal", "Sagargota", "Ashwagandha", "Agnimanth", "Kalmegh", "Mithi Tulsi", "Mithi Neem", "Insulin", "Satparni", "Morenga", "Sarpgandha", "Patharchatta", "Harjod", "Adusa", "Aloe vera", "Satawari bel", "Sadabahar", "Awla", "Sita Ashoka"]
  },
  {
    id: 19,
    name: "Kempfort Public  School, Kolar Road Bhopal",
    nameHindi: "केम्पफ़ोर्ट पब्लिक स्कूल, कोलार रोड, भोपाल",
    plants: ["Googal", "Kanchnaar", "Ashwagandha", "Agnimanth", "Kalmegh", "Mithi Tulsi", "Mithi Neem", "Insulin", "Sarpgandha", "Patharchatta", "Adusa", "Aloe vera", "Satawari bel", "Sadabahar", "Awla", "Sita Ashoka", "Harr", "Giloy", "Arjun", "Bahera", "Jamun"]
  },
  {
    id: 20,
    name: "Azad Public School, Kolar Road Bhopal",
    nameHindi: "आजाद पब्लिक स्कूल, कोलार रोड, भोपाल",
    plants: ["Googal", "Kanchnaar", "Ashwagandha", "Agnimanth", "Kalmegh", "Mithi Neem", "Insulin", "Sarpgandha", "Patharchatta", "Aloe vera", "Satawari bel", "Awla", "Sita Ashoka", "Giloy", "Arjun", "Bahera"]
  },
  {
    id: 21,
    name: "Sagar Public School, Bhopal",
    nameHindi: "सागर पब्लिक स्कूल, भोपाल",
    plants: ["Ashwagandha", "Kalmegh", "Mithi Tulsi", "Insulin", "Patharchatta", "Aloe vera", "Sadabahar", "Nirgundi", "Mithi Neem", "Adusa", "Kapoor Tulsi", "Awla", "Sita Ashoka", "Kanchnaar", "Bahera", "Van Tulsi", "Googal", "Tulsi", "Ulatkambal", "Morenga", "Neembu Ghas", "Aprajita", "Sahatoot", "Giloy"]
  },
  {
    id: 22,
    name: "Govt  Higher Sc, School, Suraj Nagar Bhadbhada road  Bhopal",
    nameHindi: "शासकीय उच्चतर माध्यमिक विद्यालय, सूरज नगर, भदभदा रोड, भोपाल",
    plants: ["Ashwagandha", "Sarpgandha", "Mithi Tulsi", "Insulin", "Patharchatta", "Aloe vera", "Sadabahar", "Adusa", "Nirgundi", "Tulsi", "Bahera", "Van Tulsi", "Satawari bel", "Atibala", "Ulatkambal", "Kanchnaar"]
  },
  {
    id: 23,
    name: "Capital covent high School, Ambedkar School",
    nameHindi: "कैपिटल कॉन्वेंट हाई स्कूल, अम्बेडकर नगर, भोपाल",
    plants: ["Ashwagandha", "Sarpgandha", "Kalmegh", "Mithi Tulsi", "Insulin", "Patharchatta", "Aloe vera", "Sadabahar", "Tulsi", "Nirgundi"]
  },
  {
    id: 24,
    name: "Seven Hills Public Higher Secondary School, E5 Arera Coloney",
    nameHindi: "सेवन हिल्स पब्लिक उच्चतर माध्यमिक विद्यालय, ई-5 अरेरा कॉलोनी, भोपाल",
    plants: ["Bahera", "Nirgundi", "Awla", "Harr", "Sita Ashoka", "Kanchnaar", "Mithi Neem", "Patharchatta", "Adusa", "Sahatoot", "Ulatkambal", "Ashwagandha", "Sarpgandha", "Mithi Tulsi", "Insulin", "Van Tulsi", "Sadabahar"]
  },
  {
    id: 25,
    name: "Maharshi Vidhya mandir, Sahpura Bhopal",
    nameHindi: "महर्षि विद्या मंदिर, शाहपुरा, भोपाल",
    plants: ["Ulatkambal", "Ashwagandha", "Sarpgandha", "Sadabahar", "Satawari bel", "Kanchnaar", "Mithi Tulsi", "Insulin", "Van Tulsi", "Patharchatta", "Awla", "Adusa", "Harr", "Mithi Neem", "Nirgundi"]
  }
];

// Extracted image gallery configurations for 2024-25
const galleryImages2024 = [
  // Page 6 images
  { src: '/annual_report_images/page_6_img_1.jpg', cat: 'phase1', label: 'Vindhyachal Academy Garden' },
  { src: '/annual_report_images/page_6_img_2.jpg', cat: 'phase1', label: 'Herbal Garden Development' },
  { src: '/annual_report_images/page_6_img_3.jpg', cat: 'phase1', label: 'Jawahar Navodaya Garden' },
  { src: '/annual_report_images/page_6_img_4.jpg', cat: 'phase1', label: 'Medicinal Herbs Nursery' },
  { src: '/annual_report_images/page_6_img_5.jpg', cat: 'phase1', label: 'Sagar Public School Garden' },
  { src: '/annual_report_images/page_6_img_6.jpg', cat: 'phase1', label: 'Student Planting Drive' },
  { src: '/annual_report_images/page_6_img_7.jpg', cat: 'phase1', label: 'Ayush Garden Exhibition' },
  // Page 7 images
  { src: '/annual_report_images/page_7_img_1.jpg', cat: 'phase2', label: 'The Iconic School Garden' },
  { src: '/annual_report_images/page_7_img_2.jpg', cat: 'phase2', label: 'Kamla Nehru Garden Phase 1' },
  { src: '/annual_report_images/page_7_img_3.jpg', cat: 'phase2', label: 'Medicinal Botanical Tags' },
  { src: '/annual_report_images/page_7_img_4.jpg', cat: 'phase2', label: 'Kamla Nehru Garden Phase 2' },
  { src: '/annual_report_images/page_7_img_5.jpg', cat: 'phase2', label: 'Display Boards Installation' },
  // Page 8 images
  { src: '/annual_report_images/page_8_img_1.jpg', cat: 'phase3', label: 'Kempfort School Herbal Plots' },
  { src: '/annual_report_images/page_8_img_2.jpg', cat: 'phase3', label: 'Herbs Care and Irrigation' },
  { src: '/annual_report_images/page_8_img_3.jpg', cat: 'phase3', label: 'Kapoor Tulsi & Aloe Plots' },
  { src: '/annual_report_images/page_8_img_4.jpg', cat: 'phase3', label: 'Fencing & Saplings Protection' },
  { src: '/annual_report_images/page_8_img_5.jpg', cat: 'phase3', label: 'Kempfort School Botanical Corner' },
];

/* ======================================================================
   2025-26 DATA
   ====================================================================== */

const programs2025 = [
  {
    id: 1,
    titleHindi: 'पर्यावरण एवं स्वच्छता जागरूकता अभियान',
    titleEn: 'Environmental & Cleanliness Awareness Campaign',
    date: '04 September 2025',
    dateHindi: '04 सितम्बर 2025',
    location: 'Hari Nagar, Neelbad, Bhopal',
    locationHindi: 'हरि नगर नीलबड़, भोपाल',
    organizer: 'Maharshi Dayanand Jan Kalyan Sanstha & Nagar Nigam',
    organizerHindi: 'महर्षि दयानंद जन कल्याण संस्था व नगर निगम',
    beneficiaries: '80–150 Children & Parents',
    beneficiariesHindi: '80–150 बच्चे एवं अभिभावक',
    activity: 'Painting Competition, Prize Distribution, Awareness Lecture',
    activityHindi: 'चित्रकला प्रतियोगिता, पुरस्कार वितरण, जागरूकता व्याख्यान',
    descriptionHindi: 'महर्षि दयानंद जन कल्याण संस्था द्वारा नगर निगम के सहयोग से भोपाल के नीलबड़ क्षेत्र में पर्यावरण संरक्षण एवं स्वच्छता के प्रति जन-जागरूकता बढ़ाने के उद्देश्य से एक व्यापक जागरूकता अभियान का आयोजन किया गया। इस अभियान के अंतर्गत बच्चों में पर्यावरण के प्रति जिम्मेदारी की भावना विकसित करने हेतु एक भव्य चित्रकला प्रतियोगिता का आयोजन किया गया।',
    descriptionEn: 'A comprehensive awareness campaign was organized by Maharshi Dayanand Jan Kalyan Sanstha in collaboration with Bhopal Municipal Corporation in the Neelbad area. A grand painting competition was held to develop a sense of environmental responsibility among 80–150 children. Topics included Swachh Bharat, tree plantation, water conservation, plastic-free society, and green earth.',
    icon: TreePine,
    color: 'from-emerald-500 to-emerald-700',
    images: [
      { src: '/annual_report_2025_images/page_3_img_1.jpeg', label: 'Children painting on environmental themes' },
      { src: '/annual_report_2025_images/page_3_img_2.jpeg', label: 'Painting competition in progress' },
      { src: '/annual_report_2025_images/page_3_img_3.jpeg', label: 'Prize distribution ceremony' },
      { src: '/annual_report_2025_images/page_3_img_4.jpeg', label: 'Award winning artworks' },
    ]
  },
  {
    id: 2,
    titleHindi: 'स्वच्छता योद्धाओं को कंबल वितरण एवं सम्मान',
    titleEn: 'Blanket Distribution & Honor for Sanitation Workers',
    date: '17 December 2025',
    dateHindi: '17 दिसंबर 2025',
    location: 'Ward No. 28, Bhopal',
    locationHindi: 'वार्ड क्रमांक 28, भोपाल',
    organizer: 'Maharshi Dayanand Jan Kalyan Sanstha',
    organizerHindi: 'महर्षि दयानंद जन कल्याण संस्था',
    beneficiaries: '50 Sanitation Workers',
    beneficiariesHindi: '50 सफाई कर्मचारी',
    activity: 'Blanket Distribution & Special Meal',
    activityHindi: 'उच्च गुणवत्ता वाले कंबल एवं विशेष भोजन वितरण',
    chiefGuest: 'Shri Kishan Suryavanshi (President, Bhopal Municipal Corporation)',
    chiefGuestHindi: 'श्री किशन सूर्यवंशी (अध्यक्ष, नगर निगम भोपाल)',
    quote: '"जब पूरा शहर सो रहा होता है, तब ये स्वच्छता योद्धा मैदान में उतरकर हमारे परिवेश को स्वच्छ बनाते हैं। इनका सम्मान करना वास्तव में स्वच्छता का सम्मान है।"',
    quoteAuthor: '— श्री किशन सूर्यवंशी',
    descriptionHindi: 'राजधानी भोपाल के वार्ड क्रमांक 28 में कड़ाके की ठंड को देखते हुए महर्षि दयानंद जन कल्याण संस्था द्वारा नगर निगम भोपाल के विशेष सहयोग से स्वच्छता कर्मियों के लिए कंबल वितरण एवं सम्मान कार्यक्रम आयोजित किया गया।',
    descriptionEn: 'During the severe winter, Maharshi Dayanand Jan Kalyan Sanstha organized a blanket distribution and honor ceremony for 50 sanitation workers of Ward 28, Bhopal, with special cooperation from the Bhopal Municipal Corporation.',
    icon: Heart,
    color: 'from-rose-500 to-rose-700',
    images: [
      { src: '/annual_report_2025_images/page_4_img_1.jpeg', label: 'Blanket distribution ceremony' },
      { src: '/annual_report_2025_images/page_4_img_2.jpeg', label: 'Honoring sanitation workers' },
      { src: '/annual_report_2025_images/page_4_img_3.jpeg', label: 'Chief guest Shri Kishan Suryavanshi' },
      { src: '/annual_report_2025_images/page_4_img_4.jpeg', label: 'Group photo with workers' },
    ]
  },
  {
    id: 3,
    titleHindi: '"यादें रफी" संगीत एवं दिव्यांग सम्मान कार्यक्रम',
    titleEn: '"Yaadein Rafi" Music & Divyang Honor Program',
    date: '27 December 2025',
    dateHindi: '27 दिसंबर 2025',
    location: 'Anjani Sabhagar, Ravindra Bhavan, Bhopal',
    locationHindi: 'अंजनी सभागार, रवींद्र भवन, भोपाल',
    organizer: 'Angel Musical Group (with Sanstha support)',
    organizerHindi: 'एंजेल म्यूजिकल ग्रुप (संस्था के सहयोग से)',
    beneficiaries: 'Visually impaired & Divyang artists',
    beneficiariesHindi: 'दृष्टिहीन एवं दिव्यांग कलाकार',
    activity: 'Musical Tribute on Rafi\'s 101st Birth Anniversary',
    activityHindi: 'मोहम्मद रफी की 101वीं जयंती पर संगीतमय श्रद्धांजलि',
    descriptionHindi: 'राजधानी के प्रतिष्ठित रवींद्र भवन स्थित अंजनी सभागार में 27 दिसंबर 2025 को "यादें रफी" नामक एक भव्य संगीत कार्यक्रम का सफल आयोजन किया गया। यह शाम संगीत के जादूगर रफी साहब की 101वीं जयंती के उपलक्ष्य में उन्हें एक स्वरमयी श्रद्धांजलि अर्पित करने के लिए समर्पित थी। इस कार्यक्रम की सबसे अनूठी पहल दृष्टिहीन तथा दिव्यांग कलाकारों की भागीदारी रही।',
    descriptionEn: 'A grand musical event "Yaadein Rafi" was organized at the prestigious Anjani Hall, Ravindra Bhavan, Bhopal, on December 27, 2025, on the 101st birth anniversary of legendary singer Mohammed Rafi. The most unique initiative was the participation of visually impaired and Divyang artists who were given a dignified platform to showcase their talent.',
    icon: Music,
    color: 'from-violet-500 to-violet-700',
    images: [
      { src: '/annual_report_2025_images/page_5_img_1.jpeg', label: 'Artists performing on stage' },
      { src: '/annual_report_2025_images/page_5_img_2.jpeg', label: 'Audience enjoying the performances' },
      { src: '/annual_report_2025_images/page_5_img_3.jpeg', label: 'Divyang artists honored' },
      { src: '/annual_report_2025_images/page_5_img_4.jpeg', label: 'Grand musical tribute event' },
    ]
  },
  {
    id: 4,
    titleHindi: 'अंतरराष्ट्रीय योग दिवस कार्यक्रम',
    titleEn: 'International Yoga Day Program',
    date: '21 June 2025',
    dateHindi: '21 जून 2025',
    location: 'Capital Convent School & Kamla Nehru School, Bhopal',
    locationHindi: 'कैपिटल कान्वेंट हायर सेकण्डरी स्कूल व कमला नेहरू हायर सेकेंडरी स्कूल, भोपाल',
    organizer: 'Maharshi Dayanand Jan Kalyan Sanstha',
    organizerHindi: 'महर्षि दयानंद जन कल्याण संस्था',
    beneficiaries: 'Students & Teachers',
    beneficiariesHindi: 'छात्र एवं शिक्षक',
    activity: 'Yogasan, Pranayam, Meditation',
    activityHindi: 'योगासन, प्राणायाम, ध्यान अभ्यास',
    descriptionHindi: 'अंतरराष्ट्रीय योग दिवस के उपलक्ष्य में महर्षि दयानंद जन कल्याण संस्था और विद्यालय के प्रधानाचार्य के सहयोग से दो विद्यालयों में योग कार्यक्रम का आयोजन किया गया। छात्रों, शिक्षकों और स्टाफ सदस्यों ने उत्साहपूर्वक भाग लिया। प्रशिक्षित योग प्रशिक्षकों ने विभिन्न योगासन, प्राणायाम और ध्यान अभ्यास करवाया।',
    descriptionEn: 'On the occasion of International Yoga Day, yoga programs were organized at two schools in collaboration with the school principals. Students, teachers, and staff members participated enthusiastically. Trained yoga instructors conducted various yoga postures, pranayama, and meditation practices.',
    icon: Sparkles,
    color: 'from-amber-500 to-amber-700',
    images: [
      { src: '/annual_report_2025_images/page_6_img_1.jpeg', label: 'Yoga at Capital Convent School' },
      { src: '/annual_report_2025_images/page_6_img_2.jpeg', label: 'Students practicing yogasan' },
      { src: '/annual_report_2025_images/page_6_img_3.jpeg', label: 'Pranayam session' },
      { src: '/annual_report_2025_images/page_6_img_4.jpeg', label: 'Group yoga practice' },
      { src: '/annual_report_2025_images/page_6_img_5.jpeg', label: 'Kamla Nehru School yoga event' },
      { src: '/annual_report_2025_images/page_6_img_6.jpeg', label: 'Meditation and relaxation' },
      { src: '/annual_report_2025_images/page_7_img_1.jpeg', label: 'Yoga Day celebrations' },
      { src: '/annual_report_2025_images/page_7_img_2.jpeg', label: 'Student participation' },
    ]
  }
];

const summaryTable2025 = [
  { id: 1, program: 'पर्यावरण जागरूकता अभियान', programEn: 'Environmental Awareness Campaign', date: '04 Sep 2025', location: 'नीलबड़, भोपाल', beneficiaries: '80-150 बच्चे' },
  { id: 2, program: 'कंबल वितरण सम्मान', programEn: 'Blanket Distribution & Honor', date: '17 Dec 2025', location: 'वार्ड 28, भोपाल', beneficiaries: '50 सफाई कर्मी' },
  { id: 3, program: 'यादें रफी संगीत कार्यक्रम', programEn: 'Yaadein Rafi Music Program', date: '27 Dec 2025', location: 'रवींद्र भवन', beneficiaries: 'दिव्यांग कलाकार' },
  { id: 4, program: 'योग दिवस कार्यक्रम', programEn: 'International Yoga Day', date: '21 Jun 2025', location: 'दो विद्यालय', beneficiaries: 'छात्र-शिक्षक' },
];

const keyStats2025 = [
  { num: '4', label: 'Programs', labelHindi: 'कार्यक्रम', icon: Award },
  { num: '200+', label: 'Beneficiaries', labelHindi: 'लाभार्थी', icon: Users },
  { num: '2', label: 'Schools', labelHindi: 'विद्यालय', icon: BookOpen },
  { num: '50', label: 'Sanitation Warriors', labelHindi: 'स्वच्छता योद्धा', icon: Shield },
];

/* ======================================================================
   COMPONENT
   ====================================================================== */

export default function AnnualReport() {
  const [selectedYear, setSelectedYear] = useState('2025-26');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlantFilter, setSelectedPlantFilter] = useState('');
  const [activeSection, setActiveSection] = useState('overview');
  const [galleryCategory, setGalleryCategory] = useState('all');
  const [expandedProgram, setExpandedProgram] = useState(null);

  // Collect list of unique plants for the plant filter dropdown (2024-25)
  const uniquePlants = useMemo(() => {
    const plantsSet = new Set();
    schoolsData.forEach(school => {
      school.plants.forEach(plant => plantsSet.add(plant));
    });
    return Array.from(plantsSet).sort();
  }, []);

  // Filter schools based on search query and plant filter tag
  const filteredSchools = useMemo(() => {
    return schoolsData.filter(school => {
      const matchesSearch = 
        school.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        school.nameHindi.includes(searchTerm);
      const matchesPlant = 
        !selectedPlantFilter || school.plants.includes(selectedPlantFilter);
      return matchesSearch && matchesPlant;
    });
  }, [searchTerm, selectedPlantFilter]);

  // Filter gallery images by category tab
  const filteredGalleryImages = useMemo(() => {
    if (galleryCategory === 'all') return galleryImages2024;
    return galleryImages2024.filter(img => img.cat === galleryCategory);
  }, [galleryCategory]);

  // Handle intersection observer or scroll tracking for section indicators
  useEffect(() => {
    const sections2024 = ['overview', 'gardens', 'directory'];
    const sections2025 = ['overview25', 'programs25', 'summary25'];
    const sections = selectedYear === '2024-25' ? sections2024 : sections2025;
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedYear]);

  // Reset state when switching years
  useEffect(() => {
    setActiveSection(selectedYear === '2024-25' ? 'overview' : 'overview25');
    setSearchTerm('');
    setSelectedPlantFilter('');
    setGalleryCategory('all');
    setExpandedProgram(null);
  }, [selectedYear]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const yearConfig = {
    '2024-25': {
      badge: 'वार्षिक कार्य प्रतिवेदन • 2024-25',
      title: '2024-2025',
      subtitle: 'A highly comprehensive overview of Maharshi Dayanand Jan Kalyan Sanstha\'s impact, achievements, environmental drives, and herbal garden implementations across Madhya Pradesh.',
      coverImg: '/annual_report_cover.png',
      coverLabel: 'रिपोर्ट 2024-25',
    },
    '2025-26': {
      badge: 'वार्षिक कार्य प्रतिवेदन • 2025-26',
      title: '2025-2026',
      subtitle: 'Highlights of our community programs including environmental awareness, sanitation worker appreciation, cultural events, and wellness initiatives across Bhopal.',
      coverImg: '/annual_report_cover_2025.png',
      coverLabel: 'रिपोर्ट 2025-26',
    }
  };

  const cfg = yearConfig[selectedYear];

  return (
    <div className="min-h-screen bg-light-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900">
        <div className="absolute inset-0 hero-pattern opacity-10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Year Selector */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-white/10 rounded-2xl p-1.5 backdrop-blur-md border border-white/10">
              {['2025-26', '2024-25'].map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                    selectedYear === year
                      ? 'bg-white text-dark-900 shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-primary-300 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-sm">
                <FileText className="w-3.5 h-3.5" />
                {cfg.badge}
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Annual Report
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">
                  {cfg.title}
                </span>
              </h1>
              <p className="text-gray-300 text-lg mb-8 max-w-xl leading-relaxed">
                {cfg.subtitle}
              </p>
            </div>

            {/* Hero Right Visual */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500 opacity-75 group-hover:opacity-100" />
                <div className="relative bg-white/5 rounded-2xl p-4 border border-white/10 backdrop-blur-sm shadow-2xl">
                  <img
                    src={cfg.coverImg}
                    alt="Annual Report Cover"
                    className="w-72 md:w-80 h-auto rounded-xl shadow-inner object-cover"
                  />
                  <div className="absolute bottom-8 left-8 right-8 bg-dark-900/80 backdrop-blur-md rounded-xl px-5 py-3 border border-white/10">
                    <p className="text-white font-heading font-bold text-sm">वार्षिक प्रतिवेदन</p>
                    <p className="text-primary-300 text-xs">{cfg.coverLabel}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Scroll-spy Navigation Sub-bar */}
      <nav className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200/80 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto py-3 gap-2 scrollbar-none">
            {selectedYear === '2024-25' ? (
              <>
                {[
                  { id: 'overview', label: 'Overview (विवरण)' },
                  { id: 'gardens', label: 'Ayush Project (आयुष हर्बल)' },
                  { id: 'directory', label: 'School Directory (स्कूल सूची)' },
                ].map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`whitespace-nowrap px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-primary-600 text-white shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-dark-900'
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </>
            ) : (
              <>
                {[
                  { id: 'overview25', label: 'Overview (सारांश)' },
                  { id: 'programs25', label: 'Programs (कार्यक्रम)' },
                  { id: 'summary25', label: 'Summary (वार्षिक सारांश)' },
                ].map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`whitespace-nowrap px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-primary-600 text-white shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-dark-900'
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* ============================================================
            2025-26 REPORT CONTENT
            ============================================================ */}
        {selectedYear === '2025-26' && (
          <>
            {/* Section 1: Overview */}
            <section id="overview25" className="scroll-mt-36 mb-20">
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg shadow-zinc-200/50 border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100/30 rounded-bl-full -z-10" />
                
                <div className="mb-8">
                  <span className="text-primary-600 font-bold text-xs uppercase tracking-widest flex items-center gap-1.5 mb-2">
                    <Sparkles className="w-3.5 h-3.5" /> Annual Overview
                  </span>
                  <h2 className="font-heading text-3xl font-bold text-dark-900">
                    Year at a Glance — 2025-26
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">वर्ष 2025-26 की प्रमुख गतिविधियाँ एवं उपलब्धियाँ</p>
                </div>

                {/* Key Stat Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                  {keyStats2025.map((stat, i) => (
                    <div key={i} className="bg-gradient-to-br from-light-50 to-white p-5 rounded-2xl border border-gray-100 text-center group hover:shadow-md hover:border-primary-200 transition-all duration-300">
                      <div className="w-12 h-12 mx-auto rounded-xl bg-primary-50 group-hover:bg-gradient-to-br group-hover:from-primary-500 group-hover:to-primary-700 flex items-center justify-center mb-3 transition-all duration-300">
                        <stat.icon className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <p className="font-heading text-3xl font-black text-dark-900">{stat.num}</p>
                      <p className="text-gray-600 text-xs font-semibold mt-1">{stat.label}</p>
                      <p className="text-gray-400 text-[10px]">{stat.labelHindi}</p>
                    </div>
                  ))}
                </div>

                <div className="prose max-w-none text-gray-600 leading-relaxed">
                  <p className="text-base">
                    During the year 2025-26, Maharshi Dayanand Jan Kalyan Sanstha organized <strong>4 significant community programs</strong> impacting over <strong>200+ beneficiaries</strong> across Bhopal. Our initiatives spanned environmental awareness, social welfare for sanitation workers, cultural events honoring Divyang artists, and wellness programs through International Yoga Day celebrations.
                  </p>
                  <p className="text-sm text-gray-500 italic mt-3">
                    वर्ष 2025-26 में महर्षि दयानंद जन कल्याण संस्था ने भोपाल में 4 महत्वपूर्ण सामुदायिक कार्यक्रम आयोजित किए, जिनसे 200 से अधिक लाभार्थी लाभान्वित हुए। हमारी पहलों में पर्यावरण जागरूकता, स्वच्छता कर्मियों के लिए सामाजिक कल्याण, दिव्यांग कलाकारों का सम्मान और अंतरराष्ट्रीय योग दिवस समारोह शामिल रहे।
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: Programs */}
            <section id="programs25" className="scroll-mt-36 mb-20">
              <div className="text-center mb-10">
                <SectionTitle
                  title="Programs & Events"
                  subtitle="Detailed coverage of all 4 community programs organized during 2025-26"
                />
                <p className="text-gray-500 text-xs mt-1">वर्ष 2025-26 के सभी 4 कार्यक्रमों का विस्तृत विवरण</p>
              </div>

              <div className="space-y-8">
                {programs2025.map((prog) => (
                  <div
                    key={prog.id}
                    className="bg-white rounded-3xl shadow-lg shadow-zinc-200/50 border border-gray-100 overflow-hidden group"
                  >
                    {/* Program Header */}
                    <div className={`bg-gradient-to-r ${prog.color} p-6 md:p-8 relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                      <div className="relative z-10">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center shrink-0 backdrop-blur-sm">
                            <prog.icon className="w-7 h-7 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-white/70 text-xs font-bold uppercase tracking-wider">कार्यक्रम {prog.id}</span>
                            <h3 className="font-heading text-xl md:text-2xl font-bold text-white mt-1 leading-tight">
                              {prog.titleEn}
                            </h3>
                            <p className="text-white/80 text-sm mt-1">{prog.titleHindi}</p>
                          </div>
                        </div>

                        {/* Quick metadata chips */}
                        <div className="flex flex-wrap gap-2 mt-5">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/15 text-white/90 text-xs font-medium backdrop-blur-sm">
                            <Calendar className="w-3.5 h-3.5" /> {prog.date}
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/15 text-white/90 text-xs font-medium backdrop-blur-sm">
                            <MapPin className="w-3.5 h-3.5" /> {prog.location}
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/15 text-white/90 text-xs font-medium backdrop-blur-sm">
                            <Users className="w-3.5 h-3.5" /> {prog.beneficiaries}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Program Body */}
                    <div className="p-6 md:p-8">
                      {/* Detail grid */}
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        <div className="bg-light-50 rounded-xl p-4 border border-gray-100">
                          <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-wider mb-1">Organizer / आयोजक</p>
                          <p className="text-dark-900 text-sm font-medium">{prog.organizer}</p>
                          <p className="text-gray-500 text-xs">{prog.organizerHindi}</p>
                        </div>
                        <div className="bg-light-50 rounded-xl p-4 border border-gray-100">
                          <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-wider mb-1">Activity / गतिविधि</p>
                          <p className="text-dark-900 text-sm font-medium">{prog.activity}</p>
                          <p className="text-gray-500 text-xs">{prog.activityHindi}</p>
                        </div>
                        {prog.chiefGuest && (
                          <div className="bg-light-50 rounded-xl p-4 border border-gray-100">
                            <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-wider mb-1">Chief Guest / मुख्य अतिथि</p>
                            <p className="text-dark-900 text-sm font-medium">{prog.chiefGuest}</p>
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      <div className="mb-6">
                        <p className="text-gray-700 text-sm leading-relaxed">{prog.descriptionEn}</p>
                        <p className="text-gray-500 text-xs leading-relaxed mt-3 italic">{prog.descriptionHindi}</p>
                      </div>

                      {/* Quote (if exists) */}
                      {prog.quote && (
                        <div className="bg-gradient-to-r from-primary-50 to-primary-100/50 p-5 rounded-2xl border border-primary-100 mb-6">
                          <p className="text-primary-800 text-sm font-medium leading-relaxed italic">{prog.quote}</p>
                          <p className="text-primary-600 text-xs font-bold mt-2">{prog.quoteAuthor}</p>
                        </div>
                      )}

                      {/* Images Gallery */}
                      <div>
                        <h4 className="font-heading font-bold text-dark-900 text-sm mb-4 flex items-center gap-2">
                          <ImageIcon className="w-4 h-4 text-primary-600" />
                          Event Photos (कार्यक्रम चित्र)
                        </h4>
                        <div className={`grid gap-3 ${prog.images.length <= 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-4'}`}>
                          {prog.images.map((img, idx) => (
                            <div key={idx} className="group/img relative overflow-hidden rounded-xl bg-gray-100 aspect-[4/3] shadow-sm border border-gray-100">
                              <img
                                src={img.src}
                                alt={img.label}
                                className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-dark-950/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end p-3">
                                <p className="text-white text-[10px] font-semibold truncate w-full">{img.label}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 3: Annual Summary Table */}
            <section id="summary25" className="scroll-mt-36 mb-20">
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg shadow-zinc-200/50 border border-gray-100">
                <div className="mb-8">
                  <span className="text-primary-600 font-bold text-xs uppercase tracking-widest flex items-center gap-1.5 mb-2">
                    <FileText className="w-3.5 h-3.5" /> Annual Summary
                  </span>
                  <h2 className="font-heading text-3xl font-bold text-dark-900">
                    वार्षिक सारांश 2025-26
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">Annual Summary — All Programs at a Glance</p>
                </div>

                {/* Summary Table */}
                <div className="overflow-x-auto rounded-2xl border border-gray-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
                        <th className="text-left px-5 py-4 font-semibold text-xs uppercase tracking-wider">क्र.</th>
                        <th className="text-left px-5 py-4 font-semibold text-xs uppercase tracking-wider">कार्यक्रम / Program</th>
                        <th className="text-left px-5 py-4 font-semibold text-xs uppercase tracking-wider">दिनांक / Date</th>
                        <th className="text-left px-5 py-4 font-semibold text-xs uppercase tracking-wider">स्थान / Location</th>
                        <th className="text-left px-5 py-4 font-semibold text-xs uppercase tracking-wider">लाभार्थी / Beneficiaries</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {summaryTable2025.map((row) => (
                        <tr key={row.id} className="hover:bg-light-50 transition-colors">
                          <td className="px-5 py-4">
                            <span className="w-7 h-7 rounded-lg bg-primary-50 text-primary-600 font-heading font-bold text-xs flex items-center justify-center">
                              {row.id}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <p className="font-semibold text-dark-900">{row.programEn}</p>
                            <p className="text-gray-500 text-xs mt-0.5">{row.program}</p>
                          </td>
                          <td className="px-5 py-4 text-gray-700 whitespace-nowrap">{row.date}</td>
                          <td className="px-5 py-4 text-gray-700">{row.location}</td>
                          <td className="px-5 py-4 text-gray-700">{row.beneficiaries}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Bottom Tag */}
                <div className="mt-8 bg-gradient-to-r from-dark-900 to-dark-800 rounded-2xl p-6 text-center relative overflow-hidden">
                  <div className="absolute inset-0 hero-pattern opacity-20" />
                  <div className="relative z-10">
                    <p className="text-white font-heading font-bold text-base mb-1">
                      महर्षि दयानंद जन कल्याण संस्था, भोपाल
                    </p>
                    <p className="text-gray-400 text-xs">
                      समाज सेवा, शिक्षा एवं संस्कृति के प्रति प्रतिबद्ध
                    </p>
                    <p className="text-primary-400 text-xs mt-1">
                      Committed to Social Service, Education & Culture
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}


        {/* ============================================================
            2024-25 REPORT CONTENT (EXISTING)
            ============================================================ */}
        {selectedYear === '2024-25' && (
          <>
            {/* Section 1: Overview */}
            <section id="overview" className="scroll-mt-36 mb-20">
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg shadow-zinc-200/50 border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100/30 rounded-bl-full -z-10" />
                
                <div className="mb-8">
                  <span className="text-primary-600 font-bold text-xs uppercase tracking-widest flex items-center gap-1.5 mb-2">
                    <Leaf className="w-3.5 h-3.5" /> Project Overview
                  </span>
                  <h2 className="font-heading text-3xl font-bold text-dark-900">
                    School Ayush Herbal Garden Project
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">आयुष स्कूल हर्बल गार्डन परियोजना — भोपाल मध्य प्रदेश</p>
                </div>

                {/* Quick Metrics */}
                <div className="grid md:grid-cols-3 gap-8 mb-10">
                  <div className="bg-light-50 p-6 rounded-2xl border border-gray-100">
                    <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Project Proposal</p>
                    <p className="text-dark-900 font-semibold text-base leading-snug">
                      Development of School Ayush Herbal Garden in Madhya Pradesh
                    </p>
                  </div>
                  <div className="bg-light-50 p-6 rounded-2xl border border-gray-100">
                    <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Project Number</p>
                    <p className="text-dark-900 font-mono text-sm leading-snug break-all font-semibold">
                      Z-18017/188/CSS/NGO/SHG/MP-02/2023-24-NMPB-VIII
                    </p>
                  </div>
                  <div className="bg-light-50 p-6 rounded-2xl border border-gray-100">
                    <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Agency In-Charge</p>
                    <p className="text-dark-900 font-semibold text-base leading-snug">
                      Maharshi Dayanand Jan Kalyan Sanstha, Bhopal
                    </p>
                  </div>
                </div>

                <div className="prose max-w-none text-gray-600 leading-relaxed space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-dark-900 mb-2">Introduction (परिचय)</h3>
                    <p className="text-base">
                      The **AYUSH School Herbal Garden** is an exemplary initiative aimed at creating awareness among students about the medicinal benefits of local herbs and plants. Under this project, targeted herbal gardens were established in **25 selected schools** around Bhopal. Information display plates and banners were placed alongside each plant. This effort grants children a hands-on opportunity to study natural remedies, traditional treatment methodologies, and the conservation of biological resources.
                    </p>
                    <p className="text-sm text-gray-500 italic mt-2">
                      आयुष स्कूल हर्बल गार्डन छात्रों को औषधीय पौधों के लाभों के प्रति जागरूक करने के लिए एक अनूठी पहल है। इसके तहत भोपाल के 25 स्कूलों में बगीचे विकसित किए गए हैं।
                    </p>
                  </div>

                  <hr className="border-gray-100 my-8" />

                  <div>
                    <h3 className="text-lg font-bold text-dark-900 mb-4">Key Project Objectives (उद्देश्य)</h3>
                    <div className="grid sm:grid-cols-3 gap-6">
                      {[
                        {
                          num: '01',
                          title: 'Establish Gardens',
                          desc: 'Establish functional, rich herbal gardens containing over 20+ species of medicinal plants in 25 schools of the Bhopal region.',
                          icon: Leaf,
                        },
                        {
                          num: '02',
                          title: 'Informative Displays',
                          desc: 'Deploy informative banners and display plates for each species detailing their scientific name, properties, and usage.',
                          icon: Info,
                        },
                        {
                          num: '03',
                          title: 'Educate Communities',
                          desc: 'Spread deep knowledge about natural health solutions, environmental balance, and herbal usage to students and parents.',
                          icon: BookOpen,
                        },
                      ].map((obj, i) => (
                        <div key={i} className="bg-white p-5 rounded-xl border border-gray-200/60 shadow-sm relative group hover:border-primary-400 transition-colors">
                          <div className="absolute top-4 right-4 text-3xl font-heading font-black text-gray-100 group-hover:text-primary-100 transition-colors">
                            {obj.num}
                          </div>
                          <obj.icon className="w-8 h-8 text-primary-600 mb-4" />
                          <h4 className="font-heading font-bold text-dark-900 mb-2">{obj.title}</h4>
                          <p className="text-gray-500 text-xs leading-relaxed">{obj.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Ayush Project Actions & Benefits */}
            <section id="gardens" className="scroll-mt-36 mb-20">
              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                {/* Actions details */}
                <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg shadow-zinc-200/50 border border-gray-100">
                  <span className="text-primary-600 font-bold text-xs uppercase tracking-widest flex items-center gap-1.5 mb-2">
                    <Sparkles className="w-3.5 h-3.5" /> Action Plan
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-dark-900 mb-6">
                    Implementation Details (कार्यविवरण)
                  </h3>
                  <div className="space-y-6">
                    {[
                      {
                        title: 'Herbal Planting & Selection (पौधों का रोपण)',
                        desc: 'Planted essential medicinal species including Tulsi, Amla, Aloe Vera, Adusa, Neem, Sadabahar, Nirgundi, Ashwagandha, and Kapoor Tulsi in school grounds.',
                        icon: Leaf
                      },
                      {
                        title: 'Educational Banners (प्रदर्शन बोर्ड)',
                        desc: 'Installed weatherproof information plates near each plant detailing the scientific classification, medicinal properties, cultural importance, and usage guidelines.',
                        icon: Info
                      },
                      {
                        title: 'Banners Content (वैज्ञानिक विवरण)',
                        desc: 'Each display contains scientific names, plant numbers, and practical remedies (e.g., benefits of Aloe Vera on skin health or Tulsi for cough and immunity).',
                        icon: FileText
                      },
                      {
                        title: 'Plant Protection Fences (सुरक्षा व्यवस्था)',
                        desc: 'Fitted bamboo screens or iron mesh guards around young saplings in several schools to protect them from younger children and grazing.',
                        icon: Shield
                      }
                    ].map((act, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                          <act.icon className="w-5 h-5 text-primary-600" />
                        </div>
                        <div>
                          <h4 className="font-heading font-semibold text-dark-900 text-sm mb-1">{act.title}</h4>
                          <p className="text-gray-600 text-xs leading-relaxed">{act.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits Card */}
                <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg shadow-zinc-200/50 border border-gray-100 flex flex-col justify-between">
                  <div>
                    <span className="text-primary-600 font-bold text-xs uppercase tracking-widest flex items-center gap-1.5 mb-2">
                      <Heart className="w-3.5 h-3.5" /> Benefits & Value
                    </span>
                    <h3 className="font-heading text-2xl font-bold text-dark-900 mb-6">
                      Project Benefits & Outcomes (लाभ एवं महत्व)
                    </h3>
                    <div className="space-y-6">
                      {[
                        {
                          title: 'Education & Student Awareness (शिक्षा और जागरूकता)',
                          desc: 'Cultivates knowledge regarding traditional Ayurveda and organic botanical remedies directly within school learning models.',
                          color: 'border-l-4 border-blue-500'
                        },
                        {
                          title: 'Health & Lifestyle Benefits (स्वास्थ्य सुधार)',
                          desc: 'Encourages students and staff to adopt natural healthcare practices, boost immunity, and understand everyday herbal remedies.',
                          color: 'border-l-4 border-emerald-500'
                        },
                        {
                          title: 'Environmental Protection (पर्यावरण संरक्षण)',
                          desc: 'Increases local biodiversity, improves school air and soil quality, and shapes a positive attitude in children towards nature.',
                          color: 'border-l-4 border-purple-500'
                        }
                      ].map((ben, i) => (
                        <div key={i} className={`pl-4 bg-light-50/50 p-4 rounded-r-xl ${ben.color}`}>
                          <h4 className="font-heading font-bold text-dark-900 text-sm mb-1">{ben.title}</h4>
                          <p className="text-gray-600 text-xs leading-relaxed">{ben.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-primary-50 to-primary-100/50 p-4 rounded-2xl border border-primary-100 text-center mt-6">
                    <p className="text-primary-800 text-xs font-semibold leading-relaxed">
                      "Every school garden contains a minimum of 20+ species of medicinal plants customized to grow in local soil."
                    </p>
                  </div>
                </div>
              </div>

              {/* Project Gallery - Photos Extracted From PDF */}
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg shadow-zinc-200/50 border border-gray-100">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                  <div>
                    <span className="text-primary-600 font-bold text-xs uppercase tracking-widest flex items-center gap-1.5 mb-2">
                      <ImageIcon className="w-3.5 h-3.5" /> Project Gallery
                    </span>
                    <h3 className="font-heading text-2xl font-bold text-dark-900">
                      Herbal Garden Visual Records (परियोजना चित्र)
                    </h3>
                    <p className="text-gray-500 text-xs mt-1">Real photos extracted directly from the official PDF report</p>
                  </div>
                  
                  {/* Category Filter Tabs */}
                  <div className="flex flex-wrap gap-1.5 bg-light-50 p-1.5 rounded-xl border border-gray-200/60 w-full md:w-auto">
                    {[
                      { id: 'all', label: 'All Photos' },
                      { id: 'phase1', label: 'Phase 1 (पेज 6)' },
                      { id: 'phase2', label: 'Phase 2 (पेज 7)' },
                      { id: 'phase3', label: 'Phase 3 (पेज 8)' },
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setGalleryCategory(tab.id)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
                          galleryCategory === tab.id
                            ? 'bg-primary-600 text-white shadow-sm'
                            : 'text-gray-500 hover:text-dark-900 hover:bg-white'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Masonry-like responsive grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredGalleryImages.map((img, i) => (
                    <div key={i} className="group relative overflow-hidden rounded-2xl bg-gray-100 aspect-square shadow-sm border border-gray-100">
                      <img
                        src={img.src}
                        alt={img.label}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-dark-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <p className="text-white text-xs font-semibold truncate w-full">{img.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section 3: School Directory */}
            <section id="directory" className="scroll-mt-36 mb-20">
              <div className="text-center mb-10">
                <SectionTitle
                  title="Interactive School Directory"
                  subtitle="Browse through the 25 selected schools in Bhopal to view the specific medicinal plants planted in each garden."
                />
                <p className="text-gray-500 text-xs mt-1">25 स्कूल और उनके औषधीय बगीचे — खोज और फ़िल्टर करें</p>
              </div>

              {/* Search, Filter, & Count Bar */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by school name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none text-xs"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2 w-full md:w-auto items-center justify-end">
                  <span className="text-gray-500 text-xs font-medium mr-2">Filter by Plant:</span>
                  <select
                    value={selectedPlantFilter}
                    onChange={(e) => setSelectedPlantFilter(e.target.value)}
                    className="px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none text-xs bg-white cursor-pointer min-w-[150px]"
                  >
                    <option value="">All Plants (सभी पौधे)</option>
                    {uniquePlants.map((plant, idx) => (
                      <option key={idx} value={plant}>{plant}</option>
                    ))}
                  </select>
                  
                  {selectedPlantFilter && (
                    <button
                      onClick={() => setSelectedPlantFilter('')}
                      className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors text-gray-600"
                      title="Clear Plant Filter"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Directory Count Info */}
              <div className="flex justify-between items-center mb-6 px-2">
                <p className="text-gray-500 text-xs font-semibold">
                  Showing <span className="text-primary-600">{filteredSchools.length}</span> of {schoolsData.length} Schools
                </p>
                {selectedPlantFilter && (
                  <span className="px-3 py-1 bg-primary-50 border border-primary-200 text-primary-700 rounded-full text-xs font-semibold">
                    Planted: {selectedPlantFilter}
                  </span>
                )}
              </div>

              {/* Directory Grid */}
              {filteredSchools.length === 0 ? (
                <div className="bg-white rounded-3xl py-20 text-center text-gray-500 border border-gray-100">
                  <Info className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm font-semibold">No schools match your search parameters.</p>
                  <button 
                    onClick={() => { setSearchTerm(''); setSelectedPlantFilter(''); }}
                    className="mt-3 px-4 py-2 bg-primary-100 text-primary-700 text-xs font-semibold rounded-lg hover:bg-primary-200 transition-colors"
                  >
                    Reset Search Filters
                  </button>
                </div>
              ) : (
                <div className="grid lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: All School Names */}
                  <div className="lg:col-span-5 bg-white rounded-3xl border border-gray-200/80 shadow-md p-6">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                      <h3 className="font-heading font-bold text-dark-900 text-base">
                        Schools (विद्यालय सूची)
                      </h3>
                      <span className="bg-primary-50 text-primary-700 text-xs font-bold px-2.5 py-1 rounded-full">
                        {filteredSchools.length} Found
                      </span>
                    </div>
                    
                    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin">
                      {filteredSchools.map((school) => {
                        return (
                          <div
                            key={school.id}
                            className="p-4 rounded-2xl border border-gray-150 hover:border-primary-200 hover:bg-light-50/50 transition-all duration-200"
                          >
                            <div className="flex gap-3.5 items-start">
                              <div className="w-8 h-8 rounded-xl font-heading font-black flex items-center justify-center shrink-0 text-xs border bg-primary-50 border-primary-100 text-primary-600">
                                {school.id}
                              </div>
                              <div className="min-w-0 flex-1">
                                <h4 className="font-heading font-bold text-sm leading-snug text-dark-900">
                                  {school.name}
                                </h4>
                                <p className="text-xs text-gray-500 mt-1">
                                  {school.nameHindi}
                                </p>
                                <div className="mt-2.5 flex items-center justify-between text-[10px] text-gray-400 font-medium">
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3 text-primary-500" />
                                    Bhopal, MP
                                  </span>
                                  <span className="px-2 py-0.5 rounded-md font-bold bg-light-100 text-gray-500">
                                    {school.plants.length} Species
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column: Plant Names */}
                  <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200/80 shadow-md p-6">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                      <h3 className="font-heading font-bold text-dark-900 text-base">
                        All Planted Medicinal Herbs (समस्त औषधीय पौधे)
                      </h3>
                      <span className="bg-primary-50 text-primary-700 text-xs font-bold px-2.5 py-1 rounded-full">
                        {uniquePlants.length} Unique Species
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[600px] overflow-y-auto pr-1 scrollbar-thin">
                      {uniquePlants.map((plant, idx) => {
                        const isFilteredMatch = selectedPlantFilter === plant;
                        return (
                          <button
                            key={idx}
                            onClick={() => setSelectedPlantFilter(isFilteredMatch ? '' : plant)}
                            className={`p-3.5 rounded-xl border flex flex-col justify-between gap-3 transition-all duration-200 text-left cursor-pointer ${
                              isFilteredMatch
                                ? 'bg-primary-600 border-primary-600 text-white shadow-md shadow-primary-600/10'
                                : 'bg-light-50/60 border-gray-150 hover:border-primary-200 hover:bg-white'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div className={`p-1.5 rounded-lg ${
                                isFilteredMatch ? 'bg-white/20' : 'bg-primary-50'
                              }`}>
                                <Leaf className={`w-4 h-4 ${
                                  isFilteredMatch ? 'text-white' : 'text-primary-600'
                                }`} />
                              </div>
                              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                                isFilteredMatch ? 'bg-white/25 text-white' : 'bg-light-150 text-gray-500'
                              }`}>
                                #{idx + 1}
                              </span>
                            </div>
                            <div>
                              <p className={`font-heading font-bold text-xs ${
                                isFilteredMatch ? 'text-white' : 'text-dark-900'
                              }`}>
                                {plant}
                              </p>
                              <span className={`text-[10px] mt-0.5 block ${
                                isFilteredMatch ? 'text-primary-100' : 'text-gray-400'
                              }`}>
                                Medicinal Herb
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </section>
          </>
        )}

      </div>
    </div>
  );
}
