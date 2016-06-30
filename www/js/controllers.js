angular.module('starter.controllers', [])

.controller('todoListCtrl', function($scope) {
  $scope.projects = [
    {title: 'Projet 1'},
    {title: 'Projet 2'},
    {title: 'Projet 3'},
    {title: 'Projet 4'},
    {title: 'Projet 4'},
    {title: 'Projet 4'}
  ];

  $scope.todoList = [
    {title: 'todo 1', done: false},
    {title: 'todo 2', done: false},
    {title: 'todo 3', done: false},
    {title: 'todo 4', done: false},
    {title: 'todo 5', done: false},
    {title: 'todo 6', done: false}
  ];

  // Called when the form is submitted
  $scope.createTodo = function(todo) {
    $scope.todoList.push({
      title: todo.title,
      done: false
    });
    //clear form
    todo.title = "";
  };

  $scope.toggleStatus = function(todo) {
    if(todo.done == true){
      todo.done = false;
    }
    else{
      todo.done = true;
    }
  }

  $scope.createProject = function(project) {
    $scope.projects.push({
      title: project.title
    });
    project.title = "";
  }
})
