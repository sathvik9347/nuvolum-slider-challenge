// src/components/ProductSlider/ChevButton.tsx
import React from "react";
import { ChevronButtonProps } from "../../types/product";
import styles from "./ChevButton.module.scss";

/**
 * Small circular chevron button. 
 * - When `isActive` it fills and rotates (handled in SCSS).
 * - Accessible with aria-label and aria-pressed.
 */
const ChevButton: React.FC<ChevronButtonProps> = ({
  isActive,
  onClick,
  "aria-label": ariaLabel,
}) => {
  return (
    <button
      type="button"
      className={`${styles.chevButton} ${isActive ? styles.active : ""}`}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={isActive}
    >
      {/* Chevron Icon */}
      <svg
        className={styles.chevIcon}
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M4.5 2L8.5 6L4.5 10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default ChevButton;
