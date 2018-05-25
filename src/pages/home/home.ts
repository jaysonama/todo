import { Component } from '@angular/core';
import { NavController, AlertController, reorderArray, ToastController } from 'ionic-angular';
import { TodoServiceProvider } from '../../providers/todo-service/todo-service';
import { ArchivedTodosPage } from '../archived-todos/archived-todos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public todos = [];
  public reorderIsEnabled = false;
  public archivedTodosPage = ArchivedTodosPage;

  constructor(
    public navCtrl: NavController,
    private alertController: AlertController,
    private toastController: ToastController,
    private todoServiceProvider: TodoServiceProvider
  ) {
    this.todos = this.todoServiceProvider.getTodos();
  }

  archiveTodo(todoIndex) {
    this.todoServiceProvider.archiveTodo(todoIndex);
  }

  goToArchivePage() {
    this.navCtrl.push(ArchivedTodosPage);
  }

  toggleReorder() {
    this.reorderIsEnabled = !this.reorderIsEnabled;
  }

  itemReordered($event) {
    reorderArray(this.todos, $event)
  }

  openToolAlert() {
    let addTodoAlert = this.alertController.create({
      title: "Add A Todo",
      message: "Enter Your Todo",
      inputs: [
        {
          type: "text",
          name: "addTodoInput"
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Add Todo",
          handler: (inputData) => {
            let todoText;
            todoText = inputData.addTodoInput;
            this.todoServiceProvider.addTodo(todoText);

            addTodoAlert.onDidDismiss(() => {
              let addTodoToast = this.toastController.create({
                message: "Todo Added",
                duration: 2000
              });
              addTodoToast.present();
            });

          }
        }
      ]
    });
    addTodoAlert.present();
  }

  editTodo(todoIndex) {
    let editTodoAlert = this.alertController.create({
      title: "Edit A Todo",
      message: "Edit Your Todo",
      inputs: [
        {
          type: "text",
          name: "addTodoInput",
          value: this.todos[todoIndex]
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Edit Todo",
          handler: (inputData) => {
            let todoText;
            todoText = inputData.addTodoInput;
            this.todoServiceProvider.editTodo(todoText, todoIndex);

            editTodoAlert.onDidDismiss(() => {
              let editTodoAlert = this.toastController.create({
                message: "Todo Edited",
                duration: 2000
              });
              editTodoAlert.present();
            });

          }
        }
      ]
    });
    editTodoAlert.present();
  }

}
