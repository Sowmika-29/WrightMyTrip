import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { Trip } from '../../models/trip.model';
import { DestinationGridComponent } from '../../components/destination-grid/destination-grid.component';

@Component({
  selector: 'app-domestic',
  standalone: true,
  imports: [CommonModule, RouterModule, DestinationGridComponent],
  templateUrl: './domestic.component.html',
  styleUrls: ['./domestic.component.css']
})
export class DomesticComponent implements OnInit {
  trips: Trip[] = [];

  constructor(private tripService: TripService) {}

  ngOnInit() {
    this.tripService.getTrips().subscribe(allTrips => {
      this.trips = allTrips.filter(t => t.type === 'domestic');
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
