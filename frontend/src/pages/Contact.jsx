import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { Facebook, Instagram, Linkedin } from '../components/SocialIcons';
import { post } from '../utils/api';
import SectionTitle from '../components/SectionTitle';

const contactInfo = [
  {
    icon: MapPin,
    title: 'REGISTERED Address',
    lines: [
      ' Maharishi Dayanand Public Welfare Organization, Bhopal J-351, Kotra Sultanabad Road',
    ],
  },
  {
    icon: MapPin,
    title: 'Temporary Address',
    lines: [
      ' H NO. 114 HARI NAGAR NEELBAD BHOPAL -462044'

    ],
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: ['Maharshisanstha35@gmail.com', ' '],
  },
  {
    icon: Phone,
    title: 'Call Us',
    lines: ['+91 96306 26091', ' '],
  },
  {
    icon: Clock,
    title: 'Working Hours',
    lines: ['Monday - Saturday', '9:00 AM - 6:00 PM', 'Sunday: Closed'],
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;
    setSubmitting(true);
    try {
      await post('/contacts', form);
      setSuccess(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setServerError(err.response?.data?.error || err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900 overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fadeInUp">
            Contact Us
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto animate-fadeInUp delay-100">
            Have questions or want to collaborate? We would love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-light-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
            {contactInfo.map((info, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover-lift">
                <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center mb-4">
                  <info.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="font-heading font-semibold text-dark-900 mb-3">{info.title}</h3>
                {info.lines.map((line, i) => (
                  <p key={i} className="text-gray-600 text-sm">{line}</p>
                ))}
              </div>
            ))}
          </div>

          {/* Form + Map */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
              <h3 className="font-heading text-2xl font-bold text-dark-900 mb-2">Send us a Message</h3>
              <p className="text-gray-500 text-sm mb-6">We typically respond within 24 hours</p>

              {success && (
                <div className="mb-6 p-4 rounded-xl bg-primary-50 border border-primary-200 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-600 shrink-0" />
                  <p className="text-primary-700 text-sm">Message sent successfully! We will get back to you soon.</p>
                </div>
              )}

              {serverError && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                  {serverError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-sm`}
                  />
                  {errors.name && <p className="mt-1 text-red-500 text-xs">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-sm`}
                  />
                  {errors.email && <p className="mt-1 text-red-500 text-xs">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    rows={5}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-sm resize-none`}
                  />
                  {errors.message && <p className="mt-1 text-red-500 text-xs">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-[1.01] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117497.49514757363!2d77.3364448554279!3d23.23527633271131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c4270fd3e40fd%3A0x6d117565c5c9351e!2sBhopal%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1716700000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="NGO Location"
                />
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h4 className="font-heading font-semibold text-dark-900 mb-4">Follow Us</h4>
                <div className="flex gap-3">
                  {[
                    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
                    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
                    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-700' },
                  ].map(({ icon: Icon, href, label, color }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className={`w-11 h-11 rounded-xl bg-gray-100 ${color} hover:text-white flex items-center justify-center transition-all duration-300 text-gray-600`}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                  <a
                    href="https://wa.me/+91 9630626091"
                    aria-label="WhatsApp"
                    className="w-11 h-11 rounded-xl bg-gray-100 hover:bg-green-600 hover:text-white flex items-center justify-center transition-all duration-300 text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.917.918l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.352 0-4.556-.753-6.347-2.064l-.443-.332-3.1 1.04 1.04-3.1-.332-.443A9.935 9.935 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
