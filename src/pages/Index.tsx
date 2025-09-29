// Nuvo Slider - Main page component

import React from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductSlider from '../components/ProductSlider/ProductSlider';
import ProductDetails from '../components/ProductDetails/ProductDetails';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import SeoCopies from '../components/SeoCopies/SeoCopies';
import '../styles/global.scss';
import styles from './Index.module.scss';

const Index = () => {
  const { products, selectedProduct, loading, error, selectProduct, navigateProducts } = useProducts();

  if (loading) {
    return (
      <div className={styles.app}>
        <LoadingSpinner size="large" message="Loading premium products..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.app}>
        <div className={styles.errorState}>
          <h1>Failed to Load Products</h1>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className={styles.app}>
        <main className={styles.mainContainer}>
          <ProductSlider
            products={products}
            selectedProductId={selectedProduct?.id || null}
            onSelectProduct={selectProduct}
            onNavigate={navigateProducts}
          />
          
          <ProductDetails
            product={selectedProduct}
            onAddToCart={() => console.log('Add to cart:', selectedProduct?.title)}
          />
        </main>
        
        <SeoCopies
          products={products}
          selectedProductId={selectedProduct?.id || null}
        />
      </div>
    </ErrorBoundary>
  );
};

export default Index;
