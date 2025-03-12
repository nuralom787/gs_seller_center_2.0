import { useForm } from "react-hook-form";
import { NavLink } from "react-router";
import useProducts from "../../Hooks/useProducts";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { PiSmileySadBold } from "react-icons/pi";
import { FiZoomIn } from "react-icons/fi";
import { ScaleLoader } from "react-spinners";
import { Tooltip } from 'react-tooltip'
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import empty from '../../../assets/Images/empty.svg';
import useCategories from "../../Hooks/useCategories";


const Products = () => {
    const [products, refetch, isPending, isError, isRefetching, itemPerPage, currentPage, setCurrentPage, perPageItem, handleSearch, handleCategory, handlePrice] = useProducts();
    const [categories, , catPending, catError] = useCategories();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit } = useForm();
    const totalPages = Math.ceil(products?.count / itemPerPage);


    // Search Product By Name/Title.
    const onSubmit = (data) => {
        handleSearch(data.search)
    };


    // Update Product Status.
    const upStatus = async (product) => {
        const currentStatus = { status: product.status };

        // Fetch Data By Using Axios.
        const statusRes = await axiosSecure.patch(`/update/product-status/${product._id}`, currentStatus);
        if (statusRes.data.modifiedCount > 0) {
            refetch();
            toast.success("Status Update Successfully!");
        }
        else {
            toast.error("Somethings wants wrong!! please try again.");
        };
    };


    // Delete Product Function.
    const deleteProduct = (product) => {
        Swal.fire({
            title: "Are you sure?",
            html: `
            <p>Do you want to delete <strong>${product.title}?</strong> Once deleted, You can't revert this!</p>
            `,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                // Call Delete Api.
                const deleteRes = await axiosSecure.delete(`/product/delete/${product._id}`);
                // console.log(deleteRes);

                if (deleteRes.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        html: `<p>The Product <strong>${product.title}</strong> has been deleted successfully.</p>`,
                        icon: "success"
                    });
                }
            }
        });
    };


    // Format The Uploaded File Size.
    const formatFileSize = function (bytes) {
        const sizes = ['B', 'kB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
    };


    // Handle Pagination Page Click Function.
    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
    };


    return (
        <section className="max-h-screen min-h-screen overflow-y-auto pt-20 bg-[#FAFAFA] dark:bg-base-300">
            <Tooltip id="my-tooltip" />
            <div className='px-6 font-sans'>
                <h2 className='my-4 font-bold text-lg text-[#151515] dark:text-white'>Products</h2>
                <div className='mb-6'>
                    <div className='bg-white dark:bg-gray-800 py-6 px-4 my-4 rounded-md border border-gray-200 dark:border-gray-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center'>
                        <form onSubmit={handleSubmit(onSubmit)} className='bg-white dark:bg-gray-800'>
                            <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-500 focus:border-gray-500 dark:focus:border-gray-100 bg-gray-200 dark:bg-gray-800 rounded-md">
                                <input
                                    {...register("search")}
                                    className='w-full border-0 text-[#151515] dark:text-white p-3 outline-0 placeholder:text-[#151515] dark:placeholder:text-gray-100'
                                    type="search"
                                    placeholder='Search by Product Name' />
                                {isRefetching &&
                                    <svg className="ml-2 mr-4 h-6 w-6 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="green" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="green" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                }
                            </div>
                        </form>
                        <div className=''>
                            <select
                                onChange={(e) => handleCategory(e.target.value)}
                                className='w-full bg-gray-200 dark:bg-gray-800 text-[#151515] dark:text-white p-3 border border-gray-300 dark:border-gray-500 dark:focus:border-gray-100 outline-0 rounded-md'
                                name=""
                                id="">
                                <option value="">Category</option>
                                {!catPending && !catError &&
                                    categories.categories.map(category => <option
                                        key={category.parent}
                                        value={category.parent}
                                    >
                                        {category.parent}
                                    </option>)
                                }
                            </select>
                        </div>
                        <div className=''>
                            <select
                                onChange={(e) => handlePrice(e.target.value)}
                                className='w-full bg-gray-200 dark:bg-gray-800 text-[#151515] dark:text-white p-3 border border-gray-300 dark:border-gray-500 dark:focus:border-gray-100 outline-0 rounded-md'
                                name=""
                                id="">
                                <option value="">Price</option>
                                <option value="asc">Low To High</option>
                                <option value="desc">High To Low</option>
                            </select>
                        </div>
                        <NavLink to="/products/add-product" className='bg-green-500 hover:bg-green-600 duration-500 text-white text-center py-3 rounded-md'>
                            +Add Product
                        </NavLink>
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
                                {products.count ?
                                    <div>
                                        <div className="w-full overflow-x-auto rounded-t-lg border border-gray-200 dark:border-gray-700">
                                            <table className="w-full static">
                                                <thead className="text-xs font-semibold tracking-wide text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
                                                    <tr>
                                                        <td className="px-3 py-3">SKU</td>
                                                        <td className="px-3 py-3">IMAGE</td>
                                                        <td className="px-3 py-3">NAME</td>
                                                        <td className="px-3 py-3">CATEGORY</td>
                                                        <td className="px-3 py-3">PRICE</td>
                                                        <td className="px-3 py-3">STOCK</td>
                                                        <td className="px-3 py-3">STATUS</td>
                                                        <td className="px-3 py-3">DISCOUNT</td>
                                                        <td className="px-3 py-3">DETAILS</td>
                                                        <td className="px-3 py-3">PUBLISHED</td>
                                                        <td className="px-3 py-3">ACTIONS</td>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
                                                    {
                                                        products.products?.map((product, idx) => <tr className='' key={product._id}>
                                                            <td className='px-3 py-3 text-xs font-bold text-center'>
                                                                {product._id.slice(20, 24).toUpperCase()}
                                                            </td>
                                                            <td className='px-3 py-3 text-sm whitespace-nowrap'>
                                                                {product.thumb && <img className='w-12 shadow-inner rounded-full p-1 mr-2' src={product.thumb} alt="" />}
                                                            </td>
                                                            <td className='px-3 py-3 text-sm whitespace-nowrap'>
                                                                {product.title}
                                                            </td>
                                                            <td className='px-3 py-3 text-sm whitespace-nowrap'>
                                                                {product.parent}
                                                            </td>
                                                            <td className='px-3 py-3 text-sm font-bold whitespace-nowrap'>
                                                                ${product.price.toFixed(2)}
                                                            </td>
                                                            <td className='px-3 py-3 text-sm text-center whitespace-nowrap'>
                                                                {product.quantity < 0 ? 0 : product.quantity}
                                                            </td>
                                                            <td className='px-3 py-3 text-sm whitespace-nowrap'>
                                                                {product.quantity > 0 ?
                                                                    <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-100">In Stock</span>
                                                                    :
                                                                    <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-red-500 bg-red-100 dark:text-red-100 dark:bg-red-800">Stock Out</span>
                                                                }
                                                            </td>
                                                            <td className='px-3 py-3 text-sm font-bold whitespace-nowrap'>
                                                                {product.discount > 0 &&
                                                                    <span>{Math.ceil(product.discount)}% OFF</span>
                                                                }
                                                            </td>
                                                            <td className='px-3 py-3 text-sm whitespace-nowrap'>
                                                                <NavLink
                                                                    to={`/products/details/${product._id}`}
                                                                    title='Details'
                                                                    className="text-md flex justify-center text-center hover:text-green-500 duration-300"
                                                                    data-tooltip-id="my-tooltip"
                                                                    data-tooltip-content="Details"
                                                                    data-tooltip-place="bottom"
                                                                >
                                                                    <FiZoomIn />
                                                                </NavLink>
                                                            </td>
                                                            <td className='px-3 py-3 text-sm whitespace-nowrap'>
                                                                {product.status === "Show" ?
                                                                    <button
                                                                        onClick={() => upStatus(product)}
                                                                        className="text-2xl flex justify-center text-center m-auto"
                                                                        data-tooltip-id="my-tooltip"
                                                                        data-tooltip-content="Visible"
                                                                        data-tooltip-place="bottom"
                                                                    >
                                                                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="text-green-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10H5zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"></path>
                                                                        </svg>
                                                                    </button>
                                                                    :
                                                                    <button
                                                                        onClick={() => upStatus(product)}
                                                                        className="text-2xl flex justify-center text-center m-auto"
                                                                        data-tooltip-id="my-tooltip"
                                                                        data-tooltip-content="Hide"
                                                                        data-tooltip-place="bottom"
                                                                    >
                                                                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="text-red-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M11 4a4 4 0 0 1 0 8H8a4.992 4.992 0 0 0 2-4 4.992 4.992 0 0 0-2-4h3zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5z"></path>
                                                                        </svg>
                                                                    </button>
                                                                }
                                                            </td>
                                                            <td className='px-3 py-3 text-sm whitespace-nowrap'>
                                                                <div className="flex justify-center items-center gap-4">
                                                                    <NavLink
                                                                        to={`/products/update/${product._id}`}
                                                                        className="text-green-700 hover:text-green-400"
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
                                                                        onClick={() => deleteProduct(product)}
                                                                        className="text-red-400 hover:text-red-700 cursor-pointer"
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
                                        <div className="p-6 mb-10 flex justify-end items-center bg-white dark:bg-gray-900 border border-t-0 border-gray-100 dark:border-gray-700 rounded-b-lg">
                                            {/* <select onChange={perPageItem} className="bg-white dark:bg-gray-900 text-[#151515] dark:text-white" name="itemPerPage" id="">
                                        <option value="15">15</option>
                                        <option value="25">25</option>
                                        <option value="30">30</option>
                                    </select> */}
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

export default Products;