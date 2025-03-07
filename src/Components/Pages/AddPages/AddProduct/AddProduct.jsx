import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useProducts from "../../../Hooks/useProducts";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import ReactTags from "react-tag-autocomplete";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProduct = () => {
    const [, refetch] = useProducts();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const parentRef = useRef(null);
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
        setNewImg(e.target.files[0])
    };


    // Add New Product.
    const onSubmit = formData => {
        const capitalizedTags = tags.map(tag => ({ ...tag, name: tag.name.charAt(0).toUpperCase() + tag.name.slice(1) }));
        formData.tag = capitalizedTags.map(tag => tag.name);;
        formData.image = newImg;

        if (tags.length) {
            Swal.fire({
                title: "Are you sure?",
                text: "You want to add this Product!",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Add"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    setLoading(true);

                    // Upload Image in ImageBB and Get Image URL.
                    const imageFile = { image: formData.image };
                    const res = await axiosPublic.post(image_hosting_api, imageFile, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });


                    // Store Data In Database.
                    if (res.data.success) {
                        // Set Product image and thumb.
                        formData.image = res.data.data.image.url;
                        formData.thumb = res.data.data.thumb.url;

                        // Call Product Update Api.
                        const productRes = await axiosSecure.post(`/add-new/product`, formData);
                        if (productRes.data.insertedId) {
                            refetch();
                            Swal.fire({
                                title: "Succeed!",
                                text: "Your Product has been Added Successfully!",
                                icon: "success"
                            });
                            setLoading(false);
                            navigate('/products');
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
        }
        else {
            toast.error("Tag Field Is Empty! You Must Have Some Tags For This Product..", {
                position: "top-center",
                autoClose: 2500
            })
            // focusInput();
        }
    };


    // Handle Input Focusing By On Click.
    // const focusInput = () => {
    //     const input = parentRef.current?.querySelector("input");
    //     if (input) {
    //         input.focus()
    //     };
    // }


    const onDelete = tagIndex => {
        setTags(tags.filter((_, i) => i !== tagIndex))
    };

    const onAddition = newTag => {
        setTags([...tags, newTag])
    };

    return (
        <section className="max-h-screen min-h-screen overflow-y-auto pt-20 bg-[#FAFAFA] dark:bg-base-300">
            <div className='px-6 mx-auto'>
                <div className='flex justify-between items-center gap-4'>
                    <h2 className='my-4 font-bold text-xl text-[#151515] dark:text-white'>Add New Products</h2>
                    {loading ?
                        <button
                            disabled
                            className="font-medium outline-0 px-4 py-2 text-sm rounded-lg border border-gray-200 text-red-500 hover:bg-red-200 hover:border-red-300 hover:text-red-600 transition-colors duration-500">
                            Cancel
                        </button>
                        :
                        <button
                            onClick={() => window.history.back()}
                            className="font-medium outline-0 px-4 py-2 text-sm rounded-lg border border-gray-200 text-red-500 hover:bg-red-200 hover:border-red-300 hover:text-red-600 transition-colors duration-500">
                            Cancel
                        </button>
                    }
                </div>

                <div className="divider before:bg-[#151515] after:bg-[#151515] dark:before:bg-white dark:after:bg-white my-1"></div>

                <div className="w-full overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 mt-5 mb-8">
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="px-6 pt-8 flex-grow w-full h-full max-h-full">
                                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                    <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium">1. Product Image</label>
                                    <div className="col-span-8 sm:col-span-4">
                                        <div className="w-full grid md:grid-cols-2 sm:grid-cols-1 gap-4 items-center text-center">
                                            <label title='Upload Image' htmlFor="image-upload-btn" className='img-upload-btn'>
                                                <div className="h-32 px-2 lg:px-4 py-2 lg:py-4 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md cursor-pointer" role="button" tabIndex="0">
                                                    <span className="mx-auto flex justify-center">
                                                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-3xl text-green-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline>
                                                        </svg>
                                                    </span>
                                                    <p className="text-sm mt-2 text-[#151515] dark:text-gray-300">Drag your image here</p>
                                                    <em className="text-xs text-gray-500 dark:text-gray-300">(Only *.jpeg and *.png images will be accepted)</em>
                                                    <input {...register("image", { required: "* This field must have some value!!" })} onChange={e => PreviewImg(e)} className='image-upload-btn hidden' type="file" id='image-upload-btn' accept="image/*" />
                                                </div>
                                            </label>
                                            {upImg &&
                                                <div className="w-fit h-32 px-3 py-2 border border-gray-200 rounded-md">
                                                    <img className='w-28 h-28' src={`data:image/*;base64,${upImg}`} alt="" id='ProfileImg' />
                                                </div>
                                            }
                                        </div>
                                        {errors.image && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.image.message}</p>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                    <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">2. Product SKU</label>
                                    <div className="col-span-8 sm:col-span-4">
                                        <input {...register("sku", { required: "* This field must have some value!!" })} className="w-full p-3 text-base rounded-md border border-[#151515] dark:border-gray-500 dark:focus:border-gray-100 bg-gray-100 dark:bg-gray-800 text-[#151515] dark:text-white outline-0" type="text" placeholder="Product SKU" />
                                        {errors.sku && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.sku.message}</p>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                    <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">3. Product Title/Name</label>
                                    <div className="col-span-8 sm:col-span-4">
                                        <input {...register("title", { required: "* This field must have some value!!" })} className="w-full p-3 text-base rounded-md border border-[#151515] dark:border-gray-500 dark:focus:border-gray-100 bg-gray-100 dark:bg-gray-800 text-[#151515] dark:text-white outline-0" type="text" placeholder="Product title" />
                                        {errors.title && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.title.message}</p>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                    <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">4. Product Slug</label>
                                    <div className="col-span-8 sm:col-span-4">
                                        <input {...register("slug", { required: "* This field must have some value!!" })} className="w-full p-3 text-base rounded-md border border-[#151515] dark:border-gray-500 dark:focus:border-gray-100 bg-gray-100 dark:bg-gray-800 text-[#151515] dark:text-white outline-0" type="text" placeholder="Product slug" />
                                        {errors.slug && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.slug.message}</p>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                    <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">5. Product Description</label>
                                    <div className="col-span-8 sm:col-span-4">
                                        <textarea {...register("description", { required: "* This field must have some value!!" })} className="w-full p-3 text-base rounded-md border border-[#151515] dark:border-gray-500 dark:focus:border-gray-100 bg-gray-100 dark:bg-gray-800 text-[#151515] dark:text-white outline-0" placeholder="Product details" rows="4" spellCheck="false">
                                        </textarea>
                                        {errors.description && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.description.message}</p>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                    <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">6. Parent Category</label>
                                    <div className="col-span-8 sm:col-span-4">
                                        <select {...register("parent", { required: "* This field must have some value!!" })} className="w-full p-3 text-base rounded-md border border-[#151515] dark:border-gray-500 dark:focus:border-gray-100 bg-gray-100 dark:bg-gray-800 text-[#151515] dark:text-white outline-0">
                                            <option value="" hidden>Select parent category</option>
                                            <option value="Fish &amp; Meat">Fish &amp; Meat</option>
                                            <option value="Fruits &amp; Vegetable">Fruits &amp; Vegetable</option>
                                            <option value="Fresh Seafood">Fresh Seafood</option>
                                            <option value="Cooking Essentials">Cooking Essentials</option>
                                            <option value="Breakfast">Breakfast</option>
                                            <option value="Drinks">Drinks</option>
                                            <option value="Milk &amp; Dairy">Milk &amp; Dairy</option>
                                            <option value="Organic Food">Organic Food</option>
                                            <option value="Honey">Honey</option>
                                            <option value="Sauces &amp; Pickles">Sauces &amp; Pickles</option>
                                            <option value="Jam &amp; Jelly">Jam &amp; Jelly</option>
                                            <option value="Snacks &amp; Instant">Snacks &amp; Instant</option>
                                            <option value="Biscuits &amp; Cakes">Biscuits &amp; Cakes</option>
                                            <option value="Household Tools">Household Tools</option>
                                            <option value="Baby Care">Baby Care</option>
                                            <option value="Pet Care">Pet Care</option>
                                            <option value="Beauty &amp; Health">Beauty &amp; Health</option>
                                            <option value="Sports &amp; Fitness">Sports &amp; Fitness</option>
                                        </select>
                                        {errors.parent && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.parent.message}</p>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                    <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">7. Child Category</label>
                                    <div className="col-span-8 sm:col-span-4">
                                        <select {...register("children", { required: "* This field must have some value!!" })} className="w-full p-3 text-base rounded-md border border-[#151515] dark:border-gray-500 dark:focus:border-gray-100 bg-gray-100 dark:bg-gray-800 text-[#151515] dark:text-white outline-0">
                                            <option value="" hidden>Select child category</option>
                                            <option value="Fish">Fish</option>
                                            <option value="Meat">Meat</option>
                                            <option value="Dry Fruits">Dry Fruits</option>
                                            <option value="Fresh Fruits">Fresh Fruits</option>
                                            <option value="Fresh Vegetable">Fresh Vegetable</option>
                                            <option value="Fresh Seafood">Fresh Seafood</option>
                                            <option value="Oil">Oil</option>
                                            <option value="Rice">Rice</option>
                                            <option value="Flour">Flour</option>
                                            <option value="Dry Vegetable">Dry Vegetable</option>
                                            <option value="Spices &amp; Mixes">Spices &amp; Mixes</option>
                                            <option value="Bread">Bread</option>
                                            <option value="Cereal">Cereal</option>
                                            <option value="Tea">Tea</option>
                                            <option value="Water">Water</option>
                                            <option value="Juice">Juice</option>
                                            <option value="Coffee">Coffee</option>
                                            <option value="Energy Drinks">Energy Drinks</option>
                                            <option value="Dairy">Dairy</option>
                                            <option value="Ice Cream">Ice Cream</option>
                                            <option value="Butter &amp; Ghee">Butter &amp; Ghee</option>
                                            <option value="Organic Food">Organic Food</option>
                                            <option value="Honey">Honey</option>
                                            <option value="Sauces">Sauces</option>
                                            <option value="Pickles &amp; Condiments">Pickles &amp; Condiments</option>
                                            <option value="Jam &amp; Jelly">Jam &amp; Jelly</option>
                                            <option value="Chocolate">Chocolate</option>
                                            <option value="Chips &amp; Nuts">Chips &amp; Nuts</option>
                                            <option value="Canned Food">Canned Food</option>
                                            <option value="Cakes">Cakes</option>
                                            <option value="Biscuits">Biscuits</option>
                                            <option value="Cleaner">Cleaner</option>
                                            <option value="Laundry">Laundry</option>
                                            <option value="Air Freshener">Air Freshener</option>
                                            <option value="Water Filter">Water Filter</option>
                                            <option value="Pest Control">Pest Control</option>
                                            <option value="Cleaning Tools">Cleaning Tools</option>
                                            <option value="Baby Food">Baby Food</option>
                                            <option value="Baby Accessories">Baby Accessories</option>
                                            <option value="Cat Care">Cat Care</option>
                                            <option value="Dog Care">Dog Care</option>
                                            <option value="Bird Care">Bird Care</option>
                                            <option value="Bath">Bath</option>
                                            <option value="Cosmetics">Cosmetics</option>
                                            <option value="Oral Care">Oral Care</option>
                                            <option value="Skin Care">Skin Care</option>
                                            <option value="Body Care">Body Care</option>
                                            <option value="Shaving Needs">Shaving Needs</option>
                                            <option value="Sports">Sports</option>
                                            <option value="Fitness">Fitness</option>
                                        </select>
                                        {errors.children && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.children.message}</p>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                    <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">8. Product Type</label>
                                    <div className="col-span-8 sm:col-span-4">
                                        <select {...register("type", { required: "* This field must have some value!!" })} className="w-full p-3 text-base rounded-md border border-[#151515] dark:border-gray-500 dark:focus:border-gray-100 bg-gray-100 dark:bg-gray-800 text-[#151515] dark:text-white outline-0">
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
                                        {errors.type && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.type.message}</p>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                    <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">9. Unit (kg/pc/lb/ml/g...etc)</label>
                                    <div className="col-span-8 sm:col-span-4">
                                        <input {...register("unit", { required: "* This field must have some value!!" })} className="w-full p-3 text-base rounded-md border border-[#151515] dark:border-gray-500 dark:focus:border-gray-100 bg-gray-100 dark:bg-gray-800 text-[#151515] dark:text-white outline-0" type="text" placeholder="Unit" />
                                        {errors.unit && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.unit.message}</p>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                    <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium">10. Product Quantity</label>
                                    <div className="col-span-8 sm:col-span-4">
                                        <input {...register("quantity", { required: "* This field must have some value!!" })} className="w-full p-3 text-base rounded-md border border-[#151515] dark:border-gray-500 dark:focus:border-gray-100 bg-gray-100 dark:bg-gray-800 text-[#151515] dark:text-white outline-0" type="number" placeholder="Quantity" />
                                        {errors.quantity && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.quantity.message}</p>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                    <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">11. Product Price</label>
                                    <div className="col-span-8 sm:col-span-4">
                                        <input {...register("originalPrice", { required: "* This field must have some value!!" })} className="w-full p-3 text-base rounded-md border border-[#151515] dark:border-gray-500 dark:focus:border-gray-100 bg-gray-100 dark:bg-gray-800 text-[#151515] dark:text-white outline-0" type="number" placeholder="Price" />
                                        {errors.originalPrice && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.originalPrice.message}</p>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                    <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">12. Sale Price</label>
                                    <div className="col-span-8 sm:col-span-4">
                                        <input {...register("price", { required: "* This field must have some value!!" })} className="w-full p-3 text-base rounded-md border border-[#151515] dark:border-gray-500 dark:focus:border-gray-100 bg-gray-100 dark:bg-gray-800 text-[#151515] dark:text-white outline-0" type="number" placeholder="Sale price" />
                                        {errors.price && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.price.message}</p>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                    <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">13. Product Tag</label>
                                    <div className="col-span-8 sm:col-span-4">
                                        <ReactTags
                                            allowNew
                                            tags={tags}
                                            onDelete={onDelete}
                                            onAddition={onAddition}
                                            placeholderText="Write & press enter to add new Tag"
                                            allowBackspace={false}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                    <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">14. Flash Sale</label>
                                    <div className="col-span-8 sm:col-span-4">
                                        <fieldset className="flex items-center gap-6 border px-4 py-2 rounded-lg text-[#151515] dark:text-white">
                                            <legend className="px-2 italic">Flash Sale</legend>
                                            <label htmlFor="flashSale">
                                                <span className="pr-4">Yes</span>
                                                <input
                                                    {...register("flashSale", { required: "* This field must have some value!!" })}
                                                    className="outline-0 border-0"
                                                    type="radio"
                                                    name="flashSale"
                                                    id="flashSale"
                                                    value={true}
                                                />
                                            </label>
                                            <label htmlFor="flashSale">
                                                <span className="pr-4">No</span>
                                                <input
                                                    {...register("flashSale", { required: "* This field must have some value!!" })}
                                                    className="outline-0 border-0"
                                                    type="radio"
                                                    name="flashSale"
                                                    id="flashSale"
                                                    value={false}
                                                />
                                            </label>
                                        </fieldset>
                                        {errors.flashSale && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.flashSale.message}</p>}
                                    </div>
                                </div>
                                <div className="my-5 md:my-10 sm:text-right">
                                    {loading ?
                                        <button disabled className="inline-flex justify-center items-center gap-2 font-medium outline-0 px-6 py-2 text-lg rounded-md border border-green-500 bg-green-500 text-white hover:bg-green-600 hover:border-green-600 duration-500">
                                            + Add
                                            <svg className="ml-2 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        </button>
                                        :
                                        <button className="w-full sm:w-fit items-center font-medium outline-0 px-6 py-2 text-lg rounded-md border border-green-500 bg-green-500 text-white hover:bg-green-600 hover:border-green-600 duration-500" type="submit">
                                            + Add
                                        </button>
                                    }
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AddProduct;