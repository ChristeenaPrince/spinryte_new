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

const createData = (id, name, status, createdDate, price, features) => {
  return { id, name, status, createdDate, price, features };
};

const PackageManagement = () => {
  const [rows, setRows] = useState([
    createData(1, 'Frozen yoghurt', 'Active', '2023-01-01', '$50', []),
    createData(2, 'Ice cream sandwich', 'Inactive', '2023-01-02', '$50', []),
    createData(3, 'Eclair', 'Active', '2023-01-03', '$50', []),
    createData(4, 'Cupcake', 'Inactive', '2023-01-04', '$50', []),
    createData(5, 'Gingerbread', 'Active', '2023-01-05', '$50', []),
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemStatus, setNewItemStatus] = useState('Active');
  const [newItemCreatedDate, setNewItemCreatedDate] = useState('');
  const [editingItemId, setEditingItemId] = useState(null);
  const [featureInput, setFeatureInput] = useState('');
  const [itemFeatures, setItemFeatures] = useState([]);
  const [statusMenuAnchor, setStatusMenuAnchor] = useState(null);

  const handleStatusMenuOpen = (event) => {
    setStatusMenuAnchor(event.currentTarget);
  };

  const handleStatusMenuClose = (status) => {
    setStatusMenuAnchor(null);
    setNewItemStatus(status);
  };

  const handleAddFeature = () => {
    if (featureInput.trim() !== '') {
      setItemFeatures([...itemFeatures, featureInput]);
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (index) => {
    const updatedFeatures = [...itemFeatures];
    updatedFeatures.splice(index, 1);
    setItemFeatures(updatedFeatures);
  };

  const handleAddItem = () => {
    if (editingItemId !== null) {
      // Editing existing item
      const updatedRows = rows.map((row) =>
        row.id === editingItemId
          ? { ...row, name: newItemName, status: newItemStatus, createdDate: newItemCreatedDate, features: itemFeatures }
          : row
      );
      setRows(updatedRows);
    } else {
      // Adding new item
      const newItem = createData(rows.length + 1, newItemName, newItemStatus, newItemCreatedDate, '$50', itemFeatures);
      setRows([...rows, newItem]);
    }

    setOpenDialog(false);
    setNewItemName('');
    setNewItemStatus('Active');
    setNewItemCreatedDate('');
    setEditingItemId(null);
    setItemFeatures([]);
  };

  const handleEditClick = (id) => {
    const itemToEdit = rows.find((row) => row.id === id);
    setNewItemName(itemToEdit.name);
    setNewItemStatus(itemToEdit.status);
    setNewItemCreatedDate(itemToEdit.createdDate);
    setItemFeatures(itemToEdit.features);
    setEditingItemId(id);
    setOpenDialog(true);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Button
          variant="contained"
          color="primary"
          style={{ float: 'right', margin: '10px' }}
          onClick={() => setOpenDialog(true)}
        >
          Add Item
        </Button>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sl No</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right">Created Date</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Features</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  '&:last-of-type td, &:last-of-type th': {
                    border: 0,
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="right">{row.createdDate}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right" style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {row.features.map((feature, index) => (
                    <div key={index} style={{ marginRight: '8px', marginBottom: '8px' }}>
                      {feature}{' '}
                      <span
                        style={{ cursor: 'pointer', color: 'red' }}
                        onClick={() => handleRemoveFeature(index)}
                      >
                        (x)
                      </span>
                    </div>
                  ))}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    onClick={() => handleEditClick(row.id)}
                    style={{ marginRight: '8px' }}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Add/Edit Item */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{editingItemId !== null ? 'Edit Item' : 'Add New Item'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="newItemName"
            label="Name"
            fullWidth
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
         
          <Button variant="outlined" onClick={handleStatusMenuOpen} style={{ marginTop: '10px' }}>
            Status *
          </Button>
          <Menu
            anchorEl={statusMenuAnchor}
            open={Boolean(statusMenuAnchor)}
            onClose={() => handleStatusMenuClose(newItemStatus)}
          >
            <MenuItem onClick={() => handleStatusMenuClose('Active')}>Active</MenuItem>
            <MenuItem onClick={() => handleStatusMenuClose('Inactive')}>Inactive</MenuItem>
          </Menu>
          <TextField
            autoFocus
            margin="dense"
            id="newItemFeatures"
            label="Features"
            fullWidth
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
          />
         <div style={{ marginTop: '10px', maxWidth: '570px' }}>
           {itemFeatures.map((feature, index) => (
              <div key={index} style={{ marginBottom: '8px', wordWrap: 'break-word' }}>
                {feature}{' '}
                   <span style={{ cursor: 'pointer', color: 'red' }} onClick={() => handleRemoveFeature(index)}>
                     (x)
                 </span>
    </div>
  ))}
</div>

        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddItem} color="primary">
            {editingItemId !== null ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PackageManagement;
