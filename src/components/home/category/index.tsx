import React from "react";
import Capacitor from "../../../assets/image/capacitor.png";
import resistor from "../../../assets/image/resistor.png";
import inductor from "../../../assets/image/inductor.png";
import transistor from "../../../assets/image/transistor.png";
import multimeter from "../../../assets/image/multimeter.png";
import sensor from "../../../assets/image/sensor.png";
import solder from "../../../assets/image/solder.png";
import power from "../../../assets/image/power.png";
import { useNavigate } from "react-router-dom";

export default function Category({ data }) {
  const navigate = useNavigate();
  const categories = [
    {
      title: "Capacitor",
      img: Capacitor,
      url: "product/capacitor",
    },
    {
      title: "Resistor",
      img: resistor,
      url: "product/resistor",
    },
    {
      title: "Inductor",
      img: inductor,
      url: "product/inductor",
    },
    {
      title: "Transistor",
      img: transistor,
      url: "product/transistor",
    },
    {
      title: "Test Equipment",
      img: multimeter,
      url: "product/test-equipment",
    },
    {
      title: "Sensors",
      img: sensor,
      url: "product/sensors",
    },
    {
      title: "Tools and supplies",
      img: solder,
      url: "product/tools-and-supplies",
    },
    {
      title: "Power Products",
      img: power,
      url: "product/power-products",
    },
  ];

  const searchProducts = (searchTerm) => {
    const results =
      Array.isArray(data) &&
      data?.filter((product) => product?.category[0]?.name.toLowerCase().includes(searchTerm?.toLowerCase()));
    return navigate(`/s?query=${searchTerm}`, { state: { results } });
  };
  return (
    <div className=" my-5 md:px-[10%] p-5 text-default-600 ">
      <h1 className="font-bold md:text-xl mb-4  ">
        Search by <span className="text-primary">Category</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 md:text-sm text-primary  text-xs gap-4 items-center  ">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-white/80  hover:bg-primary hover:text-white cursor-pointer ease-in-out duration-250 md:p-6 p-2 border border-default-300  shadow-md flex items-center gap-6 "
            onClick={() => searchProducts(category.title)}
          >
            <div className="w-[3em] h-[3em] ">
              <img src={category.img} alt="" className="w-full h-full object-contain " />
            </div>
            <h2 className="font-bold ">{category.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
