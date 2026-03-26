import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroComponent } from '../../components/hero/hero.component';
import { TripCardComponent } from '../../components/trip-card/trip-card.component';
import { TripService } from '../../services/trip.service';
import { Trip } from '../../models/trip.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HeroComponent, TripCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  domesticTrips: Trip[] = [];
  internationalTrips: Trip[] = [];
  
  reviews = [
    { name: 'Rahul Sharma', rating: 5, feedback: 'Amazing experience! The Kerala trip was perfectly planned and executed. Highly recommend Wright My Trip.' },
    { name: 'Sarah Miller', rating: 5, feedback: 'Dubai was a dream. The luxury transfers and VIP access made all the difference. Thank you!' },
    { name: 'Anita Desai', rating: 4, feedback: 'Great service and very professional. The Swiss Alps package was beyond my expectations.' }
  ];

  offers = [
    { title: 'Summer Offer', discount: '20% OFF', description: 'Cool down with our exclusive domestic hill station packages.', icon: '☀️' },
    { title: 'Winter Offer', discount: '15% OFF', description: 'Experience the magic of snow in Manali and Switzerland.', icon: '❄️' },
    { title: 'Custom Offer', discount: 'Best Price', description: 'Tailor-made itineraries for your unique travel needs.', icon: '🎁' }
  ];

  constructor(private tripService: TripService) {}

  ngOnInit() {
    this.tripService.getTripsByType('domestic').subscribe(trips => {
      this.domesticTrips = trips.slice(0, 3); // Show first 3
    });
    this.tripService.getTripsByType('international').subscribe(trips => {
      this.internationalTrips = trips.slice(0, 3); // Show first 3
    });
  }
}
