(function () {
    angular
        .module('theme.demos.createProfile')
        .controller('createProfileController', createProfileController);
    createProfileController.$inject = ['$scope', '$theme', 'createProfileService'];
    function createProfileController($scope, $theme, createProfileService) {
        'use strict';
        $scope.firstname = "Testing First";
        $scope.lastname = "mani1008";
        $scope.email = "mahesh.bonagiri@adp.com";
        $scope.height = "120cm";
        $scope.complexion = "White";
        $scope.education = "M.Tech";
        $scope.occupation = "UNKNOWN";
        $scope.maritalstatus = "Single";
        $scope.paternalGotram = "Gotram1";
        $scope.maternalGotram = "Gotram2";
        $scope.star = "Star";
        $scope.rasi = "Rasi";
        $scope.gender = "M";
        $scope.salary = "1000000";
        $scope.mobileno = "77777777";
        $scope.address = "asfasdsaasd";
        $scope.photoLink = "";
        $scope.videoLink = "";
        $scope.complexionArray = [];
        $scope.educationArray = [];
        $scope.familyStatusArray = [];
        $scope.familyTypeArray = [];
        $scope.familyValuesArray = [];
        $scope.gotramArray = [];
        $scope.maritalStatusArray = [];
        $scope.occupationArray = [];
        $scope.rasiArray = [];
        $scope.religionArray = [];
        $scope.starArray = [];
        $scope.casteArray = [];



        var _fetchMstrFlds = function () {
            var response = createProfileService.fetchMstrFlds().then(function (response) {
                console.log(response.data);
                $scope.complexionArray = response.data.COMPLEXION;
                $scope.educationArray = response.data.EDUCATION;
                $scope.familyStatusArray = response.data.FAMILY_STATUS;
                $scope.familyTypeArray = response.data.FAMILY_TYPE;
                $scope.gotramArray = response.data.GOTRAM;
                $scope.maritalStatusArray = response.data.MARITAL_STATUS;
                $scope.occupationArray = response.data.OCCUPATION;
                $scope.rasiArray = response.data.RASI;
                $scope.religionArray = response.data.RELIGION;
                $scope.starArray = response.data.STAR;
                $scope.casteArray = response.data.CASTE;
            }, function (error) {
                console.error(error);
            });
        };
        $scope.create = function () {
            console.log($scope.firstname);
            var postData = {
                firstname: $scope.firstname,
                lastname: $scope.lastname,
                email: $scope.email,
                height: $scope.height,
                complexion: $scope.complexion,
                education: $scope.education,
                occupation: $scope.occupation,
                maritalstatus: $scope.maritalstatus,
                paternalGotram: $scope.paternalGotram,
                maternalGotram: $scope.maternalGotram,
                star: $scope.star,
                rasi: $scope.rasi,
                gender: $scope.gender,
                salary: $scope.salary,
                mobileno: $scope.mobileno,
                address: $scope.address,
                photoLink: $scope.photoLink,
                videoLink: $scope.videoLink,
            };
            var response = createProfileService.createProfile(postData).then(function (response) {
                console.log(response.data);
            }, function (error) {
                console.error(error);
            });
        };
        // initializes UI
        var _init = function () {
            _fetchMstrFlds();
        };
        _init();

    }
})();