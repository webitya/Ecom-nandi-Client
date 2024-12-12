import { LoadingOutlined, ToolOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { useRequestApi } from "../../../hooks/useRequestApi";
import toast from "react-hot-toast";
import { Modal } from "antd";

const BannerSetupEl = () => {

    const fileInputRef = useRef(null);

    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const [loader, setLoader] = useState(false);
    const [deleteLoader, setDeleteLoader]= useState({});
    const [previewUrl, setPreviewUrl] = useState("")

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [images, setImages] = useState([]);

    const showModal = (url) => {
        setIsModalOpen(true);
        setPreviewUrl(url)
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file)); // Create a preview URL for the image
        }
    };

    const handleBrowseClick = () => {
        fileInputRef.current.click(); // Trigger file input click
    };

    const handleSave = async () => {
        try {
            setLoader(true)
            if (selectedFile) {
                const formData = new FormData();

                formData.append("banner", selectedFile)

                await useRequestApi('api/owner/postBanner', 'POST', formData);

                toast.success("banner sucessfully uploaded")

                getBannerImages()
            } else {
                toast.error("No file selected!");
            }
        } catch (error) {

            console.log(error);
            toast.error(error?.response?.data?.message || "Some server error occured!")
        } finally {
            setLoader(false)
            handleReset()
        }

    };

    const handleReset = () => {
        setSelectedFile(null);
        setImagePreview(null);
        fileInputRef.current.value = ""; // Reset the input field
    };

    const handleDelete = async (id) => {
        try {
            setDeleteLoader((prev) => ({ ...prev, [id]: true }))
            const response = await useRequestApi(`api/owner/deleteBanner?id=${id}`, 'DELETE')
            toast.success(response?.message || "sucesss!")
            const newImages = images.filter((image) => image._id !== id)
            setImages(newImages);
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Some server error occured!")
        } finally {
            setDeleteLoader((prev) => ({ ...prev, [id]: false }))
        }
    }

    const getBannerImages = async () => {
        try {
            const response = await useRequestApi('api/owner/getBanner')
            setImages(response.banner)
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || "Some server error occured!")
        }
    }

    useEffect(() => {
        getBannerImages()
    }, [])

    console.log(images);

    return (
        <div className="p-4 bg-[#f2f2f2]">

            <div className="flex gap-2 text-3xl px-3 py-3 bg-white mb-2 rounded-md">
                <ToolOutlined />
                <h2 className=" font-bold">Banner Setup</h2>
            </div>

            <div className="h-[80%] py-4 flex flex-col items-center justify-center bg-white rounded-md mb-2">
                <h3 className="text-2xl font-semibold">Banner form</h3>

                {/* Drag and Drop Area */}
                <div className="flex flex-col items-center w-full max-w-md p-4 border border-dashed border-blue-500 rounded-lg">
                    {imagePreview ? (
                        <>
                            {
                                loader ?
                                    <div
                                        className="flex items-center justify-center w-full h-32 text-blue-500 text-center cursor-pointer"
                                        onClick={handleBrowseClick}
                                    >
                                        <LoadingOutlined className="text-5xl" />
                                    </div> :
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-32 object-cover rounded"
                                        onClick={handleBrowseClick}
                                    />
                            }
                        </>
                    ) : (
                        <div
                            className="flex items-center justify-center w-full h-32 text-blue-500 text-center cursor-pointer"
                            onClick={handleBrowseClick}
                        >
                            Drag and drop file or{" "}
                            <span className="text-blue-600 underline ml-1">Browse file</span>
                        </div>
                    )}
                    <input
                        type="file"
                        ref={fileInputRef}
                        hidden
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                </div>

                {/* Save and Reset Buttons */}
                <div className="mt-4 flex gap-4">
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600"
                    >
                        Save
                    </button>
                    <button
                        onClick={handleReset}
                        className="px-4 py-2 bg-gray-300 text-gray-800 font-medium rounded hover:bg-gray-400"
                    >
                        Reset
                    </button>
                </div>

                {/* Information Section */}
                <div className="mt-4 w-full max-w-md text-gray-700">
                    <p>
                        <strong>Banner Image Ratio 3:2</strong>
                    </p>
                    <p className="text-xs mt-2">
                        Image is used to create a carousel, so please upload an image of the
                        above ratio.
                    </p>
                </div>
            </div>

            <div className="w-full min-h-[20%] bg-white rounded-md p-4">


                {
                    !images.length
                        ?
                        <div className="flex justify-center text-xl font-semibold">
                            Banner Section is empty
                        </div>
                        :
                        <>
                            <h4 className="text-xl font-semibold mb-3">Uploaded Banner</h4>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {images.map((image) => (
                                    <div
                                        key={image._id}
                                        className="flex flex-col items-center p-4 border border-gray-300 rounded-md"
                                    >
                                        <img
                                            src={image.bannerUrl}
                                            alt={`Image ${image._id}`}
                                            className="w-full h-32 object-contain mb-4 rounded-md"
                                        />
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => showModal(image.bannerUrl)}
                                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                            >
                                                Preview
                                            </button>
                                            <button
                                                onClick={() => handleDelete(image._id)}
                                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                            >
                                                {
                                                    deleteLoader[image._id]
                                                        ?
                                                        <LoadingOutlined />
                                                        :
                                                        <span>Delete</span>
                                                }
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                }
            </div>

            <Modal
                open={isModalOpen}
                title="Preview"
                onCancel={handleCancel}
                footer={[]}
            >
                <img
                    src={previewUrl}
                    alt='Banner Image'
                />
            </Modal>

        </div>
    );
};

export default BannerSetupEl;
