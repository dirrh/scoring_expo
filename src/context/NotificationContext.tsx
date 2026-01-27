import React, { createContext, useState, useContext } from 'react';

type NotificationContextType = {
  isRaised: boolean;
  setIsRaised: (raised: boolean) => void;
};

const NotificationContext = createContext<NotificationContextType>({
  isRaised: false,
  setIsRaised: () => {},
});

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [isRaised, setIsRaised] = useState(false);

  return (
    <NotificationContext.Provider value={{ isRaised, setIsRaised }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationPosition = () => useContext(NotificationContext);