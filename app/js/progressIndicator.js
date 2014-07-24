'use strict';

var app = angular.module('progressIndicatorApp', ['d3']);

//TODO: determine whether to keep controller or remove. If keeping it, look up more about it.

app.controller('progressController', function($scope) {
    $scope.title = "Progress Indictator";
    $scope.d3Data = {
        actual: 0.73,
        expected: 0.5
    };
    // $scope.actual = 0.73;
    // $scope.expected = 0.5;
});

app.directive('ngProgressIndicator', ['d3Service', function(d3Service) {
  return {
    restrict: 'AE',
    scope: {
      data: '='
      // actual: '=',
      // expected: '='
    },
    //template: '<div class="progressIndicator"><h4>actual: {{ data.actual }}.expected: {{ data.expected }}</h4><div class="graph"></div></div>',
    link: function(scope, iElement, iAttrs) {
      d3Service.d3().then(function(d3) {
        // var data = [scope.data.actual, scope.data.expected];
        var svg = d3.select(iElement[0])
                    .append('svg')
                    .style("width", '100%');

        // scope.$watchCollection([actual, expected], function(newValues, oldValues, scope) {
        scope.$watch('data', function(newVals, oldVals) {
          scope.renderBars(newVals);
        }, true);

        // scope.$watch('expected', function(newVals) {
        //   scope.render([scope.actual, scope.expected]);
        // }, true);

        scope.renderBars = function(data) {
          svg.selectAll('*').remove();

          var height = 2 * 35; // 35 = 30(bar height) + 5(margin between bars)
          svg.attr('height', height);

          var x = d3.scale.linear()
                    .domain([0, d3.max(d3.values(data))])
                    .range([0, 420]);

          svg.selectAll("rect")
             .data(d3.values(data))
             .enter()
               .append("rect")
               .attr("height", 30) // height of each bar
               .attr("width", 0) // initial width of 0 for transition
               .attr("x", 10) // half of the 20 side margin specified above
               .attr("y", function(d, i){
                 return i * 35;
               }) // height + margin between bars
               .transition()
                 .duration(1000) // time of duration
                 .attr("width", function(d){
                   return x(d) + "px";
                 }); // width based on scale


          svg.selectAll("text")
             .data(d3.keys(data))
             .enter()
               .append("text")
               .attr("fill", "#fff")
               .attr("y", function(d, i){return i * 35 + 22;})
               .attr("x", 15)
               .text(function(d){return d;});
        }
      });
    }
  }
}]);

// var chartGraph = function(data) {

//   // var data = d3Data;
//   var x = d3.scale.linear()
//       .domain([0, d3.max(data)])
//       .range([0, 420]);

//   d3.select(".graph")
//     .selectAll("div")
//       .data(data)
//     .enter().append("div")
//       .style("width", function(d) { return x(d) + "px"; })
//       .text(function(d) { return d; });
// }