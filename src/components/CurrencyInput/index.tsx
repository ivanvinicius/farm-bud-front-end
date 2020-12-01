import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import CurrencyField from 'react-currency-input-field';

interface ICurrencyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const CurrencyInput: React.FC<ICurrencyInputProps> = ({ name, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return <CurrencyField ref={inputRef} defaultValue={defaultValue} {...rest} />;
};

export default CurrencyInput;
