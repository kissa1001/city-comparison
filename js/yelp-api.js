

angular.module('city-comp')
.service("yelpAPI",['$http', function($http) {
  var self = this;
  this.retrieveYelp = function(location1, callback) {
   var method = 'GET';
   var url = 'http://api.yelp.com/v2/search';
   var params = {
     callback: 'angular.callbacks._0',
     location: location1,
     oauth_consumer_key: '70cg22kSE5QmqSSzOYYZRg', //Consumer Key
     oauth_token: 'ahmbX-xqXqw_toHsXleKAzrf1Sk6REi-', //Token
     oauth_signature_method: "HMAC-SHA1",
     oauth_timestamp: new Date().getTime(),
     oauth_nonce: self.randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
     term: 'things%to%do'
    };
   var consumerSecret = 'heOQIZxX-GGkjlLIEgHER1l_vSw'; //Consumer Secret
   var tokenSecret = 'yLF08JP6JMsw7h5K28phXvfYFOM'; //Token Secret
   var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, { encodeSignature: false});
   params['oauth_signature'] = signature;
   $http.jsonp(url, {params: params}).success(callback);
  }
  this.randomString = function(length, chars){
    var result = '';
     for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
      return result;
  }
}]);
