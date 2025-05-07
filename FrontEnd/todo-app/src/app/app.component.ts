import { Component, OnInit } from '@angular/core';
import { SocketService } from './core/services/socket.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TaskListComponent } from './features/todo/components/task-list/task-list.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatToolbarModule, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    // קבלת הודעה בשם 'message' מהשרת
    this.socketService.on<string>('message', msg => {
      console.log('הודעה מהשרת:', msg);
    });

    // שליחת אירוע 'join' לשרת
    this.socketService.emit('join', { room: 'todo-room' });
  }
}