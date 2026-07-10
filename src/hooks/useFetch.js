import { useState, useCallback, useEffect } from 'react';

/**
 * Custom hook for fetching data from API
 * @param {string} url - API endpoint URL
 * @param {Object} options - Fetch options (method, headers, body, etc.)
 * @returns {Object} Data, loading, error, and methods
 */
export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (customUrl = url, customOptions = options) => {
    if (!customUrl) {
      setError('URL is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(customUrl, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          ...customOptions.headers,
        },
        ...customOptions,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('Fetch error:', errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (url && options.autoFetch !== false) {
      fetchData(url, options);
    }
  }, [url, options.autoFetch]);

  return {
    data,
    loading,
    error,
    fetch: fetchData,
    reset: () => {
      setData(null);
      setError(null);
    },
  };
};

export default useFetch;
