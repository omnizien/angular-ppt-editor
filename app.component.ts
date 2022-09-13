import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { getIsMainWindowClicked } from './store/shared/shared.selector';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ImagesService } from './shared/services/images.service';
import { MatSliderChange } from '@angular/material/slider';
import { BoxSelector4Component } from './box-selector4/box-selector4.component';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import Moveable from "moveable";
import { Frame } from "scenejs";
 
import { getXPosition } from './store/shared/shared.selector';
import { NgxMoveableComponent, OnDrag, OnPinch, OnResize, OnRotate, OnScale, OnWarp, OnDragStart } from 'ngx-moveable';
import { ImageEditableComponent } from './box-selector4/components/image-editable/image-editable.component';
import { GifsService } from './giphy-search/services/gifs/gifs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { isMainWindowActive } from './store/shared/shared.actions';
 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('ElementRefName') element!: ElementRef;
  @ViewChild(BoxSelector4Component) boxSelector4Component?: BoxSelector4Component;

  value:number=5;
  items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  isWindowActive$!: Observable<boolean>;   
  _isWindowActive = true;

onD: any



  public backgroundColor: string = '#fbeee2';
  public fontColor: string = '#aaaaaa';

  primarySentence_fontSize = 70
  primarySentence_xPosition = 0
  // primarySentence_yPosition = 410
  primarySentence_yPosition = 0
  primarySentence_width = 250

  // primaryImage_xPosition = 23.75;
  // primaryImage_yPosition = 6.25;
  primaryImage_xPosition = 0;
  primaryImage_yPosition = 0;
  primaryImage_width = 20
  primaryImage_height = 20




  //  height: 540px;
  //  height: 325px;

  color = '#fbeee2';

  public toggle: boolean = false;

  public sidenav_toggle = false


  public rgbaText_background: string = 'rgba(255,255,255, 2)';

  fontfamilys: any;
  primaryFont: string = "";
  rgbaText_font: string = 'rgba(0,0,0, 1)';




  public selectedColor: string = 'color1';



  backgroundColor_BS: BehaviorSubject<string> = new BehaviorSubject(this.backgroundColor)
  fontColor_BS: BehaviorSubject<string> = new BehaviorSubject(this.fontColor)
  primaryTextFontSize_BS: BehaviorSubject<number> = new BehaviorSubject(this.primarySentence_fontSize)
  primaryFontFamily_BS: BehaviorSubject<string> = new BehaviorSubject(this.primaryFont)

  primarySentence_xPosition_BS: BehaviorSubject<number> = new BehaviorSubject(this.primarySentence_xPosition)
  primarySentence_yPosition_BS: BehaviorSubject<number> = new BehaviorSubject(this.primarySentence_yPosition)
  primarySentence_width_BS: BehaviorSubject<number> = new BehaviorSubject(this.primarySentence_width)

  primaryImage_xPosition_BS: BehaviorSubject<number> = new BehaviorSubject(this.primaryImage_xPosition)
  primaryImage_yPosition_BS: BehaviorSubject<number> = new BehaviorSubject(this.primaryImage_yPosition)
  primaryImage_width_BS: BehaviorSubject<number> = new BehaviorSubject(this.primaryImage_width)
  primaryImage_height_BS: BehaviorSubject<number> = new BehaviorSubject(this.primaryImage_height)
  

  @ViewChild("target", { static: false }) target!: ElementRef;

  @ViewChild("moveable", { static: false }) moveable!: NgxMoveableComponent;

  public searchValue: string = '';

  _left=1
  _top=1
 

  frame = new Frame({
    left: this._left+"px",
    top: this._top+"px",
    transform: {
      translate: [this._left, this._top],
      rotate: "0deg",
      scaleX: 1,
      scaleY: 1,
      matrix3d: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
    }
  });
  showParentGuideline!: boolean;
  targetEl:any;

  bounds!: { left: 0; bottom: 300; top: 0; right: 300 };
  moveBounds = {};
  




  

  constructor(private cpService: ColorPickerService, private is: ImagesService, 
    private gifsService: GifsService,
    private router: Router,
    private route: ActivatedRoute, 
    private store: Store<AppState>) {
  }




  primaryImage_xPosition_fromImageEditable = 0;

  counter$!: Observable<number>;
  

  ngOnInit() {
   
    this.isWindowActive$ = this.store.select(getIsMainWindowClicked)

    this._isWindowActive =   this.isWindowActive$ as unknown as boolean

    this.isWindowActive$.subscribe(x => this.isMainWindowActive( this._isWindowActive = x ))
 
    this.primaryFont = "Arial";

    this.fontfamilys = [];
    this.fontfamilys.push({ 'title': 'Georgia', 'value': 'Georgia, serif' });
    this.fontfamilys.push({ 'title': 'Times New Roman', 'value': 'Times New Roman' });
    this.fontfamilys.push({ 'title': 'Palatino Linotype', 'value': 'Palatino Linotype' });
    this.fontfamilys.push({ 'title': 'Arial', 'value': 'Palatino Linotype' });
    this.fontfamilys.push({ 'title': 'bitcrusher', 'value': 'bitcrusher' });


    this.counter$ = this.store.select(getXPosition);

    

    console.log( this.store.select(getXPosition))

    //   this.boxSelector4Component.presentationImagePositionX_BS.subscribe((data) => {
    //     console.log(data);
    //     // this.primaryImage_yPosition = data + "%";
    //     // this.pptTextYPosition = 100 - ((data * 2.05)) + "%"

    // });

    // this.is.presentationImagePositionX_BS.subscribe((data) => {
    //   console.log(data);
    //   // this.primaryImage_xPosition = data;

    // });

    this.is.imagePositionsX_toSlider.subscribe((data) => {
      // console.log(data);
      // this.primaryImage_xPosition = 0
      this.primaryImage_xPosition = data;

    });
    
    //1
    this.route.queryParams.subscribe(({ q }) => {
      this.searchValue = q;
    });
  }

  isMainWindowClicked(){
    // this.store.dispatch(isMainWindowActive({ isMainWindowActive: true }));

    // console.log('yep')

  }



  isMainWindowActive(isActive:boolean){
 
   

    let content_t  = document.getElementById('content')!
    if (isActive == false) {
      content_t.style.zIndex= "-1000";
    }
    else{
      content_t.style.zIndex= "1000";
    }
 
  }

  sidenav_isToggled() {
    this.sidenav_toggle = true;
  }
  onChange_fontFamily(font: string) {

    this.primaryFont = font;
    this.primaryFontFamily_BS.next(font);
  }


  onChange_primarySentence_slider_fontSizeSlider(event: MatSliderChange) {
    this.primaryTextFontSize_BS.next(event.value!)
    //  console.log(event.value);

  }

  onChange_primarySentence_slider_xPosition(event: MatSliderChange) {
    this.primarySentence_xPosition_BS.next(event.value!)
    console.log(event.value);

  }

  onChange_primarySentence_slider_yPosition(event: MatSliderChange) {
    this.primarySentence_yPosition_BS.next(event.value!)
    console.log(event.value);

  }



  onChange_primaryImage_xPosition(event: MatSliderChange) {
 
    this.is.presentationImagePositionX_fromSlider_BS.next(event.value!)
 
  }

  onChange_primaryImage_yPosition(event: MatSliderChange) {
    this.primaryImage_yPosition_BS.next(event.value!)
    // console.log(event.value);
  }

  onMouseDown(){
    console.log(this.primaryImage_xPosition_fromImageEditable );
  // this.primaryImage_xPosition =  this.primaryImage_xPosition - this.primaryImage_xPosition_fromImageEditable  
  this.is.presentationSlider_gate_BS.next(true);
    
  }

  onChange_primaryImage_slider_width(event: MatSliderChange) {
    this.primaryImage_width_BS.next(event.value!)
    // console.log(event.value);
  }

  onChange_primaryImage_slider_height(event: MatSliderChange) {
    this.primaryImage_height_BS.next(event.value!)
    // console.log(event.value);
  }







  public onChangeColorHex8_background(color: string): string {

    this.color = color
    const hsva = this.cpService.stringToHsva(color, true);

    if (hsva) {
      this.is.backgroundColor_service.next(color)
      // this.myInput.next(this.color)
      // console.log(color);
      return this.cpService.outputFormat(hsva, 'rgba', null);
    }

    return '';
  }



  public onChangeColorHex8_font(color: string): string {

    this.fontColor = color
    const hsva = this.cpService.stringToHsva(this.fontColor, true);

    if (hsva) {
      // this.is.backgroundColor_service.next(color)
      // this.myInput.next(this.color)
      // console.log(color);
      this.fontColor_BS.next(color);
      return this.cpService.outputFormat(hsva, 'rgba', null);
    }

    return '';
  }

  formatLabel(value: number) {

    if (!value) {
      return 0;
    }

    if (value >= 100) {
      // return  Math.round(value / 100)
      //(value / 100).toFixed(2);
      return value;
    }

    return value;

  }

 
  getPositionXY(element: any) {
    var rect = element.getBoundingClientRect();
    console.log('X: ' + rect.x + ', ' + 'Y: ' + rect.y);

  }

  getPosition(event: any) {
    let offsetLeft = 0;
    let offsetTop = 0;

    let el = event.srcElement;

    while (el) {
      offsetLeft += el.offsetLeft;
      offsetTop += el.offsetTop;
      el = el.parentElement;
    }

    console.log(offsetTop + " " + offsetLeft)
    return { offsetTop: offsetTop, offsetLeft: offsetLeft }
  }

 

  ngAfterViewInit() {
    // this.setBounds();
  }

  setBounds() {
    const parentElem = document.getElementById("parentRef")!;
    this.moveable.bounds!.bottom = parentElem.clientHeight;
    this.moveable.bounds!.right = parentElem.clientWidth;
  }

 
  onKeyUp() {
    this.moveable.updateRect();
  }
   
 
  frameMap = new Map();
  
   //1
  handleSearchGifs($event: string) {
    this.router.navigate(['/search'], { queryParams: { q: $event } });
  }
  

}



