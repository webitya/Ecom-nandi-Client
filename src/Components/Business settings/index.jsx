import CompanyInformation from "./Company_info";
import LogoUpdate from "./Logo_update";
import MtMode from "./Maintanence_mode";
import Onsubmit from "./Onsubmit";
const BusinessSetup = () => {

  return (
    <div className="container bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center flex-col p-4">
      <MtMode />
      <CompanyInformation />
      <LogoUpdate />
   <Onsubmit />
    </div>
  );
};

export default BusinessSetup;
