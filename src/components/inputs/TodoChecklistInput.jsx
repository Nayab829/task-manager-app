import React, { useState } from 'react'
import { HiPlus, HiTrash } from 'react-icons/hi'

const TodoChecklistInput = ({ todoList, setTodoList }) => {
    const [option, setOption] = useState("")
    const handleAdd = () => {
        if (!option.trim()) return;
         const newTask = {
    text: option,
    completed: false, // default
  };
        setTodoList([...(todoList || []), newTask])
        setOption("")

    }
    const handleDelete = (index) => {
        const updated = todoList.filter((_, i) => i !== index);
        setTodoList(updated)
    }
    return (
        <div>
            {todoList?.map((task, index) => {
                return <div className='flex justify-between items-center bg-gray-50 border border-gray-200 mt-2 px-2 py-2 text-gray-600 text-sm'
                    key={index}>
                    <p>
                        <span className='text-gray-400 mr-1.5'>{index < 9 ? `0${index + 1}` : index + 1}</span>
                        {task.text}
                    </p>
                    <button
                        onClick={() => handleDelete(index)}


                        className='outline-none'>
                        <HiTrash
                            className='text-red-500/90 text-lg cursor-pointer' />
                    </button>
                </div>
            })}
            <div className='flex items-center gap-1 mt-2 '>
                <input
                    type="text"
                    value={option}
                    onChange={(e) => setOption(e.target.value)}
                    className=' w-full border border-gray-200/50 px-2 py-1 outline-none ' />
                <button
                    onClick={handleAdd}
                    className='flex items-center text-sm text-gray-500 border border-gray-200 gap-2 px-2 py-1 cursor-pointer'
                ><HiPlus /> Add</button>
            </div>
        </div>
    )
}

export default TodoChecklistInput