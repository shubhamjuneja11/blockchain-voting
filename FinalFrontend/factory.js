app.factory("resultFact", function ($http, $q) {
    var object = {};
    console.log("hi");
    object.callserver = function () {
        var defered = $q.defer();
        console.log("hi");
        console.log("starting fact");
        var url = "electionList.json";
        $http.get(url).then(success, fail);

        function success(data) {
            defered.resolve(data);
            // console.log(data);
        }

        function fail(error) {
            defered.reject(error);
        }
        return defered.promise;
    }
    return object;
})

app.factory("electionResultFact", function ($http, $q) {
    var object = {};
    console.log("hi");
    object.callserver = function () {
        var defered = $q.defer();
        //console.log("hi");
        // console.log("starting fact");
        var url = "result.json";
        $http.get(url).then(success, fail);

        function success(data) {
            defered.resolve(data);
            console.log(data);
        }

        function fail(error) {
            defered.reject(error);
        }
        return defered.promise;
    }
    return object;
})
