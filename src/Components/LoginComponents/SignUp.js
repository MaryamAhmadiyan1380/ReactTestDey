import React, { useState } from 'react';
import { FormControl, InputLabel, OutlinedInput, Stack, Button, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const SignUp = ({ register, errors, onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();
  return (
    <form onSubmit={onSubmit}>
      <h1 className='hf'>Join Us!</h1>
      <span className='hf'>Create an account to get started</span>
      <div className="underline"></div>
      <div style={{width:"250px",display:"block",justifyContent:"center",margin:"auto"}}>
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" style={{ margin: 'auto', marginTop: '20px' }}>
        <InputLabel htmlFor="outlined-adornment-name">Name</InputLabel>
        <OutlinedInput id="outlined-adornment-name" type="text" {...register("name")} label="name" />
      </FormControl>
      {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
      <FormControl sx={{ m: 1, width: '25ch', margin: 'auto', marginTop: '20px' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
        <OutlinedInput id="outlined-adornment-email" type="text" {...register('email')} label="email" />
      </FormControl>
      {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}

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
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" style={{ margin: 'auto', marginTop: '15px' }}>
        <InputLabel htmlFor="outlined-adornment-avatar">Avatar</InputLabel>
        <OutlinedInput id="outlined-adornment-avatar" type="text" {...register('avatar')} label="avatar" />
      </FormControl>
      {errors.avatar && <p style={{ color: 'red' }}>{errors.avatar.message}</p>}
      <Stack style={{ alignItems: 'center', display: 'block', justifyContent: 'center',marginTop:"15px" }} spacing={2} direction="row">
        <Button type="submit" className="submit" variant="contained">Sign Up</Button>
      </Stack>
      </div>
    </form>
    
  );
};

export default SignUp;
