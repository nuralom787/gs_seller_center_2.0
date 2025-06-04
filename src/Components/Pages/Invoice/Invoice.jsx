import { useParams } from "react-router";
import useOrder from "../../Hooks/useOrder";
import './Invoice.css';
import logo from '../../../assets/logo.jpg';
import { ScaleLoader } from "react-spinners";


const Invoice = () => {
    const { id } = useParams();
    const [order, refetch, isPending] = useOrder(id);


    return (
        <section className="max-h-screen min-h-screen overflow-y-auto pt-20 print:pt-0 bg-[#FAFAFA] dark:bg-base-300 print:bg-white">
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
                <div className='px-6 mx-auto print:p-0'>
                    <div className="invoice-head">
                        <h2 className='my-4 font-bold text-xl text-[#151515] dark:text-white'>Invoice</h2>
                        <div className="invoice divider before:bg-[#151515] after:bg-[#151515] dark:before:bg-white dark:after:bg-white my-1"></div>
                    </div>

                    <div className='bg-white dark:bg-gray-900 print:bg-white print:text-[#151515] border print:border-0 border-gray-200 dark:border-gray-600 rounded-xl mb-8'>
                        <div className='py-3 md:py-6 px-4 md:px-6 print:p-0'>
                            <div id='invoice' className=''>
                                <div className=''>
                                    <div className='flex flex-col md:flex-row print:flex-row justify-between items-start print:items-center'>
                                        <h2 className='font-bold font-sans text-xl text-[#151515] dark:text-white print:text-[#151515]'>
                                            INVOICE
                                            <p className='text-xs mt-1 text-gray-500 dark:text-gray-400'>
                                                STATUS:
                                                <span className='mx-2'>
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
                                                </span>
                                            </p>
                                        </h2>
                                        <div className='text-start md:text-end mt-4 md:mt-0'>
                                            <div className="flex justify-start md:justify-end items-center gap-2">
                                                <img className='w-10' src={logo} alt="" />
                                                <h1 className="text-2xl text-[#151515] print:text-[#151515] dark:text-white font-bold">GS-Seller Center</h1>
                                            </div>
                                            <small className='font-sans text-gray-600 dark:text-gray-400 print:text-[#151515]'>
                                                {order.sbAddress.city}, {order.sbAddress.region}, Bangladesh.
                                            </small>
                                        </div>
                                    </div>

                                    <div className="divider before:bg-[#151515] after:bg-[#151515] dark:before:bg-white dark:after:bg-white my-1"></div>

                                    <div className='flex flex-col md:flex-row justify-between items-start'>
                                        <span className='text-start'>
                                            <h4 className='text-sm font-bold text-[#151515] dark:text-gray-200 font-sans print:text-[#151515]'>DATE.</h4>
                                            <p className='text-sm text-gray-600 dark:text-gray-300 font-sans print:text-[#151515]'>
                                                {new Date(order?.createdAt).toLocaleString("en-BD", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric"
                                                })}
                                            </p>
                                        </span>
                                        <span className='text-start mt-4 md:mt-0 print:mt-0.5'>
                                            <h4 className='text-sm font-bold text-[#151515] dark:text-gray-200 font-sans print:text-[#151515]'>INVOICE NO.</h4>
                                            <p className='text-sm text-gray-600 dark:text-gray-300 font-sans print:text-[#151515]'>{order?.invoice}</p>
                                        </span>
                                        <span className='text-start mt-4 md:mt-0 md:text-end print:mt-0.5'>
                                            <h4 className='text-sm font-bold text-[#151515] dark:text-gray-200 font-sans print:text-[#151515]'>INVOICE TO.</h4>
                                            <span className='text-sm text-gray-600 dark:text-gray-300 font-sans print:text-[#151515]'>{order?.sbAddress?.fullName}</span>
                                            <br />
                                            <span className='text-sm text-gray-600 dark:text-gray-300 font-sans print:text-[#151515]'>{order?.sbAddress?.city}, {order?.sbAddress?.zone}.</span>
                                            <br />
                                            <span className='text-sm text-gray-600 dark:text-gray-300 font-sans print:text-[#151515]'>{order?.sbAddress?.address}</span>
                                        </span>
                                    </div>
                                </div>

                                <div className='my-8 print:-my-2 overflow-x-auto rounded-lg print:py-8'>
                                    <table className="table static table-auto min-w-full border border-gray-100 dark:border-0 print:border divide-y divide-gray-200">
                                        <thead className="text-xs font-bold tracking-wide text-left text-black uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-300 dark:bg-gray-800 print:bg-gray-100 print:text-[#151515] print:border-b-0">
                                            <tr className=''>
                                                <td className='px-4 py-3'>SR.</td>
                                                <td className='px-4 py-3'>PRODUCT NAME</td>
                                                <td className='px-4 py-3 text-center'>QUANTITY</td>
                                                <td className='px-4 py-3 text-end'>ITEM PRICE</td>
                                                <td className='px-4 py-3 text-end'>AMOUNT</td>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400 text-serif text-sm print:bg-white print:text-[#151515]">
                                            {order?.cart?.map((ord, idx) =>
                                                <tr className='dark:border-gray-700 dark:text-gray-400 print:border-0' key={ord._id}>
                                                    <td className='px-4 py-3 font-normal text-[#151515] dark:text-gray-400 print:text-[#151515] text-left'>
                                                        {idx + 1}
                                                    </td>
                                                    <td className='px-4 py-3 font-normal text-[#151515] dark:text-gray-400 print:text-[#151515]'>
                                                        {ord.title}
                                                    </td>
                                                    <td className='px-4 py-3 font-bold text-center print:text-[#151515]'>
                                                        {ord.quantity}
                                                    </td>
                                                    <td className='px-4 py-3 font-bold text-end print:text-[#151515]'>
                                                        ${ord.price.toFixed(2)}
                                                    </td>
                                                    <td className='px-4 py-3 text-end font-bold text-red-500 dark:text-green-500 print:text-red-600'>
                                                        <strong>
                                                            ${ord.price * ord.quantity}.00
                                                        </strong>
                                                    </td>
                                                </tr>)}
                                        </tbody>
                                    </table>
                                </div>

                                <div className='flex flex-col md:flex-row justify-between px-7 py-8 bg-gray-100 dark:bg-gray-900 border border-gray-100 dark:border-gray-600 rounded-lg print:grid print:grid-cols-2 print:bg-white print:border-0 print:px-0 print:py-3'>
                                    <span>
                                        <h2 className='text-sm text-gray-700 dark:text-gray-200 print:text-[#151515] font-bold font-sans leading-8'>PAYMENT METHOD</h2>
                                        <p className='text-sm text-gray-500 dark:text-gray-400 print:text-gray-700 font-bold'>{order?.paymentMethod}</p>
                                    </span>
                                    <span className='mt-4 md:mt-0 print:m-0'>
                                        <h2 className='text-sm text-gray-700 dark:text-gray-200 print:text-[#151515] font-bold font-sans leading-8'>SHIPPING COAST</h2>
                                        <p className='text-sm text-gray-500 dark:text-gray-400 print:text-gray-700 font-bold'>${order?.shippingCost?.toFixed(2)}</p>
                                    </span>
                                    <span className='mt-4 md:mt-0 print:m-0'>
                                        <h2 className='text-sm text-gray-700 dark:text-gray-200 print:text-[#151515] font-bold font-sans leading-8'>DISCOUNT</h2>
                                        <p className='text-sm text-gray-500 dark:text-gray-400 print:text-gray-700 font-bold'>${order?.discount?.toFixed(2)}</p>
                                    </span>
                                    <span className='mt-4 md:mt-0 print:m-0'>
                                        <h2 className='text-sm text-gray-700 dark:text-gray-200 print:text-[#151515] font-bold font-sans leading-8'>TOTAL AMOUNT</h2>
                                        <p className='text-xl font-sans font-bold text-red-500 dark:text-green-500 print:text-red-600 block'>${order?.total?.toFixed(2)}</p>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='invoice-btn mt-6 mb-5 text-right'>
                        <button className='cursor-pointer text-lg font-sans font-semibold inline-flex items-center justify-between bg-green-600 hover:bg-green-800 dark:hover:bg-gray-600 dark:bg-gray-900 border border-green-600 hover:border-green-800 dark:border-gray-600 duration-300 px-3 py-2 rounded-md text-white gap-2' onClick={() => window.print('invoice')}>
                            PRINT INVOICE
                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect>
                            </svg>
                        </button>
                    </div>
                </div>
            }
        </section>
    );
};

export default Invoice;