import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import NavbarPage from '../../Layouts/NavbarPage';
import useGetCategories from '../../Hook/useGetCategories';
import { apiDeleteCategory, apiEditCategory, apiPostCategory } from '../../Api/apiCategories';
import Backdrop from '@mui/material/Backdrop';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Fade from '@mui/material/Fade';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ReplayIcon from '@mui/icons-material/Replay';
import CategoryIcon from '@mui/icons-material/Category';
import Alert from '@mui/material/Alert';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  width: '510px',
  alignItems: 'center',
};

const Categories = () => {
  const [data, setData] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [errors, setErrors] = useState({ name: "", image: "" });
  const [successAdd, setSuccessAdd] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [sortDirection, setSortDirection] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [successEdit, setSuccessEdit] = useState(false);
  const [newCategories, setNewCategories] = useState({ name: "", image: "" });
  const [originalRow, setOriginalRow] = useState(null);
  const [originalData, setOriginalData] = useState([]);

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => {
    setNewCategories({ name: "", image: "" });
    setErrors({ name: "", image: "" });
    setOpenAdd(false);
  };

  const handleOpenDelete = (category) => {
    setCategoryToDelete(category);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => setOpenDelete(false);
  const handleOpenEdit = (row, index) => {
    setEditingIndex(index);
    setNewCategories({ ...row });
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setNewCategories({ name: "", image: "" });
    setErrors({ name: "", image: "" });
    setOpenEdit(false);
  }

  const { mutate: fetchCategories } = useGetCategories();

  useEffect(() => {
    fetchCategories({}, {
      onSuccess: (response) => {
        console.log("categories response is:", response);
        setData(response);
        setOriginalData(response);
      },
      onError: (error) => {
        console.error("Error fetching categories:", error);
      },
    });
  }, [fetchCategories]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCategories((prevCategories) => ({
      ...prevCategories,
      [name]: value,
    }));
  };
  
  const validate = () => {
    let valid = true;
    const errors = { name: "", image: "" };

    if (!newCategories.name) {
      errors.name = "Name is required";
      valid = false;
    }
    if (!newCategories.image) {
      errors.image = "Image is required";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };


  const editValidate = () => {
    let valid = true;
    const error = { name: '' };
    if (!newCategories.name) {
      error.name = "Name is Required";
      valid = false;
    }
    setErrors(error); 
    return valid; 
  };

  const handleAddInput = () => {

    if (validate()) {
      console.log("Sending data:", newCategories);
      apiPostCategory(newCategories)
        .then((addCategory) => {
          console.log("Category added:", addCategory);
          setData(prevData => [...prevData, addCategory]);
          setSuccessAdd(true);
          setTimeout(() => setSuccessAdd(false), 3000);
        })
        .catch((error) => {
          console.error("Error adding category:", error);
        });
    } else {
      console.log("Not Add Post Category");
    }
    
    handleCloseAdd();
  };



  const handleEditInput = () => {
    if (editValidate()) {
      if (editingIndex !== null && data[editingIndex]) {
        const updatedCategory = { ...data[editingIndex], name: newCategories.name };

        apiEditCategory(data[editingIndex].id, updatedCategory)
          .then((updatedCategory) => {
            const updatedData = [...data];
            updatedData[editingIndex] = updatedCategory;
            setData(updatedData);
            setSuccessEdit(true);
            setTimeout(() => setSuccessEdit(false), 3000);
          })
          .catch((error) => {
            console.error("Error updating category:", error);
          });
      }

      handleCloseEdit();
      setNewCategories({ name: '' })
      setErrors({ name: '' })

    }
  };

  const handleDelete = () => {
    if (categoryToDelete) {
      apiDeleteCategory(categoryToDelete.id)
        .then(() => {
          setData(data.filter((item) => item.id !== categoryToDelete.id));
          setSuccessDelete(true);
          setTimeout(() => setSuccessDelete(false), 3000);
          handleCloseDelete();
          console.log("Category to delete:", categoryToDelete);
        })
        .catch((error) => {
          console.error("Error deleting category:", error);
        });
    }
  };

  const handleSort = () => {
    if (sortDirection === 'asc') {
      setSortDirection('desc');
      setData([...data].sort((a, b) => b.name.localeCompare(a.name)));
    } else if (sortDirection === 'desc') {
      setSortDirection(null);
    } else {
      setSortDirection('asc');
      setData([...data].sort((a, b) => a.name.localeCompare(b.name)));
    }
  };

  const handleReset = (index) => {
    const updatedData = [...data]
    updatedData[index] = originalData[index]
    setData(updatedData);
    setNewCategories({ name: "", image: "" });
    setEditingIndex(null);
  };

  const columns = [
    {
      name: "",
      selector: row => <Checkbox onChange={() => setSelectedRow(row)} />,
      sortable: false,
      width: "70px"
    },
    {
      name: (
        <div
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={handleSort}
        >
          name
          {sortDirection === 'asc' ? (
            <ArrowUpwardIcon fontSize="small" style={{ marginLeft: 4 }} />
          ) : (
              <ArrowDownwardIcon fontSize="small" style={{ marginLeft: 4 }} />
            )}
        </div>
      ),
      selector: row => row.name,
      sortable: false
    },
    {
      name: "image",
      selector: row => <img src={row.image} alt={row.name} style={{ width: "100px", height: "100px" }} />
    },
    {
      name: "action",
      selector: (row, index) => (
        <div>
          <DeleteIcon style={{ color: "red", fontSize: "20px" }} onClick={() => handleOpenDelete(row)} />
          <EditIcon style={{ color: "gray", fontSize: "20px" }} onClick={() => handleOpenEdit(row, index)} />
          <ReplayIcon style={{ color: "black", fontSize: "20px" }} onClick={() => handleReset(index)} />
        </div>
      )
    }
  ];

  return (
    <>
      <NavbarPage />
      <div style={{ display: "flex", gap: "50px", justifyContent: "center" }}>
        <Stack spacing={2} direction="row" style={{ marginTop: "10px" }}>
          <Button onClick={handleOpenAdd} style={{ backgroundColor: "blue", color: "white" }}>Add Categories</Button>
          <Modal open={openAdd} onClose={handleCloseAdd} aria-labelledby="add-category-modal">
            <Box sx={style}>
              <Typography id="add-category-modal" variant="h6" component="h2" style={{ marginLeft: "30px" }}>
                <CategoryIcon /> Add Categories
              </Typography>
              <Typography id="modal-description" style={{ display: "block", alignItems: "center", marginLeft: "30px" }}>
                <TextField id="name" label="* name" variant="outlined" placeholder="please enter name" style={{ marginTop: "25px" }} onChange={handleInputChange} value={newCategories.name} name="name" />
                {errors.name && <Typography color="error">{errors.name}</Typography>}
                <TextField
                  id="image"
                  label="* image src"
                  variant="outlined"
                  placeholder="Please enter image URL"
                  style={{ marginTop: "25px" }}
                  onChange={handleInputChange}
                  value={newCategories.image}
                  name="image"
                />
                {errors.image && <Typography color="error">{errors.image}</Typography>}
                <Typography style={{ display: "flex", gap: "10px", marginTop: "20px", alignItems: "center", justifyContent: "center" }}>
                  <Button variant="contained" style={{ width: "170px" }} onClick={handleAddInput}>Record</Button>
                  <Button variant="outlined" style={{ width: "170px" }} onClick={handleCloseAdd}>Exit</Button>
                </Typography>
              </Typography>
            </Box>
          </Modal>
          <Modal open={openDelete} onClose={handleCloseDelete} aria-labelledby="delete-category-modal" closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 500 } }}>
            <Fade in={openDelete}>
              <Box sx={style}>
                <Typography id="delete-category-modal" variant="h6" component="h2">
                  <DeleteForeverIcon /> Delete Categories
                </Typography>
                <Typography id="delete-modal-description" sx={{ mt: 2 }}>Are you sure you want to delete {categoryToDelete?.name}?</Typography>
                <Stack direction="row" spacing={2} style={{ marginTop: "2px", alignItems: "center" }}>
                  <Button variant="contained" color="error" onClick={handleDelete}>Yes</Button>
                  <Button variant="outlined" onClick={handleCloseDelete}>No, I don't want to</Button>
                </Stack>
              </Box>
            </Fade>
          </Modal>
          <Modal open={openEdit} onClose={handleCloseEdit} aria-labelledby="edit-category-modal">
            <Box sx={style}>
              <Typography id="edit-category-modal" variant="h6" component="h2">
                <EditIcon /> Edit Categories
              </Typography>
              <Typography id="modal-description" style={{ display: "block", alignItems: "center", marginLeft: "30px" }}>
                <TextField id="name" label="* name" variant="outlined" placeholder="enter name" style={{ marginTop: "25px" }} onChange={handleInputChange} value={newCategories.name} name="name" />
                {errors.name && <Typography color="error">{errors.name}</Typography>}
                <Typography style={{ display: "flex", gap: "10px", marginTop: "20px", alignItems: "center", justifyContent: "center" }}>
                  <Button variant="contained" style={{ width: "170px" }} onClick={handleEditInput}>Record change</Button>
                  <Button variant="outlined" style={{ width: "170px" }} onClick={handleCloseEdit}>Cancel</Button>
                </Typography>
              </Typography>
            </Box>
          </Modal>
        </Stack>
      </div>
      {successAdd && <Alert severity="success">Category added successfully!</Alert>}
      {successDelete && <Alert severity="error">Category deleted successfully!</Alert>}
      {successEdit && <Alert severity="info">Category updated successfully!</Alert>}
      <DataTable columns={columns} data={data} />
    </>
  );
};

export default Categories;
