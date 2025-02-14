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
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { Menu, MenuItem } from '@mui/material';

const createData = (id, name, email, status, createdDate, lastLogin) => {
  return { id, name, email, status, createdDate, lastLogin };
};

const AdminHierarchy = () => {
  const [rows, setRows] = useState([
    createData(1, 'John Doe', 'john@example.com', true, '2023-01-01', '2023-01-05 12:30'),
    createData(2, 'Jane Doe', 'jane@example.com', false, '2023-01-02', '2023-01-04 15:45'),
    createData(3, 'Alice Smith', 'alice@example.com', true, '2023-01-03', '2023-01-03 09:20'),
    createData(4, 'Bob Johnson', 'bob@example.com', false, '2023-01-04', '2023-01-02 18:10'),
    createData(5, 'Charlie Brown', 'charlie@example.com', true, '2023-01-05', '2023-01-01 21:55'),
  ]);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    createdDate: '',
    status: true,
  });

  const [viewUser, setViewUser] = useState(null);
  const [isViewDialogOpen, setViewDialogOpen] = useState(false);

  const [editUser, setEditUser] = useState(null);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);

  const [isNewUserDialogOpen, setNewUserDialogOpen] = useState(false);

  const [statusMenuAnchor, setStatusMenuAnchor] = useState(null);

  const handleAddUser = (event) => {
    setNewUser({
      name: '',
      email: '',
      createdDate: '',
      status: true,
    });
    setStatusMenuAnchor(event.currentTarget);
    setNewUserDialogOpen(true);
  };

  const handleCloseStatusMenu = () => {
    setStatusMenuAnchor(null);
  };

  const handleSelectStatus = (status) => {
    setNewUser({ ...newUser, status: status });
    handleCloseStatusMenu();
  };

  const handleCloseNewUserDialog = () => {
    setNewUserDialogOpen(false);
  };

  const handleSaveNewUser = () => {
    const newUserId = rows.length + 1;
    const newUserObject = createData(newUserId, newUser.name, newUser.email, newUser.status, newUser.createdDate, '');
    setRows((prevRows) => [...prevRows, newUserObject]);
    setNewUserDialogOpen(false);
  };

  const handleView = (user) => {
    setViewUser(user);
    setViewDialogOpen(true);
  };

  const handleCloseViewDialog = () => {
    setViewDialogOpen(false);
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setEditDialogOpen(true);
  };

  const handleEditInputChange = (e, user) => {
    const { name, value } = e.target;
    setEditUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSaveEdit = () => {
    const updatedRows = rows.map((row) => {
      if (row.id === editUser.id) {
        return {
          ...row,
          name: editUser.name,
          email: editUser.email,
          createdDate: editUser.createdDate,
        };
      }
      
return row;
    });
    setRows(updatedRows);
    setEditDialogOpen(false);
  };

  const handleActivateDeactivate = (user) => {
    const updatedRows = rows.map((row) => {
      if (row.id === user.id) {
        return {
          ...row,
          status: !row.status, // Toggle the status
        };
      }
      
return row;
    });
    setRows(updatedRows);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant='contained'
        color='primary'
        style={{ margin: '8px' }}
        onClick={handleAddUser}
      >
        Add User
      </Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align='center'>Status</TableCell>
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
                  {row.name}
                </TableCell>
                <TableCell align='center'>
                  <Button
                    variant='contained'
                    style={{
                      backgroundColor: row.status ? 'green' : 'gray',
                      color: 'white',
                      borderRadius: '5px',
                      padding: '5px 10px',
                    }}
                    onClick={() => handleActivateDeactivate(row)}
                  >
                    {row.status ? 'Activate' : 'Inactive'}
                  </Button>
                </TableCell>
                <TableCell align='right' style={{ display: 'flex', gap: '4px' }}>
                  <Button
                    variant='contained'
                    style={{
                      backgroundColor: '',
                      color: 'white',
                      borderRadius: '5px',
                      padding: '5px 10px',
                    }}
                    onClick={() => handleView(row)}
                  >
                    View
                  </Button>
                  <Button
                    variant='contained'
                    style={{
                      backgroundColor: '',
                      color: 'white',
                      borderRadius: '5px',
                      padding: '5px 10px',
                    }}
                    onClick={() => handleEdit(row)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onClose={handleCloseViewDialog}>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          {viewUser && (
            <DialogContentText>
              <strong>Name:</strong> {viewUser.name}
              <br />
              <strong>Email:</strong> {viewUser.email}
              <br />
              <strong>Status:</strong> {viewUser.status ? 'Active' : 'Inactive'}
              <br />
              <strong>Created Date:</strong> {viewUser.createdDate}
              <br />
              <strong>Last Login:</strong> {viewUser.lastLogin}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewDialog} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit User Details</DialogTitle>
        <DialogContent>
          {editUser && (
            <div>
              <TextField
                label='Name'
                name='name'
                value={editUser.name}
                onChange={(e) => handleEditInputChange(e, editUser)}
                style={{ marginBottom: '8px' }}
              />
              <TextField
                label='Email'
                name='email'
                value={editUser.email}
                onChange={(e) => handleEditInputChange(e, editUser)}
                style={{ marginBottom: '8px' }}
              />
              <TextField
                label='Created Date'
                name='createdDate'
                value={editUser.createdDate}
                onChange={(e) => handleEditInputChange(e, editUser)}
                style={{ marginBottom: '8px' }}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* New User Dialog */}
      <Dialog open={isNewUserDialogOpen} onClose={handleCloseNewUserDialog}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            label='Name'
            name='name'
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            style={{ marginBottom: '8px' }}
          />
          <TextField
            label='Email'
            name='email'
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            style={{ marginBottom: '8px' }}
          />
          <TextField
            label='Created Date'
            name='createdDate'
            value={newUser.createdDate}
            onChange={(e) => setNewUser({ ...newUser, createdDate: e.target.value })}
            style={{ marginBottom: '8px' }}
          />
          <TextField
            select
            label='Status'
            name='Status'
            style={{ marginLeft: '8px', marginBottom: '8px' }}
          >
            <MenuItem value='active'>Active</MenuItem>
            <MenuItem value='inactive'>Inactive</MenuItem>
          </TextField>

          <DialogActions>
            <Button onClick={handleCloseNewUserDialog} color='primary'>
              Cancel
            </Button>
            <Button onClick={handleSaveNewUser} color='primary'>
              Save
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminHierarchy;
