import React from 'react';

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
import { useParams } from 'react-router-dom';
import StudentWiseMarksEntry from './StudentWiseMarksEntry';
import { dummyExams } from '../ExamList';
import StudentMark from './StudentMarkTable';
import SubjectWiseMarkEntry from './SubjectWiseMarkEntry/SubjectWiseMarkEntry';

const MarksEntry = () => {

    const examId = useParams('id')
    const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    console.log(examId)


    const exam = dummyExams.find(item=> item.id === examId.id);
    console.log('exam===>', exam)
   
    return (
        <div >
          <div style={{width:'100%'}}>
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
           <Box sx={{ p: 2, display:'flex', width:'100%', justifyContent:'center' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        TabIndicatorProps={{ style: { display: "none" } }} // hide underline
        sx={{
          display: "inline-flex",
          backgroundColor: "#fff",
          borderRadius: "8px",
           minHeight: "37px",
           height:'37px',
          "& .MuiTabs-flexContainer": {
            display: "flex",
          },
          "& .MuiTab-root": {
            textTransform: "none",
            // border: "1px solid #346fef",
            color: "#346fef",
            fontWeight: 600,
            backgroundColor: "#fff",
            transition: "0.3s",
            fontSize: "0.9rem",
            height: "37px",
            width: "250px",
            minHeight: "37px",
            minWidth: "250px",
            "&:first-of-type": {
              borderTopLeftRadius: "8px",
              borderBottomLeftRadius: "8px",
            },
            "&:last-of-type": {
              borderTopRightRadius: "8px",
              borderBottomRightRadius: "8px",
            },
          },
          "& .Mui-selected": {
            backgroundColor: "#346fef !important",
            color: "#fff !important",
            fontWeight: 600,
          },
        }}
      >
        <Tab label="Student Wise" />
        <Tab label="Subject Wise" />
      </Tabs>
    </Box>
          </div>
          {
            value === 0 && (
              // <StudentWiseMarksEntry exam={exam}/>
              <StudentMark exam={exam}/>
            )
          }
          {
            value === 1 && (
              <SubjectWiseMarkEntry exam={exam}/>
            )
          }
        </div>
    );
};

export default MarksEntry;