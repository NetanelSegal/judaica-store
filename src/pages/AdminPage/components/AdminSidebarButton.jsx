import React from "react";

export default function AdminSidebarButton({ onClick, active, label }) {
  return (
    <button
      className={`py-2 px-4 rounded text-left ${
        active ? "bg-blue-600 text-white" : "bg-gray-200"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
