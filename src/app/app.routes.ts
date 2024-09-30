import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'rank',
    pathMatch: 'full',
  },
  {
    path: 'rank',
    loadChildren: () =>
      import('./pages/rank-cat/rank-cat.component').then(
        (m) => m.RankCatComponent
      ),
  },
  {
    path: 'cats',
    loadComponent: () =>
      import('./pages/list-cats/list-cats.component').then(
        (m) => m.ListCatsComponent
      ),
  },
  {
    path: 'match',
    loadComponent: () =>
      import('./pages/match-cats/match-cats.component').then(
        (m) => m.MatchCatsComponent
      ),
  },
  { path: '**', component: NotFoundPageComponent },
];
