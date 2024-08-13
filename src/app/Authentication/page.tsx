"use client";

import React from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';
import { auth } from '@/firebaseConfig';
import { createUserWithEmailAndPassword ,signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { axiosInstance } from '@/utils/axios.helper';

const schema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required')
});

export default function Authentication() {
  // Use react hook form to handle form state
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: any) => {
    console.log(data);
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("success ",user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      const refreshToken = user.refreshToken;
      //save refresh token to local storage
      localStorage.setItem('refreshToken', refreshToken);
      //add access token to axios header
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      //redirect to home page
      router.push('/');
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      console.log(errorCode, errorMessage, email);
    });
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' {...register('email')} />
        {errors.email && <div className="text-danger">{errors.email.message}</div>}
        
        <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' {...register('password')} />
        {errors.password && <div className="text-danger">{errors.password.message}</div>}
        
        <div className="d-flex justify-content-between mx-3 mb-4">
          <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
          <a href="!#">Forgot password?</a>
        </div>

        <button className="mb-4" type='submit'>Sign in</button>

        <div className="text-center">
          <p>Not a member? <a href="#!">Register</a></p>
          <p>or sign up with:</p>

          <div className='d-flex justify-center mx-auto' style={{width: '40%'}}>
            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }} onClick={signInWithGoogle}>
              <MDBIcon fab icon='google' size="xl" />
            </MDBBtn>
          </div>
        </div>
      </MDBContainer>
    </form>
  );
}
