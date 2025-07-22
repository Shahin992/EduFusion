import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Checkbox, TablePagination, IconButton, Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EachTeacherItem from './EachTeachertem';

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

function StatusChip({ status }) {
  const isActive = status.toLowerCase() === 'active';
  return (
    <Chip
      label={status}
      color={isActive ? 'success' : 'error'}
      size="small"
      sx={{ fontWeight: 'bold' }}
    />
  );
}


// Sample groups assigned just for demo; you can change as needed





export default function TeachersTable({rows}) {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [openStudentEditModal, setOpenStudentEditModal] = useState(false);
  const [editData, setEditData] = useState({});

  // Slice rows for current page
  const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Reset selection when page or rowsPerPage changes
  useEffect(() => {
    setSelected([]);
  }, [page, rowsPerPage]);

  const handleCheckboxChange = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Select/deselect all rows on current page
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = paginatedRows.map((row) => row.id);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (row) => {
   setOpenStudentEditModal(true);
   setEditData(row);
  };

  const handleDelete = (row) => {
    alert(`Deleting ${row.name}`);
  };

  // Check if all rows on current page are selected
  const isPageSelected = paginatedRows.length > 0 && paginatedRows.every((row) => selected.includes(row.id));
  // Check if some rows on current page are selected
  const isPageIndeterminate = paginatedRows.some((row) => selected.includes(row.id)) && !isPageSelected;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
     <TableContainer 
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
        <Table stickyHeader sx={{ minWidth: 900 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell padding="checkbox">
                <Checkbox
                  indeterminate={isPageIndeterminate}
                  checked={isPageSelected}
                  onChange={handleSelectAllClick}
                  inputProps={{ 'aria-label': 'select all on page' }}
                  sx={{
                    color: '#fff',
                    '&.Mui-checked': {
                    color: '#fff',
                    },
                    '&.MuiCheckbox-indeterminate': {
                    color: '#fff',
                    },
                }}
                />
              </StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Number</StyledTableCell>
              <StyledTableCell>Father's Name</StyledTableCell>
              <StyledTableCell>Mother's Name</StyledTableCell>
              <StyledTableCell>Institute</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
             {paginatedRows.map((row) => (
              <EachTeacherItem
                key={row.id}
                row={row}
                selected={selected}
                onCheckboxChange={handleCheckboxChange}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
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
      {
        openStudentEditModal && (
          <AddOrEditStudentModal
          open={openStudentEditModal}
          onClose={()=> {setOpenStudentEditModal(false); setEditData({})}}
          editData={editData}
          />
        )
      }
    </Paper>
  );
}
