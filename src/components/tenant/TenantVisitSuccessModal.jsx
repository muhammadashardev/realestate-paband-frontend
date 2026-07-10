import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdCheck, MdNotifications } from 'react-icons/md';

const TenantVisitSuccessModal = ({ isOpen, onClose, propertyData }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleBackToHome = () => {
    onClose();
    navigate('/tenant');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="tenant-modal-backdrop fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4 z-50 pointer-events-none">
        <div
          className="tenant-modal-content bg-white rounded-2xl shadow-2xl w-full max-w-md pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 sm:p-8">

            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#B68B39]/20 to-[#9a7109]/20 rounded-full blur-xl" />
                <div className="relative tenant-success-pulse w-20 h-20 bg-gradient-to-br from-[#B68B39] to-[#9a7109] rounded-full flex items-center justify-center shadow-xl">
                  <MdCheck size={44} className="text-white" />
                </div>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-[26px] font-extrabold text-center text-[#112338] mb-3 leading-tight">
              Visit Request Submitted
            </h2>

            {/* Description */}
            <p className="text-center text-gray-500 text-[13px] mb-6 leading-relaxed font-medium">
              Your property visit request has been sent successfully. The property owner will review your request and notify you once the visit is confirmed.
            </p>

            {/* What's Next Card */}
            <div className="bg-gradient-to-br from-[#0A2240] to-[#112338] rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#B68B39]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <MdNotifications size={18} className="text-[#B68B39]" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-bold text-[13px] mb-1">What's Next?</h4>
                  <p className="text-gray-400 text-[11px] leading-relaxed">
                    Check your notifications for a confirmation message from the management team within 24 hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* Primary - Back to Home */}
              <button
                onClick={handleBackToHome}
                className="w-full py-3.5 bg-gradient-to-r from-[#B68B39] to-[#9a7109] text-white font-bold rounded-xl hover:from-[#a0762d] hover:to-[#7a5607] transition-all duration-200 text-[14px] shadow-lg shadow-[#B68B39]/20 flex items-center justify-center gap-2"
              >
                Back to Home
                <span className="text-lg">→</span>
              </button>

              {/* Secondary - Cancel */}
              <button
                onClick={onClose}
                className="w-full py-2.5 text-gray-600 text-[13px] font-semibold hover:text-gray-800 transition-colors bg-gray-50 rounded-xl border border-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TenantVisitSuccessModal;
