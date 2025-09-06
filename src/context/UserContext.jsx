import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
// import { useNavigate } from "react-router";

const UserContext = createContext();


const UserProvider = ({ children }) => {
    // const navigate = useNavigate()
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE, { withCredentials: true });
                setUser(response.data.user);
                console.log(response);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []); // 🔹 empty dependency array
    const updateUser = (userData) => {
        setUser(userData.data);
        localStorage.setItem("token", userData.token);
        setLoading(false)
        
    }
    const clearUser = () => {
        setUser(null);
        localStorage.removeItem("token")
    }
    return <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
        {children}
    </UserContext.Provider>
}

const useAuth = () => useContext(UserContext)

export { useAuth, UserProvider }