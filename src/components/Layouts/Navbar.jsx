import React, { useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi"
import Sidebar from '../Sidebar'
// import { HiOutlineMenu } from "react-icons/hi";
const Navbar = ({ activeMenu }) => {
    const [showSideBar, setShowSideBar] = useState(false)
    return (
        <div className=' bg-white flex gap-5 py-4 px-7 items-center text-gray-700 border border-gray-200/40'>
            <button className='lg:hidden cursor-pointer' onClick={() => setShowSideBar(!showSideBar)}>
                {showSideBar ? <HiOutlineX size={22} /> : <HiOutlineMenu size={22} />}
            </button>
            <h2 className='text-xl'>Task Manager</h2>
            {
                showSideBar && <div className='fixed top-[60px] left-0 transition duration-500 z-[100] bg-white'>
                    <Sidebar activeMenu={activeMenu} />
                </div>
            }
        </div>
    )
}

export default Navbar