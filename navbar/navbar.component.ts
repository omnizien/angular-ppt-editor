import { Component, ElementRef, HostListener, OnInit } from '@angular/core'
import { fadeInAnimation } from './router-animation'
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Store } from '@ngrx/store';
import { SharedState } from '../store/shared/shared.state';
import { isAddContentOpen, isChooseFontOpen, isColorChooserOpen, isEditFontOpen, isImageDropOpen, isMainWindowActive } from '../store/shared/shared.actions';
import { concatMap, map, Observable, of, timer } from 'rxjs';
import { getIsAddContentOpen, getIsChooseFontOpen, getIsColorChooserOpen, getIsEditFontOpen, getIsImageDropOpen, getIsMainWindowClicked, getPrimaryFont } from '../store/shared/shared.selector';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({ opacity: 0 }),
        animate(200)
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(150, style({ opacity: 0 })))
    ])
  ]
})

export class NavbarComponent implements OnInit {


  currentFontId = "Roboto";

  _currentFontId$!: Observable<string>;
  _font_edit_clicked: boolean = false;
  _isEditFontOpen$!: Observable<boolean>;
  _isColorChooserOpen$!: Observable<boolean>;
  _isAddContentOpen$!: Observable<boolean>;
  _isImageDropOpen$!: Observable<boolean>;

  _isMainWindowActive$!: Observable<boolean>;
  isMainWindowActive = false;

  isEditTextOpen = false


  constructor(private elementRef: ElementRef, private store: Store<SharedState>) { }
  ngOnInit(): void {
    this._currentFontId$ = this.store.select(getPrimaryFont);
    this._currentFontId$.subscribe(x => this.currentFontId = x);

    this._isColorChooserOpen$ = this.store.select(getIsColorChooserOpen);
    

    this._isEditFontOpen$ = this.store.select(getIsEditFontOpen)
    this._isEditFontOpen$.subscribe(x => this.isMainWindowActive = x)

    this._isAddContentOpen$ = this.store.select(getIsAddContentOpen);

    this._isImageDropOpen$ = this.store.select(getIsImageDropOpen);

//for testing
    this.store.dispatch(isMainWindowActive({ isMainWindowActive: false }));
    this.store.dispatch(isEditFontOpen({ isEditFontOpen: false }));
    this.store.dispatch(isColorChooserOpen({ isColorChooserOpen: false}))
    this.store.dispatch(isAddContentOpen({ isAddContentOpen: false }))
    this.store.dispatch(isImageDropOpen({ isImageDropOpen: true }));

    // this._isEditFontOpen$ = this.store.select(getIsEditFontOpen)
    // this._isEditFontOpen$.subscribe(  x =>   this.opencloseWindow(x))


    // this._isMainWindowActive$ = this.store.select(getIsMainWindowClicked)
    // this._isMainWindowActive$.subscribe( x => this.opencloseWindow(x) )

  }


  //   opencloseWindow(b:boolean){

  //     if (b == true){


  //       timer(100).pipe( 

  //         map(() => { 
  //           this.isEditTextOpen  = true; 
  //         }) 
  //       ).subscribe(); 


  //     }
  //     else{  

  //       // this.isMainWindowActive   = false; 

  //    timer(300).pipe( 
  //     map(() => { 
  //       this.isEditTextOpen  = false; 
  //     }) 
  //   ).subscribe(); 

  // }

  //   }



  isOpen = false;
  toggle() {
    this.isOpen = !this.isOpen;
    console.log(this.isOpen)
  }

  ngAfterViewInit() {
    this.currentFontId = "Roboto";
  }


  public getRouterOutletState(outlet: any) {
    return outlet.isActivated ? outlet.activatedRoute : ''
  }




  itemVisibility(item: string) {

    switch (item) {
      case 'color':
        console.log('color');
        this.store.dispatch(isMainWindowActive({ isMainWindowActive: false }));
        this.store.dispatch(isEditFontOpen({ isEditFontOpen: false }));
        this.store.dispatch(isColorChooserOpen({ isColorChooserOpen: true }))
        this.store.dispatch(isAddContentOpen({ isAddContentOpen: false }))
        this.store.dispatch(isImageDropOpen({ isImageDropOpen: false }));

        break;

      case 'edit-text':
        console.log('edit');
        this.store.dispatch(isMainWindowActive({ isMainWindowActive: false }));
        this.store.dispatch(isEditFontOpen({ isEditFontOpen: true }));
        this.store.dispatch(isColorChooserOpen({ isColorChooserOpen: false }));
        this.store.dispatch(isAddContentOpen({ isAddContentOpen: false }))
        this.store.dispatch(isImageDropOpen({ isImageDropOpen: false }));

        break;


      case 'add-content':
        console.log('edit');
        this.store.dispatch(isMainWindowActive({ isMainWindowActive: false }));
        this.store.dispatch(isEditFontOpen({ isEditFontOpen: false }));
        this.store.dispatch(isColorChooserOpen({ isColorChooserOpen: false }));
        this.store.dispatch(isImageDropOpen({ isImageDropOpen: false }));
        this.store.dispatch(isAddContentOpen({ isAddContentOpen: true }));
        break;

      case 'image-drop':
        this.store.dispatch(isMainWindowActive({ isMainWindowActive: false }));
        this.store.dispatch(isEditFontOpen({ isEditFontOpen: false }));
        this.store.dispatch(isColorChooserOpen({ isColorChooserOpen: false }));
        this.store.dispatch(isAddContentOpen({ isAddContentOpen: false }));
        this.store.dispatch(isImageDropOpen({ isImageDropOpen: true }));
        break;


    }

  }


  @HostListener('document:click', ['$event.target'])
  public onPageClick(targetElement: any) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {

      this.store.dispatch(isMainWindowActive({ isMainWindowActive: true }));
      this.store.dispatch(isChooseFontOpen({ isChooseFontOpen: false }))
      this.store.dispatch(isEditFontOpen({ isEditFontOpen: false }));
      this.store.dispatch(isColorChooserOpen({ isColorChooserOpen: false }));
      this.store.dispatch(isAddContentOpen({ isAddContentOpen: false }))
      this.store.dispatch(isImageDropOpen({isImageDropOpen:false}))

    }
  }


  public sideNav() {

    if (this.isMainWindowActive == true)
      this.store.dispatch(isMainWindowActive({ isMainWindowActive: true }));
    this.store.dispatch(isChooseFontOpen({ isChooseFontOpen: false }))
    this.store.dispatch(isEditFontOpen({ isEditFontOpen: false }));
    this.store.dispatch(isColorChooserOpen({ isColorChooserOpen: false }));
    this.store.dispatch(isAddContentOpen({ isAddContentOpen: false }));
    this.store.dispatch(isImageDropOpen({isImageDropOpen:false}))

  }


  font_edit_clicked(fE: boolean) {
    this._font_edit_clicked = fE

  }



}


//https://stackblitz.com/edit/animation-modal-view?file=src%2Fapp%2Fapp.component.css,src%2Fapp%2Fapp.component.ts
