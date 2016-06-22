angular.module("city-comp")
.service("youtubeAPI",["$http","$q",function($http, $q){

    this.getVideos = function(city){
      var url = "https://www.googleapis.com/youtube/v3/search";
      var defer = $q.defer();
      var params = {
        key: "AIzaSyCb3EOFPB9g7VsCxkGxTaJGX74a3opBbJI",
        part: "snippet",
        maxResults: 10,
        order: "relevance",
        q: city,
        type: "video",
        videoEmbeddable: true,
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