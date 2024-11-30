import { useParams } from "react-router-dom";

const SpecificSellerEl = () => {
    const { id } = useParams();
    return(
        <div>
            seller- {id}
        </div>
    );
}

export default SpecificSellerEl;