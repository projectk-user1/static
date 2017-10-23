angular
    .module('theme.demos.login')
    .service('loginService', loginService)
loginService.$inject = ['$q', '$http', '$location', '$rootScope', '$window', 'localStorageService'];
function loginService($q, $http, $location, $rootScope, $window, LocalStorage) { // jshint ignore:line

    var JWT_TOKEN = "jwtToken";
    var userInfo = {};

    function parseJwt(token) {
        var base64Url = token.split('.')[1];
        if (base64Url) {
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse($window.atob(base64));
        }
        return null;
    }

    function changeAuthState(params) {
        userInfo = params;
        $rootScope.$broadcast("AUTHCHANGED", userInfo);
    }
    // Removing Auth Token from Local Storage
    this.logout = function () {
        LocalStorage.remove(JWT_TOKEN);
    };

    // Check if session is authenticated
    this.isAuthed = function () {
        var isAuthed = false;
        var token = LocalStorage.get(JWT_TOKEN);
        if (token) {
            var params = parseJwt(token);

            changeAuthState(params);

            isAuthed = Math.round(new Date().getTime() / 1000) <= params.exp;
        } else {
            console.warn("Token not found. Auth Again!");
        }

        return isAuthed;
    };

    var requestPromises = {
        validate: null
    };
    var endpoint = 'http://' + $location.host() + ':' + $location.port();

    this.validate = function (postData) {
        if (requestPromises.validate) {
            requestPromises.validate.resolve();
        }
        var deferred = $q.defer();
        requestPromises.validate = $q.defer();
        $http({
            url: endpoint + "/ProjectK/rest/login/validate",
            method: "POST",
            data: postData,
            headers: {
                'Accept': 'application/json'
            },
            timeout: requestPromises.validate.promise,
        }).then(function (response) {
            // Saving Token
            LocalStorage.add(JWT_TOKEN, response.data.token);

            // Decrypting Token
            userInfo = parseJwt(response.data.token);

            // BroadCasting
            changeAuthState(userInfo);
            deferred.resolve(response);
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };
    //check if the user has a specific permission from JWT
    this.hasPermission = function (permissionID) {
        var token = LocalStorage.get(JWT_TOKEN);
        if (token) {
            var params = parseJwt(token);
            return !!(params && params.permissions && params.permissions.indexOf(permissionID) > -1);
        }
    };
}



