import React from 'react';
import { motion } from 'framer-motion';
import { FaMoneyBillWave, FaLock, FaFileInvoiceDollar, FaUniversity, FaClipboardList } from 'react-icons/fa';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' },
  }),
};

const steps = [
  { icon: <FaMoneyBillWave />,       title: 'Payment Initiated',  desc: 'Tenant pays via secure portal.' },
  { icon: <FaLock />,                title: 'Secure Processing',  desc: 'Bank-grade encryption of funds.' },
  { icon: <FaFileInvoiceDollar />,   title: 'Invoice Generated',  desc: 'Digital receipt for all parties.' },
  { icon: <FaUniversity />,          title: 'Owner Payout',       desc: 'Direct transfer to owner.' },
  { icon: <FaClipboardList />,       title: 'Audit Log Stored',   desc: 'Permanent record for compliance.' },
];

const PaymentFlowSection = () => (
  <section className="py-20 md:py-28 bg-[#FBF7F0]">
    <div className="max-w-5xl mx-auto px-6 text-center">

      <motion.div
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
        className="flex justify-center mb-5"
      >
        <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 shadow-sm border border-gray-100">
          <FaFileInvoiceDollar className="text-[#1E3A5F] text-xs" />
          <span className="text-xs font-bold text-[#1E3A5F] tracking-wide">Financial Ecosystem</span>
        </div>
      </motion.div>

      <motion.h2
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
        className="text-4xl md:text-[44px] font-extrabold text-[#1E3A5F] leading-tight mb-14"
      >
        Seamless Payment Flow
      </motion.h2>

      {/* Steps */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
        {steps.map((step, i) => (
          <motion.div
            key={i} custom={i}
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-[#1E3A5F] flex items-center justify-center mb-4 shadow-lg relative">
              <span className="text-white text-xl">{step.icon}</span>
              {i === 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#B68B39] border-2 border-white flex items-center justify-center">
                  <span className="text-white text-[8px] font-bold">1</span>
                </div>
              )}
            </div>
            <h4 className="font-bold text-[#1E3A5F] text-sm mb-1">{step.title}</h4>
            <p className="text-gray-500 text-xs leading-relaxed font-medium">{step.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Dispute Resolution */}
      <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center text-left">

        {/* Left image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
        >
          <img src="/city_aerial_view.png" alt="City aerial view" className="w-full h-full object-cover" />
        </motion.div>

        {/* Right text */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 mb-6 shadow-sm border border-gray-100">
            <span className="text-xs font-bold text-[#B68B39] tracking-wide uppercase">⚖ Resolution</span>
          </div>
          <h2 className="text-4xl md:text-[40px] font-extrabold text-[#1E3A5F] leading-tight mb-5">
            Fair & Transparent<br />Dispute Resolution
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-md font-medium">
            Because property rental should be built on trust, we provide a robust framework to handle disagreements fairly and quickly.
          </p>
          <div className="grid grid-cols-2 gap-5">
            {[
              { emoji: '⚠️', title: 'Raise Issue Easily', desc: 'One-click reporting for maintenance or payment issues.' },
              { emoji: '👤', title: 'Admin Review',       desc: 'Neutral third-party analysis of the situation.' },
              { emoji: '📄', title: 'Evidence Submission', desc: 'Secure upload of photos, receipts and documents.' },
              { emoji: '⚡', title: 'Fast Resolution',    desc: 'Typical disputes resolved within 48 hours.' },
            ].map((item, i) => (
              <motion.div
                key={i} custom={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100/80 hover:shadow-md transition-shadow"
              >
                <div className="text-2xl mb-3">{item.emoji}</div>
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

export default PaymentFlowSection;
