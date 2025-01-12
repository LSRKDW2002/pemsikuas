import { useState } from "react";
import { addDroughtData } from "../services/api";
import Swal from "sweetalert2";

const CRUD = () => {
  const [form, setForm] = useState({ name: "", description: "", location: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.description || !form.location) {
      Swal.fire("Gagal", "Semua field harus diisi!", "error");
      return;
    }
    try {
      await addDroughtData(form);
      setForm({ name: "", description: "", location: "" }); 
      Swal.fire("Berhasil", "Data berhasil ditambahkan!", "success");
    } catch (err) {
      Swal.fire("Gagal", "Terjadi kesalahan saat menambahkan data.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-blue-900 to-black text-white flex items-center justify-center">
      <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Tambah Data Kekeringan</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Nama Data</label>
            <input
              type="text"
              name="name"
              placeholder="Masukkan nama data"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Deskripsi Data</label>
            <textarea
              name="description"
              placeholder="Masukkan deskripsi data"
              value={form.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 resize-none h-32"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Lokasi Data</label>
            <input
              type="text"
              name="location"
              placeholder="Masukkan lokasi data"
              value={form.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition shadow-lg"
          >
            Tambah Data
          </button>
        </form>
      </div>
    </div>
  );
};

export default CRUD;