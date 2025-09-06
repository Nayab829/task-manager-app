import React from 'react'
import { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"

const Input = ({ label, type, placeholder, value, handleChange ,required }) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <div className='flex flex-col gap-1 mb-2'>
            <label className='text-gray-500 text-sm' >{label}</label>
            <div className='flex justify-between items-center border border-gray-200 px-4 py-2 rounded-lg'>
                <input
                    type={type === "password"? showPassword?"text":"password":type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => handleChange(e)}
                    required={required}
                    className='w-full bg-transparent outline-none'
                />
                {
                    type === "password" && (showPassword ?
                        <>
                            <FaRegEye size={22} className='text-primary cursor-pointer' onClick={() => setShowPassword(!showPassword)} />
                        </> : <>
                            <FaRegEyeSlash size={22} className='text-gray-400 cursor-pointer' onClick={() => setShowPassword(!showPassword)} />
                        </>)
                }
            </div>
        </div>
    )
}

export default Input