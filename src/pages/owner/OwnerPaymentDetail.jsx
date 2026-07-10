import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  MdArrowBack, MdCheckCircle, MdAccountBalanceWallet, MdDateRange,
  MdInsertDriveFile, MdRemoveRedEye, MdFileDownload, MdShare, MdClose,
  MdChatBubbleOutline
} from 'react-icons/md';

const OwnerPaymentDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Mock data representing TXN-1025 details
  const txnDetail = {
    id: id || 'TXN-1025',
    status: 'PAID SUCCESSFULLY',
    tenantName: 'Ali Raza',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80',
    propertyName: 'Skyline Luxury Apartment',
    monthlyRent: 'PKR 120,000',
    paymentMethod: 'Bank Transfer',
    transactionDate: '05 Jan 2026',
    dueDate: '05 Jan 2026',
    rentAmount: 'PKR 120,000',
    serviceCharges: 'PKR 5,000',
    totalAmount: 'PKR 125,000',
    documents: [
      { name: 'Payment Receipt PDF', size: '2.4 MB' },
      { name: 'Transaction Summary', size: '1.1 MB' },
      { name: 'Payment Confirmation', size: '656 KB' },
    ]
  };

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
      setShowModal(false);
    }, 2000);
  };

  return (
    <div className="p-4 md:p-7 space-y-6 max-w-[1600px] mx-auto bg-[#F8F9FC] min-h-screen relative">
      
      {/* ── Top Header ── */}
      <div className="flex items-center gap-3.5">
        <button
          onClick={() => navigate('/owner/payments')}
          className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-700 hover:bg-gray-50 active:scale-95 transition-all shadow-sm"
        >
          <MdArrowBack size={20} />
        </button>
        <div>
          <h2 className="text-xl md:text-[24px] font-extrabold text-[#112338] tracking-tight">
            Payment Details
          </h2>
          <p className="text-gray-400 text-[12.5px] mt-0.5">
            View complete transaction information and payment activity.
          </p>
        </div>
      </div>

      {/* ── Main Layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Transaction Information */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_2px_16px_rgba(0,0,0,0.03)] border border-gray-100/80 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-50 pb-4">
              <h3 className="text-[16px] font-extrabold text-[#112338]">Transaction Information</h3>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10.5px] font-black tracking-wide uppercase select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {txnDetail.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Transaction ID</span>
                <p className="text-[14px] font-black text-[#112338] mt-1.5">{txnDetail.id}</p>
              </div>

              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Tenant Name</span>
                <div className="flex items-center gap-2.5 mt-1.5">
                  <img
                    src={txnDetail.avatar}
                    alt={txnDetail.tenantName}
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-gray-100"
                  />
                  <span className="text-[14px] font-black text-[#112338]">{txnDetail.tenantName}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Property Name</span>
                <p className="text-[14px] font-black text-[#112338] mt-1.5">{txnDetail.propertyName}</p>
              </div>

              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Monthly Rent</span>
                <p className="text-[14px] font-black text-[#112338] mt-1.5">{txnDetail.monthlyRent}</p>
              </div>

              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Payment Method</span>
                <div className="flex items-center gap-2 text-[14px] font-black text-[#112338] mt-1.5">
                  <MdAccountBalanceWallet size={18} className="text-gray-400" />
                  <span>{txnDetail.paymentMethod}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Transaction Date</span>
                <p className="text-[14px] font-black text-[#112338] mt-1.5">{txnDetail.transactionDate}</p>
              </div>

              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Payment Due Date</span>
                <p className="text-[14px] font-black text-[#112338] mt-1.5">{txnDetail.dueDate}</p>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_2px_16px_rgba(0,0,0,0.03)] border border-gray-100/80">
            <h3 className="text-[16px] font-extrabold text-[#112338] border-b border-gray-50 pb-4 mb-5">Payment Summary</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-gray-500 font-medium">Rent Amount</span>
                <span className="font-bold text-[#112338]">{txnDetail.rentAmount}</span>
              </div>
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-gray-500 font-medium">Service Charges</span>
                <span className="font-bold text-[#112338]">{txnDetail.serviceCharges}</span>
              </div>
              
              <div className="h-px bg-gray-100 my-2" />
              
              <div className="flex justify-between items-center pt-2">
                <span className="text-[16px] font-extrabold text-[#112338]">Total Amount</span>
                <span className="text-[20px] font-black text-[#112338]">{txnDetail.totalAmount}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (1 Col) */}
        <div className="space-y-4">
          
          {/* Receipts & Documents Card */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_2px_16px_rgba(0,0,0,0.03)] border border-gray-100/80">
            <h3 className="text-[16px] font-extrabold text-[#112338] mb-5">Receipts &amp; Documents</h3>
            
            <div className="space-y-3">
              {txnDetail.documents.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 bg-gray-50/50 hover:bg-gray-50 rounded-xl border border-gray-100/60 transition-colors duration-150"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                      <MdInsertDriveFile size={18} />
                    </div>
                    <div>
                      <p className="text-[13px] font-extrabold text-[#112338] leading-tight">{doc.name}</p>
                      <p className="text-[11px] text-gray-400 mt-1 font-medium">{doc.size}</p>
                    </div>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-white text-gray-400 hover:text-gray-700 flex items-center justify-center shadow-sm hover:shadow active:scale-95 border border-gray-100 transition-all">
                    <MdRemoveRedEye size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => setShowModal(true)}
              className="w-full py-3.5 rounded-xl bg-[#B68B39] text-white text-[13.5px] font-black shadow-lg shadow-[#B68B39]/15 hover:bg-[#a0762d] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <MdFileDownload size={19} /> Download Receipt
            </button>

            <button className="w-full py-3.5 rounded-xl border border-gray-200 bg-white text-[#112338] text-[13.5px] font-black shadow-sm hover:bg-gray-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              <MdChatBubbleOutline size={18} /> Contact Tenant
            </button>
          </div>

        </div>

      </div>

      {/* ── Modal Dialog (Image 4) ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Modal Backdrop */}
          <div
            onClick={() => setShowModal(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          />

          {/* Modal Content container */}
          <div className="relative w-full max-w-[450px] bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 transform scale-100 transition-transform duration-300 space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-[17px] font-extrabold text-[#112338] leading-tight">
                  Download Payment Receipt
                </h3>
                <p className="text-gray-400 text-[12.5px] mt-1 font-medium">
                  Select your preferred document format to proceed.
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <MdClose size={20} />
              </button>
            </div>

            {/* Options */}
            <div className="space-y-3.5">
              
              {/* Option 1: PDF Receipt */}
              <div
                onClick={() => setSelectedFormat('pdf')}
                className={`flex items-start justify-between p-4 rounded-2xl border cursor-pointer select-none transition-all duration-200
                  ${selectedFormat === 'pdf'
                    ? 'border-[#B68B39] bg-[#B68B39]/5 shadow-sm'
                    : 'border-gray-100 hover:border-gray-200 bg-white'}`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                    <MdInsertDriveFile size={20} />
                  </div>
                  <div>
                    <h4 className="text-[13.5px] font-bold text-[#112338] leading-tight">PDF Receipt</h4>
                    <p className="text-[11px] text-gray-400 mt-1 font-medium">Complete payment documentation</p>
                  </div>
                </div>
                <div className="flex items-center mt-1">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors
                    ${selectedFormat === 'pdf' ? 'border-[#B68B39] bg-[#B68B39] text-white' : 'border-gray-300'}`}>
                    {selectedFormat === 'pdf' && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
              </div>

              {/* Option 2: Transaction Summary */}
              <div
                onClick={() => setSelectedFormat('summary')}
                className={`flex items-start justify-between p-4 rounded-2xl border cursor-pointer select-none transition-all duration-200
                  ${selectedFormat === 'summary'
                    ? 'border-[#B68B39] bg-[#B68B39]/5 shadow-sm'
                    : 'border-gray-100 hover:border-gray-200 bg-white'}`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                    <MdInsertDriveFile size={20} />
                  </div>
                  <div>
                    <h4 className="text-[13.5px] font-bold text-[#112338] leading-tight">Transaction Summary</h4>
                    <p className="text-[11px] text-gray-400 mt-1 font-medium">Detailed breakdown of charges</p>
                  </div>
                </div>
                <div className="flex items-center mt-1">
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <MdRemoveRedEye size={18} />
                  </button>
                </div>
              </div>

            </div>

            {/* Modal Actions */}
            <div className="space-y-4 pt-2">
              <button
                onClick={handleDownload}
                className="w-full py-3.5 rounded-xl bg-[#112338] text-white text-[13.5px] font-black shadow-lg shadow-[#112338]/15 hover:bg-[#1f3854] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <MdFileDownload size={19} /> Download PDF
              </button>

              <div className="flex items-center justify-between">
                <button className="px-4 py-2 border border-gray-100 rounded-xl text-[12px] font-bold text-gray-600 hover:bg-gray-50 active:scale-95 transition-all flex items-center gap-1.5">
                  <MdShare size={16} /> Share Receipt
                </button>

                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-[12px] font-bold text-gray-500 hover:text-gray-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Success Toast banner inside modal */}
            {downloadSuccess && (
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 text-[12.5px] font-extrabold animate-fade-in shadow-sm select-none">
                <MdCheckCircle className="text-emerald-500 shrink-0" size={18} />
                <span>Receipt downloaded successfully.</span>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default OwnerPaymentDetail;
