import xml from "xml2js";

import { useEffect, useReducer } from "react";
import axios from "../axiosInstance";
import { Errors } from "../messages/Errors";
import { Product } from "../types/Product";
import {
  initialState,
  reducer,
} from "../useReducers/actionStatus/actionStatus";
import { ActionStatusTypes } from "../useReducers/actionStatus/ActionStatusTypes";

const useProducts = (products: string | null, error: string | null) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (products !== null && error === null)
      xml.parseString(products, function (err, data) {
        if (err)
          return dispatch({
            type: ActionStatusTypes.ERROR,
            error: Errors.STH_WENT_WRONG,
          });
        dispatch({
          type: ActionStatusTypes.SUCCESS,
          data: data.products.product,
        });
      });
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

export default useProducts;
