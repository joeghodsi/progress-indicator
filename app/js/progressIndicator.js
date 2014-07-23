'use strict';

var app = angular.module('progressIndicatorApp', []);

//TODO: determine whether to keep controller or remove. If keeping it, look up more about it.

app.controller('progressController', function($scope) {
    $scope.actual = 0.73;
    $scope.expected = 0.5;
});

app.directive('ngProgressIndicator', function() {
  return {
    restrict: 'AE',
    scope: {
      actual: '=',
      expected: '='
    },
    template: '<div class="progressIndicator"><h4>actual: {{ actual }}. expected: {{ expected }}</h4><div class="graph"></div></div>',
    link: function(scope, iElement, iAttrs) {
      var data = [scope.actual, scope.expected];
      var x = d3.scale.linear()
                .domain([0, d3.max(data)])
                .range([0, 420]);
      var svg = d3.select(".graph")
                  .append("div")
                  .style("width", function(d) { return x(d) + "px"; });
      // scope.$watchCollection([actual, expected], function(newValues, oldValues, scope) {
      scope.$watch('actual', function(newVals) {
        scope.render([scope.actual, scope.expected]);
      }, true);

      scope.$watch('expected', function(newVals) {
        scope.render([scope.actual, scope.expected]);
      }, true);

      scope.render = function(data) {
        //svg.selectAll('*').remove();

        //if (!data) return;

        var x = d3.scale.linear()
                  .domain([0, d3.max(data)])
                  .range([0, 420]);

        svg.select(".graph")
           .selectAll("div")
             .data(data)
           .enter().append("div")
             .style("width", function(d) { return x(d) + "px"; })
             .text(function(d) { return d; });
      }
    }
  }
});

var chartGraph = function(actual, expected) {

  var data = [actual, expected];
  var x = d3.scale.linear()
      .domain([0, d3.max(data)])
      .range([0, 420]);

  d3.select(".graph")
    .selectAll("div")
      .data(data)
    .enter().append("div")
      .style("width", function(d) { return x(d) + "px"; })
      .text(function(d) { return d; });
}