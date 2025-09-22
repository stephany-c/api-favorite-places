const express = require("express");
const router = express.Router();
const Categoria = require("../models/Categoria");

// GET todas as categorias
router.get("/", async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar categorias", error: err });
  }
});

// GET categoria por ID
router.get("/:id", async (req, res) => {
  try {
    const categoria = await Categoria.findById(req.params.id);
    if (!categoria) return res.status(404).json({ message: "Categoria não encontrada" });
    res.json(categoria);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar categoria", error: err });
  }
});

// POST criar categoria
router.post("/", async (req, res) => {
  try {
    const novaCategoria = new Categoria(req.body);
    await novaCategoria.save();
    res.status(201).json(novaCategoria);
  } catch (err) {
    res.status(400).json({ message: "Erro ao criar categoria", error: err });
  }
});

// PUT atualizar categoria
router.put("/:id", async (req, res) => {
  try {
    const categoria = await Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(categoria);
  } catch (err) {
    res.status(400).json({ message: "Erro ao atualizar categoria", error: err });
  }
});

// DELETE remover categoria
router.delete("/:id", async (req, res) => {
  try {
    await Categoria.findByIdAndDelete(req.params.id);
    res.json({ message: "Categoria removida" });
  } catch (err) {
    res.status(400).json({ message: "Erro ao remover categoria", error: err });
  }
});

module.exports = router;
