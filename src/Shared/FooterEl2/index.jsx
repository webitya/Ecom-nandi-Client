import React from "react";
import { useSelector } from "react-redux";
import { FacebookOutlined, InstagramOutlined, LinkedinOutlined, TwitterOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const FooterEl2 = () => {
  // Access the pages slice from the Redux store
  const pages = useSelector((state) => state.pages.pages || {});

  // Divide pages dynamically into columns with a maximum of 5 elements per column
  const pageEntries = Object.values(pages);
  const columns = [];

  for (let i = 0; i < pageEntries.length; i += 5) {
    columns.push(pageEntries.slice(i, i + 5));
  }

  return (
    <div className="w-full bg-zinc-900 text-white py-8">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="flex flex-col md:flex-row gap-10">
          <div>
            <h3 className="text-lg font-semibold mb-4">Static Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/about-us" className="hover:underline">About Us</Link></li>
              <li><Link to="/contact-us" className="hover:underline">Contact Us</Link></li>
              <li><Link to="/terms-conditions" className="hover:underline">Terms & Conditions</Link></li>
              <li><Link to="/privacy-policies" className="hover:underline">Privacy Policies</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Static Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/create-blog" className="hover:underline">Blogs Manager</Link></li>
              <li><Link to="/blogs" className="hover:underline">Blogs</Link></li>
              <li><Link to="/dynamic-pages" className="hover:underline">Dynamic Pages</Link></li>
            </ul>
          </div>
          {columns.map((column, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">Dynamic Navigation</h3>
              <ul className="space-y-2">
                {column.map((page) => (
                  <li key={page.route}>
                    <Link to={page.route} className="hover:underline">{page.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-0">
          <h3 className="text-lg font-semibold mb-4">Connect with us</h3>
          <div className="flex space-x-4">
            <FacebookOutlined className="text-xl hover:text-gray-400 cursor-pointer" />
            <InstagramOutlined className="text-xl hover:text-gray-400 cursor-pointer" />
            <LinkedinOutlined className="text-xl hover:text-gray-400 cursor-pointer" />
            <TwitterOutlined className="text-xl hover:text-gray-400 cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="mt-8 text-center border-t border-gray-700 pt-4">
        <p>© {new Date().getFullYear()} Urban Company. All Rights Reserved.</p>
      </div>
    </div>
  );
};



