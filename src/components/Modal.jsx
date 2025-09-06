import React from 'react'
import {TiTimes} from "react-icons/ti" 
const Modal = ({ isOpen, onClose, title, children }) => {
    return (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-[99]'>
            <div className='bg-white p-4 rounded-md md:w-96 w-80'>
                <div className='flex items-center justify-between'>
                    <h4 className='text-lg font-semibold'>{title}</h4>
                    <button 
                    className='cursor-pointer '
                    onClick={onClose}>
                        <TiTimes size={25}/>
                    </button>
                </div>
               <div className='p-2'>
                 {children}
               </div>
            </div>
        </div>
    )
}

export default Modal