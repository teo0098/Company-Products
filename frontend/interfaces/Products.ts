import { Category } from "../../types/Category";
import { Product } from "../../types/Product";
import { Vendor } from "../../types/Vendor";

export interface ProductsInterface {
  data: {
    products: Product[];
    categories: Category[];
    vendors: Vendor[];
  };
  error: string | null;
}
