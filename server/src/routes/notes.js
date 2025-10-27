import express from "express";
import Note from "../models/Note.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener notas" });
  }
});

router.post("/", protect, async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content, userId: req.user.id });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear nota" });
  }
});

router.put("/:id", protect, async (req, res) => {
  try {
    const updated = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Nota no encontrada" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar nota" });
  }
});

// Eliminar nota
router.delete("/:id", protect, async (req, res) => {
  try {
    const deleted = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deleted) return res.status(404).json({ error: "Nota no encontrada" });
    res.json({ message: "Nota eliminada" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar nota" });
  }
});

export default router;
