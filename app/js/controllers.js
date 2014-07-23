"use strict";

// Controller

var progressIndictatorApp = angular.module('progressIndictatorApp', []);

progressIndictatorApp.controller('progressController', function($scope) {
    $scope.actual = 0.73;
    $scope.expected = 0.5;
});