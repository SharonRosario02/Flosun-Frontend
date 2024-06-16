import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../backendService";

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/feedback", formData);

      if (response.status === 200) {
        toast.success("Feedback submitted successfully!", {
          position: "bottom-left"
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to submit feedback. Please try again. ", {
          position: "bottom-left"
        });
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("An error occurred. Please try again later.",{
        position: "bottom-left"
      });
    }
  };  
  return (
    <div className="h-4/5 ">
      <ToastContainer />
      <div className="relative pt-20 flex items-center justify-center bg-white sm:items-center sm:pt-0 pb-32">
        {/* <div className="relative flex items-top justify-center min bg-white sm:items-center sm:pt-0"> */}
        <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
          <div className="mt-8 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-6 mr-2 bg-gray-100  sm:rounded-lg">
                <h1 className="text-4xl sm:text-5xl text-gray-800  font-extrabold tracking-tight">
                  Get in touch
                </h1>
                <p className="text-normal text-lg sm:text-2xl font-medium text-gray-600 mt-2">
                  Fill in the form to start a conversation
                </p>

                <div className="flex items-center mt-8 text-gray-600 ">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    strokeLinejoin="round"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    className="w-8 h-8 text-gray-500"
                  >
                    <path
                      stroke-linecap="round"
                      strokeLinejoin="round"
                      stroke-width="1.5"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      strokeLinejoin="round"
                      stroke-width="1.5"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div className="ml-4 text-md tracking-wide font-semibold w-40">
                    Acme Inc, Street, State, Postal Code
                  </div>
                </div>

                <div className="flex items-center mt-4 text-gray-600 dark:text-gray-400">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    strokeLinejoin="round"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    className="w-8 h-8 text-gray-500"
                  >
                    <path
                      stroke-linecap="round"
                      strokeLinejoin="round"
                      stroke-width="1.5"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <div className="ml-4 text-md tracking-wide font-semibold w-40">
                    +44 1234567890
                  </div>
                </div>

                <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    strokeLinejoin="round"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    className="w-8 h-8 text-gray-500"
                  >
                    <path
                      stroke-linecap="round"
                      strokeLinejoin="round"
                      stroke-width="1.5"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div className="ml-4 text-md tracking-wide font-semibold w-40">
                    <a href="http://localhost:5173/bouquet-shop/feedback">
                      http://localhost:5173/bouquet-shop/feedback
                    </a>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6 flex flex-col justify-center">
                <div className="flex flex-col">
                  <label htmlFor="name" className="hidden">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-700 text-gray-800 font-semibold focus:border-gray-400 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col mt-2">
                  <label htmlFor="email" className="hidden">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-700 text-gray-800 font-semibold focus:border-gray-400 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col mt-2">
                  <label htmlFor="message" className="hidden">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    placeholder="Your message..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full mt-2 py-3 px-3 rounded-lg bg-white border border-gray-700 text-gray-800 font-semibold focus:border-gray-400 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="md:w-32 bg-black hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-gray-700 transition ease-in-out duration-300"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
