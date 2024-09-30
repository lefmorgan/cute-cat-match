import { Component, inject } from '@angular/core';
import { CatsService } from '../../services/cats.service';
import { Cat, Cats } from '../../models/cat.interfaces';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-match-cats',
  standalone: true,
  imports: [],
  templateUrl: './match-cats.component.html',
  styleUrl: './match-cats.component.scss'
})
export class MatchCatsComponent {
  private readonly catsService = inject(CatsService);
  currentMatch: Cats = []
  isBattleOver = false;
  cats$$ = toSignal(this.catsService.getAllCats(), { initialValue: [] });

  ngOnInit() {
      this.nextMatch(); 
  }

  nextMatch() {
    const cats = this.cats$$();
    if (cats.length < 2) return;
    const randomCats = this.getRandomCats(cats);
    this.currentMatch = randomCats;
  }

  getRandomCats(cats: Cats): Cats {
    const shuffled = [...cats].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  }

  voteFor(cat: Cat) {
    this.catsService.updateCatRank(cat.id, true);
    this.nextMatch();
  }

  stopBattles() {
    this.isBattleOver = true;
  }

  resumeBattles() {
    this.isBattleOver = false;
    this.nextMatch(); 
  }
}
