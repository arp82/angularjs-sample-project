controllers.controller('HeadingController',
	['$rootScope',
	'$scope',
	'$location',
	function HeadingController($rootScope,$scope,$location){
		function initialize(){
			$scope.isPatientsActive=true;
			$scope.isPatientActive=true;
		}
		initialize();

		$rootScope.$on('$routeChangeSuccess',function(){		// Cuando se de el evento routeChangeSuccess con éxito, ejecuta la función que le indicamos
			var currentRoute = $location.path();
			$scope.isPatientsActive = (currentRoute == '/');
			$scope.isPatientActive = stringBeginsWith(currentRoute, '/patient');
		});
	}]);


  // See (ES6): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
  // Or fancy discussion: http://stackoverflow.com/questions/1767246/javascript-check-if-string-begins-with-something
  function stringBeginsWith(fullString, prefixToCompare) {
  	return (fullString.indexOf(prefixToCompare) === 0);
  }