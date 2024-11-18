import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCategoriesEP, fetchSubCategoriesEP, updateProductsEP } from "../../../services";
import { CategoryProps, CreateProductProps, ProductItemProps, SubCategoryProps } from "@/types";
import Modal from "@/components/modal";
import CustomInput from "@/components/useinput";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomTextarea from "@/components/usetextarea";
import CustomSelect from "@/components/useSelect";
import { Button } from "@nextui-org/button";

interface EditProductProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  product?: ProductItemProps;
}

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
  manufacturer: z.string(),
  inStock: z.string(),
});

export function EditProduct({ isOpen, setIsOpen, product }: EditProductProps) {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [data, setData] = useState({});
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateProductProps>({
  
    defaultValues: {
      name: product?.name,
      price: product?.price,
      discount: product?.discount,
      description: product?.description,
      quantity: product?.quantity,
      // category: product?.category?.map((cat) => cat.id),
      // subCategory: product?.subCategory,
      isFeatured: product?.isFeatured,
      // isProductNew: product?.isProductNew,
      manufacturer: product?.manufacturer,
      inStock: product?.inStock,
    },
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
    mutationFn: (data: { formData: FormData; id: string }) => updateProductsEP(data.formData, data.id), // Accept both formData and id
    onSuccess: () => {
      toast.success("Product updated successfully");
      setSelectedImages([]);
      setData({});
      // Refetch the products query after a successful mutation
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to update product");
    },
  });

  const submitHandler = async (data: any) => {
    console.log(data);
    const formData = new FormData();
    data?.name && formData.append("name", data?.name);
    data?.price && formData.append("price", data?.price);
    data?.discount && formData.append("discount", data?.discount);
    data?.description && formData.append("description", data?.description);
    data?.quantity && formData.append("quantity", data?.quantity);
    data?.category && formData.append("category", data?.category);
    data?.subCategory && formData.append("subCategory", data?.subCategory);
    data?.stock && formData.append("inStock", data?.stock);
    data?.manufacturer && formData.append("manufacturer", data?.manufacturer);
    data?.isProductNew && formData.append("isProductNew", data?.isProductNew);
    data?.isFeatured && formData.append("isFeatured", data?.isFeatured);

    const files = (document.getElementById("images") as HTMLInputElement)?.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
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
      label: "Product is new ",
      value: "true",
    },
    {
      label: "Not new",
      value: "false",
    },
  ];

  const Stock = [
    {
      label: "In Stock",
      value: "true",
    },
    {
      label: "Out of Stock",
      value: "false",
    },
  ];

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Update Product">
      <>
        <div className="mt-4">
          <form className="grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={handleSubmit(submitHandler)}>
            <div
              className="mt-1 block w-full border-2 border-gray-300 border-dashed rounded-md shadow-sm p-4 text-center cursor-pointer col-span-2 "
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
              label="Product Name"
              name="name"
              placeholder={ "Enter product title"}
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
              placeholder={  "Enter product price"}
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
              placeholder={ "Enter product discount"}
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
              placeholder={ "Enter manufacturer"}
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
              placeholder={  "Enter product quantity"}
              errors={errors}
              classStyle="mt-10  "
              labelstyle=" "
              register={register}
            />

            <CustomSelect
              variant="bordered"
              label="Is Featured"
              name="isFeatured"
              placeholder=" featured"
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
              placeholder="Select product new"
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
              placeholder=" Select product category"
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
              placeholder="category"
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

            <CustomSelect
              variant="bordered"
              label="Stock Status"
              name="inStock"
              placeholder=""
              errors={errors}
              classStyle="mt-10  "
              labelstyle=" "
              register={register}
              setValue={setValue}
              // defaultValue={featured[0].value}
              option={Stock}
            />

            <div className="col-span-2">
              <CustomTextarea
                variant="bordered"
                label="Description"
                name="description"
                placeholder={ "Enter product description"}
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
        </div>     </form>
        </div>
      </>
    </Modal>
  );
}
