
import React, { useEffect, useState } from 'react';
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
import {TextField, RadioGroup,FormControlLabel,Radio} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { Autocomplete, Box, Menu, Snackbar, Typography,Grid,FormControl,Select } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { InputLabel } from "@mui/material";
import { useFormik } from 'formik';
import IconButton from '@mui/material/IconButton';



const ProductManagement = () =>{
  const [rows, setRows] = useState([]);
  const [productId, setProductId] = useState(null);
  const [editingItemId, setEditingItemId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCategoryName, setSelectedCategoryName] = useState('');
  const [inputCategory, setInputCategory] = useState('');
  const [statusNumericValue, setStatusNumericValue] = useState(null)
  const [existingImages, setExistingImages] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [openEditImageDialog, setOpenEditImageDialog] = useState(false);
    const [attributes, setAttributes] = useState([]);
    const [newProductId, setNewProductId] = useState(null); // Store product ID

  useEffect(() => {
    fetchProducts();
    fetchCategories();
     fetchAttribute();
  }, []);

  const fetchProducts = () => {
    fetch('https://spinryte.in/draw/api/Product/get_productList')
      .then(response => response.json())
      .then(data => {
        if (data && data.status && data.status === true && data.dataList) {
          setRows(data.dataList);
        } else {
          console.error('Error fetching products: Invalid response format');
        }
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  const fetchCategories = () => {
    axios.get('https://spinryte.in/draw/api/Category/categoryList')
      .then(response => {
        if (response.data && response.data.dataList) {
          setCategories(response.data.dataList);
        } else {
          console.error('Error fetching categories: Invalid response format');
        }
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  };

  const fetchAttribute = async (categoryId) => {
    if (!categoryId) {
      console.error("Error: categoryId is missing or invalid", categoryId);

      return;
    }

    try {
      console.log("Fetching attributes for categoryId:", categoryId);
      const response = await axios.get(`https://spinryte.in/draw/api/Attributes/FetchAttribute/${categoryId}`);

      console.log("API Response:", response.data);

      if (response.data?.status && response.data?.attributes) {
        setAttributes(response.data.attributes);
      } else {
        setAttributes([]);
        console.error("Invalid API response format:", response.data);
      }
    } catch (error) {
      console.error("API Request Failed:", error.response?.data || error.message);
      setAttributes([]);
    }
  };

  useEffect(() => {
    console.log("Selected Category:", selectedCategory);
    if (selectedCategory) {
      fetchAttribute(selectedCategory);
    } else {
      console.error("Error: selectedCategory is missing");
    }
  }, [selectedCategory]);


  const [openDialog, setOpenDialog] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const [statusMenuAnchor, setStatusMenuAnchor] = useState(null);
  const [openAddImageDialog, setOpenAddImageDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDeleteClick = (id) => {
    setOpenDeleteDialog(true);
    setEditingItemId(id);
  };

  const handleDeleteConfirm = async () => {
    if (editingItemId) {
      try {
        const response = await axios.post(`https://spinryte.in/draw/api/Product/product_delete`, { id: editingItemId });


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

  const formik = useFormik({
    initialValues: {
      id: '',
      name: '',
      description: '',
      price: '',
      status: '',
      category: '',
      productImage: [],
      attributes: {},
    },

    onSubmit: async (values) => {
      console.log("Submitting form values:", values);

      const formattedAttributes = Object.keys(values.attributes).map((atr_id) => ({
        id: Number(atr_id),
        input_values: values.attributes[atr_id] || "",
      }));

      const productData = {
        id: editItemId || "",
        name: values.name,
        description: values.description,
        price: values.price,
        category: selectedCategory || values.category,
        status: values.status === "Active" ? "1" : "2",
        attributes: formattedAttributes,
      };

      console.log("Final product data being sent:", productData);

      try {
        let response;
        if (editItemId) {
          response = await axios.post(
           ` https://spinryte.in/draw/api/Product/update_product/${editItemId},
            productData`
          );
          console.log("Update response:", response.data);
          showMessage("Product Updated successfully");
        } else {
          response = await axios.post(
            "https://spinryte.in/draw/api/Product/create_product",
            productData
          );
          console.log("Create response:", response.data);
          showMessage("Product Added successfully");

          const createdProductId = response.data.output?.product_id;
          if (createdProductId) {
            setNewProductId(createdProductId);
            formik.setFieldValue("id", createdProductId);
            setOpenAddImageDialog(true);
          }
        }

        handleDialogClose();
        fetchProducts();
      } catch (error) {
        console.error("Error adding/updating product:", error.response?.data || error.message);
        showMessage("Product Add/Update Failed");
      }
    },
  });


  const handleAttributeChange = (attributeId, value) => {
    formik.setValues((prevValues) => ({
      ...prevValues,
      attributes: {
        ...prevValues.attributes,
        [attributeId]: value,
      },
    }));
  };

  const handleDialogClose = () => {
    setEditItemId(null);
    setOpenDialog(false);
    formik.resetForm();
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleStatusMenuOpen = (event) => {
    setStatusMenuAnchor(event.currentTarget);
  };

  const handleAddImage = () => {
    if (formik.values.productImage.length < 5) {
      formik.setValues((prevValues) => ({
        ...prevValues,
        productImage: [...prevValues.productImage, '']
      }));
    } else {
      showMessage('Maximum 5 images allowed.');
    }
  };

  const handleUploadClick = async () => {
    const productId = formik.values.id || newProductId;
    console.log("Uploading images for Product ID:", productId);

    if (!productId) {
      showMessage("Error: Product ID is missing. Cannot upload images.");

      return;
    }

    const imagesToUpload = (formik.values.productImage || []).filter(image => image instanceof File);
    if (imagesToUpload.length === 0) {
      showMessage("No valid images selected for upload.");

      return;
    }

    try {
      const formData = new FormData();
      imagesToUpload.forEach((image, index) => {
        formData.append(`productImage[${index}]`, image);
      });

      formData.append("product_id", productId);

      const response = await axios.post(
        "https://spinryte.in/draw/api/Product/image_upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );

      console.log("Image Upload Response:", response.data);

      if (response.data.status) {
        showMessage("Images uploaded successfully!");
        setOpenAddImageDialog(false);
        fetchProducts();
      } else {
        showMessage("Image upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      showMessage("Error uploading images. Please check the console for details.");
    }
  };


  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    console.log("Selected Files:", files);


    formik.setValues((prevValues) => ({
      ...prevValues,
      productImage: [...prevValues.productImage, ...files],
    }));
  };


  const handleImageChange = (imageUrl, index) => {
    console.log(imageUrl)
    console.log(index)
  };

  const associateImagesWithProduct = (productId) => {
    setProductId(productId);
    const imagesToUpload = formik.values.productImage.filter(productImage => typeof productImage === 'object');
    if (imagesToUpload.length > 0) {
      const formData = new FormData();
      imagesToUpload.forEach((productImage, index) => {
        formData.append('images', productImage);
      });
      formData.append('product_id', productId);
      axios.post(`https://spinryte.in/draw/api/Product/image_upload, formData`)
        .then(response => {
          showMessage('Images Uploaded ');
          setOpenAddImageDialog(false)
        })
        .catch(error => {
          console.error('Error uploading images:', error);
          showMessage('Error uploading images');
        });
    }
  };
console.log (productId)

const handleImageSelection = (index) => {
  const updatedImages = formik.values.productImage.map((image, i) => ({
    ...image,
    selected: i === index,
  }));
  formik.setValues((prevValues) => ({
    ...prevValues,
    productImage: updatedImages,
  }));
};


  const handleCategorySearch = (inputValue) => {
    axios.get(`https://spinryte.in/draw/api/Category/categoryList?name=${inputValue}`)
      .then(response => {
        if (response.data && response.data.dataList) {
          setCategories(response.data.dataList);
        } else {
          console.error('Error fetching categories: Invalid response format');
        }
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  };



  const handleCategorySelect = async (categoryId) => {
    setSelectedCategory(categoryId);
    formik.setFieldValue("category", categoryId); // Ensure category is updated in Formik

    try {
      const response = await axios.get(`https://spinryte.in/draw/api/Attributes/FetchAttribute/${categoryId}`);

      if (response.data && response.data.status) {
        const fetchedAttributes = response.data.attributes || [];

        // Ensure input_values are formatted correctly
        const processedAttributes = fetchedAttributes.map(attr => ({
          ...attr,
          input_values: typeof attr.input_values === "string"
            ? attr.input_values.split(",")
            : Array.isArray(attr.input_values)
            ? attr.input_values
            : [],
        }));

        // Initialize formik attributes state
        const initialAttributes = {};
        processedAttributes.forEach(attr => {
          initialAttributes[attr.id] = ""; // Default empty value
        });

        setAttributes(processedAttributes);
        await formik.setFieldValue("attributes", initialAttributes); // Ensure Formik updates correctly
      } else {
        console.error("No attributes found for this category");
        setAttributes([]);
        await formik.setFieldValue("attributes", {}); // Reset attributes
      }
    } catch (error) {
      console.error("Error fetching attributes:", error.response?.data || error.message);
      setAttributes([]);
      await formik.setFieldValue("attributes", {}); // Reset attributes on error
    }
  };

  const handleStatusMenuClose = (value) => {
    formik.setFieldValue("status", value);
    setStatusMenuAnchor(null);
  };

  const handleEditClick = async (productId) => {
    try {
      const response = await axios.get(`https://spinryte.in/draw/api/Product/single_view/${productId}`);
      const productDetails = response.data;

      if (productDetails && productDetails.dataList) {
        const {
          id, name, description, price, created_at, status,
          category_id, attributes, product_images
        } = productDetails.dataList;

        // Fetch attributes based on the selected category
        const attrResponse = await axios.get(`https://spinryte.in/draw/api/Attributes/FetchAttribute/${category_id}`);
        const fetchedAttributes = attrResponse.data.attributes || [];

        // Map attributes
        const attributeValues = {};
        fetchedAttributes.forEach(attr => {
          const productAttr = attributes.find(pa => pa.id === attr.id);
          attributeValues[attr.id] = productAttr?.input_values || attr.input_values[0] || "";
        });

        // Set form values including images
        formik.setValues({
          id,
          name,
          description,
          price,
          created_at: created_at || '',
          status: status === 'Active' ? 1 : 2,
          category: category_id,
          productImage: product_images.map(image => ({ id: image.id, url: image.image })), // Set images
          attributes: attributeValues,
        });

        setExistingImages(product_images.map(image => ({ id: image.id, url: image.image })));

        // Open Image Edit Dialog first
        setEditItemId(id);
        setOpenEditImageDialog(true); // Open Edit Image Section First
        setSelectedCategory(category_id);
        setOpenDialog(true);
        setAttributes(fetchedAttributes);
      } else {
        showMessage("Error fetching product details: Product details not found");
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      showMessage("Error fetching product details");
    }
  };


  const placeholderImage = 'https://dummyimage.com/600x400/000/fff';

  const removeImage = async (imageId, index) => {
    if (!imageId) {
      // If no imageId, it's a new (unsaved) image, just remove it from UI
      formik.setFieldValue(
        "productImage",
        formik.values.productImage.filter((_, i) => i !== index)
      );

      return;
    }

    try {
      console.log("Removing image ID:", imageId); // Debugging

      const response = await axios.post("https://spinryte.in/draw/api/Product/remove_image", {
        id: imageId, // Ensure correct request format
      });

      console.log("API Response:", response.data);

      if (response.data.status) {
        showMessage("Image removed successfully");
        formik.setFieldValue(
          "productImage",
          formik.values.productImage.filter((_, i) => i !== index)
        );
      } else {
        showMessage("Failed to remove image from server.");
      }
    } catch (error) {
      console.error("Error removing image:", error);
      showMessage("Error removing image. Please try again.");
    }
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);


    axios.get(`https://spinryte.in/draw/api/Product/get_productList?name=${value}`)
      .then(response => {
        if (response.data && response.data.status && response.data.dataList) {
          // Filter the rows based on the search query
          const filteredRows = response.data.dataList.filter(row => row.name.toLowerCase().includes(value.toLowerCase()));
          setRows(filteredRows);
        } else {
          console.error('Error fetching products: Invalid response format');
        }
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

 

  return (
    <div style={{ margin: '20px', marginLeft: 'auto', marginRight: 'auto' }}>
      <TableContainer component={Paper}>
        <Button
          variant="contained"
          color="primary"
          style={{ float: 'right', margin: '10px' }}
          onClick={() => setOpenDialog(true)}
        >
          Add Item
        </Button>
        <TextField
          label="Search by Name"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ marginBottom: '20px' }}
        />
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead >
            <TableRow>
              <TableCell>SL NO</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Images</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Category </TableCell>
              <TableCell>Actions</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, id) => (
              <TableRow
                key={id}
                sx={{
                  '&:last-of-type td, &:last-of-type th': {
                    border: 0,
                  },
                }}
              >
                <TableCell component="th" scope="row">
                     {id + 1}
                 </TableCell>
                 <TableCell>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell align="right">
                <img
                  src={row.image ? row.image : placeholderImage} // Use placeholderImage when no image is available
                  alt={row.name || 'No Image'}
                  style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '6px' }}
                />
              </TableCell>
                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="center">{row.category}</TableCell>
                <TableCell>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil-square"
                    viewBox="0 0 16 16"
                    style={{ color: 'blue', cursor: 'pointer', marginRight: '8px' }}
                    onClick={() => handleEditClick(row.id)}
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash3"
                    viewBox="0 0 16 16"
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => handleDeleteClick(row.id)}
                  >
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                  </svg>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openDialog} onClose={handleDialogClose} fullScreen>
     <DialogTitle>{editItemId ? "Edit Item" : "Add New Item"}</DialogTitle>
  <DialogContent>
    <Box component={Paper} sx={{ padding: 4, paddingBottom: 8 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box></Box>
      
          <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={3} mb={3}>
              <h1 style={{ margin: 0 }}>{editItemId ? "Edit Product" : "Add Product"}</h1>
              <Button variant="contained" style={{ backgroundColor: "#FF007F" }} onClick={handleDialogClose}>
                Back
              </Button>
            </Box>
            <hr />
            <TextField label="Product Name" id="name" fullWidth {...formik.getFieldProps("name")} />
            <TextField label="Description" id="description" fullWidth {...formik.getFieldProps("description")} />
            <TextField label="Price" id="price" fullWidth {...formik.getFieldProps("price")} />
            
            {/* Status Dropdown */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Status *</InputLabel>
              <Select value={formik.values.status} onChange={formik.handleChange} name="status">
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>

           {/* Category Dropdown */}
           <Box mt={1} mb={2}>
              <h1 style={{ fontWeight: "300" }}>Category:</h1>
              <FormControl fullWidth>
                <InputLabel>Select Category</InputLabel>
                <Select value={selectedCategory || ""} onChange={(e) => handleCategorySelect(e.target.value)}>
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            
            {/* Dynamic Attributes Form */}
            <Grid container spacing={3}>
              {attributes.length > 0 ? (
                attributes.map((attr) => (
                  <Grid item xs={12} sm={6} key={attr.id}>
                    <FormControl fullWidth>
                      <h3>{attr.name}</h3>
                      {attr.input_type === "Text box" && (
                        <TextField placeholder="Enter value" variant="outlined" fullWidth {...formik.getFieldProps(`attributes.${attr.id}`)} />
                      )}
                      {attr.input_type === "Dropdown" && (
                        <Select {...formik.getFieldProps(`attributes.${attr.id}`)}>
                          {attr.input_values.map((value, index) => (
                            <MenuItem key={index} value={value}>{value}</MenuItem>
                          ))}
                        </Select>
                      )}
                      {attr.input_type === "Radio button" && (
                        <RadioGroup {...formik.getFieldProps(`attributes.${attr.id}`)}>
                          {attr.input_values.map((value, index) => (
                            <FormControlLabel key={index} value={value} control={<Radio />} label={value} />
                          ))}
                        </RadioGroup>
                      )}
                      {attr.input_type === "Date picker" && (
                        <TextField type="date" variant="outlined" fullWidth {...formik.getFieldProps(`attributes.${attr.id}`)} />
                      )}
                      {attr.input_type === "Time picker" && (
                        <TextField type="time" variant="outlined" fullWidth {...formik.getFieldProps(`attributes.${attr.id}`)} />
                      )}
                    </FormControl>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <p>No attributes available</p>
                </Grid>
              )}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  </DialogContent>
  
  <DialogActions>
  <Button 
    variant="outlined" 
    onClick={handleDialogClose} 
    color="secondary"
  >
    Cancel
  </Button>

  <Button
    variant="contained"
    color="primary"
    onClick={() => {
      formik.validateForm().then((errors) => {
        if (Object.keys(errors).length === 0) {
          formik.handleSubmit();
        }
      });
    }}
    disabled={formik.isSubmitting}
  >
    {formik.isSubmitting ? "Saving..." : "Save"}
  </Button>
</DialogActions>
 </Dialog>
  
{/*Add image*/}

<div style={{ margin: '20px', marginLeft: 'auto', marginRight: 'auto' }}>
<Dialog open={openAddImageDialog} onClose={() => setOpenAddImageDialog(false)} maxWidth="sm">
  <DialogTitle>Add Images</DialogTitle>
  <DialogContent>
    <div>
      <p>Product ID: {newProductId || "Not Available"}</p> {/* Debugging: Show ID */}
      {(formik.values.productImage || []).map((image, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <img
            src={image instanceof File ? URL.createObjectURL(image) : image.url || image.id}
            alt={`Product Image ${index + 1}`}
            style={{ width: "100px", height: "auto" }}
          />
          <Button
            onClick={() => removeImage(image.id || null, index)}
            color="secondary"
          >
            Remove Image
          </Button>
        </div>
      ))}
      <input
        type="file"
        name="images"
        accept="image/*"
        multiple
        onChange={handleFileUpload}
      />
      <Button onClick={handleUploadClick} color="primary">
        Upload Images
      </Button>
    </div>
  </DialogContent>
</Dialog>
      </div>
      
      {/*Edit image*/}

      <div style={{ margin: '20px', marginLeft: 'auto', marginRight: 'auto' }}>
      <Dialog open={openEditImageDialog} onClose={() => setOpenEditImageDialog(false)} maxWidth="sm">
  <DialogTitle>Edit Images</DialogTitle>
  <DialogContent>
    <div>
      {existingImages.map((image, index) => (
        <div key={image.id} style={{ marginBottom: '10px' }}>
          <img src={image.url} alt={`Product Image ${index + 1}`} style={{ width: "100px", height: "auto" }} />
          <Button onClick={() => removeImage(image.id, index)} color="secondary">
            Remove Image
          </Button>
        </div>
      ))}
      <input type="file" name="newImages" accept="image/*" multiple onChange={handleFileUpload} />
      <Button onClick={handleUploadClick} color="primary">
        Upload New Images
      </Button>
    </div>
  </DialogContent>
</Dialog>

      </div>
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Delete Item</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this item?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="success">
          {message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default ProductManagement;

