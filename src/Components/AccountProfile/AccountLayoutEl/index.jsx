import { AccountSidebar } from "../AccountSideBar"


export const AccountLayoutEl = ({ children }) => {
    return (
        <div className=" flex m-auto lg:container md:w-screen md:flex-row flex-col  justify-start ">
            <AccountSidebar />
            {children}
        </div>
    )
}