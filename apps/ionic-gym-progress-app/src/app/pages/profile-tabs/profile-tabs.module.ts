import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { ProfileTabsPage } from './profile-tabs.page';

const routes: Routes = [
    {
        path: '',
        component: ProfileTabsPage,
        children: [
            {
                path: 'profile/:id',
                loadChildren: () => import('../profile/profile.module').then((m) => m.ProfilePageModule),
            },
            {
                path: 'profile/edit/:id',
                loadChildren: () => import('../edit-account/edit-account.module').then((m) => m.EditPageModule),
            },
        ],
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), IonicModule],
    declarations: [ProfileTabsPage],
})
export class ProfileTabsPageModule {
    constructor() {}
}
