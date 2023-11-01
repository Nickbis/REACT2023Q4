import React, { PropsWithChildren } from 'react';

interface ErrorBoundaryState {
  hasError: Error | null;
}

export class ErrorBoundary extends React.Component<
  PropsWithChildren,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: null };

  render() {
    return (
      <>
        {this.state.hasError ? (
          <>
            <h2>Test error found: {this.state.hasError.name}</h2>
            <h3>{this.state.hasError.message}</h3>
          </>
        ) : (
          this.props.children
        )}
      </>
    );
  }

  static getDerivedStateFromError(hasError: Error) {
    return { hasError };
  }
}
