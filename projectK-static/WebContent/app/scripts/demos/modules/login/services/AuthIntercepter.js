(function() {
	'use strict';

	angular
		.module('theme.demos.login')
		.factory('AuthInterceptor', AuthInterceptor);

	AuthInterceptor.$inject = ['$q', '$rootScope', 'localStorageService'];

	function AuthInterceptor($q, $rootScope, LocalStorage) { // jshint ignore:line
		return {
			request: request,
			responseError: responseError,
		};

		//===================================================================

		function request(config) { // jshint ignore:line
			config.headers = config.headers || {};

			var token = LocalStorage.get("jwtToken");
			if (token) {
				config.headers.Authorization = 'Bearer ' + token;
			}
			return config;
		}

		function responseError(response) { // jshint ignore:line
			if (response.status === 401) {
				$rootScope.$broadcast("FORCELOGOUT");
			}
			return $q.reject(response);
		}
	}
})();