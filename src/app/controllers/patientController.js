controllers.controller('PatientController',
	['$scope', 
	'$routeParams',
	'$log',
	'repositorySettings',
	'lookupDataService',
	//'datepickerPopupConfig',
	function PatientController($scope,$routeParams,$log,repositorySettings,lookupDataService){
		function initialize(){
			//$scope.testBinding = "controller up and running";		// La variable de coña es para ver que todo funciona y demás
			//$scope.patientId = $routeParams.patientId;
			loadLookUps();
			initializePatient();
			setupCommands();
		}

		// Hacer esto aquí es un poco chapuza, es una inicialización de una sola vez, mejor pasarlo al .run (no vale el .config porque todavía no está levantado por los proveedores)
		//datepickerPopupConfig.currentText = 'Hoy';
		//datepickerPopupConfig.clearText = 'Borrar';
		//datepickerPopupConfig.closeText = "Cerrar";

		function loadLookUps(){
			$scope.genders = lookupDataService.getLookupValues(repositorySettings.lookupEntities.genders);
			$scope.maritalStatuses = lookupDataService.getLookupValues(repositorySettings.lookupEntities.maritalStatuses);
			$scope.hospitals = lookupDataService.getLookupValues(repositorySettings.lookupEntities.hospitals);
			// $scope.hospitals = [{id:1, name:'Carlos Haya'}, 
   //                      {id:2, name:'Clinico'}, 
   //                      {id:3, name:'Materno'},
   //                      {id:4, name:'Parque San Antonio'},
   //                      {id:5, name:'Galvez'},
   //                      {id:6, name:'Quiron'}
   //          ]; 

   //          $scope.genders = [{id:1, name:'male'},
   //          			{id:2, name:'female'}
   //          ];

			
		 //    $scope.maritalStatuses = [
   //              {id:0, name: "Seleccione Estado"},
   //              {id:1, name: "Casado"},
   //              {id:2, name: "Soltero"},
   //              {id: 3, name: "Divorciado"}
   //      	];
		}

		function initializePatient(){
			$scope.patientId = $routeParams.patientId;
			if ($scope.patientId == null){	// puede que sea undefined, no null. Recomienda usar la biblioteca "underscore"
				createBlankPatient();
			}else{
				createBlankPatient();	// debería ser loadPatient(patientId)
			}
		}

		function createBlankPatient(){
			//$scope.model.patient = {								// Algunas directivas crean scopes hijos que reemplazan al padre. Hablando de model, no ocurre esto. Dice que no lo vamos a ver.
			$scope.patient = {
		         id: 0,
		         name: '',
		         lastname: '',
		         lastname2: '',
		         dni: '',
		         birthdate: null,
		         hospital: null,
		         maritalStatus: 0,
		         gender: 1
		    };

		}

		function setupCommands(){
				$scope.consoleDebugPatientCommand = function(){				// No ponemos console.loquesea o console.log porque algunos navegadores la lían. Los chicos de google pusieron un servicio $log para hacer estas cosas. Tb se puede desactivar en release.
				$log.info($scope.patient);
			};
		}

		initialize();
	}]);

