import React from 'react';

export interface ErrorStateProps {
  title: string;
  message?: string;
  error?: Error | string;
  onRetry?: () => void;
  className?: string;
  showDetails?: boolean;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  title,
  message,
  error,
  onRetry,
  className = '',
  showDetails = false,
}) => {
  const errorMessage = typeof error === 'string' ? error : error?.message;

  return (
    <div
      className={`flex flex-col items-center justify-center py-12 px-4 text-center rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 ${className}`}
    >
      <div className="mb-4 text-6xl text-red-500 dark:text-red-400">
        ⚠️
      </div>

      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>

      {message && (
        <p className="text-gray-700 dark:text-gray-300 mb-4 max-w-md">
          {message}
        </p>
      )}

      {showDetails && errorMessage && (
        <details className="mb-6 w-full max-w-md text-left">
          <summary className="cursor-pointer text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
            Error details
          </summary>
          <pre className="mt-2 p-3 bg-red-100 dark:bg-red-950 rounded text-xs overflow-auto text-red-800 dark:text-red-200">
            {errorMessage}
          </pre>
        </details>
      )}

      <div className="flex gap-2">
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Retry
          </button>
        )}
        <button
          onClick={() => window.location.href = '/'}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default ErrorState;
