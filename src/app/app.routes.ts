import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { MatchCatsComponent } from './pages/match-cats/match-cats.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'rank',
    pathMatch: 'full',
  },
  {
    path: 'rank',
    loadComponent: () =>
      import('./pages/rank-cats/rank-cats.component').then(
        (m) => m.RankCatsComponent
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
  { path: 'crisis', component: MatchCatsComponent },
  { path: '**', component: NotFoundPageComponent },
];
