import React, { useState } from "react";
import StatusAndProfileEl from "../Status&ProfileEl";
import PanditFormEl from "./PanditFormEl/index.";


const AccRegisterPanditEl = () => {

  const [state, setState] = useState(false)
  return (
    <div className="flex flex-col w-full gap-4">
      <PanditFormEl setState={setState} />
      <StatusAndProfileEl state={state} />
    </div>
  );
};

export default AccRegisterPanditEl;
