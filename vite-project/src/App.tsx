import React, { Component } from 'react';
import Search from './components/Search';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <>
        <div className="App">
          <Search />
        </div>
        <h1>React Components</h1>
      </>
    );
  }
}
