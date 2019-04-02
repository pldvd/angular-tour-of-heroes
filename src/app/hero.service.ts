import { Injectable } from '@angular/core';
import { HEROES } from './mock-heroes';
import { Hero } from './hero'
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';

  constructor(private messageService: MessageService, private http: HttpClient) { }

  private log(message: string) {
    this.messageService.addMessage(`HeroService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(() => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  getHeroWithId(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`

    return this.http.get<Hero>(url)
      .pipe(
        tap(() => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHeroWidthId id=${id}`))
      )
  }

  updateHero(hero: Hero): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(() => this.log(`Hero updated with id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  addHero(name: string): Observable<Hero> {
    let newHero: Hero = {
      id: 0,
      name: ""
    };

    this.http.get<Hero[]>(this.heroesUrl)
      .subscribe(heroes => {
        const heroIds = heroes.map(hero => hero.id);
        newHero.id = Math.max(...heroIds) + 1;
        newHero.name = name;
      })

    return of(newHero)
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );

  }
}
