import { NavLink, useParams } from "react-router";
import useCustomers from "../../Hooks/useCustomers";
import useOrders from "../../Hooks/useOrders";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { ScaleLoader } from "react-spinners";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const CustomerOrders = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [customers] = useCustomers();
    const customer = customers?.customers?.find(data => data._id === id);
    const [orders, refetch, isPending, isError, itemPerPage, currentPage, setItemPerPage, setCurrentPage] = useOrders(customer?.email);

    const totalPages = Math.ceil(orders?.count / itemPerPage);


    // Update Order Status Function.
    const updateOrderStatus = async (value, id) => {
        const currentStatus = { status: value };

        // Fetch Data By Using Axios.
        const statusRes = await axiosSecure.patch(`/update/order-status/${id}`, currentStatus);
        if (statusRes.data.modifiedCount > 0) {
            refetch();
            toast.success("Status Update Successfully!");
        }
        else {
            toast.error("Somethings wants wrong!! please try again.");
        };
    };


    // Handle Pagination Page Click Function.
    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
    };


    return (
        <section className="max-h-screen min-h-screen overflow-y-auto pt-20 bg-[#FAFAFA] dark:bg-base-300">
            <div className='px-6 w-full'>
                <div className='flex items-center justify-between gap-4'>
                    <h2 className='my-4 font-bold text-xl text-[#151515] dark:text-white'>Customers Order List</h2>
                    <button onClick={() => window.history.back()} className="font-medium outline-0 px-4 py-2 text-sm rounded-lg border border-green-500 bg-white dark:bg-gray-900 text-green-500 hover:bg-green-700 dark:hover:bg-green-700 hover:border-green-700 hover:text-white font-sans transition-colors duration-500">
                        Go Back
                    </button>
                </div>

                <div className="divider before:bg-[#151515] after:bg-[#151515] dark:before:bg-white dark:after:bg-white my-1"></div>

                <div className="my-6">
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
                                    {orders?.count ?
                                        <div>
                                            <div className="w-full overflow-x-auto rounded-t-lg border border-gray-200 dark:border-gray-600 mt-4">
                                                <table className="w-full whitespace-nowrap">
                                                    <thead className="text-xs font-semibold tracking-wide text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
                                                        <tr>
                                                            <td className="px-3 py-3">ID</td>
                                                            <td className="px-3 py-3">TIME</td>
                                                            <td className="px-3 py-3">SHIPPING ADDRESS</td>
                                                            <td className="px-3 py-3">PHONE</td>
                                                            <td className="px-3 py-3">METHOD</td>
                                                            <td className="px-3 py-3">AMOUNT</td>
                                                            <td className="px-3 py-3 text-center">STATUS</td>
                                                            <td className="px-3 py-3 text-center">ACTIONS</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-700 text-gray-700 dark:text-gray-300">
                                                        {
                                                            orders?.orders?.map(order => <tr className='' key={order._id}>
                                                                <td className='px-3 py-3 font-sans text-xs font-bold'>
                                                                    {order._id.slice(20, 24).toUpperCase()}
                                                                </td>
                                                                <td className='px-3 py-3 font-sans text-sm'>
                                                                    {new Date(order.orderTime).toLocaleDateString("en-BD", {
                                                                        day: "2-digit",
                                                                        month: "short",
                                                                        year: "numeric",
                                                                    })} {new Date(order.orderTime).toLocaleTimeString("en-BD", {
                                                                        hour: "2-digit",
                                                                        minute: "2-digit",
                                                                        hour12: true,
                                                                    })}
                                                                </td>
                                                                <td className='px-3 py-3 font-sans text-sm'>
                                                                    {order.city}, {order.street}
                                                                </td>
                                                                <td className='px-3 py-3 font-sans text-sm'>
                                                                    {order.phoneNumber}
                                                                </td>
                                                                <td className='px-3 py-3 font-sans font-bold'>
                                                                    {order.paymentMethod.type}
                                                                </td>
                                                                <td className='px-3 py-3 text-sm font-sans font-bold'>
                                                                    ${order.grandTotal.toFixed(2)}
                                                                </td>
                                                                <td className='px-2 py-3 font-sans text-sm'>
                                                                    {order.status === "Pending" &&
                                                                        <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-yellow-600 bg-yellow-100 dark:text-white dark:bg-yellow-600">Pending</span>
                                                                    }
                                                                    {order.status === "Processing" &&
                                                                        <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-blue-500 bg-blue-100 dark:text-white dark:bg-blue-800">Processing</span>
                                                                    }
                                                                    {order.status === "Delivered" &&
                                                                        <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-100">Delivered</span>
                                                                    }
                                                                    {order.status === "Cancel" &&
                                                                        <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-red-600 bg-red-100 dark:text-white dark:bg-red-600">Cancel</span>
                                                                    }
                                                                </td>
                                                                <td className='px-2 py-3 font-sans text-sm'>
                                                                    <select
                                                                        onChange={(e) => updateOrderStatus(e.target.value, order._id)}
                                                                        className='bg-gray-100 dark:bg-gray-900 p-1 border border-gray-300 dark:border-gray-500 dark:focus:border-gray-100 focus:border-gray-500 outline-0 text-sm rounded-md items-center'
                                                                    >
                                                                        <option value={order.status} hidden>{order.status}</option>
                                                                        <option value="Pending">Pending</option>
                                                                        <option value="Processing">Processing</option>
                                                                        <option value="Delivered">Delivered</option>
                                                                        <option value="Cancel">Cancel</option>
                                                                    </select>
                                                                </td>
                                                                {/* <td className='px-2 py-3 text-sm'>
                                                                    <div className="flex">
                                                                        <NavLink to={`/customer-order/${order._id}`} title='View Orders' className="py-2 px-1 mx-1 text-gray-400 hover:text-green-600">
                                                                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line>
                                                                            </svg>
                                                                        </NavLink>
                                                                        <button title='Delete' className="py-2 px-1 mx-1 text-gray-400 hover:text-red-600">
                                                                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                </td> */}
                                                            </tr>)
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className='p-6 mb-10 flex justify-end items-center bg-white dark:bg-gray-900 border border-t-0 border-gray-100 dark:border-gray-700 rounded-b-lg'>
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
                                        <div className="w-full bg-white rounded-md dark:bg-gray-800">
                                            <div className="p-8 text-center">
                                                <span className="flex justify-center my-10 text-red-500 font-semibold text-6xl">
                                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="5rem" width="5rem" xmlns="http://www.w3.org/2000/svg"><path d="M454.65 169.4A31.82 31.82 0 00432 160h-64v-16a112 112 0 00-224 0v16H80a32 32 0 00-32 32v216c0 39 33 72 72 72h272a72.22 72.22 0 0050.48-20.55 69.48 69.48 0 0021.52-50.2V192a31.75 31.75 0 00-9.35-22.6zM176 144a80 80 0 01160 0v16H176zm192 96a112 112 0 01-224 0v-16a16 16 0 0132 0v16a80 80 0 00160 0v-16a16 16 0 0132 0z"></path>
                                                    </svg>
                                                </span>
                                                <h2 className="font-semibold text-xl text-[#151515] dark:text-gray-300">This Customer have no order Yet!</h2>
                                            </div>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
        </section>
    );
};

export default CustomerOrders;