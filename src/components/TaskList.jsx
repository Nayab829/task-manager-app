import dayjs from 'dayjs'
import { getPriorityBadgeColor, getStatusbadgeColor } from '../utils/helper'

const TaskList = ({ tableData }) => {
   
    return (
        <div className='overflow-x-auto mt-3 p-0 '>
            <table className="min-w-full">
                <thead className=''>
                    <tr className='text-left'>
                        <th className='px-4 py-3 text-[13px] text-gray-800 font-medium'>Name</th>
                        <th className='px-4 py-3 text-[13px] text-gray-800 font-medium'>status</th>
                        <th className='px-4 py-3 text-[13px] text-gray-800 font-medium'>Priority</th>
                        <th className='px-4 py-3 text-[13px] text-gray-800 font-medium hidden md:table-cell text-center'>Created On</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tableData?.map((task, index) => {
                            return <tr key={index} className='border-t border-gray-200'>
                                <td className='px-4 py-4 text-[13px] line-clamp-1 overflow-hidden  my-3'>{task.title}</td>
                                <td className={`px-2 py-4 `}>
                                    <span className={` text-xs px-2 py-1 ${getStatusbadgeColor(task.status)} rounded-lg `}>
                                        {task.status}
                                    </span>
                                </td>
                                <td className={`px-2 py-4`}>
                                    <span className={` text-xs px-2 py-1 ${getPriorityBadgeColor(task.priority)} text-nowrap rounded-lg `}>
                                        {task.priority}
                                    </span>
                                </td>
                                <td className='px-4 py-4 text-[13px] hidden md:table-cell text-center'>{task.createdAt ? dayjs(task.createdAt).format("dddd D MMM YYYY") : "N/A"}</td>
                            </tr>
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}

export default TaskList