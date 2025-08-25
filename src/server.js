import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routers/index.js";

dotenv.config() // Cargar las variables definidas en el archivo .env al process.env.

const app = express() // Inicializar Express

app.set("port", process.env.PORT || 3000); // Establecer el puerto
app.use(cors()) // Habilitar CORS
app.use(express.json());

// Definir Rutas
app.get('/',(req,res)=>{
    res.send("Server on")
})

app.use("/api", router);


export default app;