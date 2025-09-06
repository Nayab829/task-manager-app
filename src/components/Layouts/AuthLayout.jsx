import img from "../../assets/auth.svg"
const AuthLayout = ({ children }) => {
    return (
        <section
            className='flex border border-gray-200  lg:flex-row shadow-2xl justify-center items-center gap-8 min-h-screen flex-col-reverse px-4 md:px-0'>
            <div>
                {children}
            </div>
            <div>
                <img src={img} alt="auth image" className='w-80' />
            </div>
        </section>
    )
}

export default AuthLayout