import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { Trip, TripDuration } from '../../models/trip.model';

@Component({
  selector: 'app-trip-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {
  trip?: Trip;
  selectedDuration?: TripDuration;
  
  constructor(
    private route: ActivatedRoute,
    private tripService: TripService
  ) {}

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

    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  selectDuration(duration: TripDuration) {
    this.selectedDuration = duration;
  }
}
