import React, { useState, useEffect } from 'react';
import NavbarPage from '../../Layouts/NavbarPage';
import DataTable from 'react-data-table-component';
import useGetProduct from '../../Hook/useGetProduct';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ReplayIcon from '@mui/icons-material/Replay';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import Checkbox from '@mui/material/Checkbox';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FilterListIcon from '@mui/icons-material/FilterList';
import { apiDeleteProduct, apiEditProduct, apiPostProduct } from '../../Api/apiProducts';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  width: '510px',
  alignItems: 'center',
};

const Products = () => {
  const [data, setData] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [errors, setErrors] = useState({ title: '', price: '', description: '', categoryId: '', images: '' });
  const [successAdd, setSuccessAdd] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [successEdit, setSuccessEdit] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    description: '',
    categoryId: '',
    images: ''
  });
  
  const [sortDirection, setSortDirection] = useState(null);
  const [originalProduct, setOriginalProduct] = useState(null);
  const { mutate: fetchProducts } = useGetProduct();

  useEffect(() => {
    fetchProducts(
      {},
      {
        onSuccess: (response) => {
          console.log('product response is: ', response);
          setData(response);
          setOriginalProduct([...response]);
        },
        onError: (error) => {
          console.error('Error fetching categories is:', error);
        },
      }
    );
  }, [fetchProducts]);

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => {
    setNewProduct({ title: '', price: '', description: '', categoryId: '', images: '' });
    setErrors({ title: '', price: '', description: '', categoryId: '', images: '' });
    setOpenAdd(false);
  }
    const handleOpenDelete = (product) => {
      if (product) {
          setProductToDelete(product);
          setOpenDelete(true);
      } else {
          console.error('Selected product is undefined');
      }
  };
  
  const handleCloseDelete = () => setOpenDelete(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };
  const handleOpenEdit = (row, index) => {
    setEditingIndex(index)
    setNewProduct({ ...row })
    setOpenEdit(true)

  }
  const handleCloseEdit = () => {
    setNewProduct({ title: '', price: '', description: '', categoryId: '', images: '' })
    setErrors({ title: '', price: '', description: '', categoryId: '', images: '' })
    setOpenEdit(false)
  }
  const validate = () => {
    let valid = true;
    const errors = { title: '', price: '', description: '', categoryId: '', images: '' };
    if (!newProduct.title) {
      errors.title = 'Title is required';
      valid = false;
    }
    if (!newProduct.price) {
      errors.price = 'Price is required';
      valid = false;
    }
    if (!newProduct.description) {
      errors.description = 'Description is required';
      valid = false;
    }
    if (!newProduct.categoryId) {
      errors.categoryId = 'CategoryId is required';
      valid = false;
    }
    
    else if (isNaN(newProduct.categoryId)) {
      errors.categoryId = 'categoryId must be a number';
      valid = false;
    }
  
    setErrors(errors);
    return valid;
  };
  const editProductValidate = () => {
    let valid = true;
    const errors = { title: '', price: '' }
    if (!newProduct.title) {
      errors.title = 'Title is required';
      valid = false;
    } else if (!newProduct.price) {
      errors.price = 'Price is Required'
      valid = false
    }
    setErrors(errors)
    return valid;
  }
  const handleAddProduct = () => {
    if (validate()) {
        const productData = {
            ...newProduct,
            title: newProduct.title,
            price: parseFloat(newProduct.price),
            description: newProduct.description,
            categoryId: parseInt(newProduct.categoryId, 10),
            images: [newProduct.images],
        };

        if (!productData.categoryId) {
            console.error('CategoryId is missing or invalid. Please provide a valid CategoryId.');
            setErrors((prevErrors) => ({
                ...prevErrors,
                categoryId: 'CategoryId is required and must be valid.',
            }));
            return;
        }

        console.log('Sending product data:', productData);

        apiPostProduct(productData)
            .then((addProduct) => {
                console.log('Product added successfully:', addProduct);
                setData((prevData) => [...prevData, addProduct]); 
                setSuccessAdd(true);
                setTimeout(() => setSuccessAdd(false), 3000);
            })
            .catch((error) => {
                console.error('Error adding product:', error);
            });

        handleCloseAdd();
    }
};


  
  
  
  


  const handleEditProduct = () => {
    // const productData = {
    //   ...newProduct,
    //   title : newProduct.title,
    //   price: parseFloat(newProduct.price),
      
      
    // };
    if (editProductValidate()) {
      if (editingIndex !== null && data[editingIndex]) {
        const updatedProduct = { ...data[editingIndex], title : newProduct.titel , price: newProduct.price };
        apiEditProduct(data[editingIndex].id, updatedProduct)
          .then(() => {
            const updatedData = [...data];
            updatedData[editingIndex] = updatedProduct;
            setData(updatedData);
            setSuccessEdit(true);
            setTimeout(() => setSuccessEdit(false), 3000);
          })
          .catch((error) => {
            console.error('Error updating product:', error);
          });
      }
      handleCloseEdit();
      setNewProduct({ title: '', price: '', description: '', categoryId: '', images: '' });
      setErrors({ title: '', price: '', description: '', categoryId: '', images: '' });
    }
  };

  const handleDelete = () => {
    if (productToDelete && productToDelete.id ) {
      console.log("Deleting product title is: ",productToDelete.title);
      console.log("Deleting product Id is:",productToDelete.id);
      apiDeleteProduct(productToDelete.id)
        .then(() => {
          setData(data.filter((item) => item !== productToDelete));
          setSuccessDelete(true);
          setTimeout(() => setSuccessDelete(false), 3000);
          handleCloseDelete();
        })
        .catch((error) => {
          console.error('Error deleting Product:', error);
        });
    } else {
      console.error('productToDelete or productToDelete.id is undefined');
    }

  }
  // const editInput = (row, index) => {
  //   setNewProduct(row);
  //   setEditingIndex(index);
  //   setOpenAdd(true);
  // };

  const handleSort = () => {
    if (sortDirection === 'asc') {
      setSortDirection('desc');
      setData([...data].sort((a, b) => b.title.localeCompare(a.title)));
    } else if (sortDirection === 'desc') {
      setSortDirection(null);
      setData([...originalProduct]);
    } else {
      setSortDirection('asc');
      setData([...data].sort((a, b) => a.title.localeCompare(b.title)));
    }
  };

  const handleReset = (index) => {
    const updatedData = [...data]
    updatedData[index] = originalProduct[index]
    setData(updatedData);
    setNewProduct({ title: '', price: '' });
    setEditingIndex(null);
  };

  const columns = [
    {
      name: '',
      selector: row => <Checkbox onChange={() => setSelectedRow(row)} />,
      sortable: false,
      width: '70px',
    },
    {
      name: (
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleSort}>
          title
          {sortDirection === 'asc' ? (
            <ArrowUpwardIcon fontSize="small" style={{ marginLeft: 4 }} />
          ) : (
              <ArrowDownwardIcon fontSize="small" style={{ marginLeft: 4 }} />
            )}
        </div>
      ),
      selector: row => row.title,
      sortable: false,
    },
    {
      name: 'Price',
      selector: row => row.price,
    },
    {
      name: 'UpdatedAt',
      selector: row => row.updatedAt,
    },
    {
      name: 'Description',
      selector: row => row.description,
    },
    {
      name: 'CategoryId',
      selector: row => row.categoryId,
    },
    {
      name: 'Images',
      selector: row => <img src={row.images} alt={row.name} style={{ width: '100px', height: '100px' }} />,
    },
    {
      name: 'Action',
      selector: (row, index) => (
        <div>
          <DeleteIcon style={{ color: 'red', fontSize: '20px' }} onClick={() => handleOpenDelete(row)} />
          <EditIcon style={{ color: 'gray', fontSize: '20px' }} onClick={() => handleOpenEdit(row, index)} />
          <ReplayIcon style={{ color: 'black', fontSize: '20px' }} onClick={() => handleReset(index)} />
        </div>
      ),
    },
  ];

  return (
    <>
      <NavbarPage />
      <div style={{ display: 'flex', gap: '50px', justifyContent: 'center' }}>
        <Button onClick={handleOpenAdd} style={{ backgroundColor: 'blue', color: 'white', marginTop: '15px' }}>
          Add Product
        </Button>
      </div>
      <Modal keepMounted open={openAdd} onClose={handleCloseAdd} aria-labelledby="keep-mounted-modal-title" aria-describedby="keep-mounted-modal-description">
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2" style={{ marginLeft: '30px' }}>
            <ProductionQuantityLimitsIcon />{editingIndex !== null ? 'Edit Product' : 'Add Product'}
          </Typography>
          <Typography id="keep-mounted-modal-description" style={{ display: 'block', alignItems: 'center', marginLeft: '30px' }}>
            <TextField id="outlined-basic" label="* title" variant="outlined" placeholder="please enter title" name="title" value={newProduct.title} onChange={handleInputChange} style={{ marginTop: '25px' }} />
            {errors.title && <Typography color="error">{errors.title}</Typography>}
            <TextField id="outlined-basic" label="* price" variant="outlined" placeholder="please enter price" name="price" value={newProduct.price} onChange={handleInputChange} style={{ marginTop: '25px' }} />
            {errors.price && <Typography color="error">{errors.price}</Typography>}
            <TextField id="outlined-basic" label="*description" variant="outlined" placeholder="please enter description" name="description" value={newProduct.description} onChange={handleInputChange} style={{ marginTop: '25px' }} />
            {errors.description && <Typography color="error">{errors.description}</Typography>}

            <TextField id="outlined-basic" label="*categoryId" variant="outlined" placeholder="please enter categoryId" name="categoryId" value={newProduct.categoryId } onChange={handleInputChange} style={{ marginTop: '25px' }} />
            {errors.categoryId && <Typography color="error">{errors.categoryId}</Typography>}
            <TextField id="outlined-basic" label="*images" variant="outlined" placeholder="please enter images" name="images" value={newProduct.images} onChange={handleInputChange} style={{ marginTop: '25px' }} />
            {errors.images && <Typography color="error">{errors.images}</Typography>}
            <Typography style={{ display: 'flex', gap: '10px', marginTop: '20px', alignItems: 'center', justifyContent: 'center' }}>
              <Button variant="contained" style={{ width: '170px' }} onClick={handleAddProduct}> Record </Button>
              <Button variant="outlined" style={{ width: '170px' }} onClick={handleCloseAdd}> Exit </Button>
            </Typography>
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openDelete}>
          <Box sx={style}>
            <Typography id="delete-modal-title" variant="h6" component="h2">
              <DeleteForeverIcon /> Delete Product
            </Typography>
            <Typography id="delete-modal-description" sx={{ mt: 2 }}>
              Are you sure you want to delete {productToDelete?.id}?
            </Typography>

            <Stack direction="row" spacing={2} mt={2}>
              <Button variant="contained" color="error" onClick={handleDelete}>  Delete  </Button>  <Button variant="outlined" onClick={handleCloseDelete}>  Cancel </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
      <Modal open={openEdit} onClose={handleCloseEdit} aria-labelledby="edit-category-modal">
        <Box sx={style}>
          <Typography id="edit-category-modal" variant="h6" component="h2">
            <EditIcon /> Edit Product
              </Typography>
          <Typography id="modal-description" style={{ display: "block", alignItems: "center", marginLeft: "30px" }}>
            <TextField id="title" label="* title" variant="outlined" placeholder="enter title" style={{ marginTop: "25px" }} onChange={handleInputChange} value={newProduct.title} name="title" />
            {errors.title && <Typography color="error">{errors.title}</Typography>}
            <TextField id="price" label="* price" variant="outlined" placeholder="enter price" style={{ marginTop: "25px" }} onChange={handleInputChange} value={newProduct.price} name="price" />
            {errors.price && <Typography color="error">{errors.price}</Typography>}
            <Typography style={{ display: "flex", gap: "10px", marginTop: "20px", alignItems: "center", justifyContent: "center" }}>
              <Button variant="contained" style={{ width: "170px" }} onClick={handleEditProduct}>Record change</Button>
              <Button variant="outlined" style={{ width: "170px" }} onClick={handleCloseEdit}>Cancel</Button>
            </Typography>
          </Typography>
        </Box>
      </Modal>
      {successAdd && <Alert severity="success">Product added successfully!</Alert>}
      {successDelete && <Alert severity="error">Product deleted successfully!</Alert>}
      {successEdit && <Alert severity="info">Product updated successfully!</Alert>}
      <DataTable columns={columns} data={data} />
    </>
  );
};

export default Products;
