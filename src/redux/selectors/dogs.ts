import { createSelector } from 'reselect'
import { StoreState, DogState } from 'src/types';
export const getDogState = (state:StoreState) => state.dogs;

export const getAllDogs = createSelector(
  [getDogState],
  (dogState:DogState) => dogState.dogs
)
