import {
    Component,
    Input, ElementRef, ViewChild, OnInit, HostListener,

} from '@angular/core';


import {
    animate,
    state,
    style,
    transition,
    trigger
} from '@angular/animations';
import * as data from "./sentences.json";
import { BehaviorSubject, delay, interval, Observable, timer } from 'rxjs';
import { inject } from '@angular/core/testing';
import { ImagesService } from '../shared/services/images.service';
import { AppComponent } from '../app.component'

import PptxGenJS from 'pptxgenjs'
import { MatSliderChange } from '@angular/material/slider';
import { DragAxis } from '@angular/cdk/drag-drop';
import {PackageUp} from '../box-selector4/services/data.models'
import { Store } from '@ngrx/store';
import { BoxState } from './store/store.state';
import { xPosition } from './store/store.actions';
import { getXPosition } from './store/store.selector';
import { SharedState } from '../store/shared/shared.state';
import { backgroundColor_hex } from '../store/shared/shared.selector';

// interface iImage {
//     imagename: string,
//     base64?: any
// }

// export interface PackageUp {
//     sentence: string,
//     sentence2:string,
//     sentence3:string,
//     sentence4:string,
//     image1: iImage,
//     image2: iImage,
//     image3: iImage,
//     image4: iImage
// };


@Component({
    selector: 'app-box-selector4',
    templateUrl: './box-selector4.component.html',
    styleUrls: ['./box-selector4.component.css'],
    animations: [
        trigger('opacity', [
            state('zero', style({ 'opacity': '0', transform: 'translateX(0)' })),
            state('one', style({ 'opacity': '.8', transform: 'translateX(0)' })),
            transition('zero => one', animate(600)),
            transition('one => zero', animate(600))
        ])

    ]
})
export class BoxSelector4Component implements OnInit {


    //  arrayOfObservables: Observable<boolean[] > = [false, true ] ;

    ppt = new PptxGenJS();

    // 2. Add a Slide to the presentation

    constructor(private ims: ImagesService, private appComp: AppComponent, private store: Store<BoxState>, private store2: Store<SharedState> ) { }
 

    @ViewChild('slide', { static: false }) div!: ElementRef;
    @ViewChild('slide') slide!: ElementRef;


    public sentence1: any = [];
    public sentence2: any = [];
    public sentence3: any = [];
    public sentence4: any = [];
    public image1: any = [];
  

    opacity = "one";
    sentence: string = ""
    image_1_base64: any = ''
 
    

    @Input('_details')
    detail: PackageUp[] = [];

    slideBackgroundColor = "#fbeee2";
    fontSize = '50px'
    fontColor = "#ff0000"
    primaryFont = "bitcrusher"

    /* ~~ PRIMARY TEXT VARIABLES ~~ */
    primarySentence_xPosition = "1%"
    primarySentence_yPosition = ""
    primarySentence_backgroundColor = "#efc1b3"

    /* ~~ PRIMARY IMAGE VARIABLES ~~ */
    primaryImage_height = "20%"
    primaryImage_width = "20%"
    primaryImage_xPosition = ""
    primaryImage_yPosition = ""

    /* ~~ PPT VARIABLES ~~ */
    pptTextYPosition = "50%"
    pptTextSize = 0
    pptImageHeight = 0
    pptImageWidth = 0
    pptBackground = ''

    ppt_imageXPerc = 0
    ppt_imageYPerc = 0

    public index = 0;

    
    imageWithinSlide_PositionX = 0
    imageWithinSlide_PositionY = 0
    presentationImagePositionX_BS: BehaviorSubject<number> = new BehaviorSubject(this.imageWithinSlide_PositionX)

    


    /* imortant note at text y position's behavior subject */
     

    presentationImagePosition = 0

    presentationImagePosition_BS: BehaviorSubject<number> = new BehaviorSubject(this.presentationImagePosition)

    xPos$!: Observable<number>;
    backgroundColor_hex$!:Observable<string>;
    

