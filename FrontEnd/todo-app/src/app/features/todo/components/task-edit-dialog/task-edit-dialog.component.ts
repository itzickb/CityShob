import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Task } from '../../../../models/task.model'; // Adjust the path as necessary

@Component({
  selector: 'app-task-edit-dialog',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule],
  templateUrl: './task-edit-dialog.component.html',
  styleUrls: ['./task-edit-dialog.component.scss']
})
export class TaskEditDialogComponent {
  task!: Task; // Use definite assignment assertion

  constructor(public dialogRef: MatDialogRef<TaskEditDialogComponent>) { }

  onSave() {
    // Logic to save the edited task
    this.dialogRef.close(this.task);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
