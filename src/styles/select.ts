const customStyles = {
  option: (provided: any, state: any) => ({ // eslint-disable-line
    ...provided,
    color: state.isSelected ? 'white' : 'black',
    backgroundColor: state.isSelected ? '#8257E5' : 'white',
  }),
  control: (provided: any) => ({ // eslint-disable-line
    ...provided,
    fontSize: '1.6rem',
    fontFamily: 'Archivo',
    alignItems: 'center',
    backgroundColor: '#FFFF',
    borderColor: '#E6E6F0',
    borderRadius: '0.8rem',
    borderStyle: 'solid',
    borderWidth: 1,
    boxShadow: null,
    boxSizing: 'border-box',
    cursor: 'default',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    label: 'control',
    minHeight: '5.6rem',
    height: '5.6rem',
    outline: '0 !important',
    position: 'relative',
    marginTop: '0.8rem',

    '&:hover': {
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#E6E6F0',
    },

    '&:focus-within': {
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#E6E6F0',
    },
  }),
};

export { customStyles };
