import React, { useEffect, useMemo, useState } from 'react';
import { Typography, Box } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import CustomModal from '../common/CustomModal';
import BasicInput from '../common/BasicInput';
import BasicSelect from '../common/BasicSelect';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { classOptions } from '../../constant/CoreConstant';

// ✅ Dummy students grouped by class
const dummyStudentsByClass = {
  6: [
    { title: 'Arif Hossain', value: 'arif' },
    { title: 'Mim Akter', value: 'mim' },
  ],
  7: [
    { title: 'Sabbir Khan', value: 'sabbir' },
    { title: 'Nadia Rahman', value: 'nadia' },
  ],
  8: [
    { title: 'Tuhin Alam', value: 'tuhin' },
    { title: 'Faria Islam', value: 'faria' },
  ],
  9: [
    { title: 'Shamim Hossain', value: 'shamim' },
    { title: 'Sadia Chowdhury', value: 'sadia' },
  ],
  10: [
    { title: 'Rahim Uddin', value: 'rahim' },
    { title: 'Rina Akter', value: 'rina' },
  ],
};

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

const AddOrEditStudentFeesModal = ({ open, onClose, editData }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      class: '',
      student: '',
      feesType: '',
      feesAmount: '',
      feesPaidDate: '',
    },
  });

  const selectedClass = useWatch({ control, name: 'class' });

  const [students, setStudents] = useState([]);
  const [studentLoading, setStudentLoading] = useState(false);
  

  // ✅ Update students list when class changes
  useEffect(() => {
  if (!selectedClass) {
    setStudents([]);
    return;
  }

  setStudentLoading(true);

  const timer = setTimeout(() => {
    if (dummyStudentsByClass[selectedClass]) {
      setStudents(dummyStudentsByClass[selectedClass]);
    } else {
      setStudents([]);
    }
    setStudentLoading(false);
  }, 4000); // ⏳ 4-second delay

  // cleanup timeout on unmount or when class changes fast
  return () => clearTimeout(timer);
}, [selectedClass]);

  useEffect(() => {
    if (editData) {
      reset({
        class: editData.class ? String(editData.class) : '',
        student: editData.student || '',
        feesType: editData.feesType || '',
        feesAmount: editData.feesAmount || '',
        feesPaidDate: editData.feesPaidDate || '',
      });
    } else {
      reset({
        class: '',
        student: '',
        feesType: '',
        feesAmount: '',
        feesPaidDate: '',
      });
    }
  }, [editData, reset]);

  const onSubmit = (data) => {
    console.log('Submitted Fees Data:', data);
  };

  return (
    <CustomModal
      open={open}
      handleClose={onClose}
      handleSubmit={handleSubmit(onSubmit)}
      title={editData ? 'Edit Student Fees' : 'Add Student Fees'}
      icon={<PeopleIcon sx={{ fontSize: 40, color: '#6c5ce7' }} />}
    >
      <Box sx={containerStyle}>

        {/* Class Select */}
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

        {/* Student Select (Dynamic) */}
        <Box sx={fieldItemStyle}>
          <Typography variant="body2" fontWeight={500} mb={0.5}>
            Select Student
          </Typography>
          <Controller
            name="student"
            control={control}
            rules={{ required: 'Student is required' }}
            render={({ field }) => (
              <BasicSelect
                {...field}
                fullWidth
                isLoading={studentLoading}
                options={students}
                defaultText={
                  selectedClass ? 'Select Student' : 'Select class first'
                }
                mapping={{ label: 'title', value: 'value' }}
                error={!!errors.student}
                disabled={!selectedClass}
              />
            )}
          />
          {errors.student && (
            <Typography color="error" fontSize={12} mt={0.5}>
              {errors.student.message}
            </Typography>
          )}
        </Box>

        {/* Fees Type */}
        <Box sx={fieldItemStyle}>
          <Typography variant="body2" fontWeight={500} mb={0.5}>
            Fees Type
          </Typography>
          <Controller
            name="feesType"
            control={control}
            render={({ field }) => (
              <BasicInput
                {...field}
                type="text"
                fullWidth
                placeholder="Ex: Monthly Fees, Admission Fees etc..."
                error={!!errors.feesType}
              />
            )}
          />
          {errors.feesType && (
            <Typography color="error" fontSize={12} mt={0.5}>
              {errors.feesType.message}
            </Typography>
          )}
        </Box>

        {/* Fees Amount */}
        <Box sx={fieldItemStyle}>
          <Typography variant="body2" fontWeight={500} mb={0.5}>
            Fees Amount
          </Typography>
          <Controller
            name="feesAmount"
            control={control}
            render={({ field }) => (
              <BasicInput
                {...field}
                type="number"
                fullWidth
                placeholder="Enter Fees Amount"
                error={!!errors.feesAmount}
              />
            )}
          />
          {errors.feesAmount && (
            <Typography color="error" fontSize={12} mt={0.5}>
              {errors.feesAmount.message}
            </Typography>
          )}
        </Box>

        {/* Date */}
        <Box sx={fieldItemStyle}>
          <Typography variant="body2" fontWeight={500} mb={0.5}>
            Date
          </Typography>
          <Controller
            name="feesPaidDate"
            control={control}
            render={({ field }) => (
              <BasicInput
                {...field}
                type="date"
                fullWidth
                placeholder="Select Fees Date"
                error={!!errors.feesPaidDate}
              />
            )}
          />
          {errors.feesPaidDate && (
            <Typography color="error" fontSize={12} mt={0.5}>
              {errors.feesPaidDate.message}
            </Typography>
          )}
        </Box>
      </Box>
    </CustomModal>
  );
};

export default AddOrEditStudentFeesModal;
