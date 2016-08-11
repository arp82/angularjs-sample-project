services.factory('patientsService',['$q', '$http', function($q,$http){
	function getPatients() {
		var deferred = $q.defer();
		$http({method: 'GET', url:'/api/patients'}).
		//$http({method: 'GET', url:'http://dummytest.azurewebsites.net/api/patients'}).
			success(function(data,status,headers,config){
				deferred.resolve(data);
			}).
			error(function(data,status,headers,config){
				deferred.reject(data);
			});
		return deferred.promise;

		//return $http({method: 'GET', url:'/api/patients'});	// Como $http ya es una promesa, esto es lo más eficiente
	}

	return {
		getPatients : getPatients
	}
}]);



// services.factory('patientsService',[function(){
// 	function getPatients() {
// 		return [ 
// 	        {
// 	        	id: 1, name: 'Rosales Navarro, Miguel', 
// 		        cip: '138000125', 
// 		        hosp: '25430121', 
// 		        dni:'12345678Q'
// 	        },
// 	        {
// 	        	id: 2, name: 'Lopez Fernandez, Maria', cip: '157300234', hosp: '25430121', dni:'22324779Q'
// 	        }
//         ];
// 	}

// 	return {
// 		getPatients : getPatients
// 	}
// }]);