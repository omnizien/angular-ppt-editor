import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageEditableComponent } from './components/image-editable/image-editable.component';
import { NgxSelectoModule } from 'ngx-selecto';
import { NgxMoveableModule, NgxMoveableComponent } from 'ngx-moveable';
import { StoreModule } from '@ngrx/store';
import {BoxReducer} from './store/store.reducer';
import { BackgroundEditableComponent } from './components/background-editable/background-editable.component';
import { TextEditableComponent } from './components/text-editable/text-editable.component';
import { TextEditableDirective } from './components/text-editable/text-editable.directive'
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageEditableDirective } from './components/image-editable/image-editable.directive';
import { MovableObjectsComponent } from './components/movable-objects/movable-objects.component';
import { DemoMaterialModule } from './material-module';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    ImageEditableComponent,
    BackgroundEditableComponent,
    TextEditableComponent,
    TextEditableDirective,
    ImageEditableDirective,
    MovableObjectsComponent
  ],
  imports: [
    DemoMaterialModule,
    CommonModule, 
    NgxSelectoModule,
    NgxMoveableModule,
    MatInputModule,
    ReactiveFormsModule,
    DragDropModule,
    StoreModule.forFeature('box-selector', BoxReducer),
  ],
  exports:[ ImageEditableComponent,BackgroundEditableComponent,TextEditableComponent, MovableObjectsComponent]
})
export class BoxSelector4Module { }
