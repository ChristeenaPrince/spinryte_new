import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const createData = (id, name, desc) => {
  return { id, name, desc };
};

const FeedbackManagement = () => {
  const [rows, setRows] = useState([
    createData(1, 'Super_Admin', 'Super Admin'),
    createData(2, 'Staff', 'Manage for user management and list management,image approvel and packages'),
    createData(3, 'Accountant', ''),
  ]);

  const [newItem, setNewItem] = useState({
    name: '',
    desc: '',
  });

  const [editItem, setEditItem] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleRemove = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleAddItem = () => {
    const newId = rows.length + 1;
    const newItemData = createData(newId, newItem.name, newItem.desc);

    setRows((prevRows) => [...prevRows, newItemData]);
    setNewItem({
      name: '',
      desc: '',
    });
  };

  const handleEditClick = (item) => {
    setEditItem(item);
    setDialogOpen(true);
  };

  const handleEditSave = () => {
    // Implement the logic to save the edited item
    // You can update the rows state accordingly
    setDialogOpen(false);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditItem(null);
  };

  return (
    <div>
      <TableContainer component={Paper} className="table-content">
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Sl. No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
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
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.desc}</TableCell>
                <TableCell align='right'>
                  <Button variant="contained" color="primary" style={{ marginRight: '8px' }} onClick={() => handleEditClick(row)}>
                    Edit
                  </Button>
                  {/* <Button variant="contained" color="secondary" onClick={() => handleRemove(row.id)}>
                    Delete
                  </Button> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={editItem?.name || ''}
            onChange={handleInputChange}
            name="name"
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Description"
            value={editItem?.desc || ''}
            onChange={handleInputChange}
            name="desc"
            fullWidth
            sx={{ marginBottom: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FeedbackManagement;
