// components/ErrorBoundary.jsx
import React from "react";
import ErrorScreen from "./ErrorScreen";

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    errorMessage: "", // For runtime error details
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
    // Check for runtime error (from state) or 404 condition (from props)
    if (this.state.hasError || this.props.notFound) {
      return (
        <ErrorScreen
          message={
            this.state.hasError
              ? "Something went wrong. Please try again later."
              : "Page could not be found."
          }
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
