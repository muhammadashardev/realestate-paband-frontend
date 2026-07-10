import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdInfo, MdCloudUpload, MdClose, MdInsertDriveFile, MdSecurity
} from 'react-icons/md';

const PropertyForm = ({ initialData, isEdit, onSubmit, isSubmitting }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // State for form fields
  const [formData, setFormData] = useState({
    title: '',
    type: 'Apartment',
    city: 'Karachi',
    location: '',
    rent: '',
    size: '',
    bedrooms: '3',
    bathrooms: '2',
    furnishing: 'Furnished',
    parking: true,
    description: '',
    images: [],       // Preview URLs for display
    imageFiles: [],   // Actual File objects for upload
    ownershipDoc: '',
    utilityBill: '',
    taxReceipt: ''
  });

  // Populate data in edit mode
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...formData,
        ...initialData
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleParking = () => {
    setFormData(prev => ({ ...prev, parking: !prev.parking }));
  };

  const handleFurnishingChange = (status) => {
    setFormData(prev => ({ ...prev, furnishing: status }));
  };

  // Real file upload handler
  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newPreviews],
      imageFiles: [...prev.imageFiles, ...files]
    }));

    // Reset input so same file can be selected again
    e.target.value = '';
  };

  const handleRemoveImage = (indexToRemove) => {
    // Revoke the object URL to free memory
    if (formData.images[indexToRemove]?.startsWith('blob:')) {
      URL.revokeObjectURL(formData.images[indexToRemove]);
    }
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove),
      imageFiles: prev.imageFiles.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  const handleDocUpload = (docField) => {
    const filenames = {
      ownershipDoc: 'ownership_deed.pdf',
      utilityBill: 'k_electric_bill.pdf',
      taxReceipt: 'property_tax_receipt.jpg'
    };
    setFormData(prev => ({
      ...prev,
      [docField]: filenames[docField]
    }));
  };

  const handleRemoveDoc = (docField) => {
    setFormData(prev => ({
      ...prev,
      [docField]: ''
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

      {/* Left Column - Basic Information Form */}
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.015)] border border-gray-100/60 space-y-6">

          {/* Header Info Banner */}
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <div className="w-7 h-7 rounded-lg bg-[#B68B39]/10 flex items-center justify-center">
              <MdInfo size={16} className="text-[#B68B39]" />
            </div>
            <h3 className="text-[17px] font-extrabold text-[#112338]">Basic Information</h3>
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            {/* Property Title */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">Property Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Modern Studio at Ocean View"
                className="w-full border border-gray-200 rounded-lg text-[13.5px] text-gray-800 placeholder-gray-400 px-3.5 py-2.5 focus:outline-none focus:border-[#B68B39] transition-all bg-[#F9FAFB]/30"
                required
              />
            </div>

            {/* Property Type & City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">Property Type</label>
                <div className="relative">
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg text-[13.5px] text-gray-700 bg-[#F9FAFB]/30 px-3.5 py-2.5 focus:outline-none focus:border-[#B68B39] appearance-none cursor-pointer"
                  >
                    <option>Apartment</option>
                    <option>House</option>
                    <option>Villa</option>
                    <option>Penthouse</option>
                    <option>Condo</option>
                  </select>
                  <div className="absolute right-3.5 top-3.5 pointer-events-none text-gray-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">City</label>
                <div className="relative">
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg text-[13.5px] text-gray-700 bg-[#F9FAFB]/30 px-3.5 py-2.5 focus:outline-none focus:border-[#B68B39] appearance-none cursor-pointer"
                  >
                    <option>Karachi</option>
                    <option>Lahore</option>
                    <option>Islamabad</option>
                    <option>Rawalpindi</option>
                    <option>Peshawar</option>
                  </select>
                  <div className="absolute right-3.5 top-3.5 pointer-events-none text-gray-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Area / Location */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">Area / Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Full address or area name"
                className="w-full border border-gray-200 rounded-lg text-[13.5px] text-gray-800 placeholder-gray-400 px-3.5 py-2.5 focus:outline-none focus:border-[#B68B39] transition-all bg-[#F9FAFB]/30"
                required
              />
            </div>

            {/* Rent Amount & Property Size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">Rent Amount (PKR)</label>
                <input
                  type="number"
                  name="rent"
                  value={formData.rent}
                  onChange={handleChange}
                  placeholder="Enter monthly rent"
                  className="w-full border border-gray-200 rounded-lg text-[13.5px] text-gray-800 placeholder-gray-400 px-3.5 py-2.5 focus:outline-none focus:border-[#B68B39] transition-all bg-[#F9FAFB]/30"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">Property Size (sq. ft.)</label>
                <input
                  type="number"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  placeholder="e.g. 1200"
                  className="w-full border border-gray-200 rounded-lg text-[13.5px] text-gray-800 placeholder-gray-400 px-3.5 py-2.5 focus:outline-none focus:border-[#B68B39] transition-all bg-[#F9FAFB]/30"
                  required
                />
              </div>
            </div>

            {/* Bedrooms & Bathrooms */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">Bedrooms</label>
                <div className="relative">
                  <select
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg text-[13.5px] text-gray-700 bg-[#F9FAFB]/30 px-3.5 py-2.5 focus:outline-none focus:border-[#B68B39] appearance-none cursor-pointer"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5+</option>
                  </select>
                  <div className="absolute right-3.5 top-3.5 pointer-events-none text-gray-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">Bathrooms</label>
                <div className="relative">
                  <select
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg text-[13.5px] text-gray-700 bg-[#F9FAFB]/30 px-3.5 py-2.5 focus:outline-none focus:border-[#B68B39] appearance-none cursor-pointer"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5+</option>
                  </select>
                  <div className="absolute right-3.5 top-3.5 pointer-events-none text-gray-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Furnishing Status */}
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">Furnishing Status</label>
              <div className="flex items-center gap-6">
                {['Furnished', 'Semi', 'Unfurnished'].map((status) => (
                  <label key={status} className="flex items-center gap-2 text-[13.5px] font-semibold text-gray-700 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="furnishing"
                      checked={formData.furnishing === status}
                      onChange={() => handleFurnishingChange(status)}
                      className="w-4 h-4 text-[#B68B39] focus:ring-[#B68B39] border-gray-300"
                    />
                    {status}
                  </label>
                ))}
              </div>
            </div>

            {/* Parking Availability Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-[#F9FAFB]/30">
              <div>
                <p className="text-[13.5px] font-bold text-gray-800">Parking Availability</p>
                <p className="text-[11.5px] text-gray-400 font-medium">Is there parking space available on premises?</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.parking}
                  onChange={handleToggleParking}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:height-5 after:width-5 after:transition-all peer-checked:bg-[#B68B39]" />
                <span className="ml-2 text-[13px] font-bold text-gray-700">{formData.parking ? 'Parking Available' : 'None'}</span>
              </label>
            </div>

            {/* Add Images Upload Box */}
            <div className="space-y-3">
              <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">Add Images</label>

              {/* Hidden file input for real file selection */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelected}
                accept="image/jpeg,image/jpg,image/png"
                multiple
                className="hidden"
              />
              {/* Drag-and-drop trigger area */}
              <div
                onClick={handleImageUpload}
                className="border-2 border-dashed border-gray-200 hover:border-[#B68B39]/50 rounded-2xl p-7 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all bg-[#F9FAFB]/30 hover:bg-gray-50/50"
              >
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                  <MdCloudUpload size={24} />
                </div>
                <p className="text-[13px] font-semibold text-gray-500">
                  Browse photo <span className="text-gray-400 font-medium">or drop here</span>
                </p>
              </div>

              {/* Thumbnails Row */}
              {formData.images.length > 0 && (
                <div className="flex flex-wrap gap-3.5 pt-2">
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden group border border-gray-100">
                      <img src={img} alt="Preview" className="w-full h-full object-cover" />
                      {/* Delete icon badge on top right */}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#EF4444] text-white flex items-center justify-center shadow-md active:scale-95 transition-all hover:bg-red-600"
                      >
                        <MdClose size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Property Description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">Property Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                placeholder="Describe the key features, amenities, and surroundings..."
                className="w-full border border-gray-200 rounded-lg text-[13.5px] text-gray-800 placeholder-gray-400 px-3.5 py-2.5 focus:outline-none focus:border-[#B68B39] transition-all bg-[#F9FAFB]/30 resize-none"
                required
              />
            </div>

          </div>

          {/* Form Actions bottom bar */}
          <div className="flex justify-end gap-3.5 border-t border-gray-100 pt-5">
            <button
              type="button"
              onClick={() => navigate('/owner/properties')}
              className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-500 text-[13px] font-bold hover:bg-gray-50 transition-all active:scale-[0.98]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2.5 rounded-lg text-white text-[13px] font-bold shadow-lg shadow-[#B68B39]/20 transition-all active:scale-[0.98] ${isSubmitting ? 'bg-[#8b6a2f] cursor-not-allowed opacity-70' : 'bg-[#B68B39] hover:bg-[#a0762d]'}`}
            >
              {isSubmitting ? (isEdit ? 'Saving...' : 'Publishing...') : (isEdit ? 'Save Changes' : 'Publish Property')}
            </button>
          </div>

        </div>
      </div>

      {/* Right Column - Verification Documents Sidebar */}
      <div className="lg:col-span-4 space-y-6">

        {/* Verification Documents Upload Card */}
        <div className="bg-white rounded-3xl p-6 shadow-[0_4px_25px_rgba(0,0,0,0.015)] border border-gray-100/60 space-y-5">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <div className="w-7 h-7 rounded-lg bg-[#B68B39]/10 flex items-center justify-center">
              <MdInsertDriveFile size={16} className="text-[#B68B39]" />
            </div>
            <h3 className="text-[15.5px] font-extrabold text-[#112338]">Verification Documents</h3>
          </div>

          <p className="text-[12.5px] text-gray-400 font-medium leading-relaxed">
            Please upload necessary documents to verify ownership and expedite the listing process.
          </p>

          {/* Upload Slots */}
          <div className="space-y-4">

            {/* Ownership Documents - REQUIRED */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11.5px] font-bold tracking-wide uppercase">
                <span className="text-gray-700">Ownership Documents</span>
                <span className="text-[#F97316]">Required</span>
              </div>

              {formData.ownershipDoc ? (
                <div className="flex items-center justify-between p-3 rounded-lg border border-emerald-100 bg-[#EBFDF5] text-[13px]">
                  <span className="truncate font-semibold text-emerald-800">{formData.ownershipDoc}</span>
                  <button type="button" onClick={() => handleRemoveDoc('ownershipDoc')} className="text-red-500 hover:text-red-700">
                    <MdClose size={16} />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => handleDocUpload('ownershipDoc')}
                  className="border border-dashed border-gray-200 hover:border-[#B68B39] rounded-xl p-3.5 flex items-center justify-center gap-1.5 cursor-pointer text-gray-400 hover:text-[#B68B39] transition-all text-xs font-bold bg-[#F9FAFB]/50 hover:bg-gray-50/50"
                >
                  <span>+ Upload PDF/JPG</span>
                </div>
              )}
            </div>

            {/* Utility Bills (Latest) - OPTIONAL */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11.5px] font-bold tracking-wide uppercase">
                <span className="text-gray-700">Utility Bills (Latest)</span>
                <span className="text-gray-400 font-semibold">Optional</span>
              </div>

              {formData.utilityBill ? (
                <div className="flex items-center justify-between p-3 rounded-lg border border-emerald-100 bg-[#EBFDF5] text-[13px]">
                  <span className="truncate font-semibold text-emerald-800">{formData.utilityBill}</span>
                  <button type="button" onClick={() => handleRemoveDoc('utilityBill')} className="text-red-500 hover:text-red-700">
                    <MdClose size={16} />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => handleDocUpload('utilityBill')}
                  className="border border-dashed border-gray-200 hover:border-[#B68B39] rounded-xl p-3.5 flex items-center justify-center gap-1.5 cursor-pointer text-gray-400 hover:text-[#B68B39] transition-all text-xs font-bold bg-[#F9FAFB]/50 hover:bg-gray-50/50"
                >
                  <span>+ Upload PDF/JPG</span>
                </div>
              )}
            </div>

            {/* Property Tax Receipt - OPTIONAL */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11.5px] font-bold tracking-wide uppercase">
                <span className="text-gray-700">Property Tax Receipt</span>
                <span className="text-gray-400 font-semibold">Optional</span>
              </div>

              {formData.taxReceipt ? (
                <div className="flex items-center justify-between p-3 rounded-lg border border-emerald-100 bg-[#EBFDF5] text-[13px]">
                  <span className="truncate font-semibold text-emerald-800">{formData.taxReceipt}</span>
                  <button type="button" onClick={() => handleRemoveDoc('taxReceipt')} className="text-red-500 hover:text-red-700">
                    <MdClose size={16} />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => handleDocUpload('taxReceipt')}
                  className="border border-dashed border-gray-200 hover:border-[#B68B39] rounded-xl p-3.5 flex items-center justify-center gap-1.5 cursor-pointer text-gray-400 hover:text-[#B68B39] transition-all text-xs font-bold bg-[#F9FAFB]/50 hover:bg-gray-50/50"
                >
                  <span>+ Upload PDF/JPG</span>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Verification Policy Blue Box */}
        <div className="bg-[#0A2240] text-white rounded-3xl p-6 shadow-[0_4px_25px_rgba(0,0,0,0.02)] space-y-3.5 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-32 h-32 rounded-full bg-[#B68B39]/10 blur-xl pointer-events-none" />

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#B68B39]/15 flex items-center justify-center text-[#B68B39] border border-[#B68B39]/30 shrink-0">
              <MdSecurity size={20} />
            </div>
            <h4 className="text-[15px] font-extrabold">Verification Policy</h4>
          </div>

          <p className="text-[12.5px] text-gray-300 leading-relaxed font-medium">
            All new properties undergo a 24-48 hour verification process by the Paband team to ensure legitimacy and trust for potential tenants.
          </p>

          <a href="#" className="inline-block text-[#B68B39] hover:underline text-[12px] font-bold">
            Learn more about our process
          </a>
        </div>

      </div>

    </form>
  );
};

export default PropertyForm;
