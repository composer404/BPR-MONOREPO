import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntroductionPageRoutingModule } from './introduction-routing.module';

import { IntroductionPage } from './introduction.page';
import {IntroButtonComponent} from './components/intro-button/intro-button.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntroductionPageRoutingModule
  ],
    declarations: [IntroductionPage, IntroButtonComponent]
})
export class IntroductionPageModule {}
