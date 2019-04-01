import { Injectable } from '@angular/core';
import { HEROES } from './mock-heroes';
import { Hero } from './hero'
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
//import { HeroesComponent } from './heroes/heroes.component';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    return of(HEROES);
  }

  getHeroWithId(id: string): Observable<any> {
    const idNumber = Number(id);

    if (!Number.isNaN(idNumber)) {
      return of(HEROES.find(hero => hero.id === idNumber));
    } else {
      return of(new Error('ID must be a Number'));;
    }
  }
}
