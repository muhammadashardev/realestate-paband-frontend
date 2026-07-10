/**
 * Middleware for handling API errors and adding common headers
 */

export const apiMiddleware = (fetch) => {
  return (url, options = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const token = localStorage.getItem('token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return fetch(url, { ...options, headers });
  };
};

export default apiMiddleware;
