import express, { Request, Response } from "express";
import sendXML from "xml";

import { Connection } from "../interfaces/Connection";
import { connectToDb } from "../middlewares/connectToDb";
import { Product } from "../../../types/Product";

const router = express.Router();

router.get("/products", connectToDb, async (req: Request, res: Response) => {
  try {
    const connection = (req as Connection).conn;
    let orderBy: string = "";
    let category: string = "%";
    let vendor: string = "%";
    if (req.query.category && req.query.category !== "*")
      category = `${req.query.category}`;
    if (req.query.vendor && req.query.vendor !== "*")
      vendor = `${req.query.vendor}`;
    if (req.query.sortByPrice === "true")
      orderBy = "ORDER BY products.price DESC";
    const [products] = await connection.execute(
      `SELECT products.name, products.price, products.picture, categories.category, vendors.vendor 
      FROM products
      JOIN categories ON products.category_id=categories.id 
      JOIN vendors ON products.vendor_id=vendors.id 
      WHERE categories.category LIKE ? AND vendors.vendor LIKE ? ${orderBy}`,
      [category, vendor]
    );
    if (!products || products.length === 0) throw new Error();
    const XMLObject: {
      products: Array<{ product: Array<Partial<Product>> }>;
    } = {
      products: [],
    };
    (products as Partial<Product>[]).forEach((product) => {
      XMLObject.products.push({
        product: [
          { name: product.name },
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

router.get(
  "/products/:name",
  connectToDb,
  async (req: Request, res: Response) => {
    try {
      const connection = (req as Connection).conn;
      const [product] = await connection.execute(
        `SELECT products.name, products.price, products.picture, products.description, categories.category, vendors.vendor 
          FROM products
          JOIN categories ON products.category_id=categories.id 
          JOIN vendors ON products.vendor_id=vendors.id 
          WHERE products.name = ?`,
        [req.params.name]
      );
      if (!product || product.length === 0) throw new Error();
      const XMLObject: {
        product: Array<Partial<Product>>;
      } = {
        product: [],
      };
      XMLObject.product.push({
        name: product[0].name,
      });
      XMLObject.product.push({
        description: product[0].description,
      });
      XMLObject.product.push({
        price: product[0].price,
      });
      XMLObject.product.push({
        picture: product[0].picture,
      });
      XMLObject.product.push({
        category: product[0].category,
      });
      XMLObject.product.push({
        vendor: product[0].vendor,
      });

      res.setHeader("Content-Type", "text/xml");
      res.status(200).send(sendXML(XMLObject));
    } catch {
      res
        .status(500)
        .json({ error: `Unable to retrieve product ${req.params.name}` });
    }
  }
);

export default router;
