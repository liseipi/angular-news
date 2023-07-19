import {createFeatureSelector} from "@ngrx/store";
import {ProfileModel} from "./access.model";

export const profileSelect = createFeatureSelector<Readonly<ProfileModel>>('access_info');
