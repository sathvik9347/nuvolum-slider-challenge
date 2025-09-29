// src/components/ProductSlider/Slide.tsx
import React from "react";
import { SlideProps } from "../../types/product";
import ChevButton from "./ChevButton";
import styles from "./Slide.module.scss";

const Slide: React.FC<SlideProps> = ({ product, isActive, onSelect, index }) => {
  const select = () => onSelect(product.id);

  const onKeyActivate: React.KeyboardEventHandler = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      select();
    }
  };

  // simple responsive hints – fine for this API
  const imageSizes = "(max-width: 480px) 78px, 78px";
  const srcSet = (src: string) => `${src} 1x, ${src} 2x`;

  return (
    <div
      className={`${styles.row} ${isActive ? styles.active : ""}`}
      role="tab"
      aria-selected={isActive}
      aria-labelledby={`product-${product.id}-title`}
      aria-controls={`product-${product.id}-details`}
      tabIndex={0}
      onKeyDown={onKeyActivate}
    >
      {/* Thumbnail (clickable) */}
      <div
        className={styles.thumb}
        role="button"
        tabIndex={0}
        aria-label={`Select ${product.title}`}
        onClick={select}
        onKeyDown={onKeyActivate}
      >
        <img
          src={product.image}
          srcSet={srcSet(product.image)}
          alt={product.title}
          loading={index > 1 ? "lazy" : "eager"}
          decoding="async"
          sizes={imageSizes}
          width={78}
          height={78}
        />
      </div>

      {/* Title (clickable) */}
      <button
        id={`product-${product.id}-title`}
        className={`linklike ${styles.titleBtn}`}
        type="button"
        onClick={select}
        onKeyDown={onKeyActivate}
        aria-controls={`product-${product.id}-details`}
      >
        <span className={styles.title}>{product.title}</span>

        {/* Keep rich copy in DOM for SEO; hidden visually */}
        <span className="visually-hidden">
          Price ${product.price.toFixed(2)}. Rating {product.rating?.rate} out of 5 (
          {product.rating?.count} reviews). {product.description} Category: {product.category}.
        </span>
      </button>

      {/* Chevron (rotates/fills when active via ChevButton styles) */}
      <ChevButton
        isActive={isActive}
        onClick={() => {
          select();
        }}
        aria-label={`${isActive ? "Selected" : "Select"} ${product.title}`}
      />

      {/* Tabpanel anchor content — present for SEO; visually hidden when not active */}
      <div
        className={isActive ? styles.seoBlock : "visually-hidden"}
        id={`product-${product.id}-details`}
      >
        <strong className="visually-hidden">{product.title}</strong>
        <span className="visually-hidden">
          ${product.price.toFixed(2)} – {product.description}
        </span>
      </div>
    </div>
  );
};

export default Slide;
