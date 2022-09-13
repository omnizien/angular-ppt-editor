import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';
import { SharedState } from 'src/app/store/shared/shared.state';
import { isChooseFontOpen } from 'src/app/store/shared/shared.actions';
import { getIsChooseFontOpen, getIsEditFontOpen } from 'src/app/store/shared/shared.selector';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-edit-text-menu',
  templateUrl: './edit-text-menu.component.html',
  styleUrls: ['./edit-text-menu.component.css'],
  animations: [
    trigger('childAnimation', [
      // ...
      state('open', style({
        width: '200px',
        opacity: .8,
        backgroundColor: 'grey'
      })),
      state('closed', style({
        width: '0px',
        // opacity: 0.0,
        backgroundColor: 'pink'
      })),
      transition('* => *', [
        animate('.5s')
      ]),
    ]),
  ],
  
})
export class EditTextMenuComponent implements OnInit {



  class="show-text-edit"

  currentFontId = "Roboto";

  _currentFontId$!:Observable<string>;
  _isChooseFontOpen$!:Observable<boolean>;
  _isEditFontOpen$!:Observable<boolean>
  

  font_clicked = false
  row1_clicked = false
  row2_clicked = false
  row3_clicked = false
 
 
  
  isChooseFontOpen:boolean = false


  _font_edit_clicked = false

  _currentFontPopup = false




  constructor(private store:Store<SharedState>) { }

  ngOnInit(): void {

    this._isChooseFontOpen$ = this.store.select(getIsChooseFontOpen);
    this._isChooseFontOpen$.subscribe(x  =>  console.log(x));

    this._isEditFontOpen$ = this.store.select(getIsEditFontOpen)
    this._isEditFontOpen$.subscribe(  x =>   this.opencloseWindow(x)   )


  }

  

  opencloseWindow(b:boolean){

    if (b == true){
      console.log('opencloseWindow')
    }
    else{  console.log('jbibibibiubiub') }

  }

  width = "25px" 
  ngAfterViewInit(){
    // this._isChooseFontOpen$ = this.store.select(getIsChooseFontOpen);

    // this._isChooseFontOpen$.subscribe(x  =>  this.isChooseFontOpen = x);
  }


  //https://stackoverflow.com/questions/41465542/angular2-input-field-to-accept-only-numbers
  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  value17: number = 20;

  row_clicked(input:string){

    if(input == "font"){
      this.store.dispatch(isChooseFontOpen({isChooseFontOpen:true} ))
    
      console.log('hello')
      this.font_clicked = true
      this.row1_clicked = false
      this.row2_clicked = false
      this.row3_clicked = false
    }
  
    if(input == "row_1"){
      this.font_clicked = false
      this.row1_clicked = true
      this.row2_clicked = false
      this.row3_clicked = false
    }
  
    if(input == "row_2"){
      this.font_clicked = false
      this.row1_clicked = false
      this.row2_clicked = true
      this.row3_clicked = false
    }
  
    if(input == "row_3"){
      this.font_clicked = false
      this.row1_clicked = false
      this.row2_clicked = false
      this.row3_clicked = true
    }
  
  }

 
  chooseFontPopup(boolean:boolean){
    this._currentFontPopup = boolean 

    this.isChooseFontOpen = boolean

 
    this.store.dispatch(isChooseFontOpen({isChooseFontOpen:true} ))
    

    let modal_t2  = document.getElementById('fonts')!;
    modal_t2.classList.remove('fonts');
    modal_t2.classList.add('show-current-fonts');

 

    // let modal_t1  = document.getElementById('current-font-id')!;
    // modal_t1.
 
  }


  isOpen = true;
  toggle() {
    this.isOpen = !this.isOpen;
    console.log( this.isOpen)
  }


 


}
