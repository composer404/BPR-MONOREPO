import { CommonModule } from '@angular/common';
import { IntroButtonComponent } from './intro-button.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [CommonModule, IonicModule],
    declarations: [IntroButtonComponent],
    exports: [IntroButtonComponent],
})
export class IntroButtonModule {}
