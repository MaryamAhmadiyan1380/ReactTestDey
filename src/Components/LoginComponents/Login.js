import React, { useState } from 'react';
import { FormControl, InputLabel, OutlinedInput, Stack, Button, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useNavigate} from 'react-router-dom'

const Login = ({ register, errors, onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const navigate = useNavigate()
 
 
  return(
  <form onSubmit={onSubmit}>
    <div style={{ width: "250px", display: "block", justifyContent: "center", margin: "auto" }}>
      <h1>welcome to Login </h1>
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
        <OutlinedInput id="outlined-adornment-email" type="text" {...register('email')} label="Email" />
      </FormControl>
      {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}

      {/* Password Field */}
      <FormControl sx={{ m: 1, width: '25ch' ,marginTop: '20px'  }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}

     
      <Stack style={{ alignItems: 'center', display: 'block', justifyContent: 'center', marginTop: "15px" }} spacing={2} direction="row">
      {/* <Button type="submit" className="submit" variant="contained" style={{color:"red",cursor:"pointer",backgroundColor:"#f5f5f5"}} onClick={goToSignUp} >SignUp</Button> */}
        <Button type="submit" className="submit" variant="contained" >Login</Button>
        
      </Stack>
    </div>
  </form>
  )
}

export default Login;
