import { Component, inject, input, OnInit, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CatsService } from '../../services/cats.service';
import { Cat } from '../../models/cat.interfaces';
import { SnackBarService } from '../../services/snack-bar.service';

const MATERIAL_MODULES = [MatTableModule, MatSortModule, MatPaginatorModule, MatButtonModule, MatIconModule];
interface Identifiable {
  id: string;
}
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MATERIAL_MODULES,],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent<T extends Identifiable> implements OnInit {
  displayedColumns = input.required<string[]>();
  data = input.required<T[]>();
  sortableColumns = input<string[]>([]);
  dataSource = new MatTableDataSource<T>();

  private readonly sort = viewChild.required<MatSort>(MatSort);
  private readonly paginator = viewChild.required<MatPaginator>(MatPaginator);
  private readonly catsService = inject(CatsService);
  private readonly snackBarService = inject(SnackBarService);

  ngOnInit(): void {
    this.dataSource.data = this.data()
    this.dataSource.sort = this.sort()
    this.dataSource.paginator = this.paginator()
  }

  increaseVote(cat: Cat): void {
    this.catsService.updateCatRank(cat.id, 'increment');
    const updatedCats = this.dataSource.data.map(item => 
      item.id === cat.id ? { ...item, vote: cat.vote + 1 } : item
    );
    this.dataSource.data = updatedCats;
    this.snackBarService.showSnackBar('Vote increased', `${cat.vote} -> ${cat.vote + 1}`);
  }
  
  decreaseVote(cat: Cat): void {
    if (cat.vote > 0) {
      this.catsService.updateCatRank(cat.id, 'decrement');
      const updatedCats = this.dataSource.data.map(item => 
        item.id === cat.id ? { ...item, vote: cat.vote - 1 } : item
      );
      this.dataSource.data = updatedCats;
      this.snackBarService.showSnackBar('Vote decreased', `${cat.vote} -> ${cat.vote - 1}`);
    }
  }
  
  resetVote(cat: Cat): void {
    this.catsService.updateCatRank(cat.id, 'reset');
    const oldCatVote = cat.vote
    const updatedCats = this.dataSource.data.map(item => 
      item.id === cat.id ? { ...item, vote: cat.vote = 0 } : item
    );
    this.dataSource.data = updatedCats;
    this.snackBarService.showSnackBar('Vote reset', `${oldCatVote} -> 0`);
  }

}
