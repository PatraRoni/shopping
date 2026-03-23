
import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { assets } from "../assets/assets";


const BrandCarousel = () => {
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: true,
  };

   const brands = [
    { name: "Kenstar",    img: assets.imgKenstar },
    { name: "Bosch",      img: assets.imgBosch },
    { name: "Panasonic",  img: assets.imgPanasonic },
    { name: "Samsung",    img: assets.imgSamsung },
    { name: "LG",         img: assets.imgLG },
    { name: "Whirlpool",  img: assets.imgWhirlpool },
  ];
  return (
    <div className="w-11/12 mx-auto py-10">
      <h2 className="text-2xl font-bold ml-4 mb-6">Services For All Brands</h2>
      <p className="ml-4 text-gray-700 mb-8">
        As a home appliance repair service provider, we work with a range of
        multinational and Indian companies such as LG, Samsung, Whirlpool, Haier,
        Panasonic, Godrej, IFB, Bajaj, Bosch, Siemens, and many more.
      </p>

      <Slider {...settings}>
        {brands.map((brand, index) => (
          <div key={index} className="flex justify-center">
            <img
              src={brand.img}
              alt={brand.name}
              className="h-20 object-contain"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BrandCarousel;
