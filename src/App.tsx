import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header/Header";
import Filters, { FiltersState } from "./components/Filters/Filters.tsx";
import ProductSlider from "./components/ProductSlider/ProductSlider";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import type { Product } from "./types/product";

// Fallback if API fails
const FALLBACK_PRODUCTS: Product[] = [ /*keep array*/ ];

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  // global search mirrors header search
  const [search, setSearch] = useState("");

  // filters state
  const [filters, setFilters] = useState<FiltersState>({
    q: "",
    categories: {},
    minPrice: 0,
    maxPrice: 9999,
    minRating: 0,
    sort: "relevance",
  });

  // Fetch products; fallback to local on error
  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("https://fakestoreapi.com/products?limit=5");
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data: Product[] = await r.json();
        setProducts(data);
        if (data.length) setSelectedProductId(data[0].id);
      } catch {
        setProducts(FALLBACK_PRODUCTS);
        if (FALLBACK_PRODUCTS.length) setSelectedProductId(FALLBACK_PRODUCTS[0].id);
        setErr(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Initialize price bounds once products are loaded
  useEffect(() => {
    if (!products.length) return;
    const prices = products.map(p => p.price);
    const min = Math.floor(Math.min(...prices));
    const max = Math.ceil(Math.max(...prices));
    setFilters(f => ({ ...f, minPrice: min, maxPrice: max }));
  }, [products]);

  // Apply filters
  const filteredProducts = useMemo(() => {
    const q = (filters.q || search).trim().toLowerCase();

    let data = products.filter(p => {
      const inQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);

      const inCat =
        Object.values(filters.categories).some(Boolean)
          ? !!filters.categories[p.category]
          : true;

      const inPrice = p.price >= filters.minPrice && p.price <= filters.maxPrice;
      const inRating = (p.rating?.rate ?? 0) >= filters.minRating;
      return inQ && inCat && inPrice && inRating;
    });

    switch (filters.sort) {
      case "price-asc":
        data = [...data].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        data = [...data].sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        data = [...data].sort(
          (a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0)
        );
        break;
      default:
        break;
    }
    return data;
  }, [products, filters, search]);

  // Keep selection valid when filtering
  useEffect(() => {
    if (!filteredProducts.length) {
      setSelectedProductId(null);
      return;
    }
    if (!selectedProductId || !filteredProducts.find(p => p.id === selectedProductId)) {
      setSelectedProductId(filteredProducts[0].id);
    }
  }, [filteredProducts, selectedProductId]);

  const selected = useMemo(
    () => filteredProducts.find(p => p.id === selectedProductId) ?? null,
    [filteredProducts, selectedProductId]
  );

  const handleSelectProduct = (id: number) => setSelectedProductId(id);

  const handleNavigate = (dir: "prev" | "next") => {
    if (!filteredProducts.length || selectedProductId == null) return;
    const i = filteredProducts.findIndex(p => p.id === selectedProductId);
    if (i < 0) return;
    const j =
      dir === "next"
        ? (i + 1) % filteredProducts.length
        : (i - 1 + filteredProducts.length) % filteredProducts.length;
    setSelectedProductId(filteredProducts[j].id);
  };

  if (loading) return <p style={{ padding: 24 }}>Loading…</p>;
  if (err) return <p style={{ padding: 24 }} role="alert">Error: {err}</p>;

  return (
    <>
      <Header search={search} onSearchChange={setSearch} />

      {/* Hero */}
      <header style={{ marginTop: 24 }}>
        <h1 className="page-title">Nuvolum</h1>
        <p className="lead">
          Business and marketing strategy and award-winning execution that sets your brand apart
          in every way. Every time.
        </p>
      </header>

      {/* 3-column layout: Filters | Product Rail | Details */}
      <main
        style={{
          display: "grid",
          gridTemplateColumns: "280px 360px 1fr",
          gap: 24,
          maxWidth: 1200,
          margin: "24px auto",
          padding: "0 16px",
          alignItems: "start",
        }}
        aria-label="Filters, product list and details"
      >
        <Filters
          products={products}
          value={filters}
          onChange={setFilters}
        />

        <aside aria-label="Products" style={{ maxHeight: "70vh", overflowY: "auto", paddingRight: 4 }}>
          <ProductSlider
            products={filteredProducts}
            selectedProductId={selectedProductId}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
          />
        </aside>

        <section aria-live="polite" aria-atomic="true">
          <ProductDetails product={selected ?? undefined} onAddToCart={() => {}} />
        </section>
      </main>
    </>
  );
}
