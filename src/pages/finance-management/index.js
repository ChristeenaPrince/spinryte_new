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
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const createData = (name, price, createdDate) => {
  return { name, price, createdDate };
};

const FinanceManagement = () => {
  const [rows, setRows] = useState([
    createData('Package A', '$50', '2023-01-01'),
    createData('Package B', '$50', '2023-01-02'),
    createData('Package C', '$50', '2023-01-03'),
    createData('Package D', '$50', '2023-01-04'),
    createData('Package E', '$50', '2023-01-05'),
  ]);

  const [filteredRows, setFilteredRows] = useState([...rows]); // New state for filtered rows
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemStatus, setNewItemStatus] = useState('Active');
  const [newItemCreatedDate, setNewItemCreatedDate] = useState('');
  const [editingItemId, setEditingItemId] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [filterName, setFilterName] = useState('');
  const [filterPrice, setFilterPrice] = useState('');
  const [filterTime, setFilterTime] = useState('');

  const handleAddItem = () => {
    if (editingItemId !== null) {
      const updatedRows = rows.map((row) =>
        row.name === editingItemId
          ? { ...row, name: newItemName, status: newItemStatus, createdDate: newItemCreatedDate }
          : row
      );
      setRows(updatedRows);
    } else {
      const newItem = createData(newItemName, '$50', newItemCreatedDate);
      setRows([...rows, newItem]);
    }

    setOpenDialog(false);
    setNewItemName('');
    setNewItemStatus('Active');
    setNewItemCreatedDate('');
    setEditingItemId(null);
  };

  const handleEditClick = (name) => {
    const itemToEdit = rows.find((row) => row.name === name);
    setNewItemName(itemToEdit.name);
    setNewItemStatus(itemToEdit.status);
    setNewItemCreatedDate(itemToEdit.createdDate);
    setEditingItemId(name);
    setOpenDialog(true);
  };

  const handleDeleteClick = (name) => {
    const itemToDelete = rows.find((row) => row.name === name);
    setItemToDelete(itemToDelete);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      const updatedRows = rows.filter((row) => row.name !== itemToDelete.name);
      setRows(updatedRows);
      setItemToDelete(null);
      setOpenDeleteDialog(false);
    }
  };

  const [statusMenuAnchor, setStatusMenuAnchor] = useState(null);

  const handleStatusMenuOpen = (event) => {
    setStatusMenuAnchor(event.currentTarget);
  };

  const handleStatusMenuClose = (status) => {
    setStatusMenuAnchor(null);
    setNewItemStatus(status);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    // Implement filtering logic based on the filter values
    const filtered = rows.filter((row) => {
      // Use row.name.includes(filterName) for partial string matching
      // Adjust the conditions based on your specific filtering needs
      return (
        row.name.includes(filterName) &&
        row.price.includes(filterPrice) &&
        row.createdDate.includes(filterTime)
      );
    });

    setFilteredRows(filtered);

    // Perform your desired action with the filtered data
    console.log("Filtered Rows:", filtered);
  };

  return (
    <div>
      <form onSubmit={handleFilterSubmit} style={{    display: 'flex',alignItems: 'center',gap: '9px'}}>
        <TextField
          label="Filter by Packages"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
        <TextField
          label="Filter by Price"
          value={filterPrice}
          onChange={(e) => setFilterPrice(e.target.value)}
        />
        <TextField
          label="Filter by Time"
          value={filterTime}
          onChange={(e) => setFilterTime(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Filter
        </Button>
      </form>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Packages</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Purchased Time</TableCell>
              <TableCell align='right'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.createdDate}</TableCell>
                <TableCell align='right'>
                  <Button variant="outlined" onClick={() => handleDeleteClick(row.name)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Add/Edit Item */}

      {/* Dialog for Delete Confirmation */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Delete Package</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete {itemToDelete?.name}?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FinanceManagement;
