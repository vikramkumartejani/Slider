import React from 'react'
import Logo from '../assets/logo.svg'

const Header = () => {
    return (
        <div className="bg-white min-h-[264px] w-full px-[300px] flex items-center ">
            <div className='flex items-center gap-[50px]'>
                <img src={Logo} alt='logo' width={118} height={120} />
                <h1 className='max-w-[718px] w-full text-[#4663AC] text-[48px] font-semibold leading-[112.00000000000001%]'>Partagez vos experiences avec notre communauté</h1>
            </div>
        </div>
    )
}

export default Header