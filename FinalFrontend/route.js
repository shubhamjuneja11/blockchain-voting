app.config(function ($routeProvider) {
    $routeProvider.when("/elections", {
        templateUrl: "mobiles.html",
        controller: "myctrl"
    }).when("/results", {
        templateUrl: "tablets.html",
        controller: "tabletctrl"

    });

});
