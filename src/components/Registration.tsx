// components/Registration.tsx
import React, { useState } from "react";
import { authAPI } from "../services/api";
import { Alert, Snackbar, CircularProgress } from "@mui/material";

type FormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  comment: string;
  course: string;
};

type SnackbarState = {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info';
};

const Registration = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    comment: "",
    course: "Banking and Finance Course",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "info",
  });

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSnackbar({
        open: true,
        message: "Please fix the errors in the form",
        severity: "error"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await authAPI.register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        course: formData.course,
        // Include additional info in the message
        message: `Address: ${formData.address}\n\nComments: ${formData.comment || 'No comments'}`
      });
      
      // Reset form on success
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        comment: "",
        course: "Banking and Finance Course",
      });
      
      setSnackbar({
        open: true,
        message: "Registration successful! We'll contact you soon.",
        severity: "success"
      });
    } catch (error) {
      console.error("Registration error:", error);
      setSnackbar({
        open: true,
        message: "Failed to submit registration. Please try again later.",
        severity: "error"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Section */}
        <div className="text-white bg-gradient-to-r from-purple-900 to-indigo-900 p-10 rounded-xl relative overflow-hidden">

          <h2 className="text-4xl md:text-5xl font-bold leading-tight">


            Kindly fill the aside {/*icon */} form to <span className="text-yellow-400">Register</span>
          </h2>
          <p className="mt-6 text-gray-200 text-lg">
            Learn something new & Build Your Career From Anywhere In The World
          </p>
        </div>

        {/* Right Section */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-xl border border-gray-200 w-full max-w-md mx-auto"
        >
          <h3 className="text-xl font-semibold mb-6 text-gray-800">Fill Your Registration</h3>

          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-gray-100 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-purple-500`}
              required
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-gray-100 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-purple-500`}
                required
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            <div className="w-1/2">
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-gray-100 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-purple-500`}
                required
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="address"
              placeholder="Full Address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-gray-100 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-purple-500`}
              required
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-500">{errors.address}</p>
            )}
          </div>
          
          <div className="mb-4">
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
            >
              <option value="Banking and Finance Course">Banking and Finance Course</option>
              <option value="Investment Banking Course">Investment Banking Course</option>
              <option value="Financial Markets Course">Financial Markets Course</option>
              <option value="Wealth Management Course">Wealth Management Course</option>
            </select>
          </div>

          <textarea
            name="comment"
            placeholder="Comment"
            rows={3}
            value={formData.comment}
            onChange={handleChange}
            className="w-full mb-6 px-4 py-2 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded transition flex justify-center items-center ${
              isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <>
                <CircularProgress size={24} color="inherit" className="mr-2" />
                Submitting...
              </>
            ) : (
              'Register →'
            )}
          </button>
        </form>
      </div>
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </section>
  );
};

export default Registration;
