import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useField } from '@unform/core';
import { IconBaseProps } from 'react-icons';
import { RiErrorWarningLine } from 'react-icons/ri';
import CurrencyInputField from 'react-currency-input-field';
import { CurrencyInputProps } from 'react-currency-input-field/dist/components/CurrencyInputProps';

import Tooltip from '../Tooltip';

import { Container } from './styles';

interface ICurrencyInputProps extends CurrencyInputProps {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const CurrencyInput: React.FC<ICurrencyInputProps> = ({
  name,
  icon: Icon,
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
      {Icon && <Icon size={20} />}

      <CurrencyInputField
        name={name}
        defaultValue={defaultValue}
        value={inputValue}
        onChange={(value) => setInputValue(value)}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
      />

      {error && (
        <Tooltip title={error}>
          <RiErrorWarningLine size={20} />
        </Tooltip>
      )}
    </Container>
  );
};

export default CurrencyInput;
