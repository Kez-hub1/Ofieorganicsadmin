// components/Modal.jsx
import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0  backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose} // close on backdrop click
    >
      <div
        className="bg-white p-6 rounded-2xl shadow-lg w-[90%] max-w-md"
        onClick={(e) => e.stopPropagation()} // prevent click bubbling to backdrop
      >
        <button
          className="text-gray-500 float-right mb-2 cursor-pointer"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
