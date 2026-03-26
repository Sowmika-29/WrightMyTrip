import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripService } from '../../services/trip.service';
import { Trip } from '../../models/trip.model';
import { TripCardComponent } from '../../components/trip-card/trip-card.component';
import { FilterBarComponent } from '../../components/filter-bar/filter-bar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-explore-destinations',
  standalone: true,
  imports: [CommonModule, TripCardComponent, FilterBarComponent, NavbarComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>
    
    <main class="pt-32 pb-24 bg-black min-h-screen">
      <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-16 space-y-4">
          <h1 class="text-5xl md:text-7xl font-black uppercase tracking-tighter">
            Explore <span class="text-primary italic">All Destinations</span>
          </h1>
          <p class="text-gray-400 text-xl max-w-2xl mx-auto font-medium">
            Discover your next adventure from our complete collection of handpicked tours.
          </p>
        </div>

        <!-- Filter Bar -->
        <div class="mb-16">
          <app-filter-bar (filtersChanged)="onFiltersChanged($event)"></app-filter-bar>
        </div>

        <!-- Progress/Results Label -->
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-xl font-bold">Showing <span class="text-primary">{{ filteredTrips.length }}</span> results</h2>
        </div>

        <!-- Results Grid -->
        <div *ngIf="filteredTrips.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <app-trip-card *ngFor="let trip of filteredTrips" [trip]="trip"></app-trip-card>
        </div>

        <!-- Empty State -->
        <div *ngIf="filteredTrips.length === 0" class="py-24 text-center space-y-6 bg-[#111111] rounded-3xl border border-white/5">
          <div class="text-6xl">🔍</div>
          <h3 class="text-2xl font-bold">No destinations found</h3>
          <p class="text-gray-400 max-w-md mx-auto">Try adjusting your filters or searching for something else.</p>
          <button (click)="resetFilters()" class="text-primary font-bold hover:underline">Clear all filters</button>
        </div>
      </div>
    </main>

    <app-footer></app-footer>
  `
})
export class ExploreDestinationsComponent implements OnInit {
  allTrips: Trip[] = [];
  filteredTrips: Trip[] = [];

  constructor(private tripService: TripService) {}

  ngOnInit(): void {
    this.tripService.getTrips().subscribe(trips => {
      this.allTrips = trips;
      this.filteredTrips = trips;
    });
  }

  onFiltersChanged(filters: any) {
    this.filteredTrips = this.allTrips.filter(trip => {
      const matchesSearch = !filters.search || 
        trip.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        trip.tagline.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesCategory = filters.category === 'All' || 
        trip.categories.includes(filters.category as any);
      
      const startingPrice = Math.min(...trip.durations.map(d => d.price));
      const matchesPrice = startingPrice <= filters.maxPrice;

      // Simple duration check (can be refined if model has accurate days)
      const matchesDuration = filters.durationRange === 'all' || 
        (filters.durationRange === 'short' && trip.durationDays <= 3) ||
        (filters.durationRange === 'medium' && trip.durationDays > 3 && trip.durationDays <= 6) ||
        (filters.durationRange === 'long' && trip.durationDays > 6);

      return matchesSearch && matchesCategory && matchesPrice && matchesDuration;
    });
  }

  resetFilters() {
    window.location.reload(); // Simple way to reset state
  }
}
