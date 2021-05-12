import { FiltersTypes } from "./FiltersTypes";

export const initialState = {
  category: "*",
  vendor: "*",
  sortByPrice: "",
  sortByVendor: "",
  searchingStarted: false,
};

export type State = {
  category?: string;
  vendor?: string;
  sortByPrice?: string;
  sortByVendor?: string;
  searchingStarted: boolean;
};

export type Action = {
  type: string;
  category?: string;
  vendor?: string;
  sortByPrice?: string;
  sortByVendor?: string;
};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case FiltersTypes.CATEGORY:
      return {
        ...state,
        searchingStarted: true,
        category: action.category,
      };
    case FiltersTypes.VENDOR:
      return {
        ...state,
        searchingStarted: true,
        vendor: action.vendor,
      };
    case FiltersTypes.SORT_BY_PRICE:
      return {
        ...state,
        searchingStarted: true,
        sortByPrice: action.sortByPrice,
        sortByVendor: "",
      };
    case FiltersTypes.SORT_BY_VENDOR:
      return {
        ...state,
        searchingStarted: true,
        sortByVendor: action.sortByVendor,
      };
    default:
      return state;
  }
};
