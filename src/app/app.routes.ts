import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'file-opener',
    loadChildren: () =>
      import('./file-opener/file-opener.module').then(
        m => m.FileOpenerPageModule,
      ),
  },
  {
    path: '',
    redirectTo: 'file-opener',
    pathMatch: 'full',
  },
];
