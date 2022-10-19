import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
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
    imports: [CommonModule, RouterModule.forChild(routes), IonicModule],
    declarations: [IntroductionPage],
})
export class IntroductionPageModule {}
