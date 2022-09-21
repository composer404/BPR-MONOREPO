import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {ContentWrapperComponent} from './content-wrapper.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [ContentWrapperComponent],
  exports: [ContentWrapperComponent],
})
export class ContentWrapperModule {}
