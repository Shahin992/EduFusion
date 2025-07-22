import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AddIcon from '@mui/icons-material/Add';
import SchoolIcon from '@mui/icons-material/School';
import { CustomButton } from '../common/CustomButton';

const AcademisHeaders = ({ onAddClick }) => {
  return (
    <Box p={2} display="flex" justifyContent="space-between" alignItems="center" bgcolor="#f5f6fa" borderRadius={2}>
      <Stack direction="row" spacing={2} alignItems="center">
        <SchoolIcon sx={{ fontSize: 40, color: '#6c5ce7' }} />
        <Box>
          <Typography variant="h6" fontWeight="bold">
            Class Management
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Define and organize your academic classes. Versions and Sections are optional.
          </Typography>
        </Box>
      </Stack>

      <Stack direction="row" spacing={1}>
        <Button variant="outlined" startIcon={<HelpOutlineIcon />} >
          How it works
        </Button>
        <CustomButton variant="contained" startIcon={<AddIcon />}  onClick={onAddClick} disabled={true}>
          New Class
        </CustomButton>
      </Stack>
    </Box>
  );
};

export default AcademisHeaders;
