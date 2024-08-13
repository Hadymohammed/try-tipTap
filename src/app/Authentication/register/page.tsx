"use client"

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import OtpInput from '../otpInput';

const schema = yup.object().shape({
    email: yup.string().email().required('Email is required')
  });

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
      });
    const [otpPopUp, setOtpPopUp] = useState<boolean>(false);

    const onSubmit = (data:any) => {
        console.log(data);
        setOtpPopUp(true);
    }
    return (
        <div className='flex justify-center w-full'>
            <div className='flex flex-col w-1/3'>
                <h1>Register</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full'>
                    <div className='w-full mb-4' >
                        <input type="email" placeholder="Enter email" {...register("email")} className='w-full' />
                        {errors.email && <div className="text-danger">{errors.email.message}</div>}
                    </div>

                    <button type="submit" className='btn btn-success'>Register</button>
                </form>
            </div>
            {/* add otpPopUp input */}
            {otpPopUp && 
                <div className="h-1">
                    <OtpInput numberOfDigits={6} 
                    onClose={()=>{
                        setOtpPopUp(false);
                    }}/>
                </div>
            }
        </div>
    )
}