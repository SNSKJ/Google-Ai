import React from 'react';

const DiscordButton: React.FC = () => {
  return (
    <a
      href="https://discord.gg/YdVP9pF6k3"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Перейти на Discord сервер автора"
      className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#5865F2] rounded-lg hover:bg-[#4752C4] focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-colors"
    >
      Discord сервер автора
    </a>
  );
};

export default DiscordButton;
