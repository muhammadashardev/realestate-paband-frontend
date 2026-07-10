import { useAppDispatch, useAppSelector } from './useRedux';
import {
  toggleSidebar,
  setSidebarOpen,
  setTheme,
  addNotification,
  removeNotification,
  openModal,
  closeModal,
  setLoading,
} from '../store/slices/uiSlice';

/**
 * Custom hook to manage UI state
 * @returns {Object} UI state and methods
 */
export const useUI = () => {
  const dispatch = useAppDispatch();
  const { sidebarOpen, theme, notifications, loading, modal } = useAppSelector(
    (state) => state.ui
  );

  return {
    // State
    sidebarOpen,
    theme,
    notifications,
    loading,
    modal,
    
    // Actions
    toggleSidebar: () => dispatch(toggleSidebar()),
    setSidebarOpen: (value) => dispatch(setSidebarOpen(value)),
    setTheme: (newTheme) => dispatch(setTheme(newTheme)),
    addNotification: (notification) => dispatch(addNotification(notification)),
    removeNotification: (id) => dispatch(removeNotification(id)),
    openModal: (type, data) => dispatch(openModal({ type, data })),
    closeModal: () => dispatch(closeModal()),
    setLoading: (value) => dispatch(setLoading(value)),
  };
};

export default useUI;
