import { BoxState } from './store.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
export const SHARED_STATE_NAME = 'shared';

const getBoxState = createFeatureSelector<BoxState>(SHARED_STATE_NAME);

export const getXPosition= createSelector(getBoxState, 
  (state) => {
  return state.xPosition;
});

export const getYPosition= createSelector(getBoxState, 
    (state) => {
    return state.yPosition;
  });

  export const getWidth= createSelector(getBoxState, 
    (state) => {
    return state.width;
  });

  export const getHeight= createSelector(getBoxState, 
    (state) => {
    return state.height;
  });


  export const getBackgroundColor= createSelector(getBoxState, 
    (state) => {
    return state.backgroundColor;
  });
 
export const getErrorMessage = createSelector(getBoxState, (state) => {
  return state.errorMessage;
});

 
