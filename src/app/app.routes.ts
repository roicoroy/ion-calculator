import { Route } from '@angular/router';
import { TutorialGuard } from './services/guards/tutorial.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.routes').then((m) => m.routes),
    canActivate: [TutorialGuard]
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
    canActivate: [TutorialGuard]
  },
  {
    path: 'result',
    loadComponent: () => import('./pages/result/result.page').then((m) => m.ResultPage),
  },
  {
    path: 'tutorial',
    loadComponent: () => import('./pages/tutorial/tutorial.page').then(m => m.TutorialPage)
  },
  {
    path: 'saved-entries',
    loadComponent: () => import('./pages/saved-entries/saved-entries.page').then(m => m.SavedEntriesPage)
  },
  {
    path: 'calculator',
    loadComponent: () => import('./pages/calculator/calculator.page').then(m => m.CalculatorPage)
  },
];
