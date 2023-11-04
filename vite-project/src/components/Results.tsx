import React, { useState, useEffect } from 'react';
import { ApiSearchResult } from './types';
import { OnSearchApi } from './api';
import { LocalStorageKey } from './Search';

interface Props {
  query: string;
}

export default function Results(props: Props) {
  const [results, setResults] = useState<ApiSearchResult[]>([]);

  const API = OnSearchApi.getInstance();

  useEffect(() => {
    const fetchResults = async () => {
      const lastSearch = localStorage.getItem(LocalStorageKey);
      const results: ApiSearchResult[] = await API.getSearch(lastSearch);
      setResults(results);
    };
    fetchResults();
  }, []); // eslint-disable-line

  useEffect(() => {
    const fetchResults = async () => {
      const { query } = props;
      const results: ApiSearchResult[] = await API.getSearch(query);
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
