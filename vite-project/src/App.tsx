import React, { useState } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import { ErrorBoundary } from './components/errorBoundary';
import { ErrorButton } from './components/errorButton';
import './App.css';

export default function App() {
  const [query, setQuery] = useState('');

  const handleQuery = (query: string) => {
    setQuery(query);
  };

  return (
    <ErrorBoundary>
      <div className="App">
        <Search onQuery={handleQuery} />
        <h3>The Rick and Morty</h3>
        <ErrorButton />
        <Results query={query} />
      </div>
    </ErrorBoundary>
  );
}
