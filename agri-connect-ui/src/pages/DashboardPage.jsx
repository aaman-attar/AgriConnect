import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { MdPriceChange, MdOutlineWbSunny, MdTipsAndUpdates, MdStorefront, MdPublic } from 'react-icons/md';
import { GiPlantSeed, GiFarmTractor } from 'react-icons/gi';
import { RiRobot2Line } from 'react-icons/ri';

const features = [
  {
    name: 'Market Price',
    route: '/market-prices',
    icon: <MdPriceChange className="text-2xl" />,
    tagline: 'Live mandi prices and trends',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Marketplace',
    route: '/marketplace',
    icon: <MdStorefront className="text-2xl" />,
    tagline: 'Buy and sell farm products',
    color: 'from-pink-500 to-rose-500',
  },
  {
    name: 'AI-Based Crop Advisory',
    route: '/advisory',
    icon: <GiPlantSeed className="text-2xl" />,
    tagline: 'Kaggle-powered crop recommendations',
    color: 'from-emerald-500 to-green-600',
  },
  {
    name: 'Ask AI',
    route: '/ask-ai',
    icon: <RiRobot2Line className="text-2xl" />,
    tagline: 'Ask agriculture-only AI assistant',
    color: 'from-violet-500 to-purple-600',
  },
  {
    name: 'Quick Tips',
    route: '/quick-tips',
    icon: <MdTipsAndUpdates className="text-2xl" />,
    tagline: 'Best practices for higher yield',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    name: 'Government Schemes',
    externalUrl: 'https://www.myscheme.gov.in/search/category/Agriculture%2CRural%20%26%20Environment',
    icon: <MdPublic className="text-2xl" />,
    tagline: 'Explore benefits without leaving the app',
    color: 'from-teal-500 to-cyan-600',
  },
];

const DashboardPage = () => {
  const [farmer, setFarmer] = useState(null);
  const navigate = useNavigate();
  

  useEffect(() => {
    const stored = localStorage.getItem('farmer');
    if (stored) {
      setFarmer(JSON.parse(stored));
    } else {
      navigate('/'); // redirect if not logged in
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('farmer');
    localStorage.removeItem('farmerPhone');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100 relative overflow-hidden">
      {/* Modern animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-emerald-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400/15 to-cyan-600/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Fixed Glassmorphism Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
                  <GiFarmTractor className="text-white text-2xl" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Agri Connect
                  </h1>
                  <p className="text-xs text-gray-500 font-medium">Smart Farming Solutions</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {farmer?.name && (
                <div className="hidden sm:flex items-center space-x-3 px-4 py-2 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-semibold text-sm">
                    {farmer.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{farmer.name}</span>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="group flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <FaSignOutAlt className="text-sm group-hover:rotate-12 transition-transform" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with top padding for fixed header */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        {/* Relative Welcome Section */}
        <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white shadow-lg rounded-2xl mb-8">
          <div className="px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20">
                  <div className="w-2 h-2 rounded-full bg-green-300 animate-pulse"></div>
                  <span className="text-sm font-medium">Dashboard</span>
                </div>
                <h2 className="text-2xl font-bold">
                  Welcome back, {farmer?.name || 'Farmer'} 👋
                </h2>
                {farmer?.location && (
                  <div className="flex items-center space-x-2 text-green-100">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">{farmer.location}</span>
                  </div>
                )}
              </div>

              {/* Weather Card with White Background */}
              <Link to="/weather" className="group">
                <div className="p-3 rounded-xl bg-white/90 backdrop-blur-sm border border-white/50 hover:bg-white transition-all duration-300 hover:scale-105 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <MdOutlineWbSunny className="text-xl text-orange-500" />
                    <div>
                      <div className="text-sm font-medium text-gray-800">Weather</div>
                      <div className="text-xs text-gray-600 group-hover:text-gray-700">Check forecast</div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Grid - 3x2 Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => {
            const CardContent = (
              <div className="group relative overflow-hidden rounded-2xl bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative p-6 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">{feature.icon}</div>
                    </div>
                    {feature.externalUrl && (
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                      {feature.name}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{feature.tagline}</p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors">
                      <span>Explore</span>
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            );

            return feature.externalUrl ? (
              <a key={feature.name} href={feature.externalUrl} target="_blank" rel="noreferrer" className="block">
                {CardContent}
              </a>
            ) : (
              <Link key={feature.name} to={feature.route} className="block">
                {CardContent}
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;