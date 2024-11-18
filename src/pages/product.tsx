import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@nextui-org/button";
import { BiCart } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { HeartIcon, MinusIcon, PlusIcon, ShareIcon } from "@heroicons/react/24/outline";
import { ImStarEmpty, ImStarFull, ImStarHalf } from "react-icons/im";
import { formatCurrency } from "../utils/formatter";
import { addToCart, deleteFromCart } from "../redux/cartSlice";
import { toast } from "react-toastify";
import delivery from "../assets/image/carbon_delivery.svg";
import returnicon from "../assets/image/return.svg";
import { commentEP, DeleteCommentEP, fetchProductsEP } from "../services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRecommendations } from "../utils/getRecomendation";
import { ProductItemProps } from "@/types";
import {  Loader2, SendHorizontal, Star, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import avatar from "../assets/image/avatar.svg";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Review } from "@/components/review";

const merchantProfile = {
  name: "John's Electronics",
  description: "We offer a wide range of electronic products including smartphones, laptops, and accessories.",
  location: "123 Market St, Springfield, IL",
  contact: "john@example.com",
  rating: 4.5,
};

const schema = z.object({
  comment: z.string().min(3),
});
export default function Product() {
  let id = useParams().id;
  const navigate = useNavigate();
  const [displayImage, setDisplayImage] = useState<string | undefined>(undefined);
  const [recommendations, setRecommendations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState("Specifications");
  const user = useSelector((state: any) => state.auth);
  const dispatch = useDispatch(); 
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<{ comment: string }>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: { formData: any }) => commentEP(data.formData),
    onSuccess: () => {
      toast.success("Comment added successfully"); 
      setRating(0);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      reset();
    },
  });




  const submitHandler = async (data: { comment: string }) => {
    if (!user.id) {
      toast.warn("Login a user");
      return;
    } 
      const formData = {
        comment: data.comment,
        rating,
        user: user.id,
        product,
      };
      await mutateAsync({ formData });
    
  };

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating === rating ? 0 : selectedRating);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductsEP,
  });
  const product =
    products && products?.find((product: ProductItemProps) => product?.id.toString() === (id ?? "").toString());
  const cartItems = useSelector((state: any) => state.cartItems);
  const item =
    cartItems && cartItems.cartItems.find((item: ProductItemProps) => item.id.toString() === item.toString());

  const handlePress = (data: ProductItemProps) => {
    if (data) {
      dispatch(addToCart(data));
      toast.success(`${data?.name} has been added to your cart`);
    }
  };

  const handleAdd = (data: ProductItemProps) => {
    if (data) {
      dispatch(addToCart(data));
    }
  };
  const handleremove = (data: ProductItemProps) => {
    if (data) {
      dispatch(deleteFromCart(data));
    }
  };

  // Save product name to searched array in local storage on the load of this page
  const saveSearchedItem = () => {
    const store = localStorage.getItem("searches");
    let searches = store ? JSON.parse(store) : [];

    if (!searches.includes(product?.name)) {
      searches.push(product?.name);
      localStorage.setItem("searches", JSON.stringify(searches));
    }
  };

  useEffect(() => {}, [products, categories]);

  useEffect(() => {
    getRecommendations(products, categories, setRecommendations);
    setDisplayImage(product?.images[0]?.url);
    saveSearchedItem();
  }, [product, categories]);

  return (
    <div className=" text-default-600 gap-[1.6875rem] ">
      <div className="flex md:flex-row flex-col ">
        <div className="md:w-1/2  p-8 md:pl-[15%] h-full flex  flex-col-reverse gap-4 ">
          <div className="md:w-[15%]  flex  rou  flex-row gap-4 rounded ">
            {product?.images.slice(0, 6).map((img: { url: string }) => (
              <img
                key={img.url}
                src={img.url}
                alt=""
                className=" md:w-full w-[20%] object-contain cursor-pointer shadow aspect-square rounded"
                onClick={() => {
                  setDisplayImage(img.url);
                }}
              />
            ))}
          </div>
          <div className=" shadow-md rounded border max-w-[500px] h-fit overflow-hidden">
            <img src={displayImage} alt="" className=" w-full object-contain rounded aspect-square" />
          </div>
        </div>

        <div className="md:w-1/2 p-10 md:py-12 pt-4 md:pr-[15%] bg-white relative gap-4 flex flex-col ">
          <div className="items-center flex justify-between    ">
            <h1 className=" text-xl font-semibold text-default-900 ">{product?.name}</h1>
            <ShareIcon className="size-4 cursor-pointer" />
          </div>

          <div className=" p-1 items-center flex gap-3  ">
            <div className="flex gap-1 ">
              {Array.from({ length: 5 }).map((_, index) => {
                if (index < Math.floor(product?.star)) {
                  return <ImStarFull key={index} className="size-4 text-[gold] fill-[gold]" />;
                } else if (index === Math.floor(product?.star) && product?.star % 1 !== 0) {
                  return <ImStarHalf key={index} className="size-4 fill-[gold] text-[gold]" />;
                } else {
                  return <ImStarEmpty key={index} className="size-4 " />;
                }
              })}
            </div>
            <div className=" flex items-center gap-3">
              <div className="text-xs text-secondary">({product?.reviews.length} reviews)</div>
              <div className="border-r border h-[16px]"></div>
              <div className="">
                {product?.inStock ? (
                  <div className=" text-xs">(In-stock)</div>
                ) : (
                  <div className="text-xs text-danger ">Out of stock</div>
                )}
              </div>
            </div>
          </div>
          <div className="gap-4 flex items-center">
            <p className=" font-semibold ">{formatCurrency(parseInt(product?.price))}</p>
            <p className="text-danger text-xs ">-{product?.discount}%</p>
          </div>

          <div className=" flex justify-between items-center space-y-2">
            <div className="">
              <div className="flex items-center gap-2 border w-fit border-primary rounded  ">
                <button
                  className="text-primary bg-transparent border-r border-primary  px-2 py-1   hover:bg-primary hover:text-white"
                  onClick={() => handleremove(product.id)}
                >
                  <MinusIcon className="size-4" />
                </button>
                <p className="text-sm">{item?.cartQuantity > 0 ? item?.cartQuantity : "0"}</p>
                <button
                  className="text-primary bg-transparent border-l border-primary  px-2 py-1   hover:bg-primary hover:text-white"
                  onClick={() => handleAdd(product)}
                >
                  <PlusIcon className="size-4" />
                </button>
              </div>
            </div>
            <HeartIcon
              className={
                product?.liked
                  ? "hover:scale-110 ease-in-out size-6 fill-danger text-red-500 cursor-pointer "
                  : "text-red-500 cursor-pointer hover:scale-110 ease-in-out size-6"
              }
            />
          </div>

          <div className=" flex items-center justify-between gap-6">
            <Button
              size="md"
              radius="none"
              className="text-white rounded w-full mt-2  bg-primary "
              onClick={() => handlePress(product)}
              startContent={<BiCart size={18} />}
            >
              Add to cart
            </Button>
            <Button
              size="md"
              radius="none"
              className="text-white rounded w-full mt-2  bg-accent "
              onClick={() => handlePress(product)}
              startContent={<BiCart size={18} />}
            >
              Buy now
            </Button>
          </div>
          <div className="">
            <div className="border rounded-md">
              <div className="flex border-b gap-10 p-3 ">
                <img src={delivery} alt="" className=" w-8" />
                <div className="">
                  <h1 className=" font-semibold">Delivery</h1>
                  <p className="text-xs">
                    Delivery Fees ₦ 620 Ready for delivery between 24 June & 26 June when you order within next 3mins
                  </p>
                </div>
              </div>
              <div className="flex  gap-10 p-3 ">
                <img src={returnicon} alt="" className=" w-8" />
                <div className="">
                  <h1 className=" font-semibold">Return Policy</h1>
                  <p className="text-xs">Free return within 7 days for ALL eligible itemsDetails</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" bg-primary/5 md:p-20 p-8 pt-10 gap-10 flex md:flex-row flex-col ">
        <div className={` bg-white md:w-2/3  flex-1 md:p-4 overflow-hidden rounded-lg shadow-md `}>
          <div className="flex justify-between border-b border-gray-200 ">
            <div
              className={`text-sm w-full text-center cursor-pointer px-4 py-2 ${
                activeTab === "Specifications" ? "bg-primary text-white" : "hover:bg-gray-200"
              }`}
              onClick={() => handleTabClick("Specifications")}
            >
              Specifications
            </div>
            <div
              className={`text-sm w-full text-center cursor-pointer px-4 py-2 ${
                activeTab === "Reviews" ? "bg-primary text-white" : "hover:bg-gray-200"
              }`}
              onClick={() => handleTabClick("Reviews")}
            >
              Reviews
            </div>

            <div
              className={`text-sm w-full text-center cursor-pointer px-4 py-2 ${
                activeTab === "Marchant" ? "bg-primary text-white" : "hover:bg-gray-200"
              }`}
              onClick={() => handleTabClick("Marchant")}
            >
              Marchant
            </div>
          </div>

          <div className="p-4 max-h-[25rem] text-sm  overflow-auto scrollbar-hide ">
            {activeTab === "Specifications" && <p className="text-gray-700">{product?.description}</p>}
            {activeTab === "Reviews" && (
              <div className="">
                <form
                  onSubmit={handleSubmit(submitHandler)}
                  className=" w-full px-4 py-2 mb-4  bg-gray-50 rounded-full  flex items-center gap-3 "
                >
                  <div className="w-full  flex items-center gap-3 flex-wrap">
                    <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Avatar>
                        <AvatarImage
                          className=" w-full h-full overflow-hidden rounded-full "
                          src={user.profilePicture ? user?.profilePicture[0]?.url : ""}
                        />
                        <AvatarFallback>
                          <span aria-label="avatar" className=" w-full h-full overflow-hidden rounded-full " role="img">
                            <img src={avatar} alt="" />
                          </span>
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    <input
                      type="text" 
                      {...register("comment")}
                      placeholder="Add a comment..."
                      className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-500"
                    />
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleStarClick(star)}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className={`text-gray-400 hover:text-yellow-500 transition-colors ${
                            (hoveredRating ? hoveredRating >= star : rating >= star) ? "text-yellow-500" : ""
                          }`}
                          aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`}
                        >
                          <Star
                            className="h-5 w-5"
                            fill={(hoveredRating ? hoveredRating >= star : rating >= star) ? "currentColor" : "none"}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {isPending ? (
                    <Loader2 width="15" height="15" />
                  ) : (
                    <button
                      type="submit"
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                        aria-label="Submit comment"
                        
                    >
                      <SendHorizontal className="h-5 w-5 cursor-pointer " />
                      <span className="sr-only">Submit comment</span>
                    </button>
                  )}
                </form>
                {product.reviews.length > 0 ? (
                  product.reviews.map(
                    (review: {
                      id: string;
                      rating: number;
                      comment: string;
                      createdAt: string;
                      user: { name: string; id: string };
                    }) => (
                      <Review
                        key={ review.id }
                        id={review.id}
                        reviewer={review.user}
                        rating={review.rating}
                        comment={review.comment}
                        createdAt={review.createdAt}
                      />
                    )
                  )
                ) : (
                  <div className=" text-center text-slate-400 py-8 ">No Reviews</div>
                )}
              </div>
            )}
            {activeTab === "Marchant" && (
              <div className="border p-4 rounded-lg shadow-sm mb-4">
                <div className="flex justify-between  border-b p-2 ">
                  <h2 className="md:text-2xl font-semibold mb-4">Merchant Profile</h2>

                  <Avatar>
                    <AvatarImage
                      className=" w-full h-full overflow-hidden rounded-full "
                      src={user.profilePicture ? user?.profilePicture[0]?.url : ""}
                    />
                    <AvatarFallback>
                      <span aria-label="avatar" className=" w-full h-full overflow-hidden rounded-full " role="img">
                        <img src={avatar} alt="" />
                      </span>
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className=" py-4 text-xs md:text-sm  ">
                  <p className="">
                    <strong>Name:</strong> {merchantProfile.name}
                  </p>
                  <p className="">
                    <strong>Description:</strong> {merchantProfile.description}
                  </p>
                  <p className="">
                    <strong>Location:</strong> {merchantProfile.location}
                  </p>
                  <p className="">
                    <strong>Contact:</strong> {merchantProfile.contact}
                  </p>
                  <p className="">
                    <strong>Rating:</strong> {merchantProfile.rating} / 5
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        {recommendations.length > 0 && (
          <div className="bg-white p-4 md:w-1/3 max-h-[270px]  rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Similar Items</h3>
            <div className="h-[85%] overflow-auto scrollbar-hide ">
              {recommendations.map((item: ProductItemProps) => (
                <ul className="list-none text-sm " key={item.name}>
                  <li
                    className="flex items-center mb-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
                    onClick={() => {
                      navigate(`/product/${item.id}`);
                    }}
                  >
                    <img
                      src={item.images[0].url}
                      alt="Rucksack Backpack Large"
                      className="w-16 h-16 border rounded-lg mr-2"
                    />
                    <div>
                      <p className="text-gray-700">{item.name}</p>
                      <p className="text-gray-500">Line Mounts</p>
                      <p className="text-gray-700 font-semibold">{formatCurrency(parseInt(item?.price.toString()))}</p>
                    </div>
                  </li>
                </ul>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

