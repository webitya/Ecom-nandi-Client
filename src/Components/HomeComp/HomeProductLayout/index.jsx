import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Alert, Button } from "antd";
import { updateProduct } from "../../../redux/features/homeProductSlice/homeProductSlice";
import ProductCardEl from "../../../Shared/ProductCardEl";
import { useRequestApi } from "../../../hooks/useRequestApi";

const HomeProductsLayoutEl = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1); // Initialize page state
  const [hasMore, setHasMore] = useState(true); // Track if there are more products to load

  const Products = useSelector((state) => state.homeProductsData.value);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await useRequestApi(`api/product/getFilterProduct?page=${page}`, "POST", { page: page });
      console.log(response);

      if (response.products.length === 0) {
        setHasMore(false); // No more products to load
      } else {
        dispatch(updateProduct([...Products, ...response.products])); // Append new products
      }
    } catch (error) {
      console.log(error);

      setError(error.message || "An error occurred, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleLoadMore = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (loading && page === 1) {
    return (
      <div className="flex justify-center items-center h-60">
        <Spin size="large" tip="Loading products..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Shop Products
        </h1>
      </div>

      <div className="grid sm:gap-6 gap-1 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
        {Products &&
          Products.length > 0 &&
          Products.map((product) => (
            <ProductCardEl key={product._id} product={product} />
          ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-6">
          <Button
            type="primary"
            size="large"
            loading={loading}
            onClick={handleLoadMore}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default HomeProductsLayoutEl;
