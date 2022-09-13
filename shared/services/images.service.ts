import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ImageDropComponent } from '../../image-drop/image-drop.component';

 

@Injectable({
  
  providedIn: 'root'
})
export class ImagesService  implements OnInit {
 
 
  ngOnInit(){

    
   
  }
 
  backgroundColor_service:BehaviorSubject<string> = new BehaviorSubject("")
  sliderValue:BehaviorSubject<string> = new BehaviorSubject("")

  presentationSlider_gate_BS: BehaviorSubject<boolean> = new BehaviorSubject(false)

  imagePositionsX_toSlider: BehaviorSubject<number> = new BehaviorSubject(0)
  
  presentationImagePositionX_fromSlider_BS: BehaviorSubject<number> = new BehaviorSubject(0)

  images:any[] = []
  
  map1 = new Map();

  

  hex="";

 

  slideBackgroundColor: string = "";
//  i = new ImageDropComponent();

 getImages(){
 
  //  this.images = this.i.cold;
  console.log('getImages()');
   console.log( this.images);
  //  return this.images;
 }


 

  backgroundColor_ImageService = this.backgroundColor_service.subscribe((data) => {
    console.log(data);
    this.slideBackgroundColor = data
    // const imgBackgroundColor = data 

    return data;
  
    // this.pptBackground = 
  
  })

 
 

}
