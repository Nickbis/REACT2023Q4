import React, { Component } from 'react';

export interface Props {
  //onSearchApi: (query: string) => void;
}

export interface State {
  query: string;
  rezults: [];
}

export const LocalStorageKey = 'lastSearch';

export default class Search extends Component<Props, State> {
  state: State = {
    query: '',
    rezults: [],
  };

  constructor(props: Props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      query: event.target.value,
    });
  }

  async getSearch(query?: string): Promise<void> {
    const apiURL = 'https://rickandmortyapi.com/api/character';
    const queryString = query ? `?name=${query}` : '';
    let res = null;

    const response = await fetch(`${apiURL}${queryString}`);
    if (!response.ok) {
      throw new Error('Error data from API');
    }
    res = await response.json();
    return res;
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { query } = this.state;
    if (query) {

      const rezults = this.getSearch(query);

      console.log('rezult=',rezults);
      localStorage.setItem(LocalStorageKey, query);
    } else {
      localStorage.setItem(LocalStorageKey, '');
    }
  }

  componentDidMount() {
    const lastSearch = localStorage.getItem(LocalStorageKey);
    if (lastSearch) {
      this.setState({
        query: lastSearch,
      });
    }
  }

  render() {
    const { query } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={this.handleChange}
          placeholder="Enter your request"
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}
