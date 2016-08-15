angular.module('movieSearchApp')
    .directive('enterSearch', function ($location,$q, searchMovie) {
        return function (scope, element, attrs) {
            element.bind("keydown", function (event) {
                if (event.which === 13) {
                    if (element.val() != '') {
                        $('.alert-tip').slideUp('show');
                        scope.parameter = element.val();
                        $q.all([
                            searchMovie.searchPersonAndMovie(scope.parameter, 1)
                         ]).then(function() {
                            $location.path('/search');
                        })


                    }
                }
            });
        };
    })
    .directive('getMovie', function ($location, searchMovie) {
        return function (scope, element, attrs) {
            element.bind("click", function (event) {
                window.location = '#/movie/'+attrs.id;
            });
        };
    });
