import React from 'react'
import AuthForm from '../../components/AuthForm'
import { Link, useNavigate } from "react-router"
import AuthLayout from '../../components/Layouts/AuthLayout'
import Input from '../../components/inputs/Input'
import { useState } from 'react'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { useAuth } from '../../context/UserContext'
const Login = () => {
    const {updateUser} = useAuth()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password })
            const {token} = response.data
            updateUser(response.data)
            const { role } = response.data.data;

            if (role === "member") {
                navigate("/user/dashboard")
            } else {
                navigate("/admin/dashboard")

            }


        } catch (error) {

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
            </AuthForm>
        </AuthLayout>



    )
}

export default Login