import type { StylesConfig } from 'react-select';

type OptionType = {
  label: string;
  value: string;
};

export const interestsCustomStyles: StylesConfig<OptionType, true> = {
  control: (provided) => ({
    ...provided,
    backgroundColor: '#18181B',
    borderColor: 'transparent',
    height: '40px',
    boxShadow: 'none',
    '&:hover': {
      borderColor: 'transparent',
    },
    '&:focus': {
      border: '1px solid #822659',
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#18181B',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? '#18181B'
      : state.isFocused
      ? '#822659'
      : '#18181B',
    color: '#F0F0F0',
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#F0F0F0',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#822659',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: '#822659',
    ':hover': {
      backgroundColor: '#822659',
      color: 'white',
    },
  }),
};
