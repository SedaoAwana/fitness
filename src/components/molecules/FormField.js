import React from 'react';
import Label from '../atoms/Label';
import Input from '../atoms/Input';
import Select from '../atoms/Select';
import ErrorMessage from '../atoms/ErrorMessage';
import { spacing } from '../../design-tokens';

const FormField = ({ 
  label,
  type = 'text',
  options = [],
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  fullWidth = true,
  size = 'md',
  error,
  style,
  ...props 
}) => {
  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
    width: fullWidth ? '100%' : 'auto',
    ...style,
  };

  return (
    <div style={containerStyles}>
      <Label 
        htmlFor={props.id || props.name}
        required={required}
        size={size}
      >
        {label}
      </Label>
      
      {type === 'select' ? (
        <Select
          options={options}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          fullWidth={fullWidth}
          size={size}
          {...props}
        />
      ) : (
        <Input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          fullWidth={fullWidth}
          size={size}
          {...props}
        />
      )}
      
      <ErrorMessage message={error} visible={!!error} />
    </div>
  );
};

export default FormField;
