angular
  .module('theme.demos.search')
  .controller('SearchController', ['$scope', 'searchService', function ($scope, searchService) {
    'use strict';
    $scope.profile = {};
    $scope.searchId = '12';

    $scope.submit = function () {
      console.log($scope.searchId);
      var response = searchService.fetchProfile($scope.searchId).then(function (profile) {
        $scope.profile = profile.data;
        console.log($scope.profile);
      }, function (error) {
        console.error(error);
      });
    };
  }]);