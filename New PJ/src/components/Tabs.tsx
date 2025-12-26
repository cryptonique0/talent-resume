import React, { useState } from 'react';

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: Tab[];
  defaultTabId?: string;
  onChange?: (tabId: string) => void;
  variant?: 'line' | 'pill';
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTabId,
  onChange,
  variant = 'line',
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState(defaultTabId || tabs[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const variantClasses = {
    line: {
      container: 'border-b border-gray-200 dark:border-gray-700',
      button: 'py-4 px-4 border-b-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600',
      activeButton: 'border-blue-600 text-blue-600 dark:text-blue-400',
    },
    pill: {
      container: 'bg-gray-100 dark:bg-gray-900 p-1 rounded-lg inline-flex gap-1',
      button: 'px-4 py-2 rounded-md transition-colors',
      activeButton: 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm',
    },
  };

  const classes = variantClasses[variant];

  return (
    <div className={className}>
      <div className={`flex gap-2 ${classes.container}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            disabled={tab.disabled}
            className={`flex items-center gap-2 font-medium text-sm transition-colors ${classes.button} ${
              activeTab === tab.id ? classes.activeButton : 'text-gray-600 dark:text-gray-400'
            } ${tab.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {tab.icon && <span>{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {tabs.map((tab) =>
          activeTab === tab.id ? (
            <div key={tab.id} className="animate-fadeIn">
              {tab.content}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Tabs;
