angular.module("movieSearchApp")
    .filter("pathUrl",function(){
        return function (pathImg) {
            var noFound = 'http://dummyimage.com/155x232/CCC/ffffff&text=NO+FOUND';
            if(pathImg == null){
                return noFound;
            }else{
                return 'http://image.tmdb.org/t/p/w185_and_h278_bestv2/' + pathImg;
            }
        }
    })

    .filter("pathUrlMini",function(){
        return function (pathImg) {
            var noFound = 'http://dummyimage.com/45x45/CCC/ffffff&text=NO+FOUND';
            if(pathImg == null){
                return noFound;
            }else{
                return 'http://image.tmdb.org/t/p/w45/' + pathImg;
            }
        }
    })

    .filter("pathUrlMedium",function(){
        return function (pathImg) {
            var noFound = 'http://dummyimage.com/155x232/CCC/ffffff&text=NO+FOUND';
            if(pathImg == null){
                return noFound;
            }else{
                return 'https://image.tmdb.org/t/p/w370_and_h556_bestv2/' + pathImg;
            }
        }
    })

    .filter("clean",function(){
        return function (name) {
            name =  name.replace("t:person", "");
            return name.replace("t:movie", "")
        }
    })

