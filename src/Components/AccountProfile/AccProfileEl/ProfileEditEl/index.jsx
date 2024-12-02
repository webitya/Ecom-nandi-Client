
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRequestApi } from "../../../../hooks/useRequestApi";
import { setName } from "../../../../redux/features/userSlice/userSlice";
import { LoadingOutlined } from "@ant-design/icons";


const ProfileEditEl = ({ setEditable }) => {

    const ProfileState = useSelector(state => state.user.value);

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState({
        firstName: ProfileState.firstName,
        lastName: ProfileState.lastName
    })

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        setInputValue((prev) => ({ ...prev, [name]: value }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result =
                await useRequestApi('api/user/updateProfile', 'PATCH', { name: inputValue.firstName + " " + inputValue.lastName });
            dispatch(
                setName({
                    firstName: result.user.firstName || null,
                    lastName: result.user.firstName || null,
                })
            )
            setEditable(false);

        } catch (error) {
            setEditable(false);
        } finally {
            setLoading(false)
        }

    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mx-auto">
            <h2 className="sm:text-3xl text-xl mb-4 font-bold text-gray-800 justify-self-start">Edit Profile</h2>

            <form className="flex flex-col gap-4 px-4" onSubmit={handleSubmit}>
                <div className="flex gap-4">
                    <label className="font-semibold sm:block mb-1 w-[5.65rem] hidden">First Name:</label>
                    <input
                        type="text"
                        name='fname'
                        placeholder='First Name'
                        value={inputValue.firstName}
                        onChange={handleChange}
                        className={`mb-2 px-3 py-1 text-sm w-full sm:w-[65%] rounded-sm outline outline-1
                        outline-[#878787cc]`}
                        autoFocus
                    />
                </div>

                <div className="flex gap-4">
                    <label className="font-semibold sm:block mb-1 w-[5.65rem] hidden">Last Name:</label>
                    <input
                        type="text"
                        name='lname'
                        placeholder='Last Name'
                        value={inputValue.lastName}
                        onChange={handleChange}
                        className={`mb-2 px-3 py-1 text-sm w-full sm:w-[65%] rounded-sm outline outline-1
                        outline-[#878787cc]`}
                    />
                </div>
                <div className="flex gap-4">
                    <label className="font-semibold sm:block mb-1 w-[5.65rem] hidden">Email:</label>
                    <p
                        className={`mb-2 px-3 py-1 text-sm w-full sm:w-[65%] rounded-sm outline outline-1
                        outline-[#878787cc] opacity-50`}
                    >
                        {ProfileState.email}
                    </p>
                </div>
                <div className="flex gap-4">
                    <label className="font-semibold sm:block mb-1 w-[5.65rem] hidden">Role:</label>
                    <p
                        className={`mb-2 px-3 py-1 text-sm w-full sm:w-[65%] rounded-sm outline outline-1
                        outline-[#878787cc] opacity-50`}
                    >
                        {ProfileState.role}
                    </p>
                </div>

                <div className="flex gap-6">
                    <button
                        type="submit"
                        className={` bg-blue-500 text-white px-3 py-1 rounded-md font-bold w-[60px]`}
                        disabled={loading}
                    >
                        {loading ? <LoadingOutlined /> : 'Save'}
                    </button>
                    <button
                        type="button"
                        className="text-red-400"
                        onClick={() => setEditable(false)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileEditEl;