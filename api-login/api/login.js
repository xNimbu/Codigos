const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Método no permitido' });
    }

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    // Leer usuarios dinámicamente desde el archivo JSON
    const usersFilePath = path.join(__dirname, 'data', 'users.json');
    if (!fs.existsSync(usersFilePath)) {
      return res.status(500).json({ message: 'No se encontraron usuarios registrados' });
    }
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));

    // Buscar usuario
    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Comparar contraseña
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user.idEstudiante || null, username: user.username, role: user.role || 'user' },
      process.env.JWT_SECRET || 'mi_secreto_super_seguro',
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        username: user.username,
        nombre: user.nombre,
        role: user.role || 'user',
      },
    });
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
