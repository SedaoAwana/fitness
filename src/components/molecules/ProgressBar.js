import React from 'react';
import { colors, transitions, zIndex } from '../../design-tokens';

const ProgressBar = ({ 
  progress = 0, // 0-100
  height = '4px',
  backgroundColor = colors.neutral[100],
  progressColor = colors.primary[500],
  style,
  ...props 
}) => {
  const containerStyles = {
    width: '100%',
    height: height,
    backgroundColor: backgroundColor,
    borderRadius: height,
    overflow: 'hidden',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: zIndex.sticky,
    ...style,
  };

  const progressStyles = {
    width: `${Math.min(Math.max(progress, 0), 100)}%`,
    height: '100%',
    backgroundColor: progressColor,
    transition: transitions.normal,
    borderRadius: height,
  };

  return (
    <div style={containerStyles} {...props}>
      <div style={progressStyles} />
    </div>
  );
};

export default ProgressBar;
