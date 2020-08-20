import React, { useRef, useEffect } from 'react';
import ReactSelect, { OptionTypeBase, Props } from 'react-select';
import { useField } from '@unform/core';
import { customStyles } from '../../styles/select';

interface ISelectProps extends Props<OptionTypeBase> {
  name: string;
}

const Select: React.FC<ISelectProps> = ({ name, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);

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

  return (
    <ReactSelect
      styles={customStyles}
      ref={selectRef}
      defaultValue={defaultValue}
      classNamePrefix="react-select"
      {...rest}
    />
  );
};

Select.defaultProps = {
  isSearchable: false,
  isClearable: false,
};

export default Select;
