
import React, { useState, useEffect } from 'react';
import {
  Paper, Table, TableRow, TableHead, TableBody, TableCell, TableContainer,
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Menu, MenuItem, Snackbar
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useFormik } from 'formik';
import axiosInstance from './axiosInstance';



const CategoryManagement = () => {
  const [rows, setRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [statusMenuAnchor, setStatusMenuAnchor] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('https://spinryte.in/draw/api/Category/categoryList');
      if (response.data?.status && response.data.dataList) {
        setRows(response.data.dataList);
      } else {
        showMessage('Error fetching products');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      showMessage('Error fetching products');
    }
  };

  const formik = useFormik({
    initialValues: { name: '', status: 'Active' },
    enableReinitialize: true,
    onSubmit: (values) => {
      editingItemId ? handleEditItem(values) : handleAddItem(values);
    },
  });

  const handleEditClick = (id) => {
    const item = rows.find((row) => row.id === id);
    if (item) {
      formik.setValues({ id: item.id, name: item.name, status: item.status });
      setEditingItemId(id);
      setOpenDialog(true);
    }
  };

  const handleAddItem = async (values) => {
    try {
      const payload = { ...values, status: values.status === 'Active' ? 1 : 2 };
      await axiosInstance.post('https://spinryte.in/draw/api/Category/create_category', payload);
      fetchProducts();
      showMessage('Item added successfully');
    } catch (error) {
      console.error('Add error:', error);
      showMessage('Error adding item');
    }
    setOpenDialog(false);
    formik.resetForm();
  };

  const handleEditItem = async (values) => {
    try {
      const payload = { id: values.id, name: values.name, status: values.status === 'Active' ? 1 : 2 };
      await axiosInstance.post(`https://spinryte.in/draw/api/Category/category_update/${editingItemId}`, payload);
      fetchProducts();
      showMessage('Item updated successfully');
    } catch (error) {
      console.error('Update error:', error);
      showMessage('Error updating item');
    }
    setOpenDialog(false);
    formik.resetForm();
    setEditingItemId(null);
  };

  const handleDeleteClick = (id) => {
    setEditingItemId(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axiosInstance.post('https://spinryte.in/draw/api/Category/category_delete', { id: editingItemId });
      setRows(rows.filter((row) => row.id !== editingItemId));
      setOpenDeleteDialog(false);
      setEditingItemId(null);
      showMessage('Item deleted successfully');
    } catch (error) {
      console.error('Delete error:', error);
      showMessage('Error deleting item');
    }
  };

  const handleStatusMenuOpen = (event) => setStatusMenuAnchor(event.currentTarget);
  const handleStatusMenuClose = (status) => {
    setStatusMenuAnchor(null);
    formik.setFieldValue('status', status);
  };

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    try {
      const response = await axiosInstance.get(`https://spinryte.in/draw/api/Category/categoryList?name=${value}`);
      if (response.data?.status && response.data.dataList) {
        const filtered = response.data.dataList.filter((row) =>
          row.name.toLowerCase().includes(value.toLowerCase())
        );
        setRows(filtered);
      }
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setOpenSnackbar(true);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Button variant="contained" color="primary" style={{ float: 'right', margin: '10px' }} onClick={() => setOpenDialog(true)}>
          Add Items
        </Button>
        <TextField
          label="Search by Name"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ marginBottom: '20px' }}
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sl No</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right">Created Date</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="right">{row.created_at}</TableCell>
               
<TableCell align="right">
  <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
    <Button variant="contained" color="primary" onClick={() => handleEditClick(row.id)}>
      Edit
    </Button>
    <Button variant="contained" color="error" onClick={() => handleDeleteClick(row.id)}>
      Delete
    </Button>
  </div>
</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{editingItemId ? 'Edit Item' : 'Add New Item'}</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Name" margin="dense" name="name" value={formik.values.name} onChange={formik.handleChange} />
          <Button variant="outlined" onClick={handleStatusMenuOpen} style={{ marginTop: '10px' }}>
            Status: {formik.values.status}
          </Button>
          <Menu anchorEl={statusMenuAnchor} open={Boolean(statusMenuAnchor)} onClose={() => handleStatusMenuClose(formik.values.status)}>
            <MenuItem onClick={() => handleStatusMenuClose('Active')}>Active</MenuItem>
            <MenuItem onClick={() => handleStatusMenuClose('Inactive')}>Inactive</MenuItem>
          </Menu>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={formik.handleSubmit}>{editingItemId ? 'Save' : 'Add'}</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Delete Item</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this item?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button color="error" onClick={handleDeleteConfirm}>Delete</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <MuiAlert elevation={6} variant="filled" onClose={() => setOpenSnackbar(false)} severity="success">
          {message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default CategoryManagement;
