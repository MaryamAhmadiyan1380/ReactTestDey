
import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CategoryIcon from '@mui/icons-material/Category';

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
    alignItems:"center",
};



   
const CategoriesLayout = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return(
        <div style={{display:"flex",gap:"50px", justifyContent:"center" }}>
        <Stack spacing={2} direction="row" style={{ marginTop: "10px" }}>
                <Button onClick={handleOpen} style={{backgroundColor:"blue", color:"white"}}>Add Categories</Button>
                <Modal
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="keep-mounted-modal-title" variant="h6" component="h2" style={{marginLeft:"30px"}}>
                            <CategoryIcon />  Add Categories
                        </Typography>
                        <Typography id="keep-mounted-modal-description" style={{display:"block",alignItems:"center",marginLeft:"30px"}} >
                            <TextField id="outlined-basic" label="* name" variant="outlined" placeholder="please enter name" style={{ marginTop: "25px" }} />
                            <TextField id="outlined-basic" label="* image src" variant="outlined" placeholder="please enter image src" style={{ marginTop: "25px" }} />
                            <TextField id="outlined-basic" label="* CreationAt" variant="outlined" placeholder="please enter CreationAt" style={{ marginTop: "25px" }} />
                        
                        <Typography style={{display:"flex",gap:"10px",marginTop:"20px",alignItems:"center",justifyContent:"center"}}>
                            <Button variant="contained" style={{width:"170px"}} >Record</Button>
                            <Button variant="outlined" style={{width:"170px"}}>Reset</Button>
                        </Typography>
                        </Typography>
                    </Box>
                </Modal>
                {/* <Button variant="contained"><PersonAddIcon style={{marginRight:"10px"}}/>Add User</Button> */}
            </Stack>
        </div>
    )
}
export default CategoriesLayout;