import { FormGroup, Label, Input } from "reactstrap";

import useData from "../../customHooks/useData";
import { ProductsInterface } from "../../interfaces/Products";
import { Product as ProductType } from "../../../types/Product";
import Product from "../Product/Product";
import styles from "./Products.module.css";
import Dropdown from "../Dropdown/Dropdown";

const Products: React.FC<ProductsInterface> = ({ error, data }) => {
  const { state } = useData(data, error);

  return (
    <div className={styles.Products}>
      {state.error === null ? (
        <div className={styles.Products__wrapper}>
          <div className={styles.Products__filters}>
            <Dropdown data={state.data!.categories} name="Kategoria" />
            <Dropdown data={state.data!.vendors} name="Wydawca" />
            <FormGroup check inline>
              <Label check>
                <Input type="checkbox" /> Posortuj wg ceny
              </Label>
            </FormGroup>
          </div>
          <div className={styles.Products__offers}>
            {state.data!.products.map((product) => (
              <Product key={product.name} product={product} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Products;
