angular.module('city-comp',['ngSanitize']);

angular.module('city-comp')
.controller('mainCtrl',['$scope', 'autocomplete1', 'autocomplete2','teleportAPI','$sce','yelpAPI','flickrAPI','youtubeAPI',
	function($scope, autocomplete1, autocomplete2, teleportAPI,$sce,yelpAPI,flickrAPI,youtubeAPI){
		$scope.embedUrl = "http://www.youtube.com/embed/";
		$scope.renderHtml = function (htmlCode) {
			return $sce.trustAsHtml(htmlCode);
		};
		$scope.trustSrc = function(src) {
			return $sce.trustAsResourceUrl(src);
		};
		$scope.percentage = function(score){
			return ((score/10)*100).toFixed(2);
		}
		$scope.compare = function(){
			$scope.filledCity = true;
			$scope.average = function(array){
				var sum = 0;
				for(i = 0; i<array.length; i++){
					sum += array[i].score_out_of_10;
					avg = sum/array.length;
				}
				return ((avg/10)*100).toFixed(2);
			}
			if($scope.average($scope.city1Info.categories) > $scope.average($scope.city2Info.categories)){
				yelpAPI.retrieveYelp($scope.city1Basic.name + "," + $scope.city1Basic.admin1DivisionCode, function(data) {
					$scope.winnerPlaces = data.businesses;
					console.log($scope.winnerPlaces);
					$scope.winner = $scope.city1Basic.name + "," + $scope.city1Basic.admin1DivisionCode;
					$scope.looser = $scope.city2Basic.name + "," + $scope.city2Basic.admin1DivisionCode;
				});
			}
			else{
				yelpAPI.retrieveYelp($scope.city2Basic.name + "," + $scope.city2Basic.admin1DivisionCode, function(data) {
					$scope.winnerPlaces = data.businesses;
					console.log($scope.winnerPlaces);
					$scope.winner = $scope.city2Basic.name + "," + $scope.city2Basic.admin1DivisionCode;
					$scope.looser = $scope.city1Basic.name + "," + $scope.city1Basic.admin1DivisionCode;
				});
			}
		}
		$scope.reset = function(){
			$scope.filledCity = false;
		}
		autocomplete1.on('change', function(value) {
			console.log(value);
			$scope.city1Basic = value;
			if(value.uaSlug === undefined){
				$scope.error1 = true;
			}
			else{
				$scope.validCity1 = true;
			}
			teleportAPI.getCityInfo(value.uaSlug).then(function(result){
				$scope.city1Info = result;
				console.log($scope.city1Info);
			})

			teleportAPI.getCityImg(value.uaSlug).then(function(result){
				$scope.city1Img = result.photos[0].image.web;
				console.log($scope.city1Img);
			})
			//Google Static Maps API
			$scope.city1Map = "https://maps.googleapis.com/maps/api/staticmap?center=" + value.name + "," + value.admin1DivisionCode + "&zoom=10&size=230x250&roadmap&key=AIzaSyBD1-sGnREhhLAout5UUgMw4CihhLJmGPA";
			flickrAPI.getPhotos(value.name + "," + value.admin1DivisionCode).then(function(response) {
				$scope.city1Photos = response.photos.photo;
				console.log ($scope.city1Photos);
			})
			youtubeAPI.getVideos(value.name + "," + value.admin1DivisionCode).then(function(res){
				$scope.city1Videos = res.items;
				console.log ($scope.city1Videos);
			})
		})

		autocomplete2.on('change', function(value) {
			console.log(value);
			$scope.city2Basic = value;
			if(value.uaSlug === undefined){
				$scope.error2 = true;
			}
			else{
				$scope.validCity2 = true;
			}
			teleportAPI.getCityInfo(value.uaSlug).then(function(result){
				$scope.city2Info = result;
				console.log($scope.city2Info);
			})

			teleportAPI.getCityImg(value.uaSlug).then(function(result){
				$scope.city2Img = result.photos[0].image.web;
				console.log($scope.city2Img);
			})
			//Google Static Maps API
			$scope.city2Map = "https://maps.googleapis.com/maps/api/staticmap?center=" + value.name + "," + value.admin1DivisionCode + "&zoom=10&size=230x250&roadmap&key=AIzaSyBD1-sGnREhhLAout5UUgMw4CihhLJmGPA";
			flickrAPI.getPhotos(value.name + "," + value.admin1DivisionCode).then(function(response) {
				$scope.city2Photos = response.photos.photo;
				console.log ($scope.city2Photos);
			})
			youtubeAPI.getVideos(value.name + "," + value.admin1DivisionCode).then(function(res){
				$scope.city2Videos = res.items;
				console.log ($scope.city2Videos);
			})
		})
	}]);