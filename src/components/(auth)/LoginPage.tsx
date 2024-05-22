"use client";
import { useEffect, useState } from "react";
import axios from '../../../backendService.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaSpinner } from 'react-icons/fa';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // used for session management in cookie setting
  const [cookies, setCookie] = useCookies(['token']);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Clear form fields when the component mounts
    setFormData({
      email: "",
      password: "",
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(formData).some((value) => value === '')) {
      toast.error('Please fill all the fields');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/api/user/signin", formData);
      console.log(response);
      toast.success("Login successful!", { position: "bottom-left" });

      // Reset form fields
      setFormData({
        email: "",
        password: "",
      });

      // Store the token and user information in local storage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Redirect to the home page
      navigate('/plant-shop/');
    } catch (error: any) {
      console.error("Error occurred while logging in:", error);
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message, { position: "bottom-left" });
      } else {
        toast.error("An error occurred while logging in. Please try again.", { position: "bottom-left" });
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const LoadingSpinner = () => {
    return (
      <div className="flex items-center justify-center">
        <FaSpinner className="animate-spin h-5 w-5 text-white" />
      </div>
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-3"
          style={{ color: "black" }}
        >
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <div className="mb-3">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border-2 border-purple-300 rounded focus:outline-none focus:border-pink-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-3 py-2 border-2 border-purple-300 rounded focus:outline-none focus:border-pink-500"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-white"
              disabled={loading}
            >
              {loading ? <LoadingSpinner /> : 'Login'}
            </button>
          </div>
          <div className="flex justify-between">
            <a
              href="/plant-shop/reset-password"
              className="text-purple-500 hover:text-purple-600"
            >
              Forgot Password?
            </a>
            <a
              href="/plant-shop/signup"
              className="text-purple-500 hover:text-purple-600"
            >
              Create New Account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};