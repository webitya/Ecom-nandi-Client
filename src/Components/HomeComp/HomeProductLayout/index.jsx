import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Alert, Button } from "antd";
import { updateProduct } from "../../../redux/features/homeProductSlice/homeProductSlice";
import ProductCardEl from "../../../Shared/ProductCardEl";
import { useRequestApi } from "../../../hooks/useRequestApi";

const HomeProductsLayoutEl = () => {
  const dispatch = useDispatch();
  const { products, currentPage, hasMore } = useSelector((state) => state.homeProductsData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProducts = async (page) => {
    setLoading(true);
    try {
      const response = await useRequestApi(`api/product/getFilterProduct?page=${page}`, "POST", {
        page,
        limit: 10,
      });
      dispatch(
        updateProduct({
          products: response.products,
          currentPage: page,
          hasMore: response.products.length > 0,
        })
      );
    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred while fetching products.");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      fetchProducts(currentPage + 1);
    }
  };


  useEffect(() => {
    if (products.length === 0) {
      fetchProducts(1); // Fetch only if no data exists
    }
  }, [products]);

  if (loading && products.length === 0) {
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

      <div className="grid sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] grid-cols-2 gap-2 md:gap-6 px-0">
        {products &&
          products.map((product) => (
            <ProductCardEl key={product._id} product={product} />
          ))}
      </div>
      {
        loading && <div className="flex justify-center items-center h-60">
          <Spin size="large" tip="Loading products..." />
        </div>
      }
      {hasMore && (
        <div className="flex justify-center mt-6">
          <Button
            type="primary"
            size="large"
            loading={loading}
            onClick={loadMore}
          >
            Load More
          </Button>
        </div>
      )}

    </div>
  );
};

export default HomeProductsLayoutEl;
