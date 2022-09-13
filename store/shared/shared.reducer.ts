import { xPosition, isMainWindowActive, backgroundColor_hex, textDraggable, isBoxBackgroundClicked, isOutsideOfTextBox, isDraggable,primaryFont, isChooseFontOpen, isEditFontOpen, isColorChooserOpen, isAddContentOpen, isImageDropOpen} from './shared.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { initialState } from './shared.state';

const _sharedReducer = createReducer(
  initialState,
  on(xPosition, (state,action) => {
    // console.log('state');
    //  console.log(action.xPosition);
    return {
      ...state,
      xPosition: action.xPosition
    };
  }),

  on(isMainWindowActive, (state,action) => {
    // console.log('state');
    //  console.log(action.xPosition);
    return {
      ...state,
      isMainWindowActive: action.isMainWindowActive
    };
  }),
  on(backgroundColor_hex, (state,action) => {
 
    return {
      ...state,
      backgroundColor_hex: action.backgroundColor_hex
    };
  }),
  on( textDraggable, (state,action) => {
 
    return {
      ...state,
      textDraggable: action.textDraggable
    };
  }),

  on( isBoxBackgroundClicked, (state,action) => {
 
    return {
      ...state,
      isBoxBackgroundClicked: action.isBoxBackgroundClicked
    };
  }),

  on(isOutsideOfTextBox, (state,action) => {
 
    return {
      ...state,
      isOutsideOfTextBox: action.isOutsideOfTextBox
    };
  }),

  on( isDraggable, (state,action) => {
 
    return {
      ...state,
      isDraggable: action.isDraggable
    };
  }),

  on( primaryFont, (state,action) => {
 
    return {
      ...state,
      primaryFont: action.primaryFont
    };
  }),
  on( isChooseFontOpen, (state,action) => {
 
    return {
      ...state,
      isChooseFontOpen: action.isChooseFontOpen
    };
  }),

  on( 
    isEditFontOpen, (state,action) => {
 
    return {
      ...state,
     
  isEditFontOpen: action.isEditFontOpen
    };
  }),

  on( 
    isColorChooserOpen, (state,action) => {
 
    return {
      ...state,
      isColorChooserOpen: action.isColorChooserOpen
    };
  }),
  
  on( 
    isAddContentOpen, (state,action) => {
 
    return {
      ...state,
      isAddContentOpen: action.isAddContentOpen
    };
  }),

  on( 
    isImageDropOpen, (state,action) => {
 
    return {
      ...state,
      isImageDropOpen: action.isImageDropOpen
    };
  }),

  
 

  
  
);

export function SharedReducer(state: any, action: any) {
  return _sharedReducer(state, action);
}
