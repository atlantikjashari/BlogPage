import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist";

const SignInForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    userName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7153/api/authentication/register",
        formData
      );
      await axios.post("https://localhost:7153/api/authentication/login", {
        email: formData.email,
        password: formData.password,
      });
      console.log("Response:", response.data);
      navigate("/blog");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between mb-6">
          <Link
            to="/LogInForm"
            className="bg-white text-blue-500 hover:bg-blue-400 hover:text-white font-semibold py-3 px-8 rounded-full transition duration-300"
          >
            Log In
          </Link>
          <Link
            to="/SignInForm"
            className="bg-white text-blue-500 hover:bg-blue-400 hover:text-white font-semibold py-3 px-8 rounded-full transition duration-300 item-center"
          >
            Sign Up
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          {/* <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div> */}
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
