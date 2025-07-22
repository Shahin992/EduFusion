import { Box } from '@mui/material';
import React from 'react';
import EachExamCardItem from './EachExamCardItem';

export const dummyExams = [
  {
    id: "exam1",
    title: "Weekly Exam - 05",
    class: "Class 9",
    subjects: [
      { name: "Physics", marks: 35 },
      { name: "Chemistry", marks: 35 },
      { name: "Biology", marks: 30 },
    ],
  },
  {
    id: "exam2",
    title: "Monthly Exam - 02",
    class: "Class 10",
    subjects: [
      { name: "Mathematics", marks: 50 },
      { name: "Higher Math", marks: 50 },
      { name: "Physics", marks: 40 },
    ],
  },
  {
    id: "exam3",
    title: "Half-Yearly Exam",
    class: "Class 8",
    subjects: [
      { name: "Bangla", marks: 100 },
      { name: "English", marks: 100 },
      { name: "Science", marks: 70 },
      { name: "ICT", marks: 30 },
    ],
  },
];


const ExamList = () => {
    return (
        <Box 
        sx={{
      height: 'calc(100vh - 325px)',
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
    }}
        >
             <Box sx={{ display: "flex", flexDirection:'row', flexWrap: "wrap" }}>
      {dummyExams.map((exam) => (
        <EachExamCardItem key={exam.id} eachExam={exam} />
      ))}
    </Box>
            
        </Box>
    );
};

export default ExamList;