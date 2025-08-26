import jwt from "jsonwebtoken";
import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Acceso denegado. No se proporcionó un token." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await prisma.usuario.findUnique({ where: { id: decoded.id } });

    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Token inválido. Usuario no encontrado." });
    }

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({
          message: "El token ha expirado. Por favor, inicia sesión nuevamente.",
        });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Token inválido." });
    }
    res.status(500).json({ message: "Error en el servidor." });
  }
};
