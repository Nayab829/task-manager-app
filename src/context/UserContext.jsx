import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

const UserContext = createContext();


const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // setLoading(true);
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE, { withCredentials: true });
                if (response.data?.data) {
                    setUser(response.data.data);
                    // ✅ profile se direct user set

                } else {
                    setUser(null);
                }
            } catch (error) {
                console.log("Error fetching profile:", error);
                setUser(null);
                localStorage.removeItem("token");
            } finally {
                setLoading(false);
            }

        };
        const token = localStorage.getItem("token");
        if (token) {
            fetchUser();
        } else {
            setLoading(false);
        }
    }, []);
   
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