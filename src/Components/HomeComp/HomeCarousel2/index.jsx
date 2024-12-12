import React, { useRef } from 'react';
import { Carousel, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import "./HomeCarousel.css"
import { Link } from 'react-router-dom';
const carouselData = [
  // {
  //   imgSrc: '/one.png',
  //   altText: '',
  // },
  // {
  //   imgSrc: '/two.png',
  //   altText: '',
  // },
  // {
  //   imgSrc: '/three.png',
  //   altText: '',
  // },
];

const HomeCarousel2 = () => {
  const carouselRef = useRef(null);

  return (
    <div className="hero-section">

      {
        !carouselData.length ?
          <div className="flex flex-col items-center justify-center bg-blue-100 h-full">
            <h2 className="text-lg font-bold text-blue-700 mb-4">Add Banner</h2>
            <Link to={"/owner/bannerSetup"}>
              <button className="px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600">
                Add
              </button>
            </Link>
          </div>
          :
          <>
            <Carousel ref={carouselRef} autoplay>
              {carouselData.map((item, index) => (
                <div key={index} className="carousel-item">
                  <img
                    src={item.imgSrc}
                    alt={item.altText}
                    className="carousel-image"
                  />
                </div>
              ))}
            </Carousel>

            <div className="carousel-controls">
              <Button
                shape='circle'

                icon={<LeftOutlined />}
                onClick={() => carouselRef.current.prev()}
                className="carousel-control-button left"
              />
              <Button
                shape='circle'
                icon={<RightOutlined />}
                onClick={() => carouselRef.current.next()}
                className="carousel-control-button right"
              />
            </div>
          </>
      }

    </div>
  );
};

export default HomeCarousel2;
