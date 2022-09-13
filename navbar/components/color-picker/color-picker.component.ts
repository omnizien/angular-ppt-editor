import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent {
  public hue: string = '';
  public color: string = '';


  constructor(private elementRef: ElementRef) {
  }

  @HostListener('document:click', ['$event.target'])
public onPageClick(targetElement: any) {
  const clickedInside = this.elementRef.nativeElement.contains(targetElement);
  if (!clickedInside) {
	//Do something. 
  }
}
}
