import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMarketPrices } from "../services/api";
import { MdSearch, MdArrowBack, MdTrendingUp, MdLocationOn } from "react-icons/md";
import { GiFarmTractor } from "react-icons/gi";

const MarketPricesPage = () => {
  const [prices, setPrices] = useState([]);
  const [filteredPrices, setFilteredPrices] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Function to sort prices by date (most recent first)
  const sortByDate = (pricesArray) => {
    return pricesArray.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA; // Sort in descending order (most recent first)
    });
  };

  useEffect(() => {
    getMarketPrices()
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        const sortedData = sortByDate(data);
        setPrices(sortedData);
        setFilteredPrices(sortedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching market prices:", err);
        setPrices([]);
        setFilteredPrices([]);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    const filtered = prices.filter((item) =>
      item.crop.toLowerCase().includes(query) ||
      item.market.toLowerCase().includes(query)
    );
    // Sort filtered results by date as well
    const sortedFiltered = sortByDate(filtered);
    setFilteredPrices(sortedFiltered);
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
                  <GiFarmTractor className="text-white text-2xl" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Market Prices
                  </h1>
                  <p className="text-xs text-gray-500 font-medium">Live Mandi Rates</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Live Data</span>
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
              <div className="flex items-center space-x-4">
                <MdTrendingUp className="text-3xl" />
                <div>
                  <h2 className="text-2xl font-bold">Market Price Dashboard</h2>
                  <p className="text-green-100">Get real-time mandi prices and market trends</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{filteredPrices.length}</div>
                <div className="text-sm text-green-200">Live Prices</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg rounded-2xl p-6 mb-8">
          <div className="relative">
            <MdSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search by crop name or market location..."
              className="w-full pl-12 pr-4 py-4 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 font-medium placeholder-gray-500"
            />
          </div>
          {/* Sort indicator */}
          <div className="mt-3 flex items-center text-sm text-gray-600">
            <MdTrendingUp className="mr-1" />
            <span>Sorted by most recent dates first</span>
          </div>
        </div>

        {/* Prices Table */}
        <div className="bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg rounded-2xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
              <span className="ml-4 text-gray-600 font-medium">Loading market prices...</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Crop
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Market
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      State
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Unit
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      <div className="flex items-center">
                        Date
                        <MdTrendingUp className="ml-1 text-green-600" title="Sorted by recent dates" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredPrices.length > 0 ? (
                    filteredPrices.map((item, index) => (
                      <tr 
                        key={item.id || index} 
                        className="hover:bg-white/50 transition-colors duration-200 group"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {item.crop.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                              {item.crop}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <MdLocationOn className="text-gray-400 text-sm" />
                            <span className="text-gray-700 font-medium">{item.market}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300">
                            {item.state}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-xl font-bold text-green-700">₹{item.price}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                            {item.unit}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600 font-medium">
                            {new Date(item.date).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                            <MdSearch className="text-gray-400 text-2xl" />
                          </div>
                          <div className="text-gray-600 font-medium">No matching results found</div>
                          <div className="text-sm text-gray-500">Try searching with different crop or market names</div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        {filteredPrices.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600">
                  <MdTrendingUp className="text-white text-xl" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {new Set(filteredPrices.map(p => p.crop)).size}
                  </div>
                  <div className="text-sm text-gray-600">Unique Crops</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600">
                  <MdLocationOn className="text-white text-xl" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {new Set(filteredPrices.map(p => p.market)).size}
                  </div>
                  <div className="text-sm text-gray-600">Markets</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600">
                  <MdLocationOn className="text-white text-xl" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {new Set(filteredPrices.map(p => p.state)).size}
                  </div>
                  <div className="text-sm text-gray-600">States</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MarketPricesPage;