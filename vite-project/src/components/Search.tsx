import React, { useEffect, useState } from 'react';

interface Props {
  onQuery: (query: string) => void;
}

export const LocalStorageKey = 'lastSearch';

export default function Search(props: Props) {
  const [query, setQuery] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (query) {
      props.onQuery(query);
      localStorage.setItem(LocalStorageKey, query);
    } else {
      props.onQuery(query);
      localStorage.setItem(LocalStorageKey, '');
      setQuery('');
    }
  };

  useEffect(() => {
    const lastSearch = localStorage.getItem(LocalStorageKey);
    if (lastSearch) {
      setQuery(lastSearch);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Enter your request"
      />
      <button type="submit">Search</button>
    </form>
  );
}
