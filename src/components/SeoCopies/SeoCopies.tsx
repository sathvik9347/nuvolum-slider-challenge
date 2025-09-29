// SEO component that renders all product content in DOM but visually hidden

import React from 'react';
import { Product } from '../../types/product';
import styles from './SeoCopies.module.scss';

interface SeoCopiesProps {
  products: Product[];
  selectedProductId: number | null;
}

const SeoCopies: React.FC<SeoCopiesProps> = ({ products, selectedProductId }) => {
  return (
    <div className={styles.seoContainer} aria-hidden="true">
      <h1 className={styles.pageTitle}>
        Nuvo Slider - Premium Product Showcase
      </h1>
      
      <div className={styles.productsCopy}>
        <h2 className={styles.sectionTitle}>
          Featured Products - Complete Product Catalog
        </h2>
        
        {/* All products always in DOM for SEO, but only selected one is visible */}
        {products.map(product => (
          <article 
            key={`seo-${product.id}`}
            className={`${styles.productCopy} ${
              product.id === selectedProductId ? styles.active : 'visually-hidden'
            }`}
          >
            <h3 className={styles.productTitle}>
              {product.title} - Premium Quality Product
            </h3>
            
            <div className={styles.productMeta}>
              <span className={styles.productPrice}>
                Price: ${product.price.toFixed(2)} - Best Value
              </span>
              
              <span className={styles.productCategory}>
                Category: {product.category} - Top Quality
              </span>
              
              <span className={styles.productRating}>
                Customer Rating: {product.rating.rate} out of 5 stars 
                (Based on {product.rating.count} customer reviews)
              </span>
            </div>
            
            <div className={styles.productDescription}>
              <h4>Detailed Product Description</h4>
              <p>{product.description}</p>
            </div>
            
            <div className={styles.productKeywords}>
              <span>Buy now, add to cart, online shopping, premium {product.category}, high-quality, trusted brand, fast shipping, customer satisfaction, best price, authentic product</span>
            </div>
            
            <div className={styles.additionalSeoContent}>
              <p>Shop {product.title} online with confidence. Free shipping available. 30-day return policy. Customer service support. Secure checkout.</p>
            </div>
          </article>
        ))}
      </div>
      
      <div className={styles.additionalContent}>
        <h2>About Nuvo Slider</h2>
        <p>
          Discover premium products through our intuitive slider interface. 
          Browse through curated fashion items, electronics, and lifestyle products 
          with smooth navigation and detailed product information.
        </p>
        
        <h3>Features</h3>
        <ul>
          <li>Interactive product slider with touch and keyboard support</li>
          <li>Detailed product information including ratings and descriptions</li>
          <li>Responsive design optimized for all devices</li>
          <li>Accessibility-first approach with full screen reader support</li>
          <li>High-performance implementation with lazy loading</li>
        </ul>
      </div>
    </div>
  );
};

export default SeoCopies;