app.controller("electionsCtr", function ($scope, resultFact, electionResultFact) {
    $scope.electionHeading = "Welcome to the Elections List";
    $scope.Results="RESULTS";
    $scope.findnow = function () {
        // console.log("calling server");
        var promise = resultFact.callserver();
        // var promise2 = electionResultFact.callserver();

        promise.then(function (data) {
            $scope.result = data.data;
            console.log($scope.result);
            $scope.id = data.id;
            $scope.name = data.name;
        }, function (error) {
            $scope.result = error;
        });
    }



    let myArray = [];
    $scope.viewResult = function (id) {
        console.log("calling server");

        var promise2 = electionResultFact.callserver();

        promise2.then(function (data) {
            $scope.result2 = data.data;

            console.log($scope.result2);
            console.log($scope.result2[id - 1]);
            $scope.finalResult = $scope.result2[id - 1];
            console.log(id);
            // console.log(id.party)
            $scope.result2.id = id;
            $scope.result2.party;
            //console.log($scope.result2[$event.target.id]);
            //$scope.electionResult = $scope.result2[$event.target.id];

            //console.log($scope.result2[$event.target.id]);

        }, function (error) {
            $scope.result = error;
        });
    }



})
