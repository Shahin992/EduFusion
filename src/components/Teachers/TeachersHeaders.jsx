import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  InputAdornment,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/People';
import { CustomButton } from '../common/CustomButton';
import BasicInput from '../common/BasicInput';
import { classOptions } from '../../constant/CoreConstant';
import BasicSelect from '../common/BasicSelect';
import CustomModal from '../common/CustomModal';
import TeacherIcon from '../../constant/Icons';
import AddOrEditTeacherModal from './AddOrEditTeacherModal';

const TeachersHeader = () => {
  const [openAddTeacherModal, setOpenAddTeacherModal] = useState(false);

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
      width={'100%'}
    >
      {/* Left: Icon and Title */}
      <Stack direction="row" spacing={2} alignItems="center">
        <TeacherIcon height={'52px'} width={'52px'} color ={'#6c5ce7'} />
        <Box>
          <Typography variant="h6" fontWeight="bold">
            Teachers Management
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Search and manage Teachers.
          </Typography>
        </Box>
      </Stack>

      {/* Right: Search, Filter & Add Button */}
      <Box flex={1} minWidth={300} display="flex" justifyContent="flex-end" gap={2}>
        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
          {/* Search Input */}
          <div style={{width:'250px'}}>
            <BasicInput
            fullWidth
            placeholder="Search students"
            name="studentSearch"
            endAdornment={
              <InputAdornment position="end">
                <SearchIcon sx={{ color: '#ced4da' }} />
              </InputAdornment>
            }
            sx={{ flex: 1, width: 200 }}
          />
          </div>

          {/* Class Filter */}
          {/* <div style={{width:'250px'}}>
            <BasicSelect
            fullWidth
            options={classOptions}
            value={''}
            defaultText="Filter By Class"
            mapping={{ label: 'title', value: 'value' }}
            sx={{ minWidth: 160 }}
          />
          </div> */}

          {/* Add Student */}
          <CustomButton
            variant="contained"
            startIcon={<AddIcon />}
            onClick={()=> setOpenAddTeacherModal(true)}
          >
            New Teacher
          </CustomButton>
        </Stack>
      </Box>
      {
        openAddTeacherModal && (
          <AddOrEditTeacherModal
          open={openAddTeacherModal}
          onClose={()=> setOpenAddTeacherModal(false)}
          />
        )
      }
    </Box>
  );
};

export default TeachersHeader;
