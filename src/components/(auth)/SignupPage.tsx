// pages/signup.tsx
"use client";
import { useState } from "react";
//@ts-ignore
import axios from '../../../backendService.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaSpinner } from 'react-icons/fa';
import { useCookies } from 'react-cookie';
import { Link } from "react-router-dom";

export const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false)

  // used for session management in cookie setting
  const [cookies, setCookie] = useCookies(['token']);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "confirmPassword") {
      setPasswordMatch(value === formData.password);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(formData).some((value) => value === '')) {
      toast.error('Please fill all the fields');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/api/user/signup", formData);
      console.log(response);
      toast.success("Signup successful!", { position: "bottom-left" });
      // Set the token cookie
      setCookie('token', response.data.token, { path: '/' });
      // Reset form fields
      setFormData({
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      console.error("Error occurred while signing up:", error);
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message, { position: "bottom-left" });
      } else {
        toast.error("An error occurred while signing up. Please try again.", { position: "bottom-left" });
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
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
          <h2 className="text-2xl font-bold mb-6">Sign up</h2>
          <div className="mb-3">
            <label
              htmlFor="username"
              className="block text-gray-700 font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              minLength={3}
              maxLength={20}
              className="w-full px-3 py-2 border-2 border-purple-300 rounded focus:outline-none focus:border-pink-500"
            />
          </div>
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
          <div className="mb-3">
            <label
              htmlFor="phone"
              className="block text-gray-700 font-bold mb-2"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              className="w-full px-3 py-2 border-2 border-purple-300 rounded focus:outline-none focus:border-pink-500"
            />
          </div>
          <div className="mb-3">
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
                {showPassword ?   <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-bold mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-3 py-2 border-2 border-purple-300 rounded focus:outline-none focus:border-pink-500"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ?   <FaEye /> : <FaEyeSlash />}
              </button>
              {formData.confirmPassword && (
                <span
                  className={`absolute right-8 top-1/2 transform -translate-y-1/2 ${
                    passwordMatch ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {passwordMatch ? "✓" : "✕"}
                </span>
              )}
            </div>
          </div>


          <div className="flex items-center justify-between">
          <button
      type="submit"
      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-white"
      disabled={loading}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        'Sign up'
      )}
    </button>
          </div>
          <div className="text-center">
            <Link to="/bouquet-shop/login" className="text-purple-500 hover:text-purple-600">
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};