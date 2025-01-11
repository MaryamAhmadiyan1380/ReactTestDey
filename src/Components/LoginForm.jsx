import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Login from '../Components/LoginComponents/Login';
import SignUp from '../Components/LoginComponents/SignUp';
import LoginPic from '../Assets/LoginPic.jpg';
import { useNavigate } from 'react-router-dom';
import '../Components/Style/Login.css';
import useLogin from '../Hook/useLogin';
import useSignup from '../Hook/useSignup';

const schema = yup.object().shape({
  name: yup.string().when('action', { is: 'Sign Up', then: yup.string().required('Name is required') }),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  avatar: yup.string().when('action', { is: 'Sign Up', then: yup.string().url('Invalid URL').required('Avatar is required') }),
});

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) });
  const [action, setAction] = useState('Sign Up');
  const navigate = useNavigate();
  const loginQuery = useLogin();
  const signUpQuery = useSignup();

  const onSubmit = async (data) => {
    if (action === 'Login') {
      loginQuery.mutate({...data}, {
        onSuccess: (res) => {
          console.log('Login response is: ', res);
          localStorage.setItem('access_token', res?.access_token);
          localStorage.setItem('refresh_token', res?.refresh_token);
          if (res?.access_token && res?.refresh_token) {
            console.log('Tokens received:', res.access_token, res.refresh_token);
            navigate('/');
          } else {
            console.error('Tokens not defined');
          }
        },
        onError: (err) => {
          console.error(err);
        },
      });
    } else if (action === 'Sign Up') {
      signUpQuery.mutate({...data,}, {
        onSuccess: (res) => {
          console.log('Sign Up response is: ', res);
          setAction('Login');
          reset();
        },
        onError: (err) => {
          console.error('this error is: ', err);
        },
      });
    }
  };

  return (
    <div className="testdiv">
      <div className="left">
        {action === 'Login' ? (
          <Login
            register={register}
            errors={errors}
            onSubmit={handleSubmit(onSubmit)}
          />
        ) : (
          <SignUp
            register={register}
            errors={errors}
            onSubmit={handleSubmit(onSubmit)}
          />
        )}
      </div>
      <div className="right">
        <img className="piclog" src={LoginPic} alt="Login illustration" />
      </div>
    </div>
  );
};

export default LoginForm;
