import React, { Component } from 'react';
import { ApiSearchResult } from './types';
import { OnSearchApi } from './api';

interface Props {
  query: string;
}
interface State {
  results: ApiSearchResult[];
}
export default class Results extends Component<Props, State> {
  state: State = {
    results: [],
  };
  API: OnSearchApi;
  constructor(props: Props) {
    super(props);
    this.API = OnSearchApi.getInstance();
    const { query } = this.props;
    console.log('result query=', { query });
    this.API.getSearch = this.API.getSearch.bind(this);
  }

  async componentDidUpdate(
    prevProps: Readonly<Props>,
    //prevState: Readonly<State>
  ) {
    if (prevProps.query !== this.props.query) {
      const { query } = this.props;
      const results = await this.API.getSearch(query);
      console.log(results);
      this.setState( {results} );
    }
  }

  render() {

    return (

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>URL</th>
          </tr>
        </thead>
      </table>
    );
  }
}
