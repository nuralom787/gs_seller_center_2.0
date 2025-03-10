import { NavLink } from "react-router";
import { Tooltip } from "react-tooltip";
import useOrders from "../../Hooks/useOrders";
import { ScaleLoader } from "react-spinners";
import { PiSmileySadBold } from "react-icons/pi";
import empty from '../../../assets/Images/empty.svg';
import ReactPaginate from "react-paginate";
import { FaArrowLeft, FaArrowRight, FaFileDownload } from "react-icons/fa";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Orders = () => {
    const axiosSecure = useAxiosSecure();
    const [orders, refetch, isPending, isError, itemPerPage, currentPage, setItemPerPage, setCurrentPage] = useOrders();
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
            <Tooltip id="my-tooltip" />
            <div className='px-6 mx-auto'>
                <h2 className='my-4 font-bold text-xl text-[#151515] dark:text-white'>Orders</h2>
                <div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-md'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 py-6 items-center'>
                        <div>
                            <input className='w-full bg-gray-100 dark:bg-gray-800 p-3 border border-gray-300 dark:focus:border-gray-100 dark:border-gray-500 text-[#151515] dark:text-white outline-0 text-sm rounded-md' type="number" placeholder='Search by phone' />
                        </div>
                        <div>
                            <select className='w-full bg-gray-100 dark:bg-gray-800 p-3 border border-gray-300 dark:focus:border-gray-100 dark:border-gray-500 text-[#151515] dark:text-white outline-0 text-sm rounded-md' name="" id="">
                                <option value="" hidden>By Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Processing">Processing</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancel">Cancel</option>
                            </select>
                        </div>
                        <div>
                            <select className='w-full bg-gray-100 dark:bg-gray-800 p-3 border border-gray-300 dark:focus:border-gray-100 dark:border-gray-500 text-[#151515] dark:text-white outline-0 text-sm rounded-md' name="" id="">
                                <option value="" hidden>By Time</option>
                                <option value="5">Last 5 dyes orders</option>
                                <option value="7">Last 7 dyes orders</option>
                                <option value="15">Last 15 dyes orders</option>
                                <option value="30">Last 30 dyes orders</option>
                            </select>
                        </div>
                        <div>
                            <button className='flex justify-center items-center w-full bg-green-500 hover:bg-green-700 duration-500 cursor-pointer text-white font-semibold p-3 rounded-md'>
                                Download
                                <span className="ml-2 text-base">
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M320 336h76c55 0 100-21.21 100-75.6s-53-73.47-96-75.6C391.11 99.74 329 48 256 48c-69 0-113.44 45.79-128 91.2-60 5.7-112 35.88-112 98.4S70 336 136 336h56m0 64.1l64 63.9 64-63.9M256 224v224.03"></path>
                                    </svg>
                                </span>
                            </button>
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
                                {orders.count ?
                                    <div>
                                        <div className="w-full overflow-x-auto rounded-t-lg border border-gray-200 dark:border-gray-600 mt-4">
                                            <table className="w-full whitespace-nowrap">
                                                <thead className="text-xs font-semibold tracking-wide text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
                                                    <tr>
                                                        <td className="px-3 py-3">ID</td>
                                                        <td className="px-3 py-3">ORDER DATE & TIME</td>
                                                        <td className="px-3 py-3">CUSTOMER NAME</td>
                                                        <td className="px-3 py-3">PHONE</td>
                                                        <td className="px-3 py-3">METHOD</td>
                                                        <td className="px-3 py-3">AMOUNT</td>
                                                        <td className="px-3 py-3">STATUS</td>
                                                        <td className="px-3 py-3">ACTION</td>
                                                        <td className="px-3 py-3">INVOICE</td>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
                                                    {
                                                        orders.orders.map(order => <tr className='' key={order._id}>
                                                            <td className='px-3 py-3 text-xs font-bold'>
                                                                {order._id.slice(20, 24).toUpperCase()}
                                                            </td>
                                                            <td className='px-3 py-3 text-sm'>
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
                                                            <td className='px-3 py-3 text-sm'>
                                                                {order.displayName.split(" ").slice(0, 2).join(" ")}
                                                            </td>
                                                            <td className='px-3 py-3 text-sm'>
                                                                {order.phoneNumber}
                                                            </td>
                                                            <td className='px-3 py-3 text-sm font-semibold'>
                                                                {order.paymentMethod.type}
                                                            </td>
                                                            <td className='px-2 py-3 text-sm font-semibold'>
                                                                ${order.grandTotal.toFixed(2)}
                                                            </td>
                                                            <td className='px-2 py-3 text-sm'>
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
                                                            <td className='px-2 py-3 text-sm'>
                                                                <select
                                                                    onChange={(e) => updateOrderStatus(e.target.value, order._id)}
                                                                    className='bg-gray-100 dark:bg-gray-800 p-1 border border-gray-300 dark:border-gray-500 dark:focus:border-gray-100 focus:border-gray-500 outline-0 text-sm rounded-md items-center'
                                                                >
                                                                    <option value={order.status} hidden>{order.status}</option>
                                                                    <option value="Pending">Pending</option>
                                                                    <option value="Processing">Processing</option>
                                                                    <option value="Delivered">Delivered</option>
                                                                    <option value="Cancel">Cancel</option>
                                                                </select>
                                                            </td>
                                                            <td className='px-2 py-3 text-lg'>
                                                                <div className="flex items-center justify-center gap-3">
                                                                    <NavLink
                                                                        to={`/orders/order/invoice/${order._id}`}
                                                                        className="cursor-pointer text-gray-500 dark:text-gray-300 hover:text-green-600"
                                                                        data-tooltip-id="my-tooltip"
                                                                        data-tooltip-content="View Invoice"
                                                                        data-tooltip-place="bottom"
                                                                    >
                                                                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line>
                                                                        </svg>
                                                                    </NavLink>
                                                                    <button className="cursor-pointer text-gray-500 dark:text-gray-300 hover:text-green-600">
                                                                        <FaFileDownload
                                                                            data-tooltip-id="my-tooltip"
                                                                            data-tooltip-content="Download Invoice"
                                                                            data-tooltip-place="bottom"
                                                                        />
                                                                    </button>
                                                                </div>
                                                            </td>
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
                                    <div className='text-center my-32'>
                                        <div className='w-full'>
                                            <img className='w-32 mx-auto' src={empty} alt="" />
                                        </div>
                                        <p className='inline-flex items-center gap-2 pt-4 text-green-600 font-sans text-3xl font-semibold'>
                                            No Orders Found!!
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

export default Orders;