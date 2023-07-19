import {createAction, props} from "@ngrx/store";
// import {TokenModel} from "./token.model";

// export const setToken = createAction('setToken', props<{ token: string }>());
export const setToken = createAction('setToken', props<{token: string}>());
