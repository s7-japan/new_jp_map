// components/ErrorBoundary.jsx
import React from "react";
import ErrorScreen from "./ErrorScreen";

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    errorMessage: "", // Still keeping this for potential logging
  };

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      errorMessage: error.message,
    };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error for debugging
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorScreen />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
