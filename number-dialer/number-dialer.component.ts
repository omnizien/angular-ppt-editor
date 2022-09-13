import { Component, ViewChild, ElementRef, AfterViewInit,forwardRef,Input } from "@angular/core";
import {
  style,
  animate,
  AnimationBuilder,
  AnimationFactory,
  AnimationPlayer,
  trigger,
  state,
  transition
} from "@angular/animations";
import { ControlValueAccessor, AbstractControl, ValidationErrors,NG_VALUE_ACCESSOR,NG_VALIDATORS } from "@angular/forms";


@Component({
  selector: 'app-number-dialer',
  templateUrl: './number-dialer.component.html',
  styleUrls: ['./number-dialer.component.css'] 
 
})
export class NumberDialerComponent implements  AfterViewInit,ControlValueAccessor {

  @Input() items!: any[] ; 
  onChange:any;
  onTouched:any;

  marginTop: number = 0;
  value: number = 0;   //originally -1
  marginInit: number = 0;
  timing = "150ms ease-in";
  disabled:boolean=false;

  private player!: AnimationPlayer;
  private player2!: AnimationPlayer;

  @ViewChild("d", { static: false, read: ElementRef }) item : any;
  @ViewChild("picker", { static: false, read: ElementRef }) picker : any;
  @ViewChild("inner", { static: false, read: ElementRef }) inner : any;
  @ViewChild("item.selected", { static: false, read: ElementRef }) itemSelected : any;
  constructor(private builder: AnimationBuilder) {}

  writeValue(value: any[]|any): void {
    const index=this.items.findIndex(x=>x==value);
    this.value=index>=0?index:0;
    this.move(this.value)
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled=isDisabled
  }

  onDrop(event: any)
  {
    const oldValue = this.value;
    if (event.distance.x > 40 && this.value > 0) 
    {
      if (event.distance.x > 100 && this.value >  2)
          this.value-=2
      else
      this.value--;
    }
    if (event.distance.x< -40 && this.value < this.items.length - 1) 
    {
      if (event.distance.x<-100 && this.value<this.items.length - 2)
          this.value+=2
      else
      this.value++;
    }
    

    if (oldValue != this.value) {
      this.move(this.value)
    }
    event.source.element.nativeElement.style.transform = 'none' 
    const source: any = event.source
    source._passiveTransform = { x: 0, y: 0 } 
  }
  ngAfterViewInit()
  {
    this.move(this.value)
  }

  move(value : any)
  {
    if (!this.picker || !this.item)
    return;
      const marginInit =
        this.picker.nativeElement.clientWidth / 3 -
        1 * this.item.nativeElement.clientWidth;
      const offset =
        marginInit - value * this.item.nativeElement.clientWidth;
      const myAnimation = this.builder.build([ style({ fontsize: 12 + "px" }),
        animate(this.timing, style({ marginLeft: offset + "px", fontsize: 34 + "px" }))
      ]);
    
      this.player = myAnimation.create(this.inner.nativeElement);
   
      this.player.play();
     
     
      // this.player2.play();
      this.onChange(this.items[value])

  }
}
