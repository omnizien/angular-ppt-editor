import { Directive, ElementRef, HostListener, Input, TemplateRef, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Directive({
  selector: '[appDataForm]'
})
export class DataFormDirective {

    accordion:MatAccordion = new MatAccordion;
  // accordion:MatAccordion = new MatAccordion;

  constructor(private el: ElementRef,public templateRef: TemplateRef<any>) {
    this.el.nativeElement.style.backgroundColor = 'yellow';
    
    
 }

 @HostListener('mouseenter') onMouseEnter() {
  this.highlight('yellow');
    // this.el2.nativeElement.openAll();
     
     console.log( this.accordion.openAll());
}

@HostListener('mouseleave') onMouseLeave() {
  this.highlight('');
}

private highlight(color: string) {
  this.el.nativeElement.style.backgroundColor = color;
  // this.accordion.openAll();
 
}

}
