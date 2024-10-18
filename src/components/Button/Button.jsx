import React from 'react';
import styles from './Button.module.css';

function Button({ children, onClick, variant = 'primary', type = 'button', className = '', ...props }) {
  const buttonClasses = `${styles.button} ${styles[variant]} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
