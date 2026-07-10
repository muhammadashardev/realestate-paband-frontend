import React, { useState } from 'react';
import { MdClose, MdCalendarToday, MdAccessTime, MdLocationOn, MdInfo, MdCheck } from 'react-icons/md';

const TenantScheduleVisitModal = ({ isOpen, onClose, onSubmit, propertyData }) => {
  const [formData, setFormData] = useState({
    visitDate: '',
    timeSlot: '10:00 AM — 12:00 PM',
    countryCode: '+92',
    phone: '',
    visitors: '',
    message: '',
  });

  if (!isOpen) return null;

  const property = propertyData || {
    name: 'Skyline Luxury Apartment',
    location: 'DHA Phase 6, Karachi',
    price: 'PKR 120,000 / Month',
    image: 'https://images.unsplash.com/photo-1570129477492-45ec003cf16f?w=400&h=300&fit=crop',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
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
          className="tenant-modal-content bg-white rounded-2xl shadow-2xl w-full max-w-lg pointer-events-auto max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white z-10 px-6 pt-6 pb-4 border-b border-gray-100 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl md:text-2xl font-extrabold text-[#112338]">Schedule a Property Visit</h2>
                <p className="text-gray-500 text-[12px] mt-1 font-medium leading-relaxed">
                  Choose your preferred visit date and time to schedule a property viewing with the property owner or management team.
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 shrink-0 ml-3"
              >
                <MdClose size={22} />
              </button>
            </div>
          </div>

          {/* Property Card */}
          <div className="px-6 pt-5">
            <div className="bg-gradient-to-br from-[#0A2240] to-[#112338] rounded-xl p-4 flex items-center gap-4">
              <img
                src={property.image}
                alt={property.name}
                className="w-20 h-16 rounded-lg object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold text-[14px] truncate">{property.name}</h3>
                <div className="flex items-center gap-1 text-gray-400 text-[11px] mt-0.5">
                  <MdLocationOn size={12} />
                  <span>{property.location}</span>
                </div>
                <p className="text-[#B68B39] font-bold text-[13px] mt-1">{property.price}</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 pt-5 pb-6 space-y-4">

            {/* Date & Time Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Preferred Visit Date */}
              <div>
                <label className="text-[12px] font-bold text-[#112338] mb-1.5 block">Preferred Visit Date</label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.visitDate}
                    onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                    placeholder="Select Date (DD/MM/YYYY)"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[12px] text-gray-700 focus:outline-none focus:border-[#B68B39] transition-colors pr-10"
                  />
                  <MdCalendarToday size={16} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Preferred Time Slot */}
              <div>
                <label className="text-[12px] font-bold text-[#112338] mb-1.5 block">Preferred Time Slot</label>
                <select
                  value={formData.timeSlot}
                  onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                  className="tenant-filter-select w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[12px] text-gray-700 focus:outline-none focus:border-[#B68B39] transition-colors"
                >
                  <option>10:00 AM — 12:00 PM</option>
                  <option>12:00 PM — 2:00 PM</option>
                  <option>2:00 PM — 4:00 PM</option>
                  <option>4:00 PM — 6:00 PM</option>
                  <option>6:00 PM — 8:00 PM</option>
                  <option>8:00 PM — 10:00 PM</option>
                  <option>10:00 PM — 12:00 AM</option>
                </select>
              </div>
            </div>

            {/* Phone & Visitors Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Contact Number */}
              <div>
                <label className="text-[12px] font-bold text-[#112338] mb-1.5 block">Contact Number</label>
                <div className="flex border border-gray-200 rounded-lg overflow-hidden focus-within:border-[#B68B39] transition-colors">
                  <div className="flex items-center px-3 bg-gray-50 border-r border-gray-200 shrink-0">
                    <span className="text-[12px] font-semibold text-gray-600">+92</span>
                  </div>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="300 1234567"
                    className="flex-1 px-3 py-2.5 text-[12px] text-gray-700 focus:outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* Number of Visitors */}
              <div>
                <label className="text-[12px] font-bold text-[#112338] mb-1.5 block">Number of Visitors (Optional)</label>
                <input
                  type="text"
                  value={formData.visitors}
                  onChange={(e) => setFormData({ ...formData, visitors: e.target.value })}
                  placeholder="e.g. 2"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[12px] text-gray-700 focus:outline-none focus:border-[#B68B39] transition-colors"
                />
              </div>
            </div>

            {/* Additional Message */}
            <div>
              <label className="text-[12px] font-bold text-[#112338] mb-1.5 block">Additional Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us more about your visit requirements..."
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[12px] text-gray-700 focus:outline-none focus:border-[#B68B39] transition-colors resize-none"
              />
            </div>

            {/* Info Notice */}
            <div className="bg-gray-50 rounded-lg p-3 flex gap-2.5">
              <MdInfo size={18} className="text-gray-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
                The property owner or management team will review your request and confirm the visit schedule.
              </p>
            </div>

            {/* Warning */}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                <MdInfo size={10} className="text-gray-500" />
              </div>
              <p className="text-[10px] text-gray-400 font-medium">
                Only verified tenants can schedule property visits.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-[#B68B39] to-[#9a7109] text-white font-bold rounded-xl hover:from-[#a0762d] hover:to-[#7a5607] transition-all duration-200 text-[14px] shadow-lg shadow-[#B68B39]/20 flex items-center justify-center gap-2"
            >
              Submit Visit Request
              <MdCheck size={18} />
            </button>

            {/* Cancel */}
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 text-gray-600 text-[13px] font-semibold hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default TenantScheduleVisitModal;