import { Badge, ScrollShadow } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../../utils/formatter";
import { HeartIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ProductItemProps } from "@/types";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { toggleProduct } from "@/redux/savedSlice";

export default function NewArival({ products, userId }: { products: ProductItemProps[]; userId: string }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const liked = useSelector((state: any) => state.saved).likedProducts;

  const handleLike = (data: ProductItemProps) => {
    if (data) {
      dispatch(toggleProduct(data));
    }
  };
  const handlePress = (data: any) => {
    if (data) {
      dispatch(addToCart(data));
      toast.success(`${data.name} has been added to your cart`, {
        className: " text-xs",
      });
    }
  };

  // filter product based in IsProductNew
  const newProducts = products.filter((item) => item?.isProductNew);

  return (
    <div className="  md:px-[10%] p-5 px-[5%] bg-primary/5 text-default-600">
      <h1 className="font-bold text-xl mb-4 ">New Arrival</h1>

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full h-fit "
      >
        <CarouselContent>
          {newProducts?.map((item, index) => (
            <CarouselItem
              key={item.name}
              className={`basis-${1 / newProducts.length} md:basis-1/4 lg:basis-32 p-2 mr-3.5 `}
            >
              <div>
                <Card
                  key={item.name}
                  className="rounded-sm md:text-medium relative text-xs p-0 w-[13em] md:w-[10em] flex flex-col h-full mb-0 bg-transparent border-none shadow-none  "
                >
                  <CardHeader className="overflow-visible p-0  border-b  ">
                    <div className="absolute right-4 top-2 p-1 rounded-full  items-center  bg-white/80  ">
                      {liked?.some((p: ProductItemProps) => p.id === item.id) ? (
                        <BsHeartFill
                          className={
                            "hover:scale-110 ease-in-out size-3 fill-danger text-red-500 fill-red-500 cursor-pointer "
                          }
                          onClick={() => handleLike(item)}
                        />
                      ) : (
                        <BsHeart
                          className={
                            "hover:scale-110 ease-in-out size-3 fill-danger text-red-500 fill-red-500 cursor-pointer "
                          }
                          onClick={() => handleLike(item)}
                        />
                      )}
                    </div>
                    <img
                      alt={item?.name}
                      className="w-full object-contain  cursor-pointer "
                      src={item?.images[0]?.url}
                      onClick={() => {
                        navigate(`/product/${item?.id}`);
                      }}
                    />
                  </CardHeader>
                  <CardContent className="  text-xs p-1 px-2 text-left flex-grow gap-1 items-start  ">
                    <p
                      className="xs text-center w-full cursor-pointer line-clamp-3  "
                      onClick={() => {
                        navigate(`/product/${item?.id}`);
                      }}
                    >
                      {item?.name}
                    </p>
                  </CardContent>
                  <CardFooter className="w-full mb-0 p-2 flex-grow text-xs items-center ">
                    <div className="flex  w-full gap-1 ">
                      <p className="text-default-500  font-bold ">{formatCurrency(parseInt(item?.price.toString()))}</p>
                      {item?.discount && <p className="text-red-500 text-xs  ">{item?.discount}% </p>}
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {newProducts.length > 6 && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>
    </div>
  );
}
