import { useEffect, useState } from 'react';
import { Heart, GraduationCap, TreePine, Stethoscope, Droplets, Building2, CreditCard, Smartphone } from 'lucide-react';
import { get } from '../utils/api';
import SectionTitle from '../components/SectionTitle';

const impactCards = [
  { icon: GraduationCap, amount: '₹', desc: 'Provides school supplies for one child for a full year' },
  { icon: TreePine, amount: '₹', desc: 'Plants and nurtures  saplings to full growth' },
  { icon: Stethoscope, amount: '₹', desc: 'Covers healthcare screening for 10 villagers' },
  { icon: Droplets, amount: '₹', desc: 'Helps build a rainwater harvesting unit for a family' },
  { icon: Building2, amount: '₹', desc: 'Funds a month of skill training for rural women' },
];
export default function Donate() {
  const [bankDetails, setBankDetails] = useState({
    bankName: 'HDFC Bank',
    accountName: 'Maharshi Dayanand Jan Kalyan Sanstha',
    accountNumber: '50200052075438',
    ifscCode: 'HDFC0003694',
    branch: 'HDFC Bank',
  });



  useEffect(() => {
    (async () => {
      try {
        const res = await get('/settings');
        if (res.data) {
          setBankDetails((prev) => ({ ...prev, ...res.data }));
        }
      } catch {
        // use defaults
      }
    })();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900 overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl animate-float" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fadeInUp">
            Support Our Cause
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto animate-fadeInUp delay-100">
            Your generosity fuels our mission. Every contribution, big or small, creates real change.
          </p>
        </div>
      </section>

      {/* Emotional Appeal */}
      <section className="py-20 bg-light-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionTitle
            title="How Your Donation Helps"
            subtitle="See the direct impact of your generous contribution"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {impactCards.map((card, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover-lift text-center">
                <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-accent-100 to-accent-200 flex items-center justify-center mb-4">
                  <card.icon className="w-7 h-7 text-accent-600" />
                </div>
                <p className="font-heading text-2xl font-bold text-primary-600 mb-2">{card.amount}</p>
                <p className="text-gray-600 text-sm">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bank Details */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Donate via Bank Transfer"
            subtitle="Make a direct bank transfer to support our programs"
          />

          <div className="grid md:grid-cols-2 gap-8">
            {/* Bank Details Card */}
            <div className="bg-gradient-to-br from-dark-900 to-dark-800 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary-600/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary-600/20 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-primary-400" />
                  </div>
                  <h3 className="font-heading text-xl font-bold">Bank Details</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Bank Name', value: bankDetails.bankName },
                    { label: 'Account Name', value: bankDetails.accountName },
                    { label: 'Account Number', value: bankDetails.accountNumber },
                    { label: 'IFSC Code', value: bankDetails.ifscCode },
                    { label: 'Branch', value: bankDetails.branch },
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
                      <span className="text-gray-400 text-sm">{item.label}</span>
                      <span className="font-medium text-sm">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* UPI Section */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center mb-4">
                <Smartphone className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-heading text-xl font-bold text-dark-900 mb-2">Pay via UPI</h3>
              <p className="text-gray-600 text-sm mb-6">Scan the QR code to pay</p>

              {/* QR Code Image */}
              <div className="bg-white rounded-xl shadow-md border border-primary-200/50 flex items-center justify-center mb-4 overflow-hidden group hover:scale-[1.03] transition-all duration-300 p-3">
                <a href="/qr_code.jpg" target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center" title="Click to view full size">
                  <img
                    src="/qr_code.jpg"
                    alt="UPI QR Code"
                    className="w-full h-full object-contain max-w-[220px]"
                  />
                </a>
              </div>


            </div>
          </div>
        </div>
      </section>

      {/* Donation Reporting Form */}
      <section className="py-20 bg-light-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Report Your Donation"
            subtitle="After making a transfer, please fill this form so we can verify and generate your receipt."
          />
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 mt-8">
            <form onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target;
              const submitBtn = form.querySelector('button[type="submit"]');
              const originalText = submitBtn.innerText;
              submitBtn.innerText = 'Submitting...';
              submitBtn.disabled = true;

              try {
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                
                const { post } = await import('../utils/api');
                await post('/donations', data);
                
                alert('Thank you! Your donation details have been submitted. We will verify and process your receipt soon.');
                form.reset();
              } catch (error) {
                alert('Failed to submit donation details. Please try again.');
              } finally {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
              }
            }} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input required name="donorName" type="text" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" placeholder="Your Name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input required name="phone" type="tel" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" placeholder="Your Phone Number" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input name="email" type="email" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" placeholder="Your Email (Optional)" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount Donated (₹) *</label>
                  <input required name="amount" type="number" min="1" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" placeholder="e.g. 5000" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transaction ID / UTR No. *</label>
                  <input required name="transactionId" type="text" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" placeholder="Reference Number" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Payment *</label>
                  <input required name="paymentDate" type="date" max={new Date().toISOString().split('T')[0]} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
                <textarea name="message" rows="3" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" placeholder="Any specific cause you want to support or a message for us..."></textarea>
              </div>

              <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                Submit Details
              </button>
            </form>
          </div>

          {/* Tax benefit and communications box */}
          <div className="mt-8 bg-white/60 border border-gray-200 rounded-2xl p-6 text-xs text-gray-600 space-y-4 shadow-sm">
            <div className="flex gap-3 items-start">
              <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600 shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-emerald-700 uppercase tracking-wider text-[10px]">Tax Benefit Information</p>
                <p className="mt-1 font-medium leading-relaxed text-gray-700">
                   <strong className="text-gray-900">MAHARSHI DAYANAND JAN KALYAN SANSTHA</strong> IS REGISTERED AS NON PROFIT ORGANIZATION.
                </p>
                <p className="mt-2 text-dark-900 font-bold font-mono text-[11px] bg-emerald-50/50 inline-block px-2.5 py-1 rounded-lg border border-emerald-100">
                  PAN: AAKAM7709B &nbsp;|&nbsp; 80G NUMBER: AAKAM7709B26BP02
                </p>
              </div>
            </div>
            
            <div className="border-t border-gray-150 pt-4 flex gap-3 items-start">
              <div className="p-2 bg-primary-50 rounded-xl text-primary-600 shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="leading-relaxed text-gray-500">
                <p className="font-bold text-primary-700 uppercase tracking-wider text-[10px]">Donor Communications</p>
                <p className="mt-1">
                  Maharshi Dayanand Jan Kalyan Sanstha may get in touch with you through WhatsApp, email, SMS, or phone to share details about your donation, 80G receipt and progress on programs. You can choose to opt out of these communications or raise any concerns by writing to us at <a href="mailto:Maharshisanstha35@gmail.com" className="text-primary-600 font-semibold hover:underline">Maharshisanstha35@gmail.com</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Every Contribution Matters */}
      <section className="py-16 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700 relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-30" />
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <Heart className="w-12 h-12 text-white/80 mx-auto mb-4" />
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
            Every Contribution Matters
          </h2>
          <p className="text-primary-100 leading-relaxed">
            Whether it is ₹100 or ₹10,000, your donation directly supports education for
            children, healthcare for families, clean water for villages, and a greener
            environment for all. We ensure complete transparency — every rupee is accounted
            for and directed towards our programs. Thank you for being a part of this journey.
          </p>
        </div>
      </section>
    </div>
  );
}
