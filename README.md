# Nuvolum – Product Slider

A lightweight, accessible, and responsive product slider built with React + Vite.  
Recreates the **nuvo-challenge mockup** with a fully responsive design and smooth interactions.

---

## Features

- Vertical product slider (image, name, chevron)
- Product details card (title, price, rating, description, Add to Cart)
- Filters (search, category, price, rating, sort)
- Header with logo, nav links, search, and user icons
- SEO-friendly (all text in HTML, accessible labels)
- Mobile, tablet, and desktop responsive
- Graceful fallback to local data if API fails

---

## Data Source

Products are fetched from:  
[`https://fakestoreapi.com/products?limit=5`](https://fakestoreapi.com/products?limit=5)  

If the request fails, the app falls back to local sample products.

---

## Getting Started

### Install dependencies
```bash
npm install
# or
yarn



Run development server
npm run dev
# or
yarn dev


Tech Stack

React 18 + TypeScript

Vite

SCSS / SCSS Modules

React Icons

Project Structure
src/
  components/
    Header/
    ProductSlider/
    ProductDetails/
    Filters/
  styles/
    global.scss
    variables.scss
    mixins.scss
  types/
    product.ts
  App.tsx
  main.tsx

public/
  logo.jpg       # Header logo
  favicon.ico    # Tab icon
index.html

#Customization

Replace public/logo.jpg for the header logo.

Replace public/favicon.ico for the browser tab icon.

Update src/styles/variables.scss for brand colors, fonts, and spacing.

Extend src/components/Filters/Filters.tsx to add more filter options.


#Accessibility

All text remains in the DOM for SEO.

Buttons and interactive elements include aria-* labels.

Supports prefers-reduced-motion for users with motion sensitivity.