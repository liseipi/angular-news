import {tokenReducer} from "./token/token.reducer";
import {accessReducer} from "./access/access.reducer";

export const AppState = {
  access_token: tokenReducer,
  access_info: accessReducer,
}
