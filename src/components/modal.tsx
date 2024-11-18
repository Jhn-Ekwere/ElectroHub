import React from "react";

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  setIsOpen: (isOpen: boolean) => void;
  title?: string;
}

export default function Modal({ isOpen, children, setIsOpen, title }: ModalProps) {
  return (
    <div
      className={`modal ${
        isOpen ? "fixed" : "hidden"
      } fixed inset-0 z-50   flex items-center  justify-center p-4`}
      onClick={() => setIsOpen(false)}
    >
      <div className="py-6 max-w-md  bg-white rounded-lg max-h-[90vh] border shadow-lg relative animate-in fade-in zoom-in duration-200">
        <div
          className=" 
         overflow-auto max-h-[80vh] 
         w-full    "
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col justify-between items-center mb-4 py-4 p-4 ">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
