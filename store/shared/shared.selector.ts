import { SharedState } from './shared.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
export const SHARED_STATE_NAME = 'shared';

const getSharedState = createFeatureSelector<SharedState>(SHARED_STATE_NAME);

export const getXPosition= createSelector(getSharedState, 
  (state) => {
  return state.xPosition;
});


export const getIsMainWindowClicked= createSelector(getSharedState, 
  (state) => {
  return state.isMainWindowActive;
});

export const backgroundColor_hex = createSelector(getSharedState, (state)=> {
  return state.backgroundColor_hex;
})


export const getErrorMessage = createSelector(getSharedState, (state) => {
  return state.errorMessage;
});
 


export const getTextDraggable= createSelector(getSharedState, (state) => {
  return state.textDraggable
});


export const getIsBoxBackgroundClicked= createSelector(getSharedState, (state) => {
  return state.isboxBackgroundClicked
});

export const getIsOutsideOfTextBox= createSelector(getSharedState, (state) => {
  return state.isOutsideOfTextBox
});

export const getIsDraggable= createSelector(getSharedState, (state) => {
  return state.isDraggable
});

export const getPrimaryFont= createSelector(getSharedState, (state) => {
  return state.primaryFont
});

export const getIsChooseFontOpen= createSelector(getSharedState, (state) => {
  return state.isChooseFontOpen
});

export const getIsEditFontOpen= createSelector(getSharedState, (state) => {
  return state.isEditFontOpen
});

export const getIsColorChooserOpen= createSelector(getSharedState, (state) => {
  return state.isColorChooserOpen
});
export const getIsAddContentOpen= createSelector(getSharedState, (state) => {
  return state.isAddContentOpen
});

export const getIsImageDropOpen= createSelector(getSharedState, (state) => {
  return state.isImageDropOpen
});
 

 
 
 

 