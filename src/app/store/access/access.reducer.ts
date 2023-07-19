import {createReducer, on} from "@ngrx/store";
import {ProfileModel} from "./access.model";
import {setProfile} from "./access.action";

export const initialState: {} = {}

const _tokenReducer = createReducer(
  initialState,
  on(setProfile, (state, action: ProfileModel | {}) => {
    return action
  })
);

export function accessReducer(state: any, action: any) {
  return _tokenReducer(state, action);
}

