import express, { Request, Response } from "express";
import sendXML from "xml";

import { Connection } from "../interfaces/Connection";
import { connectToDb } from "../middlewares/connectToDb";
import { Product } from "../../../types/Product";

const router = express.Router();

router.get("/products", connectToDb, async (req: Request, res: Response) => {
  try {
    const connection = (req as Connection).conn;
    const [products] = await connection.execute(
      `SELECT products.name, products.price, products.picture, categories.category, vendors.vendor 
      FROM products
      JOIN categories ON products.category_id=categories.id 
      JOIN vendors ON products.vendor_id=vendors.id`
    );
    if (!products) throw new Error();
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

export default router;
