export const interestsCustomStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: '#18181B', // bg color на полето
    borderColor: 'transparent',
    height: '40px',
    boxShadow: 'none',
    '&:hover': {
      borderColor: 'transparent',
    },
     '&:focus': {
      border: '1px solid #822659',
      //borderColor: '#a1a1aa',
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: '#18181B', // bg color на падащото меню
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? '#18181B' 
      : state.isFocused
      ? '#822659' // hover
      : '#18181B', // default
    color: '#F0F0F0',
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: '#F0F0F0', // фон на избрания "таг"
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: '#822659',
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: '#822659',
    ':hover': {
      backgroundColor: '#822659',
      color: 'white',
    },
  }),
};