app.controller('SearchCtrl', function($scope, $http, $location, $sce)
{
    var recipes = {"attribution":{"html":"Recipe search powered by <a href='http://www.yummly.com/recipes'><img alt='Yummly' src='http://static.yummly.com/api-logo.png'/></a>","url":"http://www.yummly.com/recipes/","text":"Recipe search powered by Yummly","logo":"http://static.yummly.com/api-logo.png"},"totalMatchCount":54195,"facetCounts":{},"matches":[{"imageUrlsBySize":{"90":"http://lh3.googleusercontent.com/y3vyE83UJ6kS3JrmL0QMmMwyqkWaYhpAch8H9LSvqOlNShCfwfU9HW5EcgiCUHdnDUPTQd4BROIlT4TVrzoY3w=s90-c"},"sourceDisplayName":"Pumpkin N Spice","ingredients":["yellow onion","butter","beef broth","garlic powder","bay leaf","french bread","gruyere cheese"],"id":"French-Onion-Soup-1057922","smallImageUrls":["http://lh3.googleusercontent.com/E6SuZPtnddAfybTDoT5hBjVj0cRX4GgLfS8LsF6Kk9RLbxL6uwPWFuOIczk9NM_d8iz-81-R2p-uzMui7qrDJn0=s90"],"recipeName":"French Onion Soup","totalTimeInSeconds":5400,"attributes":{"course":["Soups"],"cuisine":["French"]},"flavors":null,"rating":4},{"imageUrlsBySize":{"90":"http://lh3.ggpht.com/WZVrSaI2Vwez2NGr9H7i8Hjl2gPOb0aH_Hg59HyPJVxM1gWvNHJaSkKuq_2fMBlCIIF3zguLy0FFhqig9DyLfE0=s90-c"},"sourceDisplayName":"Williams-Sonoma","ingredients":["unsalted butter","yellow onion","all-purpose flour","dry white wine","beef stock","fresh thyme","bay leaf","freshly ground pepper","kosher salt","baguette","gruyere cheese"],"id":"French-Onion-Soup-1019866","smallImageUrls":["http://lh3.ggpht.com/Vv8xtau366WODd2AlTZmTaAeb5JWhskoe5XMMi7c2PnQJtPUdtBZwwRxX0iN8KqFRyRkEWHzSmxLu969he09Ag=s90"],"recipeName":"French Onion Soup","totalTimeInSeconds":3900,"attributes":{"course":["Soups"],"cuisine":["French"]},"flavors":{"salty":0.3333333333333333,"sour":0.16666666666666666,"sweet":0.16666666666666666,"bitter":0.16666666666666666,"meaty":0.16666666666666666,"piquant":0.16666666666666666},"rating":3},{"imageUrlsBySize":{"90":"http://lh3.googleusercontent.com/Qwdx5iE03hZKIm7Q2A4KhgkViUDXZV7hri_cRaVqj0ogwlBGSnMlOt_hOW_G6FIlirvn7uqXVB2QRnKFe2cmEg=s90-c"},"sourceDisplayName":"Flavorite","ingredients":["butter","onions","beef broth","dry sherry","croutons","gruyere cheese","thyme","pepper","salt"],"id":"French-Onion-Soup-1067606","smallImageUrls":["http://lh3.googleusercontent.com/IKBPCUmGl2pXGIec0_tJvmqjsZSKggQKawVqotqZC7NOxvIDj86c76fjn56rZv_hhIcUNhKBwbPp7-_g38e_fw=s90"],"recipeName":"French Onion Soup","totalTimeInSeconds":3300,"attributes":{"course":["Soups"],"cuisine":[]},"flavors":null,"rating":4},{"imageUrlsBySize":{"90":"http://lh3.googleusercontent.com/cGJ6t-vMjiZMSPBGBiIaLXNiJfnNHzJ4KNYPGVb2e8lumoliV7DqGn1roi5rVF6DYQBMLvM9pZlrIHDY5HTccYA=s90-c"},"sourceDisplayName":"Simple Plate","ingredients":["unsalted butter","yellow onion","ground black pepper","kosher salt","baguette","beef broth","bay leaf","grated Gruyère cheese"],"id":"Perfect-French-Onion-Soup-1054658","smallImageUrls":["http://lh3.googleusercontent.com/NXfkeWjKfgTTPkXkDNjLOUoIkEcM-qkv1sKR0OWpHLaoD9f9_9jDsEt8q85Yxb6oGOCXatJBRKfKLorZCCDLFw=s90"],"recipeName":"Perfect French Onion Soup","totalTimeInSeconds":4800,"attributes":{"course":["Soups"],"cuisine":["French"]},"flavors":null,"rating":4},{"imageUrlsBySize":{"90":"http://lh3.googleusercontent.com/SrKvGUTi9EWCDUHOrNufLH3O_VLAtQadlBxnM7RfwcyVODQlP_54Fiw77tnubtp19o2IrPeQ90avqiEmOMyXSqw=s90-c"},"sourceDisplayName":"Blogger Conference","ingredients":["onions","sugar","oil","beef broth","french bread","gruyere cheese","dry white wine"],"id":"French-Onion-Soup-1053089","smallImageUrls":["http://lh3.googleusercontent.com/NW_Xl66pC8Qel_Ua7AgyEG5mwhVZchEMVdnBTgYQdEmkNi3W4ZuFV3lNcIpoulfRGwOnC44dFApiA-URXUNCKw=s90"],"recipeName":"French Onion Soup","totalTimeInSeconds":3000,"attributes":{"course":["Soups"],"cuisine":[]},"flavors":{"salty":0.6666666666666666,"sour":0.16666666666666666,"sweet":0.16666666666666666,"bitter":0.16666666666666666,"meaty":0.16666666666666666,"piquant":0.0},"rating":4},{"imageUrlsBySize":{"90":"http://lh4.ggpht.com/cmSwKhifUjWgEwz7NB8oeBUSNoDyInq2MT1cDSk1vrWBOGWgLlYSH8Q2KmEFTz-eOu5rcgILKMUDiRqDqSLAsw=s90-c"},"sourceDisplayName":"Creme de la Crumb","ingredients":["yellow onion","butter","minced garlic","beef broth","bay leaf","french bread","gruyere cheese"],"id":"Slow-Cooker-French-Onion-Soup-992072","smallImageUrls":["http://lh3.ggpht.com/jknHHVjxvbmbPlWURXCHpVMPaL5Wb--pSbhW2xjFrKxOzxQhWICCifXi5ZiMBKPRhrWsIe04hmeKb4rxWRiHXg=s90"],"recipeName":"Slow Cooker French Onion Soup","totalTimeInSeconds":16200,"attributes":{"course":["Soups"],"cuisine":[]},"flavors":null,"rating":4},{"imageUrlsBySize":{"90":"http://lh3.googleusercontent.com/LdLMvlynE6cRLAaMVB4t67sbZfSyuF0G1_zcqjrfjEJRMwOjdGVpIXpuulpPYYGY1SNH7iVtyfkX4Bsrnlf9Mg=s90-c"},"sourceDisplayName":"Tasting Table","ingredients":["water","dried shiitake mushrooms","canola oil","white onion","purple onion","gruyere cheese","provolone cheese","toasted baguette"],"id":"Irish-American-Onion-Soup-1061263","smallImageUrls":["http://lh3.googleusercontent.com/pSibMyH3CVAY0IlXHZOS5PJCll3ix1nAd5_O7UM8hNAGyoaoYjMPddbo0j58KMYAx22BHnqRIwZYnH6-BieOGQ=s90"],"recipeName":"Irish American Onion Soup","totalTimeInSeconds":4500,"attributes":{"course":["Soups"],"cuisine":[]},"flavors":{"salty":0.16666666666666666,"sour":0.16666666666666666,"sweet":0.16666666666666666,"bitter":0.16666666666666666,"meaty":0.16666666666666666,"piquant":0.0},"rating":3},{"imageUrlsBySize":{"90":"http://lh6.ggpht.com/zsslGXJGj-edRxtHXfr2EFpaqDI-2C9A4mabXRI3rHsO5hobLW8cvLEwrIqtf2k65-Mc8KYNw2B_MIBgfnG_pw=s90-c"},"sourceDisplayName":"Pioneer Dad","ingredients":["butter","olive oil","onions","salt","sugar","flour","homemade beef stock","dry white wine","french bread","grated Gruyère cheese"],"id":"French-Onion-Soup-1012156","smallImageUrls":["http://lh6.ggpht.com/0c6AFQHBA6mIJn7kCJk-48gKcWLlkr1LNgXCDLEnMTPXFCSOyiO6Tf5utQ-MFr6fNeyRN6soB6Umg32DUborYw=s90"],"recipeName":"French Onion Soup","totalTimeInSeconds":8700,"attributes":{"course":["Soups"],"cuisine":["French"]},"flavors":null,"rating":4},{"imageUrlsBySize":{"90":"http://lh6.ggpht.com/tPkx33a73iu9gbKxuUntVvUx9nQqPl_F6OUOf9Tk24CeKuB5Yqugk9UC5Koopfyb8eeUwHdPSbqKjqjTaz2FIyY=s90-c"},"sourceDisplayName":"The Comfort of Cooking","ingredients":["butter","sweet onion","low sodium beef broth","dry white wine","water","garlic cloves","bay leaf","dried thyme","fresh thyme","sugar","french baguette","reduced fat swiss cheese"],"id":"Light-_-Easy-French-Onion-Soup-485455","smallImageUrls":["http://lh4.ggpht.com/4WJBg_rETNcCCPEc2bOk8f5wZC1HE-yHHJJlqYL3wnGdCCuvsF13dqjjSV4H8sjaWi0sqSzVn6iWwilExJ70Pvc=s90"],"recipeName":"Light & Easy French Onion Soup","totalTimeInSeconds":2400,"attributes":{"course":["Soups"],"cuisine":["French"]},"flavors":{"sweet":0.6666666666666666,"sour":0.6666666666666666,"salty":0.16666666666666666,"piquant":0.0,"meaty":0.16666666666666666,"bitter":0.16666666666666666},"rating":4},{"imageUrlsBySize":{"90":"http://lh4.ggpht.com/ixxh0_OIY3ryqh_yeQW-H9GpqmFvAqx97ySJ9KxDrCDSqJXMF2gv_l5BRDoUFO-iZ-nL3xV_FCAlMi2siGJSxA=s90-c"},"sourceDisplayName":"Martha Stewart","ingredients":["unsalted butter","spanish onion","coarse salt","ground black pepper","baguette","sherry","white wine vinegar","red wine","gruyere cheese"],"id":"Traditional-French-Onion-Soup-Martha-Stewart-239175","smallImageUrls":["http://lh5.ggpht.com/VXOZlek8gKPsjJ3BFvZElQdIEkD4-dJNS_4RJvb-m-YDsxIg2Z7tAHRAc0GO4HUiiLtsbNketLvGO19cVLGKC38=s90"],"recipeName":"Traditional French Onion Soup","totalTimeInSeconds":null,"attributes":{"course":["Soups"],"cuisine":["French"]},"flavors":{"piquant":0.0,"meaty":1.0,"sour":1.0,"bitter":1.0,"salty":1.0,"sweet":0.8333333333333334},"rating":5}],"criteria":{"excludedIngredients":null,"allowedIngredients":null,"terms":null}};
    $scope.recipes = recipes.matches;
    $scope.search = function (recipe) {
        var params = {
            _app_id: "6e96cfda",
            _app_key: "555f5bd10dffba7229ea6a9ec32c0705",
            callback: "JSON_CALLBACK"
        }
        $.extend(params, recipe);
        $http.jsonp('http://api.yummly.com/v1/api/recipes?' + $.param(params))
        .success(function (response) {
            $scope.recipes = response.matches;
        })
        .error(function (data) {
            console.log(data);
        });
    }

    $scope.formatIngredients = function(ingredients) {
        var ingredientList = ingredients.join(", ");
        var pWidth = $('.ingredient-list').width();
        var charWidth = 2.45;
        var maxChars = Math.floor((pWidth-100)/charWidth);
        if (ingredientList.length > maxChars) {
            ingredientList = ingredientList.substring(0, maxChars-3);
            var lastComma = ingredientList.lastIndexOf(",")
            ingredientList = ingredientList.substring(0, lastComma);
            ingredientList += "...";
        }
        return ingredientList;
    }

    $scope.formatTime = function(time) {
        time = parseInt(time);
        var hrs = Math.floor(time/3600);
        var min = Math.floor((time%3600)/60);
        var timeStr = hrs ? hrs + " hr, " + min + " min" : min + " min";
        return timeStr;
    }

    $scope.setRating = function(rating) {
        var i = 1;
        var stars = '';
        for(i; i <= 5; i++) {
            if (i <= rating) {
                stars += '<span class="fa fa-star"/>';
            } else {
                stars += '<span class="fa fa-star-o"/>';
            }
        }
        return stars
    }

    $scope.trust = $sce.trustAsHtml;
});