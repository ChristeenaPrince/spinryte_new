import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const createData = (id, heading, content, email) => {
  return { id, heading, content, email };
};

const EmployerManagement = () => {
  const [rows, setRows] = useState([
    createData(1, 'Heading 1', 'Content 1', 'john@example.com'),
    createData(1, 'Heading 2', 'Content 2', 'john@example.com'),
  ]);

  const [confirmationDialog, setConfirmationDialog] = useState({
    open: false,
    action: '',
    selectedRow: null,
  });

  const handleApproveRejectClick = (action, row) => {
    setConfirmationDialog({ open: true, action, selectedRow: row });
  };

  const handleConfirmationDialogClose = () => {
    setConfirmationDialog({ open: false, action: '', selectedRow: null });
  };

  const handleConfirmation = () => {
    // Implement your logic for approval or rejection here

    // Close the confirmation dialog
    handleConfirmationDialogClose();
  };

  return (
    <div>
      <TableContainer component={Paper} style={{ marginTop: '10px' }}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Heading</TableCell>
              <TableCell align='center'>Content</TableCell>
              <TableCell align='center'>Email Id</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  '&:last-of-type td, &:last-of-type th': {
                    border: 0,
                  },
                }}
              >
                <TableCell component='th' scope='row'>
                  {row.heading}
                </TableCell>
                <TableCell align='center'>{row.content}</TableCell>
                <TableCell align='center'>{row.email}</TableCell>
                <TableCell align='right' style={{ display: 'flex', gap: '4px' }}>
                  <Button
                    variant='contained'
                    color='primary'
                    style={{ marginRight: '8px' }}
                    onClick={() => handleApproveRejectClick('approve', row)}
                  >
                    Approve
                  </Button>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => handleApproveRejectClick('reject', row)}
                  >
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={confirmationDialog.open} onClose={handleConfirmationDialogClose}>
        <DialogTitle>{`Confirm ${confirmationDialog.action}`}</DialogTitle>
        <DialogContent>
          {`Are you sure you want to ${confirmationDialog.action} this item?`}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmationDialogClose}>Cancel</Button>
          <Button onClick={handleConfirmation} color="primary">
            {confirmationDialog.action}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmployerManagement;
