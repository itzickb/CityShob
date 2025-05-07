import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket;

  constructor() {
    // החלף את ה־URL לכתובת ה-server שלך
    this.socket = io('http://localhost:3000');
  }

  // מאזין לאירוע מהשרת
  on<T = any>(eventName: string, callback: (data: T) => void): void {
    this.socket.on(eventName, callback);
  }

  // שולח אירוע לשרת
  emit<T = any>(eventName: string, data?: T): void {
    this.socket.emit(eventName, data);
  }

  // לביצוע clean-up, אם צריך
  disconnect(): void {
    this.socket.disconnect();
  }
}
