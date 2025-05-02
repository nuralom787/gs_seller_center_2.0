import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router";
import { Tooltip } from "react-tooltip";
import useCustomers from "../../Hooks/useCustomers";
import { ScaleLoader } from "react-spinners";
import empty from '../../../assets/Images/empty.svg';
import ReactPaginate from "react-paginate";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import defaultUserImg from '../../../assets/Images/User/user.png';

const Customers = () => {
    const axiosSecure = useAxiosSecure();
    const [customers, refetch, isPending, isError, currentPage, setCurrentPage, itemPerPage, handleSearch] = useCustomers();
    const { register, handleSubmit } = useForm();
    const totalPages = Math.ceil(customers?.count / itemPerPage);



    // Search Specific User By Additional Information.
    const onSubmit = (value) => {
        handleSearch(value.search);
    };


    // Delete Customers Function.
    const deleteCustomer = (customer) => {
        Swal.fire({
            title: "Are you sure?",
            html: `
            <p>You rally want to delete <strong>${customer.displayName}</strong> information? Once you delete this, you can not revert it!</p>
            `,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                toast.info("This feature is disabled for demo!", {
                    position: "top-center",
                    autoClose: 1500
                });
                // Call Delete Api.
                // const deleteRes = await axiosSecure.delete(`/customer/delete/${customer._id}`);

                // if (deleteRes.data.deletedCount > 0) {
                //     refetch();
                //     Swal.fire({
                //         title: "Deleted!",
                //         text: "Customer Information Deleted Successfully.",
                //         icon: "success"
                //     });
                // }
            }
        });
    };


    // Handle Pagination Page Click Function.
    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
    };

    return (
        <section className="max-h-screen min-h-screen overflow-y-auto pt-20 bg-[#FAFAFA] dark:bg-base-300">
            <Tooltip id="my-tooltip" />
            <Helmet>
                <title>GS Seller Center | Customers</title>
            </Helmet>
            <div className='px-6 mx-auto'>
                <h2 className='my-4 font-bold font-sans text-xl text-[#151515] dark:text-white'>Customers</h2>
                <div className='bg-white dark:bg-gray-800 border border-gray-300  dark:border-gray-800 rounded-md'>
                    <form onSubmit={handleSubmit(onSubmit)} className='px-4 py-6'>
                        <input
                            {...register("search")}
                            className='w-full dark:focus:border-gray-100 bg-gray-200 dark:bg-gray-800 p-3 border border-gray-300 dark:border-gray-500 text-[#151515] dark:text-white outline-0 rounded-md text-sm font-sans font-semibold'
                            type="search"
                            placeholder='Search by name/email/phone' />
                    </form>
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
                            <div className="font-sans">
                                {customers.count ?
                                    <div>
                                        <div className="w-full overflow-x-auto rounded-t-lg border border-gray-200 dark:border-gray-600 mt-4">
                                            <table className="w-full whitespace-nowrap">
                                                <thead className="text-xs font-semibold tracking-wide text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
                                                    <tr>
                                                        <td className="px-3 py-3">USER ID</td>
                                                        <td className="px-3 py-3">IMAGE</td>
                                                        <td className="px-3 py-3">NAME</td>
                                                        <td className="px-3 py-3">EMAIL</td>
                                                        <td className="px-3 py-3">JOINING DATE</td>
                                                        <td className="px-3 py-3">PHONE</td>
                                                        <td className="px-3 py-3">ACTIONS</td>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
                                                    {
                                                        customers?.customers.map(customer => <tr className='' key={customer._id}>
                                                            <td className='px-3 py-3 font-sans text-xs font-bold'>
                                                                {customer.uid}
                                                            </td>
                                                            <td className='px-3 py-3 font-sans flex items-center text-sm'>
                                                                <img className='w-12 shadow-inner rounded-full p-1 mr-2' src={customer?.photoURL || defaultUserImg} alt="" />
                                                            </td>
                                                            <td className='px-3 py-3 font-sans text-sm'>
                                                                {customer?.displayName}
                                                            </td>
                                                            <td className='px-3 py-3 font-sans text-sm'>
                                                                {customer?.email}
                                                            </td>
                                                            <td className='px-3 py-3 font-sans text-sm'>
                                                                {new Date(customer.createdAt).toLocaleDateString("en-BD", {
                                                                    day: "2-digit",
                                                                    month: "short",
                                                                    year: "numeric",
                                                                })}, {new Date(customer.createdAt).toLocaleTimeString("en-BD", {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                    hour12: true,
                                                                })}
                                                            </td>
                                                            <td className='px-3 py-3 font-sans text-sm'>
                                                                {customer?.phoneNumber}
                                                            </td>
                                                            <td className='px-2 py-3 font-sans text-sm'>
                                                                <div className="flex">
                                                                    <NavLink
                                                                        to={`/customers/customer/orders/${customer._id}`}
                                                                        data-tooltip-id="my-tooltip"
                                                                        data-tooltip-content="View Orders"
                                                                        data-tooltip-place="bottom"
                                                                        className="py-2 px-1 mx-1 text-gray-400 hover:text-green-600"
                                                                    >
                                                                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line>
                                                                        </svg>
                                                                    </NavLink>
                                                                    <button
                                                                        onClick={() => deleteCustomer(customer)}
                                                                        data-tooltip-id="my-tooltip"
                                                                        data-tooltip-content="Delete"
                                                                        data-tooltip-place="bottom"
                                                                        className="cursor-pointer py-2 px-1 mx-1 text-gray-400 hover:text-red-600"
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
                                        <div className='p-6 mb-10 flex justify-end items-center bg-white dark:bg-gray-900 border border-t-0 border-gray-200 dark:border-gray-700 rounded-b-lg'>
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
                                    <div className='text-center font-sans text-sm font-semibold py-32'>
                                        <div className='w-full'>
                                            <img className='w-32 mx-auto' src={empty} alt="" />
                                        </div>
                                        <p className='inline-flex items-center pt-4 text-green-600 font-sans text-2xl font-semibold'>
                                            No Customers Found!!
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="green" className="bi bi-emoji-frown-fill mx-2 text-gray-700" viewBox="0 0 16 16">
                                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm-2.715 5.933a.5.5 0 0 1-.183-.683A4.498 4.498 0 0 1 8 9.5a4.5 4.5 0 0 1 3.898 2.25.5.5 0 0 1-.866.5A3.498 3.498 0 0 0 8 10.5a3.498 3.498 0 0 0-3.032 1.75.5.5 0 0 1-.683.183zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z" />
                                            </svg>
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

export default Customers;