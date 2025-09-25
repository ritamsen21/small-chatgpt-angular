import { Component } from '@angular/core';
import { ChatService } from '../services/chat.service';

interface Message { text: string; from: 'user'|'bot' }

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messages: Message[] = [];
  input = '';
  loading = false;

  constructor(private chat: ChatService) {}

  send() {
    const text = this.input.trim();
    if (!text) return;
    this.messages.push({ text, from: 'user' });
    this.input = '';
    this.loading = true;

    this.chat.sendMessage(text).subscribe({
      next: (res) => {
        this.messages.push({ text: res.reply, from: 'bot' });
        this.loading = false;
      },
      error: (err) => {
        this.messages.push({ text: 'Error: could not reach API', from: 'bot' });
        this.loading = false;
        console.error(err);
      }
    });
  }
}
