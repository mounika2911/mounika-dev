import './SectionLabel.css';

// ============================================================
// SECTION LABEL — small mono eyebrow text above section titles
//
// Usage:
//   <SectionLabel>Selected Work</SectionLabel>
// ============================================================

const SectionLabel = ({ children, className = '' }) => (
  <p className={`section-label ${className}`}>
    <span className="section-label__line" />
    {children}
  </p>
);

export default SectionLabel;
