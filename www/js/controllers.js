var myApp = angular.module('starter.controllers', []);

// create new service
// this is the way to create a service : call factory() on the app. First parameter
// is the service's name, and second is a function returning an object, that thus
// becomes a service. So how is it better than a js object ? Dependance injection, maybe
myApp.factory('s_projects', function(){
  return {
    getAll: function(){
      var jsoned = window.localStorage['projects'];
      if(jsoned) {
        return angular.fromJson(jsoned);
      }
      return [];
    },
    add: function(project){
      var projects = this.getAll();

      //if we have never set next_id (which holds the id of the next project to record)
      if(typeof this.next_id === 'undefined'){
        this.next_id = 0;
      }

      project.id = this.next_id;
      project.todos = [];
      projects.push(project);
      window.localStorage['projects'] = angular.toJson(projects);

      this.next_id += 1;
    },
    getById: function(id){
      var projects = this.getAll();
      for(project of projects){
        if(project.id == id){
          return project;
        }
      }
    },
    selectById: function(id){
      window.localStorage["selected_id"] = id;
    },
    hasSelected: function(){
      return (typeof window.localStorage["selected_id"] !== 'undefined');
    },
    getSelected: function(){
      if(! this.hasSelected()){
        console.log("s_projects.getSelected() : no project selected");
      }
      return this.getById(window.localStorage["selected_id"]);
    },
    addTodo: function(todo_message){
      //adds todo to selected project
      projects = this.getAll();
      for(project of projects){
        if(project.id == window.localStorage["selected_id"]){
          project.todos.push({title: todo_message, done: false});    //add todo
          window.localStorage['projects'] = angular.toJson(projects);   //save
          return;
        }
      }
    }
  };
});

// returns [start, start+1, start+2, ..., start+(count-1)]
function range(start, count) {
  return Array.apply(0, Array(count))
    .map(function (element, index) {
      return index + start;
  });
}

myApp.controller('todoListCtrl', function($rootScope, s_projects) {
  $rootScope.include = function(arr, obj) {
    return (arr.indexOf(obj) != -1);
  }

  $rootScope.hours = [];
  for(var hour=0; hour<24; hour++){
    for(min of ["00", "15", "30", "45"]){
      $rootScope.hours.push(hour.toString() + "h" + min);
    }
  }

  $rootScope.hour_index_range = range(64, 12);
})
