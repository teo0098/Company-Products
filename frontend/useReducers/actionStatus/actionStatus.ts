import { ActionStatusTypes } from "./ActionStatusTypes";

export const initialState = {
  loading: false,
  error: null,
  data: null,
};

type State = {
  loading?: boolean;
  error?: string | null;
  data?: any;
};

type Action = {
  type: string;
  error?: string;
  data?: any;
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
