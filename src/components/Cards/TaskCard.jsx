import React from 'react'
import { getPriorityBadgeColor, getProgressColor, getStatusbadgeColor } from '../../utils/helper'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router'
import AvatarGroup from '../AvatarGroup'

const TaskCard = ({ task, onClick }) => {

    const avatars = task.assignedTo.map((user) => user.avatar)
    return (
        <div className='card cursor-pointer' key={task._id} onClick={() => onClick()}>
            <div className='flex gap-3 mb-2'>
                <span className={`${getStatusbadgeColor(task.status)} text-xs px-2 rounded-md`}>{task.status.replace("-", " ")}</span>
                <span className={`${getPriorityBadgeColor(task.priority)} text-xs px-2 rounded-md`}>
                    {task.priority}
                </span>
            </div>
            <h4 className='font-semibold text-gray-700'>{task.title}</h4>
            <p className='text-sm text-gray-500 line-clamp-2'>{task.description}</p>
            <div className='flex gap-1 text-sm my-2'>
                Tasks Done:
                <span>
                    {task.todoCheckList.filter((task) => task.completed).length || 0}/{task.todoCheckList.length}
                </span>
            </div>
            <div className='w-full bg-gray-200 h-1.5 rounded'>
                <div className={`h-1.5  rounded ${getProgressColor(task.status)}`}
                    style={{ width: `${task.progress}%` }}>

                </div>
            </div>

            <div className='flex items-center justify-between mt-2'>
                <p className='flex flex-col'>
                    <span className='text-xs text-gray-500'>Start Date</span>
                    <span className='text-sm'>{dayjs(task.createdAt).format("ddd, D MMM YYYY")}</span>
                </p>
                <p className='flex flex-col'>
                    <span className='text-xs text-gray-500'>Due Date</span>
                    <span className='text-sm'>{dayjs(task.dueDate).format("ddd, D MMM YYYY")}</span>
                </p>
            </div>
            <div className='mt-3'>
                <AvatarGroup avatars={avatars} maxVisible={3} />
            </div>
        </div>
    )
}

export default TaskCard