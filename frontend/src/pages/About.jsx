import {
  Eye, Target, Award, Heart, Users, BookOpen,
  TreePine, Shield, Handshake, Lightbulb, Globe, Sprout,
} from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

const objectives = [
  { icon: BookOpen, title: 'Promote Education', desc: 'Ensure every child has access to quality education through enrollment drives, free tuition centres, and scholarship programs.' },
  { icon: TreePine, title: 'Protect Environment', desc: 'Drive large-scale tree plantation, waste management, and awareness campaigns for ecological sustainability.' },
  { icon: Globe, title: 'Conserve Water', desc: 'Implement rainwater harvesting, restore ponds and wells, and promote sustainable water-use practices in rural areas.' },
  { icon: Heart, title: 'Improve Health', desc: 'Organize free health camps, nutrition awareness workshops, and maternal care programs in underserved villages.' },
  { icon: Sprout, title: 'Develop Rural Areas', desc: 'Empower villages through skill training, sanitation infrastructure, self-help groups, and livelihood programs.' },
  { icon: Users, title: 'Empower Communities', desc: "Build leadership capacity at the grassroots level and support women's self-help groups and youth initiatives." },
];

const values = [
  { icon: Shield, title: 'Social Responsibility', desc: 'We hold ourselves accountable to the communities we serve, ensuring transparency and ethical practices in every initiative.' },
  { icon: Sprout, title: 'Sustainable Development', desc: 'Our programs are designed for long-term impact, focusing on solutions that communities can sustain independently.' },
  { icon: Lightbulb, title: 'Education First', desc: 'We believe education is the most powerful catalyst for social transformation and dedicate our core efforts to it.' },
  { icon: Handshake, title: 'Community Empowerment', desc: 'Every program is community-led. We facilitate, the community drives — ensuring ownership and lasting change.' },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900 overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fadeInUp">
            About Us
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto animate-fadeInUp delay-100">
            Learn about our journey, mission, and the values that drive every initiative
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-light-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle
                title="Our Story"
                subtitle="A journey of compassion, dedication, and community-driven change"
                center={false}
              />
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  <strong className="text-dark-900">Maharshi Dayanand Jan Kalyan Sanstha</strong> was
                  established with a deep-rooted belief that every citizen deserves access to education,
                  clean water, healthcare, and a healthy environment. Inspired by the reformist ideals of
                  Maharshi Dayanand Saraswati, our organization began its journey in the heartlands of
                  Madhya Pradesh.
                </p>
                <p>
                  What started as a small group of passionate social workers conducting literacy drives
                  in a few villages has grown into a comprehensive community development organization.
                  Today, we operate across multiple districts, touching thousands of lives through our
                  five core program areas.
                </p>
                <p>
                  Our approach is rooted in the belief that sustainable change comes from within
                  communities. We work alongside village panchayats, school administrations, local
                  health workers, and youth groups to identify needs, design solutions, and implement
                  programs that communities can own and sustain.
                </p>
                <p>
                  As a registered society, we maintain complete transparency in our operations and
                  finances. Every donation, every volunteer hour, and every program outcome is
                  documented and shared with our stakeholders and supporters.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 p-8 lg:p-12">
                <div className="space-y-6">
                  {[
                    { year: '2015', event: 'Founded as a grassroots initiative in Bhopal district' },
                    { year: '2017', event: 'Registered as a formal society under Societies Registration Act' },
                    { year: '2019', event: 'Expanded operations to 5 districts across MP' },
                    { year: '2021', event: 'Launched comprehensive digital literacy program' },
                    { year: '2023', event: 'Crossed 5,000 direct beneficiaries milestone' },
                    { year: '2025', event: 'Partnering with state government on rural education' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="shrink-0 w-16 text-right">
                        <span className="font-heading font-bold text-primary-600">{item.year}</span>
                      </div>
                      <div className="flex-1 relative pl-6 border-l-2 border-primary-200">
                        <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-primary-500" />
                        <p className="text-gray-700 text-sm">{item.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="w-20 h-20 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
                  <Eye className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4">Our Vision</h3>
                  <p className="text-primary-100 leading-relaxed text-lg">
                    To build an India where every citizen — regardless of caste, creed, or economic
                    status — has access to quality education, a clean environment, safe drinking
                    water, adequate healthcare, and the opportunity to lead a dignified life. We
                    envision empowered, self-reliant communities driving their own development.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-light-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center shrink-0 shadow-lg shadow-accent-500/25">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-dark-900 mb-4">Our Mission</h3>
                  <ul className="space-y-3 text-gray-600">
                    {[
                      'Promote universal education awareness and increase school enrollment among disadvantaged children, especially girls.',
                      'Protect and restore the natural environment through tree plantation, waste management, and conservation campaigns.',
                      'Advance water conservation through community-led rainwater harvesting and sustainable water management.',
                      'Improve public health outcomes through free medical camps, nutrition programs, and maternal health workshops.',
                      'Drive sustainable rural development through skill building, sanitation infrastructure, and livelihood programs.',
                      'Empower citizens to become active participants in their own development through leadership training and civic education.',
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center shrink-0 mt-0.5">
                          <Award className="w-3.5 h-3.5 text-primary-600" />
                        </div>
                        <span className="text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Our Objectives"
            subtitle="Clear, actionable goals that guide our daily work and long-term strategy"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {objectives.map((obj, idx) => (
              <div
                key={idx}
                className="group p-6 rounded-2xl bg-light-50 hover:bg-white hover:shadow-lg border border-transparent hover:border-gray-100 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-100 group-hover:bg-gradient-to-br group-hover:from-primary-500 group-hover:to-primary-700 flex items-center justify-center mb-4 transition-all duration-300">
                  <obj.icon className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h4 className="font-heading font-semibold text-dark-900 mb-2">{obj.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{obj.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gradient-to-br from-dark-900 to-dark-800 relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionTitle
            title="Our Core Values"
            subtitle="The principles that define who we are and how we serve"
            light
          />
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {values.map((v, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 md:p-8 hover-lift"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mb-4 shadow-lg shadow-primary-500/25">
                  <v.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-heading font-semibold text-dark-900 mb-2">{v.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Organization */}
      <section className="py-20 bg-light-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Our Organization"
            subtitle="A dedicated team of volunteers and social workers committed to community service"
          />
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-600 leading-relaxed mb-6">
              Our organization is governed by an elected executive committee comprising
              experienced social workers, educators, and community leaders. Day-to-day
              operations are managed by a team of dedicated full-time staff supported by
              hundreds of passionate volunteers from across the region.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              We operate with complete transparency, publishing annual reports, financial
              statements, and program impact assessments. Our volunteers come from all walks
              of life — teachers, doctors, engineers, students, homemakers — united by a
              shared desire to serve society.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { num: '15+', label: 'Team Members' },
                { num: '200+', label: 'Active Volunteers' },
                { num: '10+', label: 'Partner Organizations' },
                { num: '8', label: 'Districts Covered' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <p className="font-heading text-2xl font-bold text-primary-600">{item.num}</p>
                  <p className="text-gray-500 text-sm">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Channel Partners */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Our Channel Partners"
            subtitle="Proudly collaborating with esteemed government bodies to amplify our impact"
          />
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Bhopal Municipal Corporation */}
            <div className="group relative bg-gradient-to-br from-light-50 to-white rounded-3xl p-8 border border-gray-100 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-500 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-50 to-transparent rounded-bl-[80px] rounded-tr-3xl opacity-60" />
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-2xl bg-white shadow-lg shadow-gray-200/50 border border-gray-100 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 overflow-hidden p-3">
                  <img
                    src="/partner_bmc.png"
                    alt="Bhopal Municipal Corporation Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h4 className="font-heading text-xl font-bold text-dark-900 mb-1">
                  Bhopal Municipal Corporation
                </h4>
                <p className="text-primary-600 font-medium text-sm mb-4">
                  नगर पालिक निगम, भोपाल
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Partnering with Bhopal Municipal Corporation for urban development initiatives,
                  sanitation drives, and community welfare programs across the city of Bhopal.
                </p>
              </div>
            </div>

            {/* Ministry of AYUSH – NMPB */}
            <div className="group relative bg-gradient-to-br from-light-50 to-white rounded-3xl p-8 border border-gray-100 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-500 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-50 to-transparent rounded-bl-[80px] rounded-tr-3xl opacity-60" />
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-2xl bg-white shadow-lg shadow-gray-200/50 border border-gray-100 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 overflow-hidden p-3">
                  <img
                    src="/partner_nmpb.png"
                    alt="National Medicinal Plants Board Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h4 className="font-heading text-xl font-bold text-dark-900 mb-1">
                  National Medicinal Plants Board
                </h4>
                <p className="text-primary-600 font-medium text-sm mb-4">
                  Ministry of AYUSH, Government of India
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Collaborating with NMPB under the Ministry of AYUSH for the conservation,
                  cultivation, and sustainable utilization of medicinal plants across our project areas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}