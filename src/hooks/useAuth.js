import { useAppDispatch, useAppSelector } from './useRedux';
import { logout, clearError } from '../store/slices/authSlice';

/**
 * Custom hook to manage authentication state
 * @returns {Object} Authentication state and methods
 */
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, token, loading, error } = useAppSelector(
    (state) => state.auth
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return {
    user,
    isAuthenticated,
    token,
    loading,
    error,
    logout: handleLogout,
    clearError: handleClearError,
  };
};

export default useAuth;
