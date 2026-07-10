import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPropertyById, saveProperty } from '../../utils/propertyService';
import PropertyForm from '../../components/owner/PropertyForm';

const OwnerEditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const data = getPropertyById(id);
    if (data) {
      setProperty(data);
    }
  }, [id]);

  const handleSubmit = (formData) => {
    saveProperty({ ...formData, id });
    navigate('/owner/properties');
  };

  if (!property) {
    return (
      <div className="p-8 text-center bg-[#F8F9FC] min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 font-semibold">Loading property data...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-[1600px] mx-auto bg-[#F8F9FC] min-h-screen">
      
      {/* Title block */}
      <div>
        <h2 className="text-[28px] font-extrabold text-[#112338] leading-tight tracking-tight">
          Edit Property
        </h2>
        <p className="text-gray-500 text-[13px] md:text-[14.5px] mt-1 font-medium font-sans">
          Update your property information, pricing details, and verification documents.
        </p>
      </div>

      {/* Render High-Fidelity Form */}
      <PropertyForm initialData={property} isEdit={true} onSubmit={handleSubmit} />

    </div>
  );
};

export default OwnerEditProperty;
