import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaLock, FaTag, FaChartLine, FaCheckCircle, FaSearch, FaMoneyBillWave, FaFileInvoiceDollar, FaUniversity, FaClipboardList, FaUserShield, FaGavel, FaFileAlt, FaBolt, FaHeadset, FaExclamationTriangle, FaBalanceScale } from 'react-icons/fa';

/* ──────────────────────────────────────────────
   FEATURES PAGE  –  pixel-perfect match to design
   ────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' },
  }),
};

/* ── HERO ── */
const FeaturesHero = () => (
  <section className="relative w-full h-[75vh] min-h-[520px] flex items-center justify-center overflow-hidden">
    {/* BG image */}
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/features_hero_bg.png")' }}
    >
      <div className="absolute inset-0 bg-[#112338]/50 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#112338]/20 to-[#112338]/70" />
    </div>

    <div className="relative z-10 text-center px-4">
      {/* Breadcrumb */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-gray-300 text-sm font-medium tracking-wide mb-5"
      >
        Home &nbsp;&gt;&nbsp; <span className="text-white">Features</span>
      </motion.p>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="text-5xl md:text-6xl lg:text-[68px] leading-[1.15] text-white mb-2"
        style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 500 }}
      >
        Everything You Need
        <br />
        to Rent Smarter
      </motion.h1>
    </div>
  </section>
);

/* ── FEATURES BAR ── */
const featureBarItems = [
  { icon: <FaShieldAlt />, label: 'VERIFIED LISTINGS' },
  { icon: <FaLock />, label: 'SECURE TRANSACTIONS' },
  { icon: <FaTag />, label: 'TRANSPARENT PRICING' },
  { icon: <FaChartLine />, label: 'MARKET EXPERTISE' },
];

