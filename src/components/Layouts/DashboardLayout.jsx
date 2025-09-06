import React from 'react'
import Navbar from './Navbar'
import Sidebar from '../Sidebar'

const DashboardLayout = ({ activeMenu, children }) => {
    return (
        <div className='bg-gray-50'>
            <Navbar activeMenu={activeMenu} />
            <div className='flex'>
                <div className='hidden lg:block'>
                    <Sidebar activeMenu={activeMenu} />
                </div>
                <div className='flex-1 '>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout