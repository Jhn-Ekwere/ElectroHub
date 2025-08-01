import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import google from "../assets/image/google_g_icon.svg";
import bg from "../assets/image/bg.svg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import CustomInput from "../components/useinput";
import { loginEP } from "../services";
import { SignInParamsProps } from "@/types";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(5, { message: "Password must conatain at least 5 Characters" }),
});

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInParamsProps>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: loginEP,
    onSuccess: (data) => {
      if (data?.status !== 200) {
        toast.error("Invalid Credentials");
        return;
      }

      dispatch(loginSuccess(data.data));
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Invalid Credentials");
    },
  });

  //  function to handle the form submission
  const submitHandler = async (data: SignInParamsProps) => {
    try {
      await mutateAsync(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-[#0F0F0F] flex h-[100vh] bg-[bg] text-slate-300 w-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative ">
      <img src={bg} alt="" className=" absolute w-full object-contain z-0 " />
      <div className="max-w-sm rounded-lg w-full bg-[#191919] z-20 ">
        <div>
          <h2 className="mt-6 text-center text-2xl font-bold ">Welcome Back</h2>
          <div className="mt-2 flex justify-center ">
            <div className="">Don't have an account yet?</div>
            <p
              className=" text-accent hover:underline ml-1 w-fit cursor-pointer "
              onClick={() => {
                navigate("/auth/signup");
              }}
            >
              Sign up
            </p>
          </div>
        </div>
        <form className="mt-8 p-6 space-y-4" onSubmit={handleSubmit(submitHandler)}>
          <div className="rounded-md shadow-sm text-slate-400 space-y-2">
            <CustomInput
              type="email"
              variant="bordered"
              label="Email"
              name="email"
              placeholder="emailyou@example.com"
              errors={errors}
              classStyle="mt-10 "
              labelstyle=" text-white/90 "
              register={register}
              icon={<EnvelopeIcon className="size-5 text-slate-400 pointer-events-none " />}
            />
            <CustomInput
              type="password"
              variant="bordered"
              label="Password"
              name="password"
              placeholder="Enter your password"
              errors={errors}
              classStyle="mt-10  text-white/90"
              labelstyle=" text-white/90 "
              register={register}
              icon={<LockClosedIcon className="size-4 text-slate-400 pointer-events-none flex-shrink-0" />}
            />
          </div>
          <div className="text-right">
            <p
              className="text-accent text-sm hover:underline cursor-pointer"
              onClick={() => {
                navigate("/auth/forgot-password");
              }}
            >
              Forgot Password?
            </p>
          </div>

          <div>
            <Button
              type="submit"
              isLoading={isPending}
              className=" w-full flex text-slate-300  shadow-md text-sm font-medium rounded-md  bg-accent "
            >
              Login
            </Button>
          </div>

          <div className="flex items-center text-slate-400 gap-4">
            <div className="border-b border-slate-500 w-full"></div>
            <div className="">OR</div>
            <div className="border-b border-slate-500 w-full"></div>
          </div>
          <div className="flex justify-center cursor-pointer">
            <div className=" bg-[#252525] rounded px-10 py-1 ">
              <img src={google} alt="" className=" w-6 h-6" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
