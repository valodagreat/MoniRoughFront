import React from 'react'
import Logo from "../assets/Bank.jpeg"

const AuthLayout = ({children}) => {
  return (
    <div>
        <div className='h-screen w-full flex' >
            <div className='h-screen bg-[#E66652] md:w-[50%] w-[0%] flex items-center justify-center' >
            <div className='text-center text-white' >
                <div className='flex justify-center' >
                <img src={Logo} alt="Logo" className='w-[140px] h-[140px] rounded-full md:block hidden' />
                </div>
                <h1 className=' text-[24px] py-2' >Welcome to Monitest</h1>
                <p>Tired of "I never see alert"? Let's help you bank without fear</p>
            </div>
            </div>
            <div className='h-screen w-full md:w-[50%] flex items-center justify-center' >
                {children}
            </div>
        </div>
    </div>
  )
}

export default AuthLayout