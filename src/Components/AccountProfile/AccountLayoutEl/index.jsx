import { AccountSidebar } from "../AccountSideBar"


export const AccountLayoutEl = ({ children }) => {
    return (
        <div className=" flex m-auto container justify-start ">
            <AccountSidebar />
            {children}
        </div>
    )
}