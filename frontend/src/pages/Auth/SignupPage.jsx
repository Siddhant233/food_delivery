import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, User, Phone, ChefHat } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";
import toast from "react-hot-toast";
import { validateEmail, validatePassword } from "../../utils/validators";

const PERKS = [
  { icon: "🚀", text: "Delivery in under 30 minutes" },
  { icon: "🎯", text: "Personalised food recommendations" },
  { icon: "💳", text: "Secure & seamless checkout" },
];

const SignupPage = () => {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", password: "", confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const { register, loading, error, clearError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { clearError(); }, []);
  useEffect(() => { if (error) toast.error(error); }, [error]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      errs.name = "Full name (min 2 chars) is required";
    if (!validateEmail(form.email)) errs.email = "Enter a valid email";
    if (!form.password) errs.password = "Password is required";
    else {
      const pw = validatePassword(form.password);
      if (pw.length) errs.password = `Needs: ${pw.join(" · ")}`;
    }
    if (form.password !== form.confirmPassword)
      errs.confirmPassword = "Passwords don't match";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    const { confirmPassword, ...payload } = form;
    const result = await register(payload);
    if (!result.error) {
      toast.success("Welcome to BiteRush! 🎉");
      // need to check this to redirect to /login and not to home page on signup.
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* ── Left Panel — mirrors Login ─────────────────────────── */}
      <div className="hidden lg:flex w-[42%] bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex-col items-center justify-center p-12 pt-24 relative overflow-hidden">
        {/* decorative blobs */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-brand-600/10 blur-3xl" />

        <div className="relative z-10 text-white max-w-xs w-full">
          {/* Logo mark */}
          <div className="w-16 h-16 bg-brand-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-brand-900/40">
            <ChefHat size={32} className="text-white" />
          </div>

          <p className="text-brand-400 text-xs font-semibold uppercase tracking-widest mb-3">
            Join BiteRush
          </p>
          <h2 className="text-3xl font-extrabold leading-tight mb-3">
            Great food is one tap away.
          </h2>
          <p className="text-neutral-400 text-sm mb-10">
            Create your free account and start exploring thousands of dishes from top restaurants.
          </p>

          {/* Perks list */}
          <ul className="space-y-3.5">
            {PERKS.map(({ icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-neutral-700 flex items-center justify-center text-sm shrink-0">
                  {icon}
                </span>
                <span className="text-sm text-neutral-300">{text}</span>
              </li>
            ))}
          </ul>

          {/* Social proof */}
          <div className="mt-10 flex items-center gap-3 border-t border-neutral-700 pt-6">
            <div className="flex -space-x-2">
              {["🧑", "👩", "🧔", "👧"].map((e, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-neutral-600 border-2 border-neutral-800 flex items-center justify-center text-xs">
                  {e}
                </div>
              ))}
            </div>
            <p className="text-xs text-neutral-400">
              <span className="text-white font-semibold">12,000+</span> happy customers this week
            </p>
          </div>
        </div>
      </div>

      {/* ── Right Panel ────────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 pt-24 bg-white overflow-y-auto">
        <div className="w-full max-w-lg">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 bg-brand-500 rounded-xl flex items-center justify-center">
              <ChefHat size={20} className="text-white" />
            </div>
            <span className="font-bold text-xl">Bite<span className="text-brand-500">Rush</span></span>
          </div>

          <h2 className="text-3xl font-bold text-neutral-900 mb-1">Create your account</h2>
          <p className="text-neutral-500 text-sm mb-7">
            Free forever. No credit card required.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            {/* Row 1 — Full name (spans full width) */}
            <div className="mb-4">
              <Input
                label="Full name"
                placeholder="John Doe"
                icon={User}
                value={form.name}
                onChange={set("name")}
                error={errors.name}
              />
            </div>

            {/* Row 2 — Email + Phone side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <Input
                label="Email address"
                type="email"
                placeholder="you@example.com"
                icon={Mail}
                value={form.email}
                onChange={set("email")}
                error={errors.email}
              />
              <Input
                label="Phone (optional)"
                type="tel"
                placeholder="+1 234 567 8900"
                icon={Phone}
                value={form.phone}
                onChange={set("phone")}
              />
            </div>

            {/* Row 3 — Password + Confirm side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
              <Input
                label="Password"
                type="password"
                placeholder="Min 8 chars"
                value={form.password}
                onChange={set("password")}
                error={errors.password}
              />
              <Input
                label="Confirm password"
                type="password"
                placeholder="Repeat password"
                value={form.confirmPassword}
                onChange={set("confirmPassword")}
                error={errors.confirmPassword}
              />
            </div>

            {/* Password hint */}
            <p className="text-xs text-neutral-400 mb-6">
              Password must have 8+ characters, 1 uppercase letter, and 1 number.
            </p>

            <Button type="submit" fullWidth size="lg" loading={loading}>
              Create Free Account
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-100" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs text-neutral-400">OR</span>
            </div>
          </div>

          <p className="text-center text-sm text-neutral-500">
            Already have an account?{" "}
            <Link to="/login" className="text-brand-500 font-semibold hover:underline">
              Sign in
            </Link>
          </p>

          <p className="text-center text-[11px] text-neutral-400 mt-4 leading-relaxed">
            By creating an account you agree to our{" "}
            <span className="text-brand-500 cursor-pointer hover:underline">Terms of Service</span>
            {" "}&{" "}
            <span className="text-brand-500 cursor-pointer hover:underline">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
