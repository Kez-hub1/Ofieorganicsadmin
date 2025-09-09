import React, { useState } from 'react'; 
import { Eye, EyeOff, Lock, Mail, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { adminLogin } from '../api/Client';
import { Link, useNavigate } from 'react-router';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState(null);
  const navigate = useNavigate();

  
  const ADMIN_EMAIL = "ofieorganics@gmail.com";
  const ADMIN_PASSWORD = "Botanicals2014";

  // Function to handle login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    
    try {

      if (formData.email === ADMIN_EMAIL && formData.password === ADMIN_PASSWORD) {
       
        const mockToken = "admin_" + Date.now();
        localStorage.setItem("adminToken", mockToken);
        setLoginStatus("success");
        navigate("/admindashboard"); // redirect to admin dashboard
      } else {
        // Try API login as fallback
        const res = await adminLogin(formData.email, formData.password);
        
        // Store token right away
        if (res.token) {
          localStorage.setItem("adminToken", res.token);
        }
        
        setLoginStatus("success");
        navigate("/admindashboard"); // redirect to admin dashboard
      }
    } catch (err) {
      console.error("Login failed:", err);
      setLoginStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Portal</h1>
          <p className="text-gray-600">Sign in to manage your organic beauty store</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Enter your admin email"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* Status */}
          {loginStatus === 'success' && (
            <p className="text-green-600 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" /> Login successful! Redirecting...
            </p>
          )}
          {loginStatus === 'error' && (
            <p className="text-red-600 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" /> Invalid email or password
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg bg-green-600 text-white hover:bg-green-700"
          >
            {isLoading ? "Signing in..." : "Sign In to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;