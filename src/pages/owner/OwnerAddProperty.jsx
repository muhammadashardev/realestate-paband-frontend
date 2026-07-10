import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveProperty } from '../../utils/propertyService';
import PropertyForm from '../../components/owner/PropertyForm';

const OwnerAddProperty = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const isSubmittingRef = useRef(false);

  const handleSubmit = async (formData) => {
    if (isSubmittingRef.current) {
      return;
    }

    isSubmittingRef.current = true;
    setError('');
    setLoading(true);

    try {
      await saveProperty(formData);
      navigate('/owner/properties');
    } catch (err) {
      setError(err.message || 'Failed to add property. Please try again.');
      console.error('Error adding property:', err);
    } finally {
      setLoading(false);
      isSubmittingRef.current = false;
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-[1600px] mx-auto bg-[#F8F9FC] min-h-screen">

      {/* Title block */}
      <div>
        <h2 className="text-[28px] font-extrabold text-[#112338] leading-tight tracking-tight">
          Add Property
        </h2>
        <p className="text-gray-500 text-[13px] md:text-[14.5px] mt-1 font-medium font-sans">
          Register a new rental property on the Paband trusted rental portal.
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Render High-Fidelity Form */}
      <PropertyForm isEdit={false} isSubmitting={loading} onSubmit={handleSubmit} />

    </div>
  );
};

export default OwnerAddProperty;
