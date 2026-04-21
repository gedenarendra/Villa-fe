import { useState, useCallback } from 'react';

/**
 * Custom Hook: useHeader
 * Manages header-specific UI logic like mobile menu state and navigation data.
 */
export const useHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { title: 'About Us', href: '/#about' },
    { title: 'Catalog', href: '/#catalog' },
    { title: 'Project', href: '/#projects' },
  ];

  const openMenu = useCallback(() => setIsMenuOpen(true), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);

  return {
    isMenuOpen,
    navLinks,
    openMenu,
    closeMenu,
    toggleMenu
  };
};
