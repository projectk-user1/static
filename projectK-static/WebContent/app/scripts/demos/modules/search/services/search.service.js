angular
    .module('theme.demos.search')
    .service('searchService', searchService)
searchService.$inject = ['$q', '$http', '$location'];
function searchService($q, $http, $location) { // jshint ignore:line
    var requestPromises = {
        fetchProfile: null,
        fetchProfiles:null
    };
    var endpoint = 'http://' + $location.host() + ':' + $location.port();

    this.fetchProfile = function (profileId) {
        if (requestPromises.fetchProfile) {
            requestPromises.fetchProfile.resolve();
        }
        var deferred = $q.defer();
        requestPromises.fetchProfile = $q.defer();
        $http({
            url: endpoint + "/ProjectK/rest/user/id/" +profileId,
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
    
    this.fetchProfiles = function (postData){
    	if (requestPromises.fetchProfiles) {
            requestPromises.fetchProfiles.resolve();
        }
        var deferred = $q.defer();
        requestPromises.fetchProfiles = $q.defer();
        $http({
            url: endpoint + "/ProjectK/rest/user/fetchProfiles",
            method: "POST",
            data: postData,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            timeout: requestPromises.fetchProfiles.promise,
        }).then(function (data) {
            deferred.resolve(data);
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }
}



