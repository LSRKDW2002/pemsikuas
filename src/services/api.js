import axios from "axios";

// Konfigurasi Axios
const api = axios.create({
  baseURL: "http://localhost:5005/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Fungsi untuk mengambil semua data kekeringan
export const getDroughtData = async () => {
  const response = await api.get("/drought");
  return response.data;
};

// Fungsi untuk menambah data kekeringan
export const addDroughtData = async (data) => {
  const response = await api.post("/drought", data);
  return response.data;
};

// Fungsi untuk memperbarui data kekeringan
export const updateDroughtData = async (id, data) => {
    const response = await api.put(`/drought/${id}`, data);
    return response.data;
  };

// Fungsi untuk menghapus data kekeringan
export const deleteDroughtData = async (id) => {
  const response = await api.delete(`/drought/${id}`);
  return response.data;
};

export default api;