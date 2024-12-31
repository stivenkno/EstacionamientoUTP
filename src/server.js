import express from "express";
import VAR_ENTORNO from "../exportsenv.js";

const app = express();
const PORT = VAR_ENTORNO.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
