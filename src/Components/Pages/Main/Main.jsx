import { NavLink, Outlet } from "react-router";
import Navigation from "../Navigation/Navigation";
import Header from "../../Shared/Header/Header";
import { useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { RiShoppingBag3Line } from "react-icons/ri";
import { FaGift, FaList, FaRegCompass, FaRegUser } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";
import { CiLogin } from "react-icons/ci";
import logoImg from '../../../assets/logo.jpg';
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'

const Main = () => {
    const [drawer, setDrawer] = useState(false);

    const handleDrawer = () => {
        setDrawer(!drawer);
    }

    return (
        <div className="max-w-7xl mx-auto min-h-screen md:flex">
            <div className="side-nav relative hidden lg:block w-1/5 bg-gray-200 dark:bg-base-200">
                <Navigation />
            </div>
            <div className="relative w-full lg:w-4/5">
                <Header handleDrawer={handleDrawer} />
                <Drawer
                    open={drawer}
                    onClose={handleDrawer}
                    direction='left'
                    className='bla bla bla'
                >
                    <section className='navigation max-h-screen min-h-screen overflow-y-auto dark:bg-base-200'>
                        <div className='flex justify-center items-center gap-2 px-6'>
                            <img className='w-10' src={logoImg} alt="" />
                            <h4 className='text-2xl font-bold font-sans text-[#151515] dark:text-white py-5'>GS Seller</h4>
                        </div>

                        <div className="divider mx-2 my-0 before:bg-[#151515] after:bg-[#151515] dark:before:bg-white dark:after:bg-white"></div>

                        <ul className='font-sans pb-20'>
                            <li className=''>
                                <NavLink
                                    onClick={handleDrawer}
                                    className="px-6 py-4 flex items-center w-full text-lg font-semibold text-gray-500 dark:text-white hover:text-green-600 dark:hover:text-green-600 uppercase"
                                    to="/"
                                >
                                    <LuLayoutDashboard />
                                    <p className='px-3'>Dashboard</p>
                                </NavLink>
                            </li>
                            <li className=''>
                                <NavLink
                                    onClick={handleDrawer}
                                    className="px-6 py-4 flex items-center w-full text-lg font-semibold text-gray-500 dark:text-white hover:text-green-600 dark:hover:text-green-600 uppercase"
                                    to="/products"
                                >
                                    <RiShoppingBag3Line />
                                    <p className='px-3'>Products</p>
                                </NavLink>
                            </li>
                            <li className=''>
                                <NavLink
                                    onClick={handleDrawer}
                                    className="px-6 py-4 flex items-center w-full text-lg font-semibold text-gray-500 dark:text-white hover:text-green-600 dark:hover:text-green-600 uppercase"
                                    to="/categories"
                                >
                                    <FaList />
                                    <p className='px-3'>Categories</p>
                                </NavLink>
                            </li>
                            <li className=''>
                                <NavLink
                                    onClick={handleDrawer}
                                    className="px-6 py-4 flex items-center w-full text-lg font-semibold text-gray-500 dark:text-white hover:text-green-600 dark:hover:text-green-600 uppercase"
                                    to="/customers"
                                >
                                    <FaUserGroup />
                                    <p className='px-3'>Customers</p>
                                </NavLink>
                            </li>
                            <li className=''>
                                <NavLink
                                    onClick={handleDrawer}
                                    className="px-6 py-4 flex items-center w-full text-lg font-semibold text-gray-500 dark:text-white hover:text-green-600 dark:hover:text-green-600 uppercase"
                                    to="/orders"
                                >
                                    <FaRegCompass />
                                    <p className='px-3'>Orders</p>
                                </NavLink>
                            </li>
                            <li className=''>
                                <NavLink
                                    onClick={handleDrawer}
                                    className="px-6 py-4 flex items-center w-full text-lg font-semibold text-gray-500 dark:text-white hover:text-green-600 dark:hover:text-green-600 uppercase"
                                    to="/coupons"
                                >
                                    <FaGift />
                                    <p className='px-3'>Coupons</p>
                                </NavLink>
                            </li>
                            <li className=''>
                                <NavLink
                                    onClick={handleDrawer}
                                    className="px-6 py-4 flex items-center w-full text-lg font-semibold text-gray-500 dark:text-white hover:text-green-600 dark:hover:text-green-600 uppercase"
                                    to="/our-staffs"
                                >
                                    <FaRegUser />
                                    <p className='px-3'>Our Staffs</p>
                                </NavLink>
                            </li>
                            <li className=''>
                                <NavLink
                                    onClick={handleDrawer}
                                    className="px-6 py-4 flex items-center w-full text-lg font-semibold text-gray-500 dark:text-white hover:text-green-600 dark:hover:text-green-600 uppercase"
                                    to="/settings"
                                >
                                    <FiSettings />
                                    <p className='px-3'>Settings</p>
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
                </Drawer>
                <Outlet />
            </div>
        </div>
    );
};

export default Main;