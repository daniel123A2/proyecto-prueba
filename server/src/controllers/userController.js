import User from "../models/User.js";

export const updateUser = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "No autorizado" });
    }

    const userId = req.user.id;
    const { nombre, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { nombre, email },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario actualizado", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar" });
  }
};
