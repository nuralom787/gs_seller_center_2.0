import { NavLink } from "react-router";
import { LuLayoutDashboard } from "react-icons/lu";
import { RiShoppingBag3Line } from "react-icons/ri";
import { FaList, FaRegCompass, FaRegUser, FaGift } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";
import './Navigation.css';
import logoImg from '../../../assets/logo.jpg';


const Navigation = () => {


    return (
        <div className='navigation hidden md:block min-h-screen dark:bg-[#151515]'>
            <div className='flex justify-center items-center gap-2 px-6'>
                <img className='w-10' src={logoImg} alt="" />
                <h4 className='text-2xl font-bold font-sans text-[#151515] dark:text-white py-5'>GS Seller</h4>
            </div>
            {/* <div className="divider mx-2 mt-0 mb-2 after:bg-[#151515] before:bg-[#151515] dark:before:bg-white dark:after:bg-white"></div> */}
            <ul className='font-sans'>
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
            {/* <span className="lg:fixed bottom-0 px-5 py-6 mx-auto relative mt-3 block">
                <button className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-10 py-3 rounded-lg text-white border border-transparent bg-green-600 hover:bg-green-700 w-full" type="button">
                    <span className="flex items-center">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="mr-3 text-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M304 336v40a40 40 0 01-40 40H104a40 40 0 01-40-40V136a40 40 0 0140-40h152c22.09 0 48 17.91 48 40v40m64 160l80-80-80-80m-192 80h256"></path>
                        </svg>
                        <span className="text-sm">
                            Log out
                        </span>
                    </span>
                </button>
            </span> */}
        </div>
    );
};

export default Navigation;