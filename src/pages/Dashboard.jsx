import { useEffect, useState } from "react";
import { getDroughtData, updateDroughtData, deleteDroughtData } from "../services/api";
import Swal from "sweetalert2";

const Dashboard = () => {
  const [droughtData, setDroughtData] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", location: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Data dummy
        const dummyData = [
          { id: "1", name: "Kekeringan Jawa", description: "Kekeringan parah di Jawa Timur", location: "Jawa Timur" },
          { id: "2", name: "Kekeringan Bali", description: "Kekeringan sedang di Bali", location: "Bali" },
          { id: "3", name: "Kekeringan Kalimantan", description: "Kekeringan ringan di Kalimantan", location: "Kalimantan" },
        ];

        // Data dari API
        const apiData = await getDroughtData();

        setDroughtData([...dummyData, ...apiData]);
      } catch (err) {
        console.error("Error saat mengambil data:", err);
      }
    };

    fetchData();
  }, []);

  const openModal = (data) => {
    setModalData(data);
    setForm(data); 
  };

  const closeModal = () => {
    setModalData(null);
    setForm({ name: "", description: "", location: "" });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!form.name || !form.description || !form.location) {
      Swal.fire("Gagal", "Semua field harus diisi!", "error");
      return;
    }
    try {
      const updatedData = { ...modalData, ...form }; 
      setDroughtData(
        droughtData.map((item) =>
          item.id === modalData.id ? updatedData : item
        )
      );
      closeModal();
      Swal.fire("Berhasil", "Data berhasil diperbarui!", "success");
    } catch (err) {
      Swal.fire("Gagal", "Terjadi kesalahan saat memperbarui data.", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDroughtData(id); 
      setDroughtData(droughtData.filter((item) => item.id !== id)); 
      Swal.fire("Berhasil", "Data berhasil dihapus!", "success");
    } catch (err) {
      Swal.fire("Gagal", "Terjadi kesalahan saat menghapus data.", "error");
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 via-blue-200 to-purple-200 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Kekeringan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {droughtData.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
            <p className="text-gray-600 truncate">{item.description}</p>
            <p className="text-gray-600">Lokasi: {item.location}</p>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => openModal(item)}
                className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalData && (
        <div className="fixed inset-0 bg-gradient-to-r from-black via-gray-800 to-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-2/3 max-w-4xl overflow-hidden">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Edit Data</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Nama Kekeringan</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Nama Kekeringan"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Deskripsi Kekeringan</label>
                <textarea
                  name="description"
                  placeholder="Deskripsi Kekeringan"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 resize-none h-40"
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Lokasi Kekeringan</label>
                <input
                  type="text"
                  name="location"
                  placeholder="Lokasi Kekeringan"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
                  required
                />
              </div>
            </form>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={closeModal}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;