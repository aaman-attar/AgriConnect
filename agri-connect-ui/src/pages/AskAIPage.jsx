import React, { useState } from 'react';
import { askAI } from '../services/api';
import { Link } from 'react-router-dom';
import { MdArrowBack, MdQuestionAnswer, MdSend, MdInfo, MdAutoAwesome } from 'react-icons/md';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { BiBot } from 'react-icons/bi';

const AskAIPage = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAsk = async (e) => {
    e.preventDefault();
    setError('');
    setAnswer('');
    const q = question.trim();
    if (!q) {
      setError('Please enter your question.');
      return;
    }
    setLoading(true);
    try {
      const { data } = await askAI(q);
      setAnswer(data?.answer || 'No answer received.');
    } catch (err) {
      const msg = err?.response?.data?.error || err.message || 'Something went wrong';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const sampleQuestions = [
    "What's the best fertilizer schedule for wheat?",
    "How to control pests in cotton crops?",
    "When should I plant tomatoes in North India?",
    "What are the water requirements for rice cultivation?"
  ];

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
                  <GiArtificialIntelligence className="text-white text-2xl" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    AI Assistant
                  </h1>
                  <p className="text-xs text-gray-500 font-medium">Smart Farming Advisor</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">AI Powered</span>
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
                <BiBot className="text-4xl" />
                <div>
                  <h2 className="text-2xl font-bold">Ask Your Farming Questions</h2>
                  <p className="text-green-100">Get instant AI-powered agricultural advice</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center space-x-2">
                <MdAutoAwesome className="text-yellow-300 text-2xl animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Question Form */}
        <div className="bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg rounded-2xl p-6 mb-8">
          <form onSubmit={handleAsk} className="space-y-4">
            <div className="relative">
              <MdQuestionAnswer className="absolute left-4 top-4 text-gray-400 text-xl" />
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your farming question here (e.g., pest control advice for cotton, fertilizer schedule for wheat, etc.)"
                className="w-full pl-12 pr-4 py-4 min-h-[120px] bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 font-medium placeholder-gray-500 resize-none"
                disabled={loading}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <button 
                type="submit" 
                disabled={loading} 
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Thinking...</span>
                  </>
                ) : (
                  <>
                    <MdSend className="text-xl" />
                    <span>Ask AI</span>
                  </>
                )}
              </button>

              {!loading && !answer && (
                <div className="text-sm text-gray-500 italic">
                  Powered by AI technology
                </div>
              )}
            </div>
          </form>

          {/* Sample Questions */}
          {!answer && !loading && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm font-semibold text-gray-600 mb-3">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {sampleQuestions.map((sample, index) => (
                  <button
                    key={index}
                    onClick={() => setQuestion(sample)}
                    className="px-3 py-1.5 text-xs bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-200"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>
          )}
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

        {/* Answer Section */}
        {answer && (
          <div className="bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg rounded-2xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-green-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600">
                  <BiBot className="text-white text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">AI Response</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="prose prose-green max-w-none">
                <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {answer}
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    setQuestion('');
                    setAnswer('');
                    setError('');
                  }}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-medium rounded-lg hover:from-gray-200 hover:to-gray-300 transition-all duration-200"
                >
                  <MdQuestionAnswer className="text-lg" />
                  <span>Ask Another Question</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <MdInfo className="text-amber-600 text-xl mt-0.5 flex-shrink-0" />
            <div className="text-sm text-amber-800">
              <p className="font-semibold mb-1">Important Note</p>
              <p>
                AI-generated answers are for informational purposes only and may not always be accurate. 
                Please verify critical farming decisions with agricultural experts or your local extension service 
                before implementation.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600">
                <MdAutoAwesome className="text-white text-xl" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Available</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600">
                <BiBot className="text-white text-xl" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">Instant</div>
                <div className="text-sm text-gray-600">Responses</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600">
                <GiArtificialIntelligence className="text-white text-xl" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">Smart</div>
                <div className="text-sm text-gray-600">AI Powered</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AskAIPage;