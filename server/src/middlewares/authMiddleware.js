import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,  
      email: decoded.email,
    };

    next();
  } catch (error) {
    console.error('Error en authMiddleware:', error.message);
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
