import React, { useState, useEffect } from "react";
import { FilterOutlined, DownOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Checkbox, Spin, message, Input } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import "./ShopPageLayout.css";
import { useRequestApi } from "../../../hooks/useRequestApi";
import ProductCardEl from "../../../Shared/ProductCardEl";
import { useSelector } from "react-redux";

const ShopPageLayoutEl = () => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortOption, setSortOption] = useState("relevance");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // const categories = [
  //   { id: 1, name: "Hawan Samagiri" },
  //   { id: 2, name: "Flowers" },
  //   { id: 3, name: "Fruits" },
  //   { id: 4, name: "Gifts" },
  // ];
  const categories = useSelector(state => state.categoriesRedux.value);
  console.log(categories);
  

  const sortOptions = [
    { label: "Relevance", key: "relevance" },
    { label: "New Arrivals", key: "new-arrivals" },
    { label: "Price (High to Low)", key: "price-high-to-low" },
    { label: "Price (Low to High)", key: "price-low-to-high" },
  ];

  const fetchProducts = async (currentPage = 1) => {
    if (loading) return; // Prevent multiple calls
    setLoading(true);

    try {
      const response = await useRequestApi(`api/product/getFilterProduct`, "POST", {
        categories: selectedFilters,
        sort: sortOption,
        minPrice: minPrice || null,
        maxPrice: maxPrice || null,
        page: currentPage,
        limit: 10,
      });
      console.log(response);
      

      const fetchedProducts = response.products || [];
      console.log(fetchedProducts)
      if (currentPage === 1) {
        setProducts(fetchedProducts);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...fetchedProducts]);
      }

      setHasMore(fetchedProducts.length >= 10);
    } catch (error) {
      console.error("Error fetching products:", error);
      message.error("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Reset products and fetch for new filters/sort/price
    setPage(1);
    setProducts([]);
    fetchProducts(1);
  }, [selectedFilters, sortOption, minPrice, maxPrice]);

  const handleSortChange = ({ key }) => {
    setSortOption(key);
  };

  const handleCheckboxChange = (category, checked) => {
    setSelectedFilters((prevFilters) =>
      checked ? [...prevFilters, category] : prevFilters.filter((id) => id !== category)
    );
  };

  const debouncedSetPrice = (setter) => {
    let timer;
    return (value) => {
      clearTimeout(timer);
      timer = setTimeout(() => setter(value), 300);
    };
  };

  const handleMinPriceChange = debouncedSetPrice(setMinPrice);
  const handleMaxPriceChange = debouncedSetPrice(setMaxPrice);

  const menu = (
    <Menu onClick={handleSortChange}>
      {sortOptions.map((option) => (
        <Menu.Item key={option.key}>{option.label}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className="container m-auto flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-gray-100 to-blue-50">
      {/* Sidebar Filters */}
      <div className="hidden lg:block w-72 bg-white border-r shadow-md p-6">
        <Dropdown menu={menu} trigger={["click"]}>
          <Button className="flex items-center justify-between w-full bg-blue-500 text-white px-4 py-2 rounded-md">
            Sort by: {sortOption} <DownOutlined className="ml-2" />
          </Button>
        </Dropdown>

        <h2 className="text-xl font-bold text-gray-800 mt-6 mb-4">Categories</h2>
        <div className="flex flex-col gap-2">
          {categories.map((category,index) => (
            <Checkbox
              key={index}
              onChange={(e) => handleCheckboxChange(category.title, e.target.checked)}
              checked={selectedFilters.includes(category.title)}
            >
              {category.title}
            </Checkbox>
          ))}
        </div>

        <h2 className="text-xl font-bold text-gray-800 mt-6 mb-4">Price Range</h2>
        <div className="flex items-center gap-4">
          <Input
            placeholder="Min Price"
            onChange={(e) => handleMinPriceChange(e.target.value)}
            type="number"
            className="w-1/2"
          />
          <Input
            placeholder="Max Price"
            onChange={(e) => handleMaxPriceChange(e.target.value)}
            type="number"
            className="w-1/2"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <Button
          type="primary"
          icon={<FilterOutlined />}
          className="lg:hidden mb-4"
          onClick={() => { /* Handle mobile filters */ }}
        >
          Filter
        </Button>

        {/* Infinite Scroll */}
        <InfiniteScroll
          dataLength={products.length}
          next={() => {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchProducts(nextPage);
          }}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center items-center mt-4">
              <Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} />
            </div>
          }
          endMessage={
            products.length ? <p className="text-center text-gray-500 mt-4">No more products to load.</p> : ''
          }
          style={{ overflow: "hidden" }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(200px,max-content))] gap-1 md:gap-4 px-2">
            {products.length === 0 && !loading ? (
              <p className="text-center text-gray-500">No products found.</p>
            ) : (
              products.map((product) => (
                <ProductCardEl key={product.id} product={product} />
              ))
            )}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default ShopPageLayoutEl;
