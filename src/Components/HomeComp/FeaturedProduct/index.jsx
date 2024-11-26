import React, { useEffect, useRef } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import FeaturedProductData from "./FeaturedProductData";
import Product2El from "../../../Shared/HomePage/Product2El";
import { ProductListEl } from "../../../Shared/HomePage/ProductListEl";

export const FeaturedProduct = ({ data, Heading }) => {

  return (
    <>
      <div className=" container m-auto">
        <ProductListEl data={FeaturedProductData} Heading={'Featured Product'} />

      </div>
    </>
  );
};
