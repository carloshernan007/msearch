angular.module('movieSearchApp')
    .service('searchMovie', function ($http, $location) {

        var _results = null;
        var _person = null;

        this.config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }

        this.searchPersonAndMovie = function (parameter, page) {
            var data = $.param({
                element: "searchPersonAndMovie",
                parameter: parameter,
                page: page
            });
            $http.post('./libreries/process.php', data, this.config)
                .success(function (json) {
                    _results = json;
                    if(json.person.total_results == 1){
                        $location.path('/person/'+json.person.results[0].id);
                    }
                    if (json.person.total_results > 1) {
                        $location.path('/person');
                    }
                })
                .error(function (err) {
                    console.log(err)
                });
        }
        this.getResult = function () {
            return _results;
        }
        this.getConfigAjax = function () {
           return this.config;
        }

    })
