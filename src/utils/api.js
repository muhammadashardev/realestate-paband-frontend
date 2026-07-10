import { API_BASE_URL } from '../constants/apiConfig';

const BASE_URL = API_BASE_URL || '';

// Helper to get auth headers
const getAuthHeaders = (isMultipart = false) => {
  const token = localStorage.getItem('accessToken');
  const headers = {};

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (!isMultipart) {
    headers['Content-Type'] = 'application/json';
  }

  return headers;
};

// Generic request wrapper
export const apiRequest = async (endpoint, options = {}) => {
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${BASE_URL}${normalizedEndpoint}`;

  const isMultipart = options.body instanceof FormData;
  const headers = {
    ...getAuthHeaders(isMultipart),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  // Stringify JSON body if it's not FormData
  if (options.body && !(options.body instanceof FormData)) {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || `Request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API Error in ${endpoint}:`, error);
    throw error;
  }
};

// Authentication actions
export const login = async (email, password) => {
  const data = await apiRequest('/api/auth/login', {
    method: 'POST',
    body: { email, password },
  });
  if (data.accessToken) {
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('token', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  return data;
};

export const googleLogin = async (credential, role = 'tenant') => {
  const normalizedRole = role?.toLowerCase?.() || 'tenant';
  const data = await apiRequest('/api/auth/google', {
    method: 'POST',
    body: {
      credential,
      role: normalizedRole,
      selectedRole: normalizedRole,
      isOwner: normalizedRole === 'owner',
      isTenant: normalizedRole === 'tenant',
    },
  });
  if (data.accessToken) {
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('token', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  return data;
};

export const register = async (userData) => {
  return await apiRequest('/api/auth/register', {
    method: 'POST',
    body: userData,
  });
};

export const verifyOtp = async (email, otp) => {
  const data = await apiRequest('/api/auth/verify-otp', {
    method: 'POST',
    body: { email, otp },
  });
  if (data.accessToken) {
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('token', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  return data;
};

export const resendOtp = async (email) => {
  return await apiRequest('/api/auth/resend-otp', {
    method: 'POST',
    body: { email },
  });
};

export const logout = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    if (refreshToken) {
      await apiRequest('/api/auth/logout', {
        method: 'POST',
        body: { refreshToken },
      });
    }
  } catch (e) {
    console.error('Logout request failed', e);
  } finally {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Profile related API helpers
export const getProfile = async () => {
  const data = await apiRequest('/api/profile', { method: 'GET' });
  return data.user || data;
};

export const updateProfile = async (profileData) => {
  return await apiRequest('/api/profile', {
    method: 'PUT',
    body: profileData,
  });
};

export const uploadAvatar = async (formData) => {
  return await apiRequest('/api/profile/avatar', {
    method: 'POST',
    body: formData,
  });
};

export const changePassword = async (body) => {
  return await apiRequest('/api/profile/change-password', {
    method: 'POST',
    body,
  });
};

export const getNotificationPreferences = async () => {
  const data = await apiRequest('/api/profile/notifications', { method: 'GET' });
  return data.notificationPreferences || data;
};

export const updateNotificationPreferences = async (prefs) => {
  return await apiRequest('/api/profile/notifications', {
    method: 'PUT',
    body: prefs,
  });
};

// Agreement related API helpers
export const createAgreement = async (agreementData) => {
  const data = await apiRequest('/api/agreements', {
    method: 'POST',
    body: agreementData,
  });
  return data?.agreement || data?.data || data;
};

export const getAgreements = async () => {
  const data = await apiRequest('/api/agreements', { method: 'GET' });
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.agreements)) return data.agreements;
  if (Array.isArray(data?.data)) return data.data;
  return [];
};

export const getAgreementById = async (id) => {
  const data = await apiRequest(`/api/agreements/${id}`, { method: 'GET' });
  return data?.agreement || data?.data || data;
};

export const sendAgreement = async (id) => {
  const data = await apiRequest(`/api/agreements/${id}/send`, { method: 'PUT' });
  return data?.agreement || data?.data || data;
};

export const signAgreement = async (id, payload) => {
  const data = await apiRequest(`/api/agreements/${id}/sign`, {
    method: 'PUT',
    body: payload,
  });
  return data?.agreement || data?.data || data;
};

export const updateAgreementStatus = async (id, statusOrPayload) => {
  const payload = typeof statusOrPayload === 'string'
    ? { status: statusOrPayload }
    : statusOrPayload || {};

  const data = await apiRequest(`/api/agreements/${id}/status`, {
    method: 'PATCH',
    body: payload,
  });

  return data?.agreement || data?.data || data;
};

export const getTenantsList = async () => {
  const data = await apiRequest('/api/agreements/tenants', { method: 'GET' });
  return data?.tenants || [];
};

