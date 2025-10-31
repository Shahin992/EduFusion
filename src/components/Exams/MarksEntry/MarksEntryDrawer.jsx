import { useState, useEffect } from "react";
import {
  Drawer,
  Box,
  Typography,
  Button,
  Paper,
  Chip,
  IconButton,
  Divider,
  InputAdornment,
} from "@mui/material";
import {
  CheckCircle,
  Edit,
  Delete,
  People,
  MenuBook,
  Search as SearchIcon,
} from "@mui/icons-material";

import BasicInput from "../../common/BasicInput";
import BasicSelect from "../../common/BasicSelect";

const mockStudents = [
  // ✅ Class 8
  { id: "11", name: "Farhana Sultana", class: "Class 8" },
  { id: "12", name: "Shahriar Kabir", class: "Class 8" },
  { id: "13", name: "Rumana Akter", class: "Class 8" },
  { id: "14", name: "Towhidul Islam", class: "Class 8" },
  { id: "15", name: "Maliha Tasnim", class: "Class 8" },
  { id: "16", name: "Tariqul Hasan", class: "Class 8" },
  { id: "17", name: "Nafisa Ahmed", class: "Class 8" },
  { id: "18", name: "Raihan Chowdhury", class: "Class 8" },
  { id: "19", name: "Salma Khatun", class: "Class 8" },
  { id: "20", name: "Aminul Hoque", class: "Class 8" },

  // ✅ Class 9 (Existing + Added Few More)
  { id: "1", name: "Arif Hossain", class: "Class 9" },
  { id: "2", name: "Nusrat Jahan", class: "Class 9" },
  { id: "3", name: "Rahim Uddin", class: "Class 9" },
  { id: "4", name: "Sumaiya Akter", class: "Class 9" },
  { id: "5", name: "Hasan Mahmud", class: "Class 9" },
  { id: "6", name: "Mithila Haque", class: "Class 9" },
  { id: "7", name: "Imran Hossain", class: "Class 9" },
  { id: "8", name: "Tanisha Rahman", class: "Class 9" },
  { id: "9", name: "Jamal Hossain", class: "Class 9" },
  { id: "21", name: "Sharmin Nahar", class: "Class 9" },
  { id: "22", name: "Khaled Mahbub", class: "Class 9" },
  { id: "23", name: "Sadia Islam", class: "Class 9" },
  { id: "24", name: "Rakibul Alam", class: "Class 9" },
  { id: "25", name: "Mehnaz Chowdhury", class: "Class 9" },

  // ✅ Class 10 (Existing + Added Few More)
  { id: "10", name: "Sadia Jahan", class: "Class 10" },
  { id: "26", name: "Fahim Ahmed", class: "Class 10" },
  { id: "27", name: "Tania Yasmin", class: "Class 10" },
  { id: "28", name: "Shuvo Sarker", class: "Class 10" },
  { id: "29", name: "Priyanka Das", class: "Class 10" },
  { id: "30", name: "Mahfuzur Rahman", class: "Class 10" },
  { id: "31", name: "Nabila Sultana", class: "Class 10" },
  { id: "32", name: "Rashed Karim", class: "Class 10" },
  { id: "33", name: "Tasnia Rahman", class: "Class 10" },
  { id: "34", name: "Naimul Hasan", class: "Class 10" },
  { id: "35", name: "Faria Ahmed", class: "Class 10" }
];


