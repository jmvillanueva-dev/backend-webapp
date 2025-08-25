import app from "./server.js";

app.listen(app.get("port"), () => {
  console.log(`🚀 Server corriendo en puerto ${app.get("port")}`);
});