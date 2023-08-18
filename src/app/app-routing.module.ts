import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './components/book/book.component';
import { authGuard } from './authentication/auth.guard';

const routes: Routes = [
  { path: '' , component: BookComponent },
  { path: '', loadChildren: () => import('./module/lazyload/lazyload.module').then(m => m.LazyloadModule)},
  { path: '', loadChildren: () => import('./module/feature/feature.module').then(m => m.FeatureModule), canActivate:[authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
