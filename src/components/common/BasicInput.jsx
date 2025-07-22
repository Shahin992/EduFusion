import { FormHelperText, InputBase, styled } from "@mui/material";

//                              Useages
//  <BasicInput
//   placeholder="Search system wise"
//   name="appName"
//   endAdornment={
//     <InputAdornment position="end">
//       <SearchIcon sx={{ color: '#ced4da' }} />
//     </InputAdornment>
//   }
// />



const BasicInput = styled(({ fullWidth: _fullWidth, height: _height, ...props }) => (
  <InputBase {...props} />
))(({ theme, fullWidth, height }) => ({
  position: 'relative',
  backgroundColor: 'white',
  fontSize: 15,
  height: height || '2.5rem',
  padding: '0px 12px',
  borderRadius: '4px',
  border: '1px solid #ced4da',
  transition: theme.transitions.create(['border-color', 'box-shadow']),
  display: 'flex',
  alignItems: 'center',
  boxSizing: 'border-box',
  width: fullWidth ? '100% !important' : 'auto',

  '&:focus-within': {
    boxShadow: 'unset',
  },

  '& .MuiInputAdornment-positionStart': {
    marginRight: 8,
    color: '#6f42c1',
  },
  '& .MuiInputAdornment-positionEnd': {
    marginLeft: 8,
  },

  '& input': {
    flex: 1,
    fontSize: '15px',
    padding: 0,
    border: 'none',
    outline: 'none',
    height: '100%',
    backgroundColor: 'transparent',
    '&::placeholder': {
      color: '#082852',
    },

    // ✅ Hide number input arrows (Chrome, Safari, Edge)
    '&[type=number]::-webkit-outer-spin-button, &[type=number]::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
      margin: 0,
    },

    // ✅ Hide number input arrows (Firefox)
    '&[type=number]': {
      MozAppearance: 'textfield',
    },
  },
}));

export default BasicInput;




