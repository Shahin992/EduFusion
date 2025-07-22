import React, { useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import CustomModal from '../common/CustomModal';
import BasicInput from '../common/BasicInput';
import BasicSelect from '../common/BasicSelect';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { classOptions, classValue } from '../../constant/CoreConstant';
import Utils from '../../Utils/Utils';


const groupOptions = [
  { title: 'Science', value: 'SCIENCE' },
  { title: 'Commerce', value: 'COMMERCE' },
  { title: 'Arts', value: 'ARTS' },
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

const AddOrEditStudentModal = ({ open, onClose, editData }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      number: '',
      email: '',
      fatherName: '',
      fatherNumber: '',
      motherName: '',
      motherNumber: '',
      instituteName: '',
      address: '',
      class: '',
      group: '',
      monthlyFees: '',
    },
  });
  const selectedClass = useWatch({ control, name: 'class' });

  useEffect(() => {
    if (editData) {
      console.log(editData)
      // Map your editData fields to form fields
      reset({
        name: editData.name || '',
        number: editData.number || '',
        email: editData.email || '',  // if exists in editData, else ''
        fatherName: editData.father || '',
        fatherNumber: editData.fatherNumber || '', // if exists
        motherName: editData.mother || '',
        motherNumber: editData.motherNumber || '', // if exists
        instituteName: editData.institute || '',
        address: editData.address || '',
        class: editData.class ? String(editData.class) : '', // convert to string if needed
        group: editData.group || '', // set if exists
        monthlyFees: editData.monthlyFees || '',
      });
    } else {
      // If no editData, reset to empty defaults when modal opens/closes
      reset({
        name: '',
        number: '',
        email: '',
        fatherName: '',
        fatherNumber: '',
        motherName: '',
        motherNumber: '',
        instituteName: '',
        address: '',
        class: '',
        group: '',
        monthlyFees: '',
      });
    }
  }, [editData]);

  const onSubmit = (data) => {
    console.log('Submitted Data:', data);
  };

  return (
    <CustomModal
      open={open}
      handleClose={onClose}
      handleSubmit={handleSubmit(onSubmit)}
      title={editData ? 'Edit Student' : 'Add Student'}
      icon={<PeopleIcon sx={{ fontSize: 40, color: '#6c5ce7' }} />}
    >
      <Box sx={containerStyle}>
        {/* Student Name - full width */}
        <Box  sx={{width:'100%', marginBottom: "16px",}}>
          <Typography variant="body2" fontWeight={500} mb={0.5}>
            Student Name
          </Typography>
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Student Name is required' }}
            render={({ field }) => (
              <BasicInput
                {...field}
                fullWidth
                placeholder="Enter student name"
                error={!!errors.name}
              />
            )}
          />
          {errors.name && (
            <Typography color="error" fontSize={12} mt={0.5}>
              {errors.name.message}
            </Typography>
          )}
        </Box>

        {/* Student Number */}
        <Box sx={fieldItemStyle}>
          <Typography variant="body2" fontWeight={500} mb={0.5}>
            Student Number
          </Typography>
          <Controller
            name="number"
            control={control}
            rules={{
                required: 'Student Number is required',
                validate: (value) => {
                if (!value.startsWith('01')) {
                    return 'Number must start with 01';
                }
                if (value.length !== 11) {
                    return 'Number must be exactly 11 digits long';
                }
                return true;
                },
            }}
            render={({ field }) => (
              <BasicInput
                {...field}
                type="number"
                fullWidth
                placeholder="Enter student number"
                error={!!errors.number}
              />
            )}
          />
          {errors.number && (
            <Typography color="error" fontSize={12} mt={0.5}>
              {errors.number.message}
            </Typography>
          )}
        </Box>

         <Box sx={fieldItemStyle}>
          <Typography variant="body2" fontWeight={500} mb={0.5}>
            Student Email
          </Typography>
          <Controller
            name="email"
            control={control}
             rules={{
              validate: (value) => {
                if (!value) return true; 
                return Utils.validateEmail(value);
              }
            }}
            render={({ field }) => (
              <BasicInput
                {...field}
                type="email"
                fullWidth
                placeholder="Enter student email"
                error={!!errors.email}
              />
            )}
          />
          {errors.email && (
            <Typography color="error" fontSize={12} mt={0.5}>
              {errors.email.message}
            </Typography>
          )}
        </Box>

        {/* Father's Name */}
        <Box sx={fieldItemStyle}>
          <Typography variant="body2" fontWeight={500} mb={0.5}>
            Father's Name
          </Typography>
          <Controller
            name="fatherName"
            control={control}
            rules={{ required: "Father's Name is required" }}
            render={({ field }) => (
              <BasicInput
                {...field}
                fullWidth
                placeholder="Enter father's name"
                error={!!errors.fatherName}
              />
            )}
          />
          {errors.fatherName && (
            <Typography color="error" fontSize={12} mt={0.5}>
              {errors.fatherName.message}
            </Typography>
          )}
        </Box>

        {/* Father's Number */}
        <Box sx={fieldItemStyle}>
          <Typography variant="body2" fontWeight={500} mb={0.5}>
            Father's Number
          </Typography>
          <Controller
            name="fatherNumber"
            control={control}
            rules={{
                required: "Father's Number is required",
                validate: (value) => {
                if (!value.startsWith('01')) {
                    return 'Number must start with 01';
                }
                if (value.length !== 11) {
                    return 'Number must be exactly 11 digits long';
                }
                return true;
                },
            }}
            render={({ field }) => (
              <BasicInput
                {...field}
                type='number'
                fullWidth
                placeholder="Enter father's number"
                error={!!errors.fatherNumber}
              />
            )}
          />
          {errors.fatherNumber && (
            <Typography color="error" fontSize={12} mt={0.5}>
              {errors.fatherNumber.message}
            </Typography>
          )}
        </Box>

        {/* Mother's Name */}
        <Box sx={fieldItemStyle}>
          <Typography variant="body2" fontWeight={500} mb={0.5}>
            Mother's Name
          </Typography>
          <Controller
            name="motherName"
            control={control}
            rules={{ required: "Mother's Name is required" }}
            render={({ field }) => (
              <BasicInput
                {...field}
                fullWidth
                placeholder="Enter mother's name"
                error={!!errors.motherName}
              />
            )}
          />
          {errors.motherName && (
            <Typography color="error" fontSize={12} mt={0.5}>
              {errors.motherName.message}
            </Typography>
          )}
        </Box>

        {/* Mother's Number */}
        <Box sx={fieldItemStyle}>
          <Typography variant="body2" fontWeight={500} mb={0.5}>
            Mother's Number
          </Typography>
          <Controller
            name="motherNumber"
            control={control}
            // rules={{
            //     required: "Mother's Number is required",
            //     validate: (value) => {
            //     if (!value.startsWith('01')) {
            //         return 'Number must start with 01';
            //     }
            //     if (value.length !== 11) {
            //         return 'Number must be exactly 11 digits long';
            //     }
            //     return true;
            //     },
            // }}
            render={({ field }) => (
              <BasicInput
                {...field}
                type='number'
                fullWidth
                placeholder="Enter mother's number"
                error={!!errors.motherNumber}
              />
            )}
          />
          {errors.motherNumber && (
            <Typography color="error" fontSize={12} mt={0.5}>
              {errors.motherNumber.message}
            </Typography>
          )}
        </Box>

        {/* Institute Name */}
        <Box sx={fieldItemStyle}>
          <Typography variant="body2" fontWeight={500} mb={0.5}>
            Institute Name
          </Typography>
          <Controller
            name="instituteName"
            control={control}
            rules={{ required: 'Institute Name is required' }}
            render={({ field }) => (
              <BasicInput
                {...field}
                fullWidth
                placeholder="Enter institute name"
                error={!!errors.instituteName}
              />
            )}
          />
          {errors.instituteName && (
            <Typography color="error" fontSize={12} mt={0.5}>
              {errors.instituteName.message}
            </Typography>
          )}
        </Box>

        {/* Address */}
        <Box sx={fieldItemStyle}>
          <Typography variant="body2" fontWeight={500} mb={0.5}>
            Address
          </Typography>
          <Controller
            name="address"
            control={control}
            rules={{ required: 'Address is required' }}
            render={({ field }) => (
              <BasicInput
                {...field}
                fullWidth
                placeholder="Enter address"
                error={!!errors.address}
              />
            )}
          />
          {errors.address && (
            <Typography color="error" fontSize={12} mt={0.5}>
              {errors.address.message}
            </Typography>
          )}
        </Box>

        {/* Class */}
        <Box sx={fieldItemStyle}>
          <Typography variant="body2" fontWeight={500} mb={0.5}>
            Class
          </Typography>
          <Controller
            name="class"
            control={control}
            rules={{ required: 'Class is required' }}
            render={({ field }) => (
              <BasicSelect
                {...field}
                fullWidth
                options={classOptions}
                defaultText="Select Class"
                mapping={{ label: 'title', value: 'value' }}
                error={!!errors.class}
              />
            )}
          />
          {errors.class && (
            <Typography color="error" fontSize={12} mt={0.5}>
              {errors.class.message}
            </Typography>
          )}
        </Box>

        {/* Group */}
        { (
          selectedClass === classValue.classNine || 
          selectedClass === classValue.classTen || 
          selectedClass === classValue.classEleven || 
          selectedClass === classValue.classTwelve
        ) &&
        (<Box sx={fieldItemStyle}>
          <Typography variant="body2" fontWeight={500} mb={0.5}>
            Group
          </Typography>
          <Controller
            name="group"
            control={control}
            // rules={{ required: 'Group is required' }}
            render={({ field }) => (
              <BasicSelect
                {...field}
                fullWidth
                options={groupOptions}
                defaultText="Select Group"
                mapping={{ label: 'title', value: 'value' }}
                error={!!errors.group}
              />
            )}
          />
          {errors.group && (
            <Typography color="error" fontSize={12} mt={0.5}>
              {errors.group.message}
            </Typography>
          )}
        </Box>)}

           <Box sx={fieldItemStyle}>
          <Typography variant="body2" fontWeight={500} mb={0.5}>
            Monthly Fees
          </Typography>
          <Controller
            name="monthlyFees"
            control={control}
            // rules={{
            //     validate: (value) => {
            //     if (!value.startsWith('01')) {
            //         return 'Number must start with 01';
            //     }
            //     if (value.length !== 11) {
            //         return 'Number must be exactly 11 digits long';
            //     }
            //     return true;
            //     },
            // }}
            render={({ field }) => (
              <BasicInput
                {...field}
                type="number"
                fullWidth
                placeholder="Enter student monthly fees"
                error={!!errors.number}
              />
            )}
          />
          {errors.monthlyFees && (
            <Typography color="error" fontSize={12} mt={0.5}>
              {errors.monthlyFees.message}
            </Typography>
          )}
        </Box>

      </Box>
    </CustomModal>
  );
};

export default AddOrEditStudentModal;
