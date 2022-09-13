export interface SharedState {
    xPosition: number;
    isMainWindowActive:boolean;
    backgroundColor_hex:string;
    textDraggable:boolean;
    errorMessage: string;
    isboxBackgroundClicked:boolean;
    isOutsideOfTextBox:boolean;
    isDraggable:boolean;
    primaryFont:string;
    isEditFontOpen:boolean;
    isChooseFontOpen:boolean;
    isColorChooserOpen:boolean;
    isAddContentOpen:boolean;
    isImageDropOpen:boolean;
    
  }
  
  export const initialState: SharedState = {
    xPosition: 0,
    isMainWindowActive:true,
    backgroundColor_hex:"#ffffff",
    textDraggable:true,
    isboxBackgroundClicked:false,
    errorMessage: '',
    isOutsideOfTextBox:false,
    isDraggable:true,
    primaryFont:'',
    isEditFontOpen:false,
    isColorChooserOpen:false,
    isChooseFontOpen:false,
    isAddContentOpen:false,
    isImageDropOpen:false
  };
  