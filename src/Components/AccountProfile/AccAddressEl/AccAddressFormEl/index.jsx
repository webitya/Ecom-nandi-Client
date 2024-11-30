import { Button } from "antd";


export const AccAddressFormEl = ({ formState, handleSaveAddress, schemaErrors, setFormState, loading, handleCancel }) => {

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    };


    return (
        <>
            <div className="mt-6">
                <h3 className="text-xl font-semibold">{formState._id ? 'Edit Address' : 'Add New Address'}</h3>
                <form className="flex flex-col gap-2 mt-4" onSubmit={handleSaveAddress}>
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formState.fullName}
                        onChange={handleFormChange}
                        className="mb-2 px-3 py-1 text-sm rounded-sm focus:outline outline-1 outline-blue-500"
                    />
                    {schemaErrors.fullName && <p className="text-red-500">{schemaErrors.fullName}</p>}
                    <input
                        type="text"
                        name="contactNo"
                        placeholder="Contact Number"
                        value={formState.contactNo}
                        onChange={handleFormChange}
                        className="mb-2 px-3 py-1 text-sm rounded-sm focus:outline outline-1 outline-blue-500"
                    />
                    {schemaErrors.contactNo && <p className="text-red-500">{schemaErrors.contactNo}</p>}
                    <input
                        type="text"
                        name="address"
                        placeholder="Street Address"
                        value={formState.address}
                        onChange={handleFormChange}
                        className="mb-2 px-3 py-1 text-sm rounded-sm focus:outline outline-1 outline-blue-500"
                    />
                    {schemaErrors.address && <p className="text-red-500">{schemaErrors.address}</p>}
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formState.city}
                        onChange={handleFormChange}
                        className="mb-2 px-3 py-1 text-sm rounded-sm focus:outline outline-1 outline-blue-500"
                    />
                    {schemaErrors.city && <p className="text-red-500">{schemaErrors.city}</p>}
                    <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formState.state}
                        onChange={handleFormChange}
                        className="mb-2 px-3 py-1 text-sm rounded-sm focus:outline outline-1 outline-blue-500"
                    />
                    {schemaErrors.state && <p className="text-red-500">{schemaErrors.state}</p>}
                    <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={formState.country}
                        onChange={handleFormChange}
                        className="mb-2 px-3 py-1 text-sm rounded-sm focus:outline outline-1 outline-blue-500"
                    />
                    {schemaErrors.country && <p className="text-red-500">{schemaErrors.country}</p>}
                    <input
                        type="text"
                        name="zipCode"
                        placeholder="Zip Code"
                        value={formState.zipCode}
                        onChange={handleFormChange}
                        className="mb-2 px-3 py-1 text-sm rounded-sm focus:outline outline-1 outline-blue-500"
                    />
                    {schemaErrors.zipCode && <p className="text-red-500">{schemaErrors.zipCode}</p>}

                    <div className="flex justify-between mt-4  gap-5">
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                        >
                            Save Address
                        </Button>
                        <Button onClick={handleCancel} className=" text-red-500" type="link" >
                            Cancel
                        </Button>

                    </div>
                </form>
            </div>
        </>
    )
}