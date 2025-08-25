import { PrismaClient } from "../generated/prisma/client.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendMailToRegister } from "../config/nodemailer.js";

const prisma = new PrismaClient();

export const registerUser = async (req, res) => {
  try {
    const { nombre, apellido, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Las contraseñas no coinciden." });
    }

    const existingUser = await prisma.usuario.findUnique({ where: { email } });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "El email ingresado ya se encuentra registrado" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.usuario.create({
      data: {
        nombre,
        apellido,
        email,
        password: hashedPassword,
        isActive: false,
      },
    });

    // Generar token de verificación
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // URL de confirmación
    const urlConfirm = `${process.env.FRONTEND_URL}/confirm/${token}`;

    // Enviar correo de confirmación
    sendMailToRegister(user.email, urlConfirm);

    res.status(200).json({
      message: "Usuario registrado. Revisa tu correo para confirmar la cuenta.",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.usuario.findUnique({ where: { email } });

    // Mejorar el mensaje para cuando el usuario no existe.
    if (!user) {
      return res
        .status(404)
        .json({ message: "El correo electrónico no está registrado." });
    }

    // Verificar si la cuenta está confirmada
    if (!user.isActive) {
      return res.status(403).json({
        message:
          "Tu cuenta no ha sido confirmada. Revisa tu correo electrónico.",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Credenciales Incorrectas. Verifica tu email y contrasena." });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, nombre: user.nombre },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const { password: _, ...userData } = user;

    res.status(200).json({
      message: `Bienvenido - ${user.nombre}`,
      token,
      user: userData,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const confirmUser = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.usuario.findUnique({ where: { id: decoded.id } });

    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado." });
    }

    if (user.isActive) {
      return res
        .status(200)
        .json({ message: "Tu cuenta ya ha sido confirmada." });
    }

    await prisma.usuario.update({
      where: { id: decoded.id },
      data: { isActive: true },
    });

    return res.status(200).json({ message: "Cuenta confirmada exitosamente." });
  } catch (err) {
    return res.status(400).json({
      message: "El enlace de confirmación es inválido o ha expirado.",
    });
  }
};
