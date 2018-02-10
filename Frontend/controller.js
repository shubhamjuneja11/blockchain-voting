app.controller("electionsCtr", function ($scope, resultFact) {
    $scope.electionHeading = "Welcome to the Elections List";

    $scope.findnow = function () {
        console.log("calling server");
        var promise = resultFact.callserver();
        promise.then(function (data) {
            $scope.result = data.data;
            console.log($scope.result);
            $scope.id = data.id;
            $scope.name = data.name;
        }, function (error) {
            $scope.result = error;
        });
    }
})
