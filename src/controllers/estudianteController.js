import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

// Obtener todos los estudiantes
export const getEstudiantes = async (req, res) => {
  try {
    const estudiantes = await prisma.estudiante.findMany();
    res.status(200).json(estudiantes);
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Error al obtener los estudiantes",
        error: err.message,
      });
  }
};

// Obtener un estudiante por ID
export const getEstudianteById = async (req, res) => {
  try {
    const { id } = req.params;
    const estudiante = await prisma.estudiante.findUnique({
      where: { id: parseInt(id) },
    });

    if (!estudiante) {
      return res.status(404).json({ message: "Estudiante no encontrado" });
    }
    res.status(200).json(estudiante);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener el estudiante", error: err.message });
  }
};

// Crear un nuevo estudiante
export const createEstudiante = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      cedula,
      fechaNacimiento,
      ciudad,
      direccion,
      telefono,
      email,
    } = req.body;
    const nuevoEstudiante = await prisma.estudiante.create({
      data: {
        nombre,
        apellido,
        cedula,
        fechaNacimiento,
        ciudad,
        direccion,
        telefono,
        email,
      },
    });
    res.status(201).json(nuevoEstudiante);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al crear el estudiante", error: err.message });
  }
};

// Actualizar un estudiante
export const updateEstudiante = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre,
      apellido,
      cedula,
      fechaNacimiento,
      ciudad,
      direccion,
      telefono,
      email,
    } = req.body;
    const estudianteActualizado = await prisma.estudiante.update({
      where: { id: parseInt(id) },
      data: {
        nombre,
        apellido,
        cedula,
        fechaNacimiento,
        ciudad,
        direccion,
        telefono,
        email,
      },
    });
    res.status(200).json(estudianteActualizado);
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Error al actualizar el estudiante",
        error: err.message,
      });
  }
};

// Eliminar un estudiante
export const deleteEstudiante = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.estudiante.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Estudiante eliminado exitosamente" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al eliminar el estudiante", error: err.message });
  }
};
