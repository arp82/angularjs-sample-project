var app = angular.module('app', [
	'ui.bootstrap',
	'ngRoute',
	'ngGrid',
	'ngMessages',
	//'lc-validation-summary',
	'riatecui',
	'app.services',
	'app.controllers',
	'app.directives'])
	.config(['$httpProvider', '$routeProvider', function($httpProvider,$routeProvider){
		// Según Evaristo, le funciona sin tener que meter el config (puede que sea cosa de las versiones anteriores de Angular)
		$httpProvider.defaults.useXDomain = true;	// Decimos que use por defecto Cross Domain
		//delete $httpProvider.defaults.headers.common['X-Requested-With'];	// eliminamos la cabecera para llamadas no x-domain ?? (no está seguro). A partir de Angularjs 1.2 no es necesario
		
		$routeProvider
			.when('/',
			{
				controller: 'PatientsController',
				templateUrl: 'app/controllers/patients.html'
			})
			.when('/patient/:patientId?',			//<!--? indica opcional. : indica parámetro -->
			{
				controller: 'PatientController',
				templateUrl: 'app/controllers/patient.html'
				//templateUrl: 'app/controllers/patient_with_lc_Validation_summary.html'
			});
	}])
	.run(['datepickerPopupConfig', function(datepickerPopupConfig){
		// Datepicker localization
		datepickerPopupConfig.currentText = 'Hoy';
		datepickerPopupConfig.clearText = 'Borrar';
		datepickerPopupConfig.closeText = "Cerrar";
	}]);

// En app se pueden utilizar los métodos config y run. 
// App es la aplicación. 
// App.config se ejecuta antes de todo para preparar la aplicación. Solo puede ejecutar cosas de tipo provider, que sirven para configurar servicios. 
//     por ejemplo, httpProvider y routeProvider. El segundo define las rutas de la aplicación, dentro de él podemos acceder a $route. 
//     HttpProvider puede acceder a $http
//     Un ejemplo típico sería crear mensajes de validación en diferentes idiomas. Lo veremos más adelante.

// var app = angular.module('app', [
// 	'riatecui',
// 	'app.services',
// 	'app.controllers',
// 	'app.directives']);