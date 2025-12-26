'use client';

import React, { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Toast } from '@/components/Toast';
import useToast, { Toast as ToastItem } from '@/hooks/useToast';

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  useEffect(() => {
    // This ensures container mounts early to capture global toasts
  }, []);

  return (
    <AnimatePresence>
      {toasts.map((t: ToastItem) => (
        <Toast key={t.id} message={t.message} type={t.type} onClose={() => removeToast(t.id)} />
      ))}
    </AnimatePresence>
  );
};

export default ToastContainer;
