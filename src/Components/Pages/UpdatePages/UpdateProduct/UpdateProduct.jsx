import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { TagsInput } from 'react-tag-input-component';
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import './UpdateProduct.css';
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const UpdateProduct = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [tagItem, setTagItem] = useState("");
    const [tags, setTags] = useState([]);
    const [product, setProduct] = useState({});
    const [upImg, setUpImg] = useState("");
    const [newImg, setNewImg] = useState("");
    const [infoLoading, setInfoLoading] = useState(false);

    const { _id, flashSale, image, thumb, title, slug, description, sku, price, quantity, children, originalPrice, parent, type, unit, tag } = product;


    // Loping Tag Items.
    useEffect(() => {
        for (const item in tag) {
            setTagItem(tag[item]);
        }
    }, [tag]);


    // Tag Items Split.
    useEffect(() => {
        // const tagItems = tagItem.split(',');
        const selectTag = tag?.map(ti => ti);
        setTags(selectTag);
    }, [tag])


    // Load Product Information.
    useEffect(() => {
        fetch(`http://localhost:5000/product/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [id]);



    // Preview Image Before Upload.
    const PreviewImg = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
            const imageData = reader.result.split(",")[1];
            setUpImg(imageData);
        };
        setNewImg(e.target.files[0]);
        toast.success("New Image Selected", {
            position: "top-center",
            autoClose: 1500
        })
    };


    // Add New Staff Information.
    const onSubmit = async (formData) => {
        formData.image = newImg ? newImg : image;
        formData.sku = formData.sku ? formData.sku : sku;
        formData.title = formData.title ? formData.title : title;
        formData.slug = formData.slug ? formData.slug : slug;
        formData.description = formData.description ? formData.description : description;
        formData.parent = formData.parent ? formData.parent : parent;
        formData.children = formData.children ? formData.children : children;
        formData.type = formData.type ? formData.type : type;
        formData.unit = formData.unit ? formData.unit : unit;
        formData.quantity = formData.quantity ? formData.quantity : quantity;
        formData.originalPrice = formData.originalPrice ? formData.originalPrice : originalPrice;
        formData.price = formData.price ? formData.price : price;
        formData.tag = tags;
        formData.flashSale = formData.flashSale ? formData.flashSale : flashSale;

        // console.log(formData);


        Swal.fire({
            title: "Are you sure?",
            text: "You Want to update this Item!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Update it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                if (newImg) {
                    // console.log("new image Found")

                    // Upload Image in ImageBB and Get Image URL.
                    const imageFile = { image: formData.image };
                    const res = await axiosPublic.post(image_hosting_api, imageFile, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });

                    if (res.data.success) {
                        formData.image = res.data.data.image.url;
                        formData.thumb = res.data.data.thumb.url;
                        // console.log(formData);
                        const productRes = await axiosSecure.patch(`/update/product/${id}`, formData);
                        // console.log(productRes.data);
                        if (productRes.data.modifiedCount > 0) {
                            navigate('/products');
                            Swal.fire({
                                title: "Updated!",
                                text: "Your Product has been Updated Successfully.",
                                icon: "success"
                            });
                        }
                    }
                    else {
                        toast.error("Image Server Dose not Response! Please Try Again..", {
                            position: "top-center",
                            autoClose: 3000
                        })
                    }
                }
                else {
                    // console.log("old image Found");
                    // console.log(formData);
                    const productRes = await axiosSecure.patch(`/update/product/${id}`, formData);
                    // console.log(productRes.data);
                    if (productRes.data.modifiedCount > 0) {
                        navigate('/products');
                        Swal.fire({
                            title: "Updated!",
                            text: "Your Product has been Updated Successfully.",
                            icon: "success"
                        });
                    }
                }
            }
        });
    };


    return (
        <section className="max-h-screen min-h-screen overflow-y-auto pt-20 bg-gray-400 dark:bg-base-300">
            <section className="flex justify-center items-center">
                <div className='px-6 mx-auto'>
                    <div className='flex items-center justify-between border-b border-gray-300 dark:border-gray-500'>
                        <h2 className='my-4 font-bold text-lg dark:text-white'>Update Product Information</h2>
                        {infoLoading ?
                            <button disabled onClick={() => window.history.back()} className="font-medium outline-0 px-4 py-2 text-sm rounded-lg border border-gray-200 text-red-500 hover:bg-red-200 hover:border-red-300 hover:text-red-600 transition-colors duration-500">
                                Cancel
                            </button>
                            :
                            <button onClick={() => window.history.back()} className="font-medium outline-0 px-4 py-2 text-sm rounded-lg border border-gray-200 text-red-500 hover:bg-red-200 hover:border-red-300 hover:text-red-600 transition-colors duration-500">
                                Cancel
                            </button>
                        }
                    </div>
                    <div className="w-full overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 mt-5 mb-8">
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
                                                        <p className="text-sm mt-2 dark:text-gray-200">Drag your image here</p>
                                                        <em className="text-xs text-gray-400 dark:text-gray-400">(Only *.jpeg and *.png images will be accepted)</em>
                                                        <input
                                                            {...register("image")}
                                                            onChange={e => PreviewImg(e)}
                                                            className='image-upload-btn hidden'
                                                            type="file"
                                                            id='image-upload-btn'
                                                            accept="image/*"
                                                        />
                                                    </div>
                                                </label>
                                                {upImg ?
                                                    <div className="w-fit h-32 px-3 py-2 border border-gray-200 rounded-md">
                                                        <img className='w-28 h-28' src={`data:image/*;base64,${upImg}`} alt="" id='ProfileImg' />
                                                    </div>
                                                    :
                                                    <div className="w-fit h-32 px-3 py-2 border border-gray-200 rounded-md">
                                                        <img className='w-28 h-28' src={image} alt="" id='ProfileImg' />
                                                    </div>
                                                }
                                            </div>
                                            {errors.image && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.image.message}</p>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                        <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">2. Product SKU</label>
                                        <div className="col-span-8 sm:col-span-4">
                                            <input defaultValue={sku}  {...register("sku")} className="w-full px-3 py-1 text-base font-semibold rounded-md border border-[#151515] dark:border-gray-500 h-12 bg-white dark:bg-gray-900 text-[#151515] dark:text-white outline-0" type="text" placeholder="Product SKU" />
                                            {errors.sku && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.sku.message}</p>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                        <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">3. Product Title/Name</label>
                                        <div className="col-span-8 sm:col-span-4">
                                            <input defaultValue={title} {...register("title")} className="w-full px-3 py-1 text-base font-semibold rounded-md border border-[#151515] dark:border-gray-500 h-12 bg-white dark:bg-gray-900 text-[#151515] dark:text-white outline-0" type="text" placeholder="Product title" />
                                            {errors.title && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.title.message}</p>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                        <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">4. Product Slug</label>
                                        <div className="col-span-8 sm:col-span-4">
                                            <input defaultValue={slug} {...register("slug")} className="w-full px-3 py-1 text-base font-semibold rounded-md border border-[#151515] dark:border-gray-500 h-12 bg-white dark:bg-gray-900 text-[#151515] dark:text-white outline-0" type="text" placeholder="Product slug" />
                                            {errors.slug && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.slug.message}</p>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                        <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">5. Product Description</label>
                                        <div className="col-span-8 sm:col-span-4">
                                            <textarea
                                                defaultValue={description}
                                                {...register("description")}
                                                className="w-full px-3 py-1 text-base font-semibold rounded-md border border-[#151515] dark:border-gray-500 bg-white dark:bg-gray-900 text-[#151515] dark:text-white outline-0"
                                                placeholder="Product details"
                                                cols="30"
                                                rows="5"
                                            >
                                            </textarea>
                                            {errors.description && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.description.message}</p>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                        <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">6. Parent Category</label>
                                        <div className="col-span-8 sm:col-span-4">
                                            <select {...register("parent")} className="w-full px-3 py-1 text-base font-semibold rounded-md border border-[#151515] dark:border-gray-500 h-12 bg-white dark:bg-gray-900 text-[#151515] dark:text-white outline-0">
                                                <option value={parent} hidden>{parent}</option>
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
                                            <select {...register("children")} className="w-full px-3 py-1 text-base font-semibold rounded-md border border-[#151515] dark:border-gray-500 h-12 bg-white dark:bg-gray-900 text-[#151515] dark:text-white outline-0">
                                                <option value={children} hidden>{children}</option>
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
                                            <select {...register("type")} className="w-full px-3 py-1 text-base font-semibold rounded-md border border-[#151515] dark:border-gray-500 h-12 bg-white dark:bg-gray-900 text-[#151515] dark:text-white outline-0">
                                                <option value={type} hidden>{type}</option>
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
                                            <input defaultValue={unit} {...register("unit")} className="w-full px-3 py-1 text-base font-semibold rounded-md border border-[#151515] dark:border-gray-500 h-12 bg-white dark:bg-gray-900 text-[#151515] dark:text-white outline-0" type="text" placeholder="Unit" />
                                            {errors.unit && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.unit.message}</p>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                        <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium">10. Product Quantity</label>
                                        <div className="col-span-8 sm:col-span-4">
                                            <input defaultValue={quantity} {...register("quantity")} className="w-full px-3 py-1 text-base font-semibold rounded-md border border-[#151515] dark:border-gray-500 h-12 bg-white dark:bg-gray-900 text-[#151515] dark:text-white outline-0" type="number" placeholder="Quantity" />
                                            {errors.quantity && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.quantity.message}</p>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                        <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">11. Product Price</label>
                                        <div className="col-span-8 sm:col-span-4">
                                            <input defaultValue={originalPrice} {...register("originalPrice")} className="w-full px-3 py-1 text-base font-semibold rounded-md border border-[#151515] dark:border-gray-500 h-12 bg-white dark:bg-gray-900 text-[#151515] dark:text-white outline-0" type="number" placeholder="Price" />
                                            {errors.originalPrice && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.originalPrice.message}</p>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                        <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">12. Sale Price</label>
                                        <div className="col-span-8 sm:col-span-4">
                                            <input defaultValue={price} {...register("price")} className="w-full px-3 py-1 text-base font-semibold rounded-md border border-[#151515] dark:border-gray-500 h-12 bg-white dark:bg-gray-900 text-[#151515] dark:text-white outline-0" type="number" placeholder="Sale price" />
                                            {errors.price && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.price.message}</p>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                        <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">13. Product Tag</label>
                                        <div className="col-span-8 sm:col-span-4">
                                            <TagsInput
                                                value={tags ? tags : []}
                                                onChange={setTags}
                                                placeholder="Child category  (Write then press enter to add new child category )"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                        <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">14. Flash Sale</label>
                                        <div className="col-span-8 sm:col-span-4">
                                            <div className="flex items-center gap-6">
                                                <div className="flex items-center gap-2">
                                                    <label htmlFor="flashSale">Yes</label>
                                                    <input {...register("flashSale")} type="radio" name="flashSale" id="flashSale" value={true} defaultChecked={flashSale ? true : false} />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <label htmlFor="flashSale">No</label>
                                                    <input {...register("flashSale")} type="radio" name="flashSale" id="flashSale" value={false} defaultChecked={!flashSale ? true : false} />
                                                </div>
                                            </div>
                                            {errors.flashSale && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.flashSale.message}</p>}
                                        </div>
                                    </div>
                                    <div className="my-5 md:my-10 sm:text-right">
                                        {/* {infoLoading ?
                                    <button disabled onClick={() => window.history.back()} className="font-medium outline-0 px-4 py-2 text-sm rounded-lg border border-gray-200 text-red-500 hover:bg-red-200 hover:border-red-300 hover:text-red-600 transition-colors duration-500">
                                        Cancel
                                    </button>
                                    :
                                    <button onClick={() => window.history.back()} className="font-medium outline-0 px-4 py-2 text-sm rounded-lg border border-gray-200 text-red-500 hover:bg-red-200 hover:border-red-300 hover:text-red-600 transition-colors duration-500">
                                        Cancel
                                    </button>
                                } */}
                                        {infoLoading ?
                                            <button disabled className="inline-flex w-full sm:w-fit items-center font-medium outline-0 px-4 sm:py-2 py-3 text-sm rounded-md md:rounded-lg border border-green-500 bg-green-500 text-white hover:bg-green-600 hover:border-green-600 transition-colors duration-500 md:ml-4" type="submit">
                                                <svg stroke="white" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-xxl text-green-500 mr-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline>
                                                </svg>
                                                Update
                                                <svg className="ml-2 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            </button>
                                            :
                                            <button className="w-full sm:w-fit items-center font-medium outline-0 px-4 sm:py-2 py-3 text-sm rounded-md md:rounded-lg border border-green-500 bg-green-500 text-white hover:bg-green-600 hover:border-green-600 transition-colors duration-500 md:ml-4">
                                                {/* <svg stroke="white" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-xxl text-green-500 mr-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline>
                                        </svg> */}
                                                Update
                                            </button>
                                        }
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default UpdateProduct;