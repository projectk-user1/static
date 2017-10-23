angular
  .module('theme.demos', [
    'oc.lazyLoad',
    'theme.demos.calendar',
    'theme.demos.canvas_charts',
    'theme.demos.nvd3_charts',
    'theme.demos.flot_charts',
    'theme.demos.morris_charts',
    'theme.demos.sparkline_charts',
    'theme.demos.ui_components',
    'theme.demos.basic_tables',
    'theme.demos.boxed_layout',
    'theme.demos.horizontal_layout',
    'theme.demos.dashboard',
    'theme.demos.chatbox',
    'theme.demos.gallery',
    'theme.demos.editable_table',
    'theme.demos.google_maps',
    'theme.demos.vector_maps',
    'theme.demos.ng_grid',
    'theme.demos.signup_page',
    'theme.demos.not_found',
    'theme.demos.error_page',
    'theme.demos.tasks',
    'theme.demos.mail',
    'theme.demos.search',
    'theme.demos.login',
    'LocalStorageModule'
  ])
  ;
  angular.module('theme.demos').config(['localStorageServiceProvider', function(localStorageServiceProvider) {
		localStorageServiceProvider.setPrefix('projectK');
	}]); 

	angular.module('theme.demos').config(['$httpProvider', function($httpProvider) {
		$httpProvider.interceptors.push('AuthInterceptor');
	}]);