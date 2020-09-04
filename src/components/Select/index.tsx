import React, { useRef, useEffect, useCallback, useState } from 'react';
import ReactSelect, { OptionTypeBase, Props } from 'react-select';
import { useField } from '@unform/core';

import customSelectStyle from './customSelectStyle';
import { Container } from './styles';

interface ISelectProps extends Props<OptionTypeBase> {
  name: string;
}

const Select: React.FC<ISelectProps> = ({ name, ...rest }) => {
  const selectRef = useRef<any>(null); // eslint-disable-line
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,

      getValue: (ref: any) => { // eslint-disable-line
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  const handleInputChange = useCallback(() => {
    async function getSelectValue() {
      const { state } = await selectRef?.current;

      typeof state.value?.value !== 'undefined'
        ? setIsFilled(true)
        : setIsFilled(false);
    }

    getSelectValue();
  }, []);

  return (
    <Container isFilled={isFilled} hasError={!!error}>
      <ReactSelect
        styles={customSelectStyle}
        ref={selectRef}
        defaultValue={defaultValue}
        isClearable={false}
        isSearchable={false}
        onInputChange={handleInputChange}
        classNamePrefix="react-select"
        {...rest}
      />
    </Container>
  );
};

export default Select;
