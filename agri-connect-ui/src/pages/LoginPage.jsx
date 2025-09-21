import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { farmerLogin } from '../services/api';

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', phone: '', location: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await farmerLogin(form);
      if (res.data && res.data.farmer) {
        localStorage.setItem('farmer', JSON.stringify(res.data.farmer));
        localStorage.setItem('farmerPhone', res.data.farmer.phone);
        navigate('/dashboard'); // ✅ Use navigate
      } else {
        setMessage('Login failed! Please check your details.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Login failed! Please check your details.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
        {/* Left hero panel */}
        <div
          className="relative hidden md:block"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500937386664-56f3b5ef11d5?q=80&w=1974&auto=format&fit=crop')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
          <div className="relative h-full w-full p-10 flex flex-col justify-end text-white">
            <div className="max-w-md">
              <p className="uppercase tracking-widest text-emerald-300/90 text-sm mb-3">Agriculture</p>
              <h1 className="text-5xl font-extrabold leading-tight">AGRIC CONNECT</h1>
              <p className="mt-4 text-slate-100/90">
                Connect with the farming community. Get prices, advice, tips, and marketplace — all in one place.
              </p>
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="bg-white p-6 sm:p-8 md:p-10">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="mb-8 text-center md:text-left">
              <h2 className="text-3xl font-extrabold text-slate-900">Welcome to Agric Connect</h2>
              <p className="text-slate-600 mt-2">Sign in or create your account using your details below.</p>
            </div>

            <label className="label" htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange}
              required
              className="input mb-4"
            />

            <label className="label" htmlFor="phone">Number</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              placeholder="e.g. 9876543210"
              value={form.phone}
              onChange={handleChange}
              required
              className="input mb-4"
            />

            <label className="label" htmlFor="location">City</label>
            <input
              id="location"
              type="text"
              name="location"
              placeholder="Village / City"
              value={form.location}
              onChange={handleChange}
              required
              className="input mb-6"
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <button type="submit" className="btn-primary w-full py-2">Sign In</button>
              <button type="submit" className="btn-secondary w-full py-2">Create Account</button>
            </div>

            {message && <p className="alert-error mt-4 text-center">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
