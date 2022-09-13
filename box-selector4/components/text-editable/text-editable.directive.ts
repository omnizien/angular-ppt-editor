import { Directive, Renderer2, ElementRef, OnInit, Input, HostBinding, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { isDraggable, isOutsideOfTextBox } from 'src/app/store/shared/shared.actions';
import { getIsDraggable, getIsOutsideOfTextBox, getPrimaryFont } from 'src/app/store/shared/shared.selector';
 
@Directive({
  selector: '[appTextEditable]'
})
export class TextEditableDirective implements OnInit  {


  @Input() defaultColor: string = 'transparent';
  @Input('appTextEditable') highlightColor: string = 'blue';
  @HostBinding('style.backgroundColor') backgroundColor: string = this.defaultColor; // or 'transparent'  


  isOutsideOfTextBox = true;
  _isOutsideOfTextBox$!: Observable<boolean>;
  _primaryFont$!:Observable<string>;

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private store: Store<ShareData>) { }

 
  ngOnInit() {

    this._isOutsideOfTextBox$ = this.store.select(getIsOutsideOfTextBox)
    this._isOutsideOfTextBox$.subscribe(x => this.isOutsideOfTextBox = x)
    this.backgroundColor = this.defaultColor;
    this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'black');

    this._primaryFont$ = this.store.select(getPrimaryFont)
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.store.dispatch(isOutsideOfTextBox({ isOutsideOfTextBox: false }))
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {

    this.store.dispatch(isOutsideOfTextBox({ isOutsideOfTextBox: true }))
  }

  @HostListener('click') mouseclick(eventData: Event) {

    // this.renderer.removeClass(this.elementRef.nativeElement, 'target');
    // this.renderer.addClass(this.elementRef.nativeElement, 'target2');
  }

  int=0

  @HostListener('window:click')
  documentClick() {

    if (this.isOutsideOfTextBox == true) {
      this.int = 0
      
      this.store.dispatch(isDraggable({ isDraggable: true }))
      this.renderer.removeClass(this.elementRef.nativeElement, 'target2');
      this.renderer.addClass(this.elementRef.nativeElement, 'target');
      this.renderer.setStyle(this.elementRef.nativeElement , 'font-family',  this._primaryFont$);
      this.renderer.setAttribute( this.elementRef.nativeElement, 'contenteditable',  String("false"), );
      
    }

    if (this.isOutsideOfTextBox == false) {

      this.int++

      console.log(this.int);

      if(  this.int > 0) {

        this.store.dispatch(isDraggable({ isDraggable: true }))
       }
      if(  this.int >= 2) {

      this.store.dispatch(isDraggable({ isDraggable: false }))
      this.renderer.removeClass(this.elementRef.nativeElement, 'target');
      this.renderer.addClass(this.elementRef.nativeElement, 'target2');
     this.renderer.setStyle(this.elementRef.nativeElement , 'font-family',  this._primaryFont$);
  
    

      this.renderer.setAttribute( this.elementRef.nativeElement, 'contenteditable',  String("true"),);
     }
 
    }

  }

}


// this.store.dispatch(isDraggable({ isDraggable: false }))
// this.renderer.removeClass(this.elementRef.nativeElement, 'target');
// this.renderer.addClass(this.elementRef.nativeElement, 'target2');
// this.renderer.setStyle(this.elementRef.nativeElement , 'font-family',  this._primaryFont$);
// this.renderer.setAttribute( this.elementRef.nativeElement, 'contenteditable',  String("false"),);







  




  // @HostListener('window:click')
  // documentClick() {

  //     this.renderer.removeClass(this.namebutton, 'target');
  //      this.renderer.addClass(this.namebutton, 'target2');


  //   // if (this.isOutsideOfTextBox == true) {
  //   //   this.isDraggable = true;
  //   //   let modal_t  = document.getElementById('target')!
  //   //   modal_t.classList.remove('target2');
  //   //   modal_t.classList.add('target');
  //   //   this.clicks = 0;
  //   // }

  //   // if (this.isOutsideOfTextBox == false) {
  //   //   this.isDraggable = false;
  //   //   let modal_t  = document.getElementById('target')! 
  //   //   modal_t.classList.remove('target');
  //   //   modal_t.classList.add('target2');
  //   //   // this.renderer.setStyle(this.el.nativeElement.querySelector('.target'), 'border', ' 2px!important;');

    
       
  //   //   this.clicks++;
    

  //   //   if (this.clicks == 2) { }
    
  //   //   // border-style: dashed  !important;
  //   //   // border-width: 2px  !important;
  //   //   // border-color: grey  !important;
  //   // }
 
  //   console.log('BG');
  // }

 


  //double click feature
  // clickStream: any;
  //   clicks = 0;
  // clickTimeout: any;

  // doubleClickFeature(): any {

  //   //  this.store.dispatch(textDraggable({textDraggable: false}))
  //   //  this.store.dispatch(isBoxBackgroundClicked({isBoxBackgroundClicked:false}))

    

  //   //TO-DO  MUST FIX THIS
  //   if (this.clickTimeout) {
  //     if (this.clicks <= 2) {
  //       this.setClickTimeout(this.handleDoubleClick);
  //     }
  //     else {
  //       this.setClickTimeout(() => { });
  //     }
  //   }
  //   else {
  //     this.setClickTimeout(this.handleSingleClick);
  //   }
  // }


  // setClickTimeout(cb: any) {
  //   clearTimeout(this.clickTimeout);
  //   this.clickTimeout = setTimeout(() => {
  //     this.clickTimeout = null;
  //     this.clicks = 0;
  //     cb();
  //   }, 400);
  // }
  // handleSingleClick() {
  //   console.log("one click");
  //   this.store.dispatch(textDraggable({ textDraggable: false }));

  // }


  // handleDoubleClick(v: boolean = false): boolean {
  //   console.log("double!");
  //   // this.isActive = v;
  //   // const va = true;
  //   this.isDraggable = false


  //   console.log(v)
  //   return v
  // }


  // document.addEventListener("click", (evt) => {
  //   const flyoutEl = document.getElementById("flyout-example");
  //   let targetEl = evt.target; // clicked element      
  //   do {
  //     if(targetEl == flyoutEl) {
  //       // This is a click inside, does nothing, just return.
  //       document.getElementById("flyout-debug").textContent = "Clicked inside!";
  //       return;
  //     }
  //     // Go up the DOM
  //     targetEl = targetEl.parentNode;
  //   } while (targetEl);
  //   // This is a click outside.      
  //   document.getElementById("flyout-debug").textContent = "Clicked outside!";
  // });


 
// https://stackblitz.com/edit/angular-rpzixp?file=src%2Fapp%2Fapp.component.ts

 
