import React, { useState, useEffect } from "react";
import { LeftOutlined, RightOutlined, StarFilled } from "@ant-design/icons";
import NewProductData from "./NewProductData";
import Product2El from "../../../Shared/HomePage/Product2El";
import { ProductListEl } from "../../../Shared/HomePage/ProductListEl";

export const NewProduct = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4); // Default for large screens

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1024) setItemsPerPage(4); // Desktop: 4 items
      else if (window.innerWidth >= 768) setItemsPerPage(2); // Tablet: 2 items
      else setItemsPerPage(1); // Mobile: 1 item
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const totalPages = Math.ceil(NewProductData.length / itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const currentProducts = NewProductData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <>
      <div className=" container m-auto">
        <ProductListEl data={NewProductData} Heading={'New Product'} />

      </div>
    </>
  );
};
