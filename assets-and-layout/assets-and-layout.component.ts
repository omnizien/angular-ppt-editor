import { Component, Output, EventEmitter, ContentChild, ViewChild, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// import { stringify } from 'querystring';
 
// import { Details } from '../box-selector4/details.interface';
 

interface iImage {
  name: string,
  image?: any
}

export interface Details {
  id: number,
  name: string,
  image1: any;
  translation?: string,
  imagename?: string
  image: string
};


export interface PackageUp {
  id: number,
  name: string,
  translation?: string,
  imagename?: string,
  image: iImage

};
@Component({
  selector: 'app-assets-and-layout',
  templateUrl: './assets-and-layout.component.html',
  styleUrls: ['./assets-and-layout.component.css']
})
export class AssetsAndLayoutComponent  {

  @Input('_dropdown')
  images: any[] = [];
  array = [{id: 1}, {id: 2},{id: 3}]

  
  index = 0
  detail: Details[] = [];
  imageName: string = ''
  imageBase64: any = ''
  imagePath: any = ''

  map1 = new Map();
  num_of_slides: any = ["1", "2"];
  packageup: PackageUp[] = []

  model = {} as Details;
  boo: boolean = true;

  first = "ImageGoes "

  kvArray = [{ key: 1, value: 'value1' }, { key: 2, value: 'value2' }];
  map = new Map(this.kvArray.map(x => [x.key, x.value] as [number, string]));

 

  constructor( private _sanitizer: DomSanitizer) {

  }
  niv(){
    
  }
  onSubmit() {
    
    this.packageup.push({
      id: this.index++,
      name: this.model.name,

      translation: this.model.translation as string,
      image: { name: this.imageName, image: this.map1.get(this.imageName) }

    });
    // this.boo == true ? this.childRef.firstCall() : this.childRef.objectEntries();
    // this.boo = false;
    console.log(this.packageup);

  }

  test() {
    //  console.log( this.imtoops);
  }

  passArray(arr: any[]) {
    console.log(' passArray arr');
    console.log(arr);
    this.images = []
    this.handleFiles(arr)
    Object.entries(arr).forEach((entry) => {
      const [key, value] = entry;
      this.images.push(value.name);
    });
  }


  showDrio(form: any) {
    console.log(form.image.value);
    return form && form.image && form.image.value;
  }

  showFormControls(form: any) {
    this.imageName = form.controls.image.value;
    this.imagePath = this.map1.get(this.imageName);
    return form && form.controls.name &&
      form.controls.image.value;
  }




  public handleFiles = (files: any[]) => {
    // get valid images
    let validImages = [...files].filter((file) =>
      ['image/jpeg', 'image/png'].includes(file.type)
    );
    //  show the image
    validImages.forEach(this.showImage);

  };

  showImage = (image: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener('load', (e) => {
      this.imageBase64 = e.target!.result
      this.map1.set(image.name, e.target!.result);
      this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl(e.target!.result as string);
    });
  };
}
