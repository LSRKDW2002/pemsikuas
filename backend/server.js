const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // Izinkan permintaan dari domain lain
app.use(express.json()); // Middleware untuk membaca body JSON

// Simpan data sementara dalam array (simulasi database)
let droughtData = [];

// GET: Ambil semua data kekeringan
app.get("/api/drought", (req, res) => {
  res.status(200).json(droughtData);
});

// POST: Tambah data kekeringan
app.post("/api/drought", (req, res) => {
  const newData = { id: Date.now().toString(), ...req.body };
  console.log("Data yang diterima:", newData); // Log data yang diterima
  droughtData.push(newData);
  res.status(201).json(newData);
});

// PUT: Perbarui data kekeringan
app.put("/api/drought/:id", (req, res) => {
  const { id } = req.params;
  const index = droughtData.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Data tidak ditemukan" });
  }
  droughtData[index] = { ...droughtData[index], ...req.body };
  res.status(200).json(droughtData[index]);
});

// DELETE: Hapus data kekeringan
app.delete("/api/drought/:id", (req, res) => {
  const { id } = req.params;
  droughtData = droughtData.filter((item) => item.id !== id);
  res.status(200).json({ message: "Data berhasil dihapus" });
});

// Jalankan server
const PORT = 5005;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});