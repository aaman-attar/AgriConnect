// src/pages/EditListingPage.jsx
import React, { useEffect, useState } from 'react';
import { getListingDetail, updateListing } from '../services/api';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { MdArrowBack, MdEdit, MdSave, MdTitle, MdDescription, MdCurrencyRupee, MdCategory, MdLocationOn, MdPhone, MdImage } from 'react-icons/md';

const EditListingPage = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getListingDetail(id).then(res => setForm(res.data));
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in form) formData.append(key, form[key]);
    await updateListing(id, formData);
    navigate('/marketplace');
  };

  if (!form) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <span className="text-gray-600 font-medium translatable">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100 relative overflow-hidden">
      {/* Modern animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-emerald-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400/15 to-cyan-600/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link 
                to="/marketplace" 
                className="p-2 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <MdArrowBack className="text-white text-xl" />
              </Link>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
                  <MdEdit className="text-white text-2xl" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Edit Listing
                  </h1>
                  <p className="text-xs text-gray-500 font-medium">Update Product Information</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        {/* Form Card */}
        <div className="bg-white/70 backdrop-blur-sm border border-white/50 shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-6">
            <h2 className="text-xl font-bold translatable">Update Your Listing</h2>
            <p className="text-green-100 text-sm mt-1">Modify the details below to update your product listing</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Title Input */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2" htmlFor="title">
                <MdTitle className="mr-2 text-gray-500" />
                Title
              </label>
              <input 
                id="title" 
                name="title" 
                className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                value={form.title} 
                onChange={handleChange} 
                required 
                placeholder="Enter product title"
              />
            </div>

            {/* Description Input */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2" htmlFor="description">
                <MdDescription className="mr-2 text-gray-500" />
                Description
              </label>
              <textarea 
                id="description" 
                name="description" 
                className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 placeholder-gray-400 min-h-[120px] resize-y"
                value={form.description} 
                onChange={handleChange} 
                required 
                placeholder="Describe your product in detail"
              />
            </div>

            {/* Price and Category Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2" htmlFor="price">
                  <MdCurrencyRupee className="mr-2 text-gray-500" />
                  Price (₹)
                </label>
                <input 
                  id="price" 
                  name="price" 
                  type="number" 
                  className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                  value={form.price} 
                  onChange={handleChange} 
                  required 
                  placeholder="0"
                />
              </div>
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2" htmlFor="category">
                  <MdCategory className="mr-2 text-gray-500" />
                  Category
                </label>
                <input 
                  id="category" 
                  name="category" 
                  className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                  value={form.category} 
                  onChange={handleChange} 
                  required 
                  placeholder="e.g., Vegetables, Fruits"
                />
              </div>
            </div>

            {/* Location and Contact Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2" htmlFor="location">
                  <MdLocationOn className="mr-2 text-gray-500" />
                  Location
                </label>
                <input 
                  id="location" 
                  name="location" 
                  className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                  value={form.location} 
                  onChange={handleChange} 
                  required 
                  placeholder="City or area"
                />
              </div>
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2" htmlFor="contact">
                  <MdPhone className="mr-2 text-gray-500" />
                  Phone Number
                </label>
                <input 
                  id="contact" 
                  name="contact" 
                  className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                  value={form.contact} 
                  onChange={handleChange} 
                  required 
                  placeholder="10-digit phone number"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2" htmlFor="image">
                <MdImage className="mr-2 text-gray-500" />
                Image
              </label>
              <div className="relative">
                <input 
                  id="image" 
                  type="file" 
                  name="image" 
                  accept="image/*" 
                  onChange={e => setForm({ ...form, image: e.target.files[0] })} 
                  className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
                <p className="text-xs text-gray-500 mt-2 ml-1">Upload a clear product image (JPG/PNG).</p>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                type="submit"
                className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <MdSave className="mr-2 text-xl" />
                <span className="translatable">Update Listing</span>
              </button>
              <Link 
                to="/marketplace"
                className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>

        {/* Help Card */}
        <div className="mt-6 bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex-shrink-0">
              <MdEdit className="text-white text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Editing Tips</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Make sure all information is accurate and up-to-date</li>
                <li>• Use clear descriptions to attract buyers</li>
                <li>• Upload high-quality images for better visibility</li>
                <li>• Include your correct contact information</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditListingPage;