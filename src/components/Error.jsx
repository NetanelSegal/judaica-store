import React from "react";

export default function Error({ error }) {
  if (!error) return null;

  return <p className="text-red-500">{error}</p>;
}
