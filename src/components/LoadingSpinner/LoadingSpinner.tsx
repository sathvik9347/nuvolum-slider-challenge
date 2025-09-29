// Loading spinner component

import React from 'react';
import styles from './LoadingSpinner.module.scss';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  message = 'Loading products...' 
}) => {
  return (
    <div className={styles.loadingContainer}>
      <div className={`${styles.spinner} ${styles[size]}`} role="status" aria-label={message}>
        <div className={styles.spinnerInner}></div>
      </div>
      {message && (
        <p className={styles.loadingMessage} aria-live="polite">
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;