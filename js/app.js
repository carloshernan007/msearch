/**
 * Setting of application
 */
angular.module('movieSearchApp',[
    "ngRoute",
    'ui.bootstrap'
])
.run(function ($rootScope) {
    $rootScope.config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    };
    $rootScope.parameter = null;
    $rootScope.genres = [];

})
.config(function($routeProvider){

    $routeProvider
        .when('/',{
            controller : "MainController",
            templateUrl: "js/movie/template/home.html"
        })
        .when('/search',{
            controller : "SearchController",
            templateUrl: "js/movie/template/search.html"
        })
        .when('/person',{
            controller : "PersonController",
            templateUrl: "js/movie/template/person.html"
        })
        .when('/person/popular',{
            controller : "personController",
            templateUrl: "js/movie/template/personPopular.html"
        })
        .when('/person/:person_id',{
            controller : "PersonMoviesController",
            templateUrl: "js/movie/template/personMovies.html"
        })
        .when('/movie/popular',{
            controller : "moviesPopularController",
            templateUrl: "js/movie/template/moviePopular.html"
        })
        .when('/movie/:movie_id',{
            controller : "moviesController",
            templateUrl: "js/movie/template/movie.html"
        })


});

