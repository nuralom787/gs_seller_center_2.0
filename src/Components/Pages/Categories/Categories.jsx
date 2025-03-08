import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router";
import { Tooltip } from "react-tooltip";
import useCategories from "../../Hooks/useCategories";
import empty from '../../../assets/Images/empty.svg';
import { ScaleLoader } from "react-spinners";
import ReactPaginate from "react-paginate";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Categories = () => {
    const axiosSecure = useAxiosSecure();
    const [categories, refetch, isPending, isError, itemPerPage, currentPage, setItemPerPage, setCurrentPage, handleSearch] = useCategories();
    const { register, handleSubmit } = useForm();
    const totalPages = Math.ceil(categories?.count / itemPerPage);


    // Search Specific Category By Type.
    const onSubmit = (value) => {
        handleSearch(value.search);
    };


    // Update Product Status.
    const upStatus = async (category) => {
        const currentStatus = { status: category.status };

        // Fetch Data By Using Axios.
        const statusRes = await axiosSecure.patch(`/update/category-status/${category._id}`, currentStatus);
        if (statusRes.data.modifiedCount > 0) {
            refetch();
            toast.success("Status Update Successfully!");
        }
        else {
            toast.error("Somethings wants wrong!! please try again.");
        };
    };


    // Delete Category Function.
    const deleteCategory = (category) => {
        Swal.fire({
            title: "Are you sure?",
            html: `
                <p>Do you want to delete <strong>${category.parent}?</strong> Once deleted, You can't revert this!</p>
            `,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                // Call Delete Api.
                const deleteRes = await axiosSecure.delete(`/category/delete/${category._id}`);
                // console.log(deleteRes);

                if (deleteRes.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        html: `<p>The Category <strong>${category.parent}</strong> has been deleted successfully.</p>`,
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
            <div className='px-6 mx-auto'>
                <h2 className='my-4 font-bold font-sans text-lg dark:text-white'>Categories</h2>
                <div className='bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-800 rounded-md font-sans'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 px-5 py-3'>
                        <form onSubmit={handleSubmit(onSubmit)} className='w-full flex items-center gap-2'>
                            <input
                                {...register("search")}
                                className='w-full dark:focus:border-gray-100 bg-gray-200 dark:bg-gray-800 p-3 border border-gray-300 dark:border-gray-500 text-black dark:text-white outline-0 rounded-md'
                                type="search"
                                placeholder='Search by category type'
                            />
                            {/* {search &&
                                <svg className="ml-2 mr-4 h-6 w-6 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="green" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="green" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            } */}
                        </form>
                        <div className='w-full md:py-3'>
                            <NavLink
                                to="/categories/add-category"
                                className='block bg-green-500 hover:bg-green-600 duration-500 text-white py-3 rounded-md border border-green-500 hover:border-green-600 text-center'
                            >
                                + Add Categories
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
                            <div className='font-sans'>
                                {categories.count ?
                                    <div>
                                        <div className="w-full overflow-x-auto rounded-t-lg border border-gray-200 dark:border-gray-600 mt-4">
                                            <table className="w-full">
                                                <thead className="text-xs font-semibold tracking-wide text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
                                                    <tr>
                                                        <td className="px-3 py-3">ID</td>
                                                        <td className="px-3 py-3 hidden sm:block">ICON</td>
                                                        <td className="px-3 py-3">PARENT</td>
                                                        <td className="px-3 py-3">CHILDREN</td>
                                                        <td className="px-3 py-3">TYPE</td>
                                                        <td className="px-3 py-3">PUBLISHED</td>
                                                        <td className="px-3 py-3">ACTIONS</td>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
                                                    {
                                                        categories?.categories?.map((category, idx) => <tr className='' key={category._id}>
                                                            <td className='px-3 py-3 text-xs font-bold'>
                                                                {category._id.slice(20, 24).toUpperCase()}
                                                            </td>
                                                            <td className='px-3 py-3 hidden sm:flex items-center justify-center text-sm whitespace-nowrap'>
                                                                <img className='w-8 shadow-inner rounded-full p-1 mr-2' src={category.icon} alt="" />
                                                            </td>
                                                            <td className='px-3 py-3 text-sm whitespace-nowrap'>
                                                                {category.parent}
                                                            </td>
                                                            <td className='px-3 py-3 text-sm whitespace-nowrap'>
                                                                {
                                                                    category.children.slice(0, 3).map(ct => <span
                                                                        key={ct}
                                                                        className="bg-gray-200 dark:bg-gray-900 text-gray-500 dark:text-gray-300 dark:border dark:border-gray-500 text-xs font-bold px-2 py-1 mx-1 rounded-full"
                                                                    >
                                                                        {ct}
                                                                    </span>)
                                                                }
                                                            </td>
                                                            <td className='px-3 py-3 text-sm whitespace-nowrap'>
                                                                {category.type}
                                                            </td>
                                                            <td className='py-3 px-3 text-sm whitespace-nowrap'>
                                                                {category.status === "Show" ?
                                                                    <button
                                                                        onClick={() => upStatus(category)}
                                                                        className="cursor-pointer text-xl flex justify-center text-center m-auto"
                                                                        data-tooltip-id="my-tooltip"
                                                                        data-tooltip-content="Showing"
                                                                        data-tooltip-place="bottom"
                                                                    >
                                                                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="text-green-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10H5zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"></path>
                                                                        </svg>
                                                                    </button>
                                                                    :
                                                                    <button
                                                                        onClick={() => upStatus(category)}
                                                                        className="cursor-pointer text-xl flex justify-center text-center m-auto"
                                                                        data-tooltip-id="my-tooltip"
                                                                        data-tooltip-content="Hidden"
                                                                        data-tooltip-place="bottom"
                                                                    >
                                                                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="text-orange-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M11 4a4 4 0 0 1 0 8H8a4.992 4.992 0 0 0 2-4 4.992 4.992 0 0 0-2-4h3zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5z"></path>
                                                                        </svg>
                                                                    </button>
                                                                }
                                                            </td>
                                                            <td className='px-2 py-3 text-sm whitespace-nowrap'>
                                                                <div className="flex items-center justify-center">
                                                                    <NavLink
                                                                        to={`/categories/update/${category._id}`}
                                                                        className="p-2 cursor-pointer text-gray-400 hover:text-green-600"
                                                                        data-tooltip-id="my-tooltip"
                                                                        data-tooltip-content="Edit"
                                                                        data-tooltip-place="bottom"
                                                                    >
                                                                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                                        </svg>
                                                                    </NavLink>
                                                                    <button
                                                                        onClick={() => deleteCategory(category)}
                                                                        className="p-2 cursor-pointer text-gray-400 hover:text-red-600"
                                                                        data-tooltip-id="my-tooltip"
                                                                        data-tooltip-content="Delete"
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
                                    <div className='text-center font-sans text-sm font-semibold py-32'>
                                        <div className='w-full'>
                                            <img className='w-32 mx-auto' src={empty} alt="" />
                                        </div>
                                        <p className='inline-flex items-center pt-4 text-green-600 font-sans text-2xl font-semibold'>
                                            No Category Found!!
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

export default Categories;