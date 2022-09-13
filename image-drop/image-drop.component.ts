import { ElementRef, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';
import { Component, ViewChild, ApplicationRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImagesService } from '../shared/services/images.service';

import { Data } from '@angular/router';
import { Observable, observable, of } from 'rxjs';

@Component({
  selector: 'app-image-drop',
  templateUrl: './image-drop.component.html',
  styleUrls: ['./image-drop.component.css']
})
export class ImageDropComponent implements OnInit {

  @ViewChild("fileDropRef", { static: false }) fileDropEl!: ElementRef;

  @Output() messageEvent = new EventEmitter<any[]>();

  files: any[] = [];
  filename: any[] = [];

  //used for images 
  map1 = new Map();

  nombre = ""
  imagePath: any;
  images: any[] = [];

 arr$!: Observable<any[]>;

  // isSquareClicked:boolean=false;

  constructor(public imageService: ImagesService, private renderer: Renderer2, private _sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
   of(this.files).subscribe(x=>console.log(x))
   
    
  }

  what(){
    console.log(this.files);
    console.log(this.map1)
  }
  width = document.getElementById('file-drop-container')?.style.width;
  //  input = document.getElementById('file-drop-container') as HTMLDivElement;



  // wasSquareClicked(){
  //   this.isSquareClicked = true ;
  //   // console.log(this.box);
  //   // this.box?.style.width = "740px";
  //   // this.box?.= "740px";
  //   // this.input.style.backgroundColor = "#c5c796";
  //   // this.input.style.height= "197.5 px;";
  //   // this.input.style.width= "197.5 px;";
  //   this.width = "740px";

  //   // this.input.style.animation="spin2 4s linear infinite";
  // }

  onFileDropped($event: any[]) {
    this.prepareFilesList($event);
    this.handleFiles($event)

    console.log($event);
  }

  fileBrowseHandler(files: any[]) {
  }

  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progressi = 0;
      this.imageService.images.push(item.name);
      this.filename.push(item);
      // console.log(item); 
    }

    this.messageEvent.emit(this.imageService.images);
    // this.handleFiles(this.files);

    Object.entries(this.files).forEach((entry) => {
      const [key, value] = entry;
      this.images.push(value.name);
    });

    this.uploadFilesSimulator(0);

  }

  handleFiles = (files: any[]) => {

    let validImages = [...files].filter((file) =>
      ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)
    );
    validImages.forEach(this.showImage);

  };

  showImage = (image: any) => {

    const reader = new FileReader();
    reader.readAsDataURL(image);

    reader.addEventListener('load', (e) => {
      this.imageService.map1.set(image.name, e.target!.result);
      this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl(e.target!.result as string);
    });
  };


  
   


  uploadFilesSimulator(index: number) {
    setTimeout(() => {

      if (index === this.imageService.images.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {

          if (this.imageService.images[index].progressi < 100) {
            this.imageService.images[index].progressi += 5;
            this.nombre = this.imageService.images[index].name
          }
          else {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          }

        }, 200);
      }
    }, 1000);



  }


  deleteFile(index: number) {
    if (this.imageService.images[index].progress < 100) {
      return;
    }
    this.files.splice(index, 1);
  }

  formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

}
