import express from 'express';
import User from '../models/User.js';
import { protect } from '../middlewares/authMiddleware.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener perfil' });
  }
});


router.put('/me', protect, async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const updateData = {};

  
    if (nombre) updateData.nombre = nombre;
    if (email) updateData.email = email;

  
    if (password && password.trim() !== '') {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true, runValidators: true } 
    ).select('-password');

    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json({ message: 'Perfil actualizado', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar perfil' });
  }
});

export default router;
