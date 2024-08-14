import React from 'react';
import './Button.css';

interface ButtonProps {
  onClick: () => void;
  type: "submit" | "reset" | "button" | undefined;
  children?: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, type, children, className = '' }) => {
  return (
    <button type={type} onClick={onClick} className={`button ${className}`}>
      {children}
    </button>
  );
};

export default Button;
