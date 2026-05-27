import { useState } from 'react';
import { post } from '../utils/api';
import { Heart, Users, HandHeart, Sparkles, CheckCircle, X } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

const benefits = [
  { icon: Heart, title: 'Make Real Impact', desc: 'Directly contribute to improving lives in rural communities.' },
  { icon: Users, title: 'Build Connections', desc: 'Join a network of passionate change-makers across India.' },
  { icon: HandHeart, title: 'Develop Skills', desc: 'Gain experience in community development, leadership, and teamwork.' },
  { icon: Sparkles, title: 'Personal Growth', desc: 'Find purpose and fulfilment through meaningful social service.' },
];

export default function Volunteer() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    availability: '',
    areaOfInterest: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Enter a valid 10-digit Indian phone number';
    if (!form.availability) e.availability = 'Please select availability';
    if (!form.areaOfInterest) e.areaOfInterest = 'Please select an area of interest';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;
    setSubmitting(true);
    try {
      const payload = { ...form, fullName: form.name };
      await post('/volunteers', payload);
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', skills: '', availability: '', areaOfInterest: '' });
    } catch (err) {
      setServerError(err.response?.data?.error || err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900 overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fadeInUp">
            Become a Volunteer
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto animate-fadeInUp delay-100">
            Your time and skills can transform lives. Join our community of dedicated volunteers.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-light-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Why Volunteer With Us?"
            subtitle="Volunteering with MDJKS is a rewarding experience that makes a real difference"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {benefits.map((b, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover-lift">
                <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center mb-4">
                  <b.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="font-heading font-semibold text-dark-900 mb-2">{b.title}</h3>
                <p className="text-gray-600 text-sm">{b.desc}</p>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100">
              <h3 className="font-heading text-2xl font-bold text-dark-900 mb-2 text-center">
                Volunteer Registration
              </h3>
              <p className="text-gray-500 text-sm text-center mb-8">
                Fill in your details and we will get in touch with you soon
              </p>

              {serverError && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                  {serverError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-sm`}
                  />
                  {errors.name && <p className="mt-1 text-red-500 text-xs">{errors.name}</p>}
                </div>

                {/* Email & Phone */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="9876543210"
                      className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-sm`}
                    />
                    {errors.phone && <p className="mt-1 text-red-500 text-xs">{errors.phone}</p>}
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Skills & Experience</label>
                  <textarea
                    name="skills"
                    value={form.skills}
                    onChange={handleChange}
                    placeholder="Tell us about your skills, qualifications, or relevant experience..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-sm resize-none"
                  />
                </div>

                {/* Availability & Area */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Availability *</label>
                    <select
                      name="availability"
                      value={form.availability}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.availability ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-sm bg-white`}
                    >
                      <option value="">Select availability</option>
                      <option value="weekdays">Weekdays</option>
                      <option value="weekends">Weekends</option>
                      <option value="both">Both</option>
                      <option value="flexible">Flexible</option>
                    </select>
                    {errors.availability && <p className="mt-1 text-red-500 text-xs">{errors.availability}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Area of Interest *</label>
                    <select
                      name="areaOfInterest"
                      value={form.areaOfInterest}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.areaOfInterest ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-sm bg-white`}
                    >
                      <option value="">Select area</option>
                      <option value="education">Education Awareness</option>
                      <option value="environment">Environmental Protection</option>
                      <option value="water">Water Conservation</option>
                      <option value="health">Health & Nutrition</option>
                      <option value="rural">Rural Development</option>
                    </select>
                    {errors.areaOfInterest && <p className="mt-1 text-red-500 text-xs">{errors.areaOfInterest}</p>}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-[1.01] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Users className="w-5 h-5" />
                      Register as Volunteer
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center animate-scaleIn shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary-100 flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-dark-900 mb-2">
              Thank You for Joining!
            </h3>
            <p className="text-gray-600 mb-6">
              Your volunteer registration has been submitted successfully. Our team will reach
              out to you shortly with next steps.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="px-6 py-2.5 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
