import { AfterContentInit, Component, ComponentFactoryResolver, ElementRef, EventEmitter, Input, OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { BehaviorSubject, delay, of, Subject, takeUntil,mergeMap } from 'rxjs';
 
import { AssetsAndLayoutComponent } from '../assets-and-layout/assets-and-layout.component';
import { BoxSelector4Component } from '../box-selector4/box-selector4.component';
import { ImageDropComponent } from '../image-drop/image-drop.component';
import { ImagesService } from '../shared/services/images.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { MatAccordion } from '@angular/material/expansion';
import { DataFormDirective } from './data-form.directive';
import { PackageUp } from '../box-selector4/services/data.models'
 

// export const MY_DATA = [
//   { placeholder: 'First name', name: 'name', modelPropName: 'model.name' },
//   { placeholder: 'Last name', name: 'lastName', modelPropName: 'model.lastName' },
//   { placeholder: 'Age', name: 'age', modelPropName: 'model.age' }
// ];

 
 
@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent   {


  constructor(private fb: FormBuilder, public imp: ImagesService) { }

  
  data_entry_container_height = "500px"

  addButtonMarginTop = "75px"
  addButtonMarginLeft = "275px"

  item!:FormArray
  basicFormGroup!: FormGroup;

  boolVal:boolean = false

  accordianBool_bs: BehaviorSubject<boolean> = new BehaviorSubject(this.boolVal)
  
   
  //  EXPANSION_PANEL_ANIMATION_TIMING = '325ms cubic-bezier(0.4,0.0,0.2,1)';

   
  // @ViewChild('accordion', { static: false }) Accordion!: MatAccordion;

   @ViewChild('accordion', { static: false }) Accordion!: MatAccordion;
  

  // @ViewChildren('accordion', { read:  MatAccordion}) Accordion!: MatAccordion;
   // @ViewChildren('accordion') myValue!: QueryList<DataFormComponent> ;

  // @ViewChildren('accordion', { read:  ElementRef}) Accordion!: MatAccordion;
  // @ViewChildren('accordion', { read:  MatAccordion}) Accordion!: MatAccordion;

  @ViewChildren(MatAccordion) viewChildren!: QueryList<MatAccordion>;
  @ViewChild(ImageDropComponent) imageDropRef?: ImageDropComponent;
  @ViewChild(BoxSelector4Component) boxSelector4Component?: BoxSelector4Component;
  private _mouseEnterStream: EventEmitter<any> = new EventEmitter();
  private _mouseEnterStream_Leave: EventEmitter<any> = new EventEmitter();




  onMouseEnter($event: any) {
    this._mouseEnterStream.emit($event);
  }

 
  onMouseLeave($event: any) {
    this._mouseEnterStream_Leave.emit($event);
  }

  
     
 

  closeAllPanels(){
//  this.accordianBool_bs.next(true);
 
 
 
    // this.Accordion!.closeAll();
}
openAllPanels(){
    // this.Accordion!.openAll();
   
 
}
 


  imageName: any;
  imagePath: any;
  map1 = new Map();
  details: PackageUp[] = []


  primaryKeyWords: any[] = [];
  primaryImages: any[] = [];

  imageArray?: any[] = this.imp?.images

  array: any[] = []

  addSlideButtonTouched = 0;
   didSubmit = false;

  form = this.fb.group({
    lessons: this.fb.array([])
  });


  

  ngOnInit() {

    this.addSlot();
    
    this.accordianBool_bs.subscribe((data) => {
      console.log(data);
 
  })
 
 
  this._mouseEnterStream.pipe(
    mergeMap(() => {
    
      // create new observable
      return of({}).pipe(
        delay(500),
        takeUntil(this._mouseEnterStream)
      )
    })
  )
  .subscribe(() =>   
  this.Accordion!.openAll());



  this._mouseEnterStream_Leave.pipe(
    mergeMap(() => {
    
      // create new observable
      return of({}).pipe(
        delay(500),
        takeUntil(this._mouseEnterStream)
      )
    })
  )
  .subscribe(() =>    this.Accordion!.closeAll());

  
  }
 
  expPanelClick:boolean = false
  text1 = "+ text"
  text2 = "- text"
 
  pass: FormGroup[] = []
  
  get lessons() {
  
    return this.form.controls["lessons"] as FormArray;
  }

 
  // this.item = this.lessons.get('lessons') as FormArray
  // this.pass = this.item.controls as FormGroup[];



  addSlot() {
    const lessonForm = this.fb.group({
      sentence: [''],
      sentence2: [''],
      sentence3: [''],
      sentence4: [''],
      image1: [],
      image2: [],
      image3: [],
      image4: []
    });

    this.lessons.push(lessonForm);
   //expand's box size
    this.addSlideButtonTouched++;
    console.log(this.addSlideButtonTouched);
   
    if(this.lessons.length > 0) { 
      // this.data_entry_container_height = "500px" 
    }
     
    }

  // data_entry_container_size(){
  //   const c_size= "500px"
  // }

 
  deleteSlot(lessonIndex: number) {
    this.lessons.removeAt(lessonIndex);
    
      this.addSlideButtonTouched--

      if(this.lessons.length == 0 ) { this.data_entry_container_height = "200px"}
 
  }

  showFormControls(form: any) {
    this.imageName = form.controls.image.value;
    this.imagePath = this.map1.get(this.imageName);
    return form && form.controls.name &&
      form.controls.image.value;
  }
  adder = 0
  addText(){
this.adder++
  }

 

  submit() {

    for (let i = 0; i < this.lessons.length; i++) {
      const element = this.lessons.at(i);
      console.log( element.value);

      if (element.valid) {

        let img1: string = element.value.image1
        let img2: string = element.value.image2
        let img3: string = element.value.image3
        let img4: string = element.value.image4

        this.details.push({
          sentence: element.value.sentence,
          sentence2: element.value.sentence,
          sentence3: element.value.sentence,
          sentence4: element.value.sentence,
          image1: { imagename: element.value.image1, base64: (this.imp.map1.get(img1)) as any },
          image2: { imagename: element.value.image2, base64: (this.imp.map1.get(img2)) as any },
          image3: { imagename: element.value.image3, base64: (this.imp.map1.get(img3)) as any },
          image4: { imagename: element.value.image4, base64: (this.imp.map1.get(img4)) as any }
        });
        console.log(this.imp.map1.get(element.value.image) as string);
        console.log(this.details);
      }

      // this.didSubmit? this.boxSelector4Component?.objectEntries: this.boxSelector4Component?.firstCall();
      // this.didSubmit = true;
      this.boxSelector4Component?.objectEntries()
      //  
    }

    this.details = [];

  }

 
 
 
  get items() {
    this.item  =this.basicFormGroup.get('items') as FormArray
     return this.item.controls as FormGroup[];
    }
  
    drop(event: CdkDragDrop<string[]>) {
 
      moveItemInArray(this.lessons.controls as any , event.previousIndex, event.currentIndex);
 
      for(let i = 0; i<this.item.length; i++){  
        console.log(this.lessons.controls[i].value) }

         
    }

    dragPosition = {x: 0, y: 0};

    changePosition() {
      this.dragPosition = {x: this.dragPosition.x + 50, y: this.dragPosition.y + 50};
    }

}
