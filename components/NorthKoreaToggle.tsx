import React from 'react';

interface NorthKoreaToggleProps {
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
}

const NorthKoreaToggle: React.FC<NorthKoreaToggleProps> = ({ isEnabled, onToggle }) => {
  const handleToggle = () => {
    onToggle(!isEnabled);
  };

  return (
    <label htmlFor="nk-toggle" className="flex items-center cursor-pointer">
      <span className="mr-3 text-sm font-medium text-gray-700 dark:text-gray-300">Режим КНДР</span>
      <div className="relative">
        <button
          id="nk-toggle"
          role="switch"
          aria-checked={isEnabled}
          onClick={handleToggle}
          className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-900 ${
            isEnabled ? 'bg-red-600' : 'bg-gray-300 dark:bg-gray-600'
          }`}
          aria-label="Переключить режим Северной Кореи"
        >
          <span
            className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${
              isEnabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    </label>
  );
};

export default NorthKoreaToggle;