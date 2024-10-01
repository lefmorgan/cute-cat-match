import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CatsService } from '../../services/cats.service';
import { Cats } from '../../models/cat.interfaces';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { TableComponent } from '../../components/table/table.component';

@Component({
  selector: 'app-list-cats',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './list-cats.component.html',
  styleUrl: './list-cats.component.scss'
})
export class ListCatsComponent implements OnInit{
  private readonly catsService = inject(CatsService)
  private readonly destroyRef = inject(DestroyRef)
  
  cats = signal<Cats>([])
  displayedColumns: string [] = ['id', 'url','vote', 'action'];
  sortables: string [] = ['id', 'url','vote',];

  ngOnInit(): void {
    this.getAllCats();
  }

  getAllCats() {
    this.catsService.getAllCats()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((cats:Cats) => this.cats.set(cats))
      )
    .subscribe()
  }
}
