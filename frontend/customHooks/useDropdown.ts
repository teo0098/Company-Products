import { Dispatch, useState } from "react";
import { Filters } from "../enums/Filters";

import { Action, State } from "../useReducers/filters/filters";
import { FiltersTypes } from "../useReducers/filters/FiltersTypes";

const useDropDown = (id: string, dispatchFilter: Dispatch<Action>) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const handleOnChange = (value: string) => {
    if (id === Filters.CATEGORY) {
      dispatchFilter({ type: FiltersTypes.CATEGORY, category: value });
    } else {
      dispatchFilter({ type: FiltersTypes.VENDOR, vendor: value });
    }
  };

  const renderSelection = (filters: State) => {
    if (id === Filters.CATEGORY && filters.category !== "*")
      return filters.category;
    else if (id === Filters.VENDOR && filters.vendor !== "*")
      return filters.vendor;
    return "Wszystko";
  };

  return { handleOnChange, dropdownOpen, toggle, renderSelection };
};

export default useDropDown;
