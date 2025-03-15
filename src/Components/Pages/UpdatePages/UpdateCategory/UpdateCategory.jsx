import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import ReactTags from "react-tag-autocomplete";
import useCategory from "../../../Hooks/useCategory";
import { ScaleLoader } from "react-spinners";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCategories from "../../../Hooks/useCategories";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { toast } from "react-toastify";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateCategory = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    const [, refetch] = useCategories();
    const [category, refetch2, isPending] = useCategory(id);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [tags, setTags] = useState([]);
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

    // Add Updated Category Information.
    const onSubmit = formData => {
        const capitalizedTags = tags.map(tag => ({ ...tag, name: tag.name.charAt(0).toUpperCase() + tag.name.slice(1) }));
        formData.children = tags.length ? capitalizedTags.map(tag => tag.name) : category.children;

        formData.status = category.status;
        formData.parent = formData.parent ? formData.parent : category.parent;
        formData.type = formData.type ? formData.type : category.type;
        formData.icon = newImg ? newImg : category.icon;

        // console.log(formData);

        Swal.fire({
            title: "Are you sure?",
            text: "You Want to update this Category!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Update it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                toast.info("This feature is disabled for demo!", {
                    position: "top-center",
                    autoClose: 1500
                });
                // setLoading(true)
                // if (newImg) {
                //     // Upload Image in ImageBB and Get Image URL.
                //     const imageFile = { image: formData.icon };
                //     const res = await axiosPublic.post(image_hosting_api, imageFile, {
                //         headers: {
                //             'Content-Type': 'multipart/form-data'
                //         }
                //     });

                //     // Store Data In Database.
                //     if (res.data.success) {
                //         // Set Category image and thumb.
                //         formData.icon = res.data.data.image.url;
                //         formData.thumb = res.data.data.thumb.url;

                //         // Call Category Update Api.
                //         const categoryRes = await axiosSecure.patch(`/update/category/${id}`, formData);
                //         if (categoryRes.data.modifiedCount > 0) {
                //             refetch();
                //             refetch2();
                //             navigate('/categories');
                //             Swal.fire({
                //                 title: "Updated!",
                //                 text: "Your Category has been Updated Successfully.",
                //                 icon: "success"
                //             });
                //             setLoading(false);
                //         }
                //     }
                //     else {
                //         toast.error("Image Server Dose not Response! Please Try Again..", {
                //             position: "top-center",
                //             autoClose: 3000
                //         })
                //         setLoading(false);
                //     }
                // }
                // else {
                //     // Call Category Update Api.
                //     const categoryRes = await axiosSecure.patch(`/update/category/${id}`, formData);
                //     if (categoryRes.data.modifiedCount > 0) {
                //         refetch();
                //         refetch2();
                //         navigate('/categories');
                //         Swal.fire({
                //             title: "Updated!",
                //             text: "Your Category has been Updated Successfully.",
                //             icon: "success"
                //         });
                //         setLoading(false);
                //     }
                // }
            }
        });
    };


    // Load and Set Default Tags.
    useEffect(() => {
        if (category) {
            const formattedTag = category.children?.map((name, idx) => ({ id: idx, name: name }));
            setTags(formattedTag)
        }
    }, [category])


    const onDelete = tagIndex => {
        setTags(tags.filter((_, i) => i !== tagIndex))
    };


    const onAddition = newTag => {
        setTags([...tags, newTag])
    };


    return (
        <section className="max-h-screen min-h-screen overflow-y-auto pt-20 bg-[#FAFAFA] dark:bg-base-300">
            <section className="flex justify-center items-center">
                <div className='px-6 w-full'>
                    <div className='flex items-center justify-between gap-4'>
                        <h2 className='my-4 font-bold text-xl text-[#151515] dark:text-white'>Update Category Information</h2>
                        {loading ?
                            <button disabled onClick={() => window.history.back()} className="font-medium outline-0 px-4 py-2 text-sm rounded-lg border border-gray-200 text-red-500 hover:bg-red-200 hover:border-red-300 hover:text-red-600 transition-colors duration-500">
                                Cancel
                            </button>
                            :
                            <button onClick={() => window.history.back()} className="font-medium outline-0 px-4 py-2 text-sm rounded-lg border border-gray-200 text-red-500 hover:bg-red-200 hover:border-red-300 hover:text-red-600 transition-colors duration-500">
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
                            <div className="w-full overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 mt-5 mb-8">
                                <div>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="px-6 pt-8 flex-grow w-full h-full max-h-full">
                                            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                                <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium">1. Category Icon</label>
                                                <div className="col-span-8 sm:col-span-4">
                                                    <div className="w-full grid md:grid-cols-2 sm:grid-cols-1 gap-4 items-center text-center">
                                                        <label title='Upload Image' htmlFor="image-upload-btn" className='img-upload-btn'>
                                                            <div className="h-32 px-2 lg:px-4 py-2 lg:py-4 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md cursor-pointer" role="button" tabIndex="0">
                                                                <span className="mx-auto flex justify-center">
                                                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-3xl text-green-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline>
                                                                    </svg>
                                                                </span>
                                                                <p className="text-sm mt-2 text-[#151515] dark:text-gray-200">Drag your image here</p>
                                                                <em className="text-xs text-gray-400 dark:text-gray-400">(Only *.jpeg and *.png images will be accepted)</em>
                                                                <input
                                                                    {...register("icon")}
                                                                    onChange={e => PreviewImg(e)}
                                                                    className='image-upload-btn hidden'
                                                                    type="file"
                                                                    id='image-upload-btn'
                                                                    accept="image/*" />
                                                            </div>
                                                        </label>
                                                        {upImg ?
                                                            <div className="w-fit h-32 px-3 py-2 border border-gray-200 rounded-md">
                                                                <img className='w-28 h-28' src={`data:image/*;base64,${upImg}`} alt="" id='ProfileImg' />
                                                            </div>
                                                            :
                                                            <div className="w-fit h-32 px-3 py-2 border border-gray-200 rounded-md">
                                                                <img className='w-28 h-28' src={category?.icon} alt="" id='ProfileImg' />
                                                            </div>
                                                        }
                                                    </div>
                                                    {errors.image && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.image.message}</p>}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                                <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">2. Category Type</label>
                                                <div className="col-span-8 sm:col-span-4">
                                                    <select {...register("type")} className="w-full p-3 text-sm rounded-md border border-gray-200 dark:border-gray-500 dark:focus:border-gray-100 bg-gray-100 dark:bg-gray-900 text-[#151515] dark:text-white outline-0">
                                                        <option value={category?.type} hidden>{category?.type}</option>
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
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                                <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">3. Parent Category</label>
                                                <div className="col-span-8 sm:col-span-4">
                                                    <input defaultValue={category?.parent} {...register("parent")} className="w-full p-3 text-sm rounded-md border border-gray-200 dark:border-gray-500 dark:focus:border-gray-100 bg-gray-100 dark:bg-gray-900 text-[#151515] dark:text-white outline-0" type="text" placeholder="Category title" />
                                                    {errors.parent && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.parent.message}</p>}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                                <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">4. Child Category</label>
                                                {category?.children && <div className="col-span-8 sm:col-span-4">
                                                    <ReactTags
                                                        allowNew
                                                        tags={tags}
                                                        onDelete={onDelete}
                                                        onAddition={onAddition}
                                                        placeholderText="Write & press enter to add new Tag"
                                                        allowBackspace={false}
                                                    />
                                                </div>}
                                            </div>
                                            <div className="my-5 md:my-10 sm:text-right flex justify-end">
                                                {loading ?
                                                    <button disabled className="w-full sm:w-fit flex justify-center items-center gap-1 font-medium outline-0 px-4 py-3 text-xl rounded-md border border-green-500 bg-green-500 text-white hover:bg-green-600 hover:border-green-600 duration-500" type="submit">
                                                        <svg stroke="white" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-xxl text-green-500 mr-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline>
                                                        </svg>
                                                        Update
                                                        <svg className="ml-2 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                    </button>
                                                    :
                                                    <button className="cursor-pointer w-full sm:w-fit flex justify-center items-center gap-1 font-medium outline-0 px-4 py-3 text-xl rounded-md border border-green-500 bg-green-500 text-white hover:bg-green-600 hover:border-green-600 duration-500">
                                                        <svg stroke="white" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-xxl text-green-500 mr-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline>
                                                        </svg>
                                                        Update
                                                    </button>
                                                }
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </section>
        </section>
    );
};

export default UpdateCategory;