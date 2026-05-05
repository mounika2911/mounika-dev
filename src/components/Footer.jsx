import { ME } from '../constants/data.js';
import './Footer.css';

// ============================================================
// FOOTER
// ============================================================

const Footer = () => (
  <footer className="footer">
    <span className="footer__name">
      {ME.name} <span className="footer__dot">✦</span>
    </span>
    <span className="footer__credit">
      Engineered with React & Claude AI · {new Date().getFullYear()}
    </span>
  </footer>
);

export default Footer;
