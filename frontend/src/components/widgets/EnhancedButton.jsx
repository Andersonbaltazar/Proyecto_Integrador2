import PropTypes from 'prop-types';

const EnhancedButton = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  ...props 
}) => {
  const baseClass = 'enhanced-button';
  const variantClass = `enhanced-button--${variant}`;
  const sizeClass = `enhanced-button--${size}`;
  const loadingClass = loading ? 'enhanced-button--loading' : '';
  const disabledClass = disabled ? 'enhanced-button--disabled' : '';

  const handleClick = (e) => {
    if (!disabled && !loading && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      className={`${baseClass} ${variantClass} ${sizeClass} ${loadingClass} ${disabledClass} ${className}`}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div 
          className="enhanced-loading-spinner"
          style={{ 
            width: 'calc(var(--size) * 4)', 
            height: 'calc(var(--size) * 4)',
            marginRight: 'calc(var(--size) * 2)'
          }}
        ></div>
      )}
      {icon && !loading && (
        <ion-icon 
          name={icon} 
          style={{ 
            fontSize: size === 'small' ? 'calc(var(--size) * 4)' : 'calc(var(--size) * 5)',
            transition: 'transform 0.3s ease'
          }}
        ></ion-icon>
      )}
      {children}
    </button>
  );
};

EnhancedButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  icon: PropTypes.string,
};

export default EnhancedButton; 