import React from 'react'
import AuthForm from '../../components/AuthForm'
import { Link, useNavigate } from "react-router"
import AuthLayout from '../../components/Layouts/AuthLayout'
import Input from '../../components/inputs/Input'
import { useState } from 'react'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { useAuth } from '../../context/UserContext'
import { isEmailValid } from '../../utils/helper'
const Login = () => {
    const { updateUser } = useAuth()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault()
        setError(null)
        if (!email.trim() || !isEmailValid(email)) {
            setError("Invalid Email value")
            return;
        }
        if (!password || password.length < 8 || password.length > 15) {
            setError("Password length must be between 8 and 15 characters.")
            return;
        }
        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password })
            updateUser(response.data)
            console.log(response.data);
            
            const { role } = response.data.data;

            if (role === "member") {
                navigate("/user/dashboard")
            } else {
                navigate("/admin/dashboard")

            }


        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Login failed, please try again.");

        }
    }
    return (
        <AuthLayout>
            <AuthForm
                title="Welcome Back "
                buttonText="Login"
                onSubmit={handleLogin}
                footer={
                    <>
                        <p className='mt-4 text-[14px]'>
                            Don’t have an account?{" "}
                            <Link to="/signup" className="text-primary hover:underline">
                                Sign up
                            </Link>
                        </p>

                    </>} >
                <Input
                    type="email"
                    label="Email:"
                    value={email}
                    required
                    handleChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com" />
                <Input
                    type="password"
                    label="Password"
                    value={password}
                    required
                    handleChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 8 characters" />
                {error && <p className="text-sm text-red-500 text-center">{error}</p>}

            </AuthForm>
        </AuthLayout>



    )
}

export default Login