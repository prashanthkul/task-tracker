import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {
  @Input() task!: Task
  @Output() onDeleteTask = new EventEmitter<Task>()
  @Output() onToggleReminder = new EventEmitter<Task>()
  constructor() { }

  ngOnInit(): void {
  }

  deleteTask() {
    this.onDeleteTask.emit(this.task)
  }

  onToggle() {
    this.onToggleReminder.emit(this.task)
  }

}
