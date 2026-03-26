import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCardComponent } from '../../components/trip-card/trip-card.component';
import { TripService } from '../../services/trip.service';
import { Trip } from '../../models/trip.model';

@Component({
  selector: 'app-domestic',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './domestic.component.html',
  styleUrls: ['./domestic.component.css']
})
export class DomesticComponent implements OnInit {
  trips: Trip[] = [];

  constructor(private tripService: TripService) {}

  ngOnInit() {
    this.tripService.getTripsByType('domestic').subscribe(trips => {
      this.trips = trips;
    });
  }
}
