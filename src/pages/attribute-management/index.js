
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  TextField,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from '@mui/material/Alert';

const Attributemanagement = () => {
  const [rows, setRows] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isAddItemView, setIsAddItemView] = useState(false);
  const [isEditItemView, setIsEditItemView] = useState(false); // New state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [newAttributes, setNewAttributes] = useState([
    { name: "", input_type: "", input_values: "", category: "", status: "" },
  ]);
  
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editingItemId, setEditingItemId] = useState(null);

  const [itemToDelete, setItemToDelete] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  // ... [Fetch functions remain the same] ...


  const fetchAttributes = async () => {
    try {
      const response = await axios.get(
        "https://spinryte.in/draw/api/Category/attributeList"
      );
      if (response.data && Array.isArray(response.data.dataList)) {
        setRows(response.data.dataList);
      } else {
        console.error("Error: Data is not in expected format", response.data);
      }
    } catch (error) {
      console.error("Error fetching attribute list:", error);
    }
  };

  // Fetch categories list
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://spinryte.in/draw/api/Category/categoryList"
      );
      if (response.data && Array.isArray(response.data.dataList)) {
        setCategories(response.data.dataList);
      } else {
        console.error("Error: Categories data is not in expected format", response.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchAttributes();
    fetchCategories();
  }, []);

  const handleAddRow = () => {
    setNewAttributes([
      ...newAttributes,
      { name: "", input_type: "", input_values: "", category: "", status: "" },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    setNewAttributes((prev) =>
      prev.map((attr, i) =>
        i === index ? { ...attr, [field]: value } : attr
      )
    );
  };
  const handleDeleteRow = (index) => {
    const updatedAttributes = newAttributes.filter((_, i) => i !== index);
    setNewAttributes(updatedAttributes);
    
  };
   
  const handleDeleteClick = (id) => {
    setOpenDeleteDialog(true);
    setEditingItemId(id);
  };

  const handleDeleteConfirm = async () => {
    if (editingItemId) {
      try {
        const response = await axios.post('https://spinryte.in/draw/api/Category/attribute_delete', {
          id: editingItemId,
        });

        if (response) {
          setRows((prevRows) => prevRows.filter((row) => row.id !== editingItemId));
          setEditingItemId(null);
          setOpenDeleteDialog(false);
          showMessage('Item deleted successfully');
        } else {
          showMessage('Failed to delete item');
        }
      } catch (error) {
        console.error('Error deleting item:', error.message);
        showMessage('Error deleting item');
      }
    }
  };
  console.log(newAttributes); // Check if attributes are populated correctly.

  const showMessage = (msg) => {
    setMessage(msg);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  const handleSave = async () => {
    const categoryID = newAttributes[0]?.category;
  
    if (!categoryID) {
      alert("Category must be selected for all attributes.");
      return;
    }
  
    const isValid = newAttributes.every(
      (attr) => attr.name && attr.input_type && attr.input_values && attr.status
    );
  
    if (!isValid) {
      alert("All fields must be filled out.");
      return;
    }
  
    const payload = {
      category: categoryID,
      attributes: newAttributes.map((attr) => ({
        name: attr.name,
        input_type: attr.input_type,
        input_values: attr.input_values,
        status: attr.status,
      })),
    };
  
    try {
      const response = await axios.post(
        "https://spinryte.in/draw/api/Category/create_attribute",
        payload
      );
      if (response.data.status) {
        fetchAttributes();
        setIsAddItemView(false);
      } else {
        console.error("Failed to save attributes:", response.data.message);
      }
    } catch (error) {
      console.error("Error saving attributes:", error);
    }
  };
  
  const handleEdit = (id) => {
    const selectedRow = rows.find((row) => row.id === id);
    if (selectedRow) {
      setEditingItemId(id);
      setNewAttributes([
        {
          name: selectedRow.name,
          input_type: selectedRow.input_type,
          input_values: selectedRow.input_values,
          category: selectedRow.category_id,
          status: selectedRow.status,
        },
      ]);
      setIsEditItemView(true); // Switch to edit mode
    }
  };

  const handleSaveEdit = async () => {
    if (!editingItemId) return;

    const payload = {
      id: editingItemId,
      category_id: newAttributes[0].category,
      name: newAttributes[0].name,
      input_type: newAttributes[0].input_type,
      input_values: newAttributes[0].input_values,
      status: newAttributes[0].status,
    };

    try {
      const response = await axios.post(
        "https://spinryte.in/draw/api/Category/attribute_update",
        payload
      );
      if (response.data.status) {
        fetchAttributes(); // Refresh the list
        setIsEditItemView(false); // Return to the list view
        showMessage("Attribute updated successfully");
      } else {
        showMessage(`Failed to update attribute: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error updating attribute:", error);
      showMessage("Error updating attribute");
    }
  };

  const renderAddItemView = () => (
    <Box component={Paper} sx={{ padding: 2,paddingBottom: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
        <Box>
  {/* Row for Category heading and Buttons */}
  <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={5} marginBottom={5}>
    {/* Category Heading */}
    <h1 style={{ margin: 0 }}>Add Attributes</h1>

    {/* Buttons */}
    <Box display="flex" gap={2}>
      <Button
        variant="contained"
        style={{backgroundColor:'#FF007F'}}
        onClick={() => setIsAddItemView(false)}
      >
        Back
      </Button>
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
    </Box>
  </Box>
  <hr/>
  {/* Category Dropdown */}
  <Box marginTop={1} marginBottom={2}>
<h1 style={{fontWeight:'300'}}>category:</h1>
<FormControl style={{ width: '200px' }}>
  <Select
    value={newAttributes[0]?.category || ""}
    onChange={(e) => {
      const selectedCategory = e.target.value;
      setNewAttributes((prev) =>
        prev.map((attr) => ({
          ...attr,
          category: selectedCategory,
        }))
      );
    }}
    displayEmpty
    MenuProps={{
      PaperProps: {
        style: {
          maxHeight: 200, // Set the maximum height for the dropdown
          overflowY: 'auto', // Enable vertical scrolling
        },
      },
    }}
  >
    <MenuItem
      value=""
      disabled
     style={{ color: "#9e9e9e" }} // Example: Material-UI's grey[500]
    >
      Select Category
    </MenuItem>
    {categories.map((category) => (
      <MenuItem key={category.id} value={category.id}>
        {category.name}
      </MenuItem>
    ))}
  </Select>
</FormControl>
  </Box>
</Box>
        </Grid>
        {/* Attributes Table */}
        <Grid style={{marginTop:'30px'}} item xs={12}>
          <TableContainer component={Paper}>
          <Box
  display="flex"
  justifyContent="flex-end"
  marginTop={2}
>
  <Button
    variant="contained"
    color="info"
    onClick={handleAddRow}
    startIcon={<AddIcon />} // Add the icon
  >
    New
  </Button>
</Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Attribute Name</TableCell>
                  <TableCell>Input Type</TableCell>
                  <TableCell>Values</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {newAttributes.map((attr, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <TextField
                        fullWidth
                        value={attr.name}
                        onChange={(e) =>
                          handleInputChange(index, "name", e.target.value)
                        }
                        placeholder="Enter Attribute Name"
                      />
                    
                    </TableCell>
                    <TableCell>
  <FormControl fullWidth>
    <InputLabel>Input Type</InputLabel>
    <Select
      value={attr.input_type}
      onChange={(e) => handleInputChange(index, "input_type", e.target.value)}
    >
      <MenuItem value="Dropdown">Dropdown</MenuItem>
      <MenuItem value="Radio button">Radio button</MenuItem>
      <MenuItem value="Text box">Text box</MenuItem>
      <MenuItem value="Date picker">Date picker</MenuItem>
      <MenuItem value="Time picker">Time picker</MenuItem>
    </Select>
  </FormControl>
</TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        value={attr.input_values}
                        onChange={(e) =>
                          handleInputChange(index, "input_values", e.target.value)
                        }
                        placeholder="Enter Values"
                      />
                    </TableCell>
                    <TableCell>
                     <FormControl fullWidth margin="normal">
                               <InputLabel>Status</InputLabel>
                               <Select
                                 name="status"
                                 value={index.status}
                                 onChange={handleInputChange}
                               >
                                 <MenuItem value="1">Active</MenuItem>
                                 <MenuItem value="2">Inactive</MenuItem>
                               </Select>
                             </FormControl>
                    </TableCell>
                    <TableCell>
                    <IconButton
                       onClick={() => handleDeleteRow(index)}
                    >
          <DeleteIcon sx={{ color: 'red' }} />
        </IconButton>
        { /*If you prefer only an icon: */}
        
      </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
     
    </Box>
  );
  const renderAttributeList = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>SL No</TableCell>
            <TableCell>Attribute Name</TableCell>
            <TableCell>Value Type</TableCell>
            <TableCell>Values</TableCell>
            <TableCell align="center">Category</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.input_type}</TableCell>
              <TableCell>{row.input_values}</TableCell>
              <TableCell align="center">{row.category_name}</TableCell>
              <TableCell align="center">{row.status}</TableCell>
              <TableCell align="center">{row.date}</TableCell>
              <TableCell align="center">
                <IconButton onClick={() => handleEdit(row.id)} title="Edit">
                  <EditIcon sx={{ color: "#00008B" }} />
                </IconButton>
                <IconButton onClick={() => handleDeleteClick(row.id)} title="Delete">
                  <DeleteIcon sx={{ color: "red" }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderAddOrEditView = (isEditMode) => (
    <Box component={Paper} sx={{ padding: 2, paddingBottom: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={5} marginBottom={5}>
              <h1 style={{ margin: 0 }}>{isEditMode ? "Edit Attribute" : "Add Attributes"}</h1>
              <Box display="flex" gap={2}>
                <Button variant="contained" style={{ backgroundColor: '#008000' }} onClick={() => {
                  setIsAddItemView(false);
                  setIsEditItemView(false);
                }}>
                  Back
                </Button>
                <Button variant="contained" color="primary" onClick={isEditMode ? handleSaveEdit : handleSave}>
                  Save
                </Button>
              </Box>
            </Box>
            <hr />
            <Box marginTop={1} marginBottom={2}>
              <h1 style={{ fontWeight: '300' }}>Category:</h1>
              <FormControl style={{ width: '200px' }}>
                <Select
                  value={newAttributes[0]?.category || ""}
                  onChange={(e) => {
                    const selectedCategory = e.target.value;
                    setNewAttributes((prev) =>
                      prev.map((attr) => ({
                        ...attr,
                        category: selectedCategory,
                      }))
                    );
                  }}
                  displayEmpty
                  MenuProps={{
                    PaperProps: {
                      style: { maxHeight: 200, overflowY: 'auto' },
                    },
                  }}
                >
                  <MenuItem value="" disabled style={{ color: "#9e9e9e" }}>
                    Select Category
                  </MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Grid>
        <Grid style={{ marginTop: '30px' }} item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Attribute Name</TableCell>
                  <TableCell>Input Type</TableCell>
                  <TableCell>Values</TableCell>
                  <TableCell>Status</TableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {newAttributes.map((attr, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <TextField
                        fullWidth
                        value={attr.name}
                        onChange={(e) => handleInputChange(index, "name", e.target.value)}
                        placeholder="Enter Attribute Name"
                      />
                    </TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <InputLabel>Input Type</InputLabel>
                        <Select
                          value={attr.input_type}
                          onChange={(e) => handleInputChange(index, "input_type", e.target.value)}
                        >
                          <MenuItem value="Dropdown">Dropdown</MenuItem>
                          <MenuItem value="Radio button">Radio button</MenuItem>
                          <MenuItem value="Text box">Text box</MenuItem>
                          <MenuItem value="Date picker">Date picker</MenuItem>
                          <MenuItem value="Time picker">Time picker</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        value={attr.input_values}
                        onChange={(e) => handleInputChange(index, "input_values", e.target.value)}
                        placeholder="Enter Values"
                      />
                    </TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                          value={attr.status}
                          onChange={(e) => handleInputChange(index, "status", e.target.value)}
                        >
                          <MenuItem value="1">Active</MenuItem>
                          <MenuItem value="2">Inactive</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
        <h1 style={{ margin: 0 }}>{isAddItemView || isEditItemView ? "" : "Attribute List"}</h1>
        {!isAddItemView && !isEditItemView && (
          <Button variant="contained" color="primary" onClick={() => setIsAddItemView(true)}>
            Add Item
          </Button>
        )}
      </Box>
      {isAddItemView && renderAddItemView()}
      {isEditItemView && renderAddOrEditView(true)} {/* Edit view */}
      {!isAddItemView && !isEditItemView && renderAttributeList()} {/* Default List view */}
     
     
      <Dialog
  open={openEditDialog}
  onClose={() => setOpenEditDialog(false)}
  fullWidth
  maxWidth="sm"
>
  <DialogTitle>Edit Attribute</DialogTitle>
  <DialogContent>
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField
        label="Attribute Name"
        value={editData?.name || ""}
        onChange={(e) =>
          setEditData({ ...editData, name: e.target.value })
        }
      />
      <TextField
        label="Input Type"
        value={editData?.input_type || ""}
        onChange={(e) =>
          setEditData({ ...editData, input_type: e.target.value })
        }
      />
      <TextField
        label="Input Values"
        value={editData?.input_values || ""}
        onChange={(e) =>
          setEditData({ ...editData, input_values: e.target.value })
        }
      />
      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select
          value={editData?.category_id || ""}
          onChange={(e) =>
            setEditData({ ...editData, category_id: e.target.value })
          }
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
          value={editData?.status ?? ""}
          onChange={(e) =>
            setEditData((prev) => ({ ...prev, status: e.target.value }))
          }
        >
          <MenuItem value="1">Active</MenuItem>
          <MenuItem value="2">Inactive</MenuItem>
        </Select>
      </FormControl>
    </Box>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
    <Button variant="contained"  onClick={handleSaveEdit}>
      Save
    </Button>
  </DialogActions>
</Dialog>

{/* Dialog for Delete Confirmation */}
<Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
  <DialogTitle>Delete Item</DialogTitle>
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


      {/* Snackbar remains unchanged */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      />

{/* Snackbar for Notifications */}
<Snackbar
  open={openSnackbar}
  autoHideDuration={6000}
  onClose={handleCloseSnackbar}
>
  <MuiAlert
    elevation={6}
    variant="filled"
    onClose={handleCloseSnackbar}
    severity="success"
  >
    {message}
  </MuiAlert>
</Snackbar>

    </div>
  );

};
export default Attributemanagement;


    