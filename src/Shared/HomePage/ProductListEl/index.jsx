import React, { useEffect, useRef, useState, useCallback } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Product2El from "../Product2El";

export const ProductListEl = React.memo(({ data, Heading }) => {
    const containerRef = useRef(null);
    const [showPrev, setShowPrev] = useState(false);
    const [showNext, setShowNext] = useState(false);

    // Initialize scroll behavior
    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.style.scrollBehavior = "smooth";
            updateScrollButtons(); // Update button visibility on load
        }
    }, []);

    // Update button visibility dynamically
    const updateScrollButtons = useCallback(() => {
        const container = containerRef.current;
        if (container) {
            const { scrollLeft, scrollWidth, clientWidth } = container;
            setShowPrev(scrollLeft > 0);
            setShowNext(scrollLeft < scrollWidth - clientWidth);
        }
    }, []);

    // Scroll handlers
    const handleScrollLeft = useCallback(() => {
        if (containerRef.current) {
            containerRef.current.scrollLeft -= 300;
        }
    }, []);

    const handleScrollRight = useCallback(() => {
        if (containerRef.current) {
            containerRef.current.scrollLeft += 300;
        }
    }, []);

    // Attach scroll event listener to dynamically update buttons
    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener("scroll", updateScrollButtons);
            return () => {
                container.removeEventListener("scroll", updateScrollButtons);
            };
        }
    }, [updateScrollButtons]);

    return (
        <div className="mx-auto mt-4 p-4 bg-gradient-to-br  from-indigo-50 via-purple-50 to-pink-50 shadow-lg ">
            {/* Section Heading */}
            <div className="text-center mb-8">
                <h2 className="font-extrabold text-2xl md:text-4xl text-purple-700">{Heading}</h2>
            </div>

            {/* Carousel Content */}
            <div className="relative">
                {/* Scrollable Container */}
                <div
                    ref={containerRef}
                    className="flex gap-6 overflow-x-auto scroll-smooth overflow-y-hidden scrollbar-hide"
                >
                    {data?.map((product) => (
                        <div
                            key={product.id}
                            className="flex-shrink-0 w-1/2 sm:w-1/2 lg:w-1/4"
                        >
                            <Product2El product={product} />
                        </div>
                    ))}
                </div>

                {/* Navigation Arrows */}
                {showPrev && (
                    <button
                        onClick={handleScrollLeft}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white rounded-full p-3 shadow-md hover:bg-purple-700 transition-transform duration-300"
                    >
                        <LeftOutlined style={{ fontSize: "20px" }} />
                    </button>
                )}
                {showNext && (
                    <button
                        onClick={handleScrollRight}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white rounded-full p-3 shadow-md hover:bg-purple-700 transition-transform duration-300"
                    >
                        <RightOutlined style={{ fontSize: "20px" }} />
                    </button>
                )}
            </div>
        </div>
    );
});
