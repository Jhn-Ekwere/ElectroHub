import { ScrollShadow } from "@nextui-org/react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../../utils/formatter";
import { StarIcon } from "@heroicons/react/24/outline";
import { FlashSaleProps } from "@/types";

export default function FlashSale({ products, userId }: FlashSaleProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [likes, setLikes] = useState({});
  const [timeLeft, setTimeLeft] = useState(15 * 3600 + 59 * 60 + 21);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const formattedTime = `${hours.toString().padStart(2, "0")}h:${minutes.toString().padStart(2, "0")}m:${seconds
    .toString()
    .padStart(2, "0")}s`;

  // const handlePress = (data) => {
  //   console.log(data);
  //   if (data) {
  //     dispatch(addToCart(data));
  //     toast.success(`${data.name} has been added to your cart`, {
  //       className: " text-xs",
  //     });
  //   }
  // };

  // filter product based in featured
  const featuredProducts = products.filter((item) => item?.isFeatured);

  //  toggle like
  // const handleLike = (data) => {
  //   if (data) {
  //     axios.post(`${API_URL}/like/${data.id}/${userId}`).then((res) => {
  //       setLikes((prevLikes) => ({
  //         ...prevLikes,
  //         id: data.id,
  //       }));
  //     });
  //   }
  // };

  return (
    <div className=" md:px-[10%] px-[5%] p-10 text-xs md:text-sm bg-primary/5 text-default-600  ">
      <div className="bg-red-500 text-white p-2">
        <div className="flex justify-between text-xs items-center ">
          <h3 className="font-bold ">Flash Sale</h3>
          <p className="">Time Left: {formattedTime}</p>
          <a href="#" className="text-white underline">
            SEE ALL
          </a>
        </div>
      </div>
      <ScrollShadow className="w-full  " hideScrollBar offset={100} orientation="horizontal" size={20}>
        <div className="gap-4 w-full flex pt-1  h-fit shadow ">
          {featuredProducts
            ?.sort(() => Math.random() - 3)
            .slice(0, 10)
            .map((item) => {
              return (
                <div className="p-1">
                  <Card
                    key={item.name}
                    className="rounded-sm w-[8em] bg-transparent border-none mb-1 shadow-none max-h-full relative flex flex-col  "
                  >
                    <CardHeader className="overflow-visible p-0  border-b ">
                      <div className="absolute right-0 top-2  px-3 text-[9px] w-[40px] h-[17px] items-center   overflow-hidden ">
                        <div className=" absolute -right-[14px] -top-1 -rotate-[55deg] bg-red-500 h-[40px] w-[60px] "></div>
                        <p className="px-3 text-white absolute bg-transparent z-10 right-0  bottom-[50%] translate-y-[50%] ">
                          -{item.discount}%
                        </p>
                      </div>
                      <img
                        alt={item?.name}
                        className="w-full object-contain cursor-pointer "
                        src={item?.images[0]?.url}
                        onClick={() => {
                          navigate(`/product/${item?.id}`);
                        }}
                      />
                    </CardHeader>
                    <CardContent className="text-left text-xs flex flex-col gap-1 p-2  items-start  px-2 ">
                      <p
                        className=" cursor-pointer text-primary line-clamp-3 "
                        onClick={() => {
                          navigate(`/product/${item?.id}`);
                        }}
                      >
                        {item?.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <StarIcon className={item?.star ? "size-3 fill-[#ccaf09] " : "size-3"} color="gold" />
                      </div>
                      <div className="flex gap-2 items-center">
                        <p className=" font-bold ">{formatCurrency(parseInt(item?.price.toString()))}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
        </div>
      </ScrollShadow>
    </div>
  );
}
