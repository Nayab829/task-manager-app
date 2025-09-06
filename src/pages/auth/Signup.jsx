import AuthForm from '../../components/AuthForm'
import AuthLayout from '../../components/Layouts/AuthLayout'
import { Link, useNavigate } from "react-router"
import { useState } from 'react'
import Input from '../../components/inputs/Input'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { useAuth } from '../../context/UserContext'
import AvatarSelector from '../../components/inputs/AvatarSelector'
import { isEmailValid } from '../../utils/helper'
const Signup = () => {
    const navigate = useNavigate()
    const { updateUser } = useAuth()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [avatar, setAvatar] = useState(null)
    const [adminInviteToken, setAdminInviteToken] = useState("")
    const [error, setError] = useState("")
    const handleSignup = async (e) => {
        e.preventDefault()

        setError(null);
        if (!name.trim()) {
            setError("Name is required");
            return;
        }
        if (!email.trim() || !isEmailValid(email)) {
            setError("Invalid Email value")
            return;
        }
        if (!password || password.length < 8 || password.length > 15) {
            setError("Password length must be between 8 and 15 characters.")
            return;
        }
        try {
            const formData = new FormData()
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("adminInviteToken", adminInviteToken);
            if (avatar) formData.append("avatar", avatar)
            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            updateUser(response.data);
            const { role } = response.data.data;

            if (role === "member") {
                navigate("/user/dashboard")
            } else {
                navigate("/admin/dashboard")

            }

        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Signup failed, please try again.");

        }
    }
    return (
        <AuthLayout>
            <AuthForm
                title="Create Account"
                buttonText="Sign Up"
                onSubmit={handleSignup}
                footer={
                    <>
                        <p className='mt-4 text-[14px]'>
                            Already have an account?{" "}
                            <Link to="/login" className="text-primary hover:underline">
                                Login
                            </Link>
                        </p>

                    </>}
            >
                <AvatarSelector avatar={avatar} setAvatar={setAvatar} />

                <Input
                    type="text"
                    label="Name"
                    value={name}
                    required
                    handleChange={(e) => setName(e.target.value)}
                    placeholder="John Doe" />
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
                <Input
                    type="text"
                    label="Admin Invite Token"
                    value={adminInviteToken}
                    handleChange={(e) => setAdminInviteToken(e.target.value)}
                    placeholder="*****" />
                {error && <p className='text-sm text-red-500 text-center'>{error}</p>}
            </AuthForm>
        </AuthLayout>
    )
}

export default Signup