import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import Icon from '../../components/Icons'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import FundWallet from './components/FundWallet';
import SendEmail from './components/SendEmail';
import SendAccount from './components/SendAccount';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from "../../api/axios";
import { currency } from '../../helpers/utils';
import { TailSpin } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import ImageRefetch from "../../assets/Refetch.jpeg";
import { useQueryClient } from '@tanstack/react-query';

const HomeApp = () => {
    const [ blur, setBlur ] = React.useState(JSON.parse(localStorage.getItem("blur")) || false);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { state } = useLocation();
    const logout = () => {
        localStorage.removeItem('token');
        queryClient.clear(); // Clear all queries
        queryClient.removeQueries(); // Remove all queries from the cache
        navigate("/");
    }
    const handleBlur = () => {
        localStorage.setItem("blur", !blur);
        setBlur((val)=> !val)
    }
    const { isLoading, isError, data, error, refetch: walletRefetch } = useQuery({
        queryKey: ['wallet'],
        queryFn: ()=>  axios.get('/wallet/mywallet', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }),
        retry: false,
        enabled: !!localStorage.getItem('token')
    })

    const { isInitialLoading: userLoading,  data: userData} = useQuery(
        ['user'],
        ()=>  axios.get('/user/me', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }),
        {enabled: !state?.user?.firstName},
        {retry: false},
    )

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
        toast.success("Copied")
    }

    const { isLoading: transLoading, isError: transisError, data: transData, error: transError, refetch } = useQuery({
        queryKey: ['transaction'],
        queryFn: ()=>  axios.get('/transactions/mytransactions', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }),
        retry: false,
        enabled: !!localStorage.getItem('token')
    })

    const mutation = useMutation({
        mutationFn: (newTodo) => {
          return axios.post('/wallet/fund ', newTodo, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        },
    });

    const { isLoading: isFundLoading, isError: isFundIsError, error: isFundError, isSuccess: isFundIsSuccess, mutate: isFundMutate, reset } = useMutation({
        mutationFn: (newTodo) => {
          return axios.post('/wallet/transfer', newTodo, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        },
        onSuccess: () => {
            refetch()
            walletRefetch();
        },
      });

    const { isLoading: isFundingLoading, mutate, isError: isFundingIsError, error: isFundingError, isSuccess,  data: isFundingData } = mutation;

    useEffect(() => {
        if(isSuccess){
            window.location.href = isFundingData?.data?.data?.checkoutUrl;
        }
    }, [isSuccess, isFundingData])

    const handleSign = (type) => {
        if(type === "Debit"){
            return "-"
        }else{
            return "+"
        }
    }

    const handleTransactions = () => {
        if(transData?.data?.data?.length > 0){
            return transData?.data?.data?.map(item => (
                <div key={item?._id} className='border-b border-[#d7e0df] py-1' >
                    <div className='flex justify-between' >
                        <p className='font-medium' >{item?.transactionType === "Debit" ? `${item?.receiverId?.firstName} ${item?.receiverId?.lastName}` : `${item?.senderId?.firstName || "Paystack"} ${item?.senderId?.lastName || ""}`}</p>
                        <p className={`${blur && "blur-[10px]"}`} >{handleSign(item?.transactionType)} {currency.format(item?.amount)}</p>
                    </div>
                    <p>{dayjs(item?.createdAt).format("DD, MMM YYYY, hh:mm a")}</p>
                </div>
            ))?.reverse()
        }else {
            return <div className='h-full flex items-center justify-center' >
                You've not performed any transaction
            </div>
        }
    }

    useEffect(() => {
        if(isFundingIsError){
          toast.error(isFundingError?.response?.data?.message);
          if(isFundingError?.response?.data?.message === "Invalid token"){
            localStorage.removeItem('token')
            navigate("/")
          }
        }
      }, [isFundingIsError, isFundingError, navigate]);

      useEffect(() => {
        if(isError){
          toast.error(error?.response?.data?.message);
          if(error?.response?.data?.message === "Invalid token"){
            localStorage.removeItem('token')
            navigate("/")
          }
        }
      }, [isError, error, navigate]);

      useEffect(() => {
        if(transisError){
          toast.error(transError?.response?.data?.message);
          if(transError?.response?.data?.message === "Invalid token"){
            localStorage.removeItem('token')
            navigate("/")
          }
        }
      }, [transisError, transError, navigate]);

  return (
    <div className='h-screen' >
        <nav className='bg-[#E66652] h-[10%] m-0' >
            <div className='flex justify-between items-center h-full' >
                <div>
                    <h1 className='text-white px-3 text-[24px] font-semibold' >MONITEST</h1>
                </div>
                <p onClick={logout} className='text-white pr-5 md:pr-20 cursor-pointer' >logout</p>
            </div>
        </nav>
        <div className='h-[90%] flex items-center justify-center ' >
            <div className='w-[600px] shadow-[0px_15px_30px_40px_rgba(230,102,82,.07)] rounded-[20px] h-[500px] mx-3 p-5' >
                <div className='pb-2' >
                    <div className='flex justify-between items-center pt-5 pb-1 md:px-5 pr-1' >
                        <p className=' text-[21px]' >Hi, {userLoading ? "___" : state?.user?.firstName ? state?.user?.firstName : userData?.data?.data?.firstName}</p>
                        <img onClick={()=> {
                            walletRefetch()
                            refetch()
                        }} className='cursor-pointer w-[20px] h-[20px]' src={ImageRefetch} alt="refetch" />
                    </div>
                    <div className='md:px-5 pt-2 md:pt-4 flex items-center w-full justify-between' >
                        <div>
                            <p className={`font-semibold text-[24px] md:text-[32px] ${blur && "blur-[10px]"}`} >{!isLoading ? currency.format(data?.data?.data?.balance) : "____"}</p>
                            {isLoading &&<p className='text-[#787b80] text-[14px]' >Fetching Balance</p>}
                        </div>
                        <div onClick={handleBlur} className='cursor-pointer' >
                            {blur ? <Icon id="hide-password-icon" width="24px" height="24px" /> : <Icon id="show-password-icon" width="24px" height="24px" />}
                        </div>
                    </div>
                    <div className='md:px-5 pt-5' >
                        <div className='flex w-full border-[#E66652] border-b-[1px] pb-3 md:pb-5' >
                        <Popup
                            trigger={<div className='bg-[#E66652] text-white mr-5 px-3 py-1 rounded-[10px] cursor-pointer' ><p>Fund</p></div>}
                            modal
                            position={"center center"}
                            nested
                        >
                            {close => (
                                <>
                                    <div onClick={()=>close()} className='bg-[#E66652] right-[-20px] top-[-20px] absolute cursor-pointer rounded-full h-[40px] w-[40px] flex justify-center items-center text-[24px]' >&times;</div>
                                    <div className='p-5' >
                                    <h1 className='text-[20px] font-semibold' >Fund Wallet</h1>
                                    <p onClick={()=> handleCopy(userLoading ? "___" : state?.user?.accountNumber ? state?.user?.accountNumber : userData?.data?.data?.accountNumber)} className='py-2 border-b border-[#d7e0df] cursor-pointer my-2 flex justify-between items-center' >Account number: {userLoading ? "___" : state?.user?.accountNumber ? state?.user?.accountNumber : userData?.data?.data?.accountNumber} <span>click to copy</span></p>
                                    <Popup
                                        trigger={<p className='py-2 border-b border-[#d7e0df] cursor-pointer' >Fund with paystack</p>}
                                        modal
                                        position={"center center"}
                                        nested
                                        closeOnDocumentClick={false}
                                    >
                                        {(closeII) => (
                                        <>
                                        <div onClick={()=>closeII()} className={`bg-[#E66652] right-[-20px] top-[-20px] absolute cursor-pointer rounded-full h-[40px] w-[40px] flex justify-center items-center text-[24px] ${(isFundingLoading || isFundIsSuccess) && "hidden"}`} >&times;</div>
                                        <FundWallet mutate={mutate} isLoading={isFundingLoading} />
                                        </>)}
                                    </Popup>
                                    
                                </div>
                                </>
                            )}
                        </Popup>
                        <Popup
                            trigger={<div className='bg-[#E66652] text-white mr-5 px-3 py-1 rounded-[10px] cursor-pointer' ><p>Send</p></div>}
                            modal
                            position={"center center"}
                            nested
                        >
                            {close => (
                                <div>
                                    <div onClick={()=>close()} className='bg-[#E66652] right-[-20px] top-[-20px] absolute cursor-pointer rounded-full h-[40px] w-[40px] flex justify-center items-center text-[24px]' >&times;</div>
                                    <div className='p-5' >
                                        <h1 className='text-[20px] font-semibold' >Send Money</h1>
                                        <Popup
                                            trigger={<p className='py-2 border-b border-[#d7e0df] cursor-pointer my-2' >Send by Moni Email</p>}
                                            modal
                                            position={"center center"}
                                            nested
                                            closeOnDocumentClick={false}
                                        >
                                            {closeII => <>
                                                <div onClick={()=>closeII()} className={`bg-[#E66652] right-[-20px] top-[-20px] absolute cursor-pointer rounded-full h-[40px] w-[40px] flex justify-center items-center text-[24px] ${(isFundLoading || isFundIsSuccess) && "hidden"} `} >&times;</div>
                                                <SendEmail isFundLoading={isFundLoading} isFundIsError={isFundIsError} isFundError={isFundError} isFundIsSuccess={isFundIsSuccess} isFundMutate={isFundMutate} close={close} closeII={closeII} reset={reset} />
                                            </>}
                                        </Popup>
                                        <Popup
                                            trigger={<p className='py-2 border-b border-[#d7e0df] cursor-pointer my-2' >Send by Moni Account number</p>}
                                            modal
                                            position={"center center"}
                                            nested
                                            closeOnDocumentClick={false}
                                        >
                                            {closeII => <>
                                                <div onClick={()=>closeII()} className={`bg-[#E66652] right-[-20px] top-[-20px] absolute cursor-pointer rounded-full h-[40px] w-[40px] flex justify-center items-center text-[24px] ${(isFundLoading || isFundIsSuccess) && "hidden"}`} >&times;</div>
                                                <SendAccount isFundLoading={isFundLoading} isFundIsError={isFundIsError} isFundError={isFundError} isFundIsSuccess={isFundIsSuccess} isFundMutate={isFundMutate} close={close} closeII={closeII} reset={reset} />
                                            </>}
                                        </Popup>
                                    </div>
                                </div>
                            )}
                        </Popup>
                        </div>
                    </div>
                </div>
                <div className='overflow-y-auto md:px-5 py-5 md:h-[260px] h-[280px]' >
                    {transLoading ? <div className='flex items-center justify-center' ><TailSpin color="#E66652" width={40} height={40} /></div> : handleTransactions()}
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomeApp