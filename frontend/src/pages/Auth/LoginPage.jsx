import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, ChefHat } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";
import toast from "react-hot-toast";

// Stats data (will be replaced by API call when backend is integrated)
const STATS = [
  { value: "500+", label: "Restaurants", icon: "🍽️" },
  { value: "20 min", label: "Avg Delivery", icon: "⚡" },
  { value: "4.8★", label: "Rated", icon: "⭐" },
];

const StatCard = ({ value, label, icon }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        relative flex flex-col items-center gap-1.5 px-5 py-4 rounded-2xl border cursor-default
        transition-all duration-300 select-none
        ${hovered
          ? "bg-white/20 border-white/40 scale-105 shadow-lg shadow-black/20"
          : "bg-white/10 border-white/20 scale-100"
        }
      `}
      style={{ backdropFilter: "blur(12px)" }}
    >
      {/* icon floats up on hover */}
      <span
        className={`text-xl transition-all duration-300 ${hovered ? "-translate-y-1" : "translate-y-0"}`}
      >
        {icon}
      </span>

      {/* value pulses subtly on enter */}
      <span
        className={`text-xl font-extrabold text-white transition-all duration-300 ${
          hovered ? "text-brand-200 scale-110" : "scale-100"
        }`}
      >
        {value}
      </span>

      {/* label slides in on hover */}
      <span
        className={`text-xs font-medium leading-tight text-center transition-all duration-300 ${
          hovered ? "text-white opacity-100" : "text-brand-200 opacity-80"
        }`}
      >
        {label}
      </span>

      {/* Animated underline accent */}
      {/* <div
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-white transition-all duration-300 ${
          hovered ? "w-10 opacity-80" : "w-0 opacity-0"
        }`}
      /> */}
    </div>
  );
};

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const { login, loading, error, clearError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    clearError();
  }, []);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const validate = () => {
    const errs = {};
    if (!form.email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    if (!form.password) errs.password = "Password is required";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    const result = await login(form);
    if (!result.error) {
      toast.success("Welcome back! 🎉");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* ── Left Panel ─────────────────────────────────────────────── */}
      <div className="hidden lg:flex w-[45%] bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 flex-col items-center justify-center p-12 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -top-16 -left-16 w-80 h-80 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute -bottom-20 -right-10 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute top-1/2 left-2/3 w-40 h-40 rounded-full bg-white/5 blur-xl" />

        <div className="relative z-10 text-center text-white max-w-sm w-full">
          {/* Logo mark */}
          <div className="w-20 h-20 bg-white/15 border border-white/30 rounded-3xl flex items-center justify-center mx-auto mb-8 backdrop-blur-md shadow-lg">
            <ChefHat size={40} className="text-white drop-shadow" />
          </div>

          <h1 className="text-4xl font-extrabold mb-3 tracking-tight">BiteRush</h1>
          <p className="text-brand-100 text-base leading-relaxed mb-10">
            Your favourite restaurants, <br />delivered hot & fresh.
          </p>

          {/* Interactive Stats */}
          <div className="grid grid-cols-3 gap-3">
            {STATS.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>

          <p className="text-brand-200/60 text-xs mt-10">
            Live stats update once connected to backend
          </p>
        </div>
      </div>

      {/* ── Right Panel ────────────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 bg-brand-500 rounded-xl flex items-center justify-center">
              <ChefHat size={20} className="text-white" />
            </div>
            <span className="font-bold text-xl text-neutral-900">
              Bite<span className="text-brand-500">Rush</span>
            </span>
          </div>

          <h2 className="text-3xl font-bold text-neutral-900 mb-1.5">Welcome back</h2>
          <p className="text-neutral-500 text-sm mb-8">
            Sign in to continue ordering your favourites.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              icon={Mail}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={errors.email}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              error={errors.password}
            />
            <div className="flex justify-end -mt-2">
              <button type="button" className="text-sm text-brand-500 hover:text-brand-600 hover:underline transition-colors">
                Forgot password?
              </button>
            </div>
            <Button type="submit" fullWidth loading={loading} size="lg">
              Sign In
            </Button>
          </form>

          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-100" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs text-neutral-400">OR</span>
            </div>
          </div>

          <p className="text-center text-sm text-neutral-500">
            Don't have an account?{" "}
            <Link to="/signup" className="text-brand-500 font-semibold hover:underline">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
