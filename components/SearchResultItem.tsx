
import React from 'react';
import { FakeSearchResult } from '../types';

interface FakeResultItemProps {
  result: FakeSearchResult;
  onResultClick: (result: FakeSearchResult) => void;
}

const FakeResultItem: React.FC<FakeResultItemProps> = ({ result, onResultClick }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onResultClick(result);
  };

  return (
    <div className="mb-8 w-full">
      <a href="#" onClick={handleClick} className="text-xl text-link-blue hover:underline dark:text-blue-400">
        {result.title}
      </a>
      <p className="text-sm text-green-700 dark:text-green-400">{result.url}</p>
      <p className="text-text-gray dark:text-gray-400 mt-2">{result.snippet}</p>
    </div>
  );
};

export default FakeResultItem;