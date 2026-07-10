/**
 * Type definitions for common objects
 * These are used for PropTypes or TypeScript interfaces
 */

// User types
export const UserTypes = {
  id: 'string',
  email: 'string',
  name: 'string',
  role: 'enum: admin, owner, tenant',
  avatar: 'string',
  createdAt: 'date',
};

// Property types
export const PropertyTypes = {
  id: 'string',
  title: 'string',
  description: 'string',
  address: 'string',
  city: 'string',
  state: 'string',
  zipCode: 'string',
  price: 'number',
  beds: 'number',
  baths: 'number',
  sqft: 'number',
  images: 'array of strings',
  ownerId: 'string',
  status: 'enum: available, rented, maintenance',
  createdAt: 'date',
};

// Rental types
export const RentalTypes = {
  id: 'string',
  propertyId: 'string',
  tenantId: 'string',
  startDate: 'date',
  endDate: 'date',
  rentAmount: 'number',
  status: 'enum: active, pending, completed, cancelled',
  createdAt: 'date',
};

// Notification types
export const NotificationTypes = {
  id: 'string',
  message: 'string',
  type: 'enum: success, error, warning, info',
  duration: 'number in ms',
  createdAt: 'date',
};
