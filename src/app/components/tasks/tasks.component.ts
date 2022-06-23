import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { UiService } from 'src/app/services/ui.service';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks!: Task[]
  showAddTask!: boolean
  subscription!: Subscription
  constructor(private taskService: TaskService, private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe(val => this.showAddTask = val)
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks)
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe(() => {
      this.tasks = this.tasks.filter(t=> t.id !== task.id)
    })
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder
    this.taskService.toggleService(task).subscribe()
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe((t) => {
      this.tasks = [...this.tasks, task]
      this.uiService.toggleAddTask()
  })
  }

}
