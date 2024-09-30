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
    const rankcats = localStorage.getItem(this.localStorageKey);
    if (rankcats) {
      return new Observable((observer) => {
        observer.next(JSON.parse(rankcats));
        observer.complete();
      });
    } else {
      return this.httpClient.get<{images: Cats}>(environment.apiUrl).pipe(
        map(response => response.images),
        tap((cats) => {
          localStorage.setItem(this.localStorageKey, JSON.stringify(cats));
        }),
        catchError((error) => {
          console.error('Error retrieving chats :', error);
          throw error;
        })
      );
    }
  }
}
