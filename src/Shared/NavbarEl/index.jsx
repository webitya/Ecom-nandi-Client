import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Dropdown, Menu, Spin } from 'antd';
import { MenuOutlined, CloseOutlined, SearchOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import CustomDrawer from '../DrawerEl';
import './NavbarEl.css';

import { useSelector } from 'react-redux';
import { useRequestApi } from '../../hooks/useRequestApi';

const NavbarEl = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState([])
  const searchDivRef = useRef(null)
  const mobileSearchRef = useRef(null)
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)

  const user = useSelector(state => state.user.value)


  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 150);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  }

  const profileMenu = [
    user.role
      ? { key: 'account', label: <Link to="/account">Account</Link> }
      : { key: 'login', label: <Link to="/login">Login</Link> },
    user.role
      ? { key: 'logout', label: <Link to="/logout">Logout</Link> }
      : null,
  ].filter(Boolean);

  useEffect(() => {
    const getSearchData = async () => {
      setLoader(true)
      try {
        const response = await useRequestApi(`api/product/getSearchProduct?s=${searchQuery}`, 'POST')
        console.log(response);
        setSearchResult(response.products)
      } catch (error) {
        setSearchResult([])
        console.log(error);
      } finally {
        setLoader(false)
      }
    }
    if (searchQuery !== '') {
      getSearchData();
    }
    else {
      setSearchResult([])
    }
  }, [searchQuery])


  const handleClickOutside = (event) => {
    const isClickInsideSearchDiv =
      searchDivRef?.current && searchDivRef.current.contains(event.target);
    const isClickInsideMobileSearchDiv =
      mobileSearchRef?.current && mobileSearchRef.current.contains(event.target);

    if (!isClickInsideSearchDiv && !isClickInsideMobileSearchDiv) {
      console.log("Click outside detected, resetting search.");
      setSearchQuery("");
      setSearchResult([]);
    }
  };


  const handleSearchResultClick = async (id) => {
    setSearchQuery('');
    setSearchResult([]);
    console.log(id);

    // history.push(`/product/${data._id}`);
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigationLinks = [
    { label: 'Shop', href: '/shop' },
    { label: 'Book Pandit', href: '/book-pandit' },
    { label: 'Offers', href: '/offers' },
    { label: <ShoppingCartOutlined className="cart-icon" />, href: 'account/cart' },
  ];

  return (
    <>
      <nav className={`navbar ${isSticky ? 'sticky-navbar' : ''}`} style={{ top: "-3px", userSelect: "none" }}>
        {/* Logo */}
        <div className="navbar-brand">
          <Link to="/">
            <img src="/logo.webp" alt="brand-logo" width="50px" />
          </Link>
        </div>

        <div className="navbar-menu hidden lg:flex items-center">
          <div ref={searchDivRef} className="search-bar big flex items-center relative border border-gray-300 rounded-lg shadow-sm p-2 bg-white">
            <SearchOutlined className="text-gray-500 mr-3 text-lg cursor-pointer" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input w-full border-none focus:outline-none focus:ring-0 text-sm text-gray-700 placeholder-gray-400"
            />
            {searchResult && searchResult.length > 0 &&
              <div className="absolute left-0 top-full max-h-[200px] scrollbar-hide overflow-auto mt-2 w-full bg-white shadow-lg rounded-[20px] border border-gray-200 z-10">
                {
                  searchResult.map((data) => (
                    <div
                      key={data._id}
                      className="hover:bg-gray-100 p-3 cursor-pointer transition-colors duration-200 flex items-center gap-3"
                      onClick={() => navigate(`/productDetails?s=${data._id}`)}
                    >
                      {/* Optional: Add a thumbnail if available */}
                      <img
                        src={data.image || "https://via.placeholder.com/40"}
                        alt={data.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <p className="text-sm text-gray-700 truncate">{data.name}</p>
                    </div>
                  ))
                }
              </div>

            }
            {
              loader && <div className=' absolute top-1 right-3'>
                <Spin size='small' />
              </div>
            }

          </div>


          {navigationLinks.map((link, index) => (
            <Link key={index} to={link.href} className="navlink">
              {link.label}
            </Link>
          ))}

          <div className="profile-dropdown">
            {user.role === 'user' ? (
              <Dropdown
                menu={{ items: profileMenu }}
                trigger={['hover']}
              >
                <Button
                  icon={<UserOutlined />}
                  className="profile-icon"
                  shape="circle"
                  size="large"
                />
              </Dropdown>

            ) : (
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <Button
          className="menu-toggle lg:hidden flex justify-center items-center"
          onClick={toggleDrawer}
          style={{ outline: 'none', border: 'none', marginTop: '-8px' }}
        >
          {isDrawerOpen ? <CloseOutlined /> : <MenuOutlined />}
        </Button>
      </nav>

      {/* Mobile Drawer */}



      <CustomDrawer isDrawerOpen={isDrawerOpen} mobileSearchRef={mobileSearchRef} handleSearchResultClick={handleSearchResultClick} toggleDrawer={toggleDrawer} searchResult={searchResult} searchQuery={searchQuery} handleSearchChange={handleSearchChange} />



    </>
  );
};

export default NavbarEl;
