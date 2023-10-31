import React, { Component } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import './App.css';

export default class App extends Component {
  state = {
    query: '',
  };

  handleQuery = (query: string) => {
    this.setState({ query });
  };

  render() {
    return (
      <>
        <div className="App">
          <Search onQuery={this.handleQuery} />
          <h3>React Components</h3>
          <Results query={this.state.query} />
        </div>
      </>
    );
  }
}
