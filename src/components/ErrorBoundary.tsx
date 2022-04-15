import { Component } from "react";

interface Props {
  children?: JSX.Element | null;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    console.error(error);
    console.error(errorInfo);
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return <h1>Something went wrong.</h1>;
    }
    const { children } = this.props;
    return children;
  }
}
