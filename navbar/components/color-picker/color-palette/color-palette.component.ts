import { Component, ViewChild, ElementRef, AfterViewInit, Input, Output, SimpleChanges, OnChanges, EventEmitter, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { backgroundColor_hex } from 'src/app/store/shared/shared.actions';
 import { SharedState } from 'src/app/store/shared/shared.state';
@Component({
  selector: 'app-color-palette',
  templateUrl: './color-palette.component.html',
  styleUrls: ['./color-palette.component.css']
})
export class ColorPaletteComponent implements AfterViewInit, OnChanges {
  @Input()
  hue!: string;

  @Output()
  color: EventEmitter<string> = new EventEmitter(true);

  @ViewChild('canvas')
  canvas!: ElementRef<HTMLCanvasElement>;

 

  private ctx?: CanvasRenderingContext2D;

  private mousedown: boolean = false;

  public selectedPosition!: { x: number; y: number };

  constructor(private elementRef: ElementRef, private store: Store<SharedState>){

  }

  ngAfterViewInit() {
    this.draw();
  }

  draw() {
    if (!this.ctx) {
      this.ctx = this.canvas.nativeElement.getContext('2d')!;
    }
    
    const width = this.canvas.nativeElement.width;
    const height = this.canvas.nativeElement.height;
    

    this.ctx.fillStyle = this.hue || 'rgba(255,255,255,1)';
    this.ctx.fillRect(0, 0, width, height);

    const whiteGrad = this.ctx.createLinearGradient(0, 0, width, 0);
    whiteGrad.addColorStop(0, 'rgba(255,255,255,1)');
    whiteGrad.addColorStop(1, 'rgba(255,255,255,0)');

    this.ctx.fillStyle = whiteGrad;
    this.ctx.fillRect(0, 0, width, height);

    const blackGrad = this.ctx.createLinearGradient(0, 0, 0, height);
    blackGrad.addColorStop(0, 'rgba(0,0,0,0)');
    blackGrad.addColorStop(1, 'rgba(0,0,0,1)');

    
    this.ctx.fillStyle = blackGrad;
    this.ctx.fillRect(0, 0, width, height);

   

    if (this.selectedPosition) {
      this.ctx.strokeStyle = 'white';
      this.ctx.fillStyle = 'white';
      this.ctx.beginPath();
      this.ctx.arc(this.selectedPosition.x, this.selectedPosition.y, 10, 0, 2 * Math.PI);
      // console.log(this.selectedPosition.x, this.selectedPosition.y, 10, 0, 2 * Math.PI)
      this.ctx.lineWidth = 1.5;
      this.ctx.stroke();
      
      
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['hue']) {
      this.draw();
      const pos = this.selectedPosition;
      if (pos) {
         
        this.color.emit(this.getColorAtPosition(pos.x, pos.y));
      }
    }
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(evt: MouseEvent) {
    this.mousedown = false;
  }

  onMouseDown(evt: MouseEvent) {
    this.mousedown = true;
    this.selectedPosition = { x: evt.offsetX, y: evt.offsetY };
    this.draw();
    this.color.emit(this.getColorAtPosition(evt.offsetX, evt.offsetY));
  }

  onMouseMove(evt: MouseEvent) {
    if (this.mousedown) {
      this.selectedPosition = { x: evt.offsetX, y: evt.offsetY };
      this.draw();
      // console.log( this.selectedPosition )
      this.emitColor(evt.offsetX, evt.offsetY);
    }
  }

  emitColor(x: number, y: number) {
    const rgbaColor = this.getColorAtPosition(x, y);
    this.color.emit(rgbaColor);
  }

  getColorAtPosition(x: number, y: number) {
    const imageData = this.ctx!.getImageData(x, y, 1, 1).data;
    // console.log(this.rgbToHex(imageData[0] , imageData[1] , imageData[2]));
    

    this.store.dispatch(backgroundColor_hex({ backgroundColor_hex:  this.rgbToHex(imageData[0] , imageData[1] , imageData[2])}))
    return 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
  }



  rgbToHex(r: number, g: number, b: number) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  
  @HostListener('document:click', ['$event.target'])
public onPageClick(targetElement: any) {
  const clickedInside = this.elementRef.nativeElement.contains(targetElement);
  if (!clickedInside) {
	//Do something. 
  }
}

}
