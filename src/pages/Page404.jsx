import React from "react";
import { Link } from "react-router";

export default function Page404() {
  return (
    <div className="flex flex-col gap-2 text-center justify-center items-center h-screen">
      <h1 className="text-3xl font-bold">404</h1>
      <p>Page Not Found</p>
      <Link to={"/"} className="text-blue-500 hover:underline">
        Go to Home
      </Link>
    </div>
  );
}
