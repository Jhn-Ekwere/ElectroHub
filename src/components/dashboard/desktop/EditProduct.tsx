import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCategoriesEP, fetchSubCategoriesEP, updateProductsEP } from "../../../services";
import { CategoryProps, CreateProductProps, ProductItemProps, SubCategoryProps } from "@/types";
import Modal from "@/components/modal";
import CustomInput from "@/components/useinput";
import { z } from "zod";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomTextarea from "@/components/usetextarea";
import CustomSelect from "@/components/useSelect";
import { Button } from "@nextui-org/button";
import { image } from "@nextui-org/theme";

interface EditProductProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  product?: ProductItemProps;
}

const schema = z.object({
  name: z.string().optional(),
  price: z.string().optional(),
  discount: z.string().optional(),
  description: z.string().optional(),
  quantity: z.string().optional(),
  category: z.string().optional(),
  subCategory: z.string().optional(),
  isFeatured: z.boolean().optional(),
  isProductNew: z.boolean().optional(),
  manufacturer: z.string().optional(),
  inStock: z.boolean().optional(),
});

export function EditProduct({ isOpen, setIsOpen, product }: EditProductProps) {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [data, setData] = useState({});
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateProductProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      price: "",
      discount: "",
      description: "",
      quantity: "",
      category: "",
      subCategory: "",
      isFeatured: false,
      isProductNew: false,
      manufacturer: "",
      inStock: false,
    },
  });
  const { data: subCategories } = useQuery({
    queryKey: ["subCategories"],
    queryFn: fetchSubCategoriesEP,
    staleTime: 20 * 1000,
  });
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategoriesEP,
    staleTime: 20 * 1000,
  });
  // When product loads, reset the form with its values
  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        price: product.price.toString(),
        discount: product.discount !== null && product.discount !== undefined ? product.discount.toString() : "0",
        description: product.description,
        quantity: product.quantity.toString(),
        category: product.category && product.category.length > 0 ? product.category[0].id : "",
        //@ts-ignore
        subCategory: product.subcategory?.[0]?.id ?? "",
        isFeatured: product.isFeatured ?? false,
        isProductNew: product.isProductNew ?? false,
        manufacturer: product.manufacturer,
        inStock: product.inStock ?? false,
      });
    }
  }, [product, categories, reset]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    const imageFiles = files.filter((file) =>
      ["image/png", "image/jpg", "image/jpeg", "image/webp"].includes(file.type)
    );
    setSelectedImages((prev) => [...prev, ...imageFiles.map((file) => URL.createObjectURL(file))]);
    setImages((prev) => [...prev, ...imageFiles]);
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const droppedFiles = Array.from(event.dataTransfer.files);
    const imageFiles = droppedFiles.filter((file) =>
      ["image/png", "image/jpg", "image/jpeg", "image/webp"].includes(file.type)
    );
    const imageUrls = imageFiles.map((file) => URL.createObjectURL(file));
    setSelectedImages((prevImages) => [...prevImages, ...imageUrls]);
    setImages((prev) => [...prev, ...imageFiles]);
  }, []);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: { formData: FormData; id: string }) => updateProductsEP(data.formData, data.id), // Accept both formData and id
    onSuccess: () => {
      toast.success("Product updated successfully");
      setSelectedImages([]);
      setData({});
      // Refetch the products query after a successful mutation
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setIsOpen(false);
      reset(); // Reset the form after successful update
      setImages([]); // Clear the images state
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to update product");
      setIsOpen(false);
      setSelectedImages([]);
    },
  });

  const submitHandler = async (data: any) => {
    const formData = new FormData();
    data?.name && formData.append("name", data?.name);
    data?.price && formData.append("price", data?.price || 0);
    data?.discount && formData.append("discount", data?.discount || 0);
    data?.description && formData.append("description", data?.description);
    data?.quantity && formData.append("quantity", data?.quantity || 0);
    data?.category && formData.append("category", data?.category);
    data?.subCategory && formData.append("subCategory", data?.subCategory);
    data?.stock && formData.append("inStock", data?.stock);
    data?.manufacturer && formData.append("manufacturer", data?.manufacturer);
    data?.isProductNew && formData.append("isProductNew", data?.isProductNew);
    data?.isFeatured && formData.append("isFeatured", data?.isFeatured);

    const files = images.length > 0 ? images : (document.getElementById("images") as HTMLInputElement)?.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        // check for file type and allow png, jpg, jpeg, webp
        if (["image/png", "image/jpg", "image/jpeg", "image/webp"].includes(files[i].type)) {
          formData.append("images", files[i]);
        }
      }
    }

    try {
      if (product) {
        await mutateAsync({ formData, id: product.id });
      } else {
        toast.error("Product is undefined");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to Update product");
    }
  };

  const featured = [
    {
      label: "Featured",
      value: "true",
    },
    {
      label: "Not Featured",
      value: "false",
    },
  ];
  const ProductNew = [
    {
      label: " New ",
      value: "true",
    },
    {
      label: "Old",
      value: "false",
    },
  ];

  const Stock = [
    {
      label: "In-Stock",
      value: "true",
    },
    {
      label: "Out of Stock",
      value: "false",
    },
  ];

  useEffect(() => {
    if (!isOpen) {
      setSelectedImages([]);
      setData({});
      setImages([]);
      reset(); // Reset the form when the modal is closed
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Update Product">
      <>
        <div className="mt-4">
          <div className=""></div>
          <form className="grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={handleSubmit(submitHandler)}>
            <div
              className="mt-1 block w-full border-2 border-gray-300 border-dashed rounded-md shadow-sm p-4 text-center cursor-pointer col-span-2 "
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => document.getElementById("images")?.click()}
            >
              {selectedImages.length === 0 && product?.images && product.images.length > 0 ? (
                <div className="flex space-x-2 overflow-x-auto justify-center mt-2">
                  {product.images.map((image, index) => (
                    <img key={index} src={image.url} alt="preview" className="h-60 object-cover rounded-md" />
                  ))}
                </div>
              ) : (
                selectedImages.length === 0 && <span className="text-default-400">No images uploaded yet.</span>
              )}
              {selectedImages.length === 0 && (
                <span className="text-default-400"> Click to select or drop images here.</span>
              )}
              <input
                type="file"
                id="images"
                name="images"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageChange}
              />
              <div className="flex space-x-2 overflow-x-auto justify-center mt-2">
                {selectedImages.map((image, index) => (
                  <img key={index} src={image} alt="preview" className="h-60 object-cover rounded-md" />
                ))}
              </div>
            </div>

            <CustomInput
              type="text"
              variant="bordered"
              label="Product Name"
              name="name"
              placeholder={"Enter product title"}
              errors={errors}
              classStyle="mt-10  "
              labelstyle=" "
              register={register}
            />
            <CustomInput
              type="text"
              variant="bordered"
              label="Price"
              name="price"
              placeholder={"Enter product price"}
              errors={errors}
              classStyle="mt-10  "
              labelstyle=" "
              register={register}
            />
            <CustomInput
              type="text"
              variant="bordered"
              label="Discount"
              name="discount"
              placeholder={"Enter product discount"}
              errors={errors}
              classStyle="mt-10  "
              labelstyle=" "
              register={register}
            />
            <CustomInput
              type="text"
              variant="bordered"
              label="Manufacturer"
              name="manufacturer"
              placeholder={"Enter manufacturer"}
              errors={errors}
              classStyle="mt-10  "
              labelstyle=" "
              register={register}
            />
            <CustomInput
              type="text"
              variant="bordered"
              label="Quantity"
              name="quantity"
              placeholder={"Enter product quantity"}
              errors={errors}
              classStyle="mt-10  "
              labelstyle=" "
              register={register}
            />
            <CustomSelect
              variant="bordered"
              label="Featured"
              name="isFeatured"
              // placeholder=" featured"
              errors={errors}
              classStyle="mt-10  "
              labelstyle=" "
              register={register}
              setValue={setValue}
              placeholder={product?.isFeatured === true ? featured[1].label : featured[0].label || "Select featured"}
              option={featured}
            />
            <CustomSelect
              variant="bordered"
              label="New"
              name="isProductNew"
              // placeholder="Select product new"
              errors={errors}
              classStyle="mt-10  "
              labelstyle=" "
              setValue={setValue}
              register={register}
              placeholder={
                product?.isProductNew === true ? ProductNew[0].label : ProductNew[1].label || "Select product new"
              }
              option={ProductNew}
            />
            <CustomSelect
              variant="bordered"
              label="Category"
              name="category"
              // placeholder=" Select product category"
              errors={errors}
              classStyle="mt-10  "
              labelstyle=" "
              setValue={setValue}
              register={register}
              option={
                categories &&
                categories.map((category: CategoryProps) => ({
                  label: category.name,
                  value: category.id,
                }))
              }
              placeholder={product?.category[0]?.name || "Select category"}
            />
            <CustomSelect
              variant="bordered"
              label="Sub-Category"
              name="subCategory"
              // placeholder="category"
              errors={errors}
              classStyle="mt-10  "
              labelstyle=" "
              register={register}
              setValue={setValue}
              option={
                subCategories &&
                subCategories.map((subCategory: SubCategoryProps) => ({
                  label: subCategory.name,
                  value: subCategory.id,
                }))
              }
              //@ts-ignore
              placeholder={product?.subcategory[0]?.name || "Select sub-category"}
            />
            <CustomSelect
              variant="bordered"
              label="Stock Status"
              name="inStock"
              // placeholder=""
              errors={errors}
              classStyle="mt-10  "
              labelstyle=" "
              register={register}
              setValue={setValue}
              defaultValue={featured[0].value}
              option={Stock}
              placeholder={product?.inStock === true ? Stock[0].label : Stock[1].label || "Select stock status"}
            />
            <div className="col-span-2">
              <CustomTextarea
                variant="bordered"
                label="Description"
                name="description"
                placeholder={"Enter product description"}
                errors={errors}
                classStyle="mt-10  "
                labelstyle=" "
                register={register}
              />
            </div>
            <div className="mt-6 flex justify-end gap-3 col-span-2 ">
              <button
                type="button"
                className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 "
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <Button
                type="submit"
                isLoading={isPending}
                className="py-2 px-4 bg-primary/90 hover:bg-primary rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Update
              </Button>
            </div>
          </form>
        </div>
      </>
    </Modal>
  );
}
