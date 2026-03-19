import React, { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Edit2, Check, X } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";
import { getInitials } from "../../utils/helpers";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "John Doe",
    email: user?.sub || user?.email || "user@example.com",
    phone: user?.phone || "+1 234 567 8900",
    address: user?.address || "123 Main St, City",
  });

  const handleSave = () => {
    // In production: dispatch updateProfile action
    toast.success("Profile updated!");
    setEditing(false);
  };

  const stats = [
    { label: "Total Orders", value: "24" },
    { label: "Restaurants", value: "12" },
    { label: "Saved", value: "₹3,200" },
  ];

  return (
    <div className="pt-16 min-h-screen bg-neutral-50">
      <div className="page-container py-8 max-w-2xl">
        <h1 className="section-title mb-6">My Profile</h1>

        {/* Avatar & Stats */}
        <div className="card p-6 mb-6 text-center">
          <div className="w-20 h-20 bg-brand-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-3">
            {getInitials(form.name)}
          </div>
          <h2 className="text-xl font-bold text-neutral-900">{form.name}</h2>
          <p className="text-neutral-400 text-sm">{form.email}</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 border-t border-neutral-100 pt-6">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-brand-500">{s.value}</div>
                <div className="text-xs text-neutral-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Edit Profile */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-neutral-900">Personal Information</h3>
            {!editing ? (
              <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>
                <Edit2 size={14} /> Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => { setEditing(false); }}>
                  <X size={14} /> Cancel
                </Button>
                <Button size="sm" onClick={handleSave}>
                  <Check size={14} /> Save
                </Button>
              </div>
            )}
          </div>

          {editing ? (
            <div className="space-y-4">
              <Input label="Full Name" value={form.name} icon={User} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <Input label="Email" type="email" value={form.email} icon={Mail} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <Input label="Phone" type="tel" value={form.phone} icon={Phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <Input label="Default Address" value={form.address} icon={MapPin} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </div>
          ) : (
            <div className="space-y-4">
              {[
                { icon: User, label: "Name", val: form.name },
                { icon: Mail, label: "Email", val: form.email },
                { icon: Phone, label: "Phone", val: form.phone },
                { icon: MapPin, label: "Address", val: form.address },
              ].map(({ icon: Icon, label, val }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-brand-50 rounded-xl flex items-center justify-center text-brand-500 shrink-0">
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-400">{label}</p>
                    <p className="text-sm font-medium text-neutral-800">{val}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
