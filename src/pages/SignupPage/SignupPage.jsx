import React, { useState } from "react";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
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
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EAE0D6] py-12 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-[#22333B] text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label htmlFor="name" className="block text-[#22333B] font-semibold mb-1">Name:</label>
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
            <label htmlFor="email" className="block text-[#22333B] font-semibold mb-1">Email:</label>
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
            <label htmlFor="password" className="block text-[#22333B] font-semibold mb-1">Password:</label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22333B]"
            />
          </div>
        <button type="submit" className="w-full bg-[#22333B] text-white py-2 rounded-xl font-semibold text-lg mt-4 hover:bg-[#1a2630] transition-colors">Sign Up</button>
      </form>
      </div>
    </div>
  );
};

export default SignupPage;
