import React from 'react'

const AvatarGroup = ({ avatars, maxVisible }) => {
    return (
        <div className='flex items-center'>
            {avatars.slice(0, maxVisible).map((avatar, index) => {
                return <img src={avatar} alt={`avatar ${index}`} key={index} className='w-10 h-10 rounded-full -ml-4 first:ml-0' />
            })}
            {avatars.length > maxVisible && <div className='w-10 h-10 bg-blue-50 text-xs flex items-center  rounded-full justify-center -ml-4 border border-white'>
                +{avatars.length - maxVisible}</div>}
        </div>
    )
}

export default AvatarGroup