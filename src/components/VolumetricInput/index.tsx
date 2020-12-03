import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useField } from '@unform/core';

import VolumetricInputField from 'react-currency-input-field';
import { CurrencyInputProps as VolumetricInputProps } from 'react-currency-input-field/dist/components/CurrencyInputProps';

import { Container } from './styles';

interface IVolumetricInputProps extends VolumetricInputProps {
  name: string;
}

const VolumetricInput: React.FC<IVolumetricInputProps> = ({
  name,
  ...rest
}) => {
  const { registerField, fieldName, error, defaultValue } = useField(name);
  const inputRef = useRef({ value: defaultValue });
  const [inputValue, setInputValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current.value);
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = inputValue;
    }
  }, [inputValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue: (_, value: string) => {
        setInputValue(value);
      },
      clearValue: () => {
        setInputValue('');
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container hasError={!!error} isFocused={isFocused} isFilled={isFilled}>
      <VolumetricInputField
        name={name}
        defaultValue={defaultValue}
        value={inputValue}
        onChange={(value) => setInputValue(value)}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
      />
    </Container>
  );
};

export default VolumetricInput;
