import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

// Obtener todas las matrículas, incluyendo estudiante y materia
export const getMatriculas = async (req, res) => {
  try {
    const matriculas = await prisma.matricula.findMany({
      include: {
        estudiante: true,
        materia: true,
      },
    });
    res.status(200).json(matriculas);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener las matrículas", error: err.message });
  }
};

// Obtener una matrícula por ID
export const getMatriculaById = async (req, res) => {
  try {
    const { id } = req.params;
    const matricula = await prisma.matricula.findUnique({
      where: { id: parseInt(id) },
      include: {
        estudiante: true,
        materia: true,
      },
    });

    if (!matricula) {
      return res.status(404).json({ message: "Matrícula no encontrada" });
    }
    res.status(200).json(matricula);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener la matrícula", error: err.message });
  }
};

// Crear una nueva matrícula
export const createMatricula = async (req, res) => {
  try {
    const { codigo, descripcion, estudianteId, materiaId } = req.body;
    const nuevaMatricula = await prisma.matricula.create({
      data: {
        codigo,
        descripcion,
        estudianteId,
        materiaId,
      },
    });
    res.status(201).json(nuevaMatricula);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al crear la matrícula", error: err.message });
  }
};

// Actualizar una matrícula
export const updateMatricula = async (req, res) => {
  try {
    const { id } = req.params;
    const { codigo, descripcion, estudianteId, materiaId } = req.body;
    const matriculaActualizada = await prisma.matricula.update({
      where: { id: parseInt(id) },
      data: { codigo, descripcion, estudianteId, materiaId },
    });
    res.status(200).json(matriculaActualizada);
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Error al actualizar la matrícula",
        error: err.message,
      });
  }
};

// Eliminar una matrícula
export const deleteMatricula = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.matricula.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Matrícula eliminada exitosamente" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al eliminar la matrícula", error: err.message });
  }
};
