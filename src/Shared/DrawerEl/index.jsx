import { useRef, useState } from 'react';
import { Drawer, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import "./DrawerEl.css";
import useSelection from 'antd/es/table/hooks/useSelection';
import { useSelector } from 'react-redux';

const CustomDrawer = ({ toggleDrawer, isDrawerOpen, handleSearchResultClick, handleSearchChange, searchQuery, searchResult, mobileSearchRef }) => {

  const user = useSelector((state) => state.user.value)

  const navigationLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'Book Pandit', href: '/book-pandit' },
    { label: 'Offers', href: '/offers' },
    { label: 'Cart', href: 'account/cart' },
    ...(user?.role
      ? [
        { label: 'Account', href: '/account' },
        { label: 'Logout', href: '/logout' },
      ]
      : [
        { label: 'Login', href: '/login' }
      ]
    )

  ];


  return (
    <Drawer
      className="cd-custom-drawer  "
      placement="left"
      onClose={toggleDrawer}
      open={isDrawerOpen}
      width={280}
      closeIcon={<span className="cd-close-icon">&times;</span>}
      aria-label="Navigation Drawer"
    >
      <div className="cd-drawer-content">
        <div ref={mobileSearchRef} className="cd-search-container small relative ">
          <SearchOutlined className="cd-search-icon " />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="cd-search-input"
            aria-label="Search products"
          />

          {searchResult && searchResult.length > 0 && (
            <div className="absolute left-0 top-full mt-2 w-full bg-white shadow-lg rounded-lg border border-gray-200 z-10">
              {searchResult.map((data) => (
                <div
                  key={data._id}
                  className="hover:bg-gray-100 p-2 cursor-pointer transition-colors z-50 duration-200"
                  onClick={() => handleSearchResultClick(data._id)}
                >
                  <p className="text-sm text-gray-700 truncate">{data.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <ul className="cd-drawer-menu">
          {navigationLinks.map((item) => (
            <li key={item.label} className="cd-menu-item">
              <Link to={item.href} onClick={toggleDrawer} className="cd-menu-link">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Drawer>
  );
};

export default CustomDrawer;
