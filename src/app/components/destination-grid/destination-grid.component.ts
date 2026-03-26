import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from '../../models/trip.model';
import { TripCardComponent } from '../trip-card/trip-card.component';

@Component({
  selector: 'app-destination-grid',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './destination-grid.component.html',
  styleUrls: ['./destination-grid.component.css']
})
export class DestinationGridComponent {
  @Input() trips: Trip[] = [];
  @Output() clearFilters = new EventEmitter<void>();

  onClearFilters() {
    this.clearFilters.emit();
  }
}
