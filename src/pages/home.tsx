import React, { useEffect, useState } from "react";
import Hero from "../components/home/hero";
import Category from "../components/home/category";
import SectionOne from "../components/home/sectionone";
import Testimonial from "../components/home/testimonial";
import NewArival from "../components/home/newarival";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { fetchProductsEP } from "../services";
import TopSale from "../components/home/topsale";
import FlashSale from "../components/home/flashsale";
import Microcontrollers from "../assets/image/Microcontrollers.jpg";
import Op from "../assets/image/Op-Amps.jpg";
import Arduino from "../assets/image/Arduino.jpg";
import Resistors from "../assets/image/Resistors.jpg";
import Capacitors from "../assets/image/Capacitors.jpg";
import Diodes from "../assets/image/Diodes.jpg";
import Transistors from "../assets/image/Transistors.jpg";
import Battery from "../assets/image/Battery Packs.jpg";
import DC from "../assets/image/DC Power Modules.jpg";
import Raspberry from "../assets/image/Raspberry Pi.jpg";
import Thermometers from "../assets/image/Thermometers.jpg";
import Calipers from "../assets/image/Calipers.jpg";
import Oscilloscope from "../assets/image/Oscilloscopes.jpg";
import Multimeters from "../assets/image/Multimeters.jpg";

