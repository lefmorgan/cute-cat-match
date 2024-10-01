import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';
import { Cats } from '../models/cat.interfaces';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CatsService {
  private readonly httpClient = inject(HttpClient);
  private readonly localStorageKey = 'rankcats';

  getAllCats(): Observable<Cats> {
    const savedCats = localStorage.getItem(this.localStorageKey);
    if (savedCats) {
      return new Observable((observer) => {
        observer.next(JSON.parse(savedCats));
        observer.complete();
      });
    } else {
      return this.httpClient.get<{images: Cats}>(environment.apiUrl).pipe(
        map(response => response.images.map(image => ({
            id: image.id,
            url: image.url,
            vote: 0,
        }))),
        tap(cats => this.saveCatsToLocalStorage(cats)),
        catchError((error) => {
          console.error('Error retrieving chats :', error);
          throw error;
        })
      );
    }
  }

  saveCatsToLocalStorage(cats: Cats) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(cats));
  }

  updateCatRank(catId: string, action: 'increment' | 'decrement' | 'reset') {
    const savedCats = localStorage.getItem(this.localStorageKey);
    if (savedCats) {
      const cats: Cats = JSON.parse(savedCats);
      const actions = {
        increment: (vote: number) => vote + 1,
        decrement: (vote: number) => Math.max(0, vote - 1),
        reset: () => 0,
      };
      const updatedCats = cats.map(cat => {
        if (cat.id === catId) {
          return {
            ...cat,
            vote: actions[action](cat.vote)
          };
        }
        return cat;
      });
      this.saveCatsToLocalStorage(updatedCats);
    }
  }

  resetAllVotes(): void {
    const savedCats = localStorage.getItem(this.localStorageKey);
    if (savedCats) {
      const cats: Cats = JSON.parse(savedCats);
      const updatedCats = cats.map(cat => ({
        ...cat,
        vote: 0
      }));
      this.saveCatsToLocalStorage(updatedCats);
    }
  }
}
