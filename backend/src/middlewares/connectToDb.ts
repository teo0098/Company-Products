import { Request, Response, NextFunction } from "express";

import { db } from "../db/db";
import { Connection } from "../interfaces/Connection";

export const connectToDb = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const connection = await db();
    if (!connection) throw new Error();
    (req as Connection).conn = connection;
    next();
  } catch {
    res.status(500).json({ error: "Unable to connect to the database" });
  }
};
