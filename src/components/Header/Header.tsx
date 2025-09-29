import React from "react";
import styles from "./Header.module.scss";
import { FaSearch, FaUser, FaHeart, FaShoppingCart } from "react-icons/fa";

interface HeaderProps {
  onSearchChange?: (value: string) => void;
  search?: string;
}

const Header: React.FC<HeaderProps> = ({ onSearchChange, search = "" }) => {
  return (
    <header className={styles.header}>
      {/* LEFT: logo + search */}
      <div className={styles.left}>
        <a href="/" className={styles.logo}>
          <img src="/logo.jpg" alt="Nuvolum Logo" />
        </a>

        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => onSearchChange?.(e.target.value)}
            aria-label="Search"
          />
          <FaSearch className={styles.searchIcon} aria-hidden />
        </div>
      </div>

      {/* CENTER: nav links (kept exactly centered) */}
      <nav className={styles.nav} aria-label="primary">
        <a href="#">Women</a>
        <a href="#">Men</a>
        <a href="#">Kids</a>
        <a href="#">Home</a>
        <a href="#">Beauty</a>
      </nav>

      {/* RIGHT: actions (bigger icons, fully right) */}
      <div className={styles.actions}>
        <button className={styles.iconButton} aria-label="Profile">
          <FaUser />
        </button>
        <button className={styles.iconButton} aria-label="Wishlist">
          <FaHeart />
        </button>
        <button className={styles.iconButton} aria-label="Cart">
          <FaShoppingCart />
        </button>
      </div>
    </header>
  );
};

export default Header;
