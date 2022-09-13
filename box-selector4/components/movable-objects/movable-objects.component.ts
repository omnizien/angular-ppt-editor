import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { BoxSelector4Component } from '../../box-selector4.component'; 
import { Frame } from "scenejs";
import { NgxMoveableComponent } from 'ngx-moveable';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { xPosition, yPosition, height, width } from '../../store/store.actions';
import { CdkDragDrop, CdkDragMove, moveItemInArray } from '@angular/cdk/drag-drop';
 

export interface imageProperties {

  x: number, y: number, w: number, h: number,
  x_pct_str: string, y_pct_str: string, w_pct_str: string, h_pct_str: string,
  x_pct_num: number, y_pct_num: number, w_pct_num: number, h_pct_num: number,
  x_px: string, y_px: string, w_px: string, h_px: string
}
@Component({
  selector: 'app-movable-objects',
  templateUrl: './movable-objects.component.html',
  styleUrls: ['./movable-objects.component.css']
})
export class MovableObjectsComponent implements OnInit {

  @ViewChild('ElementRefName') element!: ElementRef;
  @ViewChild(BoxSelector4Component) boxSelector4Component?: BoxSelector4Component;
  @ViewChild("target", { static: false }) target!: ElementRef;
  @ViewChild("moveable", { static: false }) moveable!: NgxMoveableComponent;
  @ViewChild("moveable2", { static: false }) moveable2!: NgxMoveableComponent;
  @ViewChild('slide') imageBox!: ElementRef;

  @Input('image1')
  image1: any = ''

  //image position
  image1_left = '35%'
  image1_left_num = 125

  image1_top = '10%'

  text_left = '25%'
  text_top = '80%'

  public fontColor: string = '#aaaaaa';

  primarySentence_fontSize = 70
  primarySentence_xPosition = 0
  // primarySentence_yPosition = 410
  primarySentence_yPosition = 0
  primarySentence_width = 250

  


  frame = new Frame({
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
  });



  image_1: imageProperties = {
    x: 0, y: 0, w: 20, h: 20,
    x_pct_str: '0', y_pct_str: '0', w_pct_str: '0', h_pct_str: '0',
    x_pct_num: 0, y_pct_num: 0, w_pct_num: 0, h_pct_num: 0,
    x_px: "0px", y_px: "0px", w_px: "20px", h_px: '20px'
  }





  boxHeight = 540.39
  boxWidth = 960.62
  boxHeight_str_px = this.boxHeight + 'px';
  boxWidth_str_px = this.boxWidth + 'px';


  color = '#fbeee2';

  public toggle: boolean = false;

  public sidenav_toggle = false
  public rgbaText_background: string = 'rgba(255,255,255, 2)';

  fontfamilys: any;
  primaryFont: string = "";
  rgbaText_font: string = 'rgba(0,0,0, 1)';


  // imagePositionX_fromSlider = 0;
  // imagePositionX_fromSlider_string = '%';
  imagePositionX_isFromSlider_gate = false;


  public selectedColor: string = 'color1';


  showParentGuideline!: boolean;
  targetEl: any;

  bounds!: { left: 0; bottom: 300; top: 0; right: 300 };
  moveBounds = {};

  presentationImagePositionX_BS: BehaviorSubject<number> = new BehaviorSubject(0)


 

  constructor(
    private store: Store<AppState>) {
  }

  textSelected = true; 
  isTextSelected(){
    this.textSelected = true; 
    this.imageSelected = false; 
  }

  imageSelected = false; 
  isImageSelected(){
    this.imageSelected = true; 
    this.textSelected = false; 
  }



  ngOnInit() {
    window.addEventListener("resize", this.onWindowReisze);
  }


  setBounds() {
    const parentElem = document.getElementById("parentRef")!;
    this.moveable.bounds!.bottom = parentElem.clientHeight;
    this.moveable.bounds!.right = parentElem.clientWidth;
  }

  ngOnDestroy(): void {
    window.removeEventListener("resize", this.onWindowReisze);
  }




  onWindowReisze = () => {
    this.moveable.updateRect();
  };





  targets: any[] = [];
  onDragStart(e: any) {
    const target = e.inputEvent.target;
    console.log('onDragStart');
    console.log(e);
    target.nodeName === "A" ||
      this.moveable.isMoveableElement(target) ||
      this.targets.some((t) => t === target || t.contains(target))
  }

