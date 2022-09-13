import { Directive } from '@angular/core';

@Directive({
  selector: '[appImageEditable]'
})
export class ImageEditableDirective {

  constructor() { }

  onResize(e: any) {
    const beforeTranslate = e.drag.beforeTranslate;
    const target = e.target;

    e.target.style.width = `${e.width}px`;
    e.target.style.height = `${e.height}px`;
    e.target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;

 
 
  }




}
