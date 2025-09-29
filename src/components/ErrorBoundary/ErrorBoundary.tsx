// Error boundary component for handling runtime errors

import React, { Component, ErrorInfo, ReactNode } from 'react';
import styles from './ErrorBoundary.module.scss';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorContainer}>
          <div className={styles.errorContent}>
            <h1 className={styles.errorTitle}>
              Oops! Something went wrong
            </h1>
            
            <p className={styles.errorMessage}>
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            
            {this.state.error && (
              <details className={styles.errorDetails}>
                <summary>Error details</summary>
                <code>{this.state.error.message}</code>
              </details>
            )}
            
            <div className={styles.errorActions}>
              <button
                className={styles.retryButton}
                onClick={this.handleRetry}
                type="button"
              >
                Try Again
              </button>
              
              <button
                className={styles.refreshButton}
                onClick={() => window.location.reload()}
                type="button"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;