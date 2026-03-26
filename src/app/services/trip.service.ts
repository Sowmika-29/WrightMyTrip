import { Injectable } from '@angular/core';
import { Trip } from '../models/trip.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private trips: Trip[] = [
    {
      id: 'kerala',
      name: 'Kerala',
      type: 'domestic',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=1200',
      tagline: 'God’s Own Country',
      description: 'Explore backwaters, greenery and beaches. Experience the tranquility of the Alleppey backwaters and the lush green hills of Munnar.',
      durations: [
        { type: '1 Day Trip', price: 3000 },
        { type: '2 Days / 1 Night', price: 5000 },
        { type: '3 Days / 2 Nights', price: 8000 },
        { type: '4 Days / 3 Nights', price: 12000 }
      ],
      services: {
        hotel: '3-star hotel stay',
        food: ['Breakfast included', 'Lunch optional', 'Dinner included'],
        transport: 'Pickup & drop + Local sightseeing cab',
        guide: 'Tour guide included'
      },
      itinerary: [
        { day: 'Day 1', details: 'Arrival, check-in, local sightseeing at Kochi Marine Drive and Fort Kochi.' },
        { day: 'Day 2', details: 'Full-day backwater tour in Alleppey houseboat with traditional food.' },
        { day: 'Day 3', details: 'Munnar tea garden visit and Eravikulam National Park tour.' },
        { day: 'Day 4', details: 'Checkout from hotel and drop at airport/railway station.' }
      ],
      categories: ['Domestic', 'Family Trips', 'Honeymoon'],
      durationDays: 4
    },
    {
      id: 'ooty',
      name: 'Ooty',
      type: 'domestic',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200',
      tagline: 'Queen of Hill Stations',
      description: 'The beautiful hills of Nilgiris with tea gardens and lakes.',
      durations: [
        { type: '2 Days / 1 Night', price: 4000 },
        { type: '3 Days / 2 Nights', price: 6500 }
      ],
      services: {
        hotel: '4-star resort stay',
        food: ['Breakfast', 'Dinner'],
        transport: 'Private cab for sightseeing',
        guide: 'Not included'
      },
      itinerary: [
        { day: 'Day 1', details: 'Arrival, Botanical Garden and Ooty Lake.' },
        { day: 'Day 2', details: 'Doddabetta Peak and Tea Factory visit.' }
      ],
      categories: ['Domestic', 'Honeymoon', 'Friends Trips'],
      durationDays: 3
    },
    {
      id: 'dubai',
      name: 'Dubai',
      type: 'international',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1200',
      tagline: 'The City of Gold',
      description: 'Luxury shopping, ultramodern architecture and a lively nightlife scene.',
      durations: [
        { type: '3 Days / 2 Nights', price: 35000 },
        { type: '5 Days / 4 Nights', price: 55000 }
      ],
      services: {
        hotel: '5-star hotel stay',
        food: ['Breakfast included', 'Desert Safari Dinner'],
        transport: 'VIP Airport Transfers + Private City Tour',
        guide: 'Available on request'
      },
      itinerary: [
        { day: 'Day 1', details: 'Arrival, Burj Khalifa at the Top and Dubai Mall.' },
        { day: 'Day 2', details: 'Desert Safari with BBQ Dinner and Belly Dance.' },
        { day: 'Day 3', details: 'Palm Jumeirah and Atlantis visit.' }
      ],
      categories: ['International', 'Family Trips', 'Corporate'],
      durationDays: 5
    },
    {
      id: 'switzerland',
      name: 'Switzerland',
      type: 'international',
      image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=1200',
      tagline: 'Paradise on Earth',
      description: 'Pristine lakes, majestic mountains, and charming villages.',
      durations: [
        { type: '4 Days / 3 Nights', price: 85000 },
        { type: '7 Days / 6 Nights', price: 145000 }
      ],
      services: {
        hotel: 'Premium Chalet Stay',
        food: ['Full Board'],
        transport: 'Swiss Travel Pass included',
        guide: 'Expert Alpine Guide'
      },
      itinerary: [
        { day: 'Day 1', details: 'Arrival in Zurich, transfer to Lucerne.' },
        { day: 'Day 2', details: 'Mount Titlis excursion with Ice Flyer.' },
        { day: 'Day 3', details: 'Interlaken and Lake Brienz cruise.' }
      ],
      categories: ['International', 'Honeymoon', 'Senior Citizen'],
      durationDays: 7
    },
    {
      id: 'goa',
      name: 'Goa',
      type: 'domestic',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=1200',
      tagline: 'Sun, Sand, and Sea',
      description: 'Relax on pristine beaches and explore lively nightlife.',
      durations: [{ type: '3 Days / 2 Nights', price: 7000 }],
      services: { hotel: '3-star resort', food: ['Breakfast'], transport: 'Bike/Car Rental', guide: 'Optional' },
      itinerary: [{ day: 'Day 1', details: 'Check-in and North Goa beach tour.' }],
      categories: ['Domestic', 'Friends Trips', 'Group Trip'],
      durationDays: 3
    },
    {
      id: 'manali',
      name: 'Manali',
      type: 'domestic',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=1200',
      tagline: 'Lover\'s Paradise',
      description: 'Snow-capped mountains and river rafting adventures.',
      durations: [{ type: '4 Days / 3 Nights', price: 9000 }],
      services: { hotel: 'Luxury Stay', food: ['All meals'], transport: 'Private Cab', guide: 'Included' },
      itinerary: [{ day: 'Day 1', details: 'Arrival and mall road visit.' }],
      categories: ['Domestic', 'Honeymoon', 'Friends Trips'],
      durationDays: 4
    },
    {
      id: 'singapore',
      name: 'Singapore',
      type: 'international',
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=1200',
      tagline: 'The Lion City',
      description: 'Futuristic gardens and diverse cultural districts.',
      durations: [{ type: '4 Days / 3 Nights', price: 45000 }],
      services: { hotel: '4-star City Hotel', food: ['Breakfast'], transport: 'Private transfers', guide: 'English speaking' },
      itinerary: [{ day: 'Day 1', details: 'Arrival and Night Safari.' }],
      categories: ['International', 'Family Trips', 'Group Trip'],
      durationDays: 4
    },
    {
      id: 'bali',
      name: 'Bali',
      type: 'international',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1200',
      tagline: 'Island of Gods',
      description: 'Spiritual temples and stunning tropical landscapes.',
      durations: [{ type: '5 Days / 4 Nights', price: 50000 }],
      services: { hotel: 'Private Villa', food: ['Breakfast', 'Special Dinner'], transport: 'Private driver', guide: 'Local guide' },
      itinerary: [{ day: 'Day 1', details: 'Arrival and relaxation.' }],
      categories: ['International', 'Honeymoon', 'Family Trips'],
      durationDays: 5
    },
    {
      id: 'rajasthan',
      name: 'Rajasthan',
      type: 'domestic',
      image: 'https://images.unsplash.com/photo-1606298246186-08868ab77562?auto=format&fit=crop&q=80&w=1200',
      tagline: 'The Land of Kings',
      description: 'Majestic forts, royal palaces, and vibrant desert culture.',
      durations: [{ type: '5 Days / 4 Nights', price: 15000 }],
      services: { hotel: 'Palace Heritage Hotel', food: ['Traditional Thali included'], transport: 'Private AC Cab', guide: 'Local historian' },
      itinerary: [{ day: 'Day 1', details: 'Arrival in Jaipur, Hawa Mahal and City Palace visit.' }],
      categories: ['Domestic', 'Family Trips', 'Senior Citizen'],
      durationDays: 5
    },
    {
      id: 'ladakh',
      name: 'Ladakh',
      type: 'domestic',
      image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&q=80&w=1200',
      tagline: 'The Land of High Passes',
      description: 'Stunning mountain landscapes, crystal clear lakes and ancient monasteries.',
      durations: [{ type: '6 Days / 5 Nights', price: 25000 }],
      services: { hotel: 'Eco-Resort Stay', food: ['Organic Meals'], transport: '4x4 SUV', guide: 'Ladakhi Guide' },
      itinerary: [{ day: 'Day 1', details: 'Leh arrival and acclimatization.' }],
      categories: ['Domestic', 'Friends Trips', 'Group Trip'],
      durationDays: 6
    },
    {
      id: 'maldives',
      name: 'Maldives',
      type: 'international',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1200',
      tagline: 'Tropical Luxury Escape',
      description: 'Crystal blue waters, white sand beaches, and overwater villas.',
      durations: [{ type: '4 Days / 3 Nights', price: 75000 }],
      services: { hotel: 'Overwater Villa', food: ['All-inclusive'], transport: 'Speedboat transfers', guide: 'Not needed' },
      itinerary: [{ day: 'Day 1', details: 'Arrival at Male and speedboat transfer to resort.' }],
      categories: ['International', 'Honeymoon', 'Family Trips'],
      durationDays: 4
    },
    {
      id: 'paris',
      name: 'Paris',
      type: 'international',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=1200',
      tagline: 'The City of Love',
      description: 'Iconic landmarks, world-class art, and romantic cafe culture.',
      durations: [{ type: '4 Days / 3 Nights', price: 95000 }],
      services: { hotel: 'Boutique Hotel in Le Marais', food: ['Breakfast & Dinner'], transport: 'Paris Pass included', guide: 'Audio guide for Louvre' },
      itinerary: [{ day: 'Day 1', details: 'Eiffel Tower and Seine River Cruise.' }],
      categories: ['International', 'Honeymoon', 'Corporate'],
      durationDays: 4
    }
    // More trips can be added as needed based on logic
  ];

  constructor() { }

  getTrips(): Observable<Trip[]> {
    return of(this.trips);
  }

  getTripById(id: string): Observable<Trip | undefined> {
    return of(this.trips.find(t => t.id === id));
  }

  getTripsByType(type: 'domestic' | 'international'): Observable<Trip[]> {
    return of(this.trips.filter(t => t.type === type));
  }
}
