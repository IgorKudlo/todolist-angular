import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../../models/todos.models';

@Component({
  selector: 'tl-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  @Input() todo!: Todo;

  @Output() removeTodoEvent = new EventEmitter<string>();
  @Output() changeTodoTitleEvent = new EventEmitter<{ todoId: string; todoTitle: string }>();

  isEditMode = false;
  newTitle = '';

  removeTodoHandler() {
    this.removeTodoEvent.emit(this.todo.id);
  }

  editModeHandler() {
    this.isEditMode = true;
    if (this.isEditMode) this.newTitle = this.todo.title;
  }

  changeTodoTitleHandler() {
    this.isEditMode = false;
    this.changeTodoTitleEvent.emit({ todoId: this.todo.id, todoTitle: this.newTitle });
  }
}
