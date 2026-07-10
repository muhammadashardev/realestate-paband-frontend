import { API_BASE_URL } from '../constants/apiConfig';
import { apiRequest } from './api';

const buildQueryString = (params = {}) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.append(key, value);
    }
  });
  return query.toString();
};

const buildVisitPayload = (payload = {}) => {
  const propertyId = payload.propertyId || payload.property || payload.propertyMongoId;
  const preferredVisitDate = payload.preferredVisitDate || payload.visitDate;
  const preferredTimeSlot = payload.preferredTimeSlot || payload.timeSlot;
  const contactNumber = payload.contactNumber || payload.phone;
  const additionalMessage = payload.additionalMessage || payload.message;

  const body = {
    propertyId,
    preferredVisitDate,
    preferredTimeSlot,
    contactNumber,
  };

  if (payload.numberOfVisitors !== undefined && payload.numberOfVisitors !== null && payload.numberOfVisitors !== '') {
    body.numberOfVisitors = Number(payload.numberOfVisitors);
  }

  if (additionalMessage) {
    body.additionalMessage = additionalMessage;
  }

  return body;
};

export const createVisitRequest = async (payload) => {
  return await apiRequest('/api/visits', {
    method: 'POST',
    body: buildVisitPayload(payload),
  });
};

export const getMyVisitRequests = async (filters = {}) => {
  const query = buildQueryString(filters);
  return await apiRequest(`/api/visits${query ? `?${query}` : ''}`, {
    method: 'GET',
  });
};

export const getMyVisitRequestById = async (id) => {
  return await apiRequest(`/api/visits/${id}`, { method: 'GET' });
};

export const getOwnerVisits = async (filters = {}) => {
  const query = buildQueryString(filters);
  return await apiRequest(`/api/owner/visits${query ? `?${query}` : ''}`, {
    method: 'GET',
  });
};

export const getOwnerVisitRequest = async (id) => {
  return await apiRequest(`/api/owner/visits/${id}`, { method: 'GET' });
};

export const updateOwnerVisitStatus = async (id, body) => {
  return await apiRequest(`/api/owner/visits/${id}/status`, {
    method: 'PUT',
    body,
  });
};

export const cancelVisitRequest = async (id) => {
  return await apiRequest(`/api/visits/${id}/cancel`, {
    method: 'PUT',
  });
};

export const getAdminVisits = async (filters = {}) => {
  const query = buildQueryString(filters);
  return await apiRequest(`/api/admin/visits${query ? `?${query}` : ''}`, {
    method: 'GET',
  });
};

export const getAdminVisitStats = async () => {
  return await apiRequest('/api/admin/visits/stats', { method: 'GET' });
};

export const rescheduleVisit = async (id, body = {}) => {
  return await apiRequest(`/api/visits/${id}/reschedule`, {
    method: 'PUT',
    body,
  });
};
