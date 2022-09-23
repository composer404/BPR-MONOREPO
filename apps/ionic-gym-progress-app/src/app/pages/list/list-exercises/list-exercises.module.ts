import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListExercisesPage } from './list-exercises.page';
import {RouterModule, Routes} from '@angular/router';
import {ContentWrapperModule} from "../../../components/content-wrapper/content-wrapper.module";

const routes: Routes = [
  {
    path: '',
    component: ListExercisesPage,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), IonicModule, FormsModule, ReactiveFormsModule, ContentWrapperModule],
  declarations: [ListExercisesPage]
})
export class ListExercisesPageModule {}
