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
      {error === null && state.error === null && state.data ? (
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
            <FormGroup tag="fieldset">
              <legend>Sortuj po cenie</legend>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="radio1"
                    onChange={() =>
                      dispatchFilters({
                        type: FiltersTypes.SORT_BY_PRICE,
                        sortByPrice: "ASC",
                      })
                    }
                  />{" "}
                  Sortuj rosnąco
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="radio1"
                    onChange={() =>
                      dispatchFilters({
                        type: FiltersTypes.SORT_BY_PRICE,
                        sortByPrice: "DESC",
                      })
                    }
                  />{" "}
                  Sortuj malejąco
                </Label>
              </FormGroup>
            </FormGroup>
            <FormGroup tag="fieldset">
              <legend>Sortuj po producencie</legend>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="radio1"
                    onChange={() =>
                      dispatchFilters({
                        type: FiltersTypes.SORT_BY_VENDOR,
                        sortByVendor: "ASC",
                      })
                    }
                  />{" "}
                  Sortuj rosnąco
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="radio1"
                    onChange={() =>
                      dispatchFilters({
                        type: FiltersTypes.SORT_BY_VENDOR,
                        sortByVendor: "DESC",
                      })
                    }
                  />{" "}
                  Sortuj malejąco
                </Label>
              </FormGroup>
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
