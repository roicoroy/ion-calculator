import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateComponent } from './translate/translate.component';
import { ImagePickerComponent } from './image-picker/image-picker.component';
import { WaitersListComponent } from './waiters-list/waiters-list.component';
import { EntriesListComponent } from './entries-list/entries-list.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ScrollingModule,
    TranslateModule
  ],
  declarations: [
    TranslateComponent,
    ImagePickerComponent,
    WaitersListComponent,
    EntriesListComponent,
  ],
  exports: [
    TranslateComponent,
    ImagePickerComponent,
    WaitersListComponent,
    EntriesListComponent,
  ]
})
export class ComponentsModule { }
