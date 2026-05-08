import { useState, useEffect } from 'react';
import { ME } from '../constants/data.js';
import './Navbar.css';

// ============================================================
// NAVBAR
// ============================================================

const NAV_ITEMS = ['about', 'experience', 'projects', 'stack', 'contact'];

const Navbar = () => {
  const [scrolled, setScrolled]   = useState(false);
  const [active, setActive]       = useState('about');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setActive(id);
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <span className="navbar__logo" onClick={() => scrollTo('about')}>
        {ME.name.split(' ')[0]}
        <span className="navbar__logo-dot">.</span>
      </span>

      <button
        className={`navbar__menu-button ${mobileOpen ? 'navbar__menu-button--open' : ''}`}
        onClick={() => setMobileOpen((prev) => !prev)}
        aria-label="Toggle navigation menu"
        type="button"
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`navbar__links ${mobileOpen ? 'navbar__links--open' : ''}`}>
        {NAV_ITEMS.map(item => (
          <button
            key={item}
            className={`navbar__link ${active === item ? 'navbar__link--active' : ''}`}
            onClick={() => scrollTo(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
