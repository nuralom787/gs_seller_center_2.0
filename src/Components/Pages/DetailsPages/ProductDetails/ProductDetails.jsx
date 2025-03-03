import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import useProducts from "../../../Hooks/useProducts";
import { ScaleLoader } from "react-spinners";

const ProductDetails = () => {
    const { id } = useParams();
    const [products, refetch, isPending] = useProducts();
    const product = products?.products.find(item => item._id === id);


    return (
        <section className="max-h-screen min-h-screen overflow-y-auto pt-20 bg-[#FAFAFA] dark:bg-base-300">
            <div className='px-6 mx-auto'>
                <h2 className='my-4 font-bold text-xl text-[#151515] dark:text-white'>Product Details</h2>

                <div className="divider before:bg-[#151515] after:bg-[#151515] dark:before:bg-white dark:after:bg-white"></div>

                <div className='my-4'>
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
                        <div className='flex flex-col md:flex-row items-start justify-start rounded-lg p-8 dark:p-0 bg-white dark:bg-base-300'>
                            <div className='w-full md:w-1/2'>
                                <img className='rounded-lg w-full' src={product?.image} alt="" />
                            </div>
                            <div className='w-full md:w-1/2 text-left md:pl-8 pb-8 pt-8 md:pt-2'>
                                <p className='font-sans text-sm text-[#151515] dark:text-white font-semibold'>
                                    Status:
                                    {product?.status === "Show" ?
                                        <span className='text-green-500'> This product Showing</span>
                                        :
                                        <span className='text-red-500'> This product Hidden</span>
                                    }
                                </p>
                                <h2 className='font-sans text-heading text-lg md:text-xl lg:text-2xl font-semibold text-[#151515] dark:text-white mt-4'>{product?.title}</h2>
                                <p className='font-sans uppercase font-bold text-gray-500 dark:text-gray-200 text-sm mt-1'>
                                    SKU:
                                    <span className='font-sans font-bold text-gray-500 dark:text-gray-300'> {product?.sku}</span>
                                </p>
                                <h2 className='font-sans text-2xl font-bold mt-5 text-[#151515] dark:text-white'>${product?.price}</h2>
                                <span className='flex my-4'>
                                    {product?.quantity > 0 ?
                                        <span className="font-sans inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-100">
                                            <span className="font-bold">In Stock</span>
                                        </span>
                                        :
                                        <span className="font-sans inline-flex px-2 text-xs font-medium leading-5 rounded-full text-red-500 bg-red-100 dark:text-red-100 dark:bg-red-800">
                                            <span className="font-bold">Stock Out</span>
                                        </span>
                                    }
                                    <span className='font-sans text-sm text-gray-500 dark:text-gray-300 font-medium pl-4'>Quantity: {product?.quantity}</span>
                                </span>
                                <p className='font-sans text-sm text-[#151515] dark:text-white'>{product?.description}</p>
                                <div className='mt-4 mb-12'>
                                    <p className="font-sans font-semibold py-1 text-[#151515] dark:text-white text-sm">
                                        <span className="text-[#151515] dark:text-white">Category: </span>
                                        {product?.type}
                                    </p>
                                    <span className='font-sans'>
                                        {
                                            product?.tag?.map((tg, idx) => <span
                                                key={idx}
                                                className="bg-gray-200 mr-2 border-0 text-gray-500 rounded-full inline-flex items-center justify-center px-2 py-1 text-xs font-semibold mt-2 dark:bg-gray-700 dark:text-gray-300">
                                                {tg}
                                            </span>)
                                        }
                                    </span>
                                </div>
                                <NavLink
                                    className='bg-green-600 hover:bg-green-700 text-sm text-white font-semibold font-sans px-4 py-2 duration-300 rounded'
                                    to={`/products/update/${product?._id}`}>
                                    Edit Product
                                </NavLink>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </section>
    );
};

export default ProductDetails;