app.controller("DetailsCtrl", function ($scope, $http, $routeParams, $location) {
    // save recipeId as var for later use 
    var recipeId = $routeParams.recipeId;

    // call to Yummly api to get full recipe for specific recipeId
    var params = {
        _app_id: "6e96cfda",
        _app_key: "555f5bd10dffba7229ea6a9ec32c0705",
        callback: "JSON_CALLBACK"
    }
    $scope.getRecipe = function (recipeId) {
        $http.jsonp("http://api.yummly.com/v1/api/recipe/" + recipeId + "?" + $.param(params))
        .success(function (response) {
            $scope.recipe = response;
        })
        .error(function (data) {
            $scope.errorMessage = data;
        });
    } 
    $scope.getRecipe(recipeId);

    // fetch the reviews list after saving a new reivew
    $scope.refreshReviews = function()
    {
        $http.get("/reviewsByRecipe/" + recipeId)
        .success( function(res) {
            $scope.reviews = res;
        });
    }

    // initial load of reviews
    $scope.refreshReviews();

    // save review to our review collection with relevant details
    $scope.saveReview = function(review)
    {
        if (!review) {
            $scope.errorMessage = "Please write a review before submitting."
        } else {
            review.username = $scope.user.username;
            review.recipeId = $scope.recipe.id;
            review.recipeName = $scope.recipe.name;
            $http.post('/review', review)
            .success(function(response) {
                $scope.refreshReviews();
                $scope.hideReivewForm();
            })
            .error(function(data) {
                $scope.errorMessage = data;
            });
        }
    }

    // after user leaves a review, hide the form and let them know the review was saved
    $scope.hideReivewForm = function()
    {
        var reviewForm = $("#review-form");
        reviewForm.hide();
        $scope.errorMessage = ""
        $scope.successMessage = "Thank you for submitting a review."
    }

});
