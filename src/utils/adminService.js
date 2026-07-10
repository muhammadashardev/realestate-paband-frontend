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

export const getAdminUsers = async (filters = {}) => {
    const query = buildQueryString(filters);
    return await apiRequest(`/api/admin/users${query ? `?${query}` : ''}`, {
        method: 'GET',
    });
};

export const getAdminTenantDetails = async (tenantId) => {
    return await apiRequest(`/api/admin/tenant/${tenantId}`, {
        method: 'GET',
    });
};

export const approveTenant = async (tenantId) => {
    return await apiRequest(`/api/admin/tenant/approve/${tenantId}`, {
        method: 'PATCH',
    });
};

export const rejectTenant = async (tenantId, rejectionReason) => {
    return await apiRequest(`/api/admin/tenant/reject/${tenantId}`, {
        method: 'PATCH',
        body: { rejectionReason },
    });
};

export const suspendOwner = async (ownerId) => {
    return await apiRequest(`/api/admin/owner/suspend/${ownerId}`, {
        method: 'PATCH',
    });
};

export const activateOwner = async (ownerId) => {
    return await apiRequest(`/api/admin/owner/activate/${ownerId}`, {
        method: 'PATCH',
    });
};

export const getAdminProperties = async (filters = {}) => {
    const query = buildQueryString(filters);
    return await apiRequest(`/api/admin/properties${query ? `?${query}` : ''}`, {
        method: 'GET',
    });
};

export const getAdminPropertyDetails = async (propertyId) => {
    return await apiRequest(`/api/admin/properties/${propertyId}`, {
        method: 'GET',
    });
};

export const updateAdminPropertyStatus = async (propertyId, payload = {}) => {
    return await apiRequest(`/api/admin/properties/${propertyId}/status`, {
        method: 'PATCH',
        body: payload,
    });
};
