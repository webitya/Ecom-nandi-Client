
import { useRef, useState, useEffect } from "react";
import { Carousel, Button } from "antd";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const BestDealsSection = () => {
  const cardContainerRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const bestDeals= useSelector(state => state.bannerImages.value)
  console.log(bestDeals);

  const cards = [
    {
      title: "Amazing Furniture Deals",
      image: "/offer_image.avif",
      description: "Get the best furniture at unbeatable prices.",
    },
    {
      title: "Travel Packages",
      image: "/offer_image.avif",
      description: "Plan your next vacation with exclusive deals.",
    },
    {
      title: "Amazing Furniture Deals",
      image: "/offer_image.avif",
      description: "Get the best furniture at unbeatable prices.",
    },
    {
      title: "Travel Packages",
      image: "/offer_image.avif",
      description: "Plan your next vacation with exclusive deals.",
    },
    {
      title: "Amazing Furniture Deals",
      image: "/offer_image.avif",
      description: "Get the best furniture at unbeatable prices.",
    },
    {
      title: "Travel Packages",
      image: "/offer_image.avif",
      description: "Plan your next vacation with exclusive deals.",
    },
  ];

  const scrollLeft = () => {
    if (cardContainerRef.current) {
      cardContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (cardContainerRef.current) {
      cardContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  const updateScrollState = () => {
    if (cardContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = cardContainerRef.current;
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth);
    }
  };

  useEffect(() => {
    const container = cardContainerRef.current;

    if (container) {
      updateScrollState(); // Initial check
      container.addEventListener("scroll", updateScrollState);

      // Cleanup
      return () => container.removeEventListener("scroll", updateScrollState);
    }
  }, []);

  return (
    <div
      className="bg-gradient-to-br from-white to-gray-100 p-10 min-h-screen"
      style={{ userSelect: "none" }}
    >
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Exclusive Offers
        </h1>
        <p className="text-lg text-gray-600">
          Discover amazing deals across categories. Shop now!
        </p>
      </div>

      {/* Carousel Section */}
      <div className="mb-16 w-[90%] mx-auto">
        <Carousel autoplay className="rounded-lg shadow-lg">
          {bestDeals.map((deal, index) => deal.bannerType === 'offer type' && (
            <div key={index} className="rounded-lg overflow-hidden">
              <img
                src={deal.bannerUrl}
                alt={deal.bannerType}
                className="w-full rounded-lg object-cover h-64 "
              />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Cards Section */}
      <div className="relative">
        <Button
          onClick={scrollLeft}
          disabled={isAtStart}
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-10 flex justify-center items-center w-12 h-12 rounded-full shadow-lg transition-all ${
            isAtStart
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          <CaretLeftOutlined />
        </Button>
        <div
          ref={cardContainerRef}
          className="flex overflow-x-scroll space-x-6 px-10 scrollbar-hide"
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className="min-w-[300px] bg-gradient-to-br from-gray-100 to-gray-200 p-6 shadow-lg rounded-lg flex-shrink-0"
            >
              <img
                src={card.image}
                alt={card.title}
                className="rounded-lg mb-4 w-full h-40 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {card.title}
              </h3>
              <p className="text-gray-600 mb-4">{card.description}</p>
              <Button
                type="primary"
                className="bg-blue-500 text-white hover:bg-blue-700"
              >
                Shop Now
              </Button>
            </div>
          ))}
        </div>
        <Button
          onClick={scrollRight}
          disabled={isAtEnd}
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-10 flex justify-center items-center w-12 h-12 rounded-full shadow-lg transition-all ${
            isAtEnd
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          <CaretRightOutlined />
        </Button>
      </div>
    </div>
  );
};

export default BestDealsSection;
