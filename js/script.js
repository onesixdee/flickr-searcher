angular
	// initialize app module called FlickrApp
	.module('FlickrApp', ['ngMessages', 'ngAnimate'])
	// 	initialize config to make CORS Request
	// 	configure defaults on the $httpProvider object
	.config(["$httpProvider", function($httpProvider){
		$httpProvider.defaults.useXDomain = true;
	}])
	// initialize controller called SearchController 
	// that takes parameters of $http $sce, and $q
	//setting parameters in array for minifying purposes
	.controller('SearchController', ["$http", "$sce", "$q", function($http, $sce, $q){ 
		// declare a variable controller syntax as vm to = this
		var vm = this;
		// tells Angular that the URLs are safe
		// vm.trustSrc = function(src) {
		//   return $sce.trustAsResourceUrl(src);
		// }

		// declare a function to getImages that takes the variable searchtag as an argument
		vm.getImages = function(searchTag){
			
			// declare a variable called searchtag to capture user's input
			vm.searchTag = searchTag;
			// declare a variable url that takes in the REST Endpoint URL
			var url = 'https://api.flickr.com/services/rest'
			var api_key = '24baf8bbf88eb2cfebccf7d27808233f'
			//declare a request object that holds the query parameters
			var request = {
				//api method to search for photos
			    method: 'flickr.photos.search',
			    api_key: api_key,
			    tags: searchTag,
			    format: 'json',
			    nojsoncallback: 1
			}
			//
			vm.getFlickrAPI(url, request).then(function(data){
					console.log(arguments)
					vm.results = data;
				}, 
				function(error){
					console.log(arguments, 'error')
				}
			)
			
			// Set back to pristine.
			vm.appForm.$setPristine();
		}

		vm.getFlickrAPI = function(url, request){
			// initialize a defer object
			var defer = $q.defer()
			//$http service to request to read the flickr database
			$http({
				method: 'GET',
				url: url,
				params: request
			})
			// declare a then method that takes in a response
			.then(function(response){
				//if request is successful, promise will respond with the photos object
				defer.resolve(response.data.photos.photo)
			},
			function(response){
				//if request is unsuccessful, promise wil reject the request
				defer.reject(response)
			})
			//promise will display the photos if request was successful
			return defer.promise
		}

	}])


