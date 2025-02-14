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
import { MenuItem } from '@mui/material';

const createData = (id, name, email, mobile, status, createdDate, lastLogin) => {
  return { id, name, email, mobile, status, createdDate, lastLogin };
};

const EmployerManagement = () => {
  const [rows, setRows] = useState([
    createData(1, 'John Doe', 'john@example.com', '123-456-7890', true, '2023-01-01', '2023-01-05 12:30'),
    createData(2, 'Jane Doe', 'jane@example.com', '987-654-3210', false, '2023-01-02', '2023-01-04 15:45'),
    createData(3, 'Alice Smith', 'alice@example.com', '555-123-4567', true, '2023-01-03', '2023-01-03 09:20'),
    createData(4, 'Bob Johnson', 'bob@example.com', '111-222-3333', false, '2023-01-04', '2023-01-02 18:10'),
    createData(5, 'Charlie Brown', 'charlie@example.com', '444-555-6666', true, '2023-01-05', '2023-01-01 21:55'),
  ]);

  const [filteredRows, setFilteredRows] = useState(rows);
  const [viewUser, setViewUser] = useState(null);
  const [isViewDialogOpen, setViewDialogOpen] = useState(false);

  const [editUser, setEditUser] = useState(null);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);

  const [filterTermName, setFilterTermName] = useState('');
  const [filterTermEmail, setFilterTermEmail] = useState('');
  const [filterTermMobile, setFilterTermMobile] = useState('');
  const [filterTermStatus, setFilterTermStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'filterName') {
      setFilterTermName(value);
    } else if (name === 'filterEmail') {
      setFilterTermEmail(value);
    } else if (name === 'filterMobile') {
      setFilterTermMobile(value);
    } else if (name === 'filterStatus') {
      setFilterTermStatus(value);
    }
  };

  const handleFilterSubmit = () => {
    const filteredResults = rows.filter(
      (row) =>
        row.name.toLowerCase().includes(filterTermName.toLowerCase()) &&
        row.email.toLowerCase().includes(filterTermEmail.toLowerCase()) &&
        row.mobile.toLowerCase().includes(filterTermMobile.toLowerCase()) &&
        (filterTermStatus === '' || row.status === (filterTermStatus === 'active'))
    );
    setFilteredRows(filteredResults);
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
          mobile: editUser.mobile,
          status: editUser.status,
          createdDate: editUser.createdDate,
          lastLogin: editUser.lastLogin,
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
          status: !row.status,
        };
      }
      
return row;
    });
    setRows(updatedRows);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  return (
    <div>
      <TextField
        label='Filter by Name'
        name='filterName'
        value={filterTermName}
        onChange={handleInputChange}
        style={{ marginLeft: '8px' }}
      />
      <TextField
        label='Filter by Email'
        name='filterEmail'
        value={filterTermEmail}
        onChange={handleInputChange}
        style={{ marginLeft: '8px' }}
      />
      <TextField
        label='Filter by Mobile'
        name='filterMobile'
        value={filterTermMobile}
        onChange={handleInputChange}
        style={{ marginLeft: '8px' }}
      />
      <TextField
        select
        label='Status'
        name='filterStatus'
        value={filterTermStatus}
        onChange={handleInputChange}
        style={{ marginLeft: '8px' }}
      >
        <MenuItem value=''>All</MenuItem>
        <MenuItem value='active'>Online</MenuItem>
        <MenuItem value='inactive'>Offline</MenuItem>
      </TextField>

      <Button
        variant='contained'
        color='primary'
        style={{ marginLeft: '8px',marginTop: '8px'  }}
        onClick={handleFilterSubmit}
      >
        Submit
      </Button>

      <TableContainer component={Paper} style={{ marginTop: '10px' }}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align='center'>Email</TableCell>
              <TableCell align='center'>Mobile</TableCell>
              <TableCell align='center'>Status</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
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
                <TableCell align='center'>{row.email}</TableCell>
                <TableCell align='center'>{row.mobile}</TableCell>
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
                      backgroundColor: 'black',
                      color: 'white',
                      borderRadius: '5px',
                      padding: '5px 10px',
                    }}
                  >
                    Block
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={isViewDialogOpen} onClose={handleCloseViewDialog}>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          {viewUser && (
            <DialogContentText>
              <strong>Name:</strong> {viewUser.name}
              <br />
              <strong>Email:</strong> {viewUser.email}
              <br />
              <strong>Mobile:</strong> {viewUser.mobile}
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
                style={{ marginRight: '8px' }}
              />
              <TextField
                label='Email'
                name='email'
                value={editUser.email}
                onChange={(e) => handleEditInputChange(e, editUser)}
                style={{ marginRight: '8px' }}
              />
              <TextField
                label='Mobile'
                name='mobile'
                value={editUser.mobile}
                onChange={(e) => handleEditInputChange(e, editUser)}
                style={{ marginRight: '8px' }}
              />
              <TextField
                label='Created Date'
                name='createdDate'
                value={editUser.createdDate}
                onChange={(e) => handleEditInputChange(e, editUser)}
                style={{ marginRight: '8px' }}
              />
              <TextField
                label='Last Login'
                name='lastLogin'
                value={editUser.lastLogin}
                onChange={(e) => handleEditInputChange(e, editUser)}
                style={{ marginRight: '8px' }}
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
    </div>
  );
};

export default EmployerManagement;
