import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const createData = (name, calories, fat, carbs, protein) => {
  return { name, calories, fat, carbs, protein };
};

const AgencyManagement = () => {
  const [rows, setRows] = useState([
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ]);

  const [newItem, setNewItem] = useState({
    name: '',
    calories: '',
    fat: '',
    carbs: '',
    protein: '',
  });

  const handleDelete = (index) => {
    const clone = [...rows];
    clone.splice(index, 1);
    setRows(clone);
  };

  const handleEdit = (index) => {
    // Implement your edit logic here
    console.log(`Edit item at index ${index}`);
  };

  const handleAddItem = () => {
    const newItemData = createData(
      newItem.name,
      parseInt(newItem.calories),
      parseFloat(newItem.fat),
      parseInt(newItem.carbs),
      parseFloat(newItem.protein)
    );

    setRows((prevRows) => [...prevRows, newItemData]);
    setNewItem({
      name: '',
      calories: '',
      fat: '',
      carbs: '',
      protein: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  return (
    <div>
      <TextField
        label='Name'
        name='name'
        value={newItem.name}
        onChange={handleInputChange}
        style={{ marginRight: '8px' }}
      />
      <TextField
        label='Calories'
        name='calories'
        value={newItem.calories}
        onChange={handleInputChange}
        style={{ marginRight: '8px' }}
      />
      <TextField
        label='Fat'
        name='fat'
        value={newItem.fat}
        onChange={handleInputChange}
        style={{ marginRight: '8px' }}
      />
      <TextField
        label='Carbs'
        name='carbs'
        value={newItem.carbs}
        onChange={handleInputChange}
        style={{ marginRight: '8px' }}
      />
      <TextField
        label='Protein'
        name='protein'
        value={newItem.protein}
        onChange={handleInputChange}
        style={{ marginRight: '8px' }}
      />
      <Button
        variant="contained"
        color="primary"
        style={{ margin: '8px' }}
        onClick={handleAddItem}
      >
        Add Item
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align='right'>Calories</TableCell>
              <TableCell align='right'>Fat (g)</TableCell>
              <TableCell align='right'>Carbs (g)</TableCell>
              <TableCell align='right'>Protein (g)</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
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
                  <Checkbox color='primary' />
                  {row.name}
                </TableCell>
                <TableCell align='right'>{row.calories}</TableCell>
                <TableCell align='right'>{row.fat}</TableCell>
                <TableCell align='right'>{row.carbs}</TableCell>
                <TableCell align='right'>{row.protein}</TableCell>
                <TableCell align='right'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    className='bi bi-pencil-square'
                    viewBox='0 0 16 16'
                    style={{ color: 'blue', cursor: 'pointer', marginRight: '8px' }}
                    onClick={() => handleEdit(index)}
                  >
                    <path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z' />
                    <path fillRule='evenodd' d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z' />
                  </svg>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    className='bi bi-trash3'
                    viewBox='0 0 16 16'
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => handleDelete(index)}
                  >
                    <path d='M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5' />
                  </svg>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AgencyManagement;
