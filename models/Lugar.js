const mongoose = require("mongoose");

const LugarSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  categoria: { type: mongoose.Schema.Types.ObjectId, ref: "Categoria", required: true }, // referência
  localizacao: { type: String, required: true },
  urlFoto: { type: String, required: true },
  avaliacao: { type: Number, required: true },
  site: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Lugar", LugarSchema);
