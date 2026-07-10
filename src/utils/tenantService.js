// Tenant Service to manage mockup tenant data via localStorage

const STORAGE_KEY = 'paband_tenants';

const DEFAULT_TENANTS = [
  {
    id: 'TR-001',
    name: 'Ali Raza',
    profession: 'Software Engineer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    propertyId: '1',
    propertyTitle: 'Skyline Apartment',
    moveInDate: '05 Jan 2026',
    status: 'New Request',
    verification: 'Verified',
    familyMembers: '03 Members',
    preferredMoveIn: '15 February 2026',
    message: 'I am interested in renting this property for long-term residence. Looking forward to scheduling a visit.',
    documents: [
      { name: 'CNIC Copy', type: 'PDF', size: '1.2 MB' },
      { name: 'Salary Slip', type: 'JPG', size: '3.2 MB' },
      { name: 'Employment Letter', type: 'PDF', size: '2.1 MB' },
      { name: 'Reference Documents', type: 'ZIP', size: '4.5 MB' }
    ],
    verifications: {
      cnicVerified: true,
      phoneVerified: true,
      employmentVerified: false,
      documentsSubmitted: true
    }
  },
  {
    id: 'TR-002',
    name: 'Ali Raza',
    profession: 'Software Engineer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    propertyId: '1',
    propertyTitle: 'Skyline Apartment',
    moveInDate: '05 Jan 2026',
    status: 'Under Review',
    verification: 'Pending',
    familyMembers: '03 Members',
    preferredMoveIn: '15 February 2026',
    message: 'I am interested in renting this property for long-term residence. Looking forward to scheduling a visit.',
    documents: [
      { name: 'CNIC Copy', type: 'PDF', size: '1.2 MB' },
      { name: 'Salary Slip', type: 'JPG', size: '3.2 MB' },
      { name: 'Employment Letter', type: 'PDF', size: '2.1 MB' },
      { name: 'Reference Documents', type: 'ZIP', size: '4.5 MB' }
    ],
    verifications: {
      cnicVerified: true,
      phoneVerified: true,
      employmentVerified: false,
      documentsSubmitted: true
    }
  },
  {
    id: 'TR-003',
    name: 'Ali Raza',
    profession: 'Software Engineer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    propertyId: '1',
    propertyTitle: 'Skyline Apartment',
    moveInDate: '05 Jan 2026',
    status: 'New Request',
    verification: 'Verified',
    familyMembers: '03 Members',
    preferredMoveIn: '15 February 2026',
    message: 'I am interested in renting this property for long-term residence. Looking forward to scheduling a visit.',
    documents: [
      { name: 'CNIC Copy', type: 'PDF', size: '1.2 MB' },
      { name: 'Salary Slip', type: 'JPG', size: '3.2 MB' },
      { name: 'Employment Letter', type: 'PDF', size: '2.1 MB' },
      { name: 'Reference Documents', type: 'ZIP', size: '4.5 MB' }
    ],
    verifications: {
      cnicVerified: true,
      phoneVerified: true,
      employmentVerified: false,
      documentsSubmitted: true
    }
  },
  {
    id: 'TR-004',
    name: 'Ali Raza',
    profession: 'Software Engineer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    propertyId: '1',
    propertyTitle: 'Skyline Apartment',
    moveInDate: '05 Jan 2026',
    status: 'Under Review',
    verification: 'Pending',
    familyMembers: '03 Members',
    preferredMoveIn: '15 February 2026',
    message: 'I am interested in renting this property for long-term residence. Looking forward to scheduling a visit.',
    documents: [
      { name: 'CNIC Copy', type: 'PDF', size: '1.2 MB' },
      { name: 'Salary Slip', type: 'JPG', size: '3.2 MB' },
      { name: 'Employment Letter', type: 'PDF', size: '2.1 MB' },
      { name: 'Reference Documents', type: 'ZIP', size: '4.5 MB' }
    ],
    verifications: {
      cnicVerified: true,
      phoneVerified: true,
      employmentVerified: false,
      documentsSubmitted: true
    }
  },
  {
    id: 'TR-005',
    name: 'Ali Raza',
    profession: 'Software Engineer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    propertyId: '1',
    propertyTitle: 'Skyline Apartment',
    moveInDate: '05 Jan 2026',
    status: 'Under Review',
    verification: 'Pending',
    familyMembers: '03 Members',
    preferredMoveIn: '15 February 2026',
    message: 'I am interested in renting this property for long-term residence. Looking forward to scheduling a visit.',
    documents: [
      { name: 'CNIC Copy', type: 'PDF', size: '1.2 MB' },
      { name: 'Salary Slip', type: 'JPG', size: '3.2 MB' },
      { name: 'Employment Letter', type: 'PDF', size: '2.1 MB' },
      { name: 'Reference Documents', type: 'ZIP', size: '4.5 MB' }
    ],
    verifications: {
      cnicVerified: true,
      phoneVerified: true,
      employmentVerified: false,
      documentsSubmitted: true
    }
  }
];

export const getTenants = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_TENANTS));
    return DEFAULT_TENANTS;
  }
  return JSON.parse(data);
};

export const getTenantById = (id) => {
  const list = getTenants();
  return list.find(t => t.id === String(id));
};

export const updateTenantStatus = (id, newStatus) => {
  const list = getTenants();
  const idx = list.findIndex(t => t.id === String(id));
  if (idx !== -1) {
    list[idx].status = newStatus;
    // update verification based on status if needed, or keep separate
    if (newStatus === 'Approved') {
      list[idx].verification = 'Verified';
      list[idx].verifications.employmentVerified = true;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }
  return list;
};
