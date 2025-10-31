import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  InputAdornment,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import SchoolIcon from '@mui/icons-material/School'; // (you’ll create or reuse your existing marks modal)
import BasicInput from '../../common/BasicInput';
import { CustomButton } from '../../common/CustomButton';
import AddOrEditStudentMarksModal from './AddOrEditStudentMarksModal';

const StudentWiseAddMarksHeader = ({exam}) => {
  const [openAddMarksModal, setOpenAddMarksModal] = useState(false);

  return (
    <Box
      p={2}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bgcolor="#f5f6fa"
      borderRadius={2}
      flexWrap="wrap"
      gap={2}
      width="100%"
    >
      {/* Left Section — Title & Subtitle */}
      <Stack direction="row" spacing={2} alignItems="center">
        <SchoolIcon sx={{ fontSize: 40, color: '#3b82f6' }} />
        <Box>
          <Typography variant="h6" fontWeight="bold">
            Student Marks
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Enter, view, and manage marks for each student.
          </Typography>
        </Box>
      </Stack>

      {/* Right Section — Search + Add Button */}
      <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
        {/* Search Field */}
        <div style={{ width: '250px' }}>
          <BasicInput
            fullWidth
            placeholder="Search students"
            name="studentSearch"
            endAdornment={
              <InputAdornment position="end">
                <SearchIcon sx={{ color: '#ced4da' }} />
              </InputAdornment>
            }
          />
        </div>

        {/* Add Marks Button */}
        <CustomButton
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenAddMarksModal(true)}
        >
          Add Student Marks
        </CustomButton>
      </Box>

      {/* Modal to Add Marks */}
       {openAddMarksModal && (
        <AddOrEditStudentMarksModal
          open={openAddMarksModal}
          onClose={() => { setOpenAddMarksModal(false); }}
          exam={exam}
        //   students={students}
        //   editData={editMarksData}
        //   onSave={handleSaveMarks}
        />
      )}
    </Box>
  );
};

export default StudentWiseAddMarksHeader;
