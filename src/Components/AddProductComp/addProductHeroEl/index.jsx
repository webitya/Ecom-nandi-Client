import { useEffect, useRef, useState } from "react";
import ImageUpload from "../uploadImageEl";
import { z } from "zod";
import JoditEditor from 'jodit-react'
const AddProductHero = () => {

    const productSchema = z.object({
        images: z.array(z.string()).min(1, "At least one image is required"),
        name: z.string().min(1,"Name is required"),
        price: z
            .string()
            .regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid number"),
        description: z.string().min(1,"Description is required"),
        discountPrice: z
            .string()
            .regex(/^\d+(\.\d{1,2})?$/, "Discount price must be a valid number"),
        quantity: z
            .string()
            .regex(/^\d+$/, "Quantity must be a valid number")
            .transform(Number),
        category: z.string().min(1,"Category is required"),
        productSku: z.string().min(6,"Product SKU is required"),
        metaTitle: z.string().min(1,"Meta Title is required"),
        metaDescription: z.string().min(1,"Meta Description is required"),
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
            url: 'http://localhost:5000/upload', // Backend image upload URL
            format: 'json', // Response format
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

    const [productData, setProductData] = useState({
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
    });

    const [errors, setErrors] = useState({});
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        const savedData = localStorage.getItem("productData");
        const savedImageData = localStorage.getItem("productImageList");

        if (savedData) setProductData(JSON.parse(savedData));
        if (savedImageData) setFileList(JSON.parse(savedImageData));
    }, []);

    useEffect(() => {
        const urls = fileList.map((file) => file.url || file.preview);
        setProductData((prev) => ({ ...prev, images: urls }));
    }, [fileList]);

    useEffect(() => {
        localStorage.setItem("productData", JSON.stringify(productData));
        localStorage.setItem("productImageList", JSON.stringify(fileList));
    }, [productData, fileList]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleImageUpload = (newFileList) => {
        setFileList(newFileList);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const validatedData = productSchema.parse(productData);
            setErrors({});
            localStorage.removeItem("productData");
            localStorage.removeItem("productImageList");
            console.log("Submitted Data:", validatedData);
        } catch (error) {
            if (error instanceof z.ZodError) {
                setErrors(error.flatten().fieldErrors);
            }
        }
    };

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
                    {[
                        { label: "Name", name: "name", placeholder: "Enter product name", type: "text" },
                        { label: "Price", name: "price", placeholder: "Enter product price", type: "text" },
                        {
                            label: "Discount",
                            name: "discountPrice",
                            placeholder: "Enter discount price",
                            type: "text",
                        },
                        {
                            label: "Quantity",
                            name: "quantity",
                            placeholder: "Enter available quantity",
                            type: "number",
                        },
                    ].map(({ label, name, placeholder, type }, index) => (
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
                            value={productData.description || ""} // Default empty string
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
                            <option value="">Select a category</option>
                            <option value="electronics">Electronics</option>
                            <option value="clothing">Clothing</option>
                            <option value="furniture">Furniture</option>
                            <option value="toys">Toys</option>
                        </select>
                        {errors.category && (
                            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                        )}
                    </div>

                    {/* SKU */}
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

                    {/* Meta Data Section */}
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

                    <div className="flex flex-col md:col-span-2">
                        <label className="text-lg font-medium text-gray-700 mb-2">
                            Meta Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="metaDescription"
                            value={productData.metaDescription}
                            onChange={handleInputChange}
                            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter meta description"
                        />
                        {errors.metaDescription && (
                            <p className="text-red-500 text-sm mt-1">{errors.metaDescription}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-1 md:col-span-2 flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition"
                        >
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductHero;
