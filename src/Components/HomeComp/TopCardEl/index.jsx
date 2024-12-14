import { Link } from "react-router-dom";
import { Carousel } from "antd";
import * as AntIcons from "@ant-design/icons";
import { useSelector } from 'react-redux';

// const products = [
//   // { title: "Hawan Samagri", href: "", gradient: "from-green-400 to-green-600", icon: <ShoppingCartOutlined /> },
//   // { title: "Flowers", href: "", gradient: "from-blue-400 to-blue-600", icon: <LinuxOutlined /> },
//   // { title: "Clothes", href: "", gradient: "from-purple-400 to-purple-600", icon: <SkinOutlined /> },
//   // { title: "Festival", href: "", gradient: "from-yellow-400 to-yellow-600", icon: <LaptopOutlined /> },
//   // { title: "Sweets", href: "", gradient: "from-pink-400 to-pink-600", icon: <HeartOutlined /> },
//   // { title: "Book", href: "", gradient: "from-teal-400 to-teal-600", icon: <HomeOutlined /> },
//   // { title: "Gifts", href: "", gradient: "from-orange-400 to-orange-600", icon: <TrophyOutlined /> },
// ];

const TopProductCarEl = () => {

  const products = useSelector(state => state.categoriesRedux.value)
  const user = useSelector(state => state.user.value)
  return (
    <div className="bg-white p-2 rounded-md shadow-md">

      {
        !products.length
          ?
          (
            user.role !== 'owner' ?
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-5 text-center text-gray-700 font-sans text-lg">
                <strong>No categories to display.</strong>
                <br />
                <span className="text-sm text-gray-500">Please check back later as categories are added by the admin.</span>
              </div>
              :
              <div className="bg-[#f0f8ff] border-2 border-dashed border-[#1e90ff] rounded-lg p-5 text-center text-[#333] font-sans text-lg">
                <strong>No categories available yet.</strong>
                <br />
                <span className="text-sm text-[#555]">Start by adding your first category to organize your items!</span>
                <br />
                <Link to={'/owner/categorySetup'}>
                  <button className="mt-4 px-4 py-2 bg-[#1e90ff] text-white text-sm font-medium rounded hover:bg-[#1a78d1]">
                    Add Category
                  </button>
                </Link>
              </div>
          )
          :
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
            {products.map((product, index) => {
              const IconComponent = AntIcons[product.icon];
              return (
                <div key={index} className="flex items-center p-1 transition-transform duration-200 ease-in-out">
                  <Link >
                    <div
                      className={`flex flex-col md:flex-row justify-center items-center bg-gradient-to-r ${product.gradient} p-2 rounded-md shadow-sm hover:shadow-md`}
                    >
                      <div className="text-lg md:text-2xl flex items-center text-black">
                        { IconComponent && <IconComponent /> }
                      </div>
                      <span className="text-sm md:text-base font-medium text-black mt-1 md:mt-0 md:ml-2">
                        {product.title}
                      </span>
                    </div>
                  </Link>
                </div>
              );

            })}
          </Carousel>
      }
    </div>
  );
};

export default TopProductCarEl;
