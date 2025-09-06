import React from 'react'
import Input from './inputs/Input'

const AuthForm = ({ title, children, footer, buttonText, onSubmit }) => {
    return (
        <div className='md:w-[450px] sm:w-[400px] w-[290px] '>
            <h2 className='text-2xl text-gray-700 font-semibold mb-2'>{title}</h2>
            <form onSubmit={onSubmit}>
                {children}
                <button
                
                    type='submit'
                    className='w-full bg-primary mt-3 text-white py-2 cursor-pointer px-4 rounded-md  font-[500] text-[14px]'
                >
                    {buttonText}
                </button>
                {footer && <div>{footer}</div>}
            </form>
        </div>
    )
}

export default AuthForm