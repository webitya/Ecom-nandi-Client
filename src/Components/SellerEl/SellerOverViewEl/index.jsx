import { DollarOutlined, FileAddOutlined, MoneyCollectFilled, ShopFilled, ShopOutlined, ShoppingCartOutlined, ShoppingFilled, SolutionOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";

const SellerOvEl = () => {
    const stats = [
        {
            title: "Sold Amount",
            value: '$4200.30',
            icon: <DollarOutlined />,
            gradient: "from-green-500 to-green-300",
            bgColor: "bg-green-50",
            path:"panditRequest",
            isCursorOn: false
        },
        {
            title: "Total Number of Products",
            value: 1200,
            icon: <ShoppingCartOutlined />,
            gradient: "from-blue-500 to-blue-300",
            bgColor: "bg-blue-50",
            path: "",
            isCursorOn: true
        },
        {
            title: "Number of Products Sold",
            value: 300,
            icon: <ShoppingFilled/>,
            gradient: "from-purple-500 to-purple-300",
            bgColor: "bg-purple-50",
            path: "pandits",
            isCursorOn: true
        }
    ];

    return (
        <div className="flex-1 bg-white p-6 h-[87.5vh] flex justify-center">
            <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-[#2d2f36]">Overview</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <div

                        className={`p-6 shadow-md rounded-lg flex items-center transition-transform transform hover:scale-105 hover:shadow-lg ${stat.bgColor} ${stat.isCursorOn && 'cursor-pointer'}`}
                    >
                        <div
                            className={`text-4xl p-4 rounded-full bg-gradient-to-r ${stat.gradient} text-white`}
                        >
                            {stat.icon}
                        </div>
                        <div className="ml-4">
                            <p className="text-sm text-gray-600">{stat.title}</p>
                            <p className="text-2xl font-bold">{stat.value}</p>

                        </div>
                    </div>
                ))}
            </div>
            </div>
        </div>
    );
}

export default SellerOvEl;