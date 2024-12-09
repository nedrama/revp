import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the context type
interface NotificationContextType {
    setEvent: (message: string) => void;
    event: string;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
    children: ReactNode;
}

// Provide the context to children components
export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
    const [event, setEvent] = useState<string>('');

    return (
        <NotificationContext.Provider value={{ setEvent, event }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = (): NotificationContextType => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};
