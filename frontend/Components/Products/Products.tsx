import { FormGroup, Label, Input } from "reactstrap";
import Skeleton from "react-loading-skeleton";

import useData from "../../customHooks/useData";
import { ProductsInterface } from "../../interfaces/Products";
import Product from "../Product/Product";
import styles from "./Products.module.css";
import Dropdown from "../Dropdown/Dropdown";
import { Filters } from "../../enums/Filters";
import { FiltersTypes } from "../../useReducers/filters/FiltersTypes";

const Products: React.FC<ProductsInterface> = ({ error, data }) => {
  const { state, dispatchFilters, filters } = useData(data, error);

  return (
    <div className={styles.Products}>
      {error === null && state.error === null ? (
        <div className={styles.Products__wrapper}>
          <div className={styles.Products__filters}>
            <Dropdown
              id={Filters.CATEGORY}
              dispatchFilter={dispatchFilters}
              data={state.data!.categories}
              filters={filters}
            />
            <Dropdown
              id={Filters.VENDOR}
              dispatchFilter={dispatchFilters}
              data={state.data!.vendors}
              filters={filters}
            />
            <FormGroup check inline>
              <Label check>
                <Input
                  onChange={(e) =>
                    dispatchFilters({
                      type: FiltersTypes.SORT_BY_PRICE,
                      sortByPrice: e.target.checked,
                    })
                  }
                  type="checkbox"
                />{" "}
                Posortuj wg ceny
              </Label>
            </FormGroup>
          </div>
          <div className={styles.Products__offers}>
            {state.loading ? (
              [...Array(10)].map((_, index: number) => (
                <div key={index}>
                  <Skeleton height={100} />
                  <Skeleton count={5} />
                </div>
              ))
            ) : state.data!.products ? (
              state.data!.products.map((product) => (
                <Product key={product.name} product={product} />
              ))
            ) : (
              <p>Brak wyników</p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Products;
