import { Category } from "../../../types/Category";
import { Product } from "../../../types/Product";
import { Vendor } from "../../../types/Vendor";
import { ActionStatusTypes } from "./ActionStatusTypes";

export type Data = {
  products: Product[];
  categories: Category[];
  vendors: Vendor[];
};

export const initialState = {
  loading: false,
  error: null,
  data: {
    products: [],
    categories: [],
    vendors: [],
  },
};

type State = {
  loading?: boolean;
  error?: string | null;
  data?: Data;
};

type Action = {
  type: string;
  error?: string;
  data?: Data;
};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionStatusTypes.LOADING:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case ActionStatusTypes.ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case ActionStatusTypes.SUCCESS:
      return {
        ...initialState,
        data: action.data,
      };
    default:
      return state;
  }
};
