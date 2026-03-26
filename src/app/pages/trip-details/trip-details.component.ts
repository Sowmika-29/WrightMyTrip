import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TripService } from '../../services/trip.service';
import { Trip, TripDuration } from '../../models/trip.model';

@Component({
  selector: 'app-trip-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {
  trip?: Trip;
  selectedDuration?: TripDuration;
  adults: number = 2;
  children: number = 0;
  
  constructor(
    private route: ActivatedRoute,
    private tripService: TripService
  ) {}

  get totalPrice(): number {
    if (!this.selectedDuration) return 0;
    return (this.selectedDuration.price * this.adults) + (this.selectedDuration.price * 0.5 * this.children);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.tripService.getTripById(id).subscribe(trip => {
          this.trip = trip;
          if (trip && trip.durations.length > 0) {
            this.selectedDuration = trip.durations[0];
          }
        });
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  selectDuration(duration: TripDuration) {
    this.selectedDuration = duration;
  }

  updateTravelers(type: 'adult' | 'child', change: number) {
    if (type === 'adult') {
      this.adults = Math.max(1, this.adults + change);
    } else {
      this.children = Math.max(0, this.children + change);
    }
  }
}
