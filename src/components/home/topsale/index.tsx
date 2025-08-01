import { Badge, Button, ScrollShadow } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../../utils/formatter";
import { HeartIcon, ShoppingCartIcon, StarIcon } from "@heroicons/react/24/outline";
import { ProductItemProps } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { toggleProduct } from "@/redux/savedSlice";

export default function TopSale({ products, userId }: { products: ProductItemProps[]; userId: string }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [likes, setLikes] = useState({});
  const [timeLeft, setTimeLeft] = useState(15 * 3600 + 59 * 60 + 21);

  const liked = useSelector((state: any) => state.saved).likedProducts;
  // filter product based in featured
  const featuredProducts = products.filter((item) => item?.isFeatured);


  const handleLike = (data: ProductItemProps) => {
    if (data) {
      dispatch(toggleProduct(data));
    }
  };
  const handlePress = (data: ProductItemProps) => {
    if (data) {
      dispatch(addToCart(data));
      toast.success(`${data?.name} has been added to your cart`);
    }
  };
 
  return (
    <div className=" md:px-[10%] px-[5%] bg-primary/5 p-10 text-default-600">
      <h1 className="font-bold md:text-xl mb-4  ">Top selling items</h1>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full h-fit "
      >
        <CarouselContent>
          {featuredProducts?.map((item) => {
            return (
              <CarouselItem
                key={item.name}
                className={`basis-${1 / featuredProducts.length} md:basis-1/4 lg:basis-1/5 p-2 mr-3 `}
              >
                <div className="p-1">
                  <Card className=" bg-white/90 border max-h-full relative flex flex-col mb-0 shadow rounded-sm w-[13em]">
                    <CardHeader className="overflow-visible p-0 bg-white/80  border-b ">
                      <div className="absolute right-4 top-2 p-1 rounded-full  items-center  bg-white/80  ">
                             { liked?.some((p: ProductItemProps) => p.id === item.id)
                                                          ?
                                                          <BsHeartFill
                                                            className={
                                                              "hover:scale-110 ease-in-out size-5 fill-danger text-red-500 fill-red-500 cursor-pointer "
                                                            }
                                                            onClick={ () => handleLike(item) }
                                                          /> :
                                                          <BsHeart
                                                            className={
                                                               "hover:scale-110 ease-in-out size-5 fill-danger text-red-500 fill-red-500 cursor-pointer "
                                                            }
                                                            onClick={ () => handleLike(item) }
                                                          /> }
                      </div>
                      <img
                        alt={item?.name}
                        className="w-full object-contain h-[10em] cursor-pointer "
                        src={item?.images[0]?.url}
                        onClick={() => {
                          navigate(`/product/${item?.id}`);
                        }}
                      />
                    </CardHeader>
                    <CardContent className="text-sm p-1 px-2 text-left flex flex-col gap-1 items-start ">
                      <b
                        className=" cursor-pointer "
                        onClick={() => {
                          navigate(`/product/${item?.id}`);
                        }}
                      >
                        {item?.name}
                      </b>
                      <div className="flex items-center gap-2">
                        <StarIcon className={item?.star ? "size-4 fill-[gold] " : "size-4"} color="gold" />
                        <b>•</b>
                        <p className="text-default-300 text-xs">500+ sold</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <p className="text-default-500 ">{formatCurrency(parseInt(item?.price.toString()))}</p>
                        <p className="text-danger text-xs line-through ">{item?.discount}</p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex p-2 flex-grow items-end justify-center">
                      <Button
                        size="sm"
                        variant="bordered"
                        radius="none"
                        className="text-primary w-full border-primary rounded-b-sm  hover:bg-primary hover:text-white "
                        onClick={() => handlePress(item)}
                      >
                        <ShoppingCartIcon className="size-4" />
                        Add to cart
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        {featuredProducts.length > 5 && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>
    </div>
  );
}
