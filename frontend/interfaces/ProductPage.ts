import { Product } from "../../types/Product";

export interface ProductPageInterface {
  product: Product | null;
  error: string | null;
}
