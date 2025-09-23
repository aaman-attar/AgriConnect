import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdArrowBack, MdSearch, MdLocationOn, MdWbSunny, MdCloud, MdOpacity, MdAir, MdThermostat, MdWaterDrop, MdVisibility } from 'react-icons/md';

const API_KEY = '0012b499ea158d52cd94850657755711'; // Replace with your actual API key

const WeatherPage = () => {
  const [location, setLocation] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const getBackgroundImage = (condition) => {
    if (!condition) return '/sunny.gif';
    const main = condition.toLowerCase();
    if (main.includes('rain')) return '/rain.gif';
    if (main.includes('cloud')) return '/cloudy.gif';
    if (main.includes('storm') || main.includes('thunder')) return '/storm.gif';
    return '/sunny.gif';
  };

  const fetchWeather = async (city) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
      setError('');
    } catch (err) {
      setError('City not found');
      setWeather(null);
    }
  };

  useEffect(() => {
    const farmer = JSON.parse(localStorage.getItem('farmer'));
    if (farmer?.location) {
      setLocation(farmer.location);
      fetchWeather(farmer.location);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchCity.trim()) {
      fetchWeather(searchCity);
    }
  };

  const bgImage = getBackgroundImage(weather?.weather?.[0]?.main);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100 relative overflow-hidden">
      {/* Dynamic background image overlay - More visible */}
      <div 
        className="absolute inset-0 opacity-40 bg-cover bg-center z-0"
        style={{ backgroundImage: `url("${bgImage}")` }}
      ></div>

      {/* Modern animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
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
                  <MdCloud className="text-white text-2xl" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Weather Report
                  </h1>
                  <p className="text-xs text-gray-500 font-medium">Real-time Weather Updates</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Live Weather</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Smaller card with max width */}
      <main className="relative z-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        {/* Main Weather Card - Smaller and more compact */}
        <div className="bg-white/60 backdrop-blur-md border border-white/50 shadow-xl rounded-2xl overflow-hidden">
          {/* Search Section */}
          <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-5">
            <h2 className="text-lg font-bold mb-3">Search Weather by City</h2>
            <form onSubmit={handleSearch} className="flex gap-3">
              <div className="relative flex-1">
                <MdLocationOn className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 text-xl" />
                <input
                  type="text"
                  placeholder="Enter city name"
                  className="w-full pl-12 pr-4 py-2.5 bg-white/20 backdrop-blur border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/70"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                />
              </div>
              <button 
                type="submit" 
                className="px-5 py-2.5 bg-white text-green-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center"
              >
                <MdSearch className="mr-1 text-lg" />
                Search
              </button>
            </form>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mx-5 mt-5 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl flex items-center">
              <span className="font-medium">{error}</span>
            </div>
          )}

          {/* Weather Display - More compact */}
          {weather && (
            <div className="p-6">
              {/* Location and Main Weather */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <MdLocationOn className="text-green-600 text-xl" />
                  <h3 className="text-2xl font-bold text-gray-900">{weather.name}</h3>
                </div>

                {/* Weather Icon */}
                {weather.weather[0].icon && (
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full blur-2xl opacity-50"></div>
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                      alt="weather icon"
                      className="relative w-24 h-24 mx-auto"
                    />
                  </div>
                )}

                {/* Weather Description */}
                <div className="mt-3">
                  <p className="text-xl font-semibold text-gray-800">{weather.weather[0].main}</p>
                  <p className="text-gray-600 capitalize text-sm">{weather.weather[0].description}</p>
                </div>

                {/* Main Temperature */}
                <div className="mt-4 inline-flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                  <MdThermostat className="text-green-600 text-2xl" />
                  <span className="text-3xl font-bold text-gray-900">{Math.round(weather.main.temp)}°C</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">Feels like {Math.round(weather.main.feels_like)}°C</p>
              </div>

              {/* Weather Stats Grid - Compact */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                {/* Humidity Card */}
                <div className="bg-gradient-to-br from-white/80 to-blue-50/80 border border-blue-100 rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Humidity</p>
                      <p className="text-xl font-bold text-gray-900">{weather.main.humidity}%</p>
                    </div>
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg">
                      <MdWaterDrop className="text-white text-lg" />
                    </div>
                  </div>
                </div>

                {/* Wind Speed Card */}
                <div className="bg-gradient-to-br from-white/80 to-green-50/80 border border-green-100 rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Wind Speed</p>
                      <p className="text-xl font-bold text-gray-900">{weather.wind.speed} m/s</p>
                    </div>
                    <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
                      <MdAir className="text-white text-lg" />
                    </div>
                  </div>
                </div>

                {/* Pressure Card */}
                <div className="bg-gradient-to-br from-white/80 to-purple-50/80 border border-purple-100 rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Pressure</p>
                      <p className="text-xl font-bold text-gray-900">{weather.main.pressure} hPa</p>
                    </div>
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                      <MdVisibility className="text-white text-lg" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sunrise and Sunset - Compact */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-orange-50/80 to-yellow-50/80 border border-orange-200 rounded-xl p-3 text-center">
                  <MdWbSunny className="text-orange-500 text-2xl mx-auto mb-1" />
                  <p className="text-xs text-gray-600">Sunrise</p>
                  <p className="font-semibold text-gray-900 text-sm">
                    {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-indigo-50/80 to-purple-50/80 border border-indigo-200 rounded-xl p-3 text-center">
                  <MdWbSunny className="text-indigo-500 text-2xl mx-auto mb-1 transform rotate-180" />
                  <p className="text-xs text-gray-600">Sunset</p>
                  <p className="font-semibold text-gray-900 text-sm">
                    {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Default message when no weather data */}
          {!weather && !error && (
            <div className="p-10 text-center">
              <MdCloud className="text-gray-300 text-5xl mx-auto mb-3" />
              <p className="text-gray-600 font-medium">Enter a city name to get weather information</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default WeatherPage;