import express from "express";
import cors from "cors";
import exampleRouter from "./routes/exampleRoutes.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/api", exampleRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