const MarksEntryDrawer = ({ open, onClose, exam, existingMarks, onSave }) => {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [currentMarks, setCurrentMarks] = useState({});
  const [savedMarks, setSavedMarks] = useState(existingMarks || []);
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    setSavedMarks(existingMarks || []);
  }, [existingMarks]);

  const getAvailableStudents = () => {
    const savedIds = savedMarks.map((m) => m.studentId);
    return mockStudents.filter(
      (s) => s.class === exam.class && !savedIds.includes(s.id)
    );
  };

  const handleStudentSelect = (id) => {
    setSelectedStudent(id);
    const initial = {};
    exam.subjects.forEach((sub) => (initial[sub.name] = ""));
    setCurrentMarks(initial);
  };

  const handleMarkChange = (subjectName, value) =>
    setCurrentMarks((prev) => ({ ...prev, [subjectName]: value }));

  const handleSaveStudent = () => {
    const student = mockStudents.find((s) => s.id === selectedStudent);
    if (!student) return;

    const marks = {};
    exam.subjects.forEach((sub) => {
      const val = currentMarks[sub.name];
      if (val !== "" && !isNaN(Number(val))) marks[sub.name] = Number(val);
    });

    setSavedMarks((prev) => [
      ...prev,
      { studentId: selectedStudent, studentName: student.name, marks },
    ]);
    setSelectedStudent("");
    setCurrentMarks({});
  };

  const handleEditStudent = (id) => {
    const studentMark = savedMarks.find((m) => m.studentId === id);
    if (studentMark) {
      setEditingStudent(id);
      const marks = {};
      exam.subjects.forEach(
        (sub) => (marks[sub.name] = studentMark.marks[sub.name]?.toString() || "")
      );
      setCurrentMarks(marks);
    }
  };

  const handleUpdateStudent = () => {
    const marks = {};
    exam.subjects.forEach((sub) => {
      const val = currentMarks[sub.name];
      if (val !== "" && !isNaN(Number(val))) marks[sub.name] = Number(val);
    });

    setSavedMarks((prev) =>
      prev.map((m) =>
        m.studentId === editingStudent ? { ...m, marks } : m
      )
    );
    setEditingStudent(null);
    setCurrentMarks({});
  };

  const handleRemoveStudent = (id) =>
    setSavedMarks((prev) => prev.filter((m) => m.studentId !== id));

  const handleFinalSubmit = () => onSave(savedMarks);

  const isFormValid = () =>
    (selectedStudent || editingStudent) &&
    exam.subjects.every((sub) => {
      const v = currentMarks[sub.name];
      return (
        v !== "" &&
        !isNaN(Number(v)) &&
        Number(v) >= 0 &&
        Number(v) <= sub.marks
      );
    });

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: 950,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 2,
            borderBottom: "1px solid #e0e0e0",
            display: "flex",
            gap: '12px',
            alignItems: "center",
          }}
        >
          <MenuBook sx={{ color: "primary.main", height:'56px', width:'56px'  }} />
          <Box>
            <Typography variant="h6" fontWeight="bold">
              Enter Marks - {exam.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
            >
              <People sx={{ fontSize: 16 }} />{exam.class}
            </Typography>
          </Box>
        </Box>

        {/* Body */}
        <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
          {/* ✅ Add Student Marks */}
          {!editingStudent && (
            <Paper
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 3,
                border: "1px solid #e0e7ff",
                bgcolor: "#f9faff",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  color: "#1e293b",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <People sx={{ color: "#3b82f6", fontSize: 20 }} />
                Select Student
              </Typography>

              <BasicSelect
                fullWidth
                options={getAvailableStudents().map((s) => ({
                  label: s.name,
                  value: s.id,
                }))}
                value={selectedStudent}
                onChange={(e) => handleStudentSelect(e.target.value)}
                defaultText="Select a student"
                mapping={{ label: "label", value: "value" }}
              />

              {selectedStudent && (
                <>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                      gap: 2,
                      my: 3,
                    }}
                  >
                    {exam.subjects.map((sub) => (
                      <div key={sub.name}>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 500, mb: 0.5 }}
                        >
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
                          onChange={(e) =>
                            handleMarkChange(sub.name, e.target.value)
                          }
                          placeholder={`Enter ${sub.name} marks`}
                        />
                      </div>
                    ))}
                  </Box>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleSaveStudent}
                    disabled={!isFormValid()}
                  >
                    Save Student Marks
                  </Button>
                </>
              )}
            </Paper>
          )}

          {/* ✅ Edit Student Marks (NOW UPDATED) */}
          {editingStudent && (
            <Paper
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 3,
                border: "1px solid #ffecb3",
                bgcolor: "#fff8e1",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ mb: 2, fontWeight: 500 }}
              >
                Edit Marks -{" "}
                {savedMarks.find((m) => m.studentId === editingStudent)
                  ?.studentName}
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: 2,
                  mb: 2,
                }}
              >
                {exam.subjects.map((sub) => (
                  <div key={sub.name}>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 500, mb: 0.5 }}
                    >
                      {sub.name}{" "}
                      <Typography
                        component="span"
                        sx={{ color: "#f59e0b", fontSize: "0.8rem" }}
                      >
                        (Max: {sub.marks})
                      </Typography>
                    </Typography>
                    <BasicInput
                      type="number"
                      name={sub.name}
                      value={currentMarks[sub.name] || ""}
                      onChange={(e) =>
                        handleMarkChange(sub.name, e.target.value)
                      }
                      placeholder={`Enter ${sub.name} marks`}
                    />
                  </div>
                ))}
              </Box>

              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={handleUpdateStudent}
                  disabled={!isFormValid()}
                  sx={{ flex: 1 }}
                >
                  Update
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setEditingStudent(null);
                    setCurrentMarks({});
                  }}
                  sx={{ flex: 1 }}
                >
                  Cancel
                </Button>
              </Box>
            </Paper>
          )}

          {/* Saved Marks */}
          {savedMarks.length > 0 && (
            <Paper
              sx={{
                p: 2,
                border: "1px solid #c8e6c9",
                bgcolor: "#f1f8e9",
              }}
            >
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                <CheckCircle sx={{ fontSize: 18, mr: 0.5 }} /> Saved Marks (
                {savedMarks.length})
              </Typography>
              {savedMarks.map((s) => (
                <Box
                  key={s.studentId}
                  sx={{
                    mb: 1,
                    p: 1.5,
                    bgcolor: "white",
                    border: "1px solid #e0f2f1",
                    borderRadius: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography fontWeight={500}>{s.studentName}</Typography>
                    <Box
                      sx={{
                        mt: 1,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.5,
                      }}
                    >
                      {exam.subjects.map((sub) => (
                        <Chip
                          key={sub.name}
                          size="small"
                          label={`${sub.name}: ${s.marks[sub.name] ?? 0}/${sub.marks}`}
                          sx={{ bgcolor: "#e3f2fd" }}
                        />
                      ))}
                    </Box>
                  </Box>
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => handleEditStudent(s.studentId)}
                      disabled={editingStudent !== null}
                    >
                      <Edit fontSize="small" color="primary" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveStudent(s.studentId)}
                      disabled={editingStudent !== null}
                    >
                      <Delete fontSize="small" color="error" />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Paper>
          )}
        </Box>

        {/* Footer */}
        <Divider />
        <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleFinalSubmit}
            disabled={savedMarks.length === 0}
          >
            Save All Marks ({savedMarks.length} students)
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default MarksEntryDrawer;
