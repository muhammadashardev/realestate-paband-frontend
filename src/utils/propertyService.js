import { apiRequest } from './api';

// Transform form data to API schema
const transformPropertyData = (formData) => {
  const formDataObj = new FormData();

  // Map form fields to API field names
  if (formData.title) formDataObj.append('title', formData.title);
  if (formData.location) formDataObj.append('location', formData.location);
  if (formData.rent) formDataObj.append('price', formData.rent); // Map rent to price
  if (formData.size) formDataObj.append('sqft', formData.size); // Map size to sqft
  if (formData.bedrooms) formDataObj.append('beds', formData.bedrooms); // Map bedrooms to beds
  if (formData.bathrooms) formDataObj.append('baths', formData.bathrooms); // Map bathrooms to baths
  if (formData.type) formDataObj.append('propertyType', formData.type); // Map type to propertyType
  if (formData.description) formDataObj.append('description', formData.description);
  if (formData.city) formDataObj.append('city', formData.city);

  // Optional fields
  if (formData.parking !== undefined) formDataObj.append('parking', formData.parking);
  if (formData.furnishing) formDataObj.append('furnishing', formData.furnishing);
  if (formData.status) formDataObj.append('status', formData.status);

  // Handle image files - backend requires 'image' (main image) and 'gallery' (additional images)
  // If the form has actual File objects in imageFiles, use those
  if (formData.imageFiles && formData.imageFiles.length > 0) {
    // First file goes as main image
    formDataObj.append('image', formData.imageFiles[0]);
    // Remaining files go as gallery
    for (let i = 1; i < formData.imageFiles.length; i++) {
      formDataObj.append('gallery', formData.imageFiles[i]);
    }
  } else if (formData.images && formData.images.length > 0) {
    // Fallback: send image URLs as strings (for mock/URL-based images)
    formDataObj.append('image', formData.images[0]);
    if (formData.images.length > 1) {
      formDataObj.append('gallery', JSON.stringify(formData.images.slice(1)));
    }
  }

  return formDataObj;
};

// Helper to normalize property data - ensures ID field is always present
const normalizeProperty = (property) => {
  return {
    ...property,
    // Ensure _id is always set for consistent access
    _id: property._id || property.id || property.propertyId,
    id: property.id || property._id || property.propertyId,
  };
};

// Fetch all properties (supports filter query parameters)
export const getProperties = async (filters = {}) => {
  const queryParams = new URLSearchParams();
  Object.keys(filters).forEach(key => {
    if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
      queryParams.append(key, filters[key]);
    }
  });

  const queryStr = queryParams.toString();
  const endpoint = `/api/properties${queryStr ? `?${queryStr}` : ''}`;
  const response = await apiRequest(endpoint, { method: 'GET' });

  // Handle both direct array response and wrapped response
  const properties = Array.isArray(response) ? response : (response?.data || response?.properties || []);

  // Normalize each property to ensure ID fields exist
  return properties.map(normalizeProperty);
};

// Fetch properties for the authenticated owner only
// Uses the owner-specific endpoint and relies on the token for authorization.
export const getOwnerProperties = async (filters = {}, options = {}) => {
  const queryParams = new URLSearchParams();

  Object.keys(filters).forEach(key => {
    if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
      queryParams.append(key, filters[key]);
    }
  });

  const queryStr = queryParams.toString();
  const endpoint = `/api/owner/properties${queryStr ? `?${queryStr}` : ''}`;
  const response = await apiRequest(endpoint, { method: 'GET', ...options });

  const properties = Array.isArray(response)
    ? response
    : Array.isArray(response?.data)
      ? response.data
      : Array.isArray(response?.properties)
        ? response.properties
        : Array.isArray(response?.data?.properties)
          ? response.data.properties
          : [];

  return properties.map(normalizeProperty);
};

// Fetch single property by ID or propertyId
export const getPropertyById = async (id) => {
  if (!id) {
    throw new Error('Property ID is required');
  }
  const response = await apiRequest(`/api/properties/${id}`, { method: 'GET' });

  // Handle both direct object response and wrapped response
  const property = response?.data || response?.property || response;

  if (!property) {
    throw new Error('Property not found');
  }

  // Normalize the property to ensure ID fields exist
  return normalizeProperty(property);
};

// Save property (supports Create and Update)
// If property has an _id or id, it updates it via PUT. Else it creates a new one via POST.
export const saveProperty = async (property) => {
  const id = property.id || property._id;
  const formDataToSend = transformPropertyData(property);

  if (id) {
    // Edit/Update mode
    return await apiRequest(`/api/properties/${id}`, {
      method: 'PUT',
      body: formDataToSend,
    });
  } else {
    // Add/Create mode
    return await apiRequest('/api/properties', {
      method: 'POST',
      body: formDataToSend,
    });
  }
};

// Delete property by ID
export const deleteProperty = async (id) => {
  return await apiRequest(`/api/properties/${id}`, { method: 'DELETE' });
};
