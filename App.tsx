import React, { useState, useCallback, useEffect } from 'react';
import { FakeSearchResult } from './types';
import { getFakeSearchResults, generateWebsiteContent } from './services/geminiService';
import SearchBar from './components/SearchBar';
import Logo from './components/Logo';
import FakeResultItem from './components/SearchResultItem';
import LoadingSpinner from './components/LoadingSpinner';
import BrowserView from './components/BrowserView';
import NorthKoreaToggle from './components/NorthKoreaToggle';
import ThemeToggle from './components/ThemeToggle';
import DiscordButton from './components/DiscordButton';

interface BrowsingState {
  result: FakeSearchResult | null;
  content: string;
  isLoading: boolean;
}

const App: React.FC = () => {
  const [currentResults, setCurrentResults] = useState<FakeSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeQuery, setActiveQuery] = useState('');
  const [view, setView] = useState<'home' | 'results' | 'browser'>('home');
  const [isNorthKoreaMode, setIsNorthKoreaMode] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const [browsingState, setBrowsingState] = useState<BrowsingState>({
    result: null,
    content: '',
    isLoading: false,
  });
  
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const handleSearch = useCallback(async (query: string) => {
    if (!query || isLoading) return;
    
    setIsLoading(true);
    setActiveQuery(query);
    setView('results');
    setBrowsingState({ result: null, content: '', isLoading: false });

    const results = await getFakeSearchResults(query, isNorthKoreaMode);
    
    const formattedResults = results.map((r: any, index: number) => ({ ...r, id: `${new Date().toISOString()}-${index}` }));
    setCurrentResults(formattedResults);
    
    setIsLoading(false);
  }, [isLoading, isNorthKoreaMode]);

  const handleResultClick = useCallback(async (result: FakeSearchResult) => {
    setView('browser');
    setBrowsingState({ result, content: '', isLoading: true });

    const content = await generateWebsiteContent(result.title, result.snippet, isNorthKoreaMode);

    setBrowsingState({ result, content, isLoading: false });
  }, [isNorthKoreaMode]);

  const handleBrowserBack = () => {
    setView('results');
  };

  // Home Page View
  if (view === 'home') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 p-4 font-sans text-text-dark dark:text-gray-200 transition-colors duration-300">
        <header className="absolute top-4 right-4 flex items-center space-x-4">
          <ThemeToggle theme={theme} onToggle={setTheme} />
          <NorthKoreaToggle isEnabled={isNorthKoreaMode} onToggle={setIsNorthKoreaMode} />
        </header>
        <main className="w-full max-w-2xl flex flex-col items-center">
          <div className="mb-8 text-center">
            <Logo size="large" isNorthKoreaMode={isNorthKoreaMode} />
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">найдется всё</p>
          </div>
          <div className="w-full mb-6">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>
          <div className="mt-4">
            <DiscordButton />
          </div>
        </main>
      </div>
    );
  }
  
  // Browser View
  if (view === 'browser' && browsingState.result) {
    return (
      <BrowserView 
        result={browsingState.result}
        content={browsingState.content}
        isLoading={browsingState.isLoading}
        onBack={handleBrowserBack}
      />
    );
  }

  // Results Page View
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen font-sans text-text-dark dark:text-gray-200 transition-colors duration-300">
      <header className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 z-10">
        <div className="max-w-4xl mx-auto flex items-center space-x-4">
          <button onClick={() => setView('home')} aria-label="Вернуться на главную">
            <Logo size="small" isNorthKoreaMode={isNorthKoreaMode} />
          </button>
          <div className="flex-grow">
            <SearchBar onSearch={handleSearch} initialQuery={activeQuery} isLoading={isLoading} />
          </div>
          <div className="hidden sm:flex items-center space-x-4">
             <ThemeToggle theme={theme} onToggle={setTheme} />
             <NorthKoreaToggle isEnabled={isNorthKoreaMode} onToggle={setIsNorthKoreaMode} />
          </div>
        </div>
      </header>
      <main className="max-w-3xl mx-auto p-4 pt-6">
        {isLoading ? (
          <div className="mb-8">
            <h2 className="text-xl font-medium text-text-dark dark:text-gray-200 mb-4">{activeQuery}</h2>
            <LoadingSpinner />
          </div>
        ) : (
          currentResults.length > 0 && (
            <div className="mb-10">
              <h2 className="text-xl font-medium text-text-dark dark:text-gray-200 mb-4">{activeQuery}</h2>
              {currentResults.map(result => (
                <FakeResultItem key={result.id} result={result} onResultClick={handleResultClick} />
              ))}
            </div>
          )
        )}
      </main>
    </div>
  );
};

export default App;