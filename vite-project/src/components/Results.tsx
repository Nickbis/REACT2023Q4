import { useState, useEffect } from 'react';
import { ApiSearchResult } from './types';
import { getSearch } from './api';
import { LocalStorageKey } from './Search';

interface Props {
  query: string;
}

export default function Results(props: Props) {
  const [results, setResults] = useState<ApiSearchResult[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      const lastSearch = localStorage.getItem(LocalStorageKey);
      const results: ApiSearchResult[] = await getSearch(lastSearch);

      console.log('ls=', lastSearch, 'use1=', results);
      setResults(results);
    };
    fetchResults();
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      const { query } = props;
      const results: ApiSearchResult[] = await getSearch(query);
      setResults(results);
    };
    fetchResults();
  }, [props.query]); // eslint-disable-line

  if (results) {
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Image URL</th>
          </tr>
        </thead>
        <tbody>
          {results.map((results) => (
            <tr key={results.id}>
              <td>{results.id}</td>
              <td>{results.name}</td>
              <td>{results.gender}</td>
              <td>
                <a href={results.image}>{results.image}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else {
    return <h3>Not found</h3>;
  }
}
