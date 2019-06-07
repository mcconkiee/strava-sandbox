import { createSelector } from "reselect";
import {   StoreState } from 'src/types';

export const getAuthState = (state:StoreState) => state.auth;

export const getUser = createSelector(getAuthState,(state)=>state.userData);
