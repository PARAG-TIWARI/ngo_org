import {
  GraduationCap, TreePine, Droplets, Stethoscope, Building2,
  CheckCircle2,
} from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

const programs = [
  {
    icon: GraduationCap,
    title: 'Education Awareness',
    color: 'from-blue-500 to-blue-700',
    shadow: 'shadow-blue-500/25',
    description:
      'Our education program focuses on ensuring every child, regardless of economic background, has access to quality learning. We work in collaboration with government schools, anganwadi centres, and community leaders to drive enrollment and reduce dropout rates.',
    activities: [
      'Door-to-door school enrollment campaigns in rural areas',
      'Free tuition centres (pathshalas) for underprivileged children',
      'Distribution of textbooks, uniforms, and stationery',
      'Girls\' education awareness rallies and workshops',
      'Scholarship programs for meritorious students from BPL families',
      'Digital literacy workshops in government schools',
      'Career counselling sessions for high-school students',
      'Parent-teacher awareness meetings on importance of education',
    ],
  },
  {
    icon: TreePine,
    title: 'Environmental Protection',
    color: 'from-green-500 to-green-700',
    shadow: 'shadow-green-500/25',
    description:
      'We believe a healthy environment is the foundation of a healthy society. Our environmental initiatives engage entire communities in conservation efforts, from large-scale tree plantation drives to sustainable waste management systems.',
    activities: [
      'Annual mega tree plantation drives (500+ saplings per event)',
      'School eco-clubs and green campus initiatives',
      'Plastic waste collection and recycling awareness campaigns',
      'River and water body cleanup drives',
      'Kitchen garden and organic farming workshops',
      'Environmental awareness programs on World Environment Day',
      'Collaboration with forest departments on afforestation',
      'Air quality awareness and pollution reduction campaigns',
    ],
  },
  {
    icon: Droplets,
    title: 'Water Conservation',
    color: 'from-cyan-500 to-cyan-700',
    shadow: 'shadow-cyan-500/25',
    description:
      'Water scarcity is one of the most pressing challenges facing rural India. Our water conservation program educates communities about sustainable water use and implements practical solutions for water harvesting and management.',
    activities: [
      'Rooftop rainwater harvesting system installation',
      'Revival and restoration of traditional ponds and wells',
      'Construction of check dams and percolation pits',
      'Water quality testing and purification awareness',
      'Community workshops on efficient irrigation techniques',
      'School water conservation clubs and competitions',
      'Groundwater recharge projects in water-stressed villages',
      'Advocacy for policy-level water management reforms',
    ],
  },
  {
    icon: Stethoscope,
    title: 'Health & Nutrition',
    color: 'from-rose-500 to-rose-700',
    shadow: 'shadow-rose-500/25',
    description:
      'Good health is a fundamental right. Our health programs bridge the gap between rural communities and quality healthcare by organizing free medical camps, nutrition drives, and health awareness workshops across underserved areas.',
    activities: [
      'Free multi-specialty health camps (general, eye, dental)',
      'Blood sugar and blood pressure screening drives',
      'Maternal and child health awareness programs',
      'Nutrition awareness workshops for mothers and children',
      'Anemia detection and iron supplement distribution',
      'Mental health awareness campaigns',
      'Yoga and wellness workshops for community members',
      'Referral support for patients needing hospital care',
    ],
  },
  {
    icon: Building2,
    title: 'Rural Development',
    color: 'from-amber-500 to-amber-700',
    shadow: 'shadow-amber-500/25',
    description:
      'Sustainable rural development is at the heart of our mission. We empower villages with infrastructure, skills, and institutional support to drive their own growth, ensuring that development reaches the last mile.',
    activities: [
      'Skill development workshops (tailoring, computing, etc.)',
      'Women\'s self-help group formation and capacity building',
      'Village sanitation and ODF (Open Defecation Free) drives',
      'Road and community infrastructure improvement projects',
      'Financial literacy and micro-enterprise workshops',
      'Voter awareness and civic participation campaigns',
      'Youth leadership and personality development programs',
      'Linkage with government welfare schemes and entitlements',
    ],
  },
];

export default function Programs() {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900 overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fadeInUp">
            Our Programs
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto animate-fadeInUp delay-100">
            Comprehensive initiatives across five key areas driving sustainable change in communities
          </p>
        </div>
      </section>

      {/* Programs Detail */}
      <section className="py-20 bg-light-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {programs.map((prog, idx) => (
              <div
                key={idx}
                className={`grid lg:grid-cols-2 gap-8 items-start ${idx % 2 === 1 ? 'lg:direction-rtl' : ''}`}
              >
                {/* Info */}
                <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${prog.color} flex items-center justify-center shadow-lg ${prog.shadow}`}>
                      <prog.icon className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-dark-900">
                      {prog.title}
                    </h2>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6">{prog.description}</p>
                </div>

                {/* Activities list */}
                <div className={`bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <h4 className="font-heading font-semibold text-dark-900 mb-4">Key Activities</h4>
                  <ul className="space-y-3">
                    {prog.activities.map((act, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                        <span className="text-gray-600 text-sm leading-relaxed">{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
