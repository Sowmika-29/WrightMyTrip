import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    service: 'Domestic Trip',
    message: ''
  };

  onSubmit() {
    console.log('Form Submitted:', this.formData);
    alert('Thank you for contacting Wright My Trip! We will get back to you soon.');
    this.formData = { name: '', email: '', service: 'Domestic Trip', message: '' };
  }
}
