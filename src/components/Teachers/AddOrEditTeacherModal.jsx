import React, { useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import CustomModal from '../common/CustomModal';
import BasicInput from '../common/BasicInput';
import BasicSelect from '../common/BasicSelect';
import { useForm, Controller } from 'react-hook-form';
import BasicRadioOptions from '../common/BasicRadioOptions';

const genderOptions = [
  { title: 'Male', value: 'Male' },
  { title: 'Female', value: 'Female' },
  { title: 'Other', value: 'Other' },
];

const fieldItemStyle = {
  width: '100%',
  marginBottom: "16px",
  '@media (min-width: 900px)': {
    width: '48%',
    marginBottom: "20px",
  },
};

const containerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
};

const AddOrEditTeacherModal = ({ open, onClose, editData }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: '',
      gender: '',
      dob: '',
      nid: '',
      phone: '',
      qualification: '',
      subjects: '',
      salary: '',
      department: '', 
    },
  });

  useEffect(() => {
    if (editData) {
      reset({
        fullName: editData.fullName || '',
        gender: editData.gender || '',
        dob: editData.dob || '',
        nid: editData.nid || '',
        phone: editData.phone || '',
        qualification: editData.qualification || '',
        subjects: editData.subjects || '',
        salary: editData.salary || '',
        department: editData?.department || '',
      });
    } else {
      reset({
        fullName: '',
        gender: '',
        dob: '',
        nid: '',
        phone: '',
        qualification: '',
        subjects: '',
        salary: '',
        department: '',
      });
    }
  }, [editData]);

  const onSubmit = (data) => {
    console.log('Teacher Data Submitted: ', data);
    // ✅ Send data to API or database
  };

  return (
    <CustomModal
      open={open}
      handleClose={onClose}
      handleSubmit={handleSubmit(onSubmit)}
      title={editData ? 'Edit Teacher' : 'Add Teacher'}
      icon={<PeopleIcon sx={{ fontSize: 40, color: '#6c5ce7' }} />}
    >
      <Box sx={containerStyle}>
        
        {/* Full Name */}
        <Box sx={{ width: '100%', marginBottom: "16px" }}>
          <Typography variant="body2" fontWeight={500} mb={0.5}>
            Full Name
          </Typography>
          <Controller
            name="fullName"
            control={control}
            rules={{ required: 'Full Name is required' }}
            render={({ field }) => (
              <BasicInput
                {...field}
                fullWidth
                placeholder="Enter full name"
                error={!!errors.fullName}
              />
            )}
          />
          {errors.fullName && (
            <Typography color="error" fontSize={12} mt={0.5}>
              {errors.fullName.message}
            </Typography>
          )}
        </Box>

        {/* Gender */}
        <Box sx={fieldItemStyle}>
          <Typography variant="body2" fontWeight={500} mb={0.5}>
            Gender
          </Typography>
         <Controller
  name="gender"
  control={control}
  rules={{ required: 'Gender is required' }}
  render={({ field, fieldState: { error } }) => (
    <BasicRadioOptions
      options={genderOptions}
      value={field.value}                 // ✅ Must bind to field.value
      onChange={(e) => field.onChange(e.target.value)}  // ✅ Must call field.onChange
      mapping={{ label: 'title', value: 'value' }}
      error={error?.message}              // ✅ Pass error message
    />
  )}
/>
          {errors.gender && (
            <Typography color="error" fontSize={12} mt={0.5}>
              {errors.gender.message}
            </Typography>
          )}
        </Box>

        {/* Date of Birth */}
        <Box sx={fieldItemStyle}>
          <Typography variant="body2" fontWeight={500} mb={0.5}>
            Date of Birth
          </Typography>
          <Controller
            name="dob"
            control={control}
            rules={{ required: 'Date of Birth is required' }}
            render={({ field }) => (
              <BasicInput
                {...field}
                type="date"
                fullWidth
                error={!!errors.dob}
              />
            )}
          />
          {errors.dob && (
            <Typography color="error" fontSize={12} mt={0.5}>
              {errors.dob.message}
            </Typography>
          )}
        </Box>

        {/* National ID */}
        <Box sx={fieldItemStyle}>
          <Typography variant="body2" fontWeight={500} mb={0.5}>
            National ID (NID)
          </Typography>
          <Controller
            name="nid"
            control={control}
            rules={{
              required: 'NID is required',
              minLength: { value: 10, message: 'NID must be at least 10 digits' },
            }}
            render={({ field }) => (
              <BasicInput
                {...field}
                type="text"
                fullWidth
                placeholder="Enter NID number"
                error={!!errors.nid}
              />
            )}
          />
          {errors.nid && (
            <Typography color="error" fontSize={12} mt={0.5}>
              {errors.nid.message}
            </Typography>
          )}
        </Box>

        {/* Phone Number */}
        <Box sx={fieldItemStyle}>
          <Typography variant="body2" fontWeight={500} mb={0.5}>
            Phone Number
          </Typography>
          <Controller
            name="phone"
            control={control}
            rules={{
              required: 'Phone number is required',
              validate: (value) => {
                if (!value.startsWith('01')) return 'Number must start with 01';
                if (value.length !== 11) return 'Number must be exactly 11 digits';
                return true;
              },
            }}
            render={({ field }) => (
              <BasicInput
                {...field}
                type="number"
                fullWidth
                placeholder="Enter phone number"
                error={!!errors.phone}
              />
            )}
          />
          {errors.phone && (
            <Typography color="error" fontSize={12} mt={0.5}>
              {errors.phone.message}
            </Typography>
          )}
        </Box>

        {/* Highest Academic Qualification */}
        <Box sx={fieldItemStyle}>
          <Typography variant="body2" fontWeight={500} mb={0.5}>
            Academic Qualification
          </Typography>
          <Controller
            name="qualification"
            control={control}
            rules={{ required: 'Qualification is required' }}
            render={({ field }) => (
              <BasicInput
                {...field}
                fullWidth
                placeholder="Enter highest qualification"
                error={!!errors.qualification}
              />
            )}
          />
          {errors.qualification && (
            <Typography color="error" fontSize={12} mt={0.5}>
              {errors.qualification.message}
            </Typography>
          )}
        </Box>

        {/* Subjects */}
        <Box sx={fieldItemStyle}>
          <Typography variant="body2" fontWeight={500} mb={0.5}>
            Subjects
          </Typography>
          <Controller
            name="subjects"
            control={control}
            rules={{ required: 'Subjects are required' }}
            render={({ field }) => (
              <BasicInput
                {...field}
                fullWidth
                placeholder="Enter subjects (e.g., Math, English)"
                error={!!errors.subjects}
              />
            )}
          />
          {errors.subjects && (
            <Typography color="error" fontSize={12} mt={0.5}>
              {errors.subjects.message}
            </Typography>
          )}
        </Box>

        <Box sx={fieldItemStyle}>
          <Typography variant="body2" fontWeight={500} mb={0.5}>
            Department
          </Typography>
          <Controller
            name="department"
            control={control}
            rules={{ required: 'Department is required' }}
            render={({ field }) => (
              <BasicInput
                {...field}
                fullWidth
                placeholder="Enter department (e.g., Science)"
                error={!!errors.department}
              />
            )}
          />
          {errors.department && (
            <Typography color="error" fontSize={12} mt={0.5}>
              {errors.department.message}
            </Typography>
          )}
        </Box>

        {/* Salary */}
        <Box sx={fieldItemStyle}>
          <Typography variant="body2" fontWeight={500} mb={0.5}>
            Salary (BDT)
          </Typography>
          <Controller
            name="salary"
            control={control}
            rules={{ required: 'Salary is required' }}
            render={({ field }) => (
              <BasicInput
                {...field}
                type="number"
                fullWidth
                placeholder="Enter salary amount"
                error={!!errors.salary}
              />
            )}
          />
          {errors.salary && (
            <Typography color="error" fontSize={12} mt={0.5}>
              {errors.salary.message}
            </Typography>
          )}
        </Box>

      </Box>
    </CustomModal>
  );
};

export default AddOrEditTeacherModal;
