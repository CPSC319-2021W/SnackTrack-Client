import React from 'react';

import Fallback from '../pages/Fallback';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log('logging error, setting boundary ...');
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <Fallback>Something went wrong.</Fallback>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;