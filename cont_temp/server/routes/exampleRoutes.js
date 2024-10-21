import express from "express";

const exampleRouter = express.Router();

exampleRouter.get("/example", (req, res) => {
  res.json({ message: "hello world" });
});

export default exampleRouter;
