export interface BoxState {
    xPosition: number;
    yPosition: number;
    width: number;
    height: number;
    backgroundColor:string
   
    errorMessage: string;
  }
  
  export const initialState: BoxState = {
    xPosition: 0,
    yPosition: 0,
    width: 0,
    height: 0,
    backgroundColor:"#FFFFFF",
    errorMessage: '',
   
  };
  