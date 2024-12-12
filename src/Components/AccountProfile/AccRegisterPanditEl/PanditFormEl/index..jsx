import React, { useState } from "react";
import toast from "react-hot-toast";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space, Upload, Image } from "antd";
import { z } from "zod";
import UplaodBtnEl from "../../UploadBtnEl";
import { useRequestApi } from "../../../../hooks/useRequestApi";


const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    }
    );

const registractionPanditSchema = z.object({
    file: z
        .any()
        .refine(
            (file) => file instanceof File || file !== null,
            "Profile image is required"
        )
        .refine(
            (file) => (file instanceof File ? file.size <= 2 * 1024 * 1024 : true),
            "Profile image must be less than 2MB"
        ),
    expertise: z.enum(['Marriage', 'Puja in Temples', 'Puja in Domestics']),
    experience: z.string().min(1, 'Experience is required').regex(/^[1-9]\d*$/, "Enter a valid value"),
    contact: z.string()
        .min(10, 'Contact must be at least 10 digits long')
        .max(10, 'Contact must be at least 10 digits long')
        .regex(/^[1-9]\d*$/, "Enter a valid Contact"),
    age: z.string().min(2, 'Age must be in double digits').regex(/^[1-9]\d*$/, "Enter a valid age"),
    aadharNo: z.string().min(12, 'Aadhar number must be at least 12 digits long')
});




