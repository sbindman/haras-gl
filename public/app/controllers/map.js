angular.module('myApp')
    .controller('MapCtrl', function ($state, $stateParams, $scope, $http, $rootScope,
                                     dataService, mapService, stateService, ACCESS_TOKEN, $mdSidenav, $mdUtil, $log) {

        mapboxgl.accessToken = ACCESS_TOKEN;


        $scope.stateService = stateService;

        $scope.toggleRight = buildToggler('right');

        $scope.addPin = false;

        $scope.markerDetails = 'wakjfalsjfl;ksdajf';

        $scope.title = "Haras";

        $scope.stateService = stateService;

        $scope.toggleLeft = buildToggler('left');


        //set max bounds
        var bounds = [
            [-122.39391803741454, 47.66278613548988], //southwest
            [-122.37190246582031, 47.678015885941676] //northeast
        ];

        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/sbindman/cihqmqnc30041npm4kqntmlkm',
            center: [-122.384745, 47.669119],
            zoom: 17
        });



        mapService.init(map);


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

        $scope.toggleAddPin = function() {
            $scope.addPin = !$scope.addPin;
        }


        $scope.saveMarker = function() {
            mapService.saveMarker();
        }

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

        mapService.map.on('load', function () {
            
            //get markers from the database
            var db_markers = mapService.getMarkers().then(function(data) {
                //add source
                map.addSource("db_markers", {
                    "type": "geojson",
                    "data": data.data
                });
                //add circle layers
                map.addLayer({
                    "id": "db_markers",
                    "type": "circle",
                    "source": "db_markers",
                    "paint": {
                        "circle-color": "#CC140A"
                    }
                });

            });
        });

        mapService.map.on('click', function (e) {

            $scope.markerDetails = 'bana';

            var features = mapService.map.queryRenderedFeatures(e.point, {layers: ['db_markers']});

            if (features.length) {

                //open the show pin tab
                $scope.showPinDetails = true;

                //if features, open right panel
                stateService.openParam('right-panel');

                var feature = features[0];


                $scope.$apply(function () {
                    $scope.markerDetails = feature;
                });

                // var popup = new mapboxgl.Popup()
                //     .setLngLat(map.unproject(e.point))
                //     .setHTML(feature.properties)
                //     .addTo(map);

            }
            //if adding pin
            else if ($scope.addPin)  {

                $scope.showPinDetails = false;

                // only have one point on the map and move it if the user clicks a new location
                if (map.getLayer('point')) {
                    map.removeSource('point');
                    map.removeLayer('point');
                };
                
                // open right param
                stateService.openParam('right-panel');
                                
                //if no features, add marker
                map.addSource('point', {
                    "type": "geojson",
                    "data": {
                        "type": "FeatureCollection",
                        "features": [{
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": [e.lngLat.lng,e.lngLat.lat]
                            }
                        }]
                    }
                });

                map.addLayer({
                    "id": "point",
                    "type": "circle",
                    "source": "point",
                    "paint": {
                        "circle-radius": 10,
                        "circle-color": "#3887be"
                    }
                });
        
            }
            else {
               stateService.toggleParam('right-panel'); 
            }
        });


        $scope.myDate = new Date();
          $scope.minDate = new Date(
              $scope.myDate.getFullYear(),
              $scope.myDate.getMonth() - 2,
              $scope.myDate.getDate());
          $scope.maxDate = new Date(
              $scope.myDate.getFullYear(),
              $scope.myDate.getMonth() + 2,
              $scope.myDate.getDate());
          $scope.onlyWeekendsPredicate = function(date) {
            var day = date.getDay();
            return day === 0 || day === 6;
          }





    });

