import React, { useEffect, useState } from 'react';
import { fetchListings, deleteListing, API_ORIGIN } from '../services/api';
import { Link } from 'react-router-dom';
import { MdArrowBack, MdSearch, MdFilterList, MdStorefront, MdAdd, MdDelete, MdLocationOn, MdPhone, MdVisibility } from 'react-icons/md';

const MarketplaceListPage = () => {
  const [listings, setListings] = useState([]);
  const [showMyListings, setShowMyListings] = useState(false);
  const [loading, setLoading] = useState(true);
  const farmerPhone = JSON.parse(localStorage.getItem('farmer'))?.phone;

  useEffect(() => {
    fetchListings()
      .then((res) => {
        setListings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching listings:', err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      await deleteListing(id);
      setListings((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const buildImageUrl = (image) => {
    if (!image) return '';
    if (image.startsWith('http')) return image;
    const path = image.startsWith('/media/')
      ? image
      : `/media/${image.replace(/^\/+/, '')}`;
    return `${API_ORIGIN}${path}`;
  };

  const filteredListings = showMyListings
    ? listings.filter((item) => item.contact === farmerPhone)
    : listings;

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
                to="/dashboard" 
                className="p-2 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <MdArrowBack className="text-white text-xl" />
              </Link>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
                  <MdStorefront className="text-white text-2xl" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Marketplace
                  </h1>
                  <p className="text-xs text-gray-500 font-medium">Buy & Sell Farm Products</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">{filteredListings.length} Listings</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white shadow-lg rounded-2xl mb-8">
          <div className="px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Farm Products Marketplace</h2>
                <p className="text-green-100">Connect with buyers and sellers in your community</p>
              </div>
              <div className="text-right hidden sm:block">
                <div className="text-3xl font-bold">{listings.length}</div>
                <div className="text-sm text-green-200">Total Listings</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg rounded-2xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link 
              to="/create-listing" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <MdAdd className="mr-2 text-xl" />
              Add Listing
            </Link>
            <button
              onClick={() => setShowMyListings((prev) => !prev)}
              className={`inline-flex items-center px-6 py-3 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${
                showMyListings 
                  ? 'bg-gradient-to-r from-gray-500 to-slate-600 text-white' 
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
              }`}
            >
              <MdFilterList className="mr-2 text-xl" />
              {showMyListings ? 'All Listings' : 'My Listings'}
            </button>
          </div>
        </div>

        {/* Listings Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <span className="ml-4 text-gray-600 font-medium">Loading listings...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((item) => (
              <div 
                key={item.id} 
                className="bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg rounded-xl overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative"
              >
                {item.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={buildImageUrl(item.image)}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    {item.contact === farmerPhone && (
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition-colors duration-200"
                      >
                        <MdDelete className="text-lg" />
                      </button>
                    )}
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-800 flex-1">
                      {item.title}
                    </h3>
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-300">
                      {item.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {item.description?.slice(0, 80)}...
                  </p>
                  
                  <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
                    ₹{item.price}
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MdLocationOn className="mr-2 text-gray-400" />
                      {item.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MdPhone className="mr-2 text-gray-400" />
                      {item.contact}
                    </div>
                  </div>

                  <Link 
                    to={`/listing/${item.id}`} 
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg shadow hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    <MdVisibility className="mr-2" />
                    View Details
                  </Link>
                </div>
              </div>
            ))}
            
            {filteredListings.length === 0 && !loading && (
              <div className="col-span-full">
                <div className="bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg rounded-xl p-12 text-center">
                  <p className="text-gray-600 font-medium">No listings found.</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {showMyListings ? 'You have no listings yet. Create your first listing!' : 'No listings available at the moment.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Stats Cards */}
        {!loading && listings.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600">
                  <MdStorefront className="text-white text-xl" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{listings.length}</div>
                  <div className="text-sm text-gray-600">Total Listings</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600">
                  <MdFilterList className="text-white text-xl" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{filteredListings.length}</div>
                  <div className="text-sm text-gray-600">Showing Now</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600">
                  <MdPhone className="text-white text-xl" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {listings.filter(item => item.contact === farmerPhone).length}
                  </div>
                  <div className="text-sm text-gray-600">My Listings</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default MarketplaceListPage;