export default function Home() {
  const user = useSelector((state: any) => state.auth);

  const { isPending, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductsEP,
    staleTime: 1000 * 60 * 60 * 24,
  });
  // if (isPending) return "Loading...";

  // if (error) return "An error has occurred: " + error.message;

  return (
    <div className="  ">
      <div className="bg-red-00 border-b p-1 text-center ">
        <p className="text-[.625rem] md:text-sm border-t  border-primary border-b md:p-2 p-1 ">
          Holiday Sale! Get 20% off on all products. Use code <span className="font-bold text-primary">HOLIDAY20</span>
        </p>
      </div>
      <Hero data={data} />

      <div className=" md:px-[10%] px-[10px] p-10 pt-0 text-xs md:text-sm bg-primary/5 text-default-600  ">
        <div className="container grid grid-cols-3 md:grid-cols-4  border  gap-5">
          <div className="bg-white space-y-2 p-4 ">
            <h2 className="text-xs font-semibold ">Integrated Circuits (ICs) </h2>
            <div className={`grid grid-cols-1 gap-5`}>
              <div className=" w-full md:h-20 h-10 ">
                <img src={Microcontrollers} alt={`Microcontrollers `} className="w-full h-full object-cover" />
                <p className="text-[11px] ">Microcontrollers</p>
              </div>
              <div className={`grid grid-cols-2 gap-2`}>
                <div className=" w-full md:h-20 h-10 ">
                  <img src={Op} alt={`Op `} className="w-full h-full object-cover" />
                  <p className="text-[11px] ">Op-Amps</p>
                </div>
                <div className=" w-full md:h-20 h-10 ">
                  <img src={Arduino} alt={`Arduino `} className="w-full h-full object-cover" />
                  <p className="text-[11px] ">Arduino Boards</p>
                </div>
              </div>
            </div>
            <p className="pt-2  ">
              <a href="#" className="underline  text-[11px]">
                Explore ICs
              </a>
            </p>
          </div>
          <div className="bg-white space-y-2 p-4 ">
            <h2 className="text-xs font-semibold ">Shop for your favorite components </h2>
            <div className={`grid grid-cols-2 gap-5`}>
              <div className=" w-full md:h-20 h-10 ">
                <img src={Resistors} alt={`Resistors `} className="w-full h-full object-cover" />
                <p className="text-[11px] ">Resistors</p>
              </div>
              <div className=" w-full md:h-20 h-10 ">
                <img src={Capacitors} alt={`Capacitors `} className="w-full h-full object-cover" />
                <p className="text-[11px] ">Capacitors</p>
              </div>
              <div className=" w-full md:h-20 h-10 ">
                <img src={Diodes} alt={`Diodes `} className="w-full h-full object-cover" />
                <p className="text-[11px] ">Diodes</p>
              </div>
              <div className=" w-full md:h-20 h-10 ">
                <img src={Transistors} alt={`Transistors `} className="w-full h-full object-cover" />
                <p className="text-[11px] ">Transistors</p>
              </div>
            </div>
            <p className="pt-2  ">
              <a href="#" className="underline  text-[11px]">
                See more components
              </a>
            </p>
          </div>
          <div className="bg-white space-y-2 p-4 ">
            <h2 className="text-xs font-semibold ">Development Boards & Power Modules </h2>
            <div className={`grid grid-cols-1 gap-5`}>
              <div className={`grid grid-cols-2 gap-2`}>
                <div className=" w-full md:h-20 h-10 ">
                  <img src={Battery} alt={`Battery `} className="w-full h-full object-cover" />
                  <p className="text-[11px] ">Battery Packs</p>
                </div>
                <div className=" w-full md:h-20 h-10 ">
                  <img src={DC} alt={`DC `} className="w-full h-full object-cover" />
                  <p className="text-[11px] ">DC Power Modules</p>
                </div>
              </div>

              <div className=" w-full md:h-20 h-10 ">
                <img src={Raspberry} alt={`Raspberry `} className="w-full h-full object-cover" />
                <p className="text-[11px] ">Raspberry Pi</p>
              </div>
            </div>
            <p className="pt-2  ">
              <a href="#" className="underline  text-[11px]">
                View all modules
              </a>
            </p>
          </div>
          <div className="bg-white space-y-2 hidden md:block p-4 ">
            <h2 className="text-xs font-semibold ">Measuring Instruments </h2>
            <div className={`grid grid-cols-1 gap-5`}>
              <div className=" w-full h-48 ">
                <img src={Thermometers} alt={`Thermometers `} className="w-full h-full object-cover" />
                <p className="text-[11px] ">Thermometers</p>
              </div>
            </div>
            <p className="pt-2  ">
              <a href="#" className="underline  text-[11px]">
                Browse tools
              </a>
            </p>
          </div>
          <div className="bg-white space-y-2 p-4 ">
            <h2 className="text-xs font-semibold ">Integrated Circuits (ICs) </h2>
            <div className={`grid grid-cols-1 gap-5`}>
              <div className=" w-full md:h-20 h-10 ">
                <img src={Microcontrollers} alt={`Microcontrollers `} className="w-full h-full object-cover" />
                <p className="text-[11px] ">Microcontrollers</p>
              </div>
              <div className={`grid grid-cols-3 gap-2`}>
                <div className=" w-full md:h-20 h-10 ">
                  <img src={Op} alt={`Op `} className="w-full h-full object-cover" />
                  <p className="text-[11px] ">Op-Amps</p>
                </div>
                <div className=" w-full md:h-20 h-10 ">
                  <img src={Arduino} alt={`Arduino `} className="w-full h-full object-cover" />
                  <p className="text-[11px] ">Arduino Boards</p>
                </div>
                <div className=" w-full md:h-20 h-10 ">
                  <img src={Arduino} alt={`Arduino `} className="w-full h-full object-cover" />
                  <p className="text-[11px] ">Arduino Boards</p>
                </div>
              </div>
            </div>
            <p className="pt-2  ">
              <a href="#" className="underline  text-[11px]">
                Explore ICs
              </a>
            </p>
          </div>
          <div className="bg-white space-y-2 p-4 ">
            <h2 className="text-xs font-semibold ">Shop for your favorite components </h2>
            <div className={`grid grid-cols-1 gap-5`}>
              <div className=" w-full h-48 ">
                <img src={Capacitors} alt={`Capacitors `} className="w-full h-full object-cover" />
                <p className="text-[11px] ">Capacitors</p>
              </div>
            </div>
            <p className="pt-2  ">
              <a href="#" className="underline  text-[11px]">
                See more components
              </a>
            </p>
          </div>
          <div className="bg-white space-y-2 p-4 ">
            <h2 className="text-xs font-semibold ">Development Boards & Power Modules </h2>
            <div className={`grid grid-cols-1 gap-5`}>
              <div className={`grid grid-cols-2 gap-2`}>
                <div className=" w-full md:h-20 h-10 ">
                  <img src={Battery} alt={`Battery `} className="w-full h-full object-cover" />
                  <p className="text-[11px] ">Battery Packs</p>
                </div>
                <div className=" w-full md:h-20 h-10 ">
                  <img src={DC} alt={`DC `} className="w-full h-full object-cover" />
                  <p className="text-[11px] ">DC Power Modules</p>
                </div>
              </div>

              <div className=" w-full md:h-20 h-10 ">
                <img src={Raspberry} alt={`Raspberry `} className="w-full h-full object-cover" />
                <p className="text-[11px] ">Raspberry Pi</p>
              </div>
            </div>
            <p className="pt-2  ">
              <a href="#" className="underline  text-[11px]">
                View all modules
              </a>
            </p>
          </div>
          <div className="bg-white space-y-2 hidden md:block p-4 ">
            <h2 className="text-xs font-semibold ">Measuring Instruments </h2>
            <div className={`grid grid-cols-2 gap-5`}>
              <div className=" w-full md:h-20 h-10 ">
                <img src={Multimeters} alt={`Multimeters `} className="w-full h-full object-cover" />
                <p className="text-[11px] ">Multimeters</p>
              </div>
              <div className=" w-full md:h-20 h-10 ">
                <img src={Oscilloscope} alt={`Oscilloscopes `} className="w-full h-full object-cover" />
                <p className="text-[11px] ">Oscilloscopes</p>
              </div>
              <div className=" w-full md:h-20 h-10 ">
                <img src={Calipers} alt={`Calipers `} className="w-full h-full object-cover" />
                <p className="text-[11px] ">Calipers</p>
              </div>
              <div className=" w-full md:h-20 h-10 ">
                <img src={Thermometers} alt={`Thermometers `} className="w-full h-full object-cover" />
                <p className="text-[11px] ">Thermometers</p>
              </div>
            </div>
            <p className="pt-2  ">
              <a href="#" className="underline  text-[11px]">
                Browse tools
              </a>
            </p>
          </div>
        </div>
      </div>

      <SectionOne data={data} />
      {data?.length > 0 && <FlashSale products={data} userId={user.id} />}
      <Category data={data} />
      {data?.length > 0 && <NewArival products={data} userId={user.id} />}
      <div className=" md:px-[10%] px-[10px] p-10 pt-0 text-xs md:text-sm bg-primary/5 text-default-600  ">
        <div className="container grid grid-cols-3 md:grid-cols-4  border  gap-5">
          <div className="bg-white space-y-2 p-4 ">
            <h2 className="text-xs font-semibold ">Integrated Circuits (ICs) </h2>
            <div className={`grid grid-cols-1 gap-5`}>
              <div className=" w-full md:h-20 h-10 ">
                <img src={Microcontrollers} alt={`Microcontrollers `} className="w-full h-full object-cover" />
                <p className="text-[11px] ">Microcontrollers</p>
              </div>
              <div className={`grid grid-cols-2 gap-2`}>
                <div className=" w-full md:h-20 h-10 ">
                  <img src={Op} alt={`Op `} className="w-full h-full object-cover" />
                  <p className="text-[11px] ">Op-Amps</p>
                </div>
                <div className=" w-full md:h-20 h-10 ">
                  <img src={Arduino} alt={`Arduino `} className="w-full h-full object-cover" />
                  <p className="text-[11px] ">Arduino Boards</p>
                </div>
              </div>
            </div>
            <p className="pt-2  ">
              <a href="#" className="underline  text-[11px]">
                Explore ICs
              </a>
            </p>
          </div>
          <div className="bg-white space-y-2 p-4 ">
            <h2 className="text-xs font-semibold ">Shop for your favorite components </h2>
            <div className={`grid grid-cols-2 gap-5`}>
              <div className=" w-full md:h-20 h-10 ">
                <img src={Resistors} alt={`Resistors `} className="w-full h-full object-cover" />
                <p className="text-[11px] ">Resistors</p>
              </div>
              <div className=" w-full md:h-20 h-10 ">
                <img src={Capacitors} alt={`Capacitors `} className="w-full h-full object-cover" />
                <p className="text-[11px] ">Capacitors</p>
              </div>
              <div className=" w-full md:h-20 h-10 ">
                <img src={Diodes} alt={`Diodes `} className="w-full h-full object-cover" />
                <p className="text-[11px] ">Diodes</p>
              </div>
              <div className=" w-full md:h-20 h-10 ">
                <img src={Transistors} alt={`Transistors `} className="w-full h-full object-cover" />
                <p className="text-[11px] ">Transistors</p>
              </div>
            </div>
            <p className="pt-2  ">
              <a href="#" className="underline  text-[11px]">
                See more components
              </a>
            </p>
          </div>
          <div className="bg-white space-y-2 p-4 ">
            <h2 className="text-xs font-semibold ">Development Boards & Power Modules </h2>
            <div className={`grid grid-cols-1 gap-5`}>
              <div className={`grid grid-cols-2 gap-2`}>
                <div className=" w-full md:h-20 h-10 ">
                  <img src={Battery} alt={`Battery `} className="w-full h-full object-cover" />
                  <p className="text-[11px] ">Battery Packs</p>
                </div>
                <div className=" w-full md:h-20 h-10 ">
                  <img src={DC} alt={`DC `} className="w-full h-full object-cover" />
                  <p className="text-[11px] ">DC Power Modules</p>
                </div>
              </div>

              <div className=" w-full md:h-20 h-10 ">
                <img src={Raspberry} alt={`Raspberry `} className="w-full h-full object-cover" />
                <p className="text-[11px] ">Raspberry Pi</p>
              </div>
            </div>
            <p className="pt-2  ">
              <a href="#" className="underline  text-[11px]">
                View all modules
              </a>
            </p>
          </div>
          <div className="bg-white space-y-2 hidden md:block p-4 ">
            <h2 className="text-xs font-semibold ">Measuring Instruments </h2>
            <div className={`grid grid-cols-1 gap-5`}>
              <div className=" w-full h-48 ">
                <img src={Thermometers} alt={`Thermometers `} className="w-full h-full object-cover" />
                <p className="text-[11px] ">Thermometers</p>
              </div>
            </div>
            <p className="pt-2  ">
              <a href="#" className="underline  text-[11px]">
                Browse tools
              </a>
            </p>
          </div>
          <div className="bg-white space-y-2 p-4 ">
            <h2 className="text-xs font-semibold ">Integrated Circuits (ICs) </h2>
            <div className={`grid grid-cols-1 gap-5`}>
              <div className=" w-full md:h-20 h-10 ">
                <img src={Microcontrollers} alt={`Microcontrollers `} className="w-full h-full object-cover" />
                <p className="text-[11px] ">Microcontrollers</p>
              </div>
              <div className={`grid grid-cols-3 gap-2`}>
                <div className=" w-full md:h-20 h-10 ">
                  <img src={Op} alt={`Op `} className="w-full h-full object-cover" />
                  <p className="text-[11px] ">Op-Amps</p>
                </div>
                <div className=" w-full md:h-20 h-10 ">
                  <img src={Arduino} alt={`Arduino `} className="w-full h-full object-cover" />
                  <p className="text-[11px] ">Arduino Boards</p>
                </div>
                <div className=" w-full md:h-20 h-10 ">
                  <img src={Arduino} alt={`Arduino `} className="w-full h-full object-cover" />
                  <p className="text-[11px] ">Arduino Boards</p>
                </div>
              </div>
            </div>
            <p className="pt-2  ">
              <a href="#" className="underline  text-[11px]">
                Explore ICs
              </a>
            </p>
          </div>
          <div className="bg-white space-y-2 p-4 ">
            <h2 className="text-xs font-semibold ">Shop for your favorite components </h2>
            <div className={`grid grid-cols-1 gap-5`}>
              <div className=" w-full h-48 ">
                <img src={Capacitors} alt={`Capacitors `} className="w-full h-full object-cover" />
                <p className="text-[11px] ">Capacitors</p>
              </div>
            </div>
            <p className="pt-2  ">
              <a href="#" className="underline  text-[11px]">
                See more components
              </a>
            </p>
          </div>
          <div className="bg-white space-y-2 p-4 ">
            <h2 className="text-xs font-semibold ">Development Boards & Power Modules </h2>
            <div className={`grid grid-cols-1 gap-5`}>
              <div className={`grid grid-cols-2 gap-2`}>
                <div className=" w-full md:h-20 h-10 ">
                  <img src={Battery} alt={`Battery `} className="w-full h-full object-cover" />
                  <p className="text-[11px] ">Battery Packs</p>
                </div>
                <div className=" w-full md:h-20 h-10 ">
                  <img src={DC} alt={`DC `} className="w-full h-full object-cover" />
                  <p className="text-[11px] ">DC Power Modules</p>
                </div>
              </div>

              <div className=" w-full md:h-20 h-10 ">
                <img src={Raspberry} alt={`Raspberry `} className="w-full h-full object-cover" />
                <p className="text-[11px] ">Raspberry Pi</p>
              </div>
            </div>
            <p className="pt-2  ">
              <a href="#" className="underline  text-[11px]">
                View all modules
              </a>
            </p>
          </div>
          <div className="bg-white space-y-2 hidden md:block p-4 ">
            <h2 className="text-xs font-semibold ">Measuring Instruments </h2>
            <div className={`grid grid-cols-2 gap-5`}>
              <div className=" w-full md:h-20 h-10 ">
                <img src={Multimeters} alt={`Multimeters `} className="w-full h-full object-cover" />
                <p className="text-[11px] ">Multimeters</p>
              </div>
              <div className=" w-full md:h-20 h-10 ">
                <img src={Oscilloscope} alt={`Oscilloscopes `} className="w-full h-full object-cover" />
                <p className="text-[11px] ">Oscilloscopes</p>
              </div>
              <div className=" w-full md:h-20 h-10 ">
                <img src={Calipers} alt={`Calipers `} className="w-full h-full object-cover" />
                <p className="text-[11px] ">Calipers</p>
              </div>
              <div className=" w-full md:h-20 h-10 ">
                <img src={Thermometers} alt={`Thermometers `} className="w-full h-full object-cover" />
                <p className="text-[11px] ">Thermometers</p>
              </div>
            </div>
            <p className="pt-2  ">
              <a href="#" className="underline  text-[11px]">
                Browse tools
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className=" border-red-500 border-b border-t  text-red-500 p-2 text-center ">
        <h3 className="md:text-xl text-sm font-bold">CLOSEOUT DEALS</h3>
        <p className="md:text-sm text-[.625rem]">
          Discover the best deals on Micro Controllers and save up to 40% while you're at it!
        </p>
        <a href="#" className=" underline text-sm">
          Shop Now
        </a>
      </div>
      {data?.length > 0 && <TopSale products={data} userId={user.id} />}
      <Testimonial />
    </div>
  );
}