const FeaturesBar = () => (
  <section className="relative z-20 -mt-1">
    <div className="bg-gradient-to-r from-[#F8F3EA] via-[#F5EDDF] to-[#F0E6D2] border-t border-[#E8DCC8]">
      <div className="max-w-6xl mx-auto px-6 py-7 grid grid-cols-2 md:grid-cols-4 gap-6">
        {featureBarItems.map((item, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex items-center justify-center gap-3"
          >
            <span className="text-[#B68B39] text-xl">{item.icon}</span>
            <span className="text-[#1E3A5F] font-bold text-xs tracking-[0.12em] uppercase">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ── DESIGNED FOR TENANTS ── */
const tenantFeatures = [
  {
    icon: <FaCheckCircle />,
    title: 'Verified Listings Only',
    desc: 'Every property undergoes a strict verification process to prevent fraud.',
  },
  {
    icon: <FaMoneyBillWave />,
    title: 'No Hidden Charges',
    desc: 'Transparent fee structure with no surprise brokerage costs or hidden taxes.',
  },
  {
    icon: <FaSearch />,
    title: 'Smart Search Filters',
    desc: 'Find exactly what you need with advanced neighborhood and amenity filters.',
  },
];

const TenantBenefits = () => (
  <section className="py-20 md:py-28 bg-[#F8F3EA]">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
        {/* Left */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          {/* Tag */}
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 mb-6 shadow-sm border border-gray-100">
            <FaShieldAlt className="text-[#1E3A5F] text-xs" />
            <span className="text-xs font-bold text-[#1E3A5F] tracking-wide">Tenant benefits</span>
          </div>

          <h2 className="text-4xl md:text-[44px] font-extrabold text-[#1E3A5F] leading-tight mb-5">
            Designed for Tenants
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-md font-medium">
            Find your next home with confidence using our tenant-centric browsing and booking platform.
          </p>

          {/* Feature list */}
          <div className="space-y-5">
            {tenantFeatures.map((f, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100/80 hover:shadow-md transition-shadow"
              >
                <div className="w-11 h-11 rounded-full bg-[#B68B39]/10 flex items-center justify-center shrink-0">
                  <span className="text-[#B68B39] text-lg">{f.icon}</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#1E3A5F] text-[15px] mb-1">{f.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed font-medium">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right – stacked images */}
        <div className="relative flex justify-end items-start mt-8 lg:mt-16">
          {/* Top-right image (city night) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-[55%] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-10"
          >
            <img
              src="/city_night_view.png"
              alt="City night view"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Bottom-left image (white villa) — overlapping */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="absolute left-0 top-[40%] w-[55%] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-20"
          >
            <img
              src="/white_villa.png"
              alt="Modern villa"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Decorative dot */}
          <div className="absolute bottom-[10%] right-[15%] w-24 h-24 rounded-full bg-[#B68B39]/20 z-0" />
        </div>
      </div>
    </div>
  </section>
);

/* ── BUILT FOR PROPERTY OWNERS ── */
const ownerCards = [
  {
    icon: <FaUserShield />,
    title: 'Verified Tenants',
    desc: 'AI-driven matching with credit checks and identity verification for peace of mind.AI-driven matching with credit.',
    color: '#B68B39',
  },
  {
    icon: <FaClipboardList />,
    title: 'Easy Listing',
    desc: 'Smart listing tools that optimize your property details for maximum visibility.Smart listing tools that optimize your.',
    color: '#16A34A',
  },
  {
    icon: <FaChartLine />,
    title: 'Rental Insights',
    desc: 'Real-time market analytics to help you price your property competitively.',
    color: '#1E3A5F',
  },
  {
    icon: <FaLock />,
    title: 'Secure Payments',
    desc: 'AI-driven matching with credit checks and identity verification for peace of mind.AI-driven matching with credit.',
    color: '#B68B39',
  },
];

const OwnerBenefits = () => (
  <section className="py-20 md:py-28 bg-[#F8F3EA]">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
        {/* Left text + image */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          {/* Tag */}
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 mb-6 shadow-sm border border-gray-100">
            <FaShieldAlt className="text-[#1E3A5F] text-xs" />
            <span className="text-xs font-bold text-[#1E3A5F] tracking-wide">Owner benefits</span>
          </div>

          <h2 className="text-4xl md:text-[44px] font-extrabold text-[#1E3A5F] leading-tight mb-5">
            Built for Property
            <br />
            Owners
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-md font-medium">
            Maximize your rental yields while minimizing management stress with our integrated landlord suite.
          </p>

          {/* Property image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-full max-w-[380px] aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white"
          >
            <img
              src="/white_villa.png"
              alt="Property"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Right – 2×2 card grid */}
        <div className="grid grid-cols-2 gap-5">
          {ownerCards.map((card, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100/80 hover:shadow-lg transition-all duration-300 group"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ backgroundColor: `${card.color}15` }}
              >
                <span style={{ color: card.color }} className="text-xl">
                  {card.icon}
                </span>
              </div>
              <h4 className="font-bold text-[#1E3A5F] text-[15px] mb-2">{card.title}</h4>
              <p className="text-gray-500 text-xs leading-relaxed font-medium">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ── SEAMLESS PAYMENT FLOW ── */
const paymentSteps = [
  { icon: <FaMoneyBillWave />, title: 'Payment Initiated', desc: 'Tenant pays via secure portal.' },
  { icon: <FaLock />, title: 'Secure Processing', desc: 'Bank-grade encryption of funds.' },
  { icon: <FaFileInvoiceDollar />, title: 'Invoice Generated', desc: 'Digital receipt for all parties.' },
  { icon: <FaUniversity />, title: 'Owner Payout', desc: 'Direct transfer to owner.' },
  { icon: <FaClipboardList />, title: 'Audit Log Stored', desc: 'Permanent record for compliance.' },
];

const PaymentFlow = () => (
  <section className="py-20 md:py-28 bg-[#FBF7F0]">
    <div className="max-w-5xl mx-auto px-6 text-center">
      {/* Tag */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="flex justify-center mb-5"
      >
        <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 shadow-sm border border-gray-100">
          <FaFileInvoiceDollar className="text-[#1E3A5F] text-xs" />
          <span className="text-xs font-bold text-[#1E3A5F] tracking-wide">Financial Ecosystem</span>
        </div>
      </motion.div>

      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="text-4xl md:text-[44px] font-extrabold text-[#1E3A5F] leading-tight mb-14"
      >
        Seamless Payment Flow
      </motion.h2>

      {/* Steps row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
        {paymentSteps.map((step, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-[#1E3A5F] flex items-center justify-center mb-4 shadow-lg relative">
              <span className="text-white text-xl">{step.icon}</span>
              {/* Notification dot for some */}
              {i < 2 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#B68B39] border-2 border-white flex items-center justify-center">
                  <span className="text-white text-[8px] font-bold">{i + 1}</span>
                </div>
              )}
            </div>
            <h4 className="font-bold text-[#1E3A5F] text-sm mb-1">{step.title}</h4>
            <p className="text-gray-500 text-xs leading-relaxed font-medium">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ── DISPUTE RESOLUTION ── */
const disputeItems = [
  {
    icon: <FaExclamationTriangle />,
    title: 'Raise Issue Easily',
    desc: 'One-click reporting for maintenance or payment issues.',
    color: '#1E3A5F',
  },
  {
    icon: <FaHeadset />,
    title: 'Admin Review',
    desc: 'Neutral third-party analysis of the situation.',
    color: '#1E3A5F',
  },
  {
    icon: <FaFileAlt />,
    title: 'Evidence Submission',
    desc: 'Secure upload of photos, receipts and documents.',
    color: '#1E3A5F',
  },
  {
    icon: <FaBolt />,
    title: 'Fast Resolution',
    desc: 'Typical disputes resolved within 48 hours.',
    color: '#B68B39',
  },
];

const DisputeResolution = () => (
  <section className="py-20 md:py-28 bg-[#FBF7F0]">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        {/* Left – city aerial image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
        >
          <img
            src="/city_aerial_view.png"
            alt="City aerial view"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Right */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          {/* Tag */}
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 mb-6 shadow-sm border border-gray-100">
            <FaBalanceScale className="text-[#B68B39] text-xs" />
            <span className="text-xs font-bold text-[#B68B39] tracking-wide uppercase">Resolution</span>
          </div>

          <h2 className="text-4xl md:text-[44px] font-extrabold text-[#1E3A5F] leading-tight mb-5">
            Fair & Transparent
            <br />
            Dispute Resolution
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-md font-medium">
            Because property rental should be built on trust, we provide a robust framework to handle disagreements fairly and quickly.
          </p>

          {/* 2×2 grid */}
          <div className="grid grid-cols-2 gap-5">
            {disputeItems.map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100/80 hover:shadow-md transition-shadow"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${item.color}12` }}
                >
                  <span style={{ color: item.color }} className="text-lg">{item.icon}</span>
                </div>
                <h4 className="font-bold text-[#1E3A5F] text-sm mb-1">{item.title}</h4>
                <p className="text-gray-500 text-[11px] leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

/* ── CTA SECTION ── */
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();
  return (
  <section className="py-20 md:py-24 bg-[#112338]">
    <div className="max-w-3xl mx-auto px-6 text-center">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="text-4xl md:text-[48px] font-extrabold text-white leading-tight mb-5"
      >
        Start Renting with
        <br />
        Confidence Today
      </motion.h2>
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={1}
        className="text-gray-400 text-sm leading-relaxed mb-10 font-medium"
      >
        Join thousands of property owners and tenants who have simplified
        <br className="hidden sm:block" />
        their rental experience with Paband.pk.
      </motion.p>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={2}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <button 
          onClick={() => navigate('/properties')}
          className="px-8 py-4 bg-brand-gold text-white font-bold rounded-lg hover:bg-yellow-600 transition-colors shadow-lg shadow-brand-gold/30 w-full sm:w-auto"
        >
          Browse Properties
        </button>
        <button className="px-8 py-3.5 rounded-full bg-transparent text-white font-bold text-sm border-2 border-white/40 hover:bg-white hover:text-[#112338] transition-all duration-300">
          List Your Property
        </button>
      </motion.div>
    </div>
  </section>
  );
};

/* ── MAIN FEATURES PAGE ── */
const FeaturesPage = () => {
  return (
    <div>
      <FeaturesHero />
      <FeaturesBar />
      <TenantBenefits />
      <OwnerBenefits />
      <PaymentFlow />
      <DisputeResolution />
      {/* Final CTA */}
      <CTASection />
    </div>
  );
};

export default FeaturesPage;
