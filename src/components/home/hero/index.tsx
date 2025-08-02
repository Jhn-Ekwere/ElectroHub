import circuit from "../../../assets/image/ic.png";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Hero({ data }) {
  const navigate = useNavigate();
  return (
    <div className="bg pb-10 md:pb-0 text-default-800  w-full  bg-gradient-to-b from-gray-50 to-primary/5 ">
      <div className="mx-[6%] md:mr-0 md:ml-[14%] relative z-0 items-center md:flex gap-6 ">
        <div className=" md:w-[50%] w-[70%] md:mx-0 pt-20  z-100  ">
          <h1 className="md:text-4xl text-xl font-black z-100 ">
            Power Your Projects with Quality Electronic Components
          </h1>
          <p className="md:text-sm text-xs my-6 z-100">
            Find top-quality capacitors, resistors, Arduino boards, test meters, and more. Fast shipping, competitive
            pricing, and expert support. Start building your project today!
          </p>
          <Button
            className="bg-primary rounded text-white px-4 py-2 flex items-center gap-2 shadow-lg hover:bg-primary/90 ease-in-out duration-150 text-sm  "
            onClick={() => {
              navigate(`/s?query=`, { state: { results: data } });
            }}
          >
            Shop now{" "}
            <span>
              <FiArrowRight />
            </span>{" "}
          </Button>
        </div>
        <div className="md:w-[50%] md:blur-0 blur-sm backdrop-opacity-10   backdrop-blur-sm md:relative absolute md:top-0 top-[100px] -z-10  left-[100px] md:left-0 w-full ">
          <img src={circuit} alt="hero" className="w-full h-full object-cover  " />
        </div>
      </div>
    </div>
  );
}
