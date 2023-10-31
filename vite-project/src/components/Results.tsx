import React, { Component } from 'react';
import { ApiSearchResult } from './types';
import { OnSearchApi } from './api';
import { LocalStorageKey } from './Search'

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

  async componentDidMount() {
    const lastSearch = localStorage.getItem(LocalStorageKey);
    const results:ApiSearchResult[] = await this.API.getSearch(lastSearch);
    console.log('ResultSearch=', lastSearch, 'Search=', results);
    this.setState( {results} );
    
  }

  async componentDidUpdate(
    prevProps: Readonly<Props>,
    //prevState: Readonly<State>
  ) {
    if (prevProps.query !== this.props.query) {
      const { query } = this.props;
      const results:ApiSearchResult[] = await this.API.getSearch(query);
      console.log(results);
      this.setState( {results} );
    }
  }

  render() {
    const { results } = this.state;

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
{/* Используем метод map для перебора массива результатов и создания элементов строки таблицы для каждого результата */}
{results.map(results => (
<tr key={results.id}>
<td>{results.id}</td>
<td>{results.name}</td>
<td>{results.gender}</td>
{/* Используем атрибут href для создания гиперссылки на url результата */}
<td><a href={results.image}>{results.image}</a></td>
</tr>
))}
</tbody>
      </table>
    );
  }
}
