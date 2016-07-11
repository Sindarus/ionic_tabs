var myApp = angular.module('starter.controllers', []);

// returns [start, start+1, start+2, ..., start+(count-1)]
function range(start, count) {
  return Array.apply(0, Array(count))
    .map(function (element, index) {
      return index + start;
  });
}

function include(arr, obj) {
  return (arr.indexOf(obj) != -1);
}

myApp.factory("s_bookings", function(){
  return {
    init: function(){
      this.bookings = angular.fromJson(localStorage["bookings"]) || [];
      this.next_id = angular.fromJson(localStorage["bookings_next_id"]) || 0;
    },
    book: function(_shop, _date, _hour, _amount){
      console.log("this.bookings : " + this.bookings);
      this.bookings.push({
        id: this.next_id,
        shop: _shop,
        date: _date,
        hour: _hour,
        amount: _amount
      });
      this.next_id += 1;
      this.save();  // In case the user unexpectedly exits the program
    },
    getById: function(id){
      for(var i=0; i<this.bookings.length; i++){
        if(this.bookings[i].id == id){
          return this.bookings[i];
        }
      }
    },
    getIndexById: function(id){
      //only for use inside this service.
      for(var i=0; i<this.bookings.length; i++){
        if(this.bookings[i].id == id){
          return i;
        }
      }
    },
    remove: function(id){
      this.bookings.splice(this.getIndexById(id), 1);
      this.save();
    },
    getAll: function(){
      return this.bookings;
    },
    save: function(){
      localStorage["bookings"] = angular.toJson(this.bookings);
      localStorage["bookings_next_id"] = angular.toJson(this.next_id);
    }
  }
});

myApp.controller('todoListCtrl', function($rootScope, $ionicScrollDelegate, s_bookings, $state) {
  $rootScope.include = include;

  $rootScope.hours = [];
  for(hour of ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]){
    for(min of ["00", "15", "30", "45"]){
      $rootScope.hours.push(hour + "h" + min);
    }
  }

  $rootScope.select_hour = function(hour){
    $rootScope.booking_hour = hour;
  }

  $rootScope.later = function(){
    if( include($rootScope.hour_index_range, 99) ){
      //Already latest
      return;
    }
    for (var i=0; i<$rootScope.hour_index_range.length; i++) {
      $rootScope.hour_index_range[i] += 12;
    }
  }

  $rootScope.earlier = function(){
    if( include($rootScope.hour_index_range, 0) ){
      //Already earliest
      return;
    }
    for (var i=0; i<$rootScope.hour_index_range.length; i++) {
      $rootScope.hour_index_range[i] -= 12;
    }
  }

  $rootScope.hour_button_class = function(hour){
    if(hour == $rootScope.booking_hour){
      return "selected"
    }
  }

  $rootScope.book = function(_shop, _date, _hour, _amount) {
    s_bookings.book(_shop, _date, _hour, _amount);

    // update scope
    $rootScope.bookings = s_bookings.getAll();
  }

  $rootScope.remove = function(id) {
    s_bookings.remove(id);

    // update scope
    $rootScope.bookings = s_bookings.getAll();
  }

  $rootScope.goToHome = function() {
    $state.go('tab.projects');
  }

  $rootScope.hour_index_range = range(64, 12);

  $rootScope.booking_date = new Date();
  $rootScope.booking_amount = 2;
  $rootScope.booking_hour = "16h00";
  $rootScope.cur_shop = "Le Café des invalides";

  s_bookings.init();
})
