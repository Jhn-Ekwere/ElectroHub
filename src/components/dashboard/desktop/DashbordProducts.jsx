import { EyeIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { ProductTable } from "./ProductTable";
import { CreateProduct } from "./CreateProduct";

export function DashbordProducts() {
  const [productSubTab, setProductSubTab] = useState("View Products"); // New state for sub-navigation

  const renderProductContent = () => {
    switch (productSubTab) {
      case "View Products":
        return <ProductTable />;
      case "Create Product":
        return <CreateProduct />;
      default:
        return <div>Here are your products</div>;
    }
  };
  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <button
          className={`px-4 py-2 flex items-center justify-center gap-2 rounded transition-colors duration-200 ${
            productSubTab === "View Products" ? "bg-primary text-white" : "bg-gray-200 text-gray-800"
          } hover:bg-primary/90 hover:text-white`}
          onClick={() => setProductSubTab("View Products")}
        >
          <EyeIcon className="size-4" /> View Products
        </button>
        <button
          className={`px-4 py-2 flex items-center justify-center gap-2 rounded transition-colors duration-200 ${
            productSubTab === "Create Product" ? "bg-primary text-white" : "bg-gray-200 text-gray-800"
          } hover:bg-primary/90 hover:text-white`}
          onClick={() => setProductSubTab("Create Product")}
        >
          <PlusIcon className="size-4" /> Create Product
        </button>
      </div>
      {renderProductContent()}
    </div>
  );
}
