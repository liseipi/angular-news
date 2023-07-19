import {createAction, props} from "@ngrx/store";
import {ProfileModel} from "./access.model";

export const setProfile = createAction('setProfile', props<ProfileModel | {}>());
