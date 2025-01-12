import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Register = () => {
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false); // Kontrol ikon mata untuk password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Kontrol ikon mata untuk konfirmasi password
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Password dan Konfirmasi Password harus sama!");
      return;
    }
    // Simulasi pendaftaran sukses
    console.log("Pendaftaran berhasil:", form);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Masukkan email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Masukkan password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
              >
                <FontAwesomeIcon icon={showPassword ? "eye-slash" : "eye"} />
              </span>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Konfirmasi Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Konfirmasi password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
                required
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
              >
                <FontAwesomeIcon icon={showConfirmPassword ? "eye-slash" : "eye"} />
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition shadow-lg"
          >
            Daftar
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Sudah punya akun?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;