import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const SidebarEl = ({ name, symbol, id, balance, menuItems,tab, setTab }) => {
    const navigate= useNavigate();
    return (
        <div>

            <div className="flex flex-col w-[250px] bg-[#2d2f36] text-white h-full p-4">
                <div className="flex flex-col items-center mb-6">
                    <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center mb-2">
                        <p className="text-white text-xl font-bold lowercase">{symbol}</p>
                    </div>
                    <p className="font-semibold">{name}</p>
                    <p className="text-gray-400 text-sm">ID: {id}</p>
                    <div className="bg-gray-800 text-gray-200 text-sm px-3 py-1 rounded-full mt-2">
                        Balance: <span className="text-white font-semibold">{balance}</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-2">

                    {menuItems.map((menu) => {
                        return (
                            <div
                                key={menu.key}
                                className={`flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer ${
                                    tab === menu.key
                                        ? "bg-gradient-to-r from-white to-[#ffffff56]  text-[#2d2f36]"
                                        : "hover:bg-[#404349]"
                                    }`}
                                onClick={() => {
                                    setTab(menu.key)
                                    navigate(menu.key);
                                }}
                            >
                                <menu.Icon className={tab === menu.key ? "text-blue-500" : ""}/>
                                <span>{menu.value}</span>
                            </div>
                        );
                    })}
                </nav>

                <div className="mt-auto flex items-center gap-2 bg-[#404349] rounded-lg px-4 py-2">
                    <UserOutlined className="text-white" />
                    <div>
                        <p className="text-sm text-white font-medium">{name}</p>
                        <p className="text-xs text-gray-400">ID: {id}</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default SidebarEl;