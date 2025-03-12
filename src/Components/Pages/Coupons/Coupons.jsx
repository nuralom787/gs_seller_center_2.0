import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { Tooltip } from "react-tooltip";
import useCoupons from "../../Hooks/useCoupons";
import ReactPaginate from "react-paginate";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { ScaleLoader } from "react-spinners";
import { PiSmileySadBold } from "react-icons/pi";
import empty from '../../../assets/Images/empty.svg';
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const Coupons = () => {
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit } = useForm()
    const [coupons, refetch, isPending, isError, currentPage, setCurrentPage, itemPerPage, perPageItem, handleSearch] = useCoupons();
    const totalPages = Math.ceil(coupons?.count / itemPerPage);

    // Handle Search Function
    const onSubmit = (data) => {
        handleSearch(data.search);
    }

    // Delete Coupons Function.
    const deleteCoupon = (coupon) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to delete this coupon? Once you delete this, you cannot revert it!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const deleteRes = await axiosSecure.delete(`/coupon/delete/${coupon._id}`);
                if (deleteRes.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Coupon Data has been deleted Successfully.",
                        icon: "success"
                    });
                }
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
            <div className='px-6 w-full'>
                <h2 className='my-4 font-bold text-xl text-[#151515] dark:text-white'>Coupons</h2>
                <div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-md py-5 px-4'>
                    <div className='grid grid-cols-1 md:grid-cols-4 items-center gap-4'>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className='col-span-1 md:col-span-3'
                        >
                            <input
                                {...register("search")}
                                className='w-full bg-gray-100 dark:bg-gray-800 p-3 border border-gray-300 dark:border-gray-500 dark:focus:border-gray-100 text-[#151515] dark:text-white font-semibold outline-0 text-base rounded-md'
                                type="search"
                                placeholder='Search by Coupon code/name'
                            />
                        </form>
                        <div className='col-span-1 md:col-span-1'>
                            <NavLink
                                to="/coupons/add-coupon"
                                className='block w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md text-center text-xl font-semibold duration-500'
                            >
                                + Add Coupon
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
                                {coupons.count ?
                                    <div>
                                        <div className="w-full overflow-x-auto rounded-t-lg border border-gray-200 dark:border-gray-600 mt-4">
                                            <table className="w-full whitespace-nowrap">
                                                <thead className="text-xs font-semibold tracking-wide text-[#151515] uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-200 dark:bg-gray-800">
                                                    <tr>
                                                        <td className="px-3 py-3">ID</td>
                                                        <td className="px-3 py-3">ICON</td>
                                                        <td className="px-3 py-3">START DATE</td>
                                                        <td className="px-3 py-3">END DATE</td>
                                                        <td className="px-3 py-3">CAMPAIGNS NAME</td>
                                                        <td className="px-3 py-3">CODE</td>
                                                        <td className="px-3 py-3">PERCENTAGE</td>
                                                        <td className="px-3 py-3">PRODUCT TYPE</td>
                                                        <td className="px-3 py-3">STATUS</td>
                                                        <td className="px-3 py-3">ACTION</td>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
                                                    {
                                                        coupons?.coupons?.map(coupon => <tr className='' key={coupon._id}>
                                                            <td className='px-3 py-3 text-xs font-bold font-sans'>
                                                                {coupon.couponId.toUpperCase()}
                                                            </td>
                                                            <td className="px-2 py-3">
                                                                <img
                                                                    className="w-10 rounded-full border-2 border-white"
                                                                    src={coupon.logo}
                                                                    alt="coupon logo"
                                                                />
                                                            </td>
                                                            <td className='px-3 py-3 text-sm font-sans'>
                                                                {new Date(coupon.createdAt).toLocaleDateString("en", {
                                                                    day: "2-digit",
                                                                    month: "short",
                                                                    year: "numeric"
                                                                })}
                                                            </td>
                                                            <td className='px-3 py-3 text-sm font-sans'>
                                                                {new Date(coupon.endTime).toLocaleDateString("en", {
                                                                    day: "2-digit",
                                                                    month: "short",
                                                                    year: "numeric"
                                                                })}
                                                            </td>
                                                            <td className='px-3 py-3 text-sm font-sans'>
                                                                {coupon.title}
                                                            </td>
                                                            <td className='px-3 py-3 text-sm font-sans font-semibold'>
                                                                {coupon.couponCode}
                                                            </td>
                                                            <td className='px-3 py-3 text-sm font-sans font-semibold text-center'>
                                                                {coupon.discountPercentage}%
                                                            </td>
                                                            <td className='px-3 py-3 text-sm font-sans font-semibold text-center'>
                                                                {coupon.productType}
                                                            </td>
                                                            <td className='px-3 py-3 text-sm font-sans'>
                                                                {new Date(coupon.endTime) < Date.now() ?
                                                                    <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-red-600 bg-red-100">Expired</span>
                                                                    :
                                                                    <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-600 bg-green-100">Active</span>
                                                                }
                                                            </td>
                                                            <td className='px-2 py-3 text-sm'>
                                                                <div className="flex">
                                                                    <NavLink
                                                                        to={`/coupons/update/${coupon._id}`}
                                                                        className="p-2 cursor-pointer text-gray-400 hover:text-green-600"
                                                                        data-tooltip-id="my-tooltip"
                                                                        data-tooltip-content="Update Coupon"
                                                                        data-tooltip-place="bottom"
                                                                    >
                                                                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                                    </NavLink>
                                                                    <button
                                                                        onClick={() => deleteCoupon(coupon)}
                                                                        className="p-2 cursor-pointer text-gray-400 hover:text-red-600"
                                                                        data-tooltip-id="my-tooltip"
                                                                        data-tooltip-content="Delete Coupon"
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
                                            No Product Found!!
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

export default Coupons;