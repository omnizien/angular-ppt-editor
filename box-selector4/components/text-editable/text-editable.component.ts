import { Component, ElementRef, OnInit, ViewChild, Renderer2, HostListener, AfterViewInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NgxMoveableComponent } from 'ngx-moveable';
import { fromEvent, Subscription, Observable } from 'rxjs';
import { map, bufferTime, filter, finalize, debounceTime, timeout, skipWhile, take, repeat, retry, buffer, mapTo, distinctUntilChanged } from 'rxjs/operators';
import { textDraggable, isMainWindowActive, isBoxBackgroundClicked } from 'src/app/store/shared/shared.actions';
import { getIsBoxBackgroundClicked, getIsDraggable as getIsTextDraggable, getIsMainWindowClicked, getIsOutsideOfTextBox, getPrimaryFont, getTextDraggable } from 'src/app/store/shared/shared.selector';
import { SharedState } from 'src/app/store/shared/shared.state';
import { NgControl } from '@angular/forms';
// import { text } from 'stream/consumers';


export interface imageProperties {

  x: number, y: number, w: number, h: number,
  x_pct_str: string, y_pct_str: string, w_pct_str: string, h_pct_str: string,
  x_pct_num: number, y_pct_num: number, w_pct_num: number, h_pct_num: number,
  x_px: string, y_px: string, w_px: string, h_px: string
}


@Component({
  selector: 'app-text-editable',
  templateUrl: './text-editable.component.html',
  styleUrls: ['./text-editable.component.css']
})
export class TextEditableComponent implements OnInit, AfterViewInit {

  @ViewChild("moveable", { static: false }) moveable!: NgxMoveableComponent;




  isTextDraggable$!: Observable<boolean>;
  _primaryFont$!: Observable<string>;
  _wasMainWindowClicked$!: Observable<boolean>;

  //https://stackoverflow.com/questions/9333379/check-if-an-elements-content-is-overflowing


  image_1: imageProperties = {
    x: 0, y: 0, w: 10, h: 20,
    x_pct_str: '0', y_pct_str: '0', w_pct_str: '0', h_pct_str: '0',
    x_pct_num: 0, y_pct_num: 0, w_pct_num: 0, h_pct_num: 0,
    x_px: "0px", y_px: "0px", w_px: "20px", h_px: '20px'
  }


  active = false



  isMainWindowActive = true

  constructor(private store: Store<SharedState>, public renderer: Renderer2, private elementRef: ElementRef) { }




  commentFC = new FormControl();

  onCommentChange() {
    console.log(this.commentFC.value);
  }

  CopyText = ''

  private elmRef!: ElementRef
  ngOnInit(): void {

    this.isTextDraggable$ = this.store.select(getIsTextDraggable)
    this._primaryFont$ = this.store.select(getPrimaryFont);
    this._wasMainWindowClicked$ = this.store.select(getIsMainWindowClicked);

    //  this.isMainWindowActice
    this._wasMainWindowClicked$.subscribe(x => console.log(x));

  }



  triggerActive(x: boolean) {

    // console.log('1')

    // if(x == true) {
    //   this.isActive = false
    // }
    // else {
    //   this.isActive = true;
    // }

    console.log('foggy')
    //  if(!this.isActive ){
    //   this.isActive = !x;
    //  }



  }

  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');


  }



  frame = {
    translate: [0, 0], scale: [1, 1],
    width: '250px',
    height: '200px',
    left: '100px',
    top: '100px',
    transform: {
      rotate: '0deg',
      scaleX: 1,
      scaleY: 1,
      matrix3d: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    },
  };



  onScaleStart(e: any) {
    e.set(this.frame.scale);
    e.dragStart && e.dragStart.set(this.frame.translate);
  }
  onScale(e: any) {
    const beforeTranslate = e.drag.beforeTranslate;

    this.frame.translate = beforeTranslate;
    this.frame.scale = e.scale;
    e.target.style.transform
      = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`
      + ` scale(${e.scale[0]}, ${e.scale[1]})`;
  }


  onDragStart(e: any) {
    e.set(this.frame.translate);
  }
  onDrag(e: any) {
    this.frame.translate = e.beforeTranslate;
    e.target.style.transform = `translate(${e.beforeTranslate[0]}px, ${e.beforeTranslate[1]}px)`;
  }


  onSelect(e: any) {
    console.log(e.selected)
    // this.targets = e.selected;
  }

  onNameChange(val: any) {
    console.log("Changed", val)
  }


  /* RESIZE IMAGE AROUND SCREEN  */

  widthArr: number[] = []
  heightArr: number[] = []

  onResize(e: any) {
    const beforeTranslate = e.drag.beforeTranslate;
    const target = e.target;

    e.target.style.width = `${e.width}px`;
    e.target.style.height = `${e.height}px`;
    e.target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;

    this.widthArr.push(e.width);
    this.heightArr.push(e.height);

  }

  onResizeEnd(e: any) {
  }

  int = 0
  contEditable = "false"
  isActive = false;


  moveableClicked() {

    this.store.dispatch(isMainWindowActive({ isMainWindowActive: false }))

    this.int++
    if (this.int == 1) {
      this.isActive = true

    }

    if (this.int == 2) {
      this.isActive = false

    }


  }



  @HostListener('document:click', ['$event.target'])
  public onPageClick(targetElement: any) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {

      // this.store.dispatch(isMainWindowActive({ isMainWindowActive: true }));
      this.isActive = false;
      this.int = 0
      // this.contEditable="false"
      this.isActive = false;
      // this.store.dispatch(isChooseFontOpen({ isChooseFontOpen: false }))
      // this.store.dispatch(isEditFontOpen({ isEditFontOpen: false }));
      // this.store.dispatch(isColorChooserOpen({ isColorChooserOpen: false }));
      // this.store.dispatch(isAddContentOpen({ isAddContentOpen: false }))
      // this.store.dispatch(isImageDropOpen({isImageDropOpen:false}))

    }
  }


  // isOverflown(element) {
  //   return 
  // }


}