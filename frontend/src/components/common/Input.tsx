import React from 'react';
import './Input.css';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  id: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({ value, onChange, placeholder, id, className = '' }) => {
  return (
    <input
      type="text"
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`input ${className}`}
    />
  );
};

export default Input;
