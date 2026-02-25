import { useState } from "react";
import { Mail, Lock, GraduationCap, User, Shield, Phone, Building } from "lucide-react";

export default function Login() {
  const [role, setRole] = useState("student");

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#0f172a] text-white">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center px-20 relative">
        <h1 className="text-5xl font-bold mb-6 leading-tight">
          Sortiq <br />
          <span className="text-blue-400">Management Software</span>
        </h1>

        <h2 className="text-2xl text-blue-300 mb-4">
          Integrate Technology With Modern Education
        </h2>

        <p className="text-gray-300 max-w-md leading-relaxed">
          Integrated School, College & Institute Management System that
          streamlines academics, administration, and operations using
          modern technology.
        </p>

        <div className="w-20 h-1 bg-blue-500 mt-6 rounded-full"></div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6">
        <div className="w-full max-w-xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">

          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

          {/* Role Tabs */}
          <div className="flex justify-between bg-white/10 rounded-full p-1 mb-6">
            {[
              { key: "student", label: "Student", icon: GraduationCap },
              { key: "teacher", label: "Teacher", icon: User },
              { key: "admin", label: "Admin", icon: Shield },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  onClick={() => setRole(item.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                    role === item.key
                      ? "bg-blue-500 text-white shadow-md"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-sm text-gray-300">Email Address</label>
            <div className="flex items-center bg-white/10 rounded-xl px-4 py-3 mt-1 border border-white/20 focus-within:border-blue-400 transition">
              <Mail size={18} className="text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="name@college.com"
                className="bg-transparent w-full outline-none text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Phone Number (FOR ALL) */}
          <div className="mb-4">
            <label className="text-sm text-gray-300">Phone Number</label>
            <div className="flex items-center bg-white/10 rounded-xl px-4 py-3 mt-1 border border-white/20 focus-within:border-blue-400 transition">
              <Phone size={18} className="text-gray-400 mr-2" />
              <input
                type="tel"
                placeholder="+91 98765 43210"
                className="bg-transparent w-full outline-none text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Org Code (ONLY Teacher & Admin) */}
          {(role === "teacher" || role === "admin") && (
            <div className="mb-4">
              <label className="text-sm text-gray-300">Organization Code</label>
              <div className="flex items-center bg-white/10 rounded-xl px-4 py-3 mt-1 border border-white/20 focus-within:border-blue-400 transition">
                <Building size={18} className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Enter organization code"
                  className="bg-transparent w-full outline-none text-white placeholder-gray-400"
                />
              </div>
            </div>
          )}

          {/* Password */}
          <div className="mb-4">
            <label className="text-sm text-gray-300">Password</label>
            <div className="flex items-center bg-white/10 rounded-xl px-4 py-3 mt-1 border border-white/20 focus-within:border-blue-400 transition">
              <Lock size={18} className="text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="Enter your password"
                className="bg-transparent w-full outline-none text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center text-sm text-gray-300 mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-blue-500" />
              Remember me
            </label>

            <a href="#" className="text-blue-400 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Button */}
          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 transition-all duration-300 font-semibold shadow-lg">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}