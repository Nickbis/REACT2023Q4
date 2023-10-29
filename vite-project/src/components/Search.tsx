import React, { Component } from 'react';

export interface Props {
  //onSearchApi: (query: string) => void;
}

export interface State {
  query: string;
}

const LocalStorageKey = 'lastSearch';

export default class Search extends Component<Props, State> {
  state: State = {
    query: '',
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

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { query } = this.state;
    if (query) {
      // Вызываем функцию поиска по api из пропсов
      //this.props.onSearchApi(query);
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
