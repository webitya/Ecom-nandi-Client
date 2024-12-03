
import React, { useState, useEffect } from "react";
import { Upload, Image, Spin } from "antd";
import toast from "react-hot-toast";
import { useUploadCloudinary } from "../../../hooks/useUploadCloudinary";
import { z } from "zod";
import UplaodBtnEl from "../UploadBtnEl";
import StatusAndProfileEl from "../Status&ProfileEl";
import { useRegisterSeller } from "../../../hooks/useRegisterSeller";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  }
  );

const registractionSellerSchema = z.object({
  imageUrl: z.string().min(1, 'Select a shop photo'),
  shop_name: z.string().min(1, 'Shop name is required'),
  shop_address: z.string('Enter vail value').min(1, 'Enter shop address'),
  shop_contact: z.string()
    .min(10, 'Contact should be 10 digits long')
    .max(10, 'Contact should be 10 digits long')
    .regex(/^[1-9]\d*$/, "Enter a valid Contact"),
  pin_code: z.string()
    .min(6, 'Pin Code must be 6 digits long')
    .max(6, 'Pin code must be 6 digits long')
    .regex(/^[1-9]\d*$/, "Enter valid pin code"),
  AadhaarNum: z.string().min(12, "Aadhaar number should be 12 digit long")
    .max(12, "Aadhaar number should be 12 digit long")
    .regex(/^[1-9]\d*$/, "Enter valid Aadhaar Number")
})



