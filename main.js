var foodieApp = angular.module('foodieApp',['ngRoute']);
foodieApp.config(function ($routeProvider) {
	$routeProvider
	.when('/',{
		templateUrl: 'pages/login.html',
		controller: 'loginController'
	})
	.when('/home',{
		templateUrl: 'pages/main.html',
		controller: 'mainController'
	})
	.when('/restaurant/:id',{
		templateUrl: 'pages/restaurant.html',
		controller: 'restaurantController'
	})
});

foodieApp.controller('mainController',function($scope) {
	$scope.restaurants = [{
		name: 'Farzi Cafe',
		address: '38/39, Level 1, Block E , Inner Circle, Connaught Place',
		location: 'Connaught Place',
		category: 'Casual Dining, Bar',
		vote: '4.2',
		cuisines: 'Modern Indian',
		cost: '2200',
		hours: '12 Noon to 1 AM (Mon-Sun)',
		image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg',
		id:'1'
		},
	{
		name: 'Gourmet Nine',
		address: '38/39, Level 1, Block A, Connaught Place',
		location: 'Connaught Place',
		category: 'Fine Dining, Bar',
		vote: '4.8',
		cuisines: 'Modern Indian, Italian',
		cost: '1200',
		hours: '11 Noon to 1 AM (Mon-Sun)',
		image: 'http://cdn.venuelook.com/uploads/space_7490/1480922119_204x158.png',
		id: '2'
	}]
})

foodieApp.controller('loginController',function($scope,$location) {

	$scope.goToHome = function() {
		console.log($location.url('home'));
		$location.url('home');
	}

})

foodieApp.controller('restaurantController',function($scope,$routeParams,$http) {
	//Empty
	$scope.restaurantId = $routeParams.id;
	var restaurants = [{
		name: 'Farzi Cafe',
		address: '38/39, Level 1, Block E , Inner Circle, Connaught Place',
		location: 'Connaught Place',
		category: 'Casual Dining, Bar',
		vote: '4.2',
		cuisines: 'Modern Indian',
		cost: '2200',
		hours: '12 Noon to 1 AM (Mon-Sun)',
		image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg',
		id:'1',
		bestDish: {
			name: 'Corn Pizza',
			image: 'http://www.hindimeaning.com/pictures/fruits/banana.jpg?x47669'
		}
	},

	{
		name: 'Gourmet Nine',
		address: '38/39, Level 1, Block A, Connaught Place',
		location: 'Connaught Place',
		category: 'Fine Dining, Bar',
		vote: '4.8',
		cuisines: 'Modern Indian, Italian',
		cost: '1200',
		hours: '11 Noon to 1 AM (Mon-Sun)',
		image: 'http://cdn.venuelook.com/uploads/space_7490/1480922119_204x158.png',
		id: '2',
		bestDish: {
			name: 'Spinach Dimsums',
			image: 'http://finedininglovers.cdn.crosscast-system.com/BlogPost/l_3377_StockFood-00193424cut.jpg'
		}
	}]
	$scope.restaurant = restaurants[$routeParams.id - 1];
	$scope.getIngredients = function(url) {
		var data = '{"inputs":[{"data":{"image":{"url":"' + url + '"}}}]}';
		$http({
			'method': 'POST',
			'url': 'https://api.clarifai.com/v2/models/bd367be194cf45149e75f01d59f77ba7/outputs',
			'headers': {
				'Authorization': 'Key b19c326c5f07417ea4aad597ac173c81',
				'Content-Type': 'application/json'
			},
			'data': data
		}).then(function (response) {
				console.log(response);
				var ingredients = response.data.outputs[0].data.concepts;				
	  			for (var i =0;i<ingredients.length;i++) {
	  				$scope.ingredients.push(ingredients[i].name);
	  				$scope.probabilityvalue.push(ingredients[i].value);
	  			}
	    		

	        }, function (xhr) {
	        	console.log(xhr);
	        })
		}
		//7299
		$scope.ingredients = [];
		$scope.probabilityvalue=[];

		$scope.toDoList = function(){


			 var todoarray = angular.copy($scope.ingredients);

				$scope.todoList = [];
				for(var i = 0 ; i<todoarray.length; i++){
				  $scope.todoList.push({todoText:todoarray[i], done:false});		
				}
			   
			   $scope.remove = function() {
			       var oldList = $scope.todoList;
			       $scope.todoList = [];
			       angular.forEach(oldList, function(x) {
			           if (!x.done) $scope.todoList.push(x);
			       });
			   };

			   $scope.done = function() {

			   		console.log("hhhh");
			   	//	donee=!donee;
			   		//$.text-decoration: overline;

			   }



		}
	
})