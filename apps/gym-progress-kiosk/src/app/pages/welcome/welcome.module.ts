import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WelcomeComponent } from './welcome.component';

const routes: Routes = [
    {
        path: ``,
        component: WelcomeComponent,
    },
];

@NgModule({
    declarations: [WelcomeComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
})
export class WelcomeModule {}
