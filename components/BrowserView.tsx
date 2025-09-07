import React from 'react';
import { FakeSearchResult } from '../types';

interface BrowserViewProps {
  result: FakeSearchResult;
  content: string;
  isLoading: boolean;
  onBack: () => void;
}

const BrowserView: React.FC<BrowserViewProps> = ({ result, content, isLoading, onBack }) => {
  return (
    <div className="h-screen w-screen bg-gray-100 dark:bg-black flex flex-col font-sans">
      {/* Browser Chrome */}
      <header className="flex-shrink-0 bg-gray-200 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 shadow-sm">
        <div className="h-10 flex items-center px-2 space-x-2">
          {/* Window Controls */}
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-1">
            <button onClick={onBack} className="p-1 rounded-full hover:bg-gray-300/50 dark:hover:bg-gray-600/50" aria-label="Назад">
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <button className="p-1 rounded-full text-gray-400 cursor-not-allowed" aria-label="Вперед" disabled>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
             <button className="p-1 rounded-full text-gray-400 cursor-not-allowed" aria-label="Обновить" disabled>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h5M20 20v-5h-5M4 4a12 12 0 0116 0M20 20a12 12 0 01-16 0"></path></svg>
            </button>
          </div>

          {/* URL Bar */}
          <div className="flex-grow flex items-center bg-white dark:bg-gray-700 rounded-full h-8 px-4 shadow-inner border border-gray-300 dark:border-gray-600">
             <svg className="w-4 h-4 text-gray-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <p className="text-sm text-text-dark dark:text-gray-200 truncate">
              {result.url}
            </p>
          </div>
        </div>
      </header>
      
      {/* Page Content */}
      <main className="flex-grow bg-white dark:bg-gray-900 overflow-y-auto">
        <div className="p-6 md:p-8 max-w-4xl mx-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-google-blue"></div>
              <p className="mt-4 text-text-gray dark:text-gray-400">Загрузка...</p>
            </div>
          ) : (
            <article
              className="prose lg:prose-lg dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default BrowserView;