import React from 'react'

const NotFound = () => {
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
                <p className='font-semibold text-[24px] md:text-[32px]' >Page not found</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default NotFound