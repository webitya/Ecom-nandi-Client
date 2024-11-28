import { AccountSidebar } from "../AccountSideBar"


export const AccountLayoutEl = ({ children }) => {
    return (
        <div className=" flex m-auto container sm:flex-row flex-col  justify-start ">
            <AccountSidebar />
            {children}
        </div>
    )
}