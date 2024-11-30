import { useParams } from "react-router-dom";

const SpecificPanditEl = () => {
    const { id }= useParams();
    return(
        <div>
            pandit with id -{id}
        </div>
    );
}

export default SpecificPanditEl;