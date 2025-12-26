'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
  variant?: 'default' | 'pills';
}

export default function Tabs({
  tabs,
  activeTab,
  onChange,
  className = '',
  variant = 'default',
}: TabsProps) {
  const baseTabStyles =
    variant === 'pills'
      ? 'px-4 py-2 rounded-lg font-medium transition-colors'
      : 'px-4 py-2 font-medium transition-colors border-b-2';

  const activeTabStyles =
    variant === 'pills'
      ? 'bg-blue-600 text-white'
      : 'border-blue-600 text-blue-600';

  const inactiveTabStyles =
    variant === 'pills'
      ? 'text-gray-600 hover:bg-gray-100'
      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300';

  return (
    <div className={`flex gap-2 ${variant === 'default' ? 'border-b border-gray-200' : ''} ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => !tab.disabled && onChange(tab.id)}
          disabled={tab.disabled}
          className={`${baseTabStyles} ${
            activeTab === tab.id ? activeTabStyles : inactiveTabStyles
          } ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} relative flex items-center gap-2`}
        >
          {tab.icon}
          <span>{tab.label}</span>
          {activeTab === tab.id && variant === 'pills' && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-blue-600 rounded-lg -z-10"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}

interface TabPanelProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export function TabPanel({ children, className = '', animate = true }: TabPanelProps) {
  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={className}>{children}</div>;
}
