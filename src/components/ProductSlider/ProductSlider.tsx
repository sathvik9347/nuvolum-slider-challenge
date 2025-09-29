// src/components/ProductSlider/ProductSlider.tsx
import React, { useEffect, useRef } from "react";
import { Product } from "../../types/product";
import Slide from "./Slide";
import styles from "./ProductSlider.module.scss";

interface ProductSliderProps {
  products: Product[];
  selectedProductId: number | null;
  onSelectProduct: (productId: number) => void;
  onNavigate: (direction: "prev" | "next") => void;
}

const ProductSlider: React.FC<ProductSliderProps> = ({
  products,
  selectedProductId,
  onSelectProduct,
  onNavigate,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation (left/right arrows → prev/next)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only if focus is inside the slider
      if (!containerRef.current?.contains(document.activeElement)) return;
      switch (event.key) {
        case "ArrowUp":
        case "ArrowLeft":
          event.preventDefault();
          onNavigate("prev");
          break;
        case "ArrowDown":
        case "ArrowRight":
          event.preventDefault();
          onNavigate("next");
          break;
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onNavigate]);

  // Scroll active item into view
  useEffect(() => {
    if (!sliderRef.current || !selectedProductId) return;
    const activeSlide = sliderRef.current.querySelector(
      `[aria-labelledby="product-${selectedProductId}-title"]`
    ) as HTMLElement;
    if (activeSlide) {
      activeSlide.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [selectedProductId]);

  // Touch swipe (horizontal or vertical depending on layout)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const t = e.changedTouches[0];
    const dx = touchStartRef.current.x - t.clientX;
    const dy = touchStartRef.current.y - t.clientY;

    // We only handle horizontal swipe here (but could adapt to vertical)
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      dx > 0 ? onNavigate("next") : onNavigate("prev");
    }
    touchStartRef.current = null;
  };

  if (products.length === 0) return null;

  return (
    <section
      className={styles.sliderSection}
      aria-label="Product slider"
      ref={containerRef}
    >
      <div className={styles.sliderContainer}>
        <div
          ref={sliderRef}
          className={styles.slider}
          role="tablist"
          aria-label="Product selection"
          aria-orientation="vertical"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {products.map((product, index) => (
            <Slide
              key={product.id}
              product={product}
              isActive={product.id === selectedProductId}
              onSelect={onSelectProduct}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;
