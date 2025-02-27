import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router";
import useProducts from "../../Hooks/useProducts";

const Products = () => {
    const [data] = useProducts();
    console.log(data);
    // const { admin } = useFirebase();
    const { register, handleSubmit } = useForm();
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
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


    // Load Products.
    useEffect(() => {
        fetch(`https://daily-bazar-95aq.onrender.com/products?page=${page}&&size=${size}&&category=${category}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                const count = data.count;
                const pageNumber = Math.ceil(count / size);
                setPageCount(pageNumber);
                fetch('https://daily-bazar-95aq.onrender.com/products')
                    .then(res => res.json())
                    .then(data => {
                        setTotalProduct(data.products);
                        setInfoLoading(false);
                    })
            })
    }, [page, category, status, deleteCount]);


    // Load categories.
    useEffect(() => {
        fetch('https://daily-bazar-95aq.onrender.com/categories')
            .then(res => res.json())
            .then(data => setCategories(data.categories))
    }, []);


    // Sort Product By Price.
    const sortByPrice = (price) => {
    };


    // Search Product By Name/Title.
    const onSubmit = (value) => {
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
        <section className="max-h-screen overflow-y-auto pt-20">
            <div className='px-6 mx-auto font-sans'>
                <h2 className='my-4 font-bold text-lg dark:text-white'>Products</h2>
                <div className='mb-6'>
                    <div className='bg-white dark:bg-gray-800 py-2 px-4 my-4 rounded-md border border-gray-200 dark:border-gray-800'>
                        <div className='items-center grid gap-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1'>
                            <form onSubmit={handleSubmit(onSubmit)} className='bg-white dark:bg-gray-800 flex items-center justify-between'>
                                <input {...register("search")} className='w-full border border-gray-300 dark:border-gray-500 dark:focus:border-gray-100 bg-gray-200 dark:bg-gray-800 dark:text-white focus:bg-white px-3 py-3 rounded my-4 outline-0' type="search" placeholder='Search by Product Name' />
                                {search &&
                                    <svg className="ml-2 mr-4 h-6 w-6 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="green" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="green" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                }
                            </form>
                            <div className=''>
                                <select onChange={(e) => setCategory(e.target.value)} className='w-full focus:bg-white bg-gray-200 dark:bg-gray-800 dark:text-white p-3 border border-gray-300 dark:border-gray-500 dark:focus:border-gray-100 outline-0 rounded-md' name="" id="">
                                    <option value="All" hidden>Category</option>
                                    {
                                        categories.map(category => <option key={category.parent}>{category.parent}</option>)
                                    }
                                </select>
                            </div>
                            <div className=''>
                                <select onChange={(e) => sortByPrice(e.target.value)} className='w-full focus:bg-white bg-gray-200 dark:bg-gray-800 dark:text-white p-3 border border-gray-300 dark:border-gray-500 dark:focus:border-gray-100 outline-0 rounded-md' name="" id="">
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
                </div>
                <div className='bg-white dark:bg-gray-800 w-full px-4 py-4 rounded border border-gray-200 dark:border-gray-800'>
                    <div className='bg-white dark:bg-gray-800'>
                        <form className='flex flex-col md:flex-row items-center justify-between md:space-x-3' action="">
                            <div className='w-full md:w-3/4'>
                                {csvFile?.name ?
                                    <div className='flex items-start justify-center text-center border border-dashed border-green-600 rounded p-1 cursor-pointer'>
                                        <span className='text-sm'>
                                            <p className='bg-black text-white w-fit px-1 m-auto'>{formatFileSize(csvFile.size)}</p>
                                            <p className='text-gray-500 font-medium'>{csvFile.name}</p>
                                        </span>
                                        <button className='' onClick={() => setCSVFile({})}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 512 512"><path fill="red" d="M504.1 256C504.1 119 393 7.9 256 7.9S7.9 119 7.9 256 119 504.1 256 504.1 504.1 393 504.1 256z"></path><path fill="#FFF" d="M285 256l72.5-84.2c7.9-9.2 6.9-23-2.3-31-9.2-7.9-23-6.9-30.9 2.3L256 222.4l-68.2-79.2c-7.9-9.2-21.8-10.2-31-2.3-9.2 7.9-10.2 21.8-2.3 31L227 256l-72.5 84.2c-7.9 9.2-6.9 23 2.3 31 4.1 3.6 9.2 5.3 14.3 5.3 6.2 0 12.3-2.6 16.6-7.6l68.2-79.2 68.2 79.2c4.3 5 10.5 7.6 16.6 7.6 5.1 0 10.2-1.7 14.3-5.3 9.2-7.9 10.2-21.8 2.3-31L285 256z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                    :
                                    <label htmlFor="csv-file-input">
                                        <input onChange={(e) => setCSVFile(e.target.files[0])} className='hidden csv-file-input' type="file" accept="text/csv, .csv, application/vnd.ms-excel" name="" id="csv-file-input" />
                                        <div className='text-center border border-dashed border-green-600 rounded p-3 cursor-pointer'>
                                            <span className='text-sm text-gray-500'>Drop CSV File</span>
                                        </div>
                                    </label>
                                }
                            </div>
                            <div className='w-full mt-2 md:mt-0 flex space-x-3'>
                                <button disabled className='w-2/4 bg-gray-200 hover:bg-gray-400 duration-500 py-3 px-5 rounded md:mx-2'>Upload</button>
                                {/* <CSVLink className='bg-green-500 hover:bg-green-600 duration-500 text-white py-3  px-5 rounded mx-2' data={totalProduct}>Download</CSVLink>; */}
                                <button disabled className='w-2/4 bg-green-500 hover:bg-green-600 duration-500 text-white py-3 px-5 rounded md:mx-2'>Download</button>
                            </div>
                        </form>
                    </div>
                </div>
                {infoLoading ?
                    <div className="text-center">
                        <div className="loading">
                            <div className="loading-bar"></div>
                            <div className="loading-bar"></div>
                            <div className="loading-bar"></div>
                            <div className="loading-bar"></div>
                        </div>
                    </div>
                    :
                    <div>
                        {products.length ?
                            <div>
                                <div className="w-full overflow-x-auto rounded-t-lg border border-gray-200 dark:border-gray-700">
                                    <table className="w-full whitespace-no-wrap">
                                        <thead className="text-xs font-semibold tracking-wide text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
                                            <tr>
                                                <td className="px-3 py-3">SKU</td>
                                                <td className="px-3 py-3">PRODUCT NAME</td>
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
                                                products.map(product => <tr className='' key={product._id}>
                                                    <td className='px-3 py-3 text-xs font-bold'>{product._id.slice(18, 24).toUpperCase()}</td>
                                                    <td className='px-3 py-3 flex items-center justify-start text-sm'>
                                                        {product.image && <img className='w-8 hidden sm:block shadow-inner rounded-full p-1 mr-2' src={`data:image/*;base64,${product.image}`} alt="" />}
                                                        {product.title}
                                                    </td>
                                                    <td className='px-3 py-3 text-sm'>{product.parent}</td>
                                                    <td className='px-3 py-3 text-sm font-bold'>${product.price}</td>
                                                    <td className='px-3 py-3 text-sm'>{product.quantity < 0 ? 0 : product.quantity}</td>
                                                    <td className='px-3 py-3 text-sm'>
                                                        {product.quantity > 0 ?
                                                            <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-100">Selling</span>
                                                            :
                                                            <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-red-500 bg-red-100 dark:text-red-100 dark:bg-red-800">Sold Out</span>
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
                                                    <td className='py-3 text-sm'>
                                                        <div className="flex justify-center">
                                                            <NavLink to={`/up-product/${product._id}`} title='Edit' className="p-2 text-gray-400 hover:text-green-600">
                                                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                            </NavLink>
                                                            <button onClick={() => sweetAlert(product)} title='Delete' className="p-2 text-gray-400 hover:text-red-600">
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
                                <div className='flex items-center justify-between p-4 mb-6 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-b-lg'>
                                    <div className='text-xs font-bold text-gray-600 dark:text-gray-300'>
                                        SHOWING {(page * products.length) + 1}-{(page + 1) * products.length} OF {totalProduct.length}
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
                                </div>
                            </div>
                            :
                            <div className='text-center my-8'>
                                <div className='w-full'>
                                    <img className='w-2/5 mx-auto' src={empty} alt="" />
                                </div>
                                <p className='inline-flex items-center pt-4 text-gray-600 font-sans text-2xl font-semibold'>
                                    No Product Found!!
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="bi bi-emoji-frown-fill mx-2 text-gray-700" viewBox="0 0 16 16">
                                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm-2.715 5.933a.5.5 0 0 1-.183-.683A4.498 4.498 0 0 1 8 9.5a4.5 4.5 0 0 1 3.898 2.25.5.5 0 0 1-.866.5A3.498 3.498 0 0 0 8 10.5a3.498 3.498 0 0 0-3.032 1.75.5.5 0 0 1-.683.183zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z" />
                                    </svg>
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