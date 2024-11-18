import React from "react";
import maultimeter from "../../../assets/image/Zoyi ZT-109 Small Handheld Tester Autoranging Digital Multimeter.png";
import powerSupply from "../../../assets/image/DC Power Supply Variable, 120V 3A Bench Power Supply.png";
import { useNavigate } from "react-router-dom";

export default function SectionOne({ data }) {
  const navigate = useNavigate();
  return (
    <div className=" my-5 mx-[5%] md:px-[10%]  text-default-600">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center  ">
        <div className="bg-white/80 border  p-5 md:pr-0 flex flex-col-reverse md:flex-row  items-center justify-center">
          <div className=" md:space-y-4 space-y-2   md:text-medium text-xs ">
            <h1 className=" font-extrabold  ">DC Power Supply Variable, 120V 3A Bench Power Supply</h1>
            <p className="">
              A variable DC power supply providing adjustable voltage up to 120V and current up to 3A, ideal for bench
              testing.
            </p>
            <button
              color="primary"
              className=" px-2 py-1 border-primary text-primary rounded-none border "
              variant="bordered"
              onClick={() => {
                navigate(`/s?query=`, { state: { results: data } });
              }}
            >
              Shop Now
            </button>
          </div>
          <img
            src={powerSupply}
            alt="capaDC Power Supply Variablecitor"
            className="md:w-full w-[9.375rem] mb-5 md:mb-0 md:h-full  "
          />
        </div>
        <div className="bg-white/80 border  p-5 md:pr-0 flex flex-col-reverse md:flex-row items-center justify-center">
          <div className=" md:space-y-4 space-y-2   md:text-medium text-xs ">
            <h1 className=" font-extrabold  ">Zoyi ZT-109 Small Handheld Tester Autoranging Digital Multimeter</h1>
            <p className="">
              The Zoyi ZT-109 is a compact, autoranging digital multimeter for accurate electronics testing and
              measurement.
            </p>
            <button
              color="primary"
              className=" px-2 py-1 border-primary text-primary rounded-none border "
              variant="bordered"
              onClick={() => {
                navigate(`/s?query=`, { state: { results: data } });
              }}
            >
              Shop Now
            </button>
          </div>
          <img src={maultimeter} alt="resistor" className="md:w-full w-[9.375rem] mb-5 md:mb-0 md:h-full " />
        </div>
      </div>
    </div>
  );
}
