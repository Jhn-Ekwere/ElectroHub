import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FieldErrors } from "react-hook-form";

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
  setValue?: any;
  option: { value: string | boolean; label: string }[];
  defaultValue?: string | boolean;
}

export default function CustomSelect({
  placeholder,
  variant,
  label,
  register,
  errors,
  name,
  icon,
  labelstyle,
  classStyle,
  option,
  setValue,
  defaultValue,
}: CustomInputProps) { 
  return (
    <div className=" space-y-1">
      {label && <label className={`${labelstyle} text-sm `}>{label}</label>}

      <div
        className={`flex  items-center gap-2 ${
          variant === "bordered" && "border"
        } ${classStyle} focus:border-green-500 p-1 px-2  rounded-sm`}
      >
        <>{icon}</>

        <Select
          className={`${classStyle} px-2 focus: ring-0 outline-none `}
          onValueChange={(value) => setValue(name, value)}
          defaultValue={defaultValue}
          {...register(name)}
        >
          <SelectTrigger>
            <SelectValue placeholder={placeholder} className="placeholder:text-xs text-xs" />
          </SelectTrigger>
          <SelectContent>
            {option &&
              option.map((item, index) => (
                <SelectItem key={index} value={String(item.value)}>
                  {item.label}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">
          {typeof errors[name]?.message === "string" ? errors[name].message : "This field is required"}
        </p>
      )}
    </div>
  );
}
