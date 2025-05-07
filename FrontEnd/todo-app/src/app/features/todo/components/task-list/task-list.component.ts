// src/app/features/todo/components/task-list/task-list.component.ts

import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../../services/api.service';
import { RealtimeService } from '../../../../services/realtime.service';
import { Task } from '../../../../models/task.model';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { TaskEditDialogComponent } from './task-edit-dialog/task-edit-dialog.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['title', 'completed', 'actions'];
  dataSource = new MatTableDataSource<Task>([]);
  private subs = new Subscription();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private api: ApiService,
    private realtime: RealtimeService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadTasks();

    // מאזין להוספה בזמן אמת
    this.subs.add(
      this.realtime.on<Task>('taskCreated').subscribe(task => {
        this.dataSource.data = [...this.dataSource.data, task];
      })
    );

    // מאזין לעדכון
    this.subs.add(
      this.realtime.on<Task>('taskUpdated').subscribe(updated => {
        this.dataSource.data = this.dataSource.data.map(t => t._id === updated._id ? updated : t);
      })
    );

    // מאזין למחיקה
    this.subs.add(
      this.realtime.on<{ id: string }>('taskDeleted').subscribe(({ id }) => {
        this.dataSource.data = this.dataSource.data.filter(t => t._id !== id);
      })
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private loadTasks(): void {
    this.api.getTasks().subscribe(list => {
      this.dataSource.data = list;
    });
  }

  /** הוספת משימה חדשה (קורא לדיאלוג או לניווט) */
  onAdd() {
    // Logic to add a new task
  }

  /** עריכת שורה קיימת */
  onEdit(task: Task) {
    const dialogRef = this.dialog.open(TaskEditDialogComponent, {
      data: task // Pass the task data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Logic to update the task in the data source
        this.api.updateTask(task._id, result).subscribe(updatedTask => {
          // Update the data source with the edited task
          this.dataSource.data = this.dataSource.data.map(t => t._id === updatedTask._id ? updatedTask : t);
        });
      }
    });
  }

  /** מחיקת שורה */
  onDelete(id: string) {
    // Logic to delete the task
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.realtime.disconnect();
  }
}
