import { Component, DoCheck, OnInit } from '@angular/core';


//Interface
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements  DoCheck {


ngDoCheck(): void {
 this.setLocalStorate();
}

   //Essas duas task foram usadas nesse public no começo mas não há necessidade de usalas.
  // task: "Minha nova Task", checked:true
   //task: "Minha nova Task 2", checked:false
 public taskList: Array<TaskList>= JSON.parse(localStorage.getItem("List") || '[]');


 public setEmitTaskList(event: string){
   this.taskList.push({task: event, checked:false});
 }

 //Essa função 'public' se refere ao icon lixo, clicando nele a mensagem apaga
 public deleteItemTaskList(event:number) {
  this.taskList.splice(event, 1);
 }


//Já essa função public é para o delete, clicando nele todas as mensagem são apagadas
 public deleteAllTaskList (){
  const confirm = window.confirm("Você deseja deletar tudo?");

  if (confirm){
    this.taskList = [];
  }

 }

 public validationInput(event:string, index: number){

  if(!event.length){
    const confirm = window.confirm("Task está vazia, deseja deletar?");

    if(confirm){
      this.deleteItemTaskList(index)
    }
  }
 }

 public setLocalStorate(){
  if(this.taskList){
    this.taskList.sort((first, last )=> Number(first.checked) - Number(last.checked));
    localStorage.setItem("List", JSON.stringify(this.taskList));
  }
 }
}
