angular
  .module('theme.demos.search')
  .controller('SearchController', ['$scope', 'searchService', function ($scope, searchService) {
    'use strict';
    $scope.profile = {};
    $scope.searchId = '8P29';
    $scope.loadingProfile = false;
    $scope.gender;
    $scope.fromAge;
    $scope.toAge;
    $scope.fromHeight;
    $scope.toHeight;
    $scope.profiles={};
    $scope.submit = function () {
      console.log($scope.searchId);
      var response = searchService.fetchProfile($scope.searchId).then(function (profile) {
        $scope.profile = profile.data;
        $scope.loadingProfile=true;
        console.log($scope.profile);
      }, function (error) {
        console.error(error);
        $scope.loadingProfile = false;
      });
    };
    
    $scope.advancedSearch = function(){
    	var postData={
    			gender:	$scope.gender,
    			ageFrom:$scope.fromAge,
    			ageTo:$scope.toAge,
    			heightFrom:$scope.fromHeight,
    			heightTo: $scope.toHeight
    	};
    	var response=searchService.fetchProfiles(postData).then(function (response){
    		console.log(response.data.payload);
    		$scope.profiles=response.data.payload;
    		$scope.loadingProfile=true;
    	}, function (error) {
    		console.error(error)
    	});
    };
  }]);