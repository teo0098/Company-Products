import { FiltersTypes } from "./FiltersTypes";

export const initialState = {
  category: "*",
  vendor: "*",
  sortByPrice: false,
  searchingStarted: false,
};

export type State = {
  category?: string;
  vendor?: string;
  sortByPrice?: boolean;
  searchingStarted: boolean;
};

export type Action = {
  type: string;
  category?: string;
  vendor?: string;
  sortByPrice?: boolean;
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
      };
    default:
      return state;
  }
};
