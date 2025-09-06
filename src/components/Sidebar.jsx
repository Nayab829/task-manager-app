import { Link, useNavigate } from 'react-router'
import img from '../assets/auth.svg'
import { SIDE_MENU__DATA, SIDE_MENU__DATA_USERS } from '../utils/data'
import { useAuth } from '../context/UserContext'

const Sidebar = ({ activeMenu }) => {
    const { user ,clearUser} = useAuth()
    const navigate = useNavigate()
    const handleRoute = (route) => {
        if (route === "/logout") {
            handleLogout();
            return
        }
        navigate(route)
    }
    const handleLogout = ()=>{
        localStorage.clear();
        clearUser();
        navigate("/login")

    }
    const sidebarData = user?.role === "admin" ? SIDE_MENU__DATA : SIDE_MENU__DATA_USERS
    return (
        <div className='h-screen w-[270px] border border-gray-100 shadow-xs  bg-white pt-10'>
            {/* profile image */}
            <div className='flex items-center justify-center flex-col gap-1'>
                <img src={user?.avatar || img} alt="" className='w-28 rounded-full border border-2-primary aspect-square' />
                {user?.role === "admin" && <span className='bg-primary text-white text-xs py-1 px-2 rounded-md'>Admin</span>}
            </div>
            <div className='flex flex-col items-center mt-2'>
                <h4 className='text-[17px]'>{user?.name || ""}</h4>
                <p className='text-gray-600'>{user?.email || ""}</p>
            </div>
            <div className='my-4'>
                {
                    sidebarData.map((data) => {
                        const Icon = data.icon;
                        return <button key={data.id} 
                        onClick={()=> handleRoute(data.path)}
                        className={`flex items-center py-2.5 px-6 gap-3 w-full hover:bg-gray-100 hover:text-primary cursor-pointer text-gray-800 ${activeMenu === data.label ? "border-r-4 border-primary bg-primary/10 text-primary" : ""}`}>
                            <span><Icon /></span>
                          
                                <span>{data.label}</span>
                        </button>
                    })
                }
            </div>
        </div>
    )
}

export default Sidebar