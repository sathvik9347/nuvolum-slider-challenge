// src/components/ProductDetails/ProductDetails.tsx
import React from "react";
import { ProductDetailsProps } from "../../types/product";
import styles from "./ProductDetails.module.scss";

const Stars: React.FC<{ rate?: number; count?: number }> = ({ rate = 0, count = 0 }) => {
  const filled = Math.round(rate);
  return (
    <div className={styles.stars} aria-label={`Rated ${rate} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={i < filled ? styles.starFilled : styles.starEmpty}
          aria-hidden
        >
          ★
        </span>
      ))}
      <span className={styles.starCount}>({count})</span>
      {/* Keep numeric value for SEO but hide visually */}
      <span className="visually-hidden">Average rating {rate} out of 5</span>
    </div>
  );
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onAddToCart }) => {
  if (!product) {
    return (
      <aside className={styles.detailsPanel} aria-live="polite" aria-atomic="true">
        <div className={styles.emptyState}>
          <p>Select a product to view details</p>
        </div>
      </aside>
    );
  }

  const rate = product.rating?.rate ?? 0;
  const count = product.rating?.count ?? 0;

  return (
    <aside
      className={styles.detailsPanel}
      role="tabpanel"
      aria-live="polite"
      aria-label="Selected product details"
      id={`product-${product.id}-details-panel`}
    >
      <div className={styles.detailsContent}>
        <header className={styles.detailsHeader}>
          <h2 className={styles.productTitle}>{product.title}</h2>

          <div className={styles.priceRow}>
            <div className={styles.price}>${product.price.toFixed(2)}</div>
            <Stars rate={rate} count={count} />
          </div>
        </header>

        <div className={styles.descriptionContainer}>
          <h2 className={styles.descriptionTitle}>Description</h2>
          <p className={styles.description}>{product.description}</p>

          {/* Extra SEO signals kept in DOM but not emphasized visually */}
          <div className="visually-hidden">
            <img src={product.image} alt={product.title} />
            <span>Category: {product.category}</span>
            <span>Average rating: {rate}</span>
          </div>
        </div>

        <div className={styles.actionContainer}>
          <button
            className={styles.addToCartButton}
            onClick={() => onAddToCart?.()}
            type="button"
            aria-label={`Add ${product.title} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </aside>
  );
};

export default ProductDetails;
