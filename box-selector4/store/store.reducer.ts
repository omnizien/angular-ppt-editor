import { height, width, xPosition, yPosition, primaryFont} from './store.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { initialState } from './store.state';

const _boxReducer = createReducer(
  initialState,
  on(xPosition, (state,action) => {
    return {
      ...state,
      xPosition: action.xPosition
    };
  }),
  on(yPosition, (state,action) => {
  
    return {
      ...state,
      xPosition: action.yPosition
    };
  }),

  on(width, (state,action) => {
  
    return {
      ...state,
      xPosition: action.width
    };
  }),

  on(height, (state,action) => {
  
    return {
      ...state,
      xPosition: action.height
    };
  }),


  on(primaryFont, (state,action) => {
  
    return {
      ...state,
      primaryFont: action.primaryFont
    };
  }),


  


 
  
);

export function BoxReducer(state: any, action: any) {
  return _boxReducer(state, action);
}
