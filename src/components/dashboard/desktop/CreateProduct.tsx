import React, { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { Button } from "@nextui-org/button";
import { createProductsEP, fetchCategoriesEP, fetchSubCategoriesEP } from "../../../services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CategoryProps, CreateProductProps, ProductItemProps, SubCategoryProps } from "@/types";
import CustomInput from "@/components/useinput";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomSelect from "@/components/useSelect";
import CustomTextarea from "@/components/usetextarea";

const schema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  price: z.string().min(1, { message: "Price must be at least 1 characters" }),
  discount: z.string(),
  description: z.string().min(3, { message: "Name must be at least 3 characters" }),
  quantity: z.string(),
  category: z.string().min(1, { message: "Select one category" }),
  subCategory: z.string(),
  isFeatured: z.string(),
  isProductNew: z.string(),
});

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
    label: "Product is new ",
    value: "true",
  },
  {
    label: "Not new",
    value: "false",
  },
];

// Product management component
interface CreateProps {
  setProductSubTab: (tab: string) => void;
}

export const CreateProduct = ({ setProductSubTab }: CreateProps) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]); 
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateProductProps>({
    resolver: zodResolver(schema),
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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileArray = Array.from(event.target.files).map((file) => URL.createObjectURL(file));
      setSelectedImages((prevImages) => [...prevImages, ...fileArray]);
    }
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      const fileArray = Array.from(event.dataTransfer.files).map((file) => URL.createObjectURL(file));
      setSelectedImages((prevImages) => [...prevImages, ...fileArray]);
    }
  }, []);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createProductsEP,
    onSuccess: () => {
      toast.success("Product created successfully");
      setProductSubTab("View Products");
      setSelectedImages([]);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to create product");
    },
  });

  const submitHandler = async (data: any) => {
    const formData = new FormData();
    const fields = ["name", "price", "discount", "description", "quantity", "category", "subCategory"];
    const isFeatured = Boolean(data.isFeatured)

    fields.forEach((field) => formData.append(field, data[field])); 
    //@ts-ignore
formData.append("isFeatured", isFeatured);

    const files = (document.getElementById("images") as HTMLInputElement)?.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }
    }
    try { 
      await mutateAsync(formData);
    } catch (error) {
      console.error(error);
    }
  }; 

  return (
    <div className="max-w-lg mx-auto border p-4 bg-white/80 shadow-md rounded-lg">
      <form className="space-y-4" onSubmit={handleSubmit(submitHandler)}>
        <div
          className="mt-1 block w-full  border border-dashed rounded-md shadow-sm p-4 text-center cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => document.getElementById("images")?.click()}
        >
          <input type="file" id="images" name="images" multiple className="hidden" onChange={handleImageChange} />
          <span className=" text-default-400"> Click to select or drop images here.</span>
          <div className="flex space-x-2 overflow-x-auto justify-center mt-2">
            {selectedImages.map((image, index) => (
              <img key={index} src={image} alt="preview" className="h-60 object-cover rounded-md" />
            ))}
          </div>
        </div>
        <CustomInput
          type="text"
          variant="bordered"
          label="Title"
          name="name"
          placeholder="Enter product title"
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
          placeholder="Enter product price"
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
          placeholder="Enter product discount"
          errors={errors}
          classStyle="mt-10  "
          labelstyle=" "
          register={register}
        />

        <CustomTextarea 
          variant="bordered"
          label="Description"
          name="description"
          placeholder="Enter product description"
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
          placeholder="Enter product quantity"
          errors={errors}
          classStyle="mt-10  "
          labelstyle=" "
          register={register}
        />

        <CustomSelect
          variant="bordered"
          label="Is Featured"
          name="isFeatured"
          placeholder="Select product Featured"
          errors={errors}
          classStyle="mt-10  "
          labelstyle=" "
          register={register}
          setValue={setValue}
          // defaultValue={featured[0].value}
          option={featured}
        />

        <CustomSelect
          variant="bordered"
          label="Is Product new"
          name="isProductNew"
          placeholder="Select if product New"
          errors={errors}
          classStyle="mt-10  "
          labelstyle=" "
          register={register}
          setValue={setValue}
          // defaultValue={featured[0].value}
          option={ProductNew}
        />

        <CustomSelect
          variant="bordered"
          label="Category"
          name="category"
          placeholder="Select product category"
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
        />

        <CustomSelect
          variant="bordered"
          label="Sub-Category"
          name="subCategory"
          placeholder="Select product sub-category"
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
        />

        <Button
          type="submit"
          isLoading={isPending}
          className="mt-4 w-full bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-md shadow-lg focus:outline-none focus:shadow-outline"
        >
          Create Product
        </Button>
      </form>
    </div>
  );
};
