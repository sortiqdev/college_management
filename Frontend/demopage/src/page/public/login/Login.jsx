import { useState } from "react";
import { Mail, Lock, Phone } from "lucide-react";
import API from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useUser } from "../../../hooks/useUser";

export default function Login() {


  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showForgot, setShowForgot] = useState(false);
const [email, setEmail] = useState("");
const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { saveUser } = useUser();

  const handleLogin = async (e) => {

    e.preventDefault();

    const payload = {
      email,
      password,
      phone
    };

    try {

      const res = await API.post("/login", payload);

      console.log("==== Login Response ====");
      console.log(res.data);

      const { token, user } = res.data;

      saveUser(user);

      const decode = jwtDecode(token);

      console.log("==== Decoded JWT ====");
      console.log(decode);

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);

      // Redirect based on backend role

      switch(user.role){

        case "student":
          navigate("/dashboard/student");
          break;

        case "teacher":
          navigate("/dashboard/teacher");
          break;

        case "admin":
          navigate("/dashboard/admin");
          break;

        case "staff":
          navigate("/dashboard/staff");
          break;

        default:
          navigate("/");
      }

    } catch (error) {

      console.error("Login Failed ❌", error.response?.data || error.message);

      alert(error.response?.data?.message || "Login Failed");

    }

  };


  const handleForgotPassword = async () => {
  try {
    setLoading(true);

    const res = await API.post("/auth/forgot-password", {
      email: email,
    });

    alert(res.data.message || "Reset link sent to your email");

    setShowForgot(false);
    setEmail("");

  } catch (error) {
    alert(error.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (

    <div className="min-h-screen flex bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#0f172a] text-white">

      {/* LEFT SIDE */}

      <div className="hidden lg:flex w-1/2 flex-col justify-center px-20">

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

      <div className="flex w-full lg:w-1/2 items-center justify-center my-[100px] p-6">

        <div className="w-full max-w-xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">

          <h2 className="text-2xl font-semibold text-center mb-6">
            Login
          </h2>

          {/* EMAIL */}

          <div className="mb-4">

            <label className="text-sm text-gray-300">
              Email Address
            </label>

            <div className="flex items-center bg-white/10 rounded-xl px-4 py-3 mt-1 border border-white/20 focus-within:border-blue-400 transition">

              <Mail size={18} className="text-gray-400 mr-2" />

              <input
                type="email"
                placeholder="name@college.com"
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent w-full outline-none text-white placeholder-gray-400"
              />

            </div>

          </div>

          {/* PHONE */}

          <div className="mb-4">

            <label className="text-sm text-gray-300">
              Phone Number
            </label>

            <div className="flex items-center bg-white/10 rounded-xl px-4 py-3 mt-1 border border-white/20 focus-within:border-blue-400 transition">

              <Phone size={18} className="text-gray-400 mr-2" />

              <input
                type="tel"
                placeholder="+91 98765 43210"
                onChange={(e) => setPhone(e.target.value)}
                className="bg-transparent w-full outline-none text-white placeholder-gray-400"
              />

            </div>

          </div>

          {/* PASSWORD */}

          <div className="mb-4">

            <label className="text-sm text-gray-300">
              Password
            </label>

            <div className="flex items-center bg-white/10 rounded-xl px-4 py-3 mt-1 border border-white/20 focus-within:border-blue-400 transition">

              <Lock size={18} className="text-gray-400 mr-2" />

              <input
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent w-full outline-none text-white placeholder-gray-400"
              />

            </div>

          </div>

          {/* REMEMBER */}

          <div className="flex justify-between items-center text-sm text-gray-300 mb-6">

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-blue-500" />
              Remember me
            </label>

           <a
  href="#"
  onClick={() => setShowForgot(true)}
  className="text-blue-400 hover:underline"
>
  Forgot password?
</a>

          </div>

          {/* LOGIN BUTTON */}

          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 transition-all duration-300 font-semibold shadow-lg"
          >
            Sign In
          </button>

        </div>

      </div>
      {showForgot && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    
    <div className="bg-white w-[400px] rounded-lg p-6 shadow-lg">
      
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Reset Password
      </h2>

      <p className="text-sm text-gray-500 mb-4">
        Enter your email to receive a password reset link.
      </p>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex justify-end gap-2">

        <button
          onClick={() => setShowForgot(false)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Cancel
        </button>

        <button
          onClick={handleForgotPassword}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? "Sending..." : "Send Mail"}
        </button>

      </div>
    </div>
  </div>
)}

    </div>

  );

}