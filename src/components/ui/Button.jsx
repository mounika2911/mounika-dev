import './Button.css';

// ============================================================
// BUTTON — reusable, supports 3 variants
//
// Usage:
//   <Button>Click me</Button>
//   <Button variant="outline">Outline</Button>
//   <Button variant="ghost">Ghost</Button>
//   <Button as="a" href="#" icon={<DownloadIcon />}>Resume</Button>
// ============================================================

const Button = ({
  children,
  variant = 'solid',   // 'solid' | 'outline' | 'ghost'
  size = 'md',         // 'sm' | 'md' | 'lg'
  icon,                // optional leading icon element
  iconRight,           // optional trailing icon element
  as: Tag = 'button',  // render as <a>, <button>, etc.
  className = '',
  ...props
}) => {
  return (
    <Tag
      className={`btn btn--${variant} btn--${size} ${className}`}
      {...props}
    >
      {icon && <span className="btn__icon btn__icon--left">{icon}</span>}
      <span className="btn__label">{children}</span>
      {iconRight && <span className="btn__icon btn__icon--right">{iconRight}</span>}
    </Tag>
  );
};

export default Button;
