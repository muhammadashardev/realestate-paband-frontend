import React, { createContext, useContext, useState, useCallback } from 'react';

const TopBarContext = createContext(null);

export const TopBarProvider = ({ children }) => {
  const [topBarConfig, setTopBarConfig] = useState(null);
  // config shape: { title, subtitle, onBack } | null => shows default "Dashboard"

  const setTopBar = useCallback((config) => setTopBarConfig(config), []);
  const resetTopBar = useCallback(() => setTopBarConfig(null), []);

  return (
    <TopBarContext.Provider value={{ topBarConfig, setTopBar, resetTopBar }}>
      {children}
    </TopBarContext.Provider>
  );
};

export const useTopBar = () => {
  const ctx = useContext(TopBarContext);
  if (!ctx) throw new Error('useTopBar must be used inside TopBarProvider');
  return ctx;
};
