import { createAction, props } from '@ngrx/store';
export const SET_LOADING_ACTION = '[shared state] set loading spinner';
export const SET_ERROR_MESSAGE = '[shared state] set error message';

export const xPosition = createAction(
  '[xPosition]',
  props<{ xPosition: number }>()
);
 
export const yPosition = createAction(
    '[yPosition]',
    props<{ yPosition: number }>()
  );


  export const width = createAction(
    '[width]',
    props<{ width: number }>()
  );


  export const height = createAction(
    '[height]',
    props<{ height: number }>()
  );


  export const backgroundColor = createAction(
    '[backgroundColor]',
    props<{ backgroundColor: string }>()
  );


  export const primaryFont = createAction(
    '[primaryFont]',
    props<{ primaryFont: string }>()
  );