import React, { useContext, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import { api } from "../../api";
import Error from "../../components/Error";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const { setUser } = useContext(AuthContext);
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data } = await api.post(
        "http://localhost:3000/auth/login",
        formData
      );
      const { token, user } = data;
      localStorage.setItem("token", token);
      setUser(user);
      setError("");
      nav("/products");
    } catch (err) {
      console.log(err);
      if (err.status === 401) {
        setError("Email or password is incorrect");
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
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            {isLoading ? "Loading..." : "Login"}
          </button>
          <Error error={error} />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
