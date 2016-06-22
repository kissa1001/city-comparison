angular.module("city-comp")
.service("flickrAPI",["$http","$q",function($http, $q){

    this.getPhotos = function(city){
      var url = "https://api.flickr.com/services/rest";
      var defer = $q.defer();
      var params = {
        method: "flickr.photos.search",
        api_key: "64aff55713b85a93da08bc624e8e3f61",
        tags: city,
        format: "json",
        sort: "relevance",
        page: 1,
        nojsoncallback: 1
      };

      $http({
        method: "GET",
        url: url,
        params: params
      })
      .success(function(data, status, headers, config) {
        if(typeof data.status == "object") {
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