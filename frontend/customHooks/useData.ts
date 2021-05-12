import xml from "xml2js";
import { useEffect, useReducer } from "react";

import axios from "../axiosInstance";
import { Errors } from "../messages/Errors";
import { Product } from "../../types/Product";
import {
  initialState,
  reducer,
  Data,
} from "../useReducers/actionStatus/actionStatus";
import {
  initialState as filtersInitialState,
  reducer as filtersReducer,
} from "../useReducers/filters/filters";
import { ActionStatusTypes } from "../useReducers/actionStatus/ActionStatusTypes";
import { Category } from "../../types/Category";
import { Vendor } from "../../types/Vendor";

const useData = (
  data: {
    products: Product[];
    categories: Category[];
    vendors: Vendor[];
  },
  error: string | null
) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [filters, dispatchFilters] = useReducer(
    filtersReducer,
    filtersInitialState
  );

  useEffect(() => {
    if (error === null) {
      let stateData: Data = {
        products: [],
        categories: [],
        vendors: [],
      };
      xml.parseString(data.products, function (err, results) {
        if (err)
          return dispatch({
            type: ActionStatusTypes.ERROR,
            error: Errors.STH_WENT_WRONG,
          });
        stateData.products = results.products.product;
      });
      xml.parseString(data.categories, function (err, results) {
        if (err)
          return dispatch({
            type: ActionStatusTypes.ERROR,
            error: Errors.STH_WENT_WRONG,
          });
        stateData.categories = results.categories.category;
      });
      xml.parseString(data.vendors, function (err, results) {
        if (err)
          return dispatch({
            type: ActionStatusTypes.ERROR,
            error: Errors.STH_WENT_WRONG,
          });
        stateData.vendors = results.vendors.vendor;
      });
      dispatch({
        type: ActionStatusTypes.SUCCESS,
        data: stateData,
      });
    }
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      dispatch({ type: ActionStatusTypes.LOADING });
      try {
        const { data: products, status } = await axios.get(
          `http://localhost:5000/products?category=${encodeURIComponent(
            filters.category!
          )}&vendor=${encodeURIComponent(
            filters.vendor!
          )}&sortByPrice=${encodeURIComponent(
            filters.sortByPrice!
          )}&sortByVendor=${encodeURIComponent(filters.sortByVendor!)}`
        );
        if (status === 500)
          return dispatch({
            type: ActionStatusTypes.ERROR,
            error: products.error,
          });
        xml.parseString(products, function (err, results) {
          if (err)
            return dispatch({
              type: ActionStatusTypes.ERROR,
              error: Errors.STH_WENT_WRONG,
            });
          dispatch({
            type: ActionStatusTypes.SUCCESS,
            data: {
              products: results.products.product,
              categories: state.data!.categories,
              vendors: state.data!.vendors,
            },
          });
        });
      } catch {
        return dispatch({
          type: ActionStatusTypes.ERROR,
          error: Errors.STH_WENT_WRONG,
        });
      }
    };
    if (filters.searchingStarted) getProducts();
  }, [filters]);

  return { state, dispatchFilters, filters };
};

export default useData;
