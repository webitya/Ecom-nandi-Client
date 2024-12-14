import { useEffect, useState } from "react";
import { ToolOutlined } from "@ant-design/icons";
import * as AntIcons from "@ant-design/icons";
import { useRequestApi } from '../../../hooks/useRequestApi';
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../../redux/features/CategorySlice/categorySlice";

const CategorySetupEl = () => {

    const dispatch= useDispatch()
    const categories= useSelector((state) => state.categoriesRedux.value)

    const [loader, setLoader] = useState(false);
    const [deleteLoader, setDeleteLoader] = useState({})

    const [categoryData, setCategoryData] = useState({
        title: "",
        gradient: "",
        icon: ""
    })

    const fetchCategory = async () => {
        try {
            const response = await useRequestApi('api/owner/getCategories');
            
            if (response.category.length || categories.length) {
                dispatch(setCategory(response.category));
            }

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message)
        }
    }


    const handleDeleteCategory = async (name) => {
        try {
            setDeleteLoader((prev) => ({ ...prev, [name]: true }));

            const response = await useRequestApi(`api/owner/deleteCategory?name=${name}`, 'DELETE')

            toast.success(response.message)

            fetchCategory();
        } catch (error) {
            console.log(error)

            toast.error(error?.response?.data?.message || "Some server error occured!")
        } finally {
            setDeleteLoader((prev) => ({ ...prev, [name]: false }));
        }
    }

    const handleAddCategory = async (e) => {
        setLoader(true)

        e.preventDefault();
        try {
            const response = await useRequestApi('api/owner/postCategory', 'POST', categoryData)
            toast.success(response.message);
            fetchCategory();

        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || "Some server error occured!")

        } finally {
            setLoader(false)
            setCategoryData({
                title: "",
                gradient: "",
                icon: ""
            })
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoryData((prev) => ({ ...prev, [name]: value }));
    }

    return (
        <div className="h-fit bg-gradient-to-br from-gray-100 to-gray-200 p-6 flex items-start justify-center">
            <div className="w-full container flex gap-12">
                {/* Left Section (Added Categories) */}
                <div className="w-1/3 bg-white shadow-lg rounded-xl p-6 h-[545px] overflow-y-auto">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                        Added Categories
                    </h2>

                    {
                        !categories.length
                            ?
                            <div className="flex justify-center">
                                <strong className="text-yellow-500">No categories available yet.</strong>
                            </div>
                            :
                            <ul className="space-y-4">
                                {categories.map((category, index) => {
                                    const IconComponent = AntIcons[category.icon];
                                    return (
                                        <li
                                            key={index}
                                            className={`p-4 border border-gray-300 rounded-md bg-gradient-to-r ${category.gradient}`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="text-lg">
                                                        {/* Render the icon dynamically */}
                                                        {IconComponent && <IconComponent />}
                                                    </div>
                                                    <h3 className="font-semibold text-black tracking-wide">{category.title}</h3>
                                                </div>
                                                <button
                                                    onClick={() => handleDeleteCategory(category.title)}
                                                    className="p-1 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 focus:outline-none"
                                                    title="Delete Category"
                                                >
                                                    {deleteLoader[category.title] ? <AntIcons.LoadingOutlined /> : <AntIcons.DeleteOutlined />}
                                                </button>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                    }
                </div>

                {/* Right Section (Form) */}
                <div className="w-2/3 bg-white shadow-lg rounded-xl p-8">
                    {/* Header */}
                    <div className="flex items-center gap-2 text-3xl py-4 px-6 bg-green-500 text-white rounded-t-xl shadow-md">
                        <ToolOutlined className="text-white" />
                        <h2 className="font-bold">Category Setup</h2>
                    </div>

                    {/* Form Container */}
                    <div className="mt-6">
                        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                            Add Category Form
                        </h2>
                        <form onSubmit={handleAddCategory} className="space-y-5">
                            {/* Title */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Category Title"
                                    value={categoryData.title}
                                    onChange={handleChange}
                                    className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="gradient" className="block text-sm font-medium text-gray-700">
                                    Gradient
                                </label>
                                <input
                                    type="text"
                                    id="gradient"
                                    name="gradient"
                                    placeholder="from-green-400 to-green-600"
                                    value={categoryData.gradient}
                                    onChange={handleChange}
                                    className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                />
                            </div>

                            {/* Icon */}
                            <div>
                                <label htmlFor="icon" className="block text-sm font-medium text-gray-700">
                                    Icon
                                </label>
                                <select
                                    id="icon"
                                    name="icon"
                                    value={categoryData.icon}
                                    onChange={handleChange}
                                    className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                >
                                    <option value="" disabled>Select Icon</option>
                                    <option value="ShoppingCartOutlined">ShoppingCartOutlined</option>
                                    <option value="AppstoreAddOutlined">AppstoreAddOutlined</option>
                                    <option value="DollarOutlined">DollarOutlined</option>
                                    <option value="ShoppingOutlined">ShoppingOutlined</option>
                                    <option value="TagOutlined">TagOutlined</option>
                                    <option value="CreditCardOutlined">CreditCardOutlined</option>
                                    <option value="GiftOutlined">GiftOutlined</option>
                                    <option value="HomeOutlined">HomeOutlined</option>
                                    <option value="ContainerOutlined">ContainerOutlined</option>
                                    <option value="EnvironmentOutlined">EnvironmentOutlined</option>
                                    <option value="SkinOutlined">SkinOutlined</option>
                                    <option value="HeartOutlined">HeartOutlined</option>
                                </select>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full py-3 bg-green-500 text-white text-sm font-medium rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                            >
                                {
                                    loader ? <AntIcons.LoadingOutlined className="text-xl" /> : <span> Submit </span>
                                }
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategorySetupEl;