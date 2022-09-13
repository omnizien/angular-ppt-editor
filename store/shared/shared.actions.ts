import { createAction, props } from '@ngrx/store';
export const SET_LOADING_ACTION = '[shared state] set loading spinner';
export const SET_ERROR_MESSAGE = '[shared state] set error message';

export const xPosition = createAction(
  '[xPosition]',
  props<{ xPosition: number }>()
);


export const isMainWindowActive = createAction(
  '[isMainWindowActive]',
  props<{ isMainWindowActive: boolean }>()
);

export const backgroundColor_hex = createAction(
  '[ backgroundColor_hex]',
  props<{ backgroundColor_hex: string }>()
);

 
export const isBoxBackgroundClicked = createAction(
  '[ isBoxBackgroundClicked ]',
  props<{  isBoxBackgroundClicked: boolean }>()
);

export const isOutsideOfTextBox = createAction(
  '[ isOutsideOfTextBox ]',
  props<{  isOutsideOfTextBox: boolean }>()
);
 

export const isDraggable = createAction(
  '[ isDraggable ]',
  props<{  isDraggable: boolean }>()
);

export const textDraggable = createAction(
  '[  textDraggable ]',
  props<{  textDraggable: boolean }>()
);

export const primaryFont = createAction(
  '[  primaryFont ]',
  props<{  primaryFont: string }>()
);


export const isEditFontOpen = createAction(
  '[ isEditFontOpen ]',
  props<{  isEditFontOpen: boolean }>()
);

export const isChooseFontOpen = createAction(
  '[isChooseFontOpen]',
  props<{  isChooseFontOpen: boolean }>()
);

export const isColorChooserOpen = createAction(
  '[isChooseFontOpen ]',
  props<{  isColorChooserOpen: boolean }>()
);

export const isAddContentOpen = createAction(
  '[ isAddContentOpen ]',
  props<{  isAddContentOpen: boolean }>()
);


export const isImageDropOpen = createAction(
  '[ isImageDropOpen ]',
  props<{  isImageDropOpen: boolean }>()
);

// export const xPosition = createAction('increment');