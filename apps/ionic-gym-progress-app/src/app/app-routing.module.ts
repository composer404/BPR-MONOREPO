import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { LoginModule } from './pages/login/login.module';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: `login`,
    loadChildren: () => {
      return LoginModule;
    }
  },
  {
    path: `signup`,
    loadChildren: () => {

    }
  },
  {
    path: `main`,
    loadChildren: () => {

    }
  },
  {
    path: `edit-account`,
    loadChildren: () => {

    }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
