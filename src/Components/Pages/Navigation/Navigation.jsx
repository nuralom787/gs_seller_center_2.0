import { NavLink } from "react-router";
import { LuLayoutDashboard } from "react-icons/lu";
import { RiShoppingBag3Line } from "react-icons/ri";
import { FaList, FaRegCompass, FaRegUser, FaGift } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";
import { CiLogin } from "react-icons/ci";
import './Navigation.css';
import logoImg from '../../../assets/logo.jpg';


const Navigation = () => {


    return (
        <section className='navigation max-h-screen overflow-y-auto dark:bg-base-200'>
            <div className='flex justify-center items-center gap-2 px-6'>
                <img className='w-10' src={logoImg} alt="" />
                <h4 className='text-2xl font-bold font-sans text-[#151515] dark:text-white py-5'>GS Seller</h4>
            </div>
            <div className="divider mx-2 my-0 before:bg-[#151515] after:bg-[#151515] dark:before:bg-white dark:after:bg-white"></div>
            <ul className='font-sans pb-20'>
                <li className=''>
                    <NavLink className="px-6 py-4 flex items-center w-full text-lg font-semibold text-gray-500 dark:text-white hover:text-green-600 dark:hover:text-green-600 uppercase" to="/">
                        {/* <span className="absolute inset-y-0 left-0 w-1 bg-green-500 rounded-tr-lg rounded-br-lg" aria-hidden="true"></span> */}
                        <LuLayoutDashboard />
                        <p className='px-3'>Dashboard</p>
                    </NavLink>
                </li>
                <li className=''>
                    <NavLink className="px-6 py-4 flex items-center w-full text-lg font-semibold text-gray-500 dark:text-white hover:text-green-600 dark:hover:text-green-600 uppercase" to="/products">
                        {/* <span className="absolute inset-y-0 left-0 w-1 bg-green-500 rounded-tr-lg rounded-br-lg" aria-hidden="true"></span> */}
                        <RiShoppingBag3Line />
                        <p className='px-3'>Products</p>
                    </NavLink>
                </li>
                <li className=''>
                    <NavLink className="px-6 py-4 flex items-center w-full text-lg font-semibold text-gray-500 dark:text-white hover:text-green-600 dark:hover:text-green-600 uppercase" to="/category">
                        {/* <span className="absolute inset-y-0 left-0 w-1 bg-green-500 rounded-tr-lg rounded-br-lg" aria-hidden="true"></span> */}
                        <FaList />
                        <p className='px-3'>Category</p>
                    </NavLink>
                </li>
                <li className=''>
                    <NavLink className="px-6 py-4 flex items-center w-full text-lg font-semibold text-gray-500 dark:text-white hover:text-green-600 dark:hover:text-green-600 uppercase" to="/customers">
                        {/* <span className="absolute inset-y-0 left-0 w-1 bg-green-500 rounded-tr-lg rounded-br-lg" aria-hidden="true"></span> */}
                        <FaUserGroup />
                        <p className='px-3'>Customers</p>
                    </NavLink>
                </li>
                <li className=''>
                    <NavLink className="px-6 py-4 flex items-center w-full text-lg font-semibold text-gray-500 dark:text-white hover:text-green-600 dark:hover:text-green-600 uppercase" to="/orders">
                        {/* <span className="absolute inset-y-0 left-0 w-1 bg-green-500 rounded-tr-lg rounded-br-lg" aria-hidden="true"></span> */}
                        <FaRegCompass />
                        <p className='px-3'>Orders</p>
                    </NavLink>
                </li>
                <li className=''>
                    <NavLink className="px-6 py-4 flex items-center w-full text-lg font-semibold text-gray-500 dark:text-white hover:text-green-600 dark:hover:text-green-600 uppercase" to="/coupons">
                        {/* <span className="absolute inset-y-0 left-0 w-1 bg-green-500 rounded-tr-lg rounded-br-lg" aria-hidden="true"></span> */}
                        <FaGift />
                        <p className='px-3'>Coupon</p>
                    </NavLink>
                </li>
                <li className=''>
                    <NavLink className="px-6 py-4 flex items-center w-full text-lg font-semibold text-gray-500 dark:text-white hover:text-green-600 dark:hover:text-green-600 uppercase" to="/our-staff">
                        {/* && <span className="absolute inset-y-0 left-0 w-1 bg-green-500 rounded-tr-lg rounded-br-lg" aria-hidden="true"></span> */}
                        <FaRegUser />
                        <p className='px-3'>Our Staff</p>
                    </NavLink>
                </li>
                <li className=''>
                    <NavLink className="px-6 py-4 flex items-center w-full text-lg font-semibold text-gray-500 dark:text-white hover:text-green-600 dark:hover:text-green-600 uppercase" to="/setting">
                        {/* <span className="absolute inset-y-0 left-0 w-1 bg-green-500 rounded-tr-lg rounded-br-lg" aria-hidden="true"></span> */}
                        <FiSettings />
                        <p className='px-3'>Setting</p>
                    </NavLink>
                </li>
            </ul>
            <div className="flex justify-center">
                <button className="absolute bottom-6 flex justify-center items-center gap-4 cursor-pointer duration-150 font-semibold text-xl focus:outline-none px-10 py-3 rounded-md text-white border border-transparent bg-green-600 hover:bg-green-700 max-w-fit" type="button">
                    <CiLogin />
                    Log out
                </button>
            </div>
        </section>
    );
};

export default Navigation;