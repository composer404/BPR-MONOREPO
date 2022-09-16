import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { WelcomeComponent } from './welcome.component';

const routes: Routes = [
    {
        path: ``,
        component: WelcomeComponent,
    },
];

@NgModule({
    declarations: [WelcomeComponent],
    imports: [CommonModule, RouterModule.forChild(routes), QRCodeModule],
})
export class WelcomeModule {}
