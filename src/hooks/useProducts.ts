// Custom hook for fetching and managing products

import { useState, useEffect } from 'react';
import { Product, ProductsState } from '../types/product';

const API_URL = 'https://fakestoreapi.com/products?limit=5';

// Simple in-memory cache to avoid refetching on re-renders
let cachedProducts: Product[] | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useProducts = () => {
  const [state, setState] = useState<ProductsState>({
    products: [],
    selectedProductId: null,
    loading: true,
    error: null,
  });

  // Fetch products on mount with caching
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        
        // Check cache first
        const now = Date.now();
        if (cachedProducts && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
          setState({
            products: cachedProducts,
            selectedProductId: cachedProducts.length > 0 ? cachedProducts[0].id : null,
            loading: false,
            error: null,
          });
          return;
        }
        
        const response = await fetch(API_URL, {
          headers: {
            'Accept': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`Failed to load products (${response.status})`);
        }
        
        const products: Product[] = await response.json();
        
        // Validate products data
        if (!Array.isArray(products) || products.length === 0) {
          throw new Error('No products available');
        }
        
        // Cache the results
        cachedProducts = products;
        cacheTimestamp = now;
        
        setState({
          products,
          selectedProductId: products.length > 0 ? products[0].id : null,
          loading: false,
          error: null,
        });
      } catch (error) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch products',
        }));
      }
    };

    fetchProducts();
  }, []);

  // Select a product
  const selectProduct = (productId: number) => {
    setState(prev => ({
      ...prev,
      selectedProductId: productId,
    }));
  };

  // Navigate with keyboard arrows
  const navigateProducts = (direction: 'prev' | 'next') => {
    const { products, selectedProductId } = state;
    if (products.length === 0 || selectedProductId === null) return;

    const currentIndex = products.findIndex(p => p.id === selectedProductId);
    if (currentIndex === -1) return;

    let nextIndex: number;
    if (direction === 'prev') {
      nextIndex = currentIndex > 0 ? currentIndex - 1 : products.length - 1;
    } else {
      nextIndex = currentIndex < products.length - 1 ? currentIndex + 1 : 0;
    }

    selectProduct(products[nextIndex].id);
  };

  // Get selected product
  const selectedProduct = state.products.find(p => p.id === state.selectedProductId) || null;

  return {
    ...state,
    selectedProduct,
    selectProduct,
    navigateProducts,
  };
};