const PanditFormEl = ({ setState }) => {

    const [formdata, setFormdata] = useState({
        file: null,
        expertise: "Marriage",
        experience: "",
        contact: "",
        age: "",
        aadharNo: "",
    });

    const [schemaError, setSchemaError] = useState({});
    const [fileList, setFileList] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [loader, setloader] = useState(false)

    const beforeUpload = (file) => {
        if (file.size / 1024 / 1024 > 2) {
            toast.error("Image should be less than 2MB");
            return false;
        }

        setFormdata((prev) => ({ ...prev, file }));
        const newFileList = [
            ...fileList,
            { uid: file.uid, name: file.name, status: "done", originFileObj: file },
        ];
        setFileList(newFileList);
        return false;
    };


    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            console.log(file.originFileObj);

            file.preview = await getBase64(file.originFileObj);
        }
        console.log(file.preview)
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleRemove = (file) => {
        const updatedFileList = fileList.filter((item) => item.uid !== file.uid);
        setFileList(updatedFileList);
        setFormdata((prev) => ({ ...prev, imageUrl: "" }));
        toast.success("Image removed successfully!");
    };

    const handleMenuClick = (e) => {
        const { key } = e;
        const [{ label }] = items.filter((value) => value.key === key);
        setFormdata((prev) => ({ ...prev, expertise: label }));
    };

    const items = [
        { label: "Marriage", key: "1", icon: <UserOutlined /> },
        { label: "Puja in Temples", key: "2", icon: <UserOutlined /> },
        { label: "Puja in Domestics", key: "3", icon: <UserOutlined /> },
    ];

    const menuProps = { items, onClick: handleMenuClick };

    const handleChange = (e) => {
        setSchemaError({})
        const { name, value } = e.currentTarget;
        setFormdata((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setloader(true);
        const result = registractionPanditSchema.safeParse(formdata);

        if (result.success) {
            setSchemaError({});
            const formData = new FormData();
            formData.append("file", formdata.file);
            formData.append("expertise", formdata.expertise);
            formData.append("experience", formdata.experience);
            formData.append("contact", formdata.contact);
            formData.append("age", formdata.age);
            formData.append("aadharNo", formdata.aadharNo);
            console.log(formData);
            try {
                const response = await useRequestApi('api/role/requestPandit', 'POST', formData)
                console.log(response);
                setFormdata({
                    file: null,
                    expertise: "Marriage",
                    experience: "",
                    contact: "",
                    age: "",
                    aadharNo: '',
                })
                setFileList([])
                setState((prev) => !prev)
            } catch (error) {
                console.error("Error submitting form:", error);
                toast.error(error?.response?.data?.message || "Something went wrong");
            }
        } else {
            const errorMap = result.error.errors.reduce((acc, curr) => {
                acc[curr.path[0]] = curr.message;
                return acc;
            }, {});
            setSchemaError(errorMap);
        }
        setloader(false)
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="sm:text-3xl text-xl font-bold mb-6 text-gray-800">Register as Pandit</h2>

            <form className="mt-8 flex flex-col gap-6" onSubmit={handleSubmit}>

                <div className="flex sm:flex-row items-center sm:gap-4 flex-col gap-1 ">
                    <span className="font-semibold w-32 hidden sm:block">Profile Image<span className="text-red-600 font-bold">*</span> :</span>
                    <Upload
                        listType="picture-circle"
                        fileList={fileList}
                        onPreview={handlePreview}
                        beforeUpload={beforeUpload}
                        onRemove={handleRemove}
                        showUploadList={{ showRemoveIcon: true }}
                    >
                        {fileList.length >= 1 ? null : <UplaodBtnEl name={'Profile'} />}
                    </Upload>

                    {previewImage && (
                        <Image
                            wrapperStyle={{ display: "none" }}
                            preview={{
                                visible: previewOpen,
                                onVisibleChange: (visible) => setPreviewOpen(visible),
                                afterOpenChange: (visible) => !visible && setPreviewImage(""),
                            }}
                            src={previewImage}
                        />
                    )}

                    {schemaError.file && <p style={{ color: "red" }}>{schemaError.file}</p>}
                </div>

                <div className="flex sm:flex-row sm:items-center sm:gap-4 flex-col items-start gap-1">
                    <span className="font-semibold w-28 block">Expertise<span className="text-red-600 font-bold">*</span> :</span>
                    <Dropdown menu={menuProps}>
                        <Button className="w-full sm:w-fit">
                            <Space>
                                {formdata.expertise}
                                <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                    {schemaError.expertise && <p style={{ color: "red" }}>{schemaError.expertise}</p>}
                </div>

                <div className="flex sm:flex-row sm:items-center sm:gap-4 flex-col items-start gap-1">
                    <span className="font-semibold w-28 block">Age<span className="text-red-600 font-bold">*</span> :</span>
                    <input
                        type="text"
                        name="age"
                        value={formdata.age}
                        onChange={handleChange}
                        className="outline-none border border-gray-300 px-4 py-1 text-sm rounded-md w-full sm:w-fit"
                        placeholder="Enter your Age"
                    />
                    {schemaError.age && <p style={{ color: "red" }}>{schemaError.age}</p>}
                </div>

                <div className="flex sm:flex-row sm:items-center sm:gap-4 flex-col items-start gap-1 ">
                    <span className="font-semibold w-28 block">Experience<span className="text-red-600 font-bold">*</span> :</span>
                    <input
                        type="text"
                        name="experience"
                        value={formdata.experience}
                        onChange={handleChange}
                        className="outline-none border border-gray-300 px-4 py-1 text-sm rounded-md w-full sm:w-fit"
                        placeholder="e.g 5 years of experience"
                    />
                    {schemaError.experience && <p style={{ color: "red" }}>{schemaError.experience}</p>}
                </div>

                <div className="flex sm:flex-row sm:items-center sm:gap-4 flex-col items-start gap-1 ">
                    <span className="font-semibold w-28 block">Contact<span className="text-red-600 font-bold">*</span> :</span>
                    <input
                        type="text"
                        name="contact"
                        value={formdata.contact}
                        onChange={handleChange}
                        className="outline-none border border-gray-300 px-4 py-1 text-sm rounded-md w-full sm:w-fit"
                        placeholder="Enter your Contact no."
                    />
                    {schemaError.contact && <p style={{ color: "red" }}>{schemaError.contact}</p>}
                </div>
                <div className="flex sm:flex-row sm:items-center sm:gap-4 flex-col items-start gap-1 ">
                    <span className="font-semibold w-28 block">Aadhar Number<span className="text-red-600 font-bold">*</span> :</span>
                    <input
                        type="text"
                        name="aadharNo"
                        value={formdata.aadharNo}
                        onChange={handleChange}
                        className="outline-none border border-gray-300 px-4 py-1 text-sm rounded-md w-full sm:w-fit"
                        placeholder="Enter your Contact no."
                    />
                    {schemaError.aadharNo && <p style={{ color: "red" }}>{schemaError.aadharNo}</p>}
                </div>

                <div className="flex gap-4 justify-center sm:justify-start">
                    <button type="button" className="px-4 py-1 rounded-md bg-blue-500">
                        Draft
                    </button>
                    <Button
                        onClick={handleSubmit}
                        loading={loader}
                        className=" bg-green-500 hover:bg-green-400 "
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default PanditFormEl;
