import React, { useEffect, useState } from "react";

import {
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  ModalFooter,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@nextui-org/react";
import { EditProduct } from "./EditProduct";
import { useSelector } from "react-redux";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProductEP, fetchProductsEP } from "../../../services";
import { usePagination } from "../../pagination";
import { API_URL } from "../../../constant";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatToCustomDate } from "@/utils/formatter";
import { ProductItemProps } from "@/types";
 
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
 
//  products data table function
export const ProductTable = () => {
  const [filtersProducts, setFiltersProducts] = useState([]);
  const [isOpen,  setIsOpen] = useState(false);
  const user = useSelector((state: any) => state.auth);
  const [selectedProduct, setSelectedProduct] = useState<ProductItemProps>();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const itemsPerPage = 10; // Number of items to display per page
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);

  // deleteProductEP;
  // delete product using usemutation and update the cache
  const { mutateAsync } = useMutation({
    mutationFn: (id: string) => deleteProductEP(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const {
    isPending,
    error,
    data: products,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductsEP,
    staleTime: 5 * 1000,
  });
  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  // // Calculate the total number of pages
  // const totalPages = Math.ceil(products.length / itemsPerPage);

  // // Get the items for the current page
  // const currentItems = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // const handlePageChange = (pageNumber: number) => {
  //   setCurrentPage(pageNumber);
  // };

  const { totalPages, currentItems, handlePageChange, handlePreviousPage, handleNextPage } = usePagination(
    products,
    itemsPerPage,
    setCurrentPage,
    currentPage
  );
  const {
    totalPages: totalFilterdPages,
    currentItems: currentFilterdItems,
    handlePageChange: handlePageChangeFilterd,
    handlePreviousPage: handlePreviousPageFiltered,
    handleNextPage: handleNextPageFiltered,
  } = usePagination(filtersProducts, itemsPerPage, setCurrentPage, currentPage);

  // Function filters logistics data based on search input
  const handleSearchOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredData = products.filter((item: ProductItemProps) => {
      return (
        item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.price.toString().toLowerCase().includes(e.target.value.toLowerCase()) ||
        (typeof item.inStock === "boolean" &&
          item.inStock.toString().toLowerCase().includes(e.target.value.toLowerCase()))
      );
    });
    setFiltersProducts(filteredData ? filteredData : products);
  };

  const deleteProduct = async (id: string) => {
    try {
      await mutateAsync(id);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unknown error occurred");
      }
    }
  };

  return (
    <div className="relative">
      <div className="flex  ">
        <div className="flex items-center p-1 px-3 rounded border  text-default-600 placeholder-default-600/70 w-fit  ">
          <input
            type="text"
            placeholder="Search..."
            className="focus:outline-none border-none transition text-sm duration-150 ease-in-out bg-transparent "
            style={{ backdropFilter: "blur(5px)" }}
            onChange={handleSearchOrder}
          />
          <MagnifyingGlassIcon className="size-4 cursor-pointer " />
        </div>
      </div>
      <div className="overflow-x-auto scrollbar-hide relative shadow-md rounded-lg">
        {products.length > 0 ? (
          <>
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Products</CardTitle>
                <CardDescription className="text-xs">
                  Manage your products and view their sales performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Image</span>
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Rating</TableHead>
                      {/* <TableHead className="hidden md:table-cell">Total Sales</TableHead> */}
                      <TableHead className="hidden md:table-cell">Created at</TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-xs">
                    {filtersProducts.length > 0
                      ? currentFilterdItems?.map((product: ProductItemProps) => (
                          <TableRow key={product.id}>
                            <TableCell className="hidden sm:table-cell">
                              <img
                                alt={product.name}
                                className="aspect-square rounded-md object-cover"
                                src={product?.images[0]?.url}
                              />
                            </TableCell>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>{formatCurrency(product.price)}</TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {" "}
                                {product.inStock ? (
                                  <div className=" font-medium ">In stock</div>
                                ) : (
                                  <div className="font-medium ">Out of stock</div>
                                )}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{product.star}</TableCell>
                            {/* <TableCell className="hidden md:table-cell">25</TableCell> */}
                            <TableCell className="hidden md:table-cell">
                              {formatToCustomDate(product.updatedAt)}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button aria-haspopup="true" size="icon" variant="ghost" className="hover:text-white">
                                    <EllipsisVerticalIcon className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedProduct(product);
                                    }}
                                  >
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedProduct(product);
                                      setIsEditOpen(true);
                                    }}
                                  >
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      : currentItems?.map((product: ProductItemProps) => (
                          <TableRow key={product.id}>
                            <TableCell className="hidden sm:table-cell">
                              <img
                                alt={product.name}
                                className="aspect-square rounded-md object-cover"
                                src={product?.images[0]?.url}
                              />
                            </TableCell>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>{formatCurrency(product.price)}</TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {" "}
                                {product.inStock ? (
                                  <div className=" font-medium ">In stock</div>
                                ) : (
                                  <div className="font-medium ">Out of stock</div>
                                )}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{product.star}</TableCell>
                            {/* <TableCell className="hidden md:table-cell">25</TableCell> */}
                            <TableCell className="hidden md:table-cell">
                              {formatToCustomDate(product.updatedAt)}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger>
                                  <Button aria-haspopup="true" size="icon" variant="ghost" className="hover:text-white">
                                    <EllipsisVerticalIcon className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedProduct(product);
                                      setIsOpen(true);
                                    }}
                                    className="flex items-center gap-2"
                                  >
                                    <PencilIcon className="h-4 w-4" />
                                      <span>Edit</span>
                                       
                                  </DropdownMenuItem>

                                  <DropdownMenuItem
                                    onClick={() => {
                                      deleteProduct(product.id);
                                    }}
                                    className="flex text-red-500 items-center gap-2"
                                  >
                                    <TrashIcon className="h-4 w-4" />
                                    <span>Delete</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                {/* Pagination Controls */}
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        className="cursor-pointer hover:text-white"
                        onClick={() => {
                          if (filtersProducts.length > 0) {
                            handlePreviousPageFiltered();
                          } else {
                            handlePreviousPage();
                          }
                        }}
                      />
                    </PaginationItem>
                    {Array.from({ length: filtersProducts.length > 0 ? totalFilterdPages : totalPages }, (_, index) => (
                      <PaginationItem>
                        <PaginationLink
                          key={index}
                          onClick={() => {
                            if (filtersProducts.length > 0) {
                              handlePageChangeFilterd(index + 1);
                            } else {
                              handlePageChange(index + 1);
                            }
                          }}
                          className={`mx-1 px-3 py-1 border cursor-pointer hover:text-white rounded ${
                            filtersProducts.length > 0
                              ? currentPage === index + 1
                                ? "bg-accent text-white"
                                : "bg-white/80 text-accent border-accent"
                              : currentPage === index + 1
                              ? "bg-accent text-white"
                              : "bg-white/80 text-accent border-accent"
                          }`}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext
                        className="cursor-pointer hover:text-white"
                        onClick={() => {
                          if (filtersProducts.length > 0) {
                            handleNextPageFiltered();
                          } else {
                            handleNextPage();
                          }
                        }}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardFooter>
            </Card>
          </>
        ) : (
          <div className=" py-4 mx-auto w-full text-gray-500 text-center ">Empty Product.</div>
        )}
      </div>
 
        <EditProduct isOpen={isOpen} setIsOpen={setIsOpen} product={selectedProduct} />
      
    </div>
  );
};
