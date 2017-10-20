angular
    .module('theme.demos.search')
    .service('searchService', searchService)
searchService.$inject = ['$q', '$http', '$location'];
function searchService($q, $http, $location) { // jshint ignore:line
    var requestPromises = {
        fetchProfile: null
    };
    var endpoint = 'http://' + $location.host() + ':' + $location.port();

    this.fetchProfile = function (employeeId) {
        if (requestPromises.fetchProfile) {
            requestPromises.fetchProfile.resolve();
        }
        var deferred = $q.defer();
        requestPromises.fetchProfile = $q.defer();
        $http({
            url: endpoint + "/ProjectK/rest/user/id/" +employeeId,
            method: "GET",
            headers: {
                'Accept': 'application/json'
            },
            timeout: requestPromises.fetchProfile.promise,
        }).then(function (data) {
            deferred.resolve(data);
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };
}



