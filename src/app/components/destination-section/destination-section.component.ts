import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Trip } from '../../models/trip.model';
import { TripCardComponent } from '../trip-card/trip-card.component';

@Component({
  selector: 'app-destination-section',
  standalone: true,
  imports: [CommonModule, RouterModule, TripCardComponent],
  templateUrl: './destination-section.component.html',
  styleUrls: ['./destination-section.component.css']
})
export class DestinationSectionComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() trips: Trip[] = [];
  @Input() viewAllLink: string = '';
}
