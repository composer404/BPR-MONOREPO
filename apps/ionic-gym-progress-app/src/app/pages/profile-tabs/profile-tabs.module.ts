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
                loadChildren: () =>
                    import('../start-training/start-training.module').then((m) => m.StartTrainingPageModule),
            },
            {
                path: 'profile/:id/edit',
                loadChildren: () => import('../edit-account/edit-account.module').then((m) => m.EditPageModule),
            },
            {
                path: 'profile/:id/training-list',
                loadChildren: () =>
                    import('../training-list/training-list.module').then((m) => m.TrainingListPageModule),
            },
            {
                path: 'profile/:id/training-list/:trainingId/gym/:gymId',
                loadChildren: () =>
                    import('../training-details/training-details.module').then((m) => m.TrainingDetailsPageModule),
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
