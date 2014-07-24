'use strict';

var app = angular.module('progressIndicatorApp', ['d3']);

app.controller('progressController', function($scope) {
    $scope.title = "Progress Indictator";
    $scope.d3Data = {
        actual: 0.73,
        expected: 0.5
    };
});

app.directive('ngProgressIndicator', ['d3Service', function(d3Service) {
  return {
    restrict: 'AE',
    scope: {
      data: '='
    },
    link: function(scope, iElement, iAttrs) {
      d3Service.d3().then(function(d3) {

        scope.$watch('data', function(newVals, oldVals) {
          scope.renderArcs(newVals, oldVals);
        }, true);

        scope.renderArcs = function(data) {

            var width = 500,
                height = 500,
                τ = 2 * Math.PI;

            var arc = d3.svg.arc()
                .startAngle(0);

            var svg = d3.select("body").append("svg")
                .attr("width", width)
                .attr("height", height)
              .selectAll("g")
              .data(d3.values(data))
              .enter()
              .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

            var innerCircle = svg.append("circle")
                .attr("r", 75)
                .attr("fill", "#F0F0F0");

            var texts = svg.selectAll("text")
                .data(d3.values(data));

            texts.enter().append("text")
                .attr("x", 0)
                .attr("y", 15)
                .style("font-size", 15)
                .style("text-anchor", "middle")
                .text("Progress");

            texts.enter().append("text")
                .attr("x", 18)
                .attr("y", -2)
                .style("font-size", 15)
                .style("text-anchor", "middle")
                .text("%");

            var dynamicText = svg.append("text")
                .attr("x", -5)
                .attr("y", 0)
                .style("font-size", 30)
                .style("text-anchor", "middle")
                .text(data.actual*100);

            var innerArc = svg.append("path")
                .datum({innerRadius: 85, outerRadius: 88, endAngle: data.expected * τ})
                .style("fill", "#99FF66")
                .attr("d", arc);

            var outerArc = svg.append("path")
                .datum({innerRadius: 92, outerRadius: 100, endAngle: data.actual * τ})
                .style("fill", "#33CC00")
                .attr("d", arc);

            setInterval(function() {
                innerArc.transition()
                    .duration(750)
                    .call(arcTween, arc, data.expected * τ);
                outerArc.transition()
                    .duration(750)
                    .call(arcTween, arc, data.actual * τ);
            }, 1000);

            function arcTween(transition, arc, oldAngle) {
              transition.attrTween("d", function(d) {
                var interpolate = d3.interpolate(d.endAngle, oldAngle);
                return function(t) {
                  d.endAngle = interpolate(t);
                  return arc(d);
                };
              });
            }
        }
      });
    }
  }
}]);