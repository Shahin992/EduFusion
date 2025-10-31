import React, { useState, useRef } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { People } from "@mui/icons-material";
import { mockStudents } from "../StudentWiseMarksEntry";
import BasicSelect from "../../../common/BasicSelect";
import { CustomButton } from "../../../common/CustomButton";
import BasicInput from "../../../common/BasicInput";
import GlobalEmptyPage from "../../../common/GlobalEmptyPage";

const SubjectWiseMarkEntry = ({ exam }) => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const inputRefs = useRef([]);

  // Filter students by exam class
  const students = mockStudents.filter((s) => s.class === exam.class);

   const handleSaveMarks = () => {
    console.log("Save marks logic for subject:", findSubject()?.name);
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const nextIndex = index + 1;
      if (nextIndex < inputRefs.current.length) {
        inputRefs.current[nextIndex].focus();
      }
    }
  };

  return (
    <Box width="100%">
      {/* Header */}
      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          bgcolor: "#f5f6fa",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <People sx={{ fontSize: 40, color: "#6c5ce7" }} />
          <Box>
            <Typography variant="h6" fontWeight="bold">
              Subject Wise Marks Entry
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Enter marks for all students by subject
            </Typography>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
          <Box width={250}>
            <BasicSelect
              fullWidth
              options={exam?.subjects || []}
              value={selectedSubject}
              defaultText="Select a Subject"
              mapping={{ label: "name", value: "name" }}
              onChange={(e) => setSelectedSubject(e.target.value)}
            />
          </Box>

          {/* <CustomButton
            variant="contained"
            onClick={handleSaveMarks}
            disabled={!selectedSubject}
          >
            Save Marks
          </CustomButton> */}
        </Box>
      </Paper>

      {/* Body */}
<Paper
  sx={{
    p: 3,
    borderRadius: 3,
    bgcolor: "#f9f9fb",
    minHeight: 300,
    display: "flex",
    flexDirection: "column",
    maxHeight: "calc(100vh - 420px)",
  }}
>
  {selectedSubject ? (
    <>
      <Typography fontWeight={600} fontSize="20px" pb={2}>
        Enter Marks for {selectedSubject}
      </Typography>

      {/* Scrollable student list */}
      <Box
        sx={{
          flex: 1, // take remaining height
          overflowY: "auto",
          "&::-webkit-scrollbar": { width: 6 },
          "&::-webkit-scrollbar-thumb": { borderRadius: 10, backgroundColor: "#346fef" },
          "&::-webkit-scrollbar-track": { borderRadius: 10, backgroundColor: "#e0e0e0" },
        }}
      >
        {students.map((s, index) => (
          <Paper
            key={s.studentId}
            sx={{
              mb: 2,
              p: 2,
              borderRadius: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              bgcolor: "#e3f2fd",
              borderLeft: "6px solid #3b82f6",
              "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.15)" },
              transition: "all 0.3s ease",
            }}
          >
            <Typography fontWeight={600} color="#1e293b">
              {s.id} - {s.name}
            </Typography>
            <Box width={200}>
              <Typography
                fontWeight={500}
                mb={0.5}
                color="#3b82f6"
                textAlign="right"
              >
                Max ({selectedSubject})
              </Typography>
              <BasicInput
                fullWidth
                type="number"
                placeholder={`Enter marks for ${s.name}`}
                inputRef={(el) => (inputRefs.current[index] = el)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            </Box>
          </Paper>
        ))}
      </Box>

      {/* Save button fixed at bottom */}
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <CustomButton
          variant="contained"
          onClick={handleSaveMarks}
          disabled={!selectedSubject}
        >
          Save Marks
        </CustomButton>
      </Box>
    </>
  ) : (
    <GlobalEmptyPage
      message="Please select a subject to enter marks."
      showAddButton={false}
      onAddClick={() => {}}
    />
  )}
</Paper>


    </Box>
  );
};

export default SubjectWiseMarkEntry;
