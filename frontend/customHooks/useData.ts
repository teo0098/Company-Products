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

  /*
  useEffect(() => {
    const getOffers = async () => {
      dispatch({ type: ActionStatusTypes.LOADING });
      try {
        const { data, status } = await axios.get("http://localhost:5000/");
        if (status === 500)
          return dispatch({ type: ActionStatusTypes.ERROR, error: data });
        dispatch({ type: ActionStatusTypes.SUCCESS, data });
      } catch {
        dispatch({
          type: ActionStatusTypes.ERROR,
          error: Errors.STH_WENT_WRONG,
        });
      }
    };
    getOffers();
  }, []);
  */

  return { state };
};

export default useData;
