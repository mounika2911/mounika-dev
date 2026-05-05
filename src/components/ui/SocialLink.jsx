import { ICON_MAP } from '../../assets/icons/index.jsx';
import './SocialLink.css';

// ============================================================
// SOCIAL LINK — icon-only circle button linking to a social
//
// Usage:
//   <SocialLink href="https://github.com/..." icon="github" label="GitHub" />
// ============================================================

const SocialLink = ({ href, icon, label }) => {
  const Icon = ICON_MAP[icon] || ICON_MAP['web'];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="social-link"
      aria-label={label}
      title={label}
    >
      <Icon size={17} />
    </a>
  );
};

export default SocialLink;
