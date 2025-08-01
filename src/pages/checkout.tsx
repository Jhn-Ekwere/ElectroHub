import { LockClosedIcon, MinusIcon, PlusIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import logo from "../assets/image/logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../utils/formatter";
import { Button } from "@nextui-org/button";
import { clearCart } from "../redux/cartSlice";
import { InputComponent } from "../components/InputComponent";
import { useState } from "react";
import paypal from "../assets/image/paypal.png";
import visa from "../assets/image/visa.png";
import mastercard from "../assets/image/mastercard.png";
import { useMutation } from "@tanstack/react-query";
import { createNotificationEP, createOrderEP } from "../services";
import { toast } from "react-toastify";

interface PaymentLogo {
  name: string;
  url: string;
}

interface CartItem {
  _id: string;
  cartQuantity: number;
  images: { url: string }[];
  name: string;
  description: string;
  price: string;
}

interface User {
  id: string;
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  phone?: string;
}

interface State {
  cart: {
    cartItems: CartItem[];
    cartTotalAmount: string;
  };
  auth: User;
}
interface PaymentMethodChangeEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & EventTarget;
}
interface OrderData {
  orderId: string;
  status: string;
  id: string;
}

export default function Checkout() {
  const [deliverAddressDone, setDeliverAddressDone] = useState(false);

  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [paymentDone, setPaymentDone] = useState(false);
  const cartItems = useSelector((state: any) => state.cart);
  const [data, setData] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
  });
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth);
  const [profileAddress, setProfileAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const product = useLocation().state?.product;
  const handleApply = () => {
    // Handle applying the gift card or discount code here
    console.log("Gift card or discount code:", code);
  };

  const handleToggle = () => {
    setIsSubscribed(!isSubscribed);
  };

  const paymentLogos = [
    {
      name: "Visa",
      url: visa,
    },
    {
      name: "Mastercard",
      url: mastercard,
    },
    {
      name: "Paypal",
      url: paypal,
    },
  ];

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setProfileAddress(event.target.checked);
  };

  const handlePaymentMethodChange = (event: PaymentMethodChangeEvent): void => {
    setPaymentMethod(event.target.value);
  };

  // Handle submitting the form here
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cartData = [];

    for (let i = 0; i < cartItems.cartItems.length; i++) {
      cartData.push({
        product: cartItems.cartItems[i]._id,
        quantity: cartItems.cartItems[i].cartQuantity,
      });
    }

    const formdate = {
      ...data,
      user: user?.id,
      orderItems: cartData,
      street: profileAddress ? user?.address?.street : data.street,
      city: profileAddress ? user?.address?.city : data.city,
      state: profileAddress ? user?.address?.state : data.state,
      postalCode: profileAddress ? user?.address?.postalCode : data.postalCode,
      country: profileAddress ? user?.address?.country : data.country,
      phone: profileAddress ? user?.phone : data.phone,
    };

    try {
      await mutateAsync(formdate);
    } catch (error) {
      console.error(error);
    }
  };

  const sendNotification = async (data: any) => {
    setOrderData(data);
    const notificationData = {
      recipient: user?.id,
      title: "Order Confirmation Notice ✨📦",
      message: `Your order with id **${data.orderId}** has been created successfully. The current status is **${data.status}**.`,
      orderId: data.id,
      shortId: data.orderId,
    };

    try {
      await mutateNotification(notificationData);
    } catch (error) {
      console.error(error);
    }
  };

  const { mutateAsync: mutateNotification } = useMutation({
    mutationFn: createNotificationEP,
    onSuccess: () => {
      if (orderData) {
        navigate(`/order/${orderData.orderId}`);
      }
      dispatch(clearCart({}));
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createOrderEP,
    onSuccess: (data) => {
      toast.success("Order created successfully");
      sendNotification(data);
    },
    onError: (error) => {
      console.log(error);
      toast.error("failed to create order");
    },
  });

  return (
    <div className=" md:h-screen ">
      <div className="flex px-[10%] fixed w-full bg-white/80  border-b py-3 items-center justify-between">
        {/* logo */}
        <Link to="/" className=" h-10 flex justify-center items-center gap-2 text-primary ">
          <img src={logo} alt="" className="w-10" />
          <h1 className=" font-bold">Electrohub</h1>
        </Link>
        <div className="flex space-x-2 items-center ">
          <LockClosedIcon className="w-5" />
          <h1 className="uppercase font-bold">Checkout</h1>
        </div>
      </div>
      <div className=" flex md:flex-row flex-col-reverse pt-16  ">
        <div className="bg-white/80 md:h-screen p-8 pb-32 overflow-auto scrollbar-hide md:w-3/4  ">
          <div className="  md:pl-[100px] ">
            <h1 className=" border-b pb-4 font-bold mb-6">Delivery Information</h1>
            <form className="max-w-md" onSubmit={submitHandler}>
              {!deliverAddressDone ? (
                <div className=" space-y-4">
                  <h1 className="text-lg uppercase font-bold mb-6">Delivery Address</h1>
                  {user?.address && (
                    <div className="flex items-center space-x-2 ">
                      {/* terms and condition checkbox */}
                      <input type="checkbox" name="" id="" onChange={handleCheckboxChange} />
                      <p className=" text-sm "> Use Home address in profile </p>
                    </div>
                  )}
                  <InputComponent
                    name="street"
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, street: e.target.value })}
                    defaultValue={profileAddress ? user?.address?.street : null}
                  />
                  <InputComponent
                    name="city"
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, city: e.target.value })}
                    defaultValue={profileAddress ? user?.address?.city : null}
                  />
                  <div className="flex space-x-4 w-full">
                    <InputComponent
                      name="state"
                      type="text"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, state: e.target.value })}
                      defaultValue={profileAddress ? user?.address?.state : null}
                    />
                    <InputComponent
                      name="postal code"
                      type="text"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setData({ ...data, postalCode: e.target.value })
                      }
                      defaultValue={profileAddress ? user?.address?.postalCode : null}
                    />
                  </div>
                  <InputComponent
                    name="country"
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, country: e.target.value })}
                    defaultValue={profileAddress ? user?.address?.country : null}
                  />
                  <InputComponent
                    name="phone"
                    type="number"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, phone: e.target.value })}
                    defaultValue={profileAddress ? user?.address?.phone : null}
                  />

                  <div className="">
                    <Button
                      className=" w-full bg-primary rounded-none text-white border font-semibold "
                      onClick={() => {
                        setDeliverAddressDone(true);
                      }}
                    >
                      <ShoppingBagIcon className="size-4" />
                      Continue
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="">
                  <h1 className="text-lg uppercase font-bold mb-6">Payment Method</h1>
                  <div className=" space-y-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="card"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={handlePaymentMethodChange}
                      />
                      <label htmlFor="card" className="text-sm">
                        Card
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="bankTransfer"
                        name="paymentMethod"
                        value="bankTransfer"
                        checked={paymentMethod === "bankTransfer"}
                        onChange={handlePaymentMethodChange}
                      />
                      <label htmlFor="bankTransfer" className="text-sm">
                        Bank Transfer
                      </label>
                    </div>

                    {paymentMethod === "card" && (
                      <>
                        <div className="flex space-x-4">
                          {paymentLogos.map((logo) => (
                            <div key={logo.name} className="border bg-primary/5 rounded-md w-16 h-10 ">
                              <img src={logo.url} alt={logo.name} className=" h-full w-full object-contain" />
                            </div>
                          ))}
                        </div>
                        <InputComponent name="card number" type="text" />
                        <InputComponent name="expiration date" type="text" />
                        <InputComponent name="CVV" type="text" />
                        <InputComponent name="cardholder name" type="text" />
                      </>
                    )}
                    {paymentMethod === "bankTransfer" && (
                      <>
                        <InputComponent name="Account Holder Name" type="text" />
                        <InputComponent name="Bank Name" type="text" />
                        <InputComponent name="Account Number" type="text" />
                        <InputComponent name="Routing Number" type="text" />
                      </>
                    )}

                    <div className="flex items-center space-x-2 ">
                      {/* terms and condition checkbox */}
                      <input type="checkbox" name="" id="" />
                      <p className=" text-sm hover:underline hover:text-primary cursor-pointer ">
                        {" "}
                        I have read and agreed to the Terms and Conditions{" "}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {deliverAddressDone && (
                <div className=" mt-2 ">
                  <Button
                    type="submit"
                    isLoading={isPending}
                    className="w-full bg-primary rounded-none text-white border font-semibold"
                    onClick={() => {
                      setPaymentDone(true);
                    }}
                  >
                    <ShoppingBagIcon className="size-4" />
                    Pay Now
                  </Button>
                </div>
              )}
            </form>{" "}
            <div className="flex border bg-gray-50 max-w-md mt-4 rounded p-2 items-center">
              <input
                type="checkbox"
                className="w-6 h-6 text-primary border-gray-300 rounded focus:ring-primary   "
                checked={isSubscribed}
                onChange={handleToggle}
              />
              <div className="">
                <div className="ml-2 text-sm font-semibold text-gray-900 ">Get SMS alerts about your orders</div>
                <div className="ml-2 text-sm text-gray-500">
                  Stay up to date on your purchase with order confirmation and shipping confirmation messages
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-primary/5 p-10 md:h-screen space-y-5 md:pb-32 overflow-auto scrollbar-hide md:w-2/4 ">
          <h1 className=" font-bold text-center text-xl">Order Summary</h1>
          <div className=" md:max-w-sm  max-w-lg mx-auto border rounded bg-white/80 shadow-sm  ">
            {product ? (
              <div className="border-b  flex items-center gap-4 p-4 ">
                <div className="w-[60px] h-[50px] bg-white/80 rounded overflow-hidden border border-default-200 ">
                  <img src={product?.images[0].url} alt="" className=" w-full h-full object-contain " />
                </div>{" "}
                <div className="md:flex flex-grow gap-4 ">
                  <div className=" flex-grow text-sm">
                    <div className="truncate font-semibold  text-ellipsis overflow-hidden w-[180px] text-default-500  ">
                      {product?.name}
                    </div>
                    <div className="flex gap-2 items-center">
                      <p className=" text-xs truncate w-[180px] text-ellipsis ">{product.description}</p>
                    </div>
                    <div className="flex gap-2 items-center w-[180px]">
                      <p className=" text-xs truncate  text-ellipsis ">Quantity:</p>
                      <p className=" text-xs truncate  text-ellipsis ">{product?.cartQuantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between md:text-sm text-xs ">
                    <p className=" font-bold ">{formatCurrency(parseInt(product.price))}</p>
                  </div>
                </div>
              </div>
            ) : (
              cartItems?.cartItems?.map((item: CartItem) => (
                <div key={item._id} className="border-b  flex items-center gap-4 p-4 ">
                  <div className="w-[60px] h-[50px] bg-white/80 rounded overflow-hidden border border-default-200 ">
                    <img src={item?.images[0].url} alt="" className=" w-full h-full object-contain " />
                  </div>{" "}
                  <div className="md:flex flex-grow gap-4 ">
                    <div className=" flex-grow text-sm">
                      <div className="truncate font-semibold  text-ellipsis overflow-hidden w-[180px] text-default-500  ">
                        {item?.name}
                      </div>
                      <div className="flex gap-2 items-center">
                        <p className=" text-xs truncate w-[180px] text-ellipsis ">{item.description}</p>
                      </div>
                      <div className="flex gap-2 items-center w-[180px]">
                        <p className=" text-xs truncate  text-ellipsis ">Quantity:</p>
                        <p className=" text-xs truncate  text-ellipsis ">{item?.cartQuantity}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:text-sm text-xs ">
                      <p className=" font-bold ">{formatCurrency(parseInt(item.price))}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
            <div className="  space-y-2 p-4  pt-10  shadow-lg ">
              <div className="text-xs flex items-center justify-between ">
                <p className=" font-semibold ">Subtotal:</p>
                <h1 className="">
                  {product ? formatCurrency(product.price) : formatCurrency(parseInt(cartItems?.cartTotalAmount))}
                </h1>
              </div>
              <div className="text-xs flex items-center justify-between ">
                <p className=" font-semibold ">Shipping:</p>
                <h1 className="">FREE</h1>
              </div>
              <div className=" flex text-xs items-center text-red-500 justify-between ">
                <p className=" font-semibold">Discount:</p>
                <h1 className="">-{formatCurrency(parseInt(cartItems?.cartTotalAmount))}</h1>
              </div>
              <div className="flex items-center text-sm ">
                <input
                  type="text"
                  placeholder="Gift card or discount code"
                  className="border  px-3 py-2 flex-1 focus:outline-none"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <button className="bg-gray-200 text-gray-700 px-4 py-2 border hover:bg-gray-300" onClick={handleApply}>
                  Apply
                </button>
              </div>
              <div className=" flex items-center justify-between border-t ">
                <p className=" font-bold">Total:</p>
                <h1 className="font-bold text-xl ">
                  {product ? formatCurrency(product.price) : formatCurrency(parseInt(cartItems?.cartTotalAmount))}
                </h1>
              </div>
            </div>
          </div>

          <div className="border p-4 bg-white/80 mx-auto rounded shadow-sm max-w-sm">
            <h2 className="md:text-lg font-bold mb-2">SHIPPING & DELIVERY</h2>
            <p className="text-gray-700 text-xs mb-4">
              Orders are delivered on business days (Monday-Friday) excluding public holidays.
            </p>
            <a href="#" className="text-primary text-sm hover:underline">
              See details
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
