// TypeScript types for product data

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

export interface ProductsState {
  products: Product[];
  selectedProductId: number | null;
  loading: boolean;
  error: string | null;
}

export interface SlideProps {
  product: Product;
  isActive: boolean;
  onSelect: (productId: number) => void;
  index: number;
}

export interface ChevronButtonProps {
  isActive: boolean;
  onClick: () => void;
  'aria-label': string;
}

export interface ProductDetailsProps {
  product: Product | null;
  onAddToCart?: () => void;
}