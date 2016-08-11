controllers.controller('PatientsController',['$scope', '$location', 'patientsService',
	function PatientsController($scope, $location, patientsService){
		$scope.patients = null
		function initialize(){
			patientsService.getPatients().then(function(result){
				$scope.patients = result;
			});

			$scope.gridOptions = {
				data: 'patients',	// Así le decimos el nombre de la variable del scope
				columnDefs:[
					{field: 'name', displayName: 'Nombre', width:'40%', cellTemplate:'<a ng-href="#/patient/{{row.getProperty(\'id\')}}">{{row.getProperty(col.field)}}</a>'},		// Asociamos cada uno de los campos del objeto patients con una columna, e indicamos el nombre de dicha columna y su anchura
					{field: 'cip', displayName: 'CIP', width:'20%'},
					{field: 'hosp', displayName: 'NHC Hosp.', width:'20%'},
					{field: 'dni', displayName: 'DNI', width:'20%'}
				]
			};
			// Para utilizar custom cells, usamos cellTemplate. Podemos utilizar los siguientes métodos de acceso: row.getProperty(col.field), row.getProperty('name'), row.entity.name, row.entity[col.field], row.entity['name']
			// El utilizar entity es más rápido (no llamamos a un método separado)

			$scope.newPatientCommand = function(){		// Nos creamos un comando para navegar a la página de patient
				$location.url('/patient');
			}
		};

		initialize();
	}
	]);

// controllers.controller('PatientsController',['$scope','patientsService',
// 	function PatientsController($scope, patientsService){
// 		function initialize(){
// 			$scope.patients = patientsService.getPatients();
// 		};

// 		initialize();
// 	}
// 	]);