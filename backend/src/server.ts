import express from "express";
import cors from "cors";

import productsRoutes from "./routes/products";
import categoriesRoutes from "./routes/categories";
import vendorsRoutes from "./routes/vendors";

const server = express();

server.use(
  cors({
    origin: "*",
    methods: ["GET"],
  })
);

server.use(productsRoutes);
server.use(categoriesRoutes);
server.use(vendorsRoutes);

server.get("*", (_, res) => {
  res.status(404).json({ error: "Page Not Found" });
});

server.listen(5000, () => {
  console.log("Server is listening...");
});
