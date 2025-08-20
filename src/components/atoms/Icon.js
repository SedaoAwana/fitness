import React from 'react';
import { colors, spacing } from '../../design-tokens';

const Icon = ({ 
  icon, 
  size = 'md',
  color = 'currentColor',
  style,
  ...props 
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'xs':
        return { fontSize: '12px' };
      case 'sm':
        return { fontSize: '16px' };
      case 'md':
        return { fontSize: '24px' };
      case 'lg':
        return { fontSize: '32px' };
      case 'xl':
        return { fontSize: '48px' };
      case '2xl':
        return { fontSize: '64px' };
      default:
        return { fontSize: '24px' };
    }
  };

  const baseStyles = {
    display: 'inline-block',
    color: color,
    lineHeight: 1,
    ...getSizeStyles(),
    ...style,
  };

  return (
    <span
      style={baseStyles}
      {...props}
    >
      {icon}
    </span>
  );
};

export default Icon;
