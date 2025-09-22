const express = require("express");
const router = express.Router();
const Lugar = require("../models/Lugar");

// GET todos os lugares (com filtro por nome e categoria)
router.get("/", async (req, res) => {
  try {
    const filtro = {};
    if (req.query.nome_like) filtro.nome = { $regex: req.query.nome_like, $options: "i" };
    if (req.query.categoria && req.query.categoria !== "-1") filtro.categoria = req.query.categoria;

    const lugares = await Lugar.find(filtro).populate("categoria"); // popula a categoria
    res.json(lugares);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar lugares", error: err });
  }
});

// GET lugar por ID
router.get("/:id", async (req, res) => {
  try {
    const lugar = await Lugar.findById(req.params.id).populate("categoria");
    if (!lugar) return res.status(404).json({ message: "Lugar não encontrado" });
    res.json(lugar);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar lugar", error: err });
  }
});

// POST criar lugar
router.post("/", async (req, res) => {
  try {
    const novoLugar = new Lugar(req.body);
    await novoLugar.save();
    const lugarPopulado = await novoLugar.populate("categoria");
    res.status(201).json(lugarPopulado);
  } catch (err) {
    res.status(400).json({ message: "Erro ao criar lugar", error: err });
  }
});

// PUT atualizar lugar
router.put("/:id", async (req, res) => {
  try {
    const lugarAtualizado = await Lugar.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("categoria");
    res.json(lugarAtualizado);
  } catch (err) {
    res.status(400).json({ message: "Erro ao atualizar lugar", error: err });
  }
});

// DELETE remover lugar
router.delete("/:id", async (req, res) => {
  try {
    await Lugar.findByIdAndDelete(req.params.id);
    res.json({ message: "Lugar removido" });
  } catch (err) {
    res.status(400).json({ message: "Erro ao remover lugar", error: err });
  }
});

module.exports = router;
