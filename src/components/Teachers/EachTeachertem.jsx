// EachStudentItem.jsx
import React from 'react';
import {
  TableRow, TableCell, Checkbox, IconButton, Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';

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
      sx={{ fontWeight: 'bold', width:'80px' }}
    />
  );
}

const EachTeacherItem = ({ row, selected, onCheckboxChange, onEdit, onDelete }) => {
  return (
    <StyledTableRow key={row.id}>
      <StyledTableCell padding="checkbox">
        <Checkbox
          checked={selected.includes(row.id)}
          onChange={() => onCheckboxChange(row.id)}
        />
      </StyledTableCell>
      <StyledTableCell>{row.name}</StyledTableCell>
      <StyledTableCell>{row.number}</StyledTableCell>
      <StyledTableCell>{row.father}</StyledTableCell>
      <StyledTableCell>{row.mother}</StyledTableCell>
      <StyledTableCell>{row.institute}</StyledTableCell>
      <StyledTableCell>{row.address}</StyledTableCell>
      <StyledTableCell>
        <StatusChip status={row.status} />
      </StyledTableCell>
      <StyledTableCell align="center">
        <IconButton onClick={() => onEdit(row)} color="primary">
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => onDelete(row)} color="error">
          <DeleteIcon />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default EachTeacherItem;
