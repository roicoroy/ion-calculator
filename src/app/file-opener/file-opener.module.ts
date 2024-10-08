import { NgModule } from '@angular/core';

import { FileOpenerPageRoutingModule } from './file-opener-routing.module';

import { FileOpenerPage } from './file-opener.page';
import { SharedModule } from '../shared';

@NgModule({
  imports: [
    SharedModule,
    FileOpenerPageRoutingModule
  ],
  declarations: [FileOpenerPage],
})
export class FileOpenerPageModule { }
