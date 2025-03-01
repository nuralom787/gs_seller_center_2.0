import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router";
import useProducts from "../../Hooks/useProducts";
import { BiSolidEdit } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";
import { PiSmileySadBold } from "react-icons/pi";
import { ScaleLoader } from "react-spinners";


const Products = () => {
    const [products, refetch, isPending] = useProducts();
    // console.log(products);
    // const { admin } = useFirebase();
    const { register, handleSubmit } = useForm();
    const [categories, setCategories] = useState([]);
    const [products2, setProducts2] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [totalProduct, setTotalProduct] = useState([]);
    const [status, setStatus] = useState(true);
    const [deleteCount, setDeleteCount] = useState(true);
    const [search, setSearch] = useState(false);
    const [csvFile, setCSVFile] = useState({});
    const [category, setCategory] = useState('');
    const [infoLoading, setInfoLoading] = useState(true);
    // const [price, setPrice] = useState('');
    const [page, setPage] = useState(0);
    const size = 15;


    // useEffect(() => {
    //     fetch("./products.json")
    //         .then(res => res.json())
    //         .then(data => {
    //             setProducts2(data)
    //             console.log(data)
    //         })
    // }, [])


    // Load Products.
    // useEffect(() => {
    //     fetch(`https://daily-bazar-95aq.onrender.com/products?page=${page}&&size=${size}&&category=${category}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             setProducts(data.products);
    //             const count = data.count;
    //             const pageNumber = Math.ceil(count / size);
    //             setPageCount(pageNumber);
    //             fetch('https://daily-bazar-95aq.onrender.com/products')
    //                 .then(res => res.json())
    //                 .then(data => {
    //                     setTotalProduct(data.products);
    //                     setInfoLoading(false);
    //                 })
    //         })
    // }, [page, category, status, deleteCount]);


    // Load categories.
    // useEffect(() => {
    //     fetch('https://daily-bazar-95aq.onrender.com/categories')
    //         .then(res => res.json())
    //         .then(data => setCategories(data.categories))
    // }, []);


    // Sort Product By Price.
    const sortByPrice = (price) => {
    };


    // Search Product By Name/Title.
    const onSubmit = (data) => {
        console.log(data)
    };

    // Sweet Alert.
    const sweetAlert = (product) => {
    };


    // Update Product Status.
    const upStatus = (product) => {
    };


    // Delete Product Function.
    const deleteProduct = (id) => {
    };


    // Format The Uploaded File Size.
    const formatFileSize = function (bytes) {
    };


    return (
        <section className="max-h-screen min-h-screen overflow-y-auto pt-20 bg-gray-400 dark:bg-base-300">
            <div className='px-6 font-sans'>
                <h2 className='my-4 font-bold text-lg text-[#151515] dark:text-white'>Products</h2>
                <div className='mb-6'>
                    <div className='bg-white dark:bg-gray-800 py-2 px-4 my-4 rounded-md border border-gray-200 dark:border-gray-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center'>
                        <form onSubmit={handleSubmit(onSubmit)} className='bg-white dark:bg-gray-800 flex items-center justify-between'>
                            <input
                                {...register("search")}
                                className='w-full border border-gray-300 dark:border-gray-500 focus:border-gray-500 dark:focus:border-gray-100 bg-gray-200 dark:bg-gray-800 text-[#151515] dark:text-white px-3 py-3 rounded my-4 outline-0'
                                type="search"
                                placeholder='Search by Product Name' />
                            {search &&
                                <svg className="ml-2 mr-4 h-6 w-6 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="green" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="green" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            }
                        </form>
                        <div className=''>
                            <select
                                onChange={(e) => setCategory(e.target.value)}
                                className='w-full bg-gray-200 dark:bg-gray-800 text-[#151515] dark:text-white p-3 border border-gray-300 dark:border-gray-500 dark:focus:border-gray-100 outline-0 rounded-md'
                                name=""
                                id="">
                                <option value="All" hidden>Category</option>
                                <option value="All" >Category</option>
                                <option value="All" >Category</option>
                                {
                                    categories.map(category => <option key={category.parent}>{category.parent}</option>)
                                }
                            </select>
                        </div>
                        <div className=''>
                            <select
                                onChange={(e) => sortByPrice(e.target.value)}
                                className='w-full bg-gray-200 dark:bg-gray-800 text-[#151515] dark:text-white p-3 border border-gray-300 dark:border-gray-500 dark:focus:border-gray-100 outline-0 rounded-md'
                                name=""
                                id="">
                                <option value="All" hidden>Price</option>
                                <option value="Low">Low To High</option>
                                <option value="High">High To Low</option>
                            </select>
                        </div>
                        <NavLink to="/add-products" className='bg-green-500 hover:bg-green-600 duration-500 text-white text-center py-3 rounded-md'>
                            +Add Product
                        </NavLink>
                    </div>
                </div>
                {isPending ?
                    <div className="flex justify-center items-center my-40">
                        <ScaleLoader
                            color={"#FFF"}
                            loading={true}
                            size={500}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
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
                                                <td className="px-3 py-3">PRODUCT NAME</td>
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
                                                products.products.map((product, idx) => <tr className='' key={product._id}>
                                                    <td className='px-3 py-3 text-xs font-bold text-center'>{idx + 1}</td>
                                                    <td className='px-3 py-3 flex items-center justify-start text-sm'>
                                                        {product.image && <img className='w-8 hidden sm:block shadow-inner rounded-full p-1 mr-2' src={product.image} alt="" />}
                                                        {product.title}
                                                    </td>
                                                    <td className='px-3 py-3 text-sm font-bold'>${product.price.toFixed(2)}</td>
                                                    <td className='px-3 py-3 text-sm text-center'>{product.quantity < 0 ? 0 : product.quantity}</td>
                                                    <td className='px-3 py-3 text-sm'>
                                                        {product.quantity > 0 ?
                                                            <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-100">In Stock</span>
                                                            :
                                                            <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-red-500 bg-red-100 dark:text-red-100 dark:bg-red-800">Stock Out</span>
                                                        }
                                                    </td>
                                                    <td className='px-3 py-3 text-sm font-bold'>
                                                        {product.discount > 0 &&
                                                            <span>{Math.ceil(product.discount)}% OFF </span>
                                                        }
                                                    </td>
                                                    <td className='px-3 py-3 text-sm'>
                                                        <NavLink to={`/product/${product._id}`} title='Details' className="text-md flex justify-center text-center hover:text-green-500 duration-300">
                                                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line>
                                                            </svg>
                                                        </NavLink>
                                                    </td>
                                                    <td className='px-3 py-3 text-sm'>
                                                        {product.status === "Show" ?
                                                            <button onClick={() => upStatus(product)} title='Showing' className="text-xl flex justify-center text-center m-auto">
                                                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="text-green-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10H5zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"></path>
                                                                </svg>
                                                            </button>
                                                            :
                                                            <button onClick={() => upStatus(product)} title='Not Showing' className="text-xl flex justify-center text-center m-auto">
                                                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="text-orange-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M11 4a4 4 0 0 1 0 8H8a4.992 4.992 0 0 0 2-4 4.992 4.992 0 0 0-2-4h3zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5z"></path>
                                                                </svg>
                                                            </button>}
                                                    </td>
                                                    <td className='py-3 text-2xl'>
                                                        <div className="flex justify-center">
                                                            <NavLink to={`/products/update/${product._id}`} title='Edit' className="p-2 text-gray-400 hover:text-green-600">
                                                                <BiSolidEdit />
                                                            </NavLink>
                                                            <button onClick={() => sweetAlert(product)} title='Delete' className="p-2 text-gray-400 hover:text-red-600">
                                                                <FaTrashAlt />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                {/* <div className='flex items-center justify-between p-4 mb-6 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-b-lg'>
                                    <div className='text-xs font-bold text-gray-600 dark:text-gray-300'>
                                        SHOWING {(page * data?.count) + 1}-{(page + 1) * data?.count} OF {totalProduct.length}
                                    </div>
                                    <div className='text-xs font-bold bg-gray-100 dark:bg-gray-800 rounded'>
                                        {
                                            [...Array(pageCount).keys()]
                                                .map(number => <button
                                                    key={number}
                                                    onClick={() => setPage(number)}
                                                    className={number === page ? 'px-3 py-2 bg-green-400 text-white border-gray-200 rounded' : 'px-3 py-2 border-gray-200 dark:text-gray-200 rounded'}>
                                                    {number + 1}
                                                </button>)
                                        }
                                    </div>
                                </div> */}
                            </div>
                            :
                            <div className='text-center my-16'>
                                <div className='w-full'>
                                    {/* <img className='w-2/5 mx-auto' src={empty} alt="" /> */}
                                </div>
                                <p className='inline-flex items-center gap-2 pt-4 text-black dark:text-white font-sans text-3xl font-semibold'>
                                    No Product Found!!
                                    <PiSmileySadBold />
                                </p>
                            </div>
                        }
                    </div>
                }
            </div>
        </section>
    );
};

export default Products;