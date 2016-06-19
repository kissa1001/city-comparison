angular.module('city-comp',['ngSanitize']);

angular.module('city-comp')
.controller('mainCtrl',['$scope', 'autocomplete1', 'autocomplete2','teleportService','$sce',
	function($scope, autocomplete1, autocomplete2, teleportService,$sce){
		$scope.renderHtml = function (htmlCode) {
			return $sce.trustAsHtml(htmlCode);
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
		}

		$scope.reset = function(){
			$scope.filledCity = false;
		}

		autocomplete1.on('change', function(value) {
			console.log(value);
			$scope.city1Basic = value;
			teleportService.getCityInfo(value.uaSlug).then(function(result){
				$scope.city1Info = result;
				console.log($scope.city1Info);
			})

			teleportService.getCityImg(value.uaSlug).then(function(result){
				$scope.city1Img = result.photos[0].image.web;
				console.log($scope.city1Img);
			})
			//Google Static Maps API
			$scope.city1Map = "https://maps.googleapis.com/maps/api/staticmap?center=" + value.name + "," + value.admin1DivisionCode + "&zoom=10&size=230x250&roadmap&key=AIzaSyBD1-sGnREhhLAout5UUgMw4CihhLJmGPA";
		})

		autocomplete2.on('change', function(value) {
			console.log(value);
			$scope.city2Basic = value;
			teleportService.getCityInfo(value.uaSlug).then(function(result){
				$scope.city2Info = result;
				console.log($scope.city2Info);
			})

			teleportService.getCityImg(value.uaSlug).then(function(result){
				$scope.city2Img = result.photos[0].image.web;
				console.log($scope.city2Img);
			})

			//Google Static Maps API
			$scope.city2Map = "https://maps.googleapis.com/maps/api/staticmap?center=" + value.name + "," + value.admin1DivisionCode + "&zoom=10&size=230x250&roadmap&key=AIzaSyBD1-sGnREhhLAout5UUgMw4CihhLJmGPA";
		})
	}]);