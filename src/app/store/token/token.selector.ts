import {createFeatureSelector} from "@ngrx/store";
import {TokenModel} from "./token.model";

export const tokenSelect = createFeatureSelector<Readonly<TokenModel>>('access_token');
