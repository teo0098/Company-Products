import express, { Request, Response } from "express";
import sendXML from "xml";
import cors from "cors";

import { Connection } from "./interfaces/Connection";
import { connectToDb } from "./middlewares/connectToDb";
import { Product } from "./types/Product";

const server = express();

server.use(
  cors({
    origin: "*",
    methods: ["GET"],
  })
);

server.get("/", connectToDb, async (req: Request, res: Response) => {
  try {
    const connection = (req as Connection).conn;
    const [products] = await connection.execute(
      `SELECT products.name, products.description, products.price, products.picture, categories.category, vendors.vendor 
      FROM products
      JOIN categories ON products.category_id=categories.id 
      JOIN vendors ON products.vendor_id=vendors.id`
    );
    const XMLObject: { products: Array<{ product: Array<{}> }> } = {
      products: [],
    };
    (products as Product[]).forEach((product) => {
      XMLObject.products.push({
        product: [
          { name: product.name },
          { description: product.description },
          { price: product.price },
          { picture: product.picture },
          { category: product.category },
          { vendor: product.vendor },
        ],
      });
    });
    res.setHeader("Content-Type", "text/xml");
    res.status(200).send(sendXML(XMLObject));
  } catch {
    res.status(500).json({ error: "Unable to retrieve products" });
  }
});

server.get("*", (_, res) => {
  res.json({ error: "Page Not Found" });
});

server.listen(5000, () => {
  console.log("Server is listening...");
});
