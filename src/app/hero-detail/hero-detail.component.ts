import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})

export class HeroDetailComponent implements OnInit {
  //@Input() hero: Hero;
  hero: Hero;
  error: string;

  constructor(private heroService: HeroService, private route: ActivatedRoute, private location: Location, private messageService: MessageService) { }

  ngOnInit() {
    this.getHero();
  }

  getHero(): void {
    const id = this.route.snapshot.paramMap.get('id');

    //this.messageService.addMessage(`HeroService: fetched hero id=${id}`);

    this.heroService.getHeroWithId(id).subscribe(data => {
      if (data instanceof Error) {
        this.error = `Error: ${data.message}`;
        return;
      }
      this.hero = data;
    })
  }

}
