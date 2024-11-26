import React, { useEffect, useRef } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Product2El from "../Product2El";

export const ProductListEl = ({ data, Heading }) => {
    console.log(data);

    const containerRef = useRef(null);

    useEffect(() => {
        const updateScrollBehavior = () => {
            const container = containerRef.current;
            if (container) {
                container.style.scrollBehavior = "smooth"; // Ensure smooth scrolling
            }
        };

        updateScrollBehavior();
    }, []);

    const handleScrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollLeft -= 300; // Scroll left by 300px
        }
    };

    const handleScrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollLeft += 300; // Scroll right by 300px
        }
    };

    return (
        <div className="mx-auto mt-4 p-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 shadow-lg">
            {/* Section Heading */}
            <div className="text-center mb-8">
                <h2 className="font-extrabold md:text-4xl text-4xl text-purple-700">
                    {Heading}
                </h2>
            </div>

            {/* Carousel Content */}
            <div className="relative">
                {/* Scrollable Container */}
                <div
                    ref={containerRef}
                    className="flex overflow-x-auto gap-6 scroll-smooth overflow-y-hidden scrollbar-hide"
                >
                    {data && data.length && data.map((product) => (
                        <div key={product.id} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4">
                            <Product2El product={product} />
                        </div>
                    ))}
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={handleScrollLeft}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-transparent md:bg-purple-600 text-zinc-500 md:text-white rounded-full p-4 shadow-md md:hover:bg-purple-700 transition-transform duration-300"
                >
                    <LeftOutlined style={{ fontSize: "20px" }} />
                </button>
                <button
                    onClick={handleScrollRight}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-transparent md:bg-purple-600 text-zinc-500 md:text-white rounded-full p-4 shadow-md md:hover:bg-purple-700 transition-transform duration-300"
                >
                    <RightOutlined style={{ fontSize: "20px" }} />
                </button>
            </div>
        </div>
    );
};
