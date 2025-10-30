import { Delete, Edit, People } from '@mui/icons-material';
import { Box, IconButton, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import BasicSelect from '../common/BasicSelect';
import { mockStudents } from './StudentWiseMarksEntry';
import BasicInput from '../common/BasicInput';

const SubjectWiseMarkEntry = ({exam}) => {
    const [selectedSubject, setSelectedSubject] = useState('');
    
     const students =  mockStudents.filter(
            (s) => s.class === exam.class
        );

  const findSubjectName = () => {
        const found = exam?.subjects.find((item) => item.marks === selectedSubject);
        return found ? found.name : "";
};

    return (
        <div style={{width:'100%', height:'100%' , display:'flex', gap:'50px'}}>
             <Paper
                                    sx={{
                                        width:'50%',
                                        p: 3,
                                        mb: 3,
                                        borderRadius: 3,
                                        border: "1px solid #e0e7ff",
                                        bgcolor: "#f9faff"
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
                                      Enter Marks by Subject
                                    </Typography>

                                     <Typography
                                        variant="subtitle1"
                                        sx={{
                                            mb: 2,
                                            fontWeight: 500,
                                            color: "#7b7f86ff",
                                        }}
                                    >
                                       Select a subject and enter marks for all students
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
                                        Select Subject
                                    </Typography>

                                    <BasicSelect
                                        fullWidth
                                        options={exam?.subjects || []}
                                        value={selectedSubject}
                                        onChange={(e) => setSelectedSubject(e.target.value)}
                                        defaultText="Select a Subject"
                                        mapping={{ label: "name", value: "marks" }}
                                    />
                                </Paper>

                                 <div style={{ width: '50%', height: '100%', margin: '16px' }}>
                    {selectedSubject && (
                        <Paper
                            sx={{
                                p: 2,
                                border: "1px solid #c8e6c9",
                                bgcolor: "#f1f8e9",
                            }}
                        >
                            {/* <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                                <CheckCircle sx={{ fontSize: 18, mr: 0.5 }} /> Saved Marks (
                                {savedMarks.length})
                            </Typography> */}
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
                                {students.map((s) => (
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
                                            <Typography fontWeight={500}>{s.name}</Typography>
                                        </Box>
                                        <div style={{width:'250px'}}>
                                             <div style={{display:'flex' ,gap:'6px'}}>
                                                <Typography fontWeight={500}>{findSubjectName()}</Typography>
                                              <Typography fontWeight={500}>Max({selectedSubject})</Typography>
                                             </div>
                                              <BasicInput
                                              fullWidth
                                              value ={0}
                                              onChange={(e)=>console.log(e.target.value)}
                                              />
                                        </div>
                                        <Box>
                                            <IconButton
                                                size="small"
                                                // onClick={() => handleEditStudent(s.studentId)}
                                                // disabled={editingStudent !== null}
                                            >
                                                <Edit fontSize="small" color="primary" />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                // onClick={() => handleRemoveStudent(s.studentId)}
                                                // disabled={editingStudent !== null}
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
    );
};

export default SubjectWiseMarkEntry;