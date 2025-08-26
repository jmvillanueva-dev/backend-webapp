import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

// Obtener todas las materias
export const getMaterias = async (req, res) => {
  try {
    const materias = await prisma.materia.findMany();
    res.status(200).json(materias);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener las materias", error: err.message });
  }
};

// Obtener una materia por ID
export const getMateriaById = async (req, res) => {
  try {
    const { id } = req.params;
    const materia = await prisma.materia.findUnique({
      where: { id: parseInt(id) },
    });

    if (!materia) {
      return res.status(404).json({ message: "Materia no encontrada" });
    }
    res.status(200).json(materia);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener la materia", error: err.message });
  }
};

// Crear una nueva materia
export const createMateria = async (req, res) => {
  try {
    const { nombre, codigo, descripcion, creditos } = req.body;
    const nuevaMateria = await prisma.materia.create({
      data: { nombre, codigo, descripcion, creditos },
    });
    res.status(201).json(nuevaMateria);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al crear la materia", error: err.message });
  }
};

// Actualizar una materia
export const updateMateria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, codigo, descripcion, creditos } = req.body;
    const materiaActualizada = await prisma.materia.update({
      where: { id: parseInt(id) },
      data: { nombre, codigo, descripcion, creditos },
    });
    res.status(200).json(materiaActualizada);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al actualizar la materia", error: err.message });
  }
};

// Eliminar una materia
export const deleteMateria = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.materia.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Materia eliminada exitosamente" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al eliminar la materia", error: err.message });
  }
};
