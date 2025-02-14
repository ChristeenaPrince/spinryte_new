
import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Button,
  Box,
  Typography,
  CircularProgress,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";  // Import Edit Icon
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from '@mui/material/Alert';
import axios from "axios";

const AttributePage = () => {
  const [rows, setRows] = useState([]);
  const [viewData, setViewData] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isViewPage, setIsViewPage] = useState(false);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", input_type: "", input_values: "", status: "" });
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [newAttributes, setNewAttributes] = useState([
    { name: "", input_type: "", input_values: "", category: "", status: "" },
  ]);
  const [editingAttribute, setEditingAttribute] = useState(null);  // Track the attribute being edited
  const [openEditDialog,setOpenEditDialog]= useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [itemToDelete, setItemToDelete] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch the attributes list
  const fetchAttributes = async () => {
    try {
      const response = await axios.get(
        "https://spinryte.in/draw/api/Attributes/attributeList"
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

  // On component mount, fetch attributes and try to load the saved viewData
  useEffect(() => {
    fetchAttributes();

    const savedViewData = localStorage.getItem("viewData");
    if (savedViewData) {
      setViewData(JSON.parse(savedViewData));
    }
  }, []);

  const handleAddRow = () => {
    setNewAttributes([
      ...newAttributes,
      { name: "", input_type: "", input_values: "", category: "", status: "" },
    ]);
  };

  const handleDeleteRow = (index) => {
    const updatedAttributes = newAttributes.filter((_, i) => i !== index);
    setNewAttributes(updatedAttributes);
    
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.post(
        "https://spinryte.in/draw/api/Category/attribute_delete",
        { id }
      );
      console.log("Delete Response:", response.data); // Log API response
      if (response.data.status) {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        showMessage("Item deleted successfully");
      } else {
        showMessage("Failed to delete item");
      }
    } catch (error) {
      console.error("Error while calling the delete API:", error);
      showMessage("Error deleting item");
    }
  };
 
  console.log(newAttributes); // Check if attributes are populated correctly.


  const showMessage = (msg) => {
    setMessage(msg);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };


  // Handle View button click
  const handleViewClick = async (categoryId) => {
    setLoading(true);

    try {
      const selectedCategory = rows.find((row) => row.id === categoryId);
      setCategoryName(selectedCategory?.name);
      setSelectedCategoryId(selectedCategory?.id);

      const response = await axios.get(
        `https://spinryte.in/draw/api/Attributes/SingleAttribute/${categoryId}`
      );

      if (response.data.status && response.data.attributes?.length) {
        const newViewData = response.data.attributes;
        setViewData(newViewData);
        localStorage.setItem("viewData", JSON.stringify(newViewData));
        setIsViewPage(true);
      } else {
        setViewData([]);
        alert("No data found for the selected attribute.");
      }
    } catch (error) {
      console.error("Error fetching view data:", error);
      alert("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Add Item Modal open
  const handleAddItemClick = () => {
    setIsAddItemOpen(true);
  };

  // Handle changes in new item form
  const handleAddItemChange = (event) => {
    const { name, value } = event.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  

  // Submit the new item form
  const handleAddItemSubmit = async () => {
    setLoading(true);

    try {
      if (!newItem.name || !newItem.input_type || !newItem.input_values || !newItem.status) {
        alert("Please fill in all fields before adding the item.");
        setLoading(false);
        return;
      }

      const payload = {
        category: selectedCategoryId,
        attributes: [
          {
            name: newItem.name,
            input_type: newItem.input_type,
            input_values: newItem.input_values,
            status: newItem.status,
          },
        ],
      };

      const response = await axios.post(
        "https://spinryte.in/draw/api/Category/create_attribute",
        payload
      );

      if (response.data.status) {
        alert("Item added successfully!");

        const updatedViewData = [
          ...viewData,
          {
            name: newItem.name,
            input_type: newItem.input_type,
            input_values: newItem.input_values,
            status: newItem.status,
          },
        ];

        localStorage.setItem("viewData", JSON.stringify(updatedViewData));
        setViewData(updatedViewData);
        setIsAddItemOpen(false);
        setNewItem({ name: "", input_type: "", input_values: "", status: "" });
      } else {
        alert(response.data.message || "Failed to add item.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add item. Please try again.");
    } finally {
      setLoading(false);
    }
  };
 
// Handle Edit button click
const handleEditClick = (row) => {
  setEditingAttribute(row);
  setNewItem({
    id:row.id,
    name: row.name,
    input_type: row.input_type,
    input_values: row.input_values,
    status: row.status,
  });
  setOpenEditDialog(true);  // Open dialog when edit button is clicked
};

// Handle Save button click in the Edit dialog
const handleEditSave = async () => {
  setLoading(true);

  try {
    if ( !newItem.name || !newItem.input_type || !newItem.input_values || !newItem.status) {
      alert("Please fill in all fields before saving the item.");
      setLoading(false);
      return;
    }

    const payload = {
      id: newItem.id,
      category_id: newItem.category_id,
      name: newItem.name,
      input_type: newItem.input_type,
      input_values: newItem.input_values,
      status: newItem.status,
    };

    console.log("Sending payload:", payload);

    const response = await axios.post(
      "https://spinryte.in/draw/api/Attributes/attribute_update",
      payload
    );

    console.log("API response:", response.data);

    if (response.data.status) {
      alert("Item updated successfully!");

      const updatedViewData = viewData.map((item) =>
        item.id === editingAttribute.id ? { ...item, ...newItem } : item
      );

      localStorage.setItem("viewData", JSON.stringify(updatedViewData));
      setViewData(updatedViewData);
      setOpenEditDialog(false);
      setEditingAttribute(null);
      setNewItem({ id: "", name: "", input_type: "", input_values: "", status: "" });
    } else {
      alert(`Failed: ${response.data.message || "Unknown error"}`);
    }
  } catch (error) {
    console.error("Error occurred while updating:", error.response?.data || error.message);
    alert(`Failed to update item: ${error.response?.data?.message || error.message}`);
  } finally {
    setLoading(false);
  }
};

  

 // Render the edit dialog
 const renderEditDialog = () => (
  <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
    <DialogTitle>Edit Attribute</DialogTitle>
    <DialogContent>
    <TextField
          label="Attribute Name"
          name="name"
          value={newItem.name}
          onChange={handleAddItemChange}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Input Type</InputLabel>
          <Select
            name="input_type"
            value={newItem.input_type}
            onChange={handleAddItemChange}
          >
            <MenuItem value="Dropdown">Dropdown</MenuItem>
            <MenuItem value="Radio button">Radio button</MenuItem>
            <MenuItem value="Text box">Text box</MenuItem>
            <MenuItem value="Date picker">Date picker</MenuItem>
            <MenuItem value="Time picker">Time picker</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Values"
          name="input_values"
          value={newItem.input_values}
          onChange={handleAddItemChange}
          fullWidth
          margin="normal"
          placeholder="Comma-separated values for dropdown (if applicable)"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={newItem.status}
            onChange={handleAddItemChange}
          >
            <MenuItem value="1">Active</MenuItem>
            <MenuItem value="2">Inactive</MenuItem>
          </Select>
        </FormControl>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setOpenEditDialog(false)} color="secondary">Cancel</Button>
      <Button onClick={handleEditSave} color="primary">Save</Button>
    </DialogActions>
  </Dialog>
);


  const renderDetailView = () => (
    <div>
      <Box display="flex" justifyContent="space-between" padding={2} bgcolor="#f5f5f5" boxShadow={1}>
        <Typography variant="h4">{categoryName || "Unknown Category"}</Typography>
      </Box>

      {/* Add Attribute Form */}
      <Box padding={2} bgcolor="#f5f5f5" boxShadow={1} marginBottom={3}>
        <Typography variant="h6" marginBottom={2}>
          Add Attributes
        </Typography>
        <TextField
          label="Attribute Name"
          name="name"
          value={newItem.name}
          onChange={handleAddItemChange}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Input Type</InputLabel>
          <Select
            name="input_type"
            value={newItem.input_type}
            onChange={handleAddItemChange}
          >
            <MenuItem value="Dropdown">Dropdown</MenuItem>
            <MenuItem value="Radio button">Radio button</MenuItem>
            <MenuItem value="Text box">Text box</MenuItem>
            <MenuItem value="Date picker">Date picker</MenuItem>
            <MenuItem value="Time picker">Time picker</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Values"
          name="input_values"
          value={newItem.input_values}
          onChange={handleAddItemChange}
          fullWidth
          margin="normal"
          placeholder="Comma-separated values for dropdown (if applicable)"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={newItem.status}
            onChange={handleAddItemChange}
          >
            <MenuItem value="1">Active</MenuItem>
            <MenuItem value="2">Inactive</MenuItem>
          </Select>
        </FormControl>
        <Box display="flex" justifyContent="flex-end" marginTop={2}>
  <Button
    color="primary"
    variant="contained"
    onClick={editingAttribute ? handleEditSave : handleAddItemSubmit}  
  >
    {editingAttribute ? "Save" : "Add"} {/* Display dynamic text */}
  </Button>
  <Button
    variant="contained"
    color="info"
    onClick={handleAddRow}
    startIcon={<AddIcon />}
    style={{ marginLeft: "10px" }} // Add space between the buttons
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
                    placeholder="Attribute Name"
                    value={attr.name}
                    onChange={(e) =>
                      setNewAttributes(
                        newAttributes.map((item, i) =>
                          i === index ? { ...item, name: e.target.value } : item
                        )
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <InputLabel>Input Type</InputLabel>
                    <Select
                      value={attr.input_type}
                      onChange={(e) =>
                        setNewAttributes(
                          newAttributes.map((item, i) =>
                            i === index
                              ? { ...item, input_type: e.target.value }
                              : item
                          )
                        )
                      }
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
                    placeholder="Enter Values"
                    value={attr.input_values}
                    onChange={(e) =>
                      setNewAttributes(
                        newAttributes.map((item, i) =>
                          i === index
                            ? { ...item, input_values: e.target.value }
                            : item
                        )
                      )
                    }
                  />
                </TableCell>

                {/* Status */}
                <TableCell>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={attr.status}
                      onChange={(e) =>
                        setNewAttributes(
                          newAttributes.map((item, i) =>
                            i === index
                              ? { ...item, status: e.target.value }
                              : item
                          )
                        )
                      }
                    >
                      <MenuItem value="1">Active</MenuItem>
                      <MenuItem value="2">Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>

                {/* Action */}
                <TableCell>
                  <IconButton onClick={() => handleDeleteRow(index)}>
                    <DeleteIcon sx={{ color: "red" }} />
                  </IconButton>
                 
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>SL NO</strong></TableCell>
              <TableCell align="left"><strong>ATTRIBUTE NAME</strong></TableCell>
              <TableCell align="left"><strong>INPUT TYPE</strong></TableCell>
              <TableCell align="left"><strong>VALUES</strong></TableCell>
              <TableCell align="left"><strong>STATUS</strong></TableCell>
              <TableCell align="left"><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {viewData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.input_type}</TableCell>
                <TableCell>{item.input_values}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(item)}>
                    <EditIcon sx={{ color: "blue" }} />
                  </IconButton>
                  
                  <IconButton onClick={() => handleDelete(item.id)} title="Delete">
                  <DeleteIcon sx={{ color: "red" }} />
                </IconButton>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box marginTop={2}>
        <Button onClick={() => setIsViewPage(false)} variant="outlined" color="primary">
          Back to List
        </Button>
      </Box>
    </div>
  );


  const renderListView = () => (
    <div>
      <Box display="flex" justifyContent="space-between" padding={2} bgcolor="#f5f5f5" boxShadow={1}>
        <Typography variant="h4">Attribute List</Typography>
      </Box>
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>SL NO</strong></TableCell>
              <TableCell align="left"><strong>Category</strong></TableCell>
              <TableCell align="center"><strong>ACTIONS</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell align="center">
                  <Button variant="outlined" color="primary" onClick={() => handleViewClick(row.id)}>
                    View
                  </Button>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
  
 {/* Snackbar remains unchanged */}
 <Snackbar
 open={openSnackbar}
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


  return loading ? <CircularProgress /> : (
    <>
      {isViewPage ? renderDetailView() : renderListView()}
      {renderEditDialog()}  {/* Render the edit dialog */}
    </>
  );

 
};
export default AttributePage;




