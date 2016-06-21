
angular.module('city-comp')
.factory('autocomplete1',function(){
  return TeleportAutocomplete.init('.my-input');
});
angular.module('city-comp')
.factory('autocomplete2',function(){
  return TeleportAutocomplete.init('.my-input1');
});
angular.module('city-comp')
.service('teleportAPI',['$http', '$q',function($http, $q){

    this.getCityInfo = function(uaSlug){
      var urlBase = "https://api.teleport.org/api/";
      var defer = $q.defer();
      var url = urlBase + "urban_areas/slug:" + uaSlug + "/scores/";
      $http({
        method: 'GET',
        url: url,
        cache: true
      })

      .success(function(data, status, headers, config) {
        if(typeof data.status == 'object') {
          console.log("Error'" + data.status.message + "'");
          defer.reject(data.status);
        } else {
          defer.resolve(data);
        }
      })

      .error(function(data, status, headers, config) {
        console.log(status + " error attempting to access teleport.org.");
        defer.reject();
      });
      return defer.promise;
    }

    this.getCityImg = function(uaSlug){
      var urlBase = "https://api.teleport.org/api/";
      var defer = $q.defer();
      var url = urlBase + "urban_areas/slug:" + uaSlug + "/images/";
      $http({
        method: 'GET',
        url: url,
        cache: true
      })

      .success(function(data, status, headers, config) {
        if(typeof data.status == 'object') {
          console.log("Error'" + data.status.message + "'");
          defer.reject(data.status);
        } else {
          defer.resolve(data);
        }
      })

      .error(function(data, status, headers, config) {
        console.log(status + " error attempting to access teleport.org.");
        defer.reject();
      });
      return defer.promise;
    }
}]);