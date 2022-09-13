import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Store } from '@ngrx/store';
import { SharedState } from 'src/app/store/shared/shared.state';
import { primaryFont } from 'src/app/store/shared/shared.actions';
import { Observable, subscribeOn, tap } from 'rxjs';
import { isMainWindowActive } from 'src/app/store/shared/shared.actions';
@Component({
  selector: 'app-text-edit',
  templateUrl: './choose-font.component.html',
  styleUrls: ['./choose-font.component.css']
})
export class ChooseFontComponent implements OnInit {



  primaryFont: string = "";
  fontfamilys: any;
  clickedIndex:number = 0;
  index!:Observable<number>;

  primaryFontFamily_BS: BehaviorSubject<string> = new BehaviorSubject(this.primaryFont)
  
 
  constructor(private store:Store<SharedState>) { }

  ngOnInit(): void {

 

    this.fontfamilys = [];
    this.fontfamilys.push({ 'title': 'Georgia', 'value': 'Georgia, serif' });
    this.fontfamilys.push({ 'title': 'Times New Roman', 'value': 'Times New Roman' });
    this.fontfamilys.push({ 'title': 'Palatino Linotype', 'value': 'Palatino Linotype' });
    this.fontfamilys.push({ 'title': 'Arial', 'value': 'Palatino Linotype' });
    this.fontfamilys.push({ 'title': 'bitcrusher', 'value': 'bitcrusher' });

 
    this.index.subscribe(
      x => this.clickedIndex, 
        ) 
  }

  onChange_fontFamily(font: string) {

    this.primaryFont = font;
    this.primaryFontFamily_BS.next(font);
    this.store.dispatch(primaryFont({primaryFont: this.primaryFont}))
  }

  onChange_fontFamil_index(i: number) {
 console.log(this.fontfamilys[i])
 this.store.dispatch(primaryFont({primaryFont: this.fontfamilys[i].title}))
  }

 
}