  frameMap = new Map();
  image1_isSected = false
  @HostListener('mousedown')
  onMouseDown_image1() {
    this.image1_isSected = true


  }



  /* DRAG IMAGE AROUND SCREEN 
  
  */

  xPosArr: number[] = []
  yPosArr: number[] = []

  onDrag(e: any) {

    this.image_1.x = e.beforeTranslate[0]
    this.image_1.y = e.beforeTranslate[1]
    // console.log(this.image_1.y)
    this.xPosArr.push(this.image_1.x);
    this.yPosArr.push(this.image_1.y);
    // console.log(e.beforeTranslate[1])

    this.moveable.request("draggable", { x: this.image_1.x }, true);
    const target = e.target;
    target.style.transform = `translate(${this.image_1.x}px, ${this.image_1.y}px)`;

  }



  onDragEnd(e: any) {
    // this.is.presentationSlider_gate_BS.next(false);
 
    const $xP = this.xPosArr[this.xPosArr.length - 1]
    const $yP = this.yPosArr[this.yPosArr.length - 1]

    this.image_1.x_pct_num = (($xP / +this.boxWidth) * 100)       // _width=960.62
    this.image_1.y_pct_num = (($yP / +this.boxHeight) * 100)      // _height = 540.39

    const image_x_adjustStartPosition = ((125 / this.boxWidth) * 100)                   // calculating the beginning position of whichever image to at the drag value, to send to the slider
    const i1_x = this.image_1.x_pct_num + image_x_adjustStartPosition

    const image_y_adjustStartPosition = (this.image_1.y_pct_num - 21) * -1                //questionable. must rework y

    this.store.dispatch(xPosition({ xPosition: i1_x }));
    this.store.dispatch(yPosition({ yPosition: image_y_adjustStartPosition }));


  }


  onSelect(e: any) {
    console.log(e.selected)
    this.targets = e.selected;
  }




 
  /* RESIZE IMAGE AROUND SCREEN 
  
  
  */

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

    const $wP = this.widthArr[this.widthArr.length - 1]
    const $hP = this.heightArr[this.heightArr.length - 1]

    const imageWidth_percentage = (($wP / this.boxWidth) * 100);
    const imageHeight_percentage = (($hP / this.boxHeight) * 100);

    this.store.dispatch(width({ width: imageWidth_percentage }));
    this.store.dispatch(height({ height: imageHeight_percentage }));

  }

  activateMoveableControl(event: { clientX: number; clientY: number; }) {
    document.querySelectorAll(".moveable").forEach(key => {
      const elements = document.elementsFromPoint(event.clientX, event.clientY);
      const chosenTarget = elements.find(key =>
        key.matches(".moveable")
      ) as HTMLElement;
      if (chosenTarget) {
        this.targetEl = chosenTarget;
      }
      chosenTarget
        ? (this.moveable.target = this.targetEl)
        : (this.targetEl = null);
    });

  }

  onEnd() {
    this.showParentGuideline = false;
  }
 





  panelOpenState = false;

  @ViewChild('dropZone', { read: ElementRef, static: true })
  dropZone!: ElementRef;

  _currentIndex = 0;
  _currentField: any;
  _pointerPosition!: { y: number; x: number; };

  types = [
    {text:'text'}
  ]

  fields: any[] = [];

  moved(event: CdkDragMove) {
    this._pointerPosition=event.pointerPosition;
    
  }

  @HostListener('drop', ['$event']) 
  itemDropped(event: CdkDragDrop<any[]>) {
    console.log(  event );
    if (event.previousContainer === event.container) {
      moveItemInArray(this.fields, event.previousIndex, event.currentIndex);
    } else {
      event.item.data.top=(this._pointerPosition.y-this.dropZone.nativeElement.getBoundingClientRect().top)+'px'
      event.item.data.left=(this._pointerPosition.x-this.dropZone.nativeElement.getBoundingClientRect().left)+'px'
      this.addField({...event.item.data}, event.currentIndex);
    }
  }

  addField(fieldType: string, index: number) {
    this.fields.splice(index, 0, fieldType)
  }

  





  

}
