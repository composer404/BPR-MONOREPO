import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { IntroButtonModule } from 'src/app/components/intro-button/intro-button.module';
import { IntroductionPage } from './introduction.page';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component: IntroductionPage,
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), IonicModule, IntroButtonModule],
    declarations: [IntroductionPage],
})
export class IntroductionPageModule {}
