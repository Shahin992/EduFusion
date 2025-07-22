import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const CustomButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'customColor',
})(({ customColor = '#346fef' }) => ({
  fontWeight: 600,
  fontSize: '15px',
  textTransform: 'capitalize',
  height:'40px',

  '&.MuiButton-contained': {
    backgroundColor: `${customColor} !important`,
    color: `#ffffff !important`,
    '&:hover, &:focus': {
      backgroundColor: `${customColor} !important`,
    },
    '&.Mui-disabled': {
      backgroundColor: `rgba(0, 0, 0, 0.12) !important`,
      color: `rgba(0, 0, 0, 0.26) !important`,
    },
  },

  '&.MuiButton-outlined': {
    borderColor: `${customColor} !important`,
    color: `${customColor} !important`,
    backgroundColor: `transparent !important`,
    '&:hover, &:focus': {
      backgroundColor: `transparent !important`,
      borderColor: `${customColor} !important`,
    },
    '&.Mui-disabled': {
      borderColor: `rgba(0, 0, 0, 0.26) !important`,
       backgroundColor: `rgba(0, 0, 0, 0.12) !important`,
      color: `rgba(0, 0, 0, 0.26) !important`,
    },
  },
}));
