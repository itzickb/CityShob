// src/app/features/todo/todo.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './components/task-list/task-list.component';
import { ApiService } from '../../services/api.service';
import { RealtimeService } from '../../services/realtime.service';

// מודולי Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    TaskListComponent,
    // ... רכיבים נוספים של ה־feature
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSortModule,
    // ... מודולים נוספים (FormsModule, ReactiveFormsModule וכו')
  ],
  providers: [
    ApiService,
    RealtimeService
  ],
  exports: [
    TaskListComponent
  ]
})
export class TodoModule { }
