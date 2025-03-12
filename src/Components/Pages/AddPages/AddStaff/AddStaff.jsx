import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const AddStaff = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [staffs, setStaffs] = useState([]);
    const [staffId, setStaffId] = useState("");
    const [upImg, setUpImg] = useState("");
    const [infoLoading, setInfoLoading] = useState(false);


    // Load Staffs Info.
    useEffect(() => {
        fetch('http://localhost:5000/staffs')
            .then(res => res.json())
            .then(data => setStaffs(data))
    }, []);

    // Preview Image Before Upload.
    const PreviewImg = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
            const imageData = reader.result.split(",")[1];
            setUpImg(imageData);
        };
    };


    // Create Random Staff ID.
    useEffect(() => {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (let i = 0; i < 6; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        for (const staff in staffs) {
            if (staffs[staff].staffId !== text) {
                setStaffId(text);
            }
        }
    }, [staffs]);


    // Add New Staff Information.
    const onSubmit = (formData) => {
        formData.photoURL = upImg;
        formData.joiningDate = new Date(formData.joiningDate).toISOString();
        formData.staffId = staffId;

        console.log(formData);

        // setInfoLoading(true);
        // fetch('https://daily-bazar-95aq.onrender.com/add-staffs', {
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         if (data.acknowledged === true && data.insertedId) {
        //             toastSuccess();
        //             setInfoLoading(false)
        //             navigate('/our-staff');
        //         } else {
        //             toastError();
        //         }
        //     })
    };


    return (
        <section className="max-h-screen min-h-screen overflow-y-auto pt-20 bg-[#FAFAFA] dark:bg-base-300">
            <div className='px-6 w-full'>
                <div className='flex justify-between items-center gap-4'>
                    <h2 className='my-4 font-bold text-xl text-[#151515] dark:text-white'>Add New Staff</h2>
                    {infoLoading ?
                        <button
                            disabled
                            className="font-medium outline-0 px-4 py-2 text-sm rounded-lg border border-gray-200 text-red-500 hover:bg-red-200 hover:border-red-300 hover:text-red-600 transition-colors duration-500">
                            Cancel
                        </button>
                        :
                        <button
                            onClick={() => window.history.back()}
                            className="cursor-pointer font-medium outline-0 px-4 py-2 text-sm rounded-lg border border-gray-200 text-red-500 hover:bg-red-200 hover:border-red-300 hover:text-red-600 transition-colors duration-500">
                            Cancel
                        </button>
                    }
                </div>

                <div className="divider before:bg-[#151515] after:bg-[#151515] dark:before:bg-white dark:after:bg-white my-1"></div>

                <div className="w-full overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 mt-5 mb-8">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full">
                            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium">1. Staff Image</label>
                                <div className="col-span-8 sm:col-span-4">
                                    <div className="w-full grid md:grid-cols-2 sm:grid-cols-1 gap-4 items-center text-center">
                                        <label title='Upload Image' htmlFor="image-upload-btn" className='img-upload-btn'>
                                            <div className="h-32 px-2 lg:px-4 py-2 lg:py-4 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md cursor-pointer" role="button" tabIndex="0">
                                                <span className="mx-auto flex justify-center">
                                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-3xl text-green-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline>
                                                    </svg>
                                                </span>
                                                <p className="text-sm mt-2 text-[#151515] dark:text-white">Drag your image here</p>
                                                <em className="text-xs text-gray-400">(Only *.jpeg and *.png images will be accepted)</em>
                                                <input {...register("photoURL", { required: "* This field must have some value!!" })} onChange={e => PreviewImg(e)} className='image-upload-btn hidden' type="file" id='image-upload-btn' accept="image/*" />
                                            </div>
                                        </label>
                                        {upImg &&
                                            <div className="w-fit h-32 px-3 py-2 border border-gray-200 rounded-md">
                                                <img className='w-28 h-28' src={`data:image/*;base64,${upImg}`} alt="" id='ProfileImg' />
                                            </div>
                                        }
                                    </div>
                                    {errors.photoURL && <span className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.photoURL.message}</span>}
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium">2. Name</label>
                                <div className="col-span-8 sm:col-span-4">
                                    <input
                                        {...register("displayName", { required: "* This field must have some value!!" })}
                                        className="w-full p-3 text-base rounded-md border border-gray-200 focus:border-gray-500 dark:border-gray-500 dark:focus:border-gray-100 bg-gray-100 dark:bg-gray-900 text-[#151515] dark:text-white outline-0"
                                        type="text"
                                        placeholder='Staff Name'
                                    />
                                    {errors.displayName && <span className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.displayName.message}</span>}
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium">3. Email</label>
                                <div className="col-span-8 sm:col-span-4">
                                    <input
                                        {...register("email", { required: "* This field must have some value!!" })}
                                        className="w-full p-3 text-base rounded-md border border-gray-200 focus:border-gray-500 dark:border-gray-500 dark:focus:border-gray-100 bg-gray-100 dark:bg-gray-900 text-[#151515] dark:text-white outline-0"
                                        type="email"
                                        placeholder='Email'
                                    />
                                    {errors.email && <span className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.email.message}</span>}
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium">4. Password</label>
                                <div className="col-span-8 sm:col-span-4">
                                    <input
                                        {...register("password", { required: "* This field must have some value!!" })}
                                        className="w-full p-3 text-base rounded-md border border-gray-200 focus:border-gray-500 dark:border-gray-500 dark:focus:border-gray-100 bg-gray-100 dark:bg-gray-900 text-[#151515] dark:text-white outline-0"
                                        type="password"
                                        placeholder="Password"
                                    />
                                    {errors.password && <span className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.password.message}</span>}
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium">5. Contact Number</label>
                                <div className="col-span-8 sm:col-span-4">
                                    <input
                                        {...register("contact", { required: "* This field must have some value!!" })}
                                        className="w-full p-3 text-base rounded-md border border-gray-200 focus:border-gray-500 dark:border-gray-500 dark:focus:border-gray-100 bg-gray-100 dark:bg-gray-900 text-[#151515] dark:text-white outline-0"
                                        type="number"
                                        placeholder="Phone number"
                                    />
                                    {errors.contact && <span className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.contact.message}</span>}
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium">6. Joining Date</label>
                                <div className="col-span-8 sm:col-span-4">
                                    <input
                                        {...register("joiningDate", { required: "* This field must have some value!!" })}
                                        className="w-full p-3 text-base rounded-md border border-gray-200 focus:border-gray-500 dark:border-gray-500 dark:focus:border-gray-100 bg-gray-100 dark:bg-gray-900 text-[#151515] dark:text-white outline-0"
                                        type="date"
                                        label="Joining Date"
                                        placeholder="Staff Joining Date"
                                    />
                                    {errors.joiningDate && <span className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.joiningDate.message}</span>}
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium">7. Staff Role</label>
                                <div className="col-span-8 sm:col-span-4">
                                    <select
                                        {...register("role", { required: "* This field must have some value!!" })}
                                        className="w-full p-3 text-base rounded-md border border-gray-200 focus:border-gray-500 dark:border-gray-500 dark:focus:border-gray-100 bg-gray-100 dark:bg-gray-900 text-[#151515] dark:text-white outline-0"
                                    >
                                        <option value="" hidden>Staff role</option>
                                        <option value="Admin">Admin</option>
                                        <option value="CEO">CEO</option>
                                        <option value="Manager">Manager</option>
                                        <option value="Accountant">Accountant</option>
                                        <option value="Driver">Driver</option>
                                        <option value="Security Guard">Security Guard</option>
                                        <option value="Deliver Person">Delivery Person</option>
                                        <option value="Test User">Test User</option>
                                    </select>
                                    {errors.role && <span className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.role.message}</span>}
                                </div>
                            </div>
                            <div className="my-5 md:my-10 sm:text-right">
                                {infoLoading ?
                                    <button disabled className="inline-flex justify-center items-center gap-2 font-medium outline-0 px-6 py-2 text-lg rounded-md border border-green-500 bg-green-500 text-white hover:bg-green-600 hover:border-green-600 duration-500">
                                        + Add
                                        <svg class="ml-2 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </button>
                                    :
                                    <button className="cursor-pointer w-full sm:w-fit items-center font-medium outline-0 px-6 py-2 text-lg rounded-md border border-green-500 bg-green-500 text-white hover:bg-green-600 hover:border-green-600 duration-500" type="submit">
                                        + Add
                                    </button>
                                }
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AddStaff;