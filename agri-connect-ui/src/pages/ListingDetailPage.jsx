import React, { useEffect, useState } from 'react';
import { getListingDetail } from '../services/api';
import { useParams, Link } from 'react-router-dom';
import { MdArrowBack, MdLocationOn, MdPhone, MdCalendarToday, MdCategory, MdCurrencyRupee } from 'react-icons/md';

const ListingDetailPage = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    getListingDetail(id).then(res => {
      console.log("Image Path:", res.data.image); // ✅ Debug here
      setListing(res.data);
    });
  }, [id]);

  if (!listing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <span className="text-gray-600 font-medium">Loading...</span>
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
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Listing Details
                </h1>
                <p className="text-xs text-gray-500 font-medium">Product Information</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        {/* Main Card */}
        <div className="bg-white/70 backdrop-blur-sm border border-white/50 shadow-xl rounded-2xl overflow-hidden">
          {/* Image Section */}
          {listing.image && (
            <div className="relative h-96 bg-gradient-to-br from-gray-100 to-gray-200">
              <img
                src={listing.image.startsWith('http') ? listing.image : `http://127.0.0.1:8000${listing.image}`}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          )}

          {/* Content Section */}
          <div className="p-8">
            {/* Title and Price */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {listing.title}
                </h2>
                <div className="flex items-center space-x-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-300">
                    <MdCategory className="mr-1" />
                    {listing.category}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-300">
                    <MdLocationOn className="mr-1" />
                    {listing.location}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  <MdCurrencyRupee className="text-green-600" />
                  {listing.price}
                </div>
                <p className="text-sm text-gray-500 mt-1">Listed Price</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {listing.description}
              </p>
            </div>

            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Contact Card */}
              <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600">
                    <MdPhone className="text-white text-xl" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 font-medium mb-1">Contact</p>
                    <p className="text-lg font-semibold text-gray-900">{listing.contact}</p>
                  </div>
                </div>
              </div>

              {/* Date Posted Card */}
              <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
                    <MdCalendarToday className="text-white text-xl" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 font-medium mb-1">Posted on</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {new Date(listing.date_posted).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Contact Seller
              </button>
              <Link 
                to="/marketplace"
                className="flex-1 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 text-center"
              >
                Back to Marketplace
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg rounded-xl p-6">
            <div className="text-center">
              <div className="inline-flex p-3 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 mb-3">
                <MdCategory className="text-green-600 text-2xl" />
              </div>
              <p className="text-sm text-gray-500">Category</p>
              <p className="font-semibold text-gray-900">{listing.category}</p>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg rounded-xl p-6">
            <div className="text-center">
              <div className="inline-flex p-3 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 mb-3">
                <MdLocationOn className="text-blue-600 text-2xl" />
              </div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-semibold text-gray-900">{listing.location}</p>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg rounded-xl p-6">
            <div className="text-center">
              <div className="inline-flex p-3 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 mb-3">
                <MdCurrencyRupee className="text-purple-600 text-2xl" />
              </div>
              <p className="text-sm text-gray-500">Price</p>
              <p className="font-semibold text-gray-900">₹{listing.price}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListingDetailPage;