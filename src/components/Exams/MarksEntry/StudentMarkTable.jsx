import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StudentWiseAddMarksHeader from "./StudentWiseAddMarksHeader";
import { mockStudents } from "./StudentWiseMarksEntry";
import AddOrEditStudentMarksModal from "./AddOrEditStudentMarksModal";

const CELL_WIDTH = 150;
const CELL_HEIGHT = 55;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&.MuiTableCell-head": {
    backgroundColor: "#346fef",
    color: theme.palette.common.white,
    fontWeight: "bold",
    border: "1px solid #ddd",
    textAlign: "center",
    minWidth: CELL_WIDTH,
    height: CELL_HEIGHT,
  },
  "&.MuiTableCell-body": {
    fontSize: 14,
    border: "1px solid #ddd",
    textAlign: "center",
    minWidth: CELL_WIDTH,
    height: CELL_HEIGHT,
    verticalAlign: "middle",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: "1px solid #ddd",
  },
}));

export default function StudentMark({ exam }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [openStudentEditModal, setOpenEditStudentMarkModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const getAvailableStudents = () => {
            return mockStudents.filter(
                (s) => s.class === exam.class );
        };
  // Sample data
  const students = getAvailableStudents()

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  return (
    <div>
        <StudentWiseAddMarksHeader exam={exam}/>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer
        sx={{
          height: "calc(100vh - 420px)",
          overflowX: "auto",
          overflowY: "auto",
          "&::-webkit-scrollbar": { height: 8, width: 6 },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: 10,
            backgroundColor: "#346fef",
          },
          "&::-webkit-scrollbar-track": {
            borderRadius: 10,
            backgroundColor: "#2c3e50",
          },
        }}
      >
        <Table stickyHeader aria-label="student marks table">
          <TableHead>
            <TableRow>
              {/* Sticky Name Column */}
              <StyledTableCell
                sx={{
                  position: "sticky",
                  left: 0,
                  zIndex: 3,
                  backgroundColor: "#346fef",
                  minWidth: CELL_WIDTH,
                }}
              >
                Name
              </StyledTableCell>

              {/* Scrollable Subject Columns */}
              {exam?.subjects?.map((subject) => (
                <StyledTableCell key={subject.name}>
                    {subject.name} – {subject.marks}
                </StyledTableCell>
                ))}

              {/* Sticky Action Column */}
              <StyledTableCell
                align="center"
                sx={{
                  position: "sticky",
                  right: 0,
                  zIndex: 3,
                  backgroundColor: "#346fef",
                  minWidth: CELL_WIDTH,
                }}
              >
                Action
              </StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {students.map((student) => (
              <StyledTableRow key={student.id}>
                {/* Sticky Name */}
                <StyledTableCell
                  sx={{
                    position: "sticky",
                    left: 0,
                    zIndex: 2,
                    backgroundColor: "#fff",
                    fontWeight: 500,
                    minWidth: CELL_WIDTH,
                  }}
                >
                  {student.name}
                </StyledTableCell>

                {/* Marks */}
                {exam?.subjects?.map((subject) => (
                  <StyledTableCell key={subject.name}>
                    {student.marks?.[subject.name] ?? "-"}
                  </StyledTableCell>
                ))}

                {/* Sticky Action */}
                <StyledTableCell
                  align="center"
                  sx={{
                    position: "sticky",
                    right: 0,
                    zIndex: 2,
                    backgroundColor: "#fff",
                    minWidth: CELL_WIDTH,
                  }}
                >
                  <IconButton onClick={()=>{setOpenEditStudentMarkModal(true); setEditData(student)
                  }} color="primary" size="small">
                    <EditIcon  />
                  </IconButton>
                  <IconButton color="error" size="small">
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={students.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 20, 50, 100]}
      />
      {
        openStudentEditModal && (
            <AddOrEditStudentMarksModal
            open={openStudentEditModal}
            onClose={()=>{setOpenEditStudentMarkModal(false); setEditData(null);}}
            exam={exam}
            editData={editData}
          />
          
        )
      }
    </Paper>
    </div>
    
  );
}
