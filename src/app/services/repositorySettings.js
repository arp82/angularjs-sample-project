services.factory('repositorySettings', [function() {

  var lookupEntities = {
        genders: 'genders',
        maritalStatuses: 'maritalStatuses',
        hospitals: 'hospitals'
    };


  return {
    lookupEntities : lookupEntities
  }
}]);
