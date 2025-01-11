import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import NavbarPage from '../../Layouts/NavbarPage';
import useGetUsers from '../../Hook/useGetUsers';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ReplayIcon from '@mui/icons-material/Replay';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Alert from '@mui/material/Alert';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FilterListIcon from '@mui/icons-material/FilterList'
import { apiEditUserInfo, apiPostUSerInfo } from '../../Api/apiUsersInfo'
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
  width: "510px",
  alignItems: "center",
};

const Users = () => {
  const [data, setData] = useState([]);
  const { mutate: fetchUsers } = useGetUsers();
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [successAdd, setSuccessAdd] = useState(false)

  const [successEdit, setSuccessEdit] = useState(false)
  const [newUser, setNewUser] = useState({ email: "", name: "",password: "", avatar: "" });
  const [errors, setErrors] = useState({ email: "", name: "",password: "", avatar: "" });
  const [sortDirection, setSortDirection] = useState(null);
  const [openEdit, setOpenEdit] = useState(false)
  const [originalData, setOriginalData] = useState(null)
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => {
    setNewUser({ email: '', name: '', password: '', avatar: '' })
    setErrors({ email: '', name: '', password: '', avatar: '' })
    setOpenAdd(false);
  };

  useEffect(() => {
    fetchUsers({}, {
      onSuccess: (response) => {
        console.log("user response is: ", response);
        setData(response);
        setOriginalData(response)
      },
      onError: (error) => {
        console.error("Error fetching users:", error);
      },
    });
  }, [fetchUsers]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };
  const handleOpenEdit = (row, index) => {
    setEditingIndex(index)
    setNewUser({ ...row })
    setOpenEdit(true)
  }
  const handleCloseEdit = () => {
    setNewUser({ email: '', name: '', password: '', avatar: '' })
    setErrors({ email: '', name: '', password: '', avatar: '' })
    setOpenEdit(false)
  }
  const validate = () => {
    let valid = true;
    const errors = { email: '', name: '', password: '', avatar: '' }
    if (!newUser.name) {
      errors.name = "Name is required";
      valid = false;
    }
    if (!newUser.email) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(newUser.email)) {
      errors.email = "Email address is invalid";
      valid = false;
    }

    if (!newUser.password) {
      errors.password = "Password is required"
      valid = false;
    }

    if (!newUser.avatar) {
      errors.role = "Role is required";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };
  const editValidate = () => {
    let valid = true
    const errors = { email: '', name: '' }
    if (!newUser.email) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(newUser.email)) {
      errors.email = "Email address is invalid";
      valid = false;
    }
    if (!newUser.name) {
      errors.name = "Name is required";
      valid = false;
    }
    setErrors(errors)
    return valid;
  }
  const handleAddInput = () => {
    if (validate()) {
      console.log("sending User data is: ", newUser);
      apiPostUSerInfo(newUser)
        .then((addUser) => {
          console.log("User added successfully:", addUser);
          setData((prevData) => [...prevData, addUser]); 
          setSuccessAdd(true);
          setTimeout(() => setSuccessAdd(false), 3000); 
        })
        .catch((error) => {
          console.error("Error adding User:", error);
        });
    } else {
      console.log("Validation failed, user not added.");
    }
    handleCloseAdd(); 
  };
  
  const handleEditInput = () => {
    const userData = {
      email: newUser.email,
      name: newUser.name,
    };
  
    
    if (editValidate() && editingIndex !== null && data[editingIndex]) {
      const userToUpdate = data[editingIndex];
  
      
      if (!userToUpdate.id) {
        console.error("User ID is missing.");
        return;
      }
  
      const updatedUser = { ...userToUpdate, ...userData };
  
      
      apiEditUserInfo(userToUpdate.id, updatedUser)
        .then(() => {
          const updatedData = [...data];
          updatedData[editingIndex] = updatedUser; 
          setData(updatedData); 
          setEditingIndex(null); 
          setSuccessEdit(true);
          setTimeout(() => setSuccessEdit(false), 3000);
        })
        .catch((error) => {
          console.log("Error updating User data: ", error);
        });
  
      handleCloseEdit(); 
    } else {
      console.error("Invalid editing index or data not found.");
    }
  };

  
  const handleSort = () => {
    if (sortDirection === 'asc') {
      setSortDirection('desc');
      setData([...data].sort((a, b) => b.email.localeCompare(a.title)));
    } else if (sortDirection === 'desc') {
      setSortDirection(null);

    }
    else {
      setSortDirection('asc')
      setData([...data].sort((a, b) => a.email.localeCompare(b.title)));
    }
  };
  const handleReset = (index) => {
    const updatedData = [...data]
    updatedData[index] = originalData[index]
    setData(updatedData)
    setNewUser({ email: "", name: "",password : "", avatar: "" })
    setEditingIndex(null)
  }


  const columns = [
    {
      name: '',
      selector: row => <Checkbox onChange={() => setSelectedRow(row)} />,
      sortable: false,
      width: '70px',
    },
    {
      name: (
        <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={handleSort}>
          Name
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
      name: 'Name',
      selector: row => row.email,

    },
    {
      name: 'Password',
      selector: row => row.password,
    },

    {
      name: 'Avatar',
      selector: row => row.avatar,
    },
    {
      name: 'Role',
      selector: row => row.role,
    },
    {
      name: 'Action',
      selector: (row, index) => (
        <div>

          <EditIcon style={{ color: "gray", fontSize: "20px" }} onClick={() => handleOpenEdit(row, index)} />
          <ReplayIcon style={{ color: "black", fontSize: "20px" }} onClick={() => handleReset(index)} />
        </div>
      ),
    },
  ];

  return (
    <>
      <NavbarPage />

      <div style={{ display: "flex", gap: "50px", justifyContent: "center" }}>
        <Stack spacing={2} direction="row" style={{ marginTop: "10px" }}>
          <Button onClick={handleOpenAdd} style={{ backgroundColor: "blue", color: "white" }}>Add User</Button>
          <Modal keepMounted open={openAdd} onClose={handleCloseAdd} aria-labelledby="keep-mounted-modal-title" aria-describedby="keep-mounted-modal-description">
            <Box sx={style}>
              <Typography id="keep-mounted-modal-title" variant="h6" component="h2" style={{ marginLeft: "30px" }}>
                <PersonAddIcon /> Add User
              </Typography>
              <Typography id="keep-mounted-modal-description" style={{ display: "block", alignItems: "center", marginLeft: "30px", marginTop: "20px" }}>

                <TextField id="name" label="* Name" variant="outlined" placeholder="please enter name" style={{ marginTop: "25px" }} onChange={handleInputChange} value={newUser.name} name="name" />
                {errors.name && <Typography color="error">{errors.name}</Typography>}
                <TextField id="email" label="* Email" variant="outlined" placeholder="please enter email" style={{ marginTop: "25px" }} onChange={handleInputChange} value={newUser.email} name="email" />
                {errors.email && <Typography color="error">{errors.email}</Typography>}
                <TextField id="password" label="* password" variant="outlined" placeholder="please enter password" style={{ marginTop: "25px" }} onChange={handleInputChange} value={newUser.password} name="password" />
                {errors.password && <Typography color="error" >{errors.password}</Typography>}
                <TextField id="avatar" label="* avatar" variant="outlined" placeholder="please enter avatar" style={{ marginTop: "25px" }} onChange={handleInputChange} value={newUser.avatar} name="avatar" />
                {errors.avatar && <Typography color="error">{errors.avatar}</Typography>}
                <Typography style={{ display: "flex", gap: "10px", marginTop: "20px", alignItems: "center", justifyContent: "center" }}>
                  <Button variant="contained" style={{ width: "170px" }} onClick={handleAddInput}>Record</Button>
                  <Button variant="outlined" style={{ width: "170px" }} onClick={handleCloseAdd}>Exit</Button>
                </Typography>
              </Typography>
            </Box>
          </Modal>
          <Modal keepMounted open={openEdit} onClose={handleCloseEdit} aria-labelledby="keep-mounted-modal-title" aria-describedby="keep-mounted-modal-description">
            <Box sx={style}>
              <Typography id="keep-mounted-modal-title" variant="h6" component="h2" style={{ marginLeft: "30px" }}>
                <PersonAddIcon /> Edit User
              </Typography>
              <Typography id="keep-mounted-modal-description" style={{ display: "block", alignItems: "center", marginLeft: "30px", marginTop: "20px" }}>


                <TextField id="email" label="* Email" variant="outlined" placeholder="please enter email" style={{ marginTop: "25px" }} onChange={handleInputChange} value={newUser.email} name="email" />
                {errors.email && <Typography color="error">{errors.email}</Typography>}
                <TextField id="name" label="* Name" variant="outlined" placeholder="please enter name" style={{ marginTop: "25px" }} onChange={handleInputChange} value={newUser.name} name="name" />
                {errors.name && <Typography color="error">{errors.name}</Typography>}

                <Typography style={{ display: "flex", gap: "10px", marginTop: "20px", alignItems: "center", justifyContent: "center" }}>
                  <Button variant="contained" style={{ width: "170px" }} onClick={handleEditInput}>Record Changes</Button>
                  <Button variant="outlined" style={{ width: "170px" }} onClick={handleCloseEdit}>Exit</Button>
                </Typography>
              </Typography>
            </Box>
          </Modal>
        </Stack>
      </div>
      {successAdd && <Alert severity="success">User added successfully!</Alert>}
      {successEdit && <Alert severity="info">User updated successfully!</Alert>}
      <DataTable
        columns={columns}
        data={data}
      />
    </>
  );
};

export default Users;
