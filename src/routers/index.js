import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.js";
import {
  registerUser,
  loginUser,
  confirmUser,
} from "../controllers/userController.js";
import {
  getMaterias,
  getMateriaById,
  createMateria,
  updateMateria,
  deleteMateria,
} from "../controllers/materiaController.js";
import {
  getEstudiantes,
  getEstudianteById,
  createEstudiante,
  updateEstudiante,
  deleteEstudiante,
} from "../controllers/estudianteController.js";
import {
  getMatriculas,
  getMatriculaById,
  createMatricula,
  updateMatricula,
  deleteMatricula,
} from "../controllers/matriculaController.js";

const router = Router();

// Rutas públicas (no requieren autenticación)
router.post("/users/register", registerUser);
router.post("/users/login", loginUser);
router.get("/users/confirm/:token", confirmUser);

// Rutas protegidas (requieren autenticación con el middleware)
router.use(authMiddleware);

// Rutas para Materias
router.get("/materias", getMaterias);
router.get("/materias/:id", getMateriaById);
router.post("/materias", createMateria);
router.put("/materias/:id", updateMateria);
router.delete("/materias/:id", deleteMateria);

// Rutas para Estudiantes
router.get("/estudiantes", getEstudiantes);
router.get("/estudiantes/:id", getEstudianteById);
router.post("/estudiantes", createEstudiante);
router.put("/estudiantes/:id", updateEstudiante);
router.delete("/estudiantes/:id", deleteEstudiante);

// Rutas para Matrículas
router.get("/matriculas", getMatriculas);
router.get("/matriculas/:id", getMatriculaById);
router.post("/matriculas", createMatricula);
router.put("/matriculas/:id", updateMatricula);
router.delete("/matriculas/:id", deleteMatricula);

export default router;
