import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router";
import useStaffs from "../../Hooks/useStaffs";
import ReactPaginate from "react-paginate";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { ScaleLoader } from "react-spinners";
import empty from '../../../assets/Images/empty.svg';
import { PiSmileySadBold } from "react-icons/pi";
import { Tooltip } from "react-tooltip";

const OurStaffs = () => {
    const { register, handleSubmit } = useForm();
    const [staffs, refetch, isPending, isError, currentPage, setCurrentPage, itemPerPage, handleSearch, handleRole] = useStaffs();
    const totalPages = Math.ceil(staffs?.count / itemPerPage);


    // Handle Search Function.
    const onSubmit = (data) => {
        handleSearch(data.search);
        // console.log(data);
    };


    // Handle Pagination Page Click Function.
    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
    };


    return (
        <section className="max-h-screen min-h-screen overflow-y-auto pt-20 bg-[#FAFAFA] dark:bg-base-300">
            <Tooltip id="my-tooltip" />
            <div className='px-6 w-full'>
                <h2 className='my-4 font-bold text-xl text-[#151515] dark:text-white'>Our Staffs</h2>
                <div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-md mb-6'>
                    <div className='grid grid-cols-1 md:grid-cols-5 px-4 py-6 gap-4'>
                        <div className="col-span-1 md:col-span-2">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <input
                                    {...register("search")}
                                    className='w-full bg-gray-100 dark:bg-gray-800 p-3 border border-gray-300 dark:focus:border-gray-100 dark:border-gray-500 text-[#151515] dark:text-white outline-0 text-base rounded-md'
                                    type="search"
                                    placeholder='Search by Customer name/email/number'
                                />
                            </form>
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <select
                                onChange={(e) => handleRole(e.target.value)}
                                className='cursor-pointer w-full bg-gray-100 dark:bg-gray-800 p-3 border border-gray-300 dark:focus:border-gray-100 dark:border-gray-500 text-[#151515] dark:text-white outline-0 text-base rounded-md'
                            >
                                <option value="">Staff Role</option>
                                <option value="CEO">CEO</option>
                                <option value="ADMIN">ADMIN</option>
                                <option value="MANAGER">MANAGER</option>
                                <option value="ACCOUNTANT">ACCOUNTANT</option>
                                <option value="DRIVER">DRIVER</option>
                                <option value="SECURITY">SECURITY GUARD</option>
                                <option value="DELIVERY">DELIVERY MAN</option>
                            </select>
                        </div>
                        <div className='col-span-1'>
                            <NavLink
                                to="/our-staffs/add-staff"
                                className='block w-full bg-green-600 hover:bg-green-700 text-white p-2.5 rounded-md text-center text-xl font-semibold duration-500'
                            >
                                + Add Staff
                            </NavLink>
                        </div>
                    </div>
                </div>

                {isPending ?
                    <div className="flex justify-center items-center my-40">
                        <ScaleLoader
                            color={"#00a63e"}
                            loading={true}
                            size={500}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                    :
                    <div>
                        {isError ?
                            <div className="flex justify-center my-40">
                                <h1 className="text-red-700">Internal server error!! Please reload the browser & try again</h1>
                            </div>
                            :
                            <div>
                                {staffs.count ?
                                    <div>
                                        <div className="w-full overflow-x-auto rounded-t-lg border border-gray-200 dark:border-gray-600">
                                            <table className="w-full whitespace-nowrap">
                                                <thead className="text-xs font-semibold tracking-wide text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
                                                    <tr>
                                                        <td className="px-3 py-3">ID</td>
                                                        <td className="px-3 py-3">IMAGE</td>
                                                        <td className="px-3 py-3">NAME</td>
                                                        <td className="px-3 py-3">EMAIL</td>
                                                        <td className="px-3 py-3">CONTACT</td>
                                                        <td className="px-3 py-3">JOINING DATE</td>
                                                        <td className="px-3 py-3">ROLE</td>
                                                        <td className="px-3 py-3">ACTIONS</td>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
                                                    {
                                                        staffs?.staffs?.map(staff => <tr className='' key={staff.staffId}>
                                                            <td className='px-3 py-3 text-xs font-bold'>
                                                                {staff.staffId.toUpperCase()}
                                                            </td>
                                                            <td className='px-3 py-3 text-sm'>
                                                                <img className='w-10 h-10 rounded-full' src={`data:image/*;base64,${staff.photoURL}`} alt="" />
                                                            </td>
                                                            <td className='px-3 py-3 text-sm'>
                                                                {staff.displayName}
                                                            </td>
                                                            <td className='px-3 py-3 text-sm'>
                                                                {staff.email}
                                                            </td>
                                                            <td className='px-3 py-3 text-sm'>
                                                                {staff.contact}
                                                            </td>
                                                            <td className='px-3 py-3 text-sm'>
                                                                {staff.joiningDate &&
                                                                    <span>
                                                                        {new Date(staff.joiningDate).toDateString().slice(4, 10)},
                                                                        {new Date(staff.joiningDate).toDateString().slice(10, 15)}
                                                                    </span>
                                                                }
                                                            </td>
                                                            <td className='px-3 py-3 text-sm font-semibold'>
                                                                {staff.role}
                                                            </td>
                                                            <td className='py-3 text-sm'>
                                                                <div className="flex items-center">
                                                                    <NavLink
                                                                        to={`/our-staffs/update/${staff._id}`}
                                                                        className="p-2 cursor-pointer text-gray-400 hover:text-green-600"
                                                                        data-tooltip-id="my-tooltip"
                                                                        data-tooltip-content="Update Staff"
                                                                        data-tooltip-place="bottom"
                                                                    >
                                                                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                                    </NavLink>
                                                                    <button
                                                                        className="p-2 cursor-pointer text-gray-400 hover:text-red-600"
                                                                        data-tooltip-id="my-tooltip"
                                                                        data-tooltip-content="Delete Staff"
                                                                        data-tooltip-place="bottom"
                                                                    >
                                                                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>)
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="p-6 mb-10 flex justify-end items-center bg-white dark:bg-gray-900 border border-t-0 border-gray-100 dark:border-gray-700 rounded-b-lg">
                                            <ReactPaginate
                                                previousLabel={<FaArrowLeft />}
                                                nextLabel={<FaArrowRight />}
                                                breakLabel={"..."}
                                                pageCount={totalPages}
                                                forcePage={currentPage - 1}
                                                marginPagesDisplayed={1}
                                                pageRangeDisplayed={3}
                                                onPageChange={handlePageClick}
                                                containerClassName={"flex space-x-2 cursor-pointer"}
                                                pageClassName={"px-3 py-1 text-[#151515] dark:text-white hover:text-white dark:bg-gray-900 hover:bg-green-600 dark:hover:bg-base-100 duration-300 font-bold rounded"}
                                                activeClassName={"bg-green-600 dark:bg-green-600 dark:hover:bg-green-600 transition-discrete font-bold text-white"}
                                                previousClassName={"p-2 text-lg text-[#151515] hover:text-white dark:text-white hover:bg-green-600 duration-300 rounded"}
                                                nextClassName={"p-2 text-lg text-[#151515] hover:text-white dark:text-white hover:bg-green-600 duration-300 rounded"}
                                                breakClassName={"px-3 py-1 text-[#151515] dark:text-white"}
                                            />
                                        </div>
                                    </div>
                                    :
                                    <div className='text-center my-32'>
                                        <div className='w-full'>
                                            <img className='w-32 mx-auto' src={empty} alt="" />
                                        </div>
                                        <p className='inline-flex items-center gap-2 pt-4 text-green-600 font-sans text-3xl font-semibold'>
                                            No Staff Found!!
                                            <PiSmileySadBold />
                                        </p>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                }
            </div>
        </section>
    );
};

export default OurStaffs;