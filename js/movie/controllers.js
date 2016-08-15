angular.module("movieSearchApp")
    .controller("MainController", function ($scope, $http, $rootScope) {
        $scope.popular = {};
        $scope.lastMovie = {};
        var data = $.param({
            element: "genres"
        });
        //get gerents
        if ($scope.$parent.genres.length == 0) {
            $http.post('./libreries/process.php', data, $scope.config)
                .success(function (json) {
                    $.each(json.genres, function (i, a) {
                        $rootScope.genres[a.id] = a.name;
                    })
                })
                .error(function (err) {
                    console.log(err)
                });
        }

        // Get the most popular
        var data = $.param({
            element: "popular"
        });
        $http.post('./libreries/process.php', data, $scope.config)
            .success(function (json) {
                $scope.popular = json.results;
            })
            .error(function (err) {
                console.log(err)
            });
        // Last movie
        var data = $.param({
            element: "lastmovie"
        });
        $http.post('./libreries/process.php', data, $scope.config)
            .success(function (json) {
                $scope.lastMovie = json.results;
            })
            .error(function (err) {
                console.log(err)
            });

        $scope.myInterval = 3000;
        $scope.slides = [
            {
                image: 'images/slider/1.jpg',
                id: '297761'
            },
            {
                image: 'images/slider/2.jpg',
                id: '153518'
            },
            {
                image: 'images/slider/3.jpg',
                id: '401132'
            }
        ];
    })
    /**
     * Search movies
     */
    .controller("SearchController", function ($scope, $q, $location, $http, searchMovie) {

        if ($scope.parameter1 == '' || $scope.parameter1 == undefined) {
            $location.path('/');
        }
        if ($scope.results == null && $scope.parameter1 != '') {
            var data = $.param({
                element: "searchPersonAndMovie",
                parameter: $scope.parameter1,
                page: 1
            });
            $q.all([
                $http.post('./libreries/process.php', data, $scope.config)
                    .success(function (json) {
                        $scope.results = json;
                        if (json.person.total_results > 1) {
                            $location.path('/person');
                        }
                    })
                    .error(function (err) {
                        console.log(err)
                    })
            ]).then(function () {
                $scope.results = $scope.results.movie;
                $scope.totalItems = $scope.results.total_results;
                if($scope.results.total_results == 1){
                    $location.path('/movie/'+ $scope.results.results[0].id);
                }
            });
        }
        $scope.currentPage = 1;
        $scope.itemsPerPage = 20;
        $scope.maxSize = 20;


        $scope.pageChanged = function () {
            var data = $.param({
                element: "searchMovie",
                parameter: $scope.parameter1,
                page: $scope.currentPage
            });
            $http.post('./libreries/process.php', data, $scope.config)
                .success(function (json) {
                    $scope.results = json;

                })
                .error(function (err) {
                    console.log(err)
                });
        }

    })
    /**
     * Search people
     */
    .controller("PersonController", function ($scope, $q, $http, $location, searchMovie) {

        $scope.results = searchMovie.getResult();
        if ($scope.results == null || $scope.parameter1 == '') {
            $location.path('/');
        }
        $scope.results = $scope.results.person;

        $scope.currentPage = 1;
        $scope.itemsPerPage = 20;
        $scope.maxSize = 10;
        $scope.totalItems = ($scope.results.total_results != undefined) ? $scope.results.total_results : 0;

        $scope.pageChanged = function () {
            var data = $.param({
                element: "searchPerson",
                parameter: $scope.parameter1,
                page: $scope.currentPage
            });

            $q.all([
                $http.post('./libreries/process.php', data, $scope.config)
                    .success(function (json) {
                        $scope.results = json;
                    })
                    .error(function (err) {
                        console.log(err)
                    })
            ]).then(function () {

            })

        }

    })
    /**
     * Get information of actor
     */
    .controller("PersonMoviesController",
        ['$scope',
            '$http',
            '$routeParams',
            '$location',
            'searchMovie',
            function ($scope, $http, $routeParams, $location, searchMovie) {

                if (parseInt($routeParams.person_id) > 0) {

                    var data = $.param({
                        element: "person",
                        parameter: $routeParams.person_id
                    });
                    $http.post('./libreries/process.php', data, $scope.config)
                        .success(function (json) {
                            $scope.response = json;
                        })
                        .error(function (err) {
                            console.log(err)
                        });

                } else {
                    $location.path('/');
                }

                $scope.getInfoMovie = function (movie_id) {
                    console.log(movie_id);
                    //$location.path('/movie/'+movie_id);
                }

            }])
    /**
     * Get movie info
     */
    .controller("moviesController",
        ['$scope',
            '$http',
            '$routeParams',
            '$location',
            'searchMovie',
            function ($scope, $http, $routeParams, $location, searchMovie) {
                var movie_id = parseInt($routeParams.movie_id);
                if (movie_id > 0) {
                    var data = $.param({
                        element: "getMovie",
                        parameter: movie_id
                    });
                    $http.post('./libreries/process.php', data, searchMovie.getConfigAjax())
                        .success(function (json) {
                            $scope.response = json;
                        })
                        .error(function (err) {
                            console.log(err)
                        });
                } else {
                    history.back(1);
                }
            }])
    /**
     * Popular people
     */
    .controller("personController",
        ['$scope',
            '$http',
            '$q',
            function ($scope, $http, $q) {
                var data = $.param({
                    element: "popularPeole",
                    page: 1
                });

                $q.all([
                    $http.post('./libreries/process.php', data, $scope.config)
                        .success(function (json) {
                            $scope.results = json;
                        })
                        .error(function (err) {
                            console.log(err)
                        })
                ]).then(function(){
                    $scope.currentPage = 1;
                    $scope.itemsPerPage = 20;
                    $scope.maxSize = 10;
                    $scope.totalItems = $scope.results.total_results;
                });

                $scope.pageChanged = function () {
                    var data = $.param({
                        element: "popularPeole",
                        page: $scope.currentPage
                    });

                    $q.all([
                        $http.post('./libreries/process.php', data, $scope.config)
                            .success(function (json) {
                                $scope.results = json;
                            })
                            .error(function (err) {
                                console.log(err)
                            })
                    ]).then(function () {

                    })
                }
            }])
    /**
     *  Popular movies
     */
    .controller("moviesPopularController",
        ['$scope',
            '$http',
            '$q',
            function ($scope, $http, $q) {
                var data = $.param({
                    element: "popularMovie",
                    page: 1
                });
                $scope.currentPage = 1;
                $scope.itemsPerPage = 20;
                $scope.maxSize = 10;

                $q.all([
                    $http.post('./libreries/process.php', data, $scope.config)
                        .success(function (json) {
                            $scope.results = json;
                        })
                        .error(function (err) {
                            console.log(err)
                        })
                ]).then(function(){
                    $scope.totalItems = $scope.results.total_results;
                    console.log($scope.results.total_results);
                });


                $scope.pageChanged = function () {
                    var data = $.param({
                        element: "popularMovie",
                        page: $scope.currentPage
                    });

                    $q.all([
                        $http.post('./libreries/process.php', data, $scope.config)
                            .success(function (json) {
                                $scope.results = json;
                            })
                            .error(function (err) {
                                console.log(err)
                            })
                    ]).then(function () {

                    })
                }
            }])




