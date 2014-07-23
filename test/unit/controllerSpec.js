'use strict';

/* jasmine specs for controller */
describe('progressIndictator controllers', function() {

  describe('progressController', function(){

    beforeEach(module('progressIndictatorApp'));

    it('should create "actual" model with CONSTANT VALUE', inject(function($controller) {
      var scope = {},
          ctrl = $controller('progressController', {$scope:scope});

      expect(scope.actual).toBe(0.73);
    }));

    it('should create "expected" model with CONSTANT VALUE', inject(function($controller) {
      var scope = {},
          ctrl = $controller('progressController', {$scope:scope});

      expect(scope.expected).toBe(0.5);
    }));

  });
});