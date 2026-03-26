import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  text: string;
  isUser: boolean;
  time: Date;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  isOpen = false;
  userInput = '';
  messages: Message[] = [
    { text: 'Hello! How can I help you plan your dream trip today?', isUser: false, time: new Date() }
  ];

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    // User Message
    this.messages.push({
      text: this.userInput,
      isUser: true,
      time: new Date()
    });

    const userMsg = this.userInput;
    this.userInput = '';

    // Auto Reply
    setTimeout(() => {
      this.messages.push({
        text: 'Thanks for your query! Our travel experts will assist you shortly.',
        isUser: false,
        time: new Date()
      });
    }, 1000);
  }
}
