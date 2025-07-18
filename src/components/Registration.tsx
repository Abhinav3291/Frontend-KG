import React, { useState } from "react";
import { authAPI } from "../services/api";
import { Loader2, CheckCircle, AlertCircle, X } from "lucide-react";

// Utility for className joins
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

type FormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  comment: string;
  course: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  course?: string;
};

type ToastType = {
  open: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
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

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastType>({
    open: false,
    message: '',
    type: 'info'
  });

  const handleCloseToast = () => {
    setToast(prev => ({ ...prev, open: false }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (formData.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters";

    if (!formData.email) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Please enter a valid email address";

    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (!phoneRegex.test(formData.phone)) newErrors.phone = "Please enter a valid 10-digit phone number";

    if (!formData.address.trim()) newErrors.address = "Address is required";
    else if (formData.address.trim().length < 10) newErrors.address = "Please provide a more detailed address";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      const updatedErrors = { ...errors };
      delete updatedErrors[name as keyof FormErrors];
      setErrors(updatedErrors);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      setToast({ open: true, message: "Please fix the errors in the form", type: "error" });
      return;
    }

    setIsSubmitting(true);

    try {
      await authAPI.register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        course: formData.course,
        message: `Address: ${formData.address}\n\nComments: ${formData.comment || 'No comments'}`,
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        comment: "",
        course: "Banking and Finance Course",
      });

      setToast({
        open: true,
        message: "Registration successful! We'll contact you soon.",
        type: "success"
      });
    } catch (error) {
      console.error("Registration error:", error);
      setToast({
        open: true,
        message: "Failed to submit registration. Please try again later.",
        type: "error"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden md:flex">
        {/* Right Section */}
        <div className="w-full p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Registration Form</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                className={cn(
                  'w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500',
                  errors.name ? "border-red-500" : "border-gray-300"
                )}
              />
              {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={cn(
                    'w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500',
                    errors.email ? "border-red-500" : "border-gray-300"
                  )}
                />
                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={cn(
                    'w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500',
                    errors.phone ? "border-red-500" : "border-gray-300"
                  )}
                />
                {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={cn(
                  'w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 min-h-[100px]',
                  errors.address ? "border-red-500" : "border-gray-300"
                )}
              ></textarea>
              {errors.address && <p className="text-sm text-red-600">{errors.address}</p>}
            </div>

            <div>
              <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">Select Course</label>
              <select
                id="course"
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="Banking and Finance Course">Banking and Finance Course</option>

              </select>
            </div>

            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">Additional Comments</label>
              <textarea
                id="comment"
                name="comment"
                rows={3}
                value={formData.comment}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-6 rounded-md transition-all flex items-center justify-center",
                isSubmitting ? "opacity-75 cursor-not-allowed" : "hover:shadow-lg"
              )}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Submitting...
                </>
              ) : (
                'Register Now'
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Toast Notification */}
      {toast.open && (
        <div
          className={cn(
            "fixed bottom-4 right-4 z-50 w-full max-w-sm p-4 border-l-4 rounded-lg shadow-md bg-white transition-all duration-300",
            toast.type === "success" ? "border-green-500" : "border-red-500"
          )}
        >
          <div className="flex items-start">
            <div className={cn(
              "h-6 w-6 flex items-center justify-center rounded-full",
              toast.type === "success" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
            )}>
              {toast.type === "success" ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-semibold text-gray-900">
                {toast.type === "success" ? "Success" : "Error"}
              </p>
              <p className="text-sm text-gray-600">{toast.message}</p>
            </div>
            <button onClick={handleCloseToast} className="ml-4 text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Registration;
