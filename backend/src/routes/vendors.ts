import express, { Request, Response } from "express";
import sendXML from "xml";

import { Connection } from "../interfaces/Connection";
import { connectToDb } from "../middlewares/connectToDb";
import { Vendor } from "../../../types/Vendor";

const router = express.Router();

router.get("/vendors", connectToDb, async (req: Request, res: Response) => {
  try {
    const connection = (req as Connection).conn;
    const [vendors] = await connection.execute(
      `SELECT vendors.vendor FROM vendors`
    );
    if (!vendors) throw new Error();
    const XMLObject: {
      vendors: Array<Vendor>;
    } = {
      vendors: [],
    };
    (vendors as Vendor[]).forEach((vendor) => {
      XMLObject.vendors.push({
        vendor: vendor.vendor,
      });
    });
    res.setHeader("Content-Type", "text/xml");
    res.status(200).send(sendXML(XMLObject));
  } catch {
    res.status(500).json({ error: "Unable to retrieve vendors" });
  }
});

export default router;
