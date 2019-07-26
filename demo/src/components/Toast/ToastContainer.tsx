import './ToastContainer.css';

import React, { ReactNode } from 'react';

interface ToastContainerProps {
  children?: ReactNode;
}

export function ShToastContainer({ children }: ToastContainerProps) {
  return <div className="sh-toast-container">{children}</div>;
}
