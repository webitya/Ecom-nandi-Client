import { Link } from "react-router-dom";
import { Carousel } from "antd";
import {
  ShoppingCartOutlined,
  MobileOutlined,
  SkinOutlined,
  LaptopOutlined,
  HeartOutlined,
  HomeOutlined,
  TrophyOutlined,
  LinuxOutlined,
  // SmileOutlined,
  // BookOutlined,
} from "@ant-design/icons";

const products = [
  { title: "Hawan Samagri", href: "", gradient: "from-green-400 to-green-600", icon: <ShoppingCartOutlined /> },
  { title: "Flowers", href: "", gradient: "from-blue-400 to-blue-600", icon: <LinuxOutlined /> },
  { title: "Clothes", href: "", gradient: "from-purple-400 to-purple-600", icon: <SkinOutlined /> },
  { title: "Festival", href: "", gradient: "from-yellow-400 to-yellow-600", icon: <LaptopOutlined /> },
  { title: "Sweets", href: "", gradient: "from-pink-400 to-pink-600", icon: <HeartOutlined /> },
  { title: "Book", href: "", gradient: "from-teal-400 to-teal-600", icon: <HomeOutlined /> },
  { title: "Gifts", href: "", gradient: "from-orange-400 to-orange-600", icon: <TrophyOutlined /> },
  // { title: "Toys", href: "/toys-games-store", gradient: "from-indigo-400 to-indigo-600", icon: <SmileOutlined /> },
  // { title: "Books", href: "/books-store", gradient: "from-gray-400 to-gray-600", icon: <BookOutlined /> },
];

const TopProductCarEl = () => {
  return (
    <div className="bg-white p-2 rounded-md shadow-md">
      <Carousel
        autoplay
        dots={false}
        infinite
        speed={300}
        slidesToShow={5}
        responsive={[
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
            },
          },
        ]}
      >
        {products.map((product, index) => (
          <div key={index} className="flex items-center p-1 transition-transform duration-200 ease-in-out">
            <Link to={product.href}>
              <div
                className={`flex flex-col md:flex-row justify-center items-center bg-gradient-to-r ${product.gradient} p-2 rounded-md shadow-sm hover:shadow-md`}
              >
                <div className="text-lg md:text-2xl flex items-center text-white">{product.icon}</div>
                <span className="text-sm md:text-base font-medium text-white mt-1 md:mt-0 md:ml-2">
                  {product.title}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default TopProductCarEl;
