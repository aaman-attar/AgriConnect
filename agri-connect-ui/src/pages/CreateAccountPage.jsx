import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerFarmer } from '../services/api';

const CreateAccountPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', phone: '', password: '', location: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const extractErrorMessage = (err) => {
    const res = err?.response;
    if (!res) return 'Account creation failed. Please try again.';
    if (typeof res.data === 'string') return res.data;
    const detail = res.data?.detail;
    if (detail) return detail;
    // Collect serializer field errors if present
    const errors = res.data?.errors || res.data;
    if (errors && typeof errors === 'object') {
      const parts = Object.entries(errors).flatMap(([field, msgs]) => {
        if (!msgs) return [];
        const list = Array.isArray(msgs) ? msgs : [msgs];
        return list.map((m) => `${field}: ${typeof m === 'string' ? m : JSON.stringify(m)}`);
      });
      if (parts.length) return parts.join('\n');
    }
    return 'Account creation failed. Please verify details and try again.';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      const payload = {
        name: form.name,
        phone: form.phone,
        password: form.password,
        location: form.location,
      };
      const res = await registerFarmer(payload);
      // If backend returns created farmer, log them in directly
      if (res.data && res.data.farmer) {
        localStorage.setItem('farmer', JSON.stringify(res.data.farmer));
        localStorage.setItem('farmerPhone', res.data.farmer.phone);
        navigate('/dashboard');
      } else {
        // Otherwise, assume success and go to login
        setMessage('Account created successfully. Please sign in.');
        setTimeout(() => navigate('/'), 1000);
      }
    } catch (err) {
      console.error(err);
      setMessage(extractErrorMessage(err));
    } finally {
      setLoading(false);
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
              "url('https://images.unsplash.com/photo-1439886183900-e79ec0057170?q=80&w=1974&auto=format&fit=crop')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
          <div className="relative h-full w-full p-10 flex flex-col justify-end text-white">
            <div className="max-w-md">
              <p className="uppercase tracking-widest text-emerald-300/90 text-sm mb-3">Join the community</p>
              <h1 className="text-5xl font-extrabold leading-tight">Create Your Account</h1>
              <p className="mt-4 text-slate-100/90">
                Get market prices, advice, and connect with other farmers.
              </p>
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="bg-white p-6 sm:p-8 md:p-10">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="mb-8 text-center md:text-left">
              <h2 className="text-3xl font-extrabold text-slate-900">Create account</h2>
              <p className="text-slate-600 mt-2">Fill in your details to get started.</p>
            </div>

            <label className="label" htmlFor="name">Full Name</label>
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

            <label className="label" htmlFor="phone">Phone Number</label>
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

            <label className="label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              required
              className="input mb-4"
            />

            <label className="label" htmlFor="location">Location</label>
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
              <button type="submit" className="btn-primary w-full py-2" disabled={loading}>
                {loading ? 'Creating...' : 'Create Account'}
              </button>
              <button type="button" onClick={() => navigate('/')} className="btn-secondary w-full py-2">Back to Login</button>
            </div>

            {message && <p className="alert-error mt-4 text-center">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountPage;
