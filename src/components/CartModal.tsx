import { Button } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../utils/formatter";
import { MinusIcon, PlusIcon, ShoppingBagIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { addToCart, clearCart, deleteFromCart } from "../redux/cartSlice";
import { toast } from "react-toastify";

export default function CartModal({ isCartOpen, handleCart, cartItems }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);

  const handleAdd = (data) => {
    if (data) {
      dispatch(addToCart(data));
    }
  };
  const handleremove = (data) => {
    if (data) {
      dispatch(deleteFromCart(data));
    }
  };
  const handleClear = () => {
    dispatch(clearCart());
  };

  return (
    <div
      className={isCartOpen ? `fixed  top-0  left-0 w-full h-full bg-[#1f1f1f8c] z-50 backdrop-blur-[2px]` : "hidden"}
      onClick={handleCart}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="  bg-white/80 h-full md:w-[400px] w-[75%] absolute shadow-xl flex flex-col right-0 top-0 transition-transform translate-x-0 duration-300 delay-300 ease-in-out "
      >
        <div className=" w-full flex-grow overflow-y-auto scrollbar-hide  ">
          <div className="flex  top-0  relative items-center justify-between text-primary p-5 border-b shadow-md border-primary">
            <h1 className=" font-semibold">My Cart</h1>

            <XMarkIcon className="size-4 absolute top-5 right-5 cursor-pointer" onClick={handleCart} />
          </div>

          {cartItems.cartItems.length > 0 ? (
            cartItems.cartItems.map((item, index) => (
              <div key={index} className="border-b border-default-600 w-full flex items-center gap-4 p-3 ">
                <div className="flex-1 flex gap-2 ">
                  <div className="w-[50px] flex-shrink h-[50px] bg-default/80 rounded overflow-hidden border border-default-200 ">
                    <img src={item?.images[0].url} alt="" className=" w-full h-full object-contain " />
                  </div>
                  <div className=" flex-1 text-xs md:text-sm">
                    <div className="  overflow-hidden  text-default-500  ">{item?.name}</div>
                    <div className="flex  gap-2 items-center">
                      <p className=" ">{formatCurrency(parseInt(item.price))}</p>
                      <p className="text-danger text-xs ">{item.discount}%</p>
                    </div>
                  </div>
                </div>
                <div className="flex  tems-center justify-between ">
                  <div className="flex items-center gap-2  ">
                    <button className="text-primary bg-transparent border border-primary rounded-full  hover:bg-primary hover:text-white">
                      <MinusIcon className="size-4" onClick={() => handleremove(item.id)} />
                    </button>
                    <p className="text-sm">{item?.cartQuantity}</p>
                    <button className="text-primary bg-transparent border border-primary rounded-full  hover:bg-primary hover:text-white">
                      <PlusIcon className="size-4" onClick={() => handleAdd(item)} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-72 ">
              <p className="text-default-500">No items in cart</p>
            </div>
          )}
        </div>
        <div className="  space-y-2 p-4 pb-0 border-t shadow-lg border-primary">
          <div className=" w-[40%]">
            <p className=" text-xs">Subtotal:</p>
            <h1 className="font-bold">{formatCurrency(parseInt(cartItems?.cartTotalAmount))}</h1>
          </div>
          <div className="">
            <Button
              className=" w-full bg-primary rounded-none text-white border   font-semibold "
              onClick={() => {
                if (!user?.id) {
                  toast.error("Please login to continue");
                  navigate("/auth/login");
                } else if (cartItems.cartItems.length > 0) {
                  navigate("/checkout");
                }
              }}
            >
              <ShoppingBagIcon className="size-4" />
              Checkout
            </Button>
            <Button variant="fade" className=" w-full  font-semibold " onClick={handleClear}>
              Clear
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
