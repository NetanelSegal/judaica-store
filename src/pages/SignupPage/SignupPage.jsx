import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const SignupPage = () => {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "http://localhost:3000/auth/signup",
        formData
      );
      setError("");
      nav("/login");
    } catch (err) {
      console.error(err);
      if (err.status === 409) {
        setError("User already exists");
        return;
      }
      setError("something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EAE0D6] py-12 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-[#22333B] text-center mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-[#22333B] font-semibold mb-1"
            >
              Name:
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22333B]"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-[#22333B] font-semibold mb-1"
            >
              Email:
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22333B]"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-[#22333B] font-semibold mb-1"
            >
              Password:
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22333B]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#22333B] text-white py-2 rounded-xl font-semibold text-lg mt-4 hover:bg-[#1a2630] transition-colors"
          >
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
