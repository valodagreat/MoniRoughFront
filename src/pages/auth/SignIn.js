import React, { useEffect } from 'react'
import InputField from '../../components/InputField'
import AuthLayout from '../../layouts/AuthLayout'
import Hello from "../../assets/Hello.png"
import { useFormik } from 'formik'
import { LoginValidations } from '../../helpers/validate'
import Button from '../../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query';
import axios from "../../api/axios";
import { toast } from 'react-toastify';

const SignIn = () => {
    const mutation = useMutation({
        mutationFn: (newTodo) => {
          return axios.post('/user/login', newTodo)
        },
    });
    const navigate = useNavigate();
    const { isLoading, mutate, isError, error, isSuccess, reset, data } = mutation;
    const formik = useFormik({
        initialValues: {
          email: '',
          password: ''
        },
        validationSchema: LoginValidations,
        onSubmit: async values => {
            mutate({email: values.email, password: values.password});
        }
      });

    useEffect(() => {
      if(isError){
        toast.error(error?.response?.data?.message)
        reset()
      }
    }, [isError, error, reset]);

    useEffect(() => {
        if(isSuccess){
            localStorage.setItem("token", data?.data?.data?.accessToken)
            navigate("/app", {
                state: {
                    user: data?.data?.data
                }
            })
        }
    }, [isSuccess, navigate, data])
    
    
      const {
        values,
        handleChange,
        handleSubmit,
        handleBlur,
        errors,
        touched
      } = formik;
  return (
    <>
    <AuthLayout >
      <div className=' w-full px-10 max-w-[500px]'>
          <div className='flex items-center py-2' >
            <h1 className='text-[18px]' >Hey there </h1>
            <img src={Hello} alt="Waving" className='w-[30px] h-[30px] mx-2' />
          </div>
          <p className='py-3 text-left' >Continue from where you stopped</p>
          <div className='py-5' >
            <InputField
                className=" mb-5"
                type="text"
                label="Email"
                placeholder="Enter your email"
                name="email"
                maskChar=""
                autoComplete="off"
                value={values.email}
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                error={errors.email}
                touched={touched.email}
                autoFocus
            />
            <InputField
                className=" mb-5"
                type="password"
                label="Password"
                placeholder="Enter your password"
                name="password"
                maskChar=""
                autoComplete="off"
                value={values.password}
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
                error={errors.password}
                touched={touched.password}
            />
            <div className='mt-10' >
                <Button
                    className="col-10 mb-5 flex items-center justify-center"
                    label="Sign In"
                    size="large"
                    isLoading={isLoading}
                    disabled={isLoading}
                    onClick={handleSubmit}
                />
            </div>
            <p className='text-center text-bs font-medium flex'>
                Don't have an account?
                <Link to="/register"><span className='text-primary mx-2'>Sign Up </span></Link>
            </p>
          </div>
      </div>
    </AuthLayout>
  </>
  )
}

export default SignIn