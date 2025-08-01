import React from "react"; 
import { FieldErrors } from "react-hook-form"; 
import { Textarea } from "./ui/textarea";

interface CustomInputProps { 
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

export default function CustomTextarea({ 
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
        className={`flex  items-center  ${
          variant === "bordered" 
        } ${classStyle}   rounded-sm`}
      >
        <>{icon}</>
        <Textarea placeholder={placeholder} {...register(name)} className={``} />
      </div>
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">
          {typeof errors[name]?.message === "string" ? errors[name].message : "This field is required"}
        </p>
      )}
    </div>
  );
}
