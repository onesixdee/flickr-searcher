angular
	// initialize app module called FlickrApp
	.module('FlickrApp', [])
	// 	initialize config to make CORS Request
	// 	configure defaults on the $httpProvider object
	.config(function($httpProvider){
		$httpProvider.defaults.useXDomain = true;
	})
	// initialize controller called SearchController 
	// that takes two parameters of $http and $sce
	.controller('SearchController', function($http, $sce){ 

		// declare a variable controller syntax as vm to = this
		var vm = this;



		// declare a function to getImages that takes the variable tag as an argument
		vm.getImages = function(searchTag){
			// 	declare a variable called searchtag to capture user's input
			vm.searchTag = searchTag;

			// declare a variable url to = endpoint : https://api.flickr.com/services/rest
			var url = 'https://api.flickr.com/services/rest'

			// 	declare a request object that holds the query parameters
			var request = {
			    method: 'flickr.photos.search',
			    api_key: "24baf8bbf88eb2cfebccf7d27808233f",
			    tags: searchTag,
			    format: 'json',
			    nojsoncallback: 1
			}

			// initialize the GET Request
			$http({
				method: 'GET',
				url: url,
				params: request
			})
			// declare a then method that takes in a response
			// the data key: response.data.photos.photo
			.then(function(response){
				vm.results = response.data.photos.photo;
			},
			function(response){
				alert('error')
			})
		}

	})