    ngOnInit() {
              /* ~ SUBSCRIBE TO BEHAVIOR SUBJECTS ~*/
        this.ims.backgroundColor_service.subscribe((data) => { this.slideBackgroundColor = data; })
     
        this.appComp.primaryTextFontSize_BS.subscribe((data) => { 
            this.fontSize = data.toString() + "px";
            this.pptTextSize = data * 72 / 96  });

        this.appComp.fontColor_BS.subscribe((data) => { this.fontColor = data; });
        this.appComp.primaryFontFamily_BS.subscribe((data) => { this.primaryFont = data; });
        
        this.appComp.primarySentence_xPosition_BS.subscribe((data) => { this.primarySentence_xPosition = data + "%"; });
        this.appComp.primarySentence_yPosition_BS.subscribe((data) => {
        this.primarySentence_yPosition = data + "%"; });

        /*   ~~~~~  hacky workaround ~~~~~~~~~  */

        // In in the app.component, I divided the slider's quantity by 2.05 (guesstimate) then 
        // multiplied it for the ppt percentage. 
        // reason: when y position is at 100% it scales 50% off the div container (is this a bug???)

        this.appComp.primaryImage_yPosition_BS.subscribe((data) => {
            this.primaryImage_yPosition = data + "%";
            this.pptTextYPosition = 100 - ((data * 2.05)) + "%"
        });
        this.appComp.primaryImage_xPosition_BS.subscribe((data) => { 
            this.primaryImage_xPosition =  this.ppt_imageXPerc - data + "%"; });
             
        this.appComp.primaryImage_width_BS.subscribe((data) => { this.primaryImage_width = data + "%"; });
        this.appComp.primaryImage_height_BS.subscribe((data) =>{ this.primaryImage_height = data + "%";});
        this.presentationImagePosition_BS.subscribe((data) => { this.presentationImagePosition = data  });

       
 
        this.xPos$ = this.store.select( getXPosition );
        this.backgroundColor_hex$ = this.store2.select(backgroundColor_hex)

        //TO-DO: do this the faster way by taking final value from background-editable array
        this.backgroundColor_hex$.subscribe(x=> this.slideBackgroundColor = x)

    }

  

    objectEntries() {
        this.sentence1 = []
        this.image1 = []
 
        Object.entries(this.detail).forEach((entry) => {
            const [key, value] = entry;
            this.image1.push(value.image1.base64);
 
        });

        this.image_1_base64 = this.image1[this.index];
   
        this.sentence = this.sentence1[this.index];
    }


    backwards() {
        this.index = this.index - 1;
        this.image_1_base64 = this.image1[this.index]
 
        this.sentence = this.sentence1[this.index];
    }

    forwards() {
        this.index = this.index + 1;
        this.image_1_base64 = this.image1[this.index]
  
        this.sentence = this.sentence1[this.index];
    }


    // dragPosition = {x: 0, y: 0};

    dragPosition: any;

    changePosition() {
        this.dragPosition = { x: this.dragPosition.x + 50, y: this.dragPosition.y + 50 };
    }

 
   

    @HostListener('mouseup')
    mouseup_presentationBox(event: any) {
        // this.presentationImagePosition_BS.next(event )
        let { x, y } = this.slide.nativeElement.getBoundingClientRect();

    }
    
    
    @ViewChild('imageBox') imageBox!: ElementRef;

    @HostListener('mouseup')
    mouseup_imageBox(event: any) { }

 
    getPpt() {

        const slide = this.ppt.addSlide();

        /* another hacky workaround with replace because PPT only accepts 6 chacter hex values */
        let background = this.slideBackgroundColor.replace("#", "");
        slide.background = { color: background.substring(0, 6) };

        slide.addText(this.sentence1[0], {
            x: this.primarySentence_xPosition as PptxGenJS.Coord,
            y: this.pptTextYPosition as PptxGenJS.Coord,
            color: this.slideBackgroundColor,
            fill: { color: this.fontColor },
            align: this.ppt.AlignH.left,
            fontSize: this.pptTextSize,

        });

        if (this.image1[0].length > 0) {
            let image: string = this.image1[0] as string;
            let imageResult = image.replace("data:", "");

            //   slide.addImage({ path: "https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg" });
            //   sizing: { type: "crop", x: this.primaryImage_xPosition as PptxGenJS.Coord, y: this.primaryImage_yPosition as PptxGenJS.Coord ,    w: this.primaryImage_width as  PptxGenJS.Coord, h: this.primaryImage_height as  PptxGenJS.Coord }  
            slide.addImage({ 
                x: this.primaryImage_xPosition as PptxGenJS.Coord, 
                y: this.primaryImage_yPosition as PptxGenJS.Coord, 
                w: this.primaryImage_width as PptxGenJS.Coord, 
                h: this.primaryImage_height as PptxGenJS.Coord, data: imageResult });

        }


        for (let i = 0; i < 1; i++) {
        }

        this.ppt.writeFile({ fileName: "Sample Presentation.pptx" });

    }
 
}








