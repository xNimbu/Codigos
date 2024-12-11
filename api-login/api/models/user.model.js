const bcrypt = require('bcryptjs');

const users = [
  {
    username: "lui.illanes",
    nombre: "Luis Illanes Lagos",
    idEstudiante: "19846866-5",
    carrera: "Analista Programador",
    email: "lui.illanes@duocuc.cl",
    password: bcrypt.hashSync("contrasena123", 10), // Contraseña encriptada
    role: "student"
  },
  {
    username: "her.quiroz",
    nombre: "Hernán Quiroz Olivares",
    idEstudiante: "17086429-8",
    carrera: "Analista Programador",
    email: "her.quiroz@duocuc.cl",
    password: bcrypt.hashSync("contrasena123", 10), // Contraseña encriptada
    role: "student"
  },
  {
    username: "prof.jara",
    nombre: "Profesor Jara Soto",
    idEstudiante: null, // Campo no aplicable para el profesor
    carrera: null, // Campo no aplicable para el profesor
    email: "prof.jara@duocuc.cl",
    password: bcrypt.hashSync("profesor123", 10), // Contraseña encriptada
    role: "teacher"
  }
];


module.exports = users;
