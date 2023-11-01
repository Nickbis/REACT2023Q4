import React, { Component } from 'react';

interface State {
  hasError: boolean;
}

export class ErrorButton extends Component<State> {
  state: State = { hasError: false };

  render() {
    if (this.state.hasError)
      throw new Error('This is a test Error, reload pages for continue');

    return (
      <button onClick={() => this.setState({ hasError: true })}>
        Press for test error!
      </button>
    );
  }
}
