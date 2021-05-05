import express, { Request, Response } from "express";
import sendXML from "xml";

import { Connection } from "../interfaces/Connection";
import { connectToDb } from "../middlewares/connectToDb";
import { Category } from "../../../types/Category";

const router = express.Router();

router.get("/categories", connectToDb, async (req: Request, res: Response) => {
  try {
    const connection = (req as Connection).conn;
    const [categories] = await connection.execute(
      `SELECT categories.category FROM categories`
    );
    if (!categories) throw new Error();
    const XMLObject: {
      categories: Array<Category>;
    } = {
      categories: [],
    };
    (categories as Category[]).forEach((category) => {
      XMLObject.categories.push({
        category: category.category,
      });
    });
    res.setHeader("Content-Type", "text/xml");
    res.status(200).send(sendXML(XMLObject));
  } catch {
    res.status(500).json({ error: "Unable to retrieve categories" });
  }
});

export default router;
