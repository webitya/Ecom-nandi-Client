import {
  UserOutlined,
  FileSearchOutlined,
  UserAddOutlined,
  ShopOutlined,
  FileTextOutlined,
  AppstoreAddOutlined,
  DashboardOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const OwnerSidebarEl = ({tab, setTab}) => {
  const navigate = useNavigate();

  const menuItems = [
    { key: "dashboard", value: "Dashboard", Icon: DashboardOutlined, path: "" },
    { key: "total-pandits", value: "Total Pandits", Icon: FileSearchOutlined, path: "pandits" },
    { key: "total-sellers", value: "Total Sellers", Icon: UserAddOutlined, path: "sellers" },
    { key: "pending-requests", value: "Pending Requests", Icon: FileTextOutlined, path: "roleChangeRequest" },
    { key: "pandit-booking", value: "Pandit Booking", Icon: AppstoreAddOutlined, path: "panditBooking" },
    { key: "add-products", value: "Add Products", Icon: ShopOutlined, path: "addProduct" },
    { key: "manage-products", value: "Manage Products", Icon: AppstoreAddOutlined, path: "manageProducts" },
    { key: "bussiness-setup", value: "Bussiness Setup", Icon: SettingOutlined, path: "bussinessSetup" }
  ];

  return (
    <div className="flex flex-col flex-1 bg-[#2d2f36] text-white p-4 h-full overflow-scroll">

      <div className="flex flex-col items-center mb-6 relative">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mb-2 shadow-lg">
          <p className="text-white text-xl font-bold">U</p> {/* Admin initial */}
        </div>
        <p className="font-semibold text-xl text-white">Utkarsh Kumar</p>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#2d2f36] via-[#2d2f36] to-transparent p-2 rounded-b-lg">
          <p className="text-xs text-gray-400 text-center">admin@example.com</p>
        </div>
      </div>
      
        <nav className="flex flex-col gap-1.5">
          {menuItems.map((menu) => (
            <div
              key={menu.key}
              className={`flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer ${tab === menu.path
                  ? "bg-gradient-to-r from-white to-[#ffffff56] text-[#2d2f36]"
                  : "hover:bg-[#404349]"
                }`}
              onClick={() => {
                setTab(menu.path);
                navigate(menu.path);
              }}
            >
              <menu.Icon className={tab === menu.key ? "text-blue-500" : ""} />
              <span>{menu.value}</span>
            </div>
          ))}
        </nav>

        {/* Bottom Profile Section with modern feel */}
         <div className="flex items-center gap-2 bg-[#404349] rounded-lg px-4 py-2 mt-[2.65rem]">
          <UserOutlined className="text-white" />
          <div>
            <p className="text-sm text-white font-medium">Admin</p>
            <p className="text-xs text-gray-400">admin@example.com</p>
          </div>
        </div>
    </div>
  );
};

export default OwnerSidebarEl;
