import { NavLink, useLocation, useNavigate } from "react-router";
import logo from '../../../../assets/logo.jpg';
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import { toast } from "react-toastify";


const Login = () => {
    const { LoginUser, loading } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const onSubmit = (data) => {
        const { email, password } = data;
        LoginUser(email, password)
            .then(result => {
                // const user = result.user;
                navigate(from, { replace: true });
                toast.success('User Login Successfully', {
                    position: 'top-right',
                    autoClose: 2500
                })
                // console.log(user);
            })
            .catch(err => {
                toast.error(err.message, {
                    position: 'top-center',
                    autoClose: 5000
                });
            })
    };


    return (
        <section className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <img
                        className="mx-auto h-12 w-auto"
                        src={logo}
                        alt=""
                    />
                    <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm font-bold text-gray-600 dark:text-gray-300">
                        GS-SELLER-CENTER
                    </p>
                </div>
                <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="" className="text-base font-bold">
                                Email address
                            </label>
                            <input
                                defaultValue="test@user.com"
                                {...register("email", { required: "Enter Your Email Please *" })}
                                type="email"
                                autoComplete="email"
                                className="w-full rounded-md border border-gray-300 my-2 px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-200 focus:border-indigo-500 outline-none"
                                placeholder="Email address"
                            />
                            {errors.email && <span className='text-sm text-red-600 mt-1'>{errors.email.message}</span>}
                        </div>
                        <div>
                            <label htmlFor="" className="text-base font-bold">
                                Password
                            </label>
                            <input
                                defaultValue="testUser"
                                {...register("password", { required: "Enter Your Password Please *" })}
                                type="password"
                                autoComplete="current-password"
                                className="w-full rounded-md border border-gray-300 my-2 px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-200 focus:border-indigo-500 outline-none"
                                placeholder="Password"
                            />
                            {errors.password && <span className='text-sm text-red-600 mt-1'>{errors.password.message}</span>}
                        </div>
                    </div>
                    <div className="text-sm text-right">
                        <NavLink
                            to="/forgot_password"
                            className="font-semibold text-base text-indigo-500 hover:text-indigo-700 duration-300 hover:underline">
                            Forgot your password?
                        </NavLink>
                    </div>
                    <div>
                        {loading ?
                            <button
                                className="w-full inline-flex justify-center items-center rounded-md border border-transparent py-3 text-xl font-semibold text-white bg-indigo-700 outline-0">
                                Processing...
                                <svg className="ml-2 h-4 w-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </button>
                            :
                            <button
                                type="submit"
                                className="w-full cursor-pointer rounded-md border border-transparent py-3 text-xl font-semibold text-white bg-indigo-500 hover:bg-indigo-700 duration-500 outline-0">
                                Sign in
                            </button>
                        }
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Login;