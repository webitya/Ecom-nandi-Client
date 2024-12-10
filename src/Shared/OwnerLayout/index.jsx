import { useLocation } from "react-router-dom";
import OwnerNavEl from "../OwnerShared/OwnerNavEl";
import OwnerSidebarEl from "../OwnerShared/OwnerSidebarEl";
import { useState } from "react";

const OwnerLayoutEl = ({children}) => {

    const location= useLocation();
    const locationPath= location.pathname.split("/")[2] || ''
    const [tab, setTab] = useState(locationPath);

    return (
        <>
        <OwnerNavEl setTab={setTab}/>
        <div className="flex">
            <OwnerSidebarEl tab={tab} setTab={setTab}/>
            {children}
        </div>
        </>
    );
}

export default OwnerLayoutEl;