angular
    .module('theme.demos.login')
    .controller('loginController', ['$scope', '$theme', 'loginService', function ($scope,$theme, loginService) {
        'use strict';
        $scope.userName = "mahesh@8P2";
        $scope.password = "mani1008";
        $theme.set('fullscreen', true);

        $scope.$on('$destroy', function () {
            $theme.set('fullscreen', false);
        });
        $scope.login = function () {
            console.log($scope.userName);
            var postData = {
                loginId: $scope.userName,
                password: $scope.password
            };
            var response = loginService.validate(postData).then(function (response) {
                console.log(response.data);
            }, function (error) {
                console.error(error);
            });
        };
    }]);