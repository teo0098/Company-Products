import { Dispatch } from "react";

import { Action, State } from "../useReducers/filters/filters";

export interface DropdownInterface {
  data: any[];
  dispatchFilter: Dispatch<Action>;
  id: string;
  filters: State;
}
