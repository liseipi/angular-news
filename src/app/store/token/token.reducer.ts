import {createReducer, on} from "@ngrx/store";
import {setToken} from "./token.action";
import {TokenModel} from "./token.model";

// export const initialState: TokenModel = {token: ''};
export const initialState = '';

const _tokenReducer = createReducer(
  initialState,
  on(setToken, (state, action) => action.token)
);

export function tokenReducer(state: any, action: any) {
  return _tokenReducer(state, action);
}

