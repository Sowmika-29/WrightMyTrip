import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { TripService } from '../../services/trip.service';
import { Trip } from '../../models/trip.model';
import { take } from 'rxjs';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-international-section',
  standalone: true,
  imports: [CommonModule, RouterModule, TripCardComponent, ScrollRevealDirective],
  template: `
    <section appScrollReveal class="py-24 bg-black relative overflow-hidden">
      <!-- Background Glow -->
      <div class="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10"></div>

      <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16 space-y-4">
          <h2 class="text-5xl font-black tracking-tighter uppercase sm:text-6xl">
            International <span class="text-primary italic">Escapes</span>
          </h2>
          <p class="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
            Discover destinations around the world
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <app-trip-card *ngFor="let trip of internationalTrips" [trip]="trip"></app-trip-card>
        </div>

        <div class="flex justify-center mt-12">
          <button routerLink="/international" 
            class="group flex items-center space-x-3 px-8 py-4 bg-transparent border-2 border-primary text-primary font-black uppercase tracking-widest rounded-full hover:bg-primary hover:text-black transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary/10">
            <span>View All International Trips</span>
            <svg class="w-5 h-5 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  `
})
export class InternationalSectionComponent implements OnInit {
  internationalTrips: Trip[] = [];

  constructor(private tripService: TripService) {}

  ngOnInit(): void {
    this.tripService.getTripsByType('international').pipe(take(1)).subscribe(trips => {
      this.internationalTrips = trips.slice(0, 3);
    });
  }
}
