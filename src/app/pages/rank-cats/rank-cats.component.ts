import { Component, computed, inject, OnInit } from '@angular/core';
import { CatsService } from '../../services/cats.service';
import { Cats } from '../../models/cat.interfaces';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-rank-cat',
  standalone: true,
  imports: [],
  templateUrl: './rank-cats.component.html',
  styleUrl: './rank-cats.component.scss'
})
export class RankCatsComponent {
  private readonly catsService = inject(CatsService);
  cats$ = this.catsService.getAllCats()
  cats$$ = toSignal(this.cats$, { initialValue: [] })

  rankedCatsSignal = computed(() => {
    const cats = this.cats$$();
    return cats.slice().sort((a, b) => b.vote - a.vote);
  });

}
