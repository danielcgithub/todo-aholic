import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Todo-Aholic';

  // Link to our api, pointing to localhost
  // API = 'http://localhost:3000';
  API = 'http://192.168.99.100:3000'

  // Declare empty list of todos
  todos: any[] = [];

  constructor(private http: HttpClient) { }

  // Angular 2 Life Cycle event when component has been initialized
  ngOnInit() {
    this.getAllToDos();
  }

  getAllToDos() {
    this.http.get(`${this.API}/api/todos`).subscribe((todos: any) => {
      this.todos = todos
      console.log(todos)
    })
  }

  createTodo(todotext) {
    this.http.post(`${this.API}/api/todos`, { todotext })
      .subscribe(() => {
        this.getAllToDos();
      })
  }

  deleteTodo(todoid) {
    this.http.delete(`${this.API}/api/todos` + todoid).subscribe(() => {
      this.getAllToDos();
    })

  }

}
