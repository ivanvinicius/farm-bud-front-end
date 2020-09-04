const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    color: state.isSelected ? 'white' : 'black',
    backgroundColor: state.isSelected ? '#5506B0' : 'white',
  }),
  control: (provided: any) => ({
    ...provided,
    boxShadow: null,

    minHeight: '5.7rem',

    fontSize: '1.7rem',
    fontFamily: 'Archivo',

    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: '0.8rem',
    borderColor: '#E6E6F0',

    '&:hover': {
      borderColor: '#E6E6F0',
    },

    '&:focus-within': {
      borderColor: '#7620D8',
    },
  }),
};

export { customStyles };
