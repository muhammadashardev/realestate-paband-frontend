export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    VERIFY_OTP: '/auth/verify-otp',
    RESEND_OTP: '/auth/resend-otp',
  },
  PROFILE: {
    SELF: '/profile',
    UPDATE: '/profile',
    AVATAR: '/profile/avatar',
    CHANGE_PASSWORD: '/profile/change-password',
    NOTIFICATIONS: '/profile/notifications',
    NOTIFICATION_MARK_READ: '/profile/notifications/:id/mark-read',
    NOTIFICATION_MARK_ALL_READ: '/profile/notifications/mark-all-read',
    NOTIFICATION_DELETE: '/profile/notifications/:id',
  },
  PROPERTIES: {
    LIST: '/properties',
    GET: '/properties/:id',
    CREATE: '/properties',
    UPDATE: '/properties/:id',
    DELETE: '/properties/:id',
  },
  RENTALS: {
    LIST: '/rentals',
    GET: '/rentals/:id',
    CREATE: '/rentals',
    UPDATE: '/rentals/:id',
  },
  TENANTS: {
    LIST: '/tenants',
    GET: '/tenants/:id',
    DETAIL: '/tenants/:id/detail',
  },
};
