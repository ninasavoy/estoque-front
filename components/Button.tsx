import React from "react";

export default function Button({ text, onClick, type = "submit" }: any) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition w-full"
    >
      {text}
    </button>
  );
}
