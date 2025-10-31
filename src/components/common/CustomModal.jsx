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
  title= 'Custom Modal',
  description='',
  icon,
  imgSrc,
  children,
  closeButtonText= 'Close',
  submitButtonText='Submit'
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

          <Stack direction='column' spacing={1}
          >
            <Typography id="custom-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          {
            description && (
              <Typography variant="body2" color="textSecondary">
                {description}
              </Typography>
            )
          }
          </Stack>
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
            {closeButtonText}
          </CustomButton>
          <CustomButton
            variant="contained"
            onClick={handleSubmit}
            disabled={submitDisabled}
          >
            {submitButtonText}
          </CustomButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;
