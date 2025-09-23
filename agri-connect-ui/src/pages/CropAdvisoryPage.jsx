import React, { useState } from 'react';
import { predictCrop } from '../services/api';
import { FaThermometerHalf, FaCloudRain, FaTint, FaVial, FaLeaf } from 'react-icons/fa';
import { MdArrowBack, MdAgriculture, MdInfo, MdScience, MdEco } from 'react-icons/md';
import { GiPlantSeed, GiFarmTractor } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const CropAdvisoryPage = () => {
  const [form, setForm] = useState({
    N: '',
    P: '',
    K: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: '',
  });

  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult('');
    setError('');
    setLoading(true);

    try {
      // Convert numeric inputs to numbers safely
      const payload = {
        N: Number(form.N),
        P: Number(form.P),
        K: Number(form.K),
        temperature: Number(form.temperature),
        humidity: Number(form.humidity),
        ph: Number(form.ph),
        rainfall: Number(form.rainfall),
      };
      const res = await predictCrop(payload);
      if (res.data && res.data.recommended_crop) {
        setResult(res.data.recommended_crop);
      } else {
        setError('Prediction failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.error || 'Prediction failed. Please check inputs.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Sample values for quick testing
  const fillSampleData = () => {
    setForm({
      N: '90',
      P: '42',
      K: '43',
      temperature: '20.87',
      humidity: '82',
      ph: '6.5',
      rainfall: '202.9',
    });
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
                  <GiPlantSeed className="text-white text-2xl" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Crop Advisory
                  </h1>
                  <p className="text-xs text-gray-500 font-medium">AI-Powered Recommendations</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Kaggle Model</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white shadow-lg rounded-2xl mb-8">
          <div className="px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <MdAgriculture className="text-4xl" />
                <div>
                  <h2 className="text-2xl font-bold">Smart Crop Recommendation</h2>
                  <p className="text-green-100">Get AI-based crop suggestions based on soil and climate data</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center space-x-2">
                <MdScience className="text-yellow-300 text-2xl animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg rounded-2xl p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Soil Nutrients Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FaLeaf className="mr-2 text-green-600" />
                Soil Nutrients (mg/kg)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">N</span>
                    </div>
                  </div>
                  <input 
                    type="number" 
                    name="N" 
                    placeholder="Nitrogen" 
                    value={form.N} 
                    onChange={handleChange} 
                    required 
                    className="w-full pl-14 pr-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 font-medium placeholder-gray-500"
                  />
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">P</span>
                    </div>
                  </div>
                  <input 
                    type="number" 
                    name="P" 
                    placeholder="Phosphorus" 
                    value={form.P} 
                    onChange={handleChange} 
                    required 
                    className="w-full pl-14 pr-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 font-medium placeholder-gray-500"
                  />
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">K</span>
                    </div>
                  </div>
                  <input 
                    type="number" 
                    name="K" 
                    placeholder="Potassium" 
                    value={form.K} 
                    onChange={handleChange} 
                    required 
                    className="w-full pl-14 pr-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 font-medium placeholder-gray-500"
                  />
                </div>
              </div>
            </div>

            {/* Climate Conditions Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FaThermometerHalf className="mr-2 text-red-600" />
                Climate Conditions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <FaThermometerHalf className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-500 text-xl" />
                  <input 
                    type="number" 
                    name="temperature" 
                    placeholder="Temperature (°C)" 
                    value={form.temperature} 
                    onChange={handleChange} 
                    required 
                    className="w-full pl-12 pr-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 font-medium placeholder-gray-500"
                  />
                </div>
                <div className="relative">
                  <FaTint className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 text-xl" />
                  <input 
                    type="number" 
                    name="humidity" 
                    placeholder="Humidity (%)" 
                    value={form.humidity} 
                    onChange={handleChange} 
                    required 
                    className="w-full pl-12 pr-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 font-medium placeholder-gray-500"
                  />
                </div>
              </div>
            </div>

            {/* Soil & Rainfall Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FaVial className="mr-2 text-purple-600" />
                Soil pH & Rainfall
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <FaVial className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500 text-xl" />
                  <input 
                    type="number" 
                    name="ph" 
                    placeholder="pH Level (0-14)" 
                    value={form.ph} 
                    onChange={handleChange} 
                    step="0.01" 
                    required 
                    className="w-full pl-12 pr-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 font-medium placeholder-gray-500"
                  />
                </div>
                <div className="relative">
                  <FaCloudRain className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 text-xl" />
                  <input 
                    type="number" 
                    name="rainfall" 
                    placeholder="Rainfall (mm)" 
                    value={form.rainfall} 
                    onChange={handleChange} 
                    required 
                    className="w-full pl-12 pr-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 font-medium placeholder-gray-500"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button 
                type="submit" 
                disabled={loading}
                className="flex-1 inline-flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <MdEco className="text-xl" />
                    <span>Get Recommendation</span>
                  </>
                )}
              </button>
              <button 
                type="button"
                onClick={fillSampleData}
                className="px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-medium rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all duration-200"
              >
                Fill Sample
              </button>
            </div>
          </form>
        </div>

        {/* Result Section */}
        {result && (
          <div className="bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg rounded-2xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-green-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600">
                  <GiFarmTractor className="text-white text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Recommendation Result</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-4">
                  <GiPlantSeed className="text-white text-3xl" />
                </div>
                <h4 className="text-2xl font-bold text-gray-800 mb-2">Recommended Crop</h4>
                <div className="inline-flex px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl border-2 border-green-300">
                  <span className="text-3xl font-bold text-green-800 capitalize">{result}</span>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  Based on your soil and climate conditions, <span className="font-semibold">{result}</span> is the most suitable crop for cultivation.
                </p>
              </div>
            </div>
          </div>
        )}

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

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600">
                <MdScience className="text-white text-xl" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">ML Model</div>
                <div className="text-sm text-gray-600">Kaggle Dataset</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600">
                <GiPlantSeed className="text-white text-xl" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">22+</div>
                <div className="text-sm text-gray-600">Crop Types</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600">
                <MdEco className="text-white text-xl" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">95%+</div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <MdInfo className="text-amber-600 text-xl mt-0.5 flex-shrink-0" />
            <div className="text-sm text-amber-800">
              <p className="font-semibold mb-1">Important Note</p>
              <p>
                This recommendation is based on machine learning models trained on agricultural data. 
                For best results, consider consulting with local agricultural experts and factor in local market conditions 
                before making final planting decisions.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CropAdvisoryPage;