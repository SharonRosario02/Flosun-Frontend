// pages/reset-password.tsx
import { useState } from "react";
import axios from '../../../backendService.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { FaSpinner } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

export const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const navigate = useNavigate();


  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/user/reset-password/generate-otp", { email });
      toast.success("OTP sent to your email", { position: "bottom-left" });
      setOtpSent(true);
    } catch (error: any) {
      console.error("Error occurred while sending OTP:", error);
      toast.error("An error occurred while sending OTP. Please try again.", { position: "bottom-left" });
    } finally {
      setLoading(false);
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/user/reset-password/verify-otp", { email, otp });
      toast.success("OTP verified successfully", { position: "bottom-left" });
      setOtpVerified(true);
    } catch (error: any) {
      console.error("Error occurred while verifying OTP:", error);
      toast.error("An error occurred while verifying OTP. Please try again.", { position: "bottom-left" });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/user/reset-password", { email, otp, newPassword });
      toast.success("Password reset successfully", { position: "bottom-left" });
      // Reset form fields
      setEmail("");
      setOTP("");
      setNewPassword("");
      setOtpSent(false);
      setOtpVerified(false);
      navigate('/bouquet-shop/login');
    } catch (error: any) {
      console.error("Error occurred while resetting password:", error);
      toast.error("An error occurred while resetting password. Please try again.", { position: "bottom-left" });
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


  const handleGoBack = () => {
    navigate('/bouquet-shop/login');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="w-full max-w-md">
        <form
          onSubmit={otpVerified ? handleResetPassword : otpSent ? handleOTPSubmit : handleEmailSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-3"
          style={{ color: "black" }}
        >
          <div className="flex items-center justify-start">

          <button
              type="button"
              onClick={handleGoBack}
              className="text-gray-600 hover:text-gray-800 focus:outline-none mr-4 mb-6"
              >
              <FaArrowLeft size={20} />
            </button>
          <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
              </div>
          {!otpSent && (
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border-2 border-purple-300 rounded focus:outline-none focus:border-pink-500"
              />
            </div>
          )}
          {otpSent && !otpVerified && (
            <div className="mb-3">
              <label
                htmlFor="otp"
                className="block text-gray-700 font-bold mb-2"
              >
                OTP
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                required
                className="w-full px-3 py-2 border-2 border-purple-300 rounded focus:outline-none focus:border-pink-500"
              />
            </div>
          )}
          {otpVerified && (
            <div className="mb-6">
              <label
                htmlFor="newPassword"
                className="block text-gray-700 font-bold mb-2"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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
          )}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-white"
              disabled={loading}
            >
              {loading ? (
                <LoadingSpinner />
              ) : otpVerified ? (
                'Reset Password'
              ) : otpSent ? (
                'Verify OTP'
              ) : (
                'Send OTP'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};