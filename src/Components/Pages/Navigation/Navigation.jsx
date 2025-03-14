import { NavLink } from "react-router";
import { LuLayoutDashboard } from "react-icons/lu";
import { RiShoppingBag3Line } from "react-icons/ri";
import { FaList, FaRegCompass, FaRegUser, FaGift } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";
import { CiLogin } from "react-icons/ci";
import './Navigation.css';
import logoImg from '../../../assets/logo.jpg';
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";


const Navigation = () => {
    const { LogoutUser } = useContext(AuthContext);

    return (
        <section className='navigation max-h-screen overflow-y-auto dark:bg-base-200'>
            <div className='flex justify-center items-center gap-2 px-6'>
                <img className='w-10' src={logoImg} alt="" />
                <h4 className='text-2xl font-bold font-sans text-[#151515] dark:text-white py-5'>GS Seller</h4>
            </div>

            <div className="divider mx-2 my-0 before:bg-[#151515] after:bg-[#151515] dark:before:bg-white dark:after:bg-white"></div>

            <ul className='font-sans pb-20'>
                <li className=''>
                    <NavLink
                        className="px-6 py-4 flex items-center w-full text-lg font-semibold text-gray-500 dark:text-white hover:text-green-600 dark:hover:text-green-600 uppercase"
                        to="/"
                    >
                        <LuLayoutDashboard />
                        <p className='px-3'>Dashboard</p>
                    </NavLink>
                </li>
                <li className=''>
                    <NavLink
                        className="px-6 py-4 flex items-center w-full text-lg font-semibold text-gray-500 dark:text-white hover:text-green-600 dark:hover:text-green-600 uppercase"
                        to="/products"
                    >
                        <RiShoppingBag3Line />
                        <p className='px-3'>Products</p>
                    </NavLink>
                </li>
                <li className=''>
                    <NavLink
                        className="px-6 py-4 flex items-center w-full text-lg font-semibold text-gray-500 dark:text-white hover:text-green-600 dark:hover:text-green-600 uppercase"
                        to="/categories"
                    >
                        <FaList />
                        <p className='px-3'>Categories</p>
                    </NavLink>
                </li>
                <li className=''>
                    <NavLink
                        className="px-6 py-4 flex items-center w-full text-lg font-semibold text-gray-500 dark:text-white hover:text-green-600 dark:hover:text-green-600 uppercase"
                        to="/customers"
                    >
                        <FaUserGroup />
                        <p className='px-3'>Customers</p>
                    </NavLink>
                </li>
                <li className=''>
                    <NavLink
                        className="px-6 py-4 flex items-center w-full text-lg font-semibold text-gray-500 dark:text-white hover:text-green-600 dark:hover:text-green-600 uppercase"
                        to="/orders"
                    >
                        <FaRegCompass />
                        <p className='px-3'>Orders</p>
                    </NavLink>
                </li>
                <li className=''>
                    <NavLink
                        className="px-6 py-4 flex items-center w-full text-lg font-semibold text-gray-500 dark:text-white hover:text-green-600 dark:hover:text-green-600 uppercase"
                        to="/coupons"
                    >
                        <FaGift />
                        <p className='px-3'>Coupons</p>
                    </NavLink>
                </li>
                <li className=''>
                    <NavLink
                        className="px-6 py-4 flex items-center w-full text-lg font-semibold text-gray-500 dark:text-white hover:text-green-600 dark:hover:text-green-600 uppercase"
                        to="/our-staffs"
                    >
                        <FaRegUser />
                        <p className='px-3'>Our Staffs</p>
                    </NavLink>
                </li>
                <li className=''>
                    <NavLink
                        className="px-6 py-4 flex items-center w-full text-lg font-semibold text-gray-500 dark:text-white hover:text-green-600 dark:hover:text-green-600 uppercase"
                        to="/settings"
                    >
                        <FiSettings />
                        <p className='px-3'>Settings</p>
                    </NavLink>
                </li>
            </ul>
            <div className="flex justify-center">
                <button onClick={LogoutUser} className="absolute bottom-6 flex justify-center items-center gap-4 cursor-pointer duration-150 font-semibold text-xl focus:outline-none px-10 py-3 rounded-md text-white border border-transparent bg-green-600 hover:bg-green-700 max-w-fit" type="button">
                    <CiLogin />
                    Log out
                </button>
            </div>
        </section>
    );
};

export default Navigation;