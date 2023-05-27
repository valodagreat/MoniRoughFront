import React, { useEffect } from 'react'
import InputField from '../../components/InputField'
import AuthLayout from '../../layouts/AuthLayout'
import Hello from "../../assets/Hello.png"
import { useFormik } from 'formik'
import { RegisterValidations } from '../../helpers/validate'
import Button from '../../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query';
import axios from "../../api/axios";
import { toast } from 'react-toastify';

const Register = () => {

    const mutation = useMutation({
        mutationFn: (newTodo) => {
          return axios.post('/user/register', newTodo)
        },
    });

    const navigate = useNavigate();
    const { isLoading, mutate, isError, error, isSuccess, reset, data } = mutation;

    useEffect(() => {
        if(isError){
          toast.error(error?.response?.data?.message)
          reset()
        }
      }, [isError, error, reset]);

    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
          firstName: "",
          lastName: ""
        },
        validationSchema: RegisterValidations,
        onSubmit: async values => {
            mutate({...values});
        }
      });

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
    <div>
        <AuthLayout >
            <div className=' w-full md:px-10 px-7 max-w-[500px]'>
                <div className='flex items-center py-2' >
                    <h1 className='text-[18px]' >Hey there </h1>
                    <img src={Hello} alt="Waving" className='w-[30px] h-[30px] mx-2' />
                </div>
                <p className='py-3 text-left' >Perform ceaseless transactions without losing your peace</p>
                <div className='py-5' >
                    <InputField
                        className=" mb-5"
                        type="text"
                        label="First Name"
                        placeholder="Enter your first name"
                        name="firstName"
                        maskChar=""
                        autoComplete="off"
                        value={values.firstName}
                        onChange={handleChange("firstName")}
                        onBlur={handleBlur("firstName")}
                        error={errors.firstName}
                        touched={touched.firstName}
                    />
                    <InputField
                        className=" mb-5"
                        type="text"
                        label="Last Name"
                        placeholder="Enter your last name"
                        name="lastName"
                        maskChar=""
                        autoComplete="off"
                        value={values.lastName}
                        onChange={handleChange("lastName")}
                        onBlur={handleBlur("lastName")}
                        error={errors.lastName}
                        touched={touched.lastName}
                    />
                    <InputField
                        className=" mb-5"
                        type="email"
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
                            label="Register"
                            size="large"
                            isLoading={isLoading}
                            disabled={isLoading}
                            onClick={handleSubmit}
                        />
                    </div>
                    <p className='text-center text-bs font-medium flex'>
                        Already have an account?
                        <Link to="/"><span className='text-primary mx-2'>Login </span></Link>
                    </p>
                </div>
            </div>
        </AuthLayout>
    </div>
  )
}

export default Register
