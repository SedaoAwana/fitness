// Design Tokens for Atomic Design System

export const colors = {
  // Primary Colors
  primary: {
    50: '#ebf8ff',
    100: '#bee3f8',
    200: '#90cdf4',
    300: '#63b3ed',
    400: '#4299e1',
    500: '#3498db', // Main primary color
    600: '#3182ce',
    700: '#2b6cb0',
    800: '#2c5282',
    900: '#2a4365',
  },
  
  // Secondary Colors
  secondary: {
    50: '#f7fafc',
    100: '#edf2f7',
    200: '#e2e8f0',
    300: '#cbd5e0',
    400: '#a0aec0',
    500: '#95a5a6', // Main secondary color
    600: '#718096',
    700: '#4a5568',
    800: '#2d3748',
    900: '#1a202c',
  },
  
  // Success Colors
  success: {
    50: '#f0fff4',
    100: '#c6f6d5',
    200: '#9ae6b4',
    300: '#68d391',
    400: '#48bb78',
    500: '#27ae60', // Main success color
    600: '#38a169',
    700: '#2f855a',
    800: '#276749',
    900: '#22543d',
  },
  
  // Neutral Colors
  neutral: {
    50: '#f8f9fa',
    100: '#e9ecef',
    200: '#dee2e6',
    300: '#ced4da',
    400: '#adb5bd',
    500: '#7f8c8d', // Main neutral color
    600: '#6c757d',
    700: '#495057',
    800: '#343a40',
    900: '#2c3e50', // Main text color
  },
  
  // Background Colors
  background: {
    primary: '#ffffff',
    secondary: '#f8f9fa',
    overlay: 'rgba(0, 0, 0, 0.1)',
  },
  
  // Border Colors
  border: {
    light: '#e9ecef',
    medium: '#dee2e6',
    dark: '#ced4da',
  }
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '20px',
  xl: '24px',
  xxl: '30px',
  xxxl: '40px',
};

export const borderRadius = {
  sm: '8px',
  md: '12px',
  lg: '15px',
  xl: '20px',
  full: '50px',
};

export const typography = {
  fontFamily: {
    primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
    '4xl': '48px',
  },
  
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.6,
    loose: 1.8,
  }
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  primary: '0 4px 15px rgba(52, 152, 219, 0.3)',
  primaryHover: '0 6px 20px rgba(52, 152, 219, 0.4)',
};

export const transitions = {
  fast: '0.15s ease',
  normal: '0.3s ease',
  slow: '0.5s ease',
};

export const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px',
};

export const zIndex = {
  base: 1,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modal: 1040,
  popover: 1050,
  tooltip: 1060,
};
