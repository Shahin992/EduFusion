import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { MenuBook, People } from "@mui/icons-material";
import CustomModal from "../../common/CustomModal";
import BasicSelect from "../../common/BasicSelect";
import BasicInput from "../../common/BasicInput";
import { mockStudents } from "./StudentWiseMarksEntry";

const AddOrEditStudentMarksModal = ({
  open,
  onClose,
  exam,
  editData=''
}) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentMarks, setCurrentMarks] = useState({});

      const getAvailableStudents = () => {
          return mockStudents.filter(
              (s) => s.class === exam.class );
      };

  const handleStudentSelect = (studentId) => {
    setSelectedStudent(studentId);
    const student = mockStudents.find((s) => s.id === studentId);
    setCurrentMarks(student?.marks || {});
  };

  const handleMarkChange = (subjectName, value) => {
    setCurrentMarks((prev) => ({ ...prev, [subjectName]: value }));
  };

  const handleSaveStudent = () => {
    if (selectedStudent && Object.keys(currentMarks).length > 0) {
      setSelectedStudent(null);
      setCurrentMarks({});
      onClose();
    }
  };

  return (
    <CustomModal
      open={open}
      handleClose={onClose}
      icon={<MenuBook sx={{ color: "#3b82f6", fontSize: 48 }}/>}
      title={editData ? "Edit Student Marks" : "Enter Student Marks"}
      description="Select a student and enter marks for all subjects"
    >
      <Box>

        {/* Student Selection */}
        <Typography
          variant="body2"
          sx={{
            mb: 1,
            fontWeight: 600,
            color: "#1e293b",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <People sx={{ color: "#3b82f6", fontSize: 20 }} /> Select Student
        </Typography>

        <BasicSelect
          fullWidth
          options={getAvailableStudents()}
          value={selectedStudent}
          onChange={(e) => handleStudentSelect(e.target.value)}
          defaultText="Select a student"
          mapping={{ label: "name", value: "id" }}
        />

        {/* Marks Inputs */}
    
          <>
            <Box
              sx={{
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)", // 2 fields per row
    gap: 2,
    my: 3,
    maxHeight: 300, // set the max height for scroll
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: 6,
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: 10,
      backgroundColor: "#346fef",
    },
    "&::-webkit-scrollbar-track": {
      borderRadius: 10,
      backgroundColor: "#e0e7ff",
    },
  }}
            >
              {exam.subjects.map((sub) => (
                <Box key={sub.name}>
                  <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
                    {sub.name}{" "}
                    <Typography
                      component="span"
                      sx={{ color: "#3b82f6", fontSize: "0.8rem" }}
                    >
                      (Max: {sub.marks})
                    </Typography>
                  </Typography>
                  <BasicInput
                    type="number"
                    name={sub.name}
                    value={currentMarks[sub.name] || ""}
                    onChange={(e) => handleMarkChange(sub.name, e.target.value)}
                    placeholder={`Enter ${sub.name} marks`}
                  />
                </Box>
              ))}
            </Box>
          </>
      </Box>
    </CustomModal>
  );
};

export default AddOrEditStudentMarksModal;
