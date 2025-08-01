import React from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Input } from "./ui/input";
import { FieldErrors } from "react-hook-form";

interface CustomInputProps {
  type: string;
  placeholder?: string;
  variant?: string;
  label?: string;
  register: any;
  errors: FieldErrors;
  name: string;
  icon?: React.ReactNode;
  labelstyle?: string;
  classStyle?: string;
}

export default function CustomInput({
  type,
  placeholder,
  variant,
  label,
  register,
  errors, 
  name,
  icon,
  labelstyle, 
  classStyle,
  
}: CustomInputProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className=" space-y-1">
      {label && <label className={`${labelstyle} text-sm `}>{label}</label>}

      <div
        className={`flex  items-center gap-2 ${
          variant === "bordered" && "border"
        } ${classStyle} focus:border-green-500 p-1 px-2  rounded-sm`}
      >
        <>{icon}</>
        <Input
          type={type === "password" ? (isVisible ? "text" : "password") : type}
          placeholder={placeholder}
          {...register(name)}
          className={` placeholder:text-xs text-xs `}
          data-cy={ name }
        />

        {type === "password" ? (
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
            aria-label="toggle password visibility"
          >
            {isVisible ? (
              <EyeSlashIcon className="size-5 text-default-400 pointer-events-none" />
            ) : (
              <EyeIcon className="size-5 text-default-400 pointer-events-none" />
            )}
          </button>
        ) : null}
      </div>
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1" data-error={name}>
          {typeof errors[name]?.message === "string" ? errors[name].message : "This field is required"}
        </p>
      )}
    </div>
  );
}
