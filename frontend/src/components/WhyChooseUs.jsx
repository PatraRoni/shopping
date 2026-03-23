
import React from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import { assets } from "../assets/assets";
import Title from "./Title"

const whyChooseUsData = [
  {
    title: "Experienced ",
    title1: "Technicians",
    description:
      "We have experienced and skilled technicians who can handle all kinds of washing machine repair issues.",
    icon: assets.WCU1,
  },
  {
    title: "Service ",
    title1: "Guarantee",
    description:
      "Our repair services come with a guarantee to ensure customer satisfaction and peace of mind.",
    icon: assets.WCU2,
  },
  {
    title: "Convenient ",
    title1: "Service",
    description:
      "Our repair technicians can come to your home at a convenient time to carry out repairs, saving you time and effort.",
    icon: assets.Home,
  },
  {
    title: "Customer ",
    title1: "Support",
    description:
      "We provide excellent customer support and are always available to answer any queries you may have.",
    icon: assets.WCU3,
  },
  {
    title: "Affordable ",
    title1: "Rates",
    description:
      "We offer competitive rates for our repair services without compromising on the quality of service.",
    icon: assets.WCU4,
  },
  {
    title: "Genuine ",
    title1: "Parts",
    description:
      "We use only genuine and high-quality parts for washing machine repairs to ensure long-lasting performance.",
    icon: assets.WCU5,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold  mb-10"><Title text1={"WHY"} text2={"CHOOSE US?"} /></h2>
        
        
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {whyChooseUsData.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6  shadow-md border border-gray-400 hover:shadow-xl transition-shadow duration-300 text-center"
            >
              <img
                src={item.icon}
                alt={<Title text1={item.title} text2={item.title1}/>}
                className="h-12 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2"><Title text1={item.title} text2={item.title1}/></h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Centered Book Service Button */}
        <div className="mt-12 text-center">
          <Link
            to="/service"
            className="bg-white text-gray-600  px-8 py-3 hover:bg-gray-300 border border-gray-400 transition font-semibold shadow-md"
          >
            Book Service
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
