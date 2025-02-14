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
import Modal from '@mui/material/Modal';

const createData = (id, fullName, lastName, email, groups, status) => {
  return { id, fullName, lastName, email, groups, status };
};

const FeedbackManagement = () => {
  const [rows, setRows] = useState([
    createData(1, 'Super_Admin', 'Super', 'admin@example.com', 'Super Admin', 'Active'),
    createData(2, 'Staff', 'User', 'staff@example.com', 'Manage for user management and list management', 'Inactive'),
    createData(3, 'Accountant', 'Account', 'accountant@example.com', '', 'Active'),
  ]);

  const [newItem, setNewItem] = useState({
    fullName: '',
    lastName: '',
    email: '',
    groups: '',
    status: '',
  });

  const [editItemId, setEditItemId] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

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
    const newItemData = createData(newId, newItem.fullName, newItem.lastName, newItem.email, newItem.groups, newItem.status);

    setRows((prevRows) => [...prevRows, newItemData]);
    setNewItem({
      fullName: '',
      lastName: '',
      email: '',
      groups: '',
      status: '',
    });
  };

  const handleEditPopup = (row) => {
    setEditItemId(row.id);
    setNewItem({
      fullName: row.fullName,
      lastName: row.lastName,
      email: row.email,
      groups: row.groups,
      status: row.status,
    });
    setEditModalOpen(true);
  };

  const handleEditSave = () => {
    const updatedRows = rows.map((row) =>
      row.id === editItemId
        ? {
            ...row,
            fullName: newItem.fullName,
            lastName: newItem.lastName,
            email: newItem.email,
            groups: newItem.groups,
            status: newItem.status,
          }
        : row
    );

    setRows(updatedRows);
    setEditModalOpen(false);
  };

  return (
    <div>
      <TableContainer component={Paper} className="table-content">
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Sl. No</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Groups</TableCell>
              <TableCell>Status</TableCell>
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
                <TableCell>{row.fullName}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.groups}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell align='right'>
                  <Button variant="contained" color="primary" size="small" onClick={() => handleEditPopup(row)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      
      <Modal open={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
        <div className="edit-modal" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', background: 'black' }}>
          <h2 style={{ marginBottom: '20px', textAlign: 'center', color: '#fff' }}>Edit Item</h2>
          <TextField label="Full Name" name="fullName" value={newItem.fullName} onChange={handleInputChange} fullWidth style={{ marginBottom: '10px' }} />
          <TextField label="Last Name" name="lastName" value={newItem.lastName} onChange={handleInputChange} fullWidth style={{ marginBottom: '10px' }} />
          <TextField label="Email" name="email" value={newItem.email} onChange={handleInputChange} fullWidth style={{ marginBottom: '10px' }}  />
          <TextField label="Groups" name="groups" value={newItem.groups} onChange={handleInputChange} fullWidth style={{ marginBottom: '10px' }}  />
          <TextField label="Status" name="status" value={newItem.status} onChange={handleInputChange} fullWidth style={{ marginBottom: '20px' }}  />
          <Button variant="contained" color="primary" onClick={handleEditSave} fullWidth>
            Save
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default FeedbackManagement;
