import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeroComponent } from '../../components/hero/hero.component';
import { DomesticSectionComponent } from '../../components/domestic-section/domestic-section.component';
import { InternationalSectionComponent } from '../../components/international-section/international-section.component';
import { ChatbotComponent } from '../../components/chatbot/chatbot.component';
import { WhatsappButtonComponent } from '../../components/whatsapp-button/whatsapp-button.component';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule, 
    HeroComponent, 
    DomesticSectionComponent,
    InternationalSectionComponent,
    ChatbotComponent,
    WhatsappButtonComponent,
    ScrollRevealDirective
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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

  constructor() {}

  ngOnInit() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

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
