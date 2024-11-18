import { AdjustmentsHorizontalIcon, HeartIcon, ShoppingCartIcon, StarIcon } from "@heroicons/react/24/outline";
import { Button, Card, CardBody, CardFooter, Select, SelectItem, Slider } from "@nextui-org/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { formatCurrency } from "../utils/formatter";
import { addToCart } from "../redux/cartSlice";
import { useQuery } from "@tanstack/react-query";
import { fetchCategoriesEP } from "../services";

export default function SearchResult() {
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchResults = location.state?.results || [];

  const itemsPerPage = 10; // Number of items to display per page

  // Calculate the total number of pages
  const totalPages = Math.ceil(searchResults.length / itemsPerPage);

  // Get the items for the current page
  const currentItems = searchResults.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const { data: categories } = useQuery({
    queryKey: ["category"],
    queryFn: fetchCategoriesEP,
  });
  const handlePress = (data) => {
    if (data) {
      dispatch(addToCart(data));
      toast.success(`${data.name} has been added to your cart`, {
        className: " text-xs",
      });
    }
  };

  return (
    <div className=" flex flex-col flex-grow ">
      <div className="flex md:flex-row flex-grow flex-col  w-full ">
        {/* Filter Options */}
        <div className="md:w-1/8  md:p-6 p-2 px-4 md:text-medium text-[9px] md:justify-start justify-center  border-b pb-4 bg-gray-200 shadow flex flex-row md:flex-col gap-2 border-r border-gray-300">
          {/* <h3 className="md:text-xl text-[11px] font-semibold ">Filter </h3> */}
          {/* Add your filter options here */}
          <div className="md:flex-none flex-1">
            <Select
              placeholder="Categories"
              size="xs"
              startContent={<AdjustmentsHorizontalIcon className="size-4" />}
              className="w-[10em] bg-opacity-0 "
              variant="underlined"
              color="primary"
            >
              {Array.isArray(categories) &&
                categories?.map((item) => (
                  <SelectItem key={item?.id} value={item?.name}>
                    {item?.name}
                  </SelectItem>
                ))}
            </Select>
          </div>
          <div className="md:flex-none flex-1">
            <Select
              size="xs"
              startContent={<StarIcon className="size-4" />}
              className="w-[10em] bg-opacity-0 "
              variant="underlined"
              color="primary"
              placeholder="Rating"
            >
              <SelectItem value="option1">All Ratings</SelectItem>
              <SelectItem value="option1">4 stars & up</SelectItem>
              <SelectItem value="option2">3 stars & up</SelectItem>
              <SelectItem value="option3">2 stars & up</SelectItem>
              <SelectItem value="option3">1 star & up</SelectItem>
            </Select>
          </div>
          <div className="md:flex-none flex-1">
            <label className="block mb-2 text-xs font-medium">Price Range</label>
            <Slider
              min={0}
              max={100}
              size="md"
              className=" w-full h-4 "
              // onChange={handleChange}
            />
          </div>
        </div>

        {/* Search Results */}
        <div className="md:w-7/8 flex-1  md:p-6 px-[5%] pt-4 md:pt-10 ">
          <div className="flex flex-wrap  gap-4 ">
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <div shadow="sm" key={item.id} radius="none" className="md:w-[13em] w-[10em] flex flex-col border ">
                  <div className="overflow-visible  bg-white/80 ">
                    <div className="absolute right-4 top-2 p-1 rounded-full  items-center  bg-white/80  ">
                      <HeartIcon
                        size={20}
                        className={"text-danger size-5 cursor-pointer hover:scale-110"}
                        // onClick={() => handleLike(item)}
                      />
                    </div>
                    <img
                      alt={item?.name}
                      className="w-full object-contain md:h-[10em] aspect-square cursor-pointer "
                      src={item?.images[0]?.url}
                      onClick={() => {
                        navigate(`/product/${item?.id}`, { state: { item } });
                      }}
                    />
                  </div>
                  <div className="text-sm text-left flex flex-col flex-1 justify-between p-2 ">
                    <div className="">
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
                        <p className="text-default-500 ">{formatCurrency(parseInt(item?.price))}</p>
                        <p className="text-danger text-xs line-through ">{formatCurrency(parseInt(item?.discount))}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="bordered"
                      radius="none"
                      className="text-primary w-full mt-2 border-primary  hover:bg-primary hover:text-white "
                      onClick={() => handlePress(item)}
                    >
                      <ShoppingCartIcon className="size-4" />
                      Add to cart
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">No results found.</p>
            )}
          </div>
          {/* Pagination */}
          <div className="flex justify-center my-6 ">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 px-3 py-1 border rounded ${
                  currentPage === index + 1 ? "bg-primary text-white" : "bg-white/80 text-primary border-primary"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
