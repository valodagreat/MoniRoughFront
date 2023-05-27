import { useFormik } from 'formik';
import React from 'react'
import Button from '../../../components/Button';
import InputField from '../../../components/InputField'
import { currency } from '../../../helpers/utils';
import { DonateValidations } from '../../../helpers/validate';

const FundWallet = ({ mutate, isLoading}) => {
    
    const [isEditing,setIsEditing] = React.useState(false);
    const formik = useFormik({
        initialValues: {
            amount: parseInt(""),
        },
        validationSchema: DonateValidations,
        onSubmit: async values => {
          mutate({...values })
        },
      });
  return (
    <div className='p-5' >
        <h1 className='text-[20px] font-semibold' >Fund Wallet with Paystack</h1>
        <p className='text-[#787b80]' >After initiating payment, you'll be redirected to paystack to complete payment</p>
        <div className='md:pr-20 py-5 flex justify-center w-full' >
            <div className='w-full' >
                {isEditing ? <InputField
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
                />}
                <Button
                    label="Fund"
                    size="large"
                    type="button"
                    className={'mb-5 flex items-center justify-center'}
                    onClick={formik.handleSubmit}
                    isLoading={isLoading}
                    disabled={isLoading}
                />
            </div>
        </div>
    </div>
  )
}

export default FundWallet