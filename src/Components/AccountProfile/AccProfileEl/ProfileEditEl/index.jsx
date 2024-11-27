
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRequestApi } from "../../../../hooks/useRequestApi";
import { setName } from "../../../../redux/features/userSlice/userSlice";

const ProfileEditEl = ({ setEditable }) => {

    const ProfileState = useSelector(state => state.user.value);

    const dispatch = useDispatch();

    const [inputValue, setInputValue] = useState({
        fname: ProfileState.fname,
        lname: ProfileState.lname
    })

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        setInputValue((prev) => ({ ...prev, [name]: value }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result =
                await useRequestApi('api/user/updateProfile', 'PATCH', { name: inputValue.fname + " " + inputValue.lname });
            dispatch(
                setName({
                    fname: result.user.name.split(" ")[0] || null,
                    lname: result.user.name.split(" ")[1] || null,
                })
            )
            setEditable(false);

        } catch (error) {
            console.log(error);
            setEditable(false);
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
                        value={inputValue.fname}
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
                        value={inputValue.lname}
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
                    {/* <input
                        type="text"
                        name='role'
                        placeholder='Role'
                        value={ProfileState.role}
                        className={`mb-2 px-3 py-1 text-sm w-full sm:w-[65%] rounded-sm outline outline-1
                        outline-[#878787cc] opacity-50`}
                        readOnly
                    /> */}
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
                        className="bg-blue-500 text-white px-3 py-1 rounded-md font-bold"
                    >
                        Save
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