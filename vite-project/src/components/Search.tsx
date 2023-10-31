import React, { Component } from 'react';
//import { ApiSearchResult } from './types';
//import { OnSearchApi } from './api';

interface Props {
  onQuery: (query: string) => void;
}

interface State {
  query: string;
  //resSearch: ApiSearchResult | null;
}

export const LocalStorageKey = 'lastSearch';

export default class Search extends Component<Props, State> {
  //API: OnSearchApi;
  state: State = {
    query: '',
    // resSearch: null,
  };

  constructor(props: Props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.API = OnSearchApi.getInstance();
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      query: event.target.value,
    });
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { query } = this.state;
    if (query) {
      this.props.onQuery(query);
      //const resSearch: ApiSearchResult = await this.API.getSearch(query);

      // this.setState({ resSearch });
      //console.log('resSearch=', resSearch); // Delete!!
      localStorage.setItem(LocalStorageKey, query);
    } else {
      this.props.onQuery(query);
      localStorage.setItem(LocalStorageKey, '')
      this.setState({
        query: '',
      });
    }
  }

  componentDidMount() {
    const lastSearch = localStorage.getItem(LocalStorageKey);
    //const Search = await this.API.getSearch(lastSearch);
    //console.log('LastSearch=', lastSearch, 'Search=', Search);
    if (lastSearch) {
      this.setState({
        query: lastSearch,
        //     resSearch: Search,
      });
    }
  }

  async componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<State>
  ) {
    if (prevState.query !== this.state.query) {
      //const { query } = this.state;
      //const resSearch = await this.API.getSearch(query);
      // this.setState({ resSearch });
    }
  }

  // async componentWillUnmount()  {
  //   (async () => await this.API.getSearch(''))();
  // }

  render() {
    const { query } = this.state;
    //const { resSearch } = this.state;
    console.log(query);
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
