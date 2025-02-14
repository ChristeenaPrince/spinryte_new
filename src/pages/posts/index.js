import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const createData = (name, content1) => {
  return { name, content1 };
};

const FeedbackManagement = () => {
  const [rows, setRows] = useState([
    createData('Heading 1', 'Content 1'),
    createData('Heading 2', 'Content 2'),
    createData('Heading 3', 'Content 3'),
  ]);

  const [newItem, setNewItem] = useState({
    name: '',
    content1: '',
  });

  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationIndex, setConfirmationIndex] = useState(null);

  const handleRemove = (index) => {
    setConfirmationIndex(index);
    setConfirmationOpen(true);
  };

  const handleApproved = (index) => {
    setConfirmationIndex(index);
    setConfirmationOpen(true);
  };

  const handleConfirm = () => {
    // Perform the action based on the confirmation type (delete or approve)
    if (confirmationIndex !== null) {
      // Delete or approve logic here
      const clone = [...rows];
      clone.splice(confirmationIndex, 1);
      setRows(clone);
    }

    setConfirmationOpen(false);
    setConfirmationIndex(null);
  };

  const handleCancel = () => {
    setConfirmationOpen(false);
    setConfirmationIndex(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleAddItem = () => {
    const newItemData = createData(newItem.name, newItem.content1);
    setRows((prevRows) => [...prevRows, newItemData]);
    setNewItem({
      name: '',
      content1: '',
    });
  };

  return (
    <div>
      <TableContainer component={Paper} className="table-content">
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.name}
                sx={{
                  '&:last-of-type td, &:last-of-type th': {
                    border: 0,
                  },
                }}
              >
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell align='right'>{row.content1}</TableCell>
                <TableCell align='right'>
                  <Button variant="contained" color="primary" style={{ marginRight: '8px' }} onClick={() => handleApproved(index)}>
                    Approved
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleRemove(index)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={confirmationOpen} onClose={handleCancel}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to {confirmationIndex !== null ? 'delete' : 'approve'} this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            No
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FeedbackManagement;
