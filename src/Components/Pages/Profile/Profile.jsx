import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import useStaff from "../../Hooks/useStaff";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { ScaleLoader } from "react-spinners";

const Profile = () => {
    const { user, UpdateUserInfo } = useContext(AuthContext);
    const [staff, refetch, isPending, isError] = useStaff(user.email);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [upImg, setUpImg] = useState("");
    const [newImg, setNewImg] = useState("");


    // Preview Image Before Upload.
    const PreviewImg = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
            const imageData = reader.result.split(",")[1];
            setUpImg(imageData);
        };
        setNewImg(e.target.files[0]);
    };


    // Update Profile Information.
    const onSubmit = (formData) => {
        formData.photoURL = newImg ? newImg : staff.photoURL;
        formData.displayName = formData.displayName ? formData.displayName : staff.displayName;
        formData.email = formData.email ? formData.email : staff.email;
        formData.contact = formData.contact ? formData.contact : staff.contact;
        formData.role = formData.role ? formData.role : staff.role;
        formData.updatedAt = new Date().toISOString();

        // console.log(formData);

        Swal.fire({
            title: "Are you sure?",
            text: "You want to update your information!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Update!"
        }).then((result) => {
            if (result.isConfirmed) {
                const userInfo = {
                    name: staff.displayName,
                    image: staff.photoURL
                }
                // UpdateUserInfo(userInfo)
                //     .then(res => {
                //         console.log(res);
                //     })
                //     .catch(err => {
                //         console.log(err);
                //     })
                toast.info("This feature is disabled for demo!", {
                    position: "top-center",
                    autoClose: 1500
                });
                // Swal.fire({
                //     title: "Deleted!",
                //     text: "Your file has been deleted.",
                //     icon: "success"
                // });
            }
        });
    };


    return (
        <section className="max-h-screen min-h-screen overflow-y-auto pt-20 bg-[#FAFAFA] dark:bg-base-300">
            <Helmet>
                <title>GS Seller Center | Profile</title>
            </Helmet>
            <div className='px-6 w-full'>
                <div className='flex justify-between items-center gap-4'>
                    <h2 className='my-4 font-bold text-xl text-[#151515] dark:text-white'>Update Profile Information</h2>
                    {loading ?
                        <button disabled className="font-medium outline-0 px-4 py-2 text-sm rounded-lg border border-gray-200 text-red-500 hover:bg-red-200 hover:border-red-300 hover:text-red-600 transition-colors duration-500">
                            Cancel
                        </button>
                        :
                        <button onClick={() => window.history.back()} className="cursor-pointer font-medium outline-0 px-4 py-2 text-sm rounded-lg border border-gray-200 text-red-500 hover:bg-red-200 hover:border-red-300 hover:text-red-600 transition-colors duration-500">
                            Cancel
                        </button>
                    }
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
                                <div className="w-full overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 mt-5 mb-8">
                                    <div>
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="px-6 pt-8 flex-grow w-full h-full max-h-full">
                                                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                                    <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium">1. Profile Picture</label>
                                                    <div className="col-span-8 sm:col-span-4">
                                                        <div className="w-full grid md:grid-cols-2 sm:grid-cols-1 gap-4 items-center text-center">
                                                            <label title='Upload Image' htmlFor="image-upload-btn" className='img-upload-btn'>
                                                                <div className="h-32 px-2 lg:px-4 py-2 lg:py-4 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md cursor-pointer" role="button" tabIndex="0">
                                                                    <span className="mx-auto flex justify-center">
                                                                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-3xl text-green-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline>
                                                                        </svg>
                                                                    </span>
                                                                    <p className="text-sm mt-2 text-[#151515] dark:text-gray-100">Drag your image here</p>
                                                                    <em className="text-xs text-gray-400 dark:text-gray-300">(Only *.jpeg and *.png images will be accepted)</em>
                                                                    <input {...register("photoURL")} onChange={e => PreviewImg(e)} className='image-upload-btn hidden' type="file" id='image-upload-btn' accept="image/*" />
                                                                </div>
                                                            </label>
                                                            {upImg ?
                                                                <div className="w-fit h-32 px-3 py-2 border border-gray-200 rounded-md">
                                                                    <img className='w-28 h-28' src={`data:image/*;base64,${upImg}`} alt="" id='ProfileImg' />
                                                                </div>
                                                                :
                                                                <div className="w-fit h-32 px-3 py-2 border border-gray-200 rounded-md">
                                                                    <img className='w-28 h-28' src={staff?.photoURL} alt="" id='ProfileImg' />
                                                                </div>
                                                            }
                                                        </div>
                                                        {errors.photoURL && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.photoURL.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                                    <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">2. Name</label>
                                                    <div className="col-span-8 sm:col-span-4">
                                                        <input
                                                            defaultValue={staff?.displayName}
                                                            {...register("displayName")}
                                                            className="w-full px-3 py-1 text-base font-semibold rounded-md border border-gray-200 dark:border-gray-500 focus:border-gray-600 dark:focus:border-gray-100 h-12 bg-gray-100 dark:bg-gray-800 text-[#151515] dark:text-white outline-0"
                                                            type="text"
                                                            placeholder="Name"
                                                        />
                                                        {errors.displayName && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.displayName.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                                    <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">3. Email</label>
                                                    <div className="col-span-8 sm:col-span-4">
                                                        <input
                                                            defaultValue={staff?.email}
                                                            {...register("email")}
                                                            className="w-full px-3 py-1 text-base font-semibold rounded-md border border-gray-200 dark:border-gray-500 focus:border-gray-600 dark:focus:border-gray-100 h-12 bg-gray-100 dark:bg-gray-800 text-[#151515] dark:text-white outline-0"
                                                            type="text"
                                                            placeholder="Email"
                                                        />
                                                        {errors.email && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.email.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                                    <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">4. Contact Number</label>
                                                    <div className="col-span-8 sm:col-span-4">
                                                        <input
                                                            defaultValue={staff?.contact}
                                                            {...register("contact")}
                                                            className="w-full px-3 py-1 text-base font-semibold rounded-md border border-gray-200 dark:border-gray-500 focus:border-gray-600 dark:focus:border-gray-100 h-12 bg-gray-100 dark:bg-gray-800 text-[#151515] dark:text-white outline-0"
                                                            type="number"
                                                            placeholder="Contact"
                                                        />
                                                        {errors.contact && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.contact.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                                    <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">5. Role</label>
                                                    <div className="col-span-8 sm:col-span-4">
                                                        <select
                                                            {...register("role")}
                                                            className="w-full bg-gray-200 dark:bg-gray-800 text-[#151515] dark:text-white p-3 border border-gray-300 dark:border-gray-500 focus:border-gray-600 dark:focus:border-gray-100 outline-0 rounded-md">
                                                            <option value={staff?.role} hidden>{staff?.role}</option>
                                                            <option value="Super Admin">Super Admin</option>
                                                            <option value="Admin">Admin</option>
                                                            <option value="CEO">CEO</option>
                                                            <option value="Manager">Manager</option>
                                                            <option value="Accountant">Accountant</option>
                                                            <option value="Driver">Driver</option>
                                                            <option value="Security Guard">Security Guard</option>
                                                            <option value="Deliver Person">Delivery Person</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="my-8 flex justify-end">
                                                    {loading ?
                                                        <button disabled className="inline-flex items-center gap-1 font-medium outline-0 px-4 py-3 text-base rounded-md border border-green-500 bg-green-500 text-white hover:bg-green-600 hover:border-green-600 duration-500">
                                                            <svg stroke="white" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-xxl text-green-500 mr-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline>
                                                            </svg>
                                                            Update
                                                            <svg className="ml-2 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                        </button>
                                                        :
                                                        <button className="cursor-pointer w-full flex items-center gap-1 sm:w-fit font-medium outline-0 px-4 py-3 text-base rounded-md border border-green-500 bg-green-500 text-white hover:bg-green-600 hover:border-green-600 duration-500" type="submit">
                                                            <svg stroke="white" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-xxl text-green-500 mr-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline>
                                                            </svg>
                                                            Update Profile
                                                        </button>
                                                    }
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
        </section>
    );
};

export default Profile;