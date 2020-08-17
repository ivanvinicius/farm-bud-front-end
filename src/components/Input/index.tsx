import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { Container } from './styles';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  placeholder: string;
}

const Input: React.FC<IInputProps> = ({
  name,
  label,
  placeholder,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type="text"
        placeholder={placeholder}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
    </Container>
  );
};

export default Input;
