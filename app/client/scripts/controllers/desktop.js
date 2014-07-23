'use strict';
/*global $:false */

angular.module('fbCal')
  .controller('DesktopCtrl', function ($scope, $wix, api, $http, init, $log,
                                       desktopCalendar, list, $timeout) {
    $scope.settings = api.defaults;

    //things to prepare for events: order them by time and day & get time/day out
    var temp1 = {'title' : 'Concert asds duper awesome event come to my event to have an awesome adventure', 'time' : 'June 17th, 7:30pm', 'day' : 'Wednesday'};
    var temp2 = {'title' : 'Concert', 'time' : 'June 17th, 9pm', 'day' : 'Wednesday'};
    var temp3 = {'title' : 'Concert', 'time' : 'June 17th, 8pm', 'day' : 'Wednesday'};
    var temp4 = {'title' : 'Concertdas', 'time' : 'June 17th, 8pm', 'day' : 'Wednesday'};
    $scope.eventList = [temp1, temp2, temp3, temp4];


    /* PUT THIS IN SETTINGS CALLBACK WHEN WRITTEN */
    if ($scope.settings.view === "Month") {
      desktopCalendar.setup();
    } else {
      list.setup($scope.settings.borderWidth, $scope.settings.borderColor);
      $scope.$watch('eventList', function() {
        $timeout(function() {
          $wix.setHeight($('#desktop').outerHeight());
        }, 3000);
      });
    }

    $scope.listStyle = function(last) {
      return list.listStyle(last);
    };

    /** 
     * When the site owner updates the settings, this added event listener
     * allows the widget to implement these changes immediately.
     */
    $wix.addEventListener($wix.Events.SETTINGS_UPDATED, function(message) {
      $scope.settings = message;
      $scope.$apply();
    });
});