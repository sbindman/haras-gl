var app = angular.module("myApp")
    .service("mapService", function ($http, $q, $stateParams, $state, stateService, dataService) {

        var mapService = {};
        var _matchHash = {}; // private static var for findGeoJsonFeaturesByName

        // initialize the map service
        mapService.init = function (map) {

            // assign the instantiated map to our map variable
            mapService.map = map;

            //set state params if empty
            if ($stateParams.lat === '' || $stateParams.lng === '' || $stateParams.zoom === '' || $stateParams.style === '') {
                $stateParams.lat = $stateParams.lat || 47.6671;
                $stateParams.lng = $stateParams.lng || -122.3829;
                $stateParams.zoom = $stateParams.zoom || 15.23;
            }

            // set map zoom
            mapService.map.setZoom($stateParams.zoom);

            // set the map center
            mapService.map.setCenter([$stateParams.lng, $stateParams.lat]);

            // update the url if it was empty of lat,lng,zoom or style params
            if ($stateParams.lat === '' || $stateParams.lng === '' || $stateParams.zoom === '' || $stateParams.style === '') {

                stateService.setState('map', $stateParams);
            }

            //when the map stops moving do this
            mapService.map.on('move', function () {
                var lat = map.getCenter().lat.toFixed(4);
                var lng = map.getCenter().lng.toFixed(4);
                var zoom = map.getZoom().toFixed(2);

                if ($stateParams.lat !== lat || $stateParams.lng !== lng || $stateParams.zoom !== zoom) {
                    $stateParams.lat = lat;
                    $stateParams.lng = lng;
                    $stateParams.zoom = zoom;
                    $state.go('map', $stateParams, {
                        // prevent the events onStart and onSuccess from firing
                        notify: false,
                        // prevent reload of the current state
                        reload: false,
                        // replace the last record when changing the params so you don't hit the back button and get old params
                        location: 'replace',
                        // inherit the current params on the url
                        inherit: true
                    })
                }
            });
        }

        // get geojson for markers from the database
        mapService.getMarkers = function() {
                var deferred = $q.defer();

                $http.get('api/markers_json')
                    .then(function (response) {
                        deferred.resolve(response);

                    }, function (response) {
                        deferred.reject(response);
                    });

                return deferred.promise;
        }

        // get geojson for markers from the database
        mapService.saveMarker = function() {
                var deferred = $q.defer();

                $http.get('api/save_marker')
                    .then(function (response) {
                        deferred.resolve(response);

                    }, function (response) {
                        deferred.reject(response);
                    });

                return deferred.promise;
        }


        return mapService;


    });

