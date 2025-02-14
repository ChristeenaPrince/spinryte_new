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
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

const createData = (slNo, postHeading, comment, user) => {
  return { slNo, postHeading, comment, user };
};

const FeedbackManagement = () => {
  const [rows, setRows] = useState([
    createData(1, 'Heading 1', 'Comment 1', 'User 1'),
    createData(2, 'Heading 2', 'Comment 2', 'User 2'),
    createData(3, 'Heading 3', 'Comment 3', 'User 3'),
    createData(4, 'Heading 4', 'Comment 4', 'User 4'),
    createData(5, 'Heading 5', 'Comment 5', 'User 5'),
  ]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [dialogType, setDialogType] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleRemove = (index) => {
    setSelectedItem(index);
    setDialogType('remove');
    setDialogOpen(true);
  };

  const handleRepost = (index) => {
    setSelectedItem(index);
    setDialogType('repost');
    setDialogOpen(true);
  };

  const handleActionConfirmed = () => {
    if (dialogType === 'remove') {
      handleRemoveConfirmed();
    } else if (dialogType === 'repost') {
      handleRepostConfirmed();
    }
  };

  const handleRemoveConfirmed = () => {
    const clone = [...rows];
    clone.splice(selectedItem, 1);
    setRows(clone);
    setDialogOpen(false);
  };

  const handleRepostConfirmed = () => {
    // Implement repost logic here
    // For now, just close the dialog
    setDialogOpen(false);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <TableContainer component={Paper} className="table-content">
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Sl No</TableCell>
              <TableCell align='center'>Post Heading</TableCell>
              <TableCell align='center'>Comment</TableCell>
              <TableCell align='center'>User</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.slNo}
                sx={{
                  '&:last-of-type td, &:last-of-type th': {
                    border: 0,
                  },
                }}
              >
                <TableCell align='center'>{row.slNo}</TableCell>
                <TableCell align='center'>{row.postHeading}</TableCell>
                <TableCell align='center'>{row.comment}</TableCell>
                <TableCell align='center'>{row.user}</TableCell>
                <TableCell align='right'>
                  <Button variant="contained" color="primary" style={{ marginRight: '8px' }} onClick={() => handleRemove(index)}>
                    Remove
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleRepost(index)}>
                    RePost
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {dialogType === 'remove' ? 'Confirm Remove' : 'Confirm RePost'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogType === 'remove'
              ? 'Are you sure you want to remove this item?'
              : 'Are you sure you want to repost this item?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleActionConfirmed} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FeedbackManagement;
