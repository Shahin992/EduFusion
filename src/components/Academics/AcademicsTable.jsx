import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AcademicsTable = ({ data, onEdit, onDelete }) => {
  return (
    <Paper  sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: '#f1f2f6' }}>
            <TableCell><strong>Class Name</strong></TableCell>
            <TableCell><strong>Version</strong></TableCell>
            <TableCell><strong>Sections</strong></TableCell>
            <TableCell align="right"><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.version || '-'}</TableCell>
              <TableCell>{row.sections?.join(', ') || '-'}</TableCell>
              <TableCell align="right">
                <IconButton color="primary" onClick={() => onEdit(row)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => onDelete(row.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default AcademicsTable;
