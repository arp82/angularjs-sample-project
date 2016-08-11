// http://www.benlesh.com/2013/06/angular-js-unit-testing-directives.html

describe('Testing rcdni directive',function(){
	var scope,										// Estas son variables miembro que nos hemos creado
		elem,
      	directive,
      	compiled,
      	html,
      	ctrl,
      	form;

    beforeEach(function(){							// Antes de cada UnitTest...
    	module('app.directives');					// cargamos nuestro módulo de directivas
    	html = '<form name="patientForm">' +		// preparamos nuestra view de prueba
    			'<input type=text id=dni name="dni" rc-dni="" ng-model="fields.dni" />'
    			'</form>';
    	inject(function($compile, $rootScope, $controller){		// servicios para compilar, padre de todos los scopes, y para el controller
    		scope = $rootScope.$new();							// <- con eso creamos un scope hijo, que es al que le vamos a meter el controlador de prueba
    		ctrl = $controller('MockDniController', {
    			$scope: scope
    		});
    		elem = angular.element(html);						// transforma el html que hemos indicado en un elemento del DOM, y lo referenciamos (con jQuery o jqlite) -- get the jQuery element
    		compiled = $compile(elem);							// - crea una vista "compilada" (aquí puede dar error si no encuentra una directiva o algo) -- compile the element to a function to process the view
    		compiled(scope);									// ejecutamos la aplicación  - run the compiled view
    		scope.$digest();									// llamamos al digest. En Angular, hay algo que hace los bindings y actualiza los cambios en vistas y/o scope. Aquí no tenemos este elemento al 
    															// hacer los tests, por lo que tenemos que indicar que hay que refrescar los datos y demás => digest  -- updates the watch ($watch)
    		form = scope.patientForm;							// tomamos una referencia a nuestro form desde el scope (esto es un poco raro) -- get the angularjs form control
    	});
	});
		
	// Ahora, después de haber descrito las pruebas, vamos a los casos que vamos a hacer
	it('Inform a valid DNI', function(){
		form.dni.$setViewValue("68710415P");				
		scope.$digest();									// como angular está medio-muerto, tenemos que ir manualmente refrescar las cosas, cargar los módulos de directivas, etc.
		// test to see if we get a not valid value
		expect(form.dni.$valid).toBe(true);
	});

	it('Inform a wrong DNI',function(){
		form.dni.$setViewValue("25691568H");
		scope.$digest();
		expect(form.dni.$valid).toBe(false);
		// jquery check UI
		var elemInvalid = $(elem[0]).find('#dni.ng-invalid');
		expect(elemInvalid.length).toEqual(1);					// Esta parte de aquí comprueba que el elemento html existe o no (longitud 1 o más de la variable elemInvalid si existe, si no, 0)
	})
});