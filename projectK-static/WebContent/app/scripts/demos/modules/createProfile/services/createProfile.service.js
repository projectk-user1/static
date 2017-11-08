angular
    .module('theme.demos.createProfile')
    .service('createProfileService', createProfileService)
createProfileService.$inject = ['$q', '$http', '$location'];
function createProfileService($q, $http, $location) { // jshint ignore:line
    var requestPromises = {
        fetchProfile: null
    };
    var endpoint = 'http://' + $location.host() + ':' + $location.port();

    this.createProfile = function (postData) {
        if (requestPromises.createProfile) {
            requestPromises.createProfile.resolve();
        }
        var deferred = $q.defer();
        requestPromises.createProfile = $q.defer();
        $http({
            url: endpoint + "/ProjectK/rest/user/create",
            method: "POST",
            data: postData,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            timeout: requestPromises.createProfile.promise,
        }).then(function (data) {
            deferred.resolve(data);
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    this.fetchMstrFlds = function () {
        if (requestPromises.fetchMstrFlds) {
            requestPromises.fetchMstrFlds.resolve();
        }
        var deferred = $q.defer();
        requestPromises.fetchMstrFlds = $q.defer();
        $http({
            url: endpoint + "/ProjectK/rest/mstrFields/getAll",
            method: "GET",
            headers: {
                'Accept': 'application/json'
            },
            timeout: requestPromises.fetchMstrFlds.promise,
        }).then(function (data) {
            deferred.resolve(data);
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }
}



