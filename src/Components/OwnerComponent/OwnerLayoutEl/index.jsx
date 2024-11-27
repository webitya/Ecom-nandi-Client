import React from "react";
import OwnerSellerChain from "../SellerChain";
import OwnerPanditChain from "../PanditChain";
import OwnerSellerAll from "../OwnerSellerAll";
import OwnerPanditAll from "../OwnerPanditAll";

const SidebarWithContent = ({
  acceptedSellers,
  setAcceptedSellers,
  acceptedPandits,
  setAcceptedPandits,
}) => {
  const [activeComponent, setActiveComponent] = React.useState("Dashboard");

  // Render active component
  const renderContent = () => {
    switch (activeComponent) {
      case "Seller":
        return <OwnerSellerAll data={acceptedSellers} />;
      case "Pandit":
        return <OwnerPanditAll data={acceptedPandits} />;
      case "SellerChain":
        return (
          <OwnerSellerChain
            acceptedSellers={acceptedSellers}
            setAcceptedSellers={setAcceptedSellers}
          />
        );
      case "PanditChain":
        return (
          <OwnerPanditChain 
            acceptedPandits={acceptedPandits}
            setAcceptedPandits={setAcceptedPandits}
          />
        );
      default:
        return <div className="text-xl">Welcome to the Dashboard</div>;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white h-full shadow-md">
        {/* Sidebar Menu */}
        <ul>
          <li onClick={() => setActiveComponent("Seller")}>Seller</li>
          <li onClick={() => setActiveComponent("Pandit")}>Pandit</li>
          <li onClick={() => setActiveComponent("SellerChain")}>
            Seller Chain
          </li>
          <li onClick={() => setActiveComponent("PanditChain")}>
            Pandit Chain
          </li>
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 bg-gray-100">{renderContent()}</div>
    </div>
  );
};

export default SidebarWithContent;
