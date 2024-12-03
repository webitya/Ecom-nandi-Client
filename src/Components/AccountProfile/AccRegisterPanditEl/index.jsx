import React, { useState } from "react";
import StatusAndProfileEl from "../Status&ProfileEl";
import PanditFormEl from "./PanditFormEl/index.";


const AccRegisterPanditEl = () => {
  // window.scrollTo(0, 0);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const [state, setState] = useState(false)
  return (
    <div className="flex flex-col w-full gap-4">
      <PanditFormEl setState={setState} />
      <StatusAndProfileEl state={state} />
    </div>
  );
};

export default AccRegisterPanditEl;
