import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { LoginModule } from './pages/login/login.module';
import { NgModule } from '@angular/core';
import { SignupModule } from './pages/signup/signup.module';

const routes: Routes = [
  {
    path: `login`,
    loadChildren: () => {
      return LoginModule;
    }
  },
  {
    path: 'signup',
    loadChildren: () => {
        return SignupModule;
    },
}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
