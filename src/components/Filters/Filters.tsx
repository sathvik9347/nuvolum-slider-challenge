import React, { useMemo, useState } from "react";
import styles from "./Filters.module.scss";
import type { Product } from "../../types/product";

export type FiltersState = {
  q: string;
  categories: Record<string, boolean>;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  sort: "relevance" | "price-asc" | "price-desc" | "rating-desc";
};

type Props = {
  products: Product[];
  value: FiltersState;
  onChange: (f: FiltersState) => void;
};

export default function Filters({ products, value, onChange }: Props) {
  const categories = useMemo(() => {
    const set = new Set(products.map(p => p.category));
    return Array.from(set);
  }, [products]);

  const [localMin, localMax] = useMemo(() => {
    const prices = products.map(p => p.price);
    return [Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))];
  }, [products]);

  // Helpers
  const toggleCategory = (cat: string) => {
    onChange({
      ...value,
      categories: { ...value.categories, [cat]: !value.categories[cat] },
    });
  };

  return (
    <aside className={styles.filters} aria-label="Filters">
      <h2 className={styles.title}>Filters</h2>

      {/* Search */}
      <div className={styles.block}>
        <label className={styles.label} htmlFor="flt-q">Search</label>
        <input
          id="flt-q"
          className={styles.input}
          type="search"
          placeholder="Find products…"
          value={value.q}
          onChange={(e) => onChange({ ...value, q: e.target.value })}
        />
      </div>

      {/* Category */}
      <div className={styles.block}>
        <div className={styles.label}>Category</div>
        <div className={styles.checks}>
          {categories.map((c) => (
            <label key={c} className={styles.check}>
              <input
                type="checkbox"
                checked={!!value.categories[c]}
                onChange={() => toggleCategory(c)}
              />
              <span>{c}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className={styles.block}>
        <div className={styles.label}>Price</div>
        <div className={styles.rangeRow}>
          <input
            className={styles.num}
            type="number"
            min={localMin}
            max={value.maxPrice}
            value={value.minPrice}
            onChange={(e) =>
              onChange({ ...value, minPrice: Number(e.target.value) })
            }
          />
          <span className={styles.dash}>—</span>
          <input
            className={styles.num}
            type="number"
            min={value.minPrice}
            max={localMax}
            value={value.maxPrice}
            onChange={(e) =>
              onChange({ ...value, maxPrice: Number(e.target.value) })
            }
          />
        </div>
        <div className={styles.hint}>(${localMin} – ${localMax})</div>
      </div>

      {/* Rating */}
      <div className={styles.block}>
        <label className={styles.label} htmlFor="flt-rating">Min Rating</label>
        <input
          id="flt-rating"
          className={styles.range}
          type="range"
          min={0}
          max={5}
          step={0.5}
          value={value.minRating}
          onChange={(e) => onChange({ ...value, minRating: Number(e.target.value) })}
        />
        <div className={styles.hint}>{value.minRating} ★ & up</div>
      </div>

      {/* Sort */}
      <div className={styles.block}>
        <label className={styles.label} htmlFor="flt-sort">Sort by</label>
        <select
          id="flt-sort"
          className={styles.select}
          value={value.sort}
          onChange={(e) => onChange({ ...value, sort: e.target.value as any })}
        >
          <option value="relevance">Relevance</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="rating-desc">Rating: High → Low</option>
        </select>
      </div>
    </aside>
  );
}
