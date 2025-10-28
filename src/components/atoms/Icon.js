import React from 'react';
import { colors, spacing } from '../../design-tokens';

const Icon = ({ 
  name,
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

  const getIconSymbol = (iconName) => {
    const icons = {
      'camera': '📷',
      'upload': '📁',
      'search': '🔍',
      'arrow-left': '←',
      'plus': '+',
      'folder': '📁',
      'check': '✓',
      'close': '✕',
      'menu': '☰',
      'settings': '⚙️',
      'user': '👤',
      'home': '🏠',
      'heart': '❤️',
      'star': '⭐',
      'info': 'ℹ️',
      'warning': '⚠️',
      'error': '❌',
      'success': '✅',
      'loading': '⏳',
    };
    return icons[iconName] || iconName || '?';
  };

  const baseStyles = {
    display: 'inline-block',
    color: color,
    lineHeight: 1,
    ...getSizeStyles(),
    ...style,
  };

  // Support both 'name' and 'icon' props for backwards compatibility
  const iconContent = name ? getIconSymbol(name) : icon;

  return (
    <span
      style={baseStyles}
      {...props}
    >
      {iconContent}
    </span>
  );
};

export default Icon;
