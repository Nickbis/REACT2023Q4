import React from 'react';

interface State {
  hasError: boolean;
}
interface Props {}

export class ErrorButton extends React.Component<Props, State> {
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
