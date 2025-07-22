import React, { useState } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  Chip,
  Typography,
  IconButton,
  Stack,
  Divider,
  Paper,
  FormControl,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close"
import CustomModal from "../common/CustomModal";
import BasicInput from "../common/BasicInput";
import { classOptions } from "../../constant/CoreConstant";
import BasicSelect from "../common/BasicSelect";

const AddOrEditExamModal = ({ open, onClose, editData, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [currentSubject, setCurrentSubject] = useState({ name: "", maxMarks: "" });

  const classes = [
    "Play",
    "Nursery",
    "KG",
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
    "Class 6",
    "Class 7",
    "Class 8",
    "Class 9",
    "Class 10",
    "Class 11",
    "Class 12",
  ];

  const handleAddSubject = () => {
    if (currentSubject.name && currentSubject.maxMarks) {
      const newSubject = {
        id: Date.now().toString(),
        name: currentSubject.name,
        maxMarks: parseInt(currentSubject.maxMarks),
      };
      setSubjects([...subjects, newSubject]);
      setCurrentSubject({ name: "", maxMarks: "" });
    }
  };

  const handleRemoveSubject = (subjectId) => {
    setSubjects(subjects.filter((subject) => subject.id !== subjectId));
  };

  const handleSubmit = () => {
    if (title && selectedClass && subjects.length > 0) {
      onSubmit({
        title,
        class: selectedClass,
        subjects,
      });
      setTitle("");
      setSelectedClass("");
      setSubjects([]);
      setCurrentSubject({ name: "", maxMarks: "" });
    }
  };

  const handleClose = () => {
    setTitle("");
    setSelectedClass("");
    setSubjects([]);
    setCurrentSubject({ name: "", maxMarks: "" });
    onClose();
  };

  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      title={editData ? "Edit Exam" : "Create New Exam"}
      
    >
       <Box>
        {/* Exam Title */}
        <Typography variant="body2" fontWeight={500} color="text.secondary" mb={1} sx={{ fontSize: "14px" }}>
          Exam Title
        </Typography>
        <BasicInput
          fullWidth
          placeholder="Weekly Exam - 01"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              backgroundColor: "#f8f9fa",
              "& fieldset": {
                borderColor: "#e9ecef",
              },
              "&:hover fieldset": {
                borderColor: "#dee2e6",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#6c5ce7",
              },
            },
          }}
        />

        {/* Class Select */}
        <Typography variant="body2" fontWeight={500} color="text.secondary" mb={1} sx={{ fontSize: "14px" }}>
          Class
        </Typography>
         <BasicSelect
            fullWidth
            options={classOptions}
            value={selectedClass}
            defaultText="Filter By Class"
            mapping={{ label: 'title', value: 'value' }}
            sx={{ minWidth: 160,  }}
            onChange={(e) => setSelectedClass(e.target.value)}
          />

        {/* Subjects Input */}
        <Typography variant="body2" fontWeight={500} color="text.secondary" mb={1} mt={3} sx={{ fontSize: "14px" }}>
          Subjects
        </Typography>
        <Stack direction="row" spacing={1} mb={3}>
          <BasicInput
            style={{width:'65%'}}
            placeholder="Subject name"
            value={currentSubject.name}
            onChange={(e) => setCurrentSubject({ ...currentSubject, name: e.target.value })}
          />
          <BasicInput
            type="number"
            placeholder="Max marks"
            value={currentSubject.maxMarks}
            onChange={(e) => setCurrentSubject({ ...currentSubject, maxMarks: e.target.value })}
           
          />
          <IconButton
            onClick={handleAddSubject}
            disabled={!currentSubject.name || !currentSubject.maxMarks}
            sx={{
              bgcolor: "#6c5ce7",
              color: "white",
              borderRadius: "12px",
              width: 50,
              height: 40,
              "&:hover": {
                bgcolor: "#5a4fcf",
              },
              "&:disabled": {
                bgcolor: "#e9ecef",
                color: "#adb5bd",
              },
            }}
          >
            <AddIcon />
          </IconButton>
        </Stack>

        {/* Added Subjects List */}
        {subjects.length > 0 && (
          <>
            <Typography variant="body2" fontWeight={500} color="text.secondary" mb={2} sx={{ fontSize: "14px" }}>
              Added Subjects ({subjects.length})
            </Typography>
            <Stack spacing={2} sx={{ maxHeight: 200, overflowY: "auto", mb: 3 }}>
              {subjects.map((subject) => (
                <Paper
                  key={subject.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                    borderRadius: "12px",
                    backgroundColor: "#f8f9fa",
                    border: "1px solid #e9ecef",
                    boxShadow: "none",
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: "#6c5ce7",
                      }}
                    />
                    <Typography fontWeight={500} color="text.primary">
                      {subject.name}
                    </Typography>
                    <Chip
                      label={`${subject.maxMarks} marks`}
                      size="small"
                      sx={{
                        backgroundColor: "#e3f2fd",
                        color: "#1976d2",
                        fontWeight: 500,
                        borderRadius: "16px",
                        "& .MuiChip-label": {
                          px: 1.5,
                        },
                      }}
                    />
                  </Stack>
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveSubject(subject.id)}
                    sx={{
                      color: "#f44336",
                      "&:hover": {
                        backgroundColor: "#ffebee",
                      },
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Paper>
              ))}
            </Stack>
          </>
        )}

        {/* Submit Button */}
        {/* <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          disabled={!title || !selectedClass || subjects.length === 0}
          sx={{
            borderRadius: "12px",
            backgroundColor: "#6c5ce7",
            py: 1.5,
            fontWeight: 600,
            textTransform: "none",
            fontSize: "16px",
            "&:hover": {
              backgroundColor: "#5a4fcf",
            },
            "&:disabled": {
              backgroundColor: "#e9ecef",
              color: "#adb5bd",
            },
          }}
        >
          {editData ? "Update Exam" : "Create Exam"}
        </Button> */}
      </Box>
    </CustomModal>
  );
};

export default AddOrEditExamModal;
