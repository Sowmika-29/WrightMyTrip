import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroComponent } from '../../components/hero/hero.component';
import { TripCardComponent } from '../../components/trip-card/trip-card.component';
import { FilterBarComponent, TripFilters } from '../../components/filter-bar/filter-bar.component';
import { DestinationSectionComponent } from '../../components/destination-section/destination-section.component';
import { DestinationGridComponent } from '../../components/destination-grid/destination-grid.component';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';
import { ChatbotComponent } from '../../components/chatbot/chatbot.component';
import { WhatsappButtonComponent } from '../../components/whatsapp-button/whatsapp-button.component';
import { TripService } from '../../services/trip.service';
import { Trip } from '../../models/trip.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule, 
    HeroComponent, 
    TripCardComponent, 
    FilterBarComponent,
    DestinationSectionComponent,
    DestinationGridComponent,
    CategoryCardComponent,
    ChatbotComponent,
    WhatsappButtonComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allTrips: Trip[] = [];
  filteredTrips: Trip[] = [];
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
    this.tripService.getTrips().subscribe(trips => {
      this.allTrips = trips;
      this.filteredTrips = trips;
      
      // Top 6 for segments
      this.domesticTrips = trips.filter(t => t.type === 'domestic').slice(0, 6);
      this.internationalTrips = trips.filter(t => t.type === 'international').slice(0, 6);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onFiltersChanged(filters: TripFilters) {
    this.filteredTrips = this.allTrips.filter(trip => {
      // Search filter
      const matchesSearch = !filters.search || 
        trip.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        trip.description.toLowerCase().includes(filters.search.toLowerCase());

      // Category filter (All means no filter)
      const matchesCategory = filters.category === 'All' || 
        trip.categories.includes(filters.category);

      // Price filter
      const minTripPrice = Math.min(...trip.durations.map(d => d.price));
      const matchesPrice = minTripPrice <= filters.maxPrice;

      // Duration filter
      let matchesDuration = true;
      if (filters.durationRange === '1-3') matchesDuration = trip.durationDays >= 1 && trip.durationDays <= 3;
      else if (filters.durationRange === '4-7') matchesDuration = trip.durationDays >= 4 && trip.durationDays <= 7;
      else if (filters.durationRange === '8+') matchesDuration = trip.durationDays >= 8;

      return matchesSearch && matchesCategory && matchesPrice && matchesDuration;
    });
  }
   formData = {
    name: '',
    email: '',
    service: 'Domestic Trip',
    message: ''
  };

  reviewData = {
    name: '',
    rating: 5,
    feedback: ''
  };

  onSubmit() {
    console.log('Form Submitted:', this.formData);
    alert('Thank you for contacting Wright My Trip! We will get back to you soon.');
    this.formData = { name: '', email: '', service: 'Domestic Trip', message: '' };
  }

  addReview() {
    if (this.reviewData.name && this.reviewData.feedback) {
      this.reviews.unshift({ ...this.reviewData });
      alert('Thank you for your review!');
      this.reviewData = { name: '', rating: 5, feedback: '' };
    }
  }
}
