import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { v4 as uuidv4 } from "uuid";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const submitData = {
        ...formData,
        id: uuidv4(),
      };

      const response = await api.post("/auth/signup", submitData);

      if (response.data.success) {
        alert("Account created successfully!");
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "something went wrong.Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 p-4">
      <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl w-full max-w-sm p-6 border border-white/30">
        <h2 className="text-2xl font-bold text-center text-white mb-5">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full px-4 py-2 rounded-xl outline-none bg-white/80 text-gray-800 placeholder-gray-600 focus:ring-2 focus:ring-purple-400"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full px-4 py-2 rounded-xl outline-none bg-white/80 text-gray-800 placeholder-gray-600 focus:ring-2 focus:ring-pink-400"
            required
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create Password"
            className="w-full px-4 py-2 rounded-xl outline-none bg-white/80 text-gray-800 placeholder-gray-600 focus:ring-2 focus:ring-blue-400"
            required
          />

          {error && (
            <p className="text-red-300 text-sm text-center font-medium bg-red-500/20 py-1 rounded-lg">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-xl font-semibold text-white transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:scale-[1.03] hover:bg-gray-900"
            }`}
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-white text-sm mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-yellow-300 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
