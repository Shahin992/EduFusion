import React, { useEffect, useState } from 'react';
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
    Tabs,
    Tab,
} from "@mui/material";
import {
    CheckCircle,
    Edit,
    Delete,
    People,
    MenuBook,
    Search as SearchIcon,
} from "@mui/icons-material";
import BasicInput from '../../common/BasicInput';
import BasicSelect from '../../common/BasicSelect';


export const mockStudents = [
    // ✅ Class 8
    { id: "11", name: "Farhana Sultana", class: 8 },
    { id: "12", name: "Shahriar Kabir", class: 8 },
    { id: "13", name: "Rumana Akter", class: 8 },
    { id: "14", name: "Towhidul Islam", class: 8 },
    { id: "15", name: "Maliha Tasnim", class: 8 },
    { id: "16", name: "Tariqul Hasan", class: 8 },
    { id: "17", name: "Nafisa Ahmed", class: 8 },
    { id: "18", name: "Raihan Chowdhury", class: 8 },
    { id: "19", name: "Salma Khatun", class: 8 },
    { id: "20", name: "Aminul Hoque", class: 8 },

    // ✅ Class 9 (Existing + Added Few More)
    { id: "1", name: "Arif Hossain", class: 9 },
    { id: "2", name: "Nusrat Jahan", class: 9 },
    { id: "3", name: "Rahim Uddin", class: 9 },
    { id: "4", name: "Sumaiya Akter", class: 9 },
    { id: "5", name: "Hasan Mahmud", class: 9 },
    { id: "6", name: "Mithila Haque", class: 9 },
    { id: "7", name: "Imran Hossain", class: 9 },
    { id: "8", name: "Tanisha Rahman", class: 9 },
    { id: "9", name: "Jamal Hossain", class: 9 },
    { id: "21", name: "Sharmin Nahar", class: 9 },
    { id: "22", name: "Khaled Mahbub", class: 9 },
    { id: "23", name: "Sadia Islam", class: 9 },
    { id: "24", name: "Rakibul Alam", class: 9 },
    { id: "25", name: "Mehnaz Chowdhury", class: 9 },

    // ✅ Class 10 (Existing + Added Few More)
    { id: "10", name: "Sadia Jahan", class: 10 },
    { id: "26", name: "Fahim Ahmed", class: 10 },
    { id: "27", name: "Tania Yasmin", class: 10 },
    { id: "28", name: "Shuvo Sarker", class: 10 },
    { id: "29", name: "Priyanka Das", class: 10 },
    { id: "30", name: "Mahfuzur Rahman", class: 10 },
    { id: "31", name: "Nabila Sultana", class: 10 },
    { id: "32", name: "Rashed Karim", class: 10 },
    { id: "33", name: "Tasnia Rahman", class: 10 },
    { id: "34", name: "Naimul Hasan", class: 10 },
    { id: "35", name: "Faria Ahmed", class: 10 }
];

const StudentWiseMarksEntry = ({ exam }) => {
    const [existingMarks, setExistingMarks] = useState([]);

    const onSave = (marks) => {
        console.log("✅ Saved Marks for", marks);
    }



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
        <div>
            <div style={{ width: '100%', height: '100%', display: 'flex', gap: '50px' }}>
                <div style={{ width: '50%', height: '100%' }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                        }}
                    >

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
                                            fontWeight: 600,
                                            color: "#1e293b",
                                            fontSize:'20px'
                                        }}
                                    >
                                       Enter Marks for Student
                                    </Typography>

                                     <Typography
                                        variant="subtitle1"
                                        sx={{
                                            mb: 2,
                                            fontWeight: 500,
                                            color: "#7b7f86ff",
                                        }}
                                    >
                                       Select a student and enter marks for all subjects
                                    </Typography>
                                    

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
                                            // disabled={!isFormValid()}
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

                        </Box>

                        {/* Footer */}
                        <Divider />

                    </Box>
                </div>
                <div style={{ width: '50%', height: '100%', margin: '16px' }}>
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
                            <Box sx={{
                                width: '100%',
                                maxHeight: "calc(100vh - 370px)",
                                overflowY: 'auto',
                                '&::-webkit-scrollbar': {
                                    width: 6,
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    borderRadius: 10,
                                    backgroundColor: '#346fef',
                                },
                                '&::-webkit-scrollbar-track': {
                                    borderRadius: 10,
                                    backgroundColor: '#2c3e50',
                                },
                            }}>
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
                            </Box>
                        </Paper>
                    )}
                </div>
            </div>

        </div>
    );
};

export default StudentWiseMarksEntry;