import React, { useEffect, useState } from "react";
import LayoutEl from "../../Shared/LayoutEl";
import { useNavigate, useSearchParams } from "react-router-dom";
import ShowDetailsEl from "./showdetailsEl";
import { useRequestApi } from "../../hooks/useRequestApi";
import { Spin } from "antd";
import { div } from "framer-motion/client";

const ProductDetailsCompo = () => {
    const [searchParams] = useSearchParams();
    const productId = searchParams.get("s");
    const navigate = useNavigate()
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await useRequestApi(`api/product/getProductDetails?productId=${productId}`);
                console.log(response.product);

                const data = response.product;
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        if (productId) fetchProduct();
    }, [productId]);

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <Spin size="large" />
        </div>
    )

    if (!product) return (
        <div className="text-center min-h-[80vh] items-center w-full flex flex-col justify-center text-red-500 font-semibold">
            <h1 className="text-2xl font-bold">Product Not Found</h1>
            <h1 onClick={() => navigate('/')} className=" text-blue-500 cursor-pointer "> go to homePage </h1>
        </div>
    );

    return (
        <div className="container mx-auto flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            {/* Image Show Component */}
            <ShowDetailsEl product={product} />
        </div>
    );
};

export default ProductDetailsCompo;