const AccRegisterSellerEl = () => {
  const [formdata, setFormdata] = useState({
    imageUrl: "",
    shop_name: "",
    shop_contact: "",
    shop_address: "",
    pin_code: "",
    AadhaarNum: ""
  });

  const [btnLoader, setBtnLoader]= useState(false);
  const [schemaError, setSchemaError] = useState({})
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const beforeUpload = async (file) => {
    if (file.size / 1024 / 1024 > 2) {
      toast.error("Image should be less than 2MB");
      return false;
    }

    const newFileList = [...fileList, { uid: file.uid, name: file.name, status: "uploading", originFileObj: file }];
    setFileList(newFileList);

    try {
      // setUploading(true);
      const secure_url = await useUploadCloudinary(file);
      const updatedFileList = newFileList.map((item) =>
        item.uid === file.uid ? { ...item, status: "done", url: secure_url } : item
      );
      setFileList(updatedFileList);
      setFormdata((prev) => ({ ...prev, imageUrl: secure_url }));
      toast.success("Image uploaded successfully!");
    } catch (error) {
      const updatedFileList = newFileList.map((item) =>
        item.uid === file.uid ? { ...item, status: "error" } : item
      );
      setFileList(updatedFileList);
      toast.error("Failed to upload image");
    }
    return false;
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleRemove = (file) => {
    const updatedFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(updatedFileList);
    setFormdata((prev) => ({ ...prev, imageUrl: "" }));
    toast.success("Image removed successfully!");
  };

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoader(true);
    const result = registractionSellerSchema.safeParse(formdata);
    if (result.success) {
      const serverData = { ...formdata };
      const data = await useRegisterSeller(serverData)
      if (data) {
        toast.success(data)
      }
      setFormdata({
        imageUrl: "",
        shop_name: "",
        shop_contact: "",
        shop_address: "",
        pin_code: "",
        AadhaarNum: ""
      })

    } else {
      const errorMap = result.error.errors.reduce((acc, curr) => {
        acc[curr.path[0]] = curr.message; // Field name and error message
        return acc;
      }, {});
      setSchemaError(errorMap);
    }
    setBtnLoader(false)
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className="sm:text-3xl text-xl font-bold mb-6 text-gray-800">Register as Seller</h2>

        <form className="mt-8 flex flex-col gap-6" onSubmit={handleSubmit}>

          <div className="flex sm:flex-row items-center sm:gap-4 flex-col gap-1 ">
            <span className="font-semibold w-32 hidden sm:block">Shop Image<span className="text-red-600 font-bold">*</span> :</span>
            <Upload
              listType="picture-circle"
              fileList={fileList}
              onPreview={handlePreview}
              beforeUpload={beforeUpload}
              onRemove={handleRemove}
              showUploadList={{ showRemoveIcon: true }}
            >
              {fileList.length >= 1 ? null : <UplaodBtnEl name={'Shop Image'} />}
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
            {schemaError.imageUrl && <p style={{ color: "red" }}>{schemaError.imageUrl}</p>}
          </div>

          <div className="flex sm:flex-row sm:items-center sm:gap-4 flex-col items-start gap-1">
            <span className="font-semibold w-32 block">Shop Name<span className="text-red-600 font-bold">*</span> :</span>
            <input
              type="text"
              name="shop_name"
              value={formdata.shop_name}
              onChange={handleChange}
              className="outline-none border border-gray-300 px-4 py-1 text-sm rounded-md w-full sm:w-fit"
              placeholder="Enter Shop Name"
            />
            {schemaError.shop_name && <p style={{ color: "red" }}>{schemaError.shop_name}</p>}
          </div>

          <div className="flex sm:flex-row sm:items-center sm:gap-4 flex-col items-start gap-1">
            <span className="font-semibold w-32 block">Shop Address<span className="text-red-600 font-bold">*</span> :</span>
            <textarea
              name="shop_address"
              value={formdata.shop_address}
              onChange={handleChange}
              className="outline-none border border-gray-300 px-4 py-1 text-sm rounded-md w-full md:w-[24rem]"
              placeholder="Enter Shop Address"
            ></textarea>
            {schemaError.shop_address && <p style={{ color: "red" }}>{schemaError.shop_address}</p>}
          </div>

          <div className="flex sm:flex-row sm:items-center sm:gap-4 flex-col items-start gap-1">
            <span className="font-semibold w-32 block">Pin code<span className="text-red-600 font-bold">*</span> :</span>
            <input
              type="text"
              name="pin_code"
              value={formdata.pin_code}
              onChange={handleChange}
              className="outline-none border border-gray-300 px-4 py-1 text-sm rounded-md w-full sm:w-fit"
              placeholder="Enter pin code"
            />
            {schemaError.pin_code && <p style={{ color: "red" }}>{schemaError.pin_code}</p>}
          </div>

          <div className="flex sm:flex-row sm:items-center sm:gap-4 flex-col items-start gap-1">
            <span className="font-semibold w-32 block">Aadhaar Number<span className="text-red-600 font-bold">*</span> :</span>
            <input
              type="text"
              name="AadhaarNum"
              value={formdata.AadhaarNum}
              onChange={handleChange}
              className="outline-none border border-gray-300 px-4 py-1 text-sm rounded-md w-full sm:w-fit"
              placeholder="Enter Aadhaar no."
            />
            {schemaError.AadhaarNum && <p style={{ color: "red" }}>{schemaError.AadhaarNum}</p>}
          </div>

          <div className="flex sm:flex-row sm:items-center sm:gap-4 flex-col items-start gap-1">
            <span className="font-semibold w-32 block">Shop Contact<span className="text-red-600 font-bold">*</span> :</span>
            <input
              type="text"
              name="shop_contact"
              value={formdata.shop_contact}
              onChange={handleChange}
              className="outline-none border border-gray-300 px-4 py-1 text-sm rounded-md w-full sm:w-fit"
              placeholder="Enter Contact no."
            />
            {schemaError.shop_contact && <p style={{ color: "red" }}>{schemaError.shop_contact}</p>}
          </div>

          <div className="flex gap-4 sm:justify-start justify-center">
            <button type="button" className="px-4 py-1 rounded-md bg-blue-500">
              Draft
            </button>
            <button type="submit" disabled={btnLoader} className="px-4 py-1 rounded-md bg-green-500">
              {btnLoader ?<Spin size="small"/> : <span>Submit</span> } 
            </button>
          </div>
        </form>
      </div>

      <StatusAndProfileEl />
    </div>
  );
};

export default AccRegisterSellerEl;