import React from 'react'
import Logo from '../assets/logo.svg'

const Header = () => {
    return (
        <div className="bg-white py-10 xl:min-h-[200px] 2xl:min-h-[264px] w-full px-6 sm:px-10 lg:pl-[80px] xl:pl-[150px] 2xl:px-[300px] flex items-center ">
            <div className='flex items-center gap-6 lg:gap-[50px]'>
                <img src={Logo} alt='logo' width={118} height={120} className='w-[60px] lg:w-[90px] xl:w-[118px] xl:h-[120px]' />
                <h1 className='max-w-[718px] w-full text-[#4663AC] text-[24px] sm:text-[30px] lg:text-[40px] xl:text-[48px] font-semibold leading-[112.00000000000001%]'>Partagez vos experiences avec notre communauté</h1>
            </div>
        </div>
    )
}

export default Header