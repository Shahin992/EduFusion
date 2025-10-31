import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import AddIcon from '@mui/icons-material/Add';
import { CustomButton } from '../common/CustomButton';

const SubjectWiseHeader = ({ exam }) => {
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
      {/* Left: Icon and Title */}
      <Stack direction="row" spacing={2} alignItems="center">
        <PeopleIcon sx={{ fontSize: 40, color: '#6c5ce7' }} />
        <Box>
          <Typography variant="h6" fontWeight="bold">
            Subject-Wise Marks
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Enter and manage marks for each student by subject.
          </Typography>
        </Box>
      </Stack>

      {/* Right: Add Marks Button */}
      <Box minWidth={200}>
        <BasicSelect
          fullWidth
          options={exam?.subjects || []}
          value={selectedSubject}
          onChange={(e) => onChangeSubject(e.target.value)}
          defaultText="Select a Subject"
          mapping={{ label: "name", value: "marks" }}
        />
      </Box>
    </Box>
  );
};

export default SubjectWiseHeader;
