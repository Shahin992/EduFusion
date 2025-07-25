import React from 'react';
import { Modal, Box, Typography, Button, Stack, Divider } from '@mui/material';
import { CustomButton } from './CustomButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: 900,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
  display: 'flex',
  flexDirection: 'column',
  outline: 'none',
  '&:focus-visible': {
    outline: 'none', 
  },
};


const footerStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 1.5,
  pt: 2,
  borderTop: '1px solid #ddd',
};

const CustomModal = ({
  open,
  handleClose,
  handleSubmit,
  submitDisabled = false,
  title,
  icon,
  imgSrc,
  children,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="custom-modal-title"
      aria-describedby="custom-modal-description"
    >
      <Box sx={style}>
        <Stack direction="row" alignItems="center" spacing={2} mb={1}>
          {icon ? (
            icon
          ) : imgSrc ? (
            <Box
              component="img"
              src={imgSrc}
              alt="modal-header-img"
              sx={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
            />
          ) : null}

          <Typography id="custom-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
        </Stack>

        <Divider />

        <Box
        //   id="custom-modal-description"
          sx={{ my: 2, width:'100%' }}
        >
          {children}
        </Box>

        <Box sx={footerStyle}>
          <CustomButton variant="outlined" customColor='red'  onClick={handleClose}>
            Close
          </CustomButton>
          <CustomButton
            variant="contained"
            onClick={handleSubmit}
            disabled={submitDisabled}
          >
            Submit
          </CustomButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;
