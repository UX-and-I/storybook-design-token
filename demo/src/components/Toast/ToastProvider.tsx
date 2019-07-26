import React, { createContext, ReactNode, useEffect, useRef, useState } from 'react';

import { ShToast } from './Toast';
import { ShToastContainer } from './ToastContainer';

interface ToastProviderProps {
  children: ReactNode;
}

interface ToastData {
  duration?: number;
  id: number;
  message: string;
  type?: string;
}

let recentToastId = 0;
const timeouts: { [toastId: number]: any } = {};

export const ShToastContext = createContext<{
  add: (message: string, type?: string, duration?: number) => void;
  children?: ReactNode;
}>({ add: () => undefined });

export function ShToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const toastsRef = useRef(toasts);
  toastsRef.current = toasts;

  useEffect(() => {
    toasts
      .filter(toast => timeouts[toast.id] === undefined)
      .forEach(toast => {
        timeouts[toast.id] = setTimeout(() => {
          setToasts(toastsRef.current.filter(t => t.id !== toast.id));
        }, toast.duration);
      });
  }, [toasts, toastsRef]);

  const add = (message: string, type?: string, duration = 5000) => {
    setToasts([...toasts, { duration, id: recentToastId, message, type }]);
    recentToastId += 1;
  };

  return (
    <ShToastContext.Provider value={{ add }}>
      {children}
      {toasts.length > 0 && (
        <ShToastContainer>
          {toasts.map(toastData => (
            <ShToast
              appearance={toastData.type}
              key={toastData.id}
              message={toastData.message}
            />
          ))}
        </ShToastContainer>
      )}
    </ShToastContext.Provider>
  );
}
