import React, { useState, useEffect } from "react";
import { authAPI } from "../services/api";
import { 
  Loader2, 
  CheckCircle, 
  AlertCircle, 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  BookOpen, 
  MessageSquare,
  Send,
  Briefcase,
  GraduationCap,
  Building,
  MapPinned,
  Clock,
  Calendar
} from "lucide-react";

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
  status: 'Fresher' | 'Working Professional';
  qualification: string;
  preferredLocation: string;
  workExperience: string;
  currentCompany: string;
  institution: string;
  jobRole: string;
  graduationStartDate: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  course?: string;
  qualification?: string;
  preferredLocation?: string;
  workExperience?: string;
  currentCompany?: string;
  institution?: string;
  jobRole?: string;
  graduationStartDate?: string;
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
    status: 'Fresher',
    qualification: "",
    preferredLocation: "",
    workExperience: "",
    currentCompany: "",
    institution: "",
    jobRole:"",
    graduationStartDate: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastType>({
    open: false,
    message: '',
    type: 'info'
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Auto-dismiss toast after 5 seconds
  useEffect(() => {
    if (toast.open) {
      const timer = setTimeout(() => {
        setToast(prev => ({ ...prev, open: false }));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast.open]);

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
    
    // New Validations
    if (!formData.qualification.trim()) newErrors.qualification = "Qualification is required";
    
    const [gradYear, gradMonth] = (formData.graduationStartDate || '-').split('-');
    if (!gradYear || !gradMonth || gradYear.length < 4) newErrors.graduationStartDate = "Please provide both Month and Year";
    
    if (!formData.preferredLocation.trim()) newErrors.preferredLocation = "Preferred job location is required";

    if (formData.status === 'Working Professional') {
        if (!formData.workExperience) newErrors.workExperience = "Work experience is required";
        if (!formData.currentCompany.trim()) newErrors.currentCompany = "Current/Past company is required";
        if(!formData.jobRole.trim()) newErrors.jobRole = "Job role is required";
    }

    if (formData.status === 'Fresher') {
      if (!formData.institution.trim()) newErrors.institution = "Institution/College name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      const updatedErrors = { ...errors };
      delete updatedErrors[name as keyof FormErrors];
      setErrors(updatedErrors);
    }
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      setToast({ open: true, message: "Please fix the errors in the form", type: "error" });
      return;
    }

    setIsSubmitting(true);

    try {
      const messageDetail = `Status: ${formData.status}
Qualification: ${formData.qualification}
Graduation Start Date: ${formData.graduationStartDate}
Preferred Job Location: ${formData.preferredLocation}
${formData.status === 'Working Professional' ? `Work Experience: ${formData.workExperience}\nCurrent/Past Company: ${formData.currentCompany}\nJob Role: ${formData.jobRole}\n` : ''}${formData.status === 'Fresher' ? `Institution: ${formData.institution}\n` : ''}Address: ${formData.address}
Comments: ${formData.comment || 'No comments'}`;

      await authAPI.register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        course: formData.course,
        message: messageDetail,
      });

      // WhatsApp Redirection
      const phoneNumber = "918427818375";
      let whatsappMessage = `*New Registration Application*\n\n`;
      whatsappMessage += `👤 *Name:* ${formData.name}\n`;
      whatsappMessage += `📧 *Email:* ${formData.email}\n`;
      whatsappMessage += `📱 *Phone:* ${formData.phone}\n`;
      whatsappMessage += `🎓 *Course:* ${formData.course}\n`;
      whatsappMessage += `💼 *Status:* ${formData.status}\n`;
      whatsappMessage += `🎓 *Qualification:* ${formData.qualification}\n`;
      whatsappMessage += `📅 *Start Date:* ${formData.graduationStartDate}\n`;
      whatsappMessage += `📍 *Pref. Location:* ${formData.preferredLocation}\n`;
      if (formData.status === 'Working Professional') {
        whatsappMessage += `🕒 *Experience:* ${formData.workExperience}\n`;
        whatsappMessage += `🏢 *Company:* ${formData.currentCompany}\n`;
        whatsappMessage += `💼 *Job Role:* ${formData.jobRole}\n`;
      }
      if (formData.status === 'Fresher') {
        whatsappMessage += `🏫 *Institution:* ${formData.institution}\n`;
      }
      whatsappMessage += `📝 *Comments:* ${formData.comment || 'N/A'}`;

      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(url, '_blank');

      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        comment: "",
        course: "Banking and Finance Course",
        status: 'Fresher',
        qualification: "",
        preferredLocation: "",
        workExperience: "",
        currentCompany: "",
        institution: "",
        jobRole:"",
        graduationStartDate: ""
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
    <section  className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 -mt-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1944AB] mb-2">
            Registration Form
          </h2>
          <p className="text-[#1944AB]/80 text-sm sm:text-base">
            Fill in your details to get started with your journey
          </p>
        </div>

        {/* Form Card */}
        <div id="registration-form" className="bg-white shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <div className="w-full p-6 sm:p-8 lg:p-10">
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label 
                  htmlFor="name" 
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                >
                  <User className="h-4 w-4 text-blue-600" />
                  Full Name *
                </label>
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={handleBlur}
                    placeholder="Enter your full name"
                    className={cn(
                      'w-full pl-11 pr-4 py-3 border-2 rounded-lg',
                      'transition-all duration-200',
                      'focus:outline-none focus:ring-2 focus:ring-[#1944AA] focus:ring-offset-2',
                      'placeholder:text-gray-400',
                      errors.name 
                        ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500" 
                        : focusedField === 'name'
                        ? "border-[#1944AA] bg-blue-50/50"
                        : "border-gray-300 bg-white hover:border-gray-400"
                    )}
                  />
                  <User className={cn(
                    "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-200",
                    errors.name ? "text-red-500" : focusedField === 'name' ? "text-blue-600" : "text-gray-400"
                  )} />
                </div>
                {errors.name && (
                  <p className="text-sm text-red-600 flex items-center gap-1 animate-in slide-in-from-top-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email and Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {/* Email Field */}
                <div className="space-y-2">
                  <label 
                    htmlFor="email" 
                    className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                  >
                    <Mail className="h-4 w-4 text-blue-600" />
                    Email *
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('email')}
                      onBlur={handleBlur}
                      placeholder="your.email@example.com"
                      className={cn(
                        'w-full pl-11 pr-4 py-3 border-2 rounded-lg',
                        'transition-all duration-200',
                        'focus:outline-none focus:ring-2 focus:ring-[#1944AA] focus:ring-offset-2',
                        'placeholder:text-gray-400',
                        errors.email 
                          ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500" 
                          : focusedField === 'email'
                          ? "border-[#1944AA] bg-blue-50/50"
                          : "border-gray-300 bg-white hover:border-gray-400"
                      )}
                    />
                    <Mail className={cn(
                      "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-200",
                      errors.email ? "text-red-500" : focusedField === 'email' ? "text-blue-600" : "text-gray-400"
                    )} />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-600 flex items-center gap-1 animate-in slide-in-from-top-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <label 
                    htmlFor="phone" 
                    className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                  >
                    <Phone className="h-4 w-4 text-blue-600" />
                    Phone *
                  </label>
                  <div className="relative">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('phone')}
                      onBlur={handleBlur}
                      placeholder="10-digit number"
                      maxLength={10}
                      className={cn(
                        'w-full pl-11 pr-4 py-3 border-2 rounded-lg',
                        'transition-all duration-200',
                        'focus:outline-none focus:ring-2 focus:ring-[#1944AA] focus:ring-offset-2',
                        'placeholder:text-gray-400',
                        errors.phone 
                          ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500" 
                          : focusedField === 'phone'
                          ? "border-[#1944AA] bg-blue-50/50"
                          : "border-gray-300 bg-white hover:border-gray-400"
                      )}
                    />
                    <Phone className={cn(
                      "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-200",
                      errors.phone ? "text-red-500" : focusedField === 'phone' ? "text-blue-600" : "text-gray-400"
                    )} />
                  </div>
                  {errors.phone && (
                    <p className="text-sm text-red-600 flex items-center gap-1 animate-in slide-in-from-top-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Status Selection */}
              <div className="space-y-2">
                <label 
                  htmlFor="status" 
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                >
                  <Briefcase className="h-4 w-4 text-blue-600" />
                  Current Status *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, status: 'Fresher' }))}
                    className={cn(
                      "flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2 transition-all duration-200",
                      formData.status === 'Fresher'
                        ? "border-[#1944AA] bg-blue-50 text-[#1944AA]"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                    )}
                  >
                    <span>Fresher</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, status: 'Working Professional' }))}
                    className={cn(
                      "flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2 transition-all duration-200",
                      formData.status === 'Working Professional'
                        ? "border-[#1944AA] bg-blue-50 text-[#1944AA]"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                    )}
                  >
                    <span>Working Professional</span>
                  </button>
                </div>
              </div>

              {/* Qualification Field */}
              <div className="space-y-2">
                <label 
                  htmlFor="qualification" 
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                >
                  <GraduationCap className="h-4 w-4 text-blue-600" />
                  Qualification *
                </label>
                <div className="relative">
                  <input
                    id="qualification"
                    name="qualification"
                    type="text"
                    value={formData.qualification}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('qualification')}
                    onBlur={handleBlur}
                    placeholder="e.g. B.Tech, MBA, BCA"
                    className={cn(
                      'w-full pl-11 pr-4 py-3 border-2 rounded-lg',
                      'transition-all duration-200',
                      'focus:outline-none focus:ring-2 focus:ring-[#1944AA] focus:ring-offset-2',
                      'placeholder:text-gray-400',
                      errors.qualification 
                        ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500" 
                        : focusedField === 'qualification'
                        ? "border-[#1944AA] bg-blue-50/50"
                        : "border-gray-300 bg-white hover:border-gray-400"
                    )}
                  />
                  <GraduationCap className={cn(
                    "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-200",
                    errors.qualification ? "text-red-500" : focusedField === 'qualification' ? "text-blue-600" : "text-gray-400"
                  )} />
                </div>
                {errors.qualification && (
                  <p className="text-sm text-red-600 flex items-center gap-1 animate-in slide-in-from-top-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.qualification}
                  </p>
                )}
              </div>

              {/* Graduation start Field */}
              <div className="space-y-2">
                <label 
                  htmlFor="graduationStartDate" 
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                >
                  <GraduationCap className="h-4 w-4 text-blue-600" />
                  Graduation start date *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {/* Month Select */}
                  <div className="relative">
                    <select
                      id="graduationMonth"
                      value={(formData.graduationStartDate || '').split('-')[1] || ''}
                      onChange={(e) => {
                         const current = formData.graduationStartDate || '-';
                         const year = current.split('-')[0] || '';
                         const month = e.target.value;
                         setFormData(prev => ({...prev, graduationStartDate: `${year}-${month}`}));
                         if (errors.graduationStartDate) {
                             const newErrors = {...errors};
                             delete newErrors.graduationStartDate;
                             setErrors(newErrors);
                         }
                      }}
                      onFocus={() => handleFocus('graduationStartDate')}
                      onBlur={handleBlur}
                      className={cn(
                        'w-full pl-11 pr-8 py-3 border-2 rounded-lg appearance-none',
                        'transition-all duration-200',
                        'focus:outline-none focus:ring-2 focus:ring-[#1944AA] focus:ring-offset-2',
                        errors.graduationStartDate 
                          ? "border-red-500 bg-red-50" 
                          : focusedField === 'graduationStartDate'
                          ? "border-[#1944AA] bg-blue-50/50"
                          : "border-gray-300 bg-white hover:border-gray-400"
                      )}
                    >
                      <option value="">Month</option>
                      {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map(m => (
                        <option key={m} value={m}>{new Date(2000, parseInt(m)-1, 1).toLocaleString('default', { month: 'long' })}</option>
                      ))}
                    </select>
                    <Calendar className={cn(
                      "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-200 pointer-events-none",
                      errors.graduationStartDate ? "text-red-500" : focusedField === 'graduationStartDate' ? "text-blue-600" : "text-gray-400"
                    )} />
                     <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                  </div>

                  {/* Year Input */}
                  <div className="relative">
                     <input
                      type="number"
                      placeholder="Year"
                      min="1900"
                      max="2100"
                      value={(formData.graduationStartDate || '').split('-')[0] || ''}
                      onChange={(e) => {
                         const current = formData.graduationStartDate || '-';
                         const month = current.split('-')[1] || '';
                         const year = e.target.value;
                         setFormData(prev => ({...prev, graduationStartDate: `${year}-${month}`}));
                         if (errors.graduationStartDate) {
                             const newErrors = {...errors};
                             delete newErrors.graduationStartDate;
                             setErrors(newErrors);
                         }
                      }}
                       onFocus={() => handleFocus('graduationStartDate')}
                       onBlur={handleBlur}
                       className={cn(
                        'w-full pl-4 pr-4 py-3 border-2 rounded-lg',
                        'transition-all duration-200',
                        'focus:outline-none focus:ring-2 focus:ring-[#1944AA] focus:ring-offset-2',
                        'placeholder:text-gray-400',
                         errors.graduationStartDate 
                          ? "border-red-500 bg-red-50" 
                          : focusedField === 'graduationStartDate'
                          ? "border-[#1944AA] bg-blue-50/50"
                          : "border-gray-300 bg-white hover:border-gray-400"
                      )}
                     />
                  </div>
                </div>
                {errors.graduationStartDate && (
                  <p className="text-sm text-red-600 flex items-center gap-1 animate-in slide-in-from-top-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.graduationStartDate}
                  </p>
                )}
              </div>

               {/* Preferred Location Field */}
               <div className="space-y-2">
                <label 
                  htmlFor="preferredLocation" 
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                >
                  <MapPinned className="h-4 w-4 text-blue-600" />
                  Preferred Job Location *
                </label>
                <div className="relative">
                  <input
                    id="preferredLocation"
                    name="preferredLocation"
                    type="text"
                    value={formData.preferredLocation}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('preferredLocation')}
                    onBlur={handleBlur}
                    placeholder="Enter your preferred job location"
                    className={cn(
                      'w-full pl-11 pr-4 py-3 border-2 rounded-lg',
                      'transition-all duration-200',
                      'focus:outline-none focus:ring-2 focus:ring-[#1944AA] focus:ring-offset-2',
                      'placeholder:text-gray-400',
                      errors.preferredLocation 
                        ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500" 
                        : focusedField === 'preferredLocation'
                        ? "border-[#1944AA] bg-blue-50/50"
                        : "border-gray-300 bg-white hover:border-gray-400"
                    )}
                  />
                  <MapPinned className={cn(
                    "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-200",
                    errors.preferredLocation ? "text-red-500" : focusedField === 'preferredLocation' ? "text-blue-600" : "text-gray-400"
                  )} />
                </div>
                {errors.preferredLocation && (
                  <p className="text-sm text-red-600 flex items-center gap-1 animate-in slide-in-from-top-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.preferredLocation}
                  </p>
                )}
              </div>

               {/* Fresher Specific Fields */}
               {formData.status === 'Fresher' && (
                  <div className="space-y-2 animate-in slide-in-from-top-4 fade-in-0 duration-300">
                    <label 
                      htmlFor="institution" 
                      className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                    >
                      <Building className="h-4 w-4 text-blue-600" />
                      Institution/College Name *
                    </label>
                    <div className="relative">
                      <input
                        id="institution"
                        name="institution"
                        type="text"
                        value={formData.institution}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus('institution')}
                        onBlur={handleBlur}
                        placeholder="Enter your college or university name"
                        className={cn(
                          'w-full pl-11 pr-4 py-3 border-2 rounded-lg',
                          'transition-all duration-200',
                          'focus:outline-none focus:ring-2 focus:ring-[#1944AA] focus:ring-offset-2',
                          'placeholder:text-gray-400',
                          errors.institution 
                            ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500" 
                            : focusedField === 'institution'
                            ? "border-[#1944AA] bg-blue-50/50"
                            : "border-gray-300 bg-white hover:border-gray-400"
                        )}
                      />
                      <Building className={cn(
                        "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-200",
                        errors.institution ? "text-red-500" : focusedField === 'institution' ? "text-blue-600" : "text-gray-400"
                      )} />
                    </div>
                    {errors.institution && (
                      <p className="text-sm text-red-600 flex items-center gap-1 animate-in slide-in-from-top-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.institution}
                      </p>
                    )}
                  </div>
               )}

              {/* Working Professional Specific Fields */}
              {formData.status === 'Working Professional' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 animate-in slide-in-from-top-4 fade-in-0 duration-300">
                  {/* Work Experience */}
                  <div className="space-y-2">
                    <label 
                      htmlFor="workExperience" 
                      className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                    >
                      <Clock className="h-4 w-4 text-blue-600" />
                      Work Experience *
                    </label>
                    <div className="relative">
                      <select
                        id="workExperience"
                        name="workExperience"
                        value={formData.workExperience}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus('workExperience')}
                        onBlur={handleBlur}
                        className={cn(
                          "w-full pl-11 pr-10 py-3 border-2 rounded-lg appearance-none",
                          "transition-all duration-200",
                          "focus:outline-none focus:ring-2 focus:ring-[#1944AA] focus:ring-offset-2",
                          errors.workExperience
                            ? "border-red-500 bg-red-50"
                            : focusedField === 'workExperience'
                            ? "border-[#1944AA] bg-blue-50/50"
                            : "border-gray-300 bg-white hover:border-gray-400"
                        )}
                      >
                        <option value="">Select Experience</option>
                        <option value="0-1 Years">0-1 Years</option>
                        <option value="1-2 Years">1-2 Years</option>
                        <option value="2-3 Years">2-3 Years</option>
                        <option value="3-4 Years">3-4 Years</option>
                        <option value="4-5 Years">4-5 Years</option>
                        <option value="5+ Years">5+ Years</option>\
                      </select>
                      <Clock className={cn(
                        "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-200 pointer-events-none",
                        errors.workExperience ? "text-red-500" : focusedField === 'workExperience' ? "text-blue-600" : "text-gray-400"
                      )} />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    {errors.workExperience && (
                      <p className="text-sm text-red-600 flex items-center gap-1 animate-in slide-in-from-top-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.workExperience}
                      </p>
                    )}
                  </div>

                  {/* Current Company */}
                  <div className="space-y-2">
                    <label 
                      htmlFor="currentCompany" 
                      className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                    >
                      <Building className="h-4 w-4 text-blue-600" />
                      Current/Past Company *
                    </label>
                    <div className="relative">
                      <input
                        id="currentCompany"
                        name="currentCompany"
                        type="text"
                        value={formData.currentCompany}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus('currentCompany')}
                        onBlur={handleBlur}
                        placeholder="Enter your company name"
                        className={cn(
                          'w-full pl-11 pr-4 py-3 border-2 rounded-lg',
                          'transition-all duration-200',
                          'focus:outline-none focus:ring-2 focus:ring-[#1944AA] focus:ring-offset-2',
                          'placeholder:text-gray-400',
                          errors.currentCompany 
                            ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500" 
                            : focusedField === 'currentCompany'
                            ? "border-[#1944AA] bg-blue-50/50"
                            : "border-gray-300 bg-white hover:border-gray-400"
                        )}
                      />
                      <Building className={cn(
                        "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-200",
                        errors.currentCompany ? "text-red-500" : focusedField === 'currentCompany' ? "text-blue-600" : "text-gray-400"
                      )} />
                    </div>
                    {errors.currentCompany && (
                      <p className="text-sm text-red-600 flex items-center gap-1 animate-in slide-in-from-top-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.currentCompany}
                      </p>
                    )}
                  </div>

                  {/* Job Role */}
                  <div className="space-y-2 w-full sm:col-span-2">
                    <label 
                      htmlFor="jobRole" 
                      className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                    >
                      <Briefcase className="h-4 w-4 text-blue-600" />
                      Job Role *
                    </label>
                    <div className="relative">
                      <input
                        id="jobRole"
                        name="jobRole"
                        type="text"
                        value={formData.jobRole}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus('jobRole')}
                        onBlur={handleBlur}
                        placeholder="Enter your job role"
                        className={cn(
                          'w-full pl-11 pr-4 py-3 border-2 rounded-lg',
                          'transition-all duration-200',
                          'focus:outline-none focus:ring-2 focus:ring-[#1944AA] focus:ring-offset-2',
                          'placeholder:text-gray-400',
                          errors.jobRole 
                            ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500" 
                            : focusedField === 'jobRole'
                            ? "border-[#1944AA] bg-blue-50/50"
                            : "border-gray-300 bg-white hover:border-gray-400"
                        )}
                      />
                      <Briefcase className={cn(
                        "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-200",
                        errors.jobRole ? "text-red-500" : focusedField === 'jobRole' ? "text-blue-600" : "text-gray-400"
                      )} />
                    </div>
                    {errors.jobRole && (
                      <p className="text-sm text-red-600 flex items-center gap-1 animate-in slide-in-from-top-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.jobRole}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Address Field */}
              <div className="space-y-2">
                <label 
                  htmlFor="address" 
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                >
                  <MapPin className="h-4 w-4 text-blue-600" />
                  Address *
                </label>
                <div className="relative">
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('address')}
                    onBlur={handleBlur}
                    placeholder="Enter your complete address"
                    rows={3}
                    className={cn(
                      'w-full pl-11 pr-4 py-3 border-2 rounded-lg resize-none',
                      'transition-all duration-200',
                      'focus:outline-none focus:ring-2 focus:ring-[#1944AA] focus:ring-offset-2',
                      'placeholder:text-gray-400',
                      errors.address 
                        ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500" 
                        : focusedField === 'address'
                        ? "border-[#1944AA] bg-blue-50/50"
                        : "border-gray-300 bg-white hover:border-gray-400"
                    )}
                  />
                  <MapPin className={cn(
                    "absolute left-3 top-3 h-5 w-5 transition-colors duration-200",
                    errors.address ? "text-red-500" : focusedField === 'address' ? "text-blue-600" : "text-gray-400"
                  )} />
                </div>
                <div className="flex justify-between items-center">
                  {errors.address && (
                    <p className="text-sm text-red-600 flex items-center gap-1 animate-in slide-in-from-top-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.address}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 ml-auto">
                    {formData.address.length} characters
                  </p>
                </div>
              </div>

              {/* Course Selection */}
              <div className="space-y-2">
                <label 
                  htmlFor="course" 
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                >
                  <BookOpen className="h-4 w-4 text-blue-600" />
                  Select Course
                </label>
                <div className="relative">
                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('course')}
                    onBlur={handleBlur}
                    className={cn(
                      "w-full pl-11 pr-10 py-3 border-2 rounded-lg appearance-none",
                      "transition-all duration-200",
                      "focus:outline-none focus:ring-2 focus:ring-[#1944AA] focus:ring-offset-2",
                      focusedField === 'course'
                        ? "border-[#1944AA] bg-blue-50/50"
                        : "border-gray-300 bg-white hover:border-gray-400"
                    )}
                  >
                    <option value="Banking and Finance Course">Banking and Finance Course</option>
                  </select>
                  <BookOpen className={cn(
                    "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-200 pointer-events-none",
                    focusedField === 'course' ? "text-blue-600" : "text-gray-400"
                  )} />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Comments Field */}
              <div className="space-y-2">
                <label 
                  htmlFor="comment" 
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                >
                  <MessageSquare className="h-4 w-4 text-blue-600" />
                  Additional Comments
                </label>
                <div className="relative">
                  <textarea
                    id="comment"
                    name="comment"
                    rows={4}
                    value={formData.comment}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('comment')}
                    onBlur={handleBlur}
                    placeholder="Any additional information you'd like to share..."
                    className={cn(
                      'w-full pl-11 pr-4 py-3 border-2 rounded-lg resize-none',
                      'transition-all duration-200',
                      'focus:outline-none focus:ring-2 focus:ring-[#1944AA] focus:ring-offset-2',
                      'placeholder:text-gray-400',
                      focusedField === 'comment'
                        ? "border-[#1944AA] bg-blue-50/50"
                        : "border-gray-300 bg-white hover:border-gray-400"
                    )}
                  />
                  <MessageSquare className={cn(
                    "absolute left-3 top-3 h-5 w-5 transition-colors duration-200",
                    focusedField === 'comment' ? "text-blue-600" : "text-gray-400"
                  )} />
                </div>
                <p className="text-xs text-gray-500 text-right">
                  {formData.comment.length} characters
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3.5 px-6 rounded-lg",
                  "font-semibold text-base transition-all duration-300",
                  "flex items-center justify-center gap-2",
                  "shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]",
                  "disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100",
                  "focus:outline-none focus:ring-4 focus:ring-[#1944AA] focus:ring-offset-2"
                )}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Register Now</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Enhanced Toast Notification */}
      {toast.open && (
        <div
          className={cn(
            "fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100%-2rem)] sm:w-full max-w-sm",
            "transform transition-all duration-300 ease-out",
            "animate-in slide-in-from-bottom-4 fade-in-0"
          )}
          role="alert"
          aria-live="assertive"
        >
          <div
            className={cn(
              "p-4 border-l-4 rounded-lg shadow-2xl bg-white",
              "backdrop-blur-sm",
              toast.type === "success" 
                ? "border-green-500 bg-green-50/90" 
                : "border-red-500 bg-red-50/90"
            )}
          >
            <div className="flex items-start gap-3">
              <div className={cn(
                "h-8 w-8 flex items-center justify-center rounded-full flex-shrink-0",
                "transition-transform duration-200",
                toast.type === "success" 
                  ? "bg-green-100 text-green-600" 
                  : "bg-red-100 text-red-600"
              )}>
                {toast.type === "success" ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <AlertCircle className="h-5 w-5" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn(
                  "text-sm font-bold mb-1",
                  toast.type === "success" ? "text-green-900" : "text-red-900"
                )}>
                  {toast.type === "success" ? "Success!" : "Error"}
                </p>
                <p className={cn(
                  "text-sm leading-relaxed",
                  toast.type === "success" ? "text-green-800" : "text-red-800"
                )}>
                  {toast.message}
                </p>
              </div>
              <button 
                onClick={handleCloseToast}
                className={cn(
                  "ml-2 flex-shrink-0 p-1 rounded-md transition-colors",
                  "hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-offset-2",
                  toast.type === "success"
                    ? "text-green-600 hover:text-green-700 focus:ring-green-500"
                    : "text-red-600 hover:text-red-700 focus:ring-red-500"
                )}
                aria-label="Close notification"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Registration;
