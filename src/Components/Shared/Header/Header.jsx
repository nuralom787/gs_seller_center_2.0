import { useContext, useEffect, useState } from "react";
import { MdSunny } from "react-icons/md";
import { FaMoon, FaRegBell } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router";
import defaultUser from '../../../assets/Images/User/user.png';
import { AuthContext } from "../../../Provider/AuthProvider";
import { Tooltip } from "react-tooltip";


const Header = ({ handleDrawer }) => {
    const { user, LogoutUser } = useContext(AuthContext);
    const [theme, setTheme] = useState(localStorage.getItem('theme'));
    const [dropdown, setDropdown] = useState(false);

    // console.log(user)

    const setDrop = () => {
        if (dropdown === true) {
            setDropdown(false);
        } else {
            setDropdown(true);
        };
    };


    // Set Dark Mode.
    const changeDarkMode = () => {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            localStorage.setItem('theme', 'light');
            setTheme('light');
        } else {
            localStorage.setItem('theme', 'dark');
            setTheme('dark');
        }
    };


    // Monitor Dark Mode.
    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
            document.documentElement.classList.remove('light')
        } else {
            document.documentElement.classList.add('light')
            document.documentElement.classList.remove('dark')
        }
    }, [theme]);

    return (
        <div className="header absolute w-full bg-gray-200 dark:bg-base-200 px-4 py-6 border-b border-b-black dark:border-b-white">
            <Tooltip id="my-tooltip" />
            <ul className="flex justify-between lg:justify-end items-center gap-6">
                <div className="lg:hidden">
                    <button onClick={handleDrawer}>
                        <GiHamburgerMenu className="text-[#151515] dark:text-white text-3xl" />
                    </button>
                </div>
                <div className="flex justify-between items-center gap-6">
                    <li className="font-semibold text-xl text-[#00a63e]">
                        {user && <p>{user?.email}</p>}
                    </li>
                    <li
                        className="text-2xl cursor-pointer text-[#00a63e]"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Theme"
                        data-tooltip-place="bottom"
                    >
                        {theme === "light" ?
                            <MdSunny onClick={() => changeDarkMode()} />
                            :
                            <FaMoon onClick={() => changeDarkMode()} />
                        }
                    </li>
                    <li
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Notification"
                        data-tooltip-place="bottom"
                    >
                        <button className="relative cursor-pointer align-middle rounded-md focus:outline-none">
                            <FaRegBell className="text-3xl text-[#00a63e]" />
                            <p className="absolute -top-1.5 -right-1 bg-red-500 text-white px-1.5 font-semibold text-sm rounded-full">16</p>
                        </button>
                    </li>
                    <li
                        className="relative text-left"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Profile"
                        data-tooltip-place="bottom"
                    >
                        <button onClick={setDrop} className=" cursor-pointer rounded-full dark:bg-gray-500 bg-white text-white h-8 w-8 font-medium mx-auto focus:outline-none">
                            <div className="relative rounded-full inline-block w-8 h-8 align-middle" aria-hidden="true">
                                <img className="object-cover w-8 h-8 rounded-full" src={defaultUser} alt='' />
                            </div>
                        </button>
                        <ul className={dropdown ? "origin-top-right absolute right-0 mt-2 w-56 shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none" : "origin-top-right absolute right-0 mt-2 w-56 shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none hidden"}>
                            <li className="justify-between font-serif font-medium py-2 pl-4 transition-colors duration-150 hover:bg-gray-100 text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200">
                                <NavLink to="/">
                                    <span className="flex items-center text-sm">
                                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="w-4 h-4 mr-3" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect width="176" height="176" x="48" y="48" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" rx="20" ry="20"></rect><rect width="176" height="176" x="288" y="48" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" rx="20" ry="20"></rect><rect width="176" height="176" x="48" y="288" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" rx="20" ry="20"></rect><rect width="176" height="176" x="288" y="288" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" rx="20" ry="20"></rect>
                                        </svg>
                                        <span className='text-sm font-bold font-sans'>Dashboard</span>
                                    </span>
                                </NavLink>
                            </li>
                            <li className="justify-between font-serif font-medium py-2 pl-4 transition-colors duration-150 hover:bg-gray-100 text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200">
                                <NavLink to="/update-profile">
                                    <span className="flex items-center text-sm">
                                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="w-4 h-4 mr-3" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M262.29 192.31a64 64 0 1057.4 57.4 64.13 64.13 0 00-57.4-57.4zM416.39 256a154.34 154.34 0 01-1.53 20.79l45.21 35.46a10.81 10.81 0 012.45 13.75l-42.77 74a10.81 10.81 0 01-13.14 4.59l-44.9-18.08a16.11 16.11 0 00-15.17 1.75A164.48 164.48 0 01325 400.8a15.94 15.94 0 00-8.82 12.14l-6.73 47.89a11.08 11.08 0 01-10.68 9.17h-85.54a11.11 11.11 0 01-10.69-8.87l-6.72-47.82a16.07 16.07 0 00-9-12.22 155.3 155.3 0 01-21.46-12.57 16 16 0 00-15.11-1.71l-44.89 18.07a10.81 10.81 0 01-13.14-4.58l-42.77-74a10.8 10.8 0 012.45-13.75l38.21-30a16.05 16.05 0 006-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 00-6.07-13.94l-38.19-30A10.81 10.81 0 0149.48 186l42.77-74a10.81 10.81 0 0113.14-4.59l44.9 18.08a16.11 16.11 0 0015.17-1.75A164.48 164.48 0 01187 111.2a15.94 15.94 0 008.82-12.14l6.73-47.89A11.08 11.08 0 01213.23 42h85.54a11.11 11.11 0 0110.69 8.87l6.72 47.82a16.07 16.07 0 009 12.22 155.3 155.3 0 0121.46 12.57 16 16 0 0015.11 1.71l44.89-18.07a10.81 10.81 0 0113.14 4.58l42.77 74a10.8 10.8 0 01-2.45 13.75l-38.21 30a16.05 16.05 0 00-6.05 14.08c.33 4.14.55 8.3.55 12.47z">
                                        </path>
                                        </svg>
                                        <span className='text-sm font-bold font-sans'>Edit Profile</span>
                                    </span>
                                </NavLink>
                            </li>
                            <li className="cursor-pointer justify-between font-serif font-medium py-2 pl-4 transition-colors duration-150 hover:bg-gray-100 text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200">
                                <button onClick={LogoutUser} className='w-full'>
                                    <span className="flex items-center text-sm">
                                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="w-4 h-4 mr-3" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                            <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M304 336v40a40 40 0 01-40 40H104a40 40 0 01-40-40V136a40 40 0 0140-40h152c22.09 0 48 17.91 48 40v40m64 160l80-80-80-80m-192 80h256">
                                            </path>
                                        </svg>
                                        <span className='text-sm font-bold font-sans'>Log out</span>
                                    </span>
                                </button>
                            </li>
                        </ul>
                    </li>
                </div>
            </ul>
        </div>
    );
};

export default Header;