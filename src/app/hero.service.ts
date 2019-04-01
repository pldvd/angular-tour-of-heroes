import { Injectable } from '@angular/core';
import { HEROES } from './mock-heroes';
import { Hero } from './hero'
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HeroesComponent } from './heroes/heroes.component';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    //this.messageService.addMessage('Your Heroes were fetched, my lord');
    return of(HEROES);
  }

  getHeroWithId(id: string): Observable<Hero> {
    const idNumber = Number(id);

    try {
      if (idNumber !== NaN) {
        return of(HEROES.find(hero => hero.id === idNumber)
        );
      } else {
        throw new Error('Id cannot be NaN');
      }
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }
}
