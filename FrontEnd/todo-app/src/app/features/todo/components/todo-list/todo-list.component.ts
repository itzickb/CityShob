import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../../services/api.service';
import { RealtimeService } from '../../../../services/realtime.service';
import { Task } from '../../../../models/task.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html'
})
export class TodoListComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  private subs = new Subscription();

  constructor(
    private api: ApiService,
    private realtime: RealtimeService
  ) { }

  ngOnInit(): void {
    // טוען את כל המשימות מה-API
    this.subs.add(
      this.api.getTasks().subscribe(list => this.tasks = list)
    );

    // מאזין להוספת משימה בזמן אמת
    this.subs.add(
      this.realtime.on<Task>('taskCreated').subscribe(newTask => {
        this.tasks.push(newTask);
      })
    );

    // מאזין למחיקת משימה בזמן אמת
    this.subs.add(
      this.realtime.on<{ id: string }>('taskDeleted')
        .subscribe(({ id }) => {
          this.tasks = this.tasks.filter(t => t._id !== id);
        })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.realtime.disconnect();
  }
}
