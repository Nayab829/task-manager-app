import AuthForm from '../../components/AuthForm'
import AuthLayout from '../../components/Layouts/AuthLayout'
import { Link, useNavigate } from "react-router"
import { useState } from 'react'
import Input from '../../components/inputs/Input'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { useAuth } from '../../context/UserContext'
import AvatarSelector from '../../components/inputs/AvatarSelector'
const Signup = () => {
const navigate = useNavigate()
    const { updateUser } = useAuth()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [avatar, setAvatar] = useState(null)
    const [adminInviteToken, setAdminInviteToken] = useState("")
    const handleSignup = async (e) => {
        e.preventDefault()
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
            console.log(error);

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
            </AuthForm>
        </AuthLayout>
    )
}

export default Signup