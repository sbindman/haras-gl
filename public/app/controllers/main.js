angular.module('myApp').controller('MainCtrl', function ($scope, stateService, $timeout, $mdSidenav, $log, $mdUtil, $mdMedia, $rootScope, $stateParams, dataService, mapService) {
    $scope.title = "Haras";

    $scope.stateService = stateService;

    $scope.toggleLeft = buildToggler('left');


    $scope.close = function (location) {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(location).close()
            .then(function () {
                $log.debug("close " + location +" is done");
            });
    };

    $scope.open = function () {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav('left').open()
            .then(function () {
                $log.debug("open LEFT is done");
            });
    };

    function buildToggler(navID) {
        var debounceFn =  $mdUtil.debounce(function(){
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });
        },200);
        return debounceFn;
    }

});