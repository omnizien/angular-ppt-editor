import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ColorPickerModule } from 'ngx-color-picker';
import {MatSliderModule} from '@angular/material/slider';
import { NgxMoveableModule } from 'ngx-moveable'
import { NgxSceneModule} from "ngx-scenejs";
import {MatExpansionModule} from '@angular/material/expansion';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { NgxSelectoModule } from 'ngx-selecto';

import { BoxSelector4Module } from './box-selector4/box-selector4.module';
// import { SharedModule } from './giphy-search/shared/shared.module';
// import { DirectivesModule } from './giphy-search/directives/directives.module';
// import { GiphySearchComponent } from './giphy-search/giphy-search.component';
//  import { DashboardPageComponent } from './giphy-search/pages/dashboard-page/dashboard-page.component';
// import { CardComponent } from './giphy-search/components/card/card.component';
// import { GridComponent } from './giphy-search/components/grid/grid/grid.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
 
import { FileSaverModule } from 'ngx-filesaver';
import {MatCheckboxModule} from '@angular/material/checkbox';

 
 
import { DataFormDirective } from './data-form/data-form.directive'; 

import { AppComponent } from './app.component';
import {AssetsAndLayoutComponent} from './assets-and-layout/assets-and-layout.component'
import { ImageDropComponent } from './image-drop/image-drop.component';
import { BoxSelector4Component } from './box-selector4/box-selector4.component';
import { DndDirective } from './image-drop/directives/dnd.directive';
import { DataFormComponent } from './data-form/data-form.component';
 
 
import { SubmitButtonComponent } from './data-form/submit-button/submit-button.component';
import { AddButtonComponent } from './data-form/add-button/add-button.component';
 
 
 
import { SliderComponent } from './data-form/add-button/slider/slider.component';
import { ImageComponent } from './data-form/image/image.component';

 

import { ToolsPanelComponent } from './tools-panel/tools-panel.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ColorPickerComponent } from './navbar/components/color-picker/color-picker.component';
import { ColorSliderComponent } from './navbar/components/color-picker/color-slider/color-slider.component';
import { ColorPaletteComponent } from './navbar/components/color-picker/color-palette/color-palette.component';
import { ChooseFontComponent } from './navbar/components/edit-text-menu/choose-font/choose-font.component';
 
 
import { RightNavComponent } from './right-nav/right-nav.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { appReducer } from './store/app.state';
import { CustomSerializer } from './store/router/custom-serializer';
import { SharedReducer } from './store/shared/shared.reducer';
 
import { MatListModule } from '@angular/material/list';
import { EditTextMenuComponent } from './navbar/components/edit-text-menu/edit-text-menu.component';
import {InputNumberModule} from 'primeng/inputnumber';
import { NumberDialerComponent } from './number-dialer/number-dialer.component';
 
 
 
 
// import { ImageEditatbleComponent } from './box-selector4/image-editatble/image-editatble.component';
 
 
 

 
@NgModule({
  declarations: [
    AppComponent,
    AssetsAndLayoutComponent,
    ImageDropComponent,
    ImageDropComponent,
    BoxSelector4Component,
    DndDirective,
    DataFormComponent,
 
  
    SubmitButtonComponent,
    AddButtonComponent,
 
 
    ColorSliderComponent,
    SliderComponent,
    DataFormDirective,
    ImageComponent,
   
    // GiphySearchComponent,
    // DashboardPageComponent,
    // CardComponent,
    // GridComponent,

    ToolsPanelComponent,
     NavbarComponent,
   
 
     RightNavComponent,

     ColorPickerComponent,
     ColorPaletteComponent,
     ChooseFontComponent,
     EditTextMenuComponent,
     NumberDialerComponent
     
    
    
    
  ],
  imports: [
 
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    DragDropModule,
    ColorPickerModule,
    MatSliderModule,
    DragDropModule,
    MatExpansionModule,
    NgxMoveableModule,
    NgxSceneModule, 
    NgxSelectoModule,
    BoxSelector4Module,
    FileSaverModule,
    // SharedModule,
    HttpClientModule,
    // DirectivesModule,
    MatCheckboxModule,
    MatListModule,
    InputNumberModule,
   

  
    AppRoutingModule,
    CommonModule,
    // StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    
    StoreModule.forFeature("shared", SharedReducer),
    
    StoreModule.forRoot( SharedReducer),
    
    StoreDevtoolsModule.instrument({
    logOnly: environment.production,
}),
StoreRouterConnectingModule.forRoot({
  serializer: CustomSerializer,
}),



 
 
 

 
  ],  
  exports:[
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,  NO_ERRORS_SCHEMA],
  providers: [],
   
  bootstrap: [AppComponent],
  entryComponents:[AssetsAndLayoutComponent]
})
export class AppModule { }
