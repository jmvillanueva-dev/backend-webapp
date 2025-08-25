import { Router } from "express";
import userRoutes from "./userRoute.js";
// import materiaRoutes from "./materiaRoute.js";
// import estudianteRoutes from "./estudianteRoute.js";

const router = Router();

router.use("/users", userRoutes);
// router.use("/materias", materiaRoutes);
// router.use("/estudiantes", estudianteRoutes);

export default router;
