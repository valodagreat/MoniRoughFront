import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import Button from '../../components/Button';
import { QueryClient, useQuery } from '@tanstack/react-query';
import Success from "../../assets/Success.jpg"
import axios from "../../api/axios";
import { toast } from 'react-toastify';
import { TailSpin } from 'react-loader-spinner';

const queryClient = new QueryClient()
const VerifyApp = () => {
  const [ searchParams, ] = useSearchParams();
  // const navigate = useNavigate();

  const { isFetching, isError, error, isSuccess } = useQuery(
    ['verify'],
    ()=>  axios.get('/wallet/verifyfunds', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        params: Object.fromEntries([...searchParams])
    }),
    {enabled: !!searchParams.get("reference")}
)

console.log(isFetching, isError, error, isSuccess)

  useEffect(() => {
    if(isError){
      toast.error(error?.response?.data?.message);
    }
}, [isError, error,]);
  
  const handleClickSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ['transaction'],
    })
    queryClient.invalidateQueries({
      queryKey: ["wallet"],
    })
    // localStorage.clear()
    window.location.href = window.location.protocol + "//" + window.location.host + "/app"
  }
  return (
    <div className='h-screen' >
      <nav className='bg-[#E66652] h-[10%] m-0' >
            <div className='flex justify-between items-center h-full' >
                <div>
                    <h1 className='text-white px-3 text-[24px] font-semibold' >MONITEST</h1>
                </div>
            </div>
        </nav>
        <div className='h-[90%] flex items-center justify-center ' >
          <div className='w-[600px] shadow-[0px_15px_30px_40px_rgba(230,102,82,.07)] rounded-[20px] h-[500px] mx-3 p-5' >
          <div className='flex justify-center items-center h-full' >
              {isFetching  ? <div className='flex items-center justify-center' ><TailSpin color="#E66652" width={60} height={60} /></div> : isSuccess ?<div>
                  <h1 className='md:text-[20px] text-[16px] font-semibold' >{"Transaction Successful"}</h1>
                  <img src={Success} alt='Success' />
                  <Button label={"Continue"} size="large" type="button" className={'my-5 flex items-center justify-center'} onClick={handleClickSuccess}  />
              </div>: <Button label={"Continue"} size="large" type="button" className={'my-5 flex items-center justify-center'} onClick={handleClickSuccess}  />}
            </div>
          </div>
        </div>
    </div>
  )
}

export default VerifyApp