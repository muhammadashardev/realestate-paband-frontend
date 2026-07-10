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

const notificationEndpoint = (owner = false) =>
  owner ? '/api/owner/notifications' : '/api/notifications';

export const getNotifications = async (filters = {}, owner = false) => {
  const query = buildQueryString(filters);
  return await apiRequest(`${notificationEndpoint(owner)}${query ? `?${query}` : ''}`, {
    method: 'GET',
  });
};

export const markNotificationsRead = async (notificationId, owner = false) => {
  return await apiRequest(`${notificationEndpoint(owner)}/mark-read`, {
    method: 'PUT',
    body: notificationId ? { notificationId } : undefined,
  });
};
