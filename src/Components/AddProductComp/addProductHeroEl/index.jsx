import { useEffect, useRef, useState } from "react";
import ImageUpload from "../uploadImageEl";
import { z } from "zod";
import JoditEditor from 'jodit-react';
import { useDispatch, useSelector } from 'react-redux';
import { useRequestApi } from "../../../hooks/useRequestApi";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import toast from "react-hot-toast";
import { resetAddProduct } from "../../../redux/features/AddProductSlice/addProductSlice";
import { useNavigate } from "react-router-dom";

const AddProductHero = () => {

    const productSchema = z.object({
        images: z.array(z.string()).min(1, "At least one image is required"),
        name: z.string().min(1, "Name is required"),
        price: z
            .string()
            .regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid number"),
        description: z.string().min(1, "Description is required"),
        discountPrice: z
            .string()
            .regex(/^\d+(\.\d{1,2})?$/, "Discount price must be a valid number"),
        quantity: z
            .string()
            .regex(/^\d+$/, "Quantity must be a valid number")
            .transform(Number),
        category: z.string().min(1, "Category is required"),
        productSku: z.string().min(6, "Product SKU is required"),
        metaTitle: z.string().min(1, "Meta Title is required"),
        metaDescription: z.string().min(1, "Meta Description is required"),
        taxPercentage: z.string().min(1, "Tax percentage is required"),
        pincode: z.string().regex(/^\d{6}$/, "Pincode must be a 6-digit number"),
        address: z.string().min(1, "Address is required"),
    });

    const config = {
        readonly: false,
        toolbarSticky: true,
        toolbarButtonSize: "middle",
        showCharsCounter: true,
        showWordsCounter: true,
        showXPathInStatusbar: false,
        minHeight: 250,
        buttons: [
            'bold',
            'italic',
            'underline',
            'strikethrough',
            '|',
            'font',
            'fontsize',
            'brush',
            'paragraph',
            '|',
            'image',
            'table',
            'link',
            '|',
            'align',
            'undo',
            'redo',
            '|',
            'hr',
            'eraser',
            'fullsize',
        ],
        uploader: {
            url: 'http://localhost:5000/upload',
            format: 'json',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        },
        events: {
            afterUpload: (response) => {
                console.log('Upload response:', response);
            }
        }
    };

    const addProductsValue = useSelector(state => state.addProduct.value);

    const categories = useSelector(state => state.categoriesRedux.value);

    const dispatch= useDispatch();

    const navigate= useNavigate();

    const initialProductData = () => {
        return addProductsValue || {
            images: [""],
            name: "",
            price: "",
            description: "",
            discountPrice: "",
            quantity: "",
            category: "",
            productSku: "",
            metaTitle: "",
            metaDescription: "",
            taxPercentage: "",
            pincode: "",
            address: "",
        };
    };

    const initialFileList = () => {
        if (addProductsValue?.images?.length > 0 && addProductsValue?.images[0] !== "") {
            return addProductsValue.images.map((url, index) => ({
                uid: index.toString(),
                name: `Image-${index + 1}`,
                status: "done",
                url,
            }));
        }
        return [];
    };

    const [productData, setProductData] = useState(initialProductData());
    const [fileList, setFileList] = useState(initialFileList);
    const [errors, setErrors] = useState({});
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        const urls = fileList.map((file) => file.url || file.preview);
        if (urls.length) {
            setProductData((prev) => ({ ...prev, images: urls }));
        }
    }, [fileList]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleImageUpload = (newFileList) => {
        setFileList(newFileList);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoader(true);
            const validatedData = productSchema.parse(productData);
            setErrors({});
            await useRequestApi("api/product/addproduct", "POST", validatedData);
            toast.success("Product added Successfully");
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || 'Internal server error occured');
            if (error instanceof z.ZodError) {
                setErrors(error.flatten().fieldErrors);
            }
        } finally {
            setProductData({
                images: [""],
                name: "",
                price: "",
                description: "",
                discountPrice: "",
                quantity: "",
                category: "",
                productSku: "",
                metaTitle: "",
                metaDescription: "",
                taxPercentage: "",
                pincode: "",
                address: "",
            });
            localStorage.removeItem("productData");
            localStorage.removeItem("productImageList");
            setFileList([]);
            setLoader(false);
        }
    };

    const handleCancelClick = () => {
        dispatch(resetAddProduct())
        navigate('/owner/manageProducts')
    }

    return (
        <div className="bg-gray-100 flex items-center justify-center">
            <div className="bg-white shadow-md rounded-lg w-full max-w-6xl p-8">
                <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
                    Add New Product
                </h1>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                    {/* Image Upload Section */}
                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                            Product Images <span className="text-red-500">*</span>
                        </label>
                        <ImageUpload
                            onUpload={handleImageUpload}
                            setProductData={setProductData}
                            fileList={fileList}
                            setFileList={setFileList}
                        />
                        {errors.images && (
                            <p className="text-red-500 text-sm mt-1">{errors.images}</p>
                        )}
                    </div>

                    {/* Input Fields */}
                    {[{
                        label: "Name", name: "name", placeholder: "Enter product name", type: "text"
                    }, {
                        label: "Price", name: "price", placeholder: "Enter product price", type: "text"
                    }, {
                        label: "Discount", name: "discountPrice", placeholder: "Enter discount price", type: "text"
                    }, {
                        label: "Quantity", name: "quantity", placeholder: "Enter available quantity", type: "number"
                    }].map(({ label, name, placeholder, type }, index) => (
                        <div className="flex flex-col" key={index}>
                            <label className="text-lg font-medium text-gray-700 mb-2">
                                {label} <span className="text-red-500">*</span>
                            </label>
                            <input
                                type={type}
                                name={name}
                                value={productData[name]}
                                onChange={handleInputChange}
                                className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder={placeholder}
                            />
                            {errors[name] && (
                                <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
                            )}
                        </div>
                    ))}

                    {/* Description */}
                    <div className="flex flex-col md:col-span-2">
                        <label className="text-lg font-medium text-gray-700 mb-2">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <JoditEditor
                            value={productData.description || ""}
                            config={config}
                            tabIndex={1}
                            onBlur={(newContent) =>
                                setProductData((prev) => ({ ...prev, description: newContent }))
                            }
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                        )}
                    </div>

                    {/* Category */}
                    <div className="flex flex-col">
                        <label className="text-lg font-medium text-gray-700 mb-2">
                            Category <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="category"
                            value={productData.category}
                            onChange={handleInputChange}
                            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="" disabled>
                                Select a category
                            </option>
                            {
                                categories.map((category, index) => (
                                    <option key={index} value={category.title}>{category.title}</option>
                                ))
                            }
                        </select>
                        {errors.category && (
                            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                        )}
                    </div>

                    {/* Product SKU */}
                    <div className="flex flex-col">
                        <label className="text-lg font-medium text-gray-700 mb-2">
                            Product SKU <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="productSku"
                            value={productData.productSku}
                            onChange={handleInputChange}
                            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter product SKU"
                        />
                        {errors.productSku && (
                            <p className="text-red-500 text-sm mt-1">{errors.productSku}</p>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label className="text-lg font-medium text-gray-700 mb-2">
                            Tax Percentage <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="taxPercentage"
                            value={productData.taxPercentage}
                            onChange={handleInputChange}
                            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="" disabled>Select tax percentage</option>
                            <option value="0">0%</option>
                            <option value="5">5%</option>
                            <option value="12">12%</option>
                            <option value="18">18%</option>
                            <option value="28">28%</option>
                        </select>
                        {errors.taxPercentage && (
                            <p className="text-red-500 text-sm mt-1">{errors.taxPercentage}</p>
                        )}
                    </div>

                    {/* Pincode */}
                    <div className="flex flex-col">
                        <label className="text-lg font-medium text-gray-700 mb-2">
                            Pincode <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="pincode"
                            value={productData.pincode}
                            onChange={handleInputChange}
                            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter pincode"
                        />
                        {errors.pincode && (
                            <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>
                        )}
                    </div>

                    {/* Address */}
                    <div className="flex flex-col md:col-span-2">
                        <label className="text-lg font-medium text-gray-700 mb-2">
                            Address <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="address"
                            value={productData.address}
                            onChange={handleInputChange}
                            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter address"
                            rows={3}
                        ></textarea>
                        {errors.address && (
                            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                        )}
                    </div>

                    {/* Meta Tag */}
                    <div className="flex flex-col">
                        <label className="text-lg font-medium text-gray-700 mb-2">
                            Meta Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="metaTitle"
                            value={productData.metaTitle}
                            onChange={handleInputChange}
                            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter meta title"
                        />
                        {errors.metaTitle && (
                            <p className="text-red-500 text-sm mt-1">{errors.metaTitle}</p>
                        )}
                    </div>

                    {/* Meta Description */}
                    <div className="flex flex-col">
                        <label className="text-lg font-medium text-gray-700 mb-2">
                            Meta Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="metaDescription"
                            value={productData.metaDescription}
                            onChange={handleInputChange}
                            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter meta description"
                            rows={3}
                        ></textarea>
                        {errors.metaDescription && (
                            <p className="text-red-500 text-sm mt-1">{errors.metaDescription}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-1 md:col-span-2 flex justify-end gap-2">
                        {
                            addProductsValue
                                ?
                                <button
                                    type="button"
                                    className="bg-red-500 w-24 text-white py-2 px-6 rounded-lg shadow-md hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:outline-none"
                                    onClick={handleCancelClick}
                                >
                                    Cancel
                                </button>
                                :
                                null
                        }

                        <button
                            disabled={loader}
                            type="submit"
                            className="bg-blue-500 w-24 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        >
                            {
                                addProductsValue ? 
                                (loader ? <LoadingOutlined /> : 'Update') :
                                (loader ? <LoadingOutlined /> : 'Submit')    
                            }
                            
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductHero;