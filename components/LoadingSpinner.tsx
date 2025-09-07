import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-start w-full">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-google-blue mb-4"></div>
      <p className="text-text-gray dark:text-gray-400">Загрузка...</p>
    </div>
  );
};

export default LoadingSpinner;