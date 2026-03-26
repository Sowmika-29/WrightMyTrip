import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { Trip } from '../../models/trip.model';
import { DestinationGridComponent } from '../../components/destination-grid/destination-grid.component';

@Component({
  selector: 'app-international',
  standalone: true,
  imports: [CommonModule, RouterModule, DestinationGridComponent],
  templateUrl: './international.component.html',
  styleUrls: ['./international.component.css']
})
export class InternationalComponent implements OnInit {
  trips: Trip[] = [];

  constructor(private tripService: TripService) {}

  ngOnInit() {
    this.tripService.getTrips().subscribe(allTrips => {
      this.trips = allTrips.filter(t => t.type === 'international');
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
