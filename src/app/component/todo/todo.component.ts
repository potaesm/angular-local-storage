import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../service/local-storage.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  constructor(private localStorageService: LocalStorageService) {}
  id: number = 0;
  title: string = '';
  detail: string = '';
  todos: any[] = [];

  ngOnInit(): void {
    this.localStorageService.get('todo').subscribe((storage) => {
      this.todos = !!storage.value ? storage.value : [];
    });
  }

  remove(key: string): void {
    this.localStorageService.remove(key);
  }

  onClickRow(todo: any): void {
    this.id = todo.id;
    this.title = todo.title;
    this.detail = todo.detail;
  }

  setTodo(): void {
    const date = new Date();
    if (!!this.id || this.id === 0) {
      this.todos[this.id] = {
        id: this.id,
        title: this.title,
        detail: this.detail,
        date: date.toISOString(),
      };
    } else {
      const todo = {
        id: this.todos.length,
        title: this.title,
        detail: this.detail,
        date: date.toISOString(),
      };
      this.todos = [...this.todos, { ...todo }];
    }
    this.localStorageService
      .set('todo', this.todos)
      .subscribe((result) => {
        this.todos = result.value;
        this.id = 0;
        this.title = '';
        this.detail = '';
      });
  }
}
