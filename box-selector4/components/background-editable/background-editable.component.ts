import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { SharedState } from 'src/app/store/shared/shared.state';
import { backgroundColor_hex, getIsBoxBackgroundClicked } from 'src/app/store/shared/shared.selector';
import { isBoxBackgroundClicked } from 'src/app/store/shared/shared.actions';

@Component({
  selector: 'app-background-editable',
  templateUrl: './background-editable.component.html',
  styleUrls: ['./background-editable.component.css']
})
export class BackgroundEditableComponent implements OnInit {

   // let modal_t  = document.getElementById('modal_1')!;

  boxHeight = '540.39px'
  boxWidth = '960.62px'
  backgroundColor="";

  backgroundColor_hex$!: Observable<string>;

  constructor(private store: Store<SharedState>) { }  

  ngOnInit(): void {
    this.backgroundColor_hex$ =  this.store.select(backgroundColor_hex) 
    this.backgroundColor_hex$.subscribe(x =>  this.backgroundColor = x  )
    
  
  }

  @HostListener('click')
onDocumentClick(event: MouseEvent) {
  // this.store.dispatch(isBoxBackgroundClicked({isBoxBackgroundClicked:true}))
  
  // let modal_t  = document.getElementById('modal_1')!;
  // modal_t.classList.remove('sshow');
  // modal_t.classList.add('hhidden');
    
  }
 


}
