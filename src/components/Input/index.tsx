import React, { InputHTMLAttributes } from 'react';

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
  return (
    <Container>
      <label htmlFor={name}>{label}</label>
      <input type="text" id={name} placeholder={placeholder} {...rest} />
    </Container>
  );
};

export default Input;
