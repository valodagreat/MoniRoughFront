import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import Button from '../../../components/Button';
import InputField from '../../../components/InputField'
import { currency } from '../../../helpers/utils';
import { AccountValidations, SendByAccountValidations } from '../../../helpers/validate';
import axios from "../../../api/axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation, QueryClient } from '@tanstack/react-query';
  import Success from "../../../assets/Success.jpg"
  
  const queryClient = new QueryClient()

const SendAccount = ({ isFundLoading, isFundIsError, isFundError, isFundIsSuccess, isFundMutate, reset, close, closeII }) => {
  const [isEditing,setIsEditing] = React.useState(false);
  const navigate = useNavigate();
  const { isLoading, isError, data, error, isSuccess, mutate } = useMutation(
    ()=>  axios.get(`/user/byaccount/?accountNumber=${formik.values.accountNumber}`, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    })
  );
    const formik = useFormik({
        initialValues: {
            amount: parseInt(""),
            accountNumber: parseInt(""),
        },
        validationSchema: isSuccess ? SendByAccountValidations : AccountValidations,
        onSubmit: async values => {
            !isSuccess ? mutate() : isFundMutate({ amount: values.amount, accountNumber:  data?.data?.data?.accountNumber})
        },
    });

    useEffect(() => {
        if(isError){
          toast.error(error?.response?.data?.message);
          if(error?.response?.data?.message === "Invalid token"){
            localStorage.clear()
            navigate("/")
          }
        }
      }, [isError, error, navigate]);
  
      useEffect(() => {
        if(isFundIsError){
          toast.error(isFundError?.response?.data?.message);
          if(isFundError?.response?.data?.message === "Invalid token"){
            localStorage.clear()
            navigate("/")
          }
        }
      }, [isFundIsError, isFundError, navigate]);

      const handleClickSuccess = () => {
        queryClient.invalidateQueries({
          queryKey: ['transaction'],
        })
        queryClient.invalidateQueries({
          queryKey: ["wallet"],
        })
        close()
        closeII()
        reset()
      }
  return (
    <div className='p-5' >
        {isFundIsSuccess ? 
        <div className='flex justify-center items-center' >
            <div>
            <h1 className='md:text-[20px] text-[16px] font-semibold' >Transaction Successful</h1>
            <img src={Success} alt='Success' />
            <Button label={"Continue"} size="large" type="button" className={'my-5 flex items-center justify-center'} onClick={handleClickSuccess}  />
            </div>
        </div>:<>
            <h1 className='text-[20px] font-semibold' >Send By Account Number</h1>
            <div className='md:pr-20 py-5 flex justify-center w-full' >
                    <div className='w-full' >
                    {!isSuccess && <InputField
                        className=" mb-5"
                        type="number"
                        label="Account Number"
                        placeholder="Enter user's account number"
                        name="accountNumber"
                        maskChar=""
                        autoComplete="off"
                        value={formik.values.accountNumber}
                        onChange={formik.handleChange("accountNumber")}
                        onBlur={formik.handleBlur("accountNumber")}
                        error={formik.errors.accountNumber}
                        touched={formik.touched.accountNumber}
                        autoFocus
                    />}
                    {isSuccess && <p className='pb-3' >To: {data?.data?.data?.firstName} {data?.data?.data?.lastName}</p>}
                        {isSuccess && (isEditing ? <InputField
                            className=" mb-8"
                            type="number"
                            label="Amount"
                            placeholder=""
                            name="amount"
                            maskChar=""
                            autoComplete="off"
                            value={formik.values.amount}
                            onChange={formik.handleChange}
                            onBlur={()=> setIsEditing(false)}
                            error={formik.errors.amount}
                            touched={formik.touched.amount}
                            autoFocus
                        /> : 
                        <InputField 
                            className=" mb-8"
                            label="Amount"
                            value={currency.format(formik.values.amount || 0)}
                            readOnly
                            onFocus={()=> setIsEditing(true)}
                        />)}
                        <Button
                            label={isSuccess ? "Send" :"Next"}
                            size="large"
                            type="button"
                            className={'mb-5 flex items-center justify-center'}
                            onClick={formik.handleSubmit}
                            isLoading={isLoading || isFundLoading}
                            disabled={isLoading || isFundLoading}
                        />
                    </div>
            </div>
        </>}
    </div>
  )
}

export default SendAccount