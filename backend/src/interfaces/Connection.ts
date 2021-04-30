import { Request } from "express";

export interface Connection extends Request {
  conn: any;
}
