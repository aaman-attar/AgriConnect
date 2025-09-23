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
    <div className="min-h-screen relative p-4 overflow-hidden">
      {/* Background Image - same as LoginPage */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1674624682232-c9ced5360a2e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-black/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/20 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl flex flex-col md:flex-row items-start md:items-center justify-between gap-10 md:gap-16 pt-10 md:pt-0">
        {/* Left hero text */}
        <div className="text-white px-2 md:px-0 md:w-1/2">
          <p className="uppercase tracking-widest text-emerald-300/90 text-sm mb-3">Join the community</p>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">Create Your Account</h1>
          <p className="mt-4 text-slate-100/90 max-w-md">
            Get market prices, advice, and connect with other farmers.
          </p>
        </div>

        {/* Right glassmorphic card */}
        <div className="md:w-[460px] w-full">
          <div className="backdrop-blur-xl bg-white/20 border border-white/25 rounded-3xl shadow-2xl p-6 sm:p-8 text-white">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="mb-6">
                <h2 className="text-2xl font-bold">Create account</h2>
                <p className="text-white/80 mt-1">Fill in your details to get started.</p>
              </div>

              <label className="label text-white/90" htmlFor="name">Full Name</label>
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

              <label className="label text-white/90" htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="Enter your number"
                value={form.phone}
                onChange={handleChange}
                required
                className="input mb-4"
              />

              <label className="label text-white/90" htmlFor="password">Password</label>
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

              <label className="label text-white/90" htmlFor="location">Location</label>
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

              <button type="submit" className="btn-primary w-full py-2" disabled={loading}>
                {loading ? 'Creating...' : 'Create Account'}
              </button>

              {/* Secondary nav */}
              <div className="text-center mt-6">
                <span className="text-white/80 mr-2">Already have an account?</span>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="underline underline-offset-2 hover:text-white text-white"
                >
                  Back to Login
                </button>
              </div>

              {message && <p className="alert-error mt-4 text-center">{message}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountPage;
