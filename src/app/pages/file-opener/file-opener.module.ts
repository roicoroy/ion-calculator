import { NgModule } from '@angular/core';

import { FileOpenerPageRoutingModule } from './file-opener-routing.module';

import { FileOpenerPage } from './file-opener.page';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
// import { SharedModule } from '../shared';

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, IonicModule,
    FileOpenerPageRoutingModule
  ],
  declarations: [FileOpenerPage],
})
export class FileOpenerPageModule { }
