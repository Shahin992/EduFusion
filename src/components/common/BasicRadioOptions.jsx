import React from 'react';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormHelperText,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// ✅ Styled Radio to look consistent with BasicSelect
const StyledRadio = styled(Radio)(({ theme }) => ({
  color: '#6c5ce7',
  '&.Mui-checked': {
    color: '#6c5ce7',
  },
  '&:hover': {
    backgroundColor: 'rgba(108, 92, 231, 0.08)',
  },
}));

const BasicRadioOptions = ({
  options = [],
  mapping = { label: 'title', value: 'value' },
  name = 'basic-radio',
  value = '',
  onChange,
  row = true,
  error = '',
  disabled = false,
}) => {
  return (
    <FormControl
      component="fieldset"
      error={!!error}
      style={{ width: '100%' }}
      disabled={disabled}
    >
      <RadioGroup
        row={row}
        name={name}
        value={value}
        onChange={(e) => onChange(e)}
      >
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            value={option[mapping.value]}
            control={<StyledRadio />}
            label={option[mapping.label]}
          />
        ))}
      </RadioGroup>
      {!!error && (
        <FormHelperText style={{ marginTop: '-4px' }}>{error}</FormHelperText>
      )}
    </FormControl>
  );
};

export default BasicRadioOptions;
