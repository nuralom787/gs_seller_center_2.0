import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import useCoupons from '../../../Hooks/useCoupons';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddCoupon = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [coupons, refetch] = useCoupons();
    const [couponId, setCouponId] = useState("");
    const [upImg, setUpImg] = useState("");
    const [newImg, setNewImg] = useState("");
    const [loading, setLoading] = useState(false);


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


    // Create Random Coupon ID.
    useEffect(() => {
        // let text = "";
        // let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        // for (let i = 0; i < 6; i++) {
        //     text += possible.charAt(Math.floor(Math.random() * possible.length));
        // }
        // for (const coupon in coupons) {
        //     if (coupons[coupon].couponId !== text) {
        //         setCouponId(text);
        //     }
        // }
        if (!coupons) {
            return
        }
        let generateId = () => {
            let text = "";
            let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            for (let i = 0; i < 6; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        };

        let newId;
        do {
            newId = generateId();
        } while (Object.values(coupons).some(coupon => coupon.couponId === newId));

        setCouponId(newId);
    }, [coupons]);


    // Add New Coupon Information.
    const onSubmit = (formData) => {
        formData.logo = newImg;
        formData.thumb = newImg;
        formData.discountPercentage = parseInt(formData.discountPercentage);
        formData.minimumAmount = parseInt(formData.minimumAmount);
        formData.createdAt = new Date().toISOString();
        formData.updatedAt = new Date().toISOString();
        formData.couponId = couponId;

        // console.log(formData);

        Swal.fire({
            title: "Are you sure?",
            text: "You want to add this Coupon!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Add!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true);

                // Upload Image in ImageBB and Get Image URL.
                const imageFile = { image: formData.logo };
                const res = await axiosPublic.post(image_hosting_api, imageFile, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });


                // Store Data In Database.
                if (res.data.success) {
                    // Set Product image and thumb.
                    formData.logo = res.data.data.image.url;
                    formData.thumb = res.data.data.thumb.url;

                    // Call Product Update Api.
                    const couponRes = await axiosSecure.post(`/add-new/coupon`, formData);
                    if (couponRes.data.insertedId) {
                        refetch();
                        Swal.fire({
                            title: "Succeed!",
                            text: "Your Coupon has been Added Successfully!",
                            icon: "success"
                        });
                        setLoading(false);
                        navigate('/coupons');
                    }
                    else {
                        toast.error("something wants Wrong! Please Try Again Later.", {
                            position: "top-center",
                            autoClose: 3000
                        });
                    }
                }
                else {
                    toast.error("Image Server Dose not Response! Please Try Again..", {
                        position: "top-center",
                        autoClose: 3000
                    })
                    setLoading(false);
                }
            }
        });
    };



    return (
        <section className="max-h-screen min-h-screen overflow-y-auto pt-20 bg-[#FAFAFA] dark:bg-base-300">
            <div className='px-6 w-full'>
                <div className='flex justify-between items-center gap-4'>
                    <h2 className='my-4 font-bold text-xl text-[#151515] dark:text-white'>Add New Coupon</h2>
                    {loading ?
                        <button
                            disabled
                            className="font-medium outline-0 px-4 py-2 text-sm rounded-lg border border-gray-200 text-red-500 hover:bg-red-200 hover:border-red-300 hover:text-red-600 transition-colors duration-500"
                        >
                            Cancel
                        </button>
                        :
                        <button
                            onClick={() => window.history.back()}
                            className="cursor-pointer font-medium outline-0 px-4 py-2 text-sm rounded-lg border border-gray-200 text-red-500 hover:bg-red-200 hover:border-red-300 hover:text-red-600 transition-colors duration-500"
                        >
                            Cancel
                        </button>
                    }
                </div>

                <div className="divider before:bg-[#151515] after:bg-[#151515] dark:before:bg-white dark:after:bg-white my-1"></div>

                <div className="w-full overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 mt-5 mb-8">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="px-6 pt-8 flex-grow w-full max-h-full">
                            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium">1. Coupon Banner Image</label>
                                <div className="col-span-8 sm:col-span-4">
                                    <div className="w-full grid md:grid-cols-2 sm:grid-cols-1 gap-4 items-center text-center">
                                        <label title='Upload Image' htmlFor="image-upload-btn" className='img-upload-btn'>
                                            <div className="h-32 px-2 lg:px-4 py-2 lg:py-4 border-2 border-gray-300 dark:border-gray-600 border-dashed outline-0 rounded-md cursor-pointer" role="button" tabIndex="0">
                                                <span className="mx-auto flex justify-center">
                                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-3xl text-green-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline>
                                                    </svg>
                                                </span>
                                                <p className="text-sm mt-2 text-[#151515] dark:text-gray-200">Drag your image here</p>
                                                <em className="text-xs text-gray-400">(Only *.jpeg and *.png images will be accepted)</em>
                                                <input
                                                    {...register("logo", { required: "* This field must have some value!!" })}
                                                    onChange={e => PreviewImg(e)}
                                                    className='image-upload-btn hidden'
                                                    type="file"
                                                    id='image-upload-btn'
                                                    accept="image/*" />
                                            </div>
                                        </label>
                                        {upImg &&
                                            <div className="w-fit h-32 px-3 py-2 border border-gray-200 rounded-md">
                                                <img className='w-28 h-28' src={`data:image/*;base64,${upImg}`} alt="" id='ProfileImg' />
                                            </div>
                                        }
                                    </div>
                                    {errors.logo && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.logo.message}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium">2. Campaign Name</label>
                                <div className="col-span-8 sm:col-span-4">
                                    <input
                                        {...register("title", { required: "* This field must have some value!!" })}
                                        className="w-full p-3 text-base rounded-md border border-gray-400 focus:border-gray-700 dark:border-gray-500 dark:focus:border-gray-100 bg-gray-100 dark:bg-gray-900 text-[#151515] dark:text-white outline-0"
                                        type="text"
                                        placeholder="Campaign Title"
                                    />
                                    {errors.title && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.title.message}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium">3. Campaign Code</label>
                                <div className="col-span-8 sm:col-span-4">
                                    <input {...register("couponCode", { required: "* This field must have some value!!" })} className="w-full p-3 text-base rounded-md border border-gray-400 focus:border-gray-700 dark:border-gray-500 dark:focus:border-gray-100 bg-gray-100 dark:bg-gray-900 text-[#151515] dark:text-white outline-0" type="text" placeholder="Coupon code" />
                                    {errors.couponCode && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.couponCode.message}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium">4. Coupon Validity Time</label>
                                <div className="col-span-8 sm:col-span-4">
                                    <input {...register("endTime", { required: "* This field must have some value!!" })} className="w-full p-3 text-base rounded-md border border-gray-400 focus:border-gray-700 dark:border-gray-500 dark:focus:border-gray-100 bg-gray-100 dark:bg-gray-900 text-[#151515] dark:text-white outline-0" type="datetime-local" placeholder="Coupon validation end time" />
                                    {errors.endTime && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.endTime.message}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium">5. Discount Percentage</label>
                                <div className="col-span-8 sm:col-span-4">
                                    <input
                                        {...register("discountPercentage", { required: "* This field must have some value!!" })}
                                        className="w-full p-3 text-base rounded-md border border-gray-400 focus:border-gray-700 dark:border-gray-500 dark:focus:border-gray-100 bg-gray-100 dark:bg-gray-900 text-[#151515] dark:text-white outline-0"
                                        type="number" placeholder="Discount percentage" />
                                    {errors.discountPercentage && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.discountPercentage.message}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium">6. Minimum Amount</label>
                                <div className="col-span-8 sm:col-span-4">
                                    <input {...register("minimumAmount", { required: "* This field must have some value!!" })}
                                        className="w-full p-3 text-base rounded-md border border-gray-400 focus:border-gray-700 dark:border-gray-500 dark:focus:border-gray-100 bg-gray-100 dark:bg-gray-900 text-[#151515] dark:text-white outline-0" type="number" placeholder="Minimum amount required" />
                                    {errors.minimumAmount && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.minimumAmount.message}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">7. Product Type</label>
                                <div className="col-span-8 sm:col-span-4">
                                    <select {...register("productType", { required: "* This field must have some value!!" })}
                                        className="w-full p-3 text-base rounded-md border border-gray-400 focus:border-gray-700 dark:border-gray-500 dark:focus:border-gray-100 bg-gray-100 dark:bg-gray-900 text-[#151515] dark:text-white outline-0">
                                        <option value="" hidden>Select type</option>
                                        <option value="Grocery">Grocery</option>
                                        <option value="Foods">Foods</option>
                                        <option value="Cloths">Cloths</option>
                                        <option value="Health Care">Health Care </option>
                                        <option value="Medicine">Medicine </option>
                                        <option value="Books">Books </option>
                                        <option value="Bags">Bags</option>
                                        <option value="Sports &amp; Fitness">Sports &amp; Fitness </option>
                                        <option value="Home Accessories">Home Accessories</option>
                                        <option value="Furniture">Furniture</option>
                                        <option value="Electronics">Electronics </option>
                                    </select>
                                    {errors.productType && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.productType.message}</p>}
                                </div>
                            </div>
                            <div className="my-5 md:my-10 sm:text-right">
                                {loading ?
                                    <button disabled className="inline-flex w-full sm:w-fit items-center font-medium outline-0 px-6 py-3 text-xl rounded-md border border-green-500 bg-green-500 text-white hover:bg-green-700 hover:border-green-600 duration-500" type="submit">
                                        + Add
                                        <svg className="ml-2 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </button>
                                    :
                                    <button className="cursor-pointer w-full sm:w-fit items-center font-medium outline-0 px-6 py-3 text-xl rounded-md border border-green-500 bg-green-500 text-white hover:bg-green-700 hover:border-green-600 duration-500" type="submit">
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

export default AddCoupon;