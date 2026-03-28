import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout';

export const routes: Routes = [
  { path: '', component: MainLayoutComponent },
  { path: '**', redirectTo: '' },
];
