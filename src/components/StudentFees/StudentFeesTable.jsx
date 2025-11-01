import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Checkbox, TablePagination, IconButton, Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddOrEditStudentFeesModal from './AddOrEditStudentFeesModal';

// Styled Table Cells & Rows
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '&.MuiTableCell-head': {
    backgroundColor: "#346fef",
    color: theme.palette.common.white,
    fontWeight: 'bold',
  },
  '&.MuiTableCell-body': {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// Status Chip Component
const StatusChip = ({ status }) => {
  const color =
    status === 'Paid' ? 'success' : status === 'Pending' ? 'warning' : 'error';
  return (
    <Chip
      label={status}
      color={color}
      size="small"
      sx={{ fontWeight: 'bold' }}
    />
  );
};

// ✅ Dummy Student Fee Data
const dummyFeesData = [
  {
    id: 1,
    name: 'Shahin Alam',
    studentId: 'ST001',
    class: '10',
    feeType: 'Monthly Fee',
    feeAmount: 1200,
    date: '2025-10-01',
    status: 'Paid',
  },
  {
    id: 2,
    name: 'Akash Islam',
    studentId: 'ST002',
    class: '9',
    feeType: 'Exam Fee',
    feeAmount: 500,
    date: '2025-10-05',
    status: 'Pending',
  },
  {
    id: 3,
    name: 'Arif Hossain',
    studentId: 'ST003',
    class: '8',
    feeType: 'Monthly Fee',
    feeAmount: 1000,
    date: '2025-10-01',
    status: 'Paid',
  },
  {
    id: 4,
    name: 'Sabbir Khan',
    studentId: 'ST004',
    class: '10',
    feeType: 'Admission Fee',
    feeAmount: 3000,
    date: '2025-09-15',
    status: 'Overdue',
  },
];

export default function StudentFeesTable() {
  const [rows, setRows] = useState(dummyFeesData);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openFeesEditModal, setOpenFeesEditModal] = useState(false);
  const [editData, setEditData] = useState({});

  // Pagination
  const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  useEffect(() => {
    setSelected([]);
  }, [page, rowsPerPage]);

  // Checkbox handlers
  const handleCheckboxChange = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = paginatedRows.map((row) => row.id);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  // Edit/Delete handlers
  const handleEdit = (row) => {
    setOpenFeesEditModal(true);
    setEditData(row);
  };

  const handleDelete = (row) => {
    if (window.confirm(`Are you sure you want to delete ${row.name}'s record?`)) {
      setRows((prev) => prev.filter((r) => r.id !== row.id));
    }
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isPageSelected = paginatedRows.length > 0 && paginatedRows.every((row) => selected.includes(row.id));
  const isPageIndeterminate = paginatedRows.some((row) => selected.includes(row.id)) && !isPageSelected;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer
        sx={{
          height: 'calc(100vh - 325px)',
          overflowY: 'auto',
          '&::-webkit-scrollbar': { width: 6 },
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
        <Table stickyHeader sx={{ minWidth: 900 }} aria-label="student fees table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Class</StyledTableCell>
              <StyledTableCell>Fee Type</StyledTableCell>
              <StyledTableCell>Amount (৳)</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => (
              <StyledTableRow key={row.id}>
                <TableCell>{row.studentId}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.class}</TableCell>
                <TableCell>{row.feeType}</TableCell>
                <TableCell>{row.feeAmount}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>
                  <StatusChip status={row.status} />
                </TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => handleEdit(row)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(row)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={rows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 20, 50, 100]}
      />

      {openFeesEditModal && (
        <AddOrEditStudentFeesModal
          open={openFeesEditModal}
          onClose={() => {
            setOpenFeesEditModal(false);
            setEditData({});
          }}
          editData={editData}
        />
      )}
    </Paper>
  );
}
