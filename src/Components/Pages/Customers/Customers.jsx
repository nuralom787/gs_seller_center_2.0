import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router";
import { Tooltip } from "react-tooltip";

const Customers = () => {
    const { register, handleSubmit } = useForm();
    const [infoLoading, setInfoLoading] = useState(true);
    const [deleteCount, setDeleteCount] = useState(false);
    const [search, setSearch] = useState(false);
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const size = 5;


    // Load User Info.
    useEffect(() => {
        fetch(`http://localhost:5000/users?page=${page}&&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setUsers(data.users);
                const count = data.count;
                const pageNumber = Math.ceil(count / size);
                setPageCount(pageNumber)
                fetch(`http://localhost:5000/users`)
                    .then(res => res.json())
                    .then(data => {
                        setTotalUsers(data.count);
                        setInfoLoading(false);
                    })
            })
    }, [page, deleteCount]);


    // Search Specific User By Additional Information.
    const onSubmit = (value) => {
        // if (value.search !== "") {
        //     setSearch(true);
        //     fetch(`https://daily-bazar-95aq.onrender.com/users`)
        //         .then(res => res.json())
        //         .then(data => {
        //             const searchData = data.users.filter(data => data.displayName.toLowerCase().includes(value.search.toLowerCase()) || data.email.toLowerCase().includes(value.search.toLowerCase()) || data.phoneNumber?.includes(value.search));
        //             if (searchData.length) {
        //                 setUsers(searchData);
        //                 setSearch(false);
        //             } else {
        //                 setSearch(false);
        //                 toast.error("Search info doesn't match any customer's profile!! please try again")
        //             }
        //         })
        // }
        // else if (value.search === "") {
        //     fetch(`https://daily-bazar-95aq.onrender.com/users?page=${page}&&size=${size}`)
        //         .then(res => res.json())
        //         .then(data => {
        //             setUsers(data.users);
        //             const count = data.count;
        //             const pageNumber = Math.ceil(count / size);
        //             setPageCount(pageNumber)
        //             fetch(`https://daily-bazar-95aq.onrender.com/users`)
        //                 .then(res => res.json())
        //                 .then(data => {
        //                     setTotalUsers(data.count);
        //                     setInfoLoading(false);
        //                 })
        //         })
        // }
    };


    // Sweet Alert.
    // const sweetAlert = (user) => {
    //     swal(<div>
    //         <h2 className='text-xl font-medium'>Are You Sure! Want to Delete <span className='text-red-500'>{user.displayName}</span> Record?</h2>
    //         <p className='mt-3 text-black text-md text-center'>Do you really want to delete these records? You can't view this in your list anymore if you delete!</p>
    //         {/* <div className='text-center mt-2'>
    //             <button className='bg-gray-400 hover:bg-gray-500 text-white text-sm font-medium px-4 py-2 mx-1 rounded-lg transition-colors duration-300 outline-0'>No, Keep it</button>
    //             <button className='bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 mx-1 rounded-lg transition-colors duration-300 outline-0' type='submit'>Yes, Delete it</button>
    //         </div> */}
    //     </div>,
    //         {
    //             icon: "warning",
    //             buttons: true,
    //             closeOnClickOutside: false,
    //         })
    //         .then((willDelete) => {
    //             if (admin && willDelete) {
    //                 deleteCustomer(user._id)
    //             } else if (willDelete) {
    //                 toast.info("CURD Operation Disabled for Demo Projects!!")
    //             }
    //         });
    // };



    // Delete Product Function.
    const deleteCustomer = (id) => {
        // fetch(`https://daily-bazar-95aq.onrender.com/delete-user/${id}`, {
        //     method: "DELETE",
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         if (data.deletedCount > 0) {
        //             toastSuccess();
        //             if (deleteCount === true) {
        //                 setDeleteCount(false);
        //             } else {
        //                 setDeleteCount(true);
        //             }
        //         }
        //         else {
        //             toastError();
        //         }
        //     });
    };



    return (
        <section className="max-h-screen min-h-screen overflow-y-auto pt-20 bg-[#FAFAFA] dark:bg-base-300">
            <Tooltip id="my-tooltip" />
            <div className='px-6 mx-auto'>
                <h2 className='my-4 font-bold font-sans text-lg dark:text-white'>Customers</h2>
                <div className='bg-white dark:bg-gray-800 border border-gray-300  dark:border-gray-800 rounded-md'>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex justify-between items-center px-4 py-6'>
                        <input {...register("search")} className='w-full focus:bg-white dark:focus:border-gray-100 bg-gray-200 dark:bg-gray-800 p-3 border border-gray-300 dark:border-gray-500 dark:text-white outline-0 rounded-md text-sm font-sans font-semibold' type="search" placeholder='Search by name/email/phone' />
                        {search &&
                            <svg className="ml-2 mr-4 h-6 w-6 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="green" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="green" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        }
                    </form>
                </div>
                {!infoLoading ?
                    <div>
                        <div className="w-full overflow-x-auto rounded-t-lg border border-gray-200 dark:border-gray-600 mt-4">
                            <table className="w-full whitespace-no-wrap">
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
                                        users.map(user => <tr className='' key={user._id}>
                                            <td className='px-3 py-3 font-sans text-xs font-bold'>
                                                {user._id.slice(6, 12).toUpperCase()}
                                            </td>
                                            <td className='px-3 py-3 font-sans flex items-center text-sm'>
                                                <img className='w-12 h-12 shadow-inner rounded-full p-1 mr-2 hidden sm:block' src={`data:image/png;base64,${user.photoURL}`} alt="" />
                                                {user.title}
                                            </td>
                                            <td className='px-3 py-3 font-sans text-sm'>
                                                {user.displayName}
                                            </td>
                                            <td className='px-3 py-3 font-sans text-sm'>
                                                {user.email}
                                            </td>
                                            <td className='px-3 py-3 font-sans text-sm'>
                                                {user.created.slice(4, 10)}, {user.created.slice(11, 15)}
                                            </td>
                                            <td className='px-3 py-3 font-sans text-sm'>
                                                {user.phoneNumber}
                                            </td>
                                            <td className='px-2 py-3 font-sans text-sm'>
                                                <div className="flex">
                                                    <NavLink to={`/customer-order/${user._id}`} title='View Orders' className="py-2 px-1 mx-1 text-gray-400 hover:text-green-600">
                                                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line>
                                                        </svg>
                                                    </NavLink>
                                                    <button onClick={() => sweetAlert(user)} title='Delete' className="py-2 px-1 mx-1 text-gray-400 hover:text-red-600">
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
                        <div className='flex items-center justify-between p-4 mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-b-lg'>
                            <div className='text-xs font-bold text-gray-600 dark:text-gray-300'>
                                SHOWING {(page * users.length) + 1}-{(page + 1) * users.length} OF {totalUsers}
                            </div>
                            <div className='text-xs font-bold bg-gray-100 dark:bg-gray-800 rounded'>
                                {
                                    [...Array(pageCount).keys()]
                                        .map(number => <button
                                            key={number}
                                            onClick={() => setPage(number)}
                                            className={number === page ? 'px-3 py-2 bg-green-400 text-white border-gray-200 rounded outline-0' : 'px-3 py-2 border-gray-200 dark:text-gray-200 rounded outline-0'}>
                                            {number + 1}
                                        </button>
                                        )
                                }
                            </div>
                        </div>
                    </div>
                    :
                    <div className="text-center">
                        <div className="loading">
                            <div className="loading-bar"></div>
                            <div className="loading-bar"></div>
                            <div className="loading-bar"></div>
                            <div className="loading-bar"></div>
                        </div>
                    </div>
                }
            </div>
        </section>
    );
};

export default Customers;