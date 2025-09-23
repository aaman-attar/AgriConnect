import React, { useEffect, useState } from 'react';
import { getQuickTips } from '../services/api';
import { Link } from 'react-router-dom';
import { MdArrowBack, MdSearch, MdFilterList, MdLightbulb, MdInfo } from 'react-icons/md';

const QuickTipsPage = () => {
  const [tips, setTips] = useState([]);
  const [filteredTips, setFilteredTips] = useState([]);
  const [dropdownCategory, setDropdownCategory] = useState('All');
  const [searchCategory, setSearchCategory] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const categories = [
    'All',
    'Water',
    'Soil',
    'Irrigation',
    'Crop Management',
    'Seeds',
    'Crop Planning',
    'Weather',
    'Hygiene',
    'Pest Control',
    'Management',
    'Nursery',
    'Weed Control',
    'Plant Health',
    'Fertilizers',
    'Post-Harvest',
    'Market',
    'Safety',
    'Community',
  ];

  useEffect(() => {
    getQuickTips()
      .then((res) => {
        setTips(res.data);
        setFilteredTips(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching tips:', err);
        setError('Failed to fetch tips.');
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    const categoryToUse = searchCategory.trim()
      ? searchCategory.trim().toLowerCase()
      : dropdownCategory !== 'All'
      ? dropdownCategory.toLowerCase()
      : '';

    if (categoryToUse) {
      const filtered = tips.filter((tip) =>
        tip.category.toLowerCase().includes(categoryToUse)
      );
      setFilteredTips(filtered);
    } else {
      setFilteredTips(tips); // No filter, show all
    }
  };

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
                  <MdLightbulb className="text-white text-2xl" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Quick Tips
                  </h1>
                  <p className="text-xs text-gray-500 font-medium">Expert Farming Advice</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">{filteredTips.length} Tips</span>
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
                <h2 className="text-2xl font-bold">Farming Tips & Best Practices</h2>
                <p className="text-green-100">Expert advice for better crop management and yields</p>
              </div>
              <div className="text-right hidden sm:block">
                <div className="text-3xl font-bold">{tips.length}</div>
                <div className="text-sm text-green-200">Total Tips</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            {/* Dropdown filter */}
            <div className="relative w-full md:w-56">
              <MdFilterList className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <select
                value={dropdownCategory}
                onChange={(e) => setDropdownCategory(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 font-medium appearance-none cursor-pointer"
              >
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Manual text filter */}
            <div className="relative w-full md:w-64">
              <MdSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Or type category name"
                className="w-full pl-12 pr-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 font-medium placeholder-gray-500"
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
              />
            </div>

            <button 
              onClick={handleSearch} 
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Search
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-xl mb-8 flex items-start space-x-3">
            <MdInfo className="text-red-500 text-xl mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Error</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Tips Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <span className="ml-4 text-gray-600 font-medium">Loading tips...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTips.map((tip) => (
              <div 
                key={tip.id} 
                className="bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg rounded-xl overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {tip.title}
                    </h3>
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-300">
                      {tip.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-600">
                    {tip.content}
                  </p>
                </div>
              </div>
            ))}
            
            {filteredTips.length === 0 && !loading && (
              <div className="col-span-full">
                <div className="bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg rounded-xl p-12 text-center">
                  <p className="text-gray-600 font-medium">No tips found.</p>
                  <p className="text-sm text-gray-500 mt-2">Try searching with different category or clear filters</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Stats Cards */}
        {!loading && tips.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600">
                  <MdLightbulb className="text-white text-xl" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{tips.length}</div>
                  <div className="text-sm text-gray-600">Total Tips</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600">
                  <MdFilterList className="text-white text-xl" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{filteredTips.length}</div>
                  <div className="text-sm text-gray-600">Filtered</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600">
                  <MdInfo className="text-white text-xl" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">Expert</div>
                  <div className="text-sm text-gray-600">Advice</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default QuickTipsPage;