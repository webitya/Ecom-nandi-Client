import OwnerNavEl from "../OwnerShared/OwnerNavEl";
import OwnerSidebarEl from "../OwnerShared/OwnerSidebarEl";

const OwnerLayoutEl = ({children}) => {


    return (
        <>
        <OwnerNavEl/>
        <div className="flex">
            <OwnerSidebarEl />
            {children}
        </div>
        </>
    );
}

export default OwnerLayoutEl;