import React from 'react';
import Search from './components/Search';
import Results from './components/Results';
import { ErrorBoundary } from './components/errorBoundary';
import { ErrorButton } from './components/errorButton';
import './App.css';

export default class App extends React.Component {
  state = {
    query: '',
  };

  handleQuery = (query: string) => {
    this.setState({ query });
  };

  render() {
    return (
      <ErrorBoundary>
        <div className="App">
          <Search onQuery={this.handleQuery} />
          <h3>The Rick and Morty</h3>
          <ErrorButton />
          <Results query={this.state.query} />
        </div>
      </ErrorBoundary>
    );
  }
}
