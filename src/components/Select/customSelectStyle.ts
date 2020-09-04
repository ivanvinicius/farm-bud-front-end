const customSelectStyle = {
  option: (provided: any, state: any) => ({ //eslint-disable-line
    ...provided,
    color: state.isSelected ? 'white' : 'black',
    backgroundColor: state.isSelected ? '#5506B0' : 'white',
  }),
  control: (provided: any) => ({ //eslint-disable-line
    ...provided,
    boxShadow: null,
    minHeight: '5.7rem',
    fontSize: '1.7rem',
    fontFamily: 'Archivo',
    borderWidth: 0,
    borderRadius: '0.8rem',
  }),
};

export default customSelectStyle;
