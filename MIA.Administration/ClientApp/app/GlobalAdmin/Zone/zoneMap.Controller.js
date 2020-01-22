(function () {
    'use strict';

    angular
        .module('home')
        .controller('zoneMapController', ['CountryResource', 'GovernrateResource', 'CityResource', 'blockUI', '$stateParams', '$state', 'appCONSTANTS', '$translate',
            'ZoneResource', 'ZoneByIdPrepService', 'ToastService', zoneMapController])

    function zoneMapController(CountryResource, GovernrateResource, CityResource, blockUI, $stateParams, $state, appCONSTANTS, $translate, ZoneResource,
        ZoneByIdPrepService, ToastService) {

        blockUI.start("Loading...");
        var vm = this;
        var bermudaTriangle;
        var markers = [];
        var markersObj = [];
        var polys = [];
        var map;
        var infoWindow;

        vm.CordinatesOfPoly = [];
        vm.countryId;
        vm.ContactList = [];
        vm.cityId;
        vm.governrateId;
        initMap();
        vm.language = appCONSTANTS.supportedLanguage;
        vm.zone = ZoneByIdPrepService;

        vm.AddNewZone = function () {
            
            getCordinatesOfPoly();

            if (vm.CordinatesOfPoly.length == 0) {
                ToastService.show("right", "bottom", "fadeInUp",  $translate.instant('should put location'), "error");
                return;
            } 
            blockUI.start("Loading...");
            var newObj = new ZoneResource();
            newObj.zoneId = $stateParams.zoneId;
            newObj.zoneCoordinatesCommands = vm.CordinatesOfPoly;
            newObj.$create().then(
                function (data, status) {
                    blockUI.stop();
                    if (data.isSuccsess) {
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                        $state.go('Zone');
                    }
                    else {
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    }
                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                }
            );
        }
        blockUI.stop();
        vm.close = function () {
            $state.go('Zone');
        }


        vm.countries = [];
        //  vm.countries.push({ id: 0, titles: { "en-uk": "Select Country", "ar-eg": "اختار بلد" } });
        CountryResource.getAllCountries().$promise.then(function (results) {

            vm.countries = vm.countries.concat(results.results);
            vm.selectedCountryId = 1;
            vm.countries[1];
            countryChange();
        },
            function (data, status) {
                ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
            });

        function countryChange() {
            
            vm.Governrates = [];
            vm.cities = [];
            vm.Governrates.push({ id: 0, titles: { "en-uk": "Select Governrate", "ar-eg": "اختار اقليم" } });
            GovernrateResource.getAllGovernrates({ countryId: vm.selectedCountryId }).$promise.then(function (results) {
                vm.selectedGovernrateId = 0;
                vm.Governrates = vm.Governrates.concat(results);
                console.log(vm.Governrates);
            },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "You should put city");
                });
            blockUI.stop();
        }
        vm.GovernrateChange = function () {
            // vm.Governrates.splice(0, 1);
            if (vm.selectedGovernrateId != undefined) {
                for (var i = vm.Governrates.length - 1; i >= 0; i--) {
                    if (vm.Governrates[i].id == 0) {
                        vm.Governrates.splice(i, 1);
                    }
                    // console.log(vm.Governrates);
                }
                vm.cities = [];
                vm.area = [];
                vm.cities.push({ id: 0, titles: { "en-uk": "Select City", "ar-eg": "اختار مدينة" } });
                CityResource.getAllCities({ governrateId: vm.selectedGovernrateId }).$promise.then(function (results) {
                    vm.selectedCityId = 0;
                    vm.cities = vm.cities.concat(results);
                },
                    function (data, status) {
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    });
            }
        }
        vm.cityChange = function () {
            // vm.cities.splice(0, 1);
            if (vm.selectedCityId != undefined) {
                for (var i = vm.cities.length - 1; i >= 0; i--) {
                    if (vm.cities[i].id == 0) {
                        vm.cities.splice(i, 1);
                    }
                }
            }
        }


        function initMap() {
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 5,
                center: { lat: 26.8446991, lng: 26.3796329 },
                mapTypeId: 'terrain'
            });


            // Add a listener for the click event.

            // This event listener will call addMarker() when the map is clicked.
            map.addListener('click', function (event) {
                addMarker(event.latLng);
            });
            infoWindow = new google.maps.InfoWindow;


        }

        /** @this {google.maps.Polygon} */
        function showArrays(event) {
            // Since this polygon has only one path, we can call getPath() to return the
            // MVCArray of LatLngs.
            var vertices = this.getPath();

            var contentString = '<b>Bermuda Triangle polygon</b><br>' +
                'Clicked location: <br>' + event.latLng.lat() + ',' + event.latLng.lng() +
                '<br>';

            // Iterate over the vertices.
            for (var i = 0; i < vertices.getLength(); i++) {
                var xy = vertices.getAt(i);
                contentString += '<br>' + 'Coordinate ' + i + ':<br>' + xy.lat() + ',' +
                    xy.lng();
            }

            // Replace the info window's content and position.
            infoWindow.setContent(contentString);
            infoWindow.setPosition(event.latLng);

            infoWindow.open(map);
        }

        // Adds a marker to the map and push to the array.
        function addMarker(location) {
            
            var marker = new google.maps.Marker({
                position: location,
                icon: 'https://www.kingsway-tyres.co.uk/wp-content/uploads/2017/04/map-marker-pin-icon.svg',
                map: map
            });

            marker.addListener('click', function (event) {

                for (var i = 0; i < markers.length; i++) {
                    if (markers[i] != undefined)
                        if (markers[i].lat == this.position.lat() && markers[i].lng == this.position.lng()) {
                            delete markers[i];
                            this.setMap(null);
                        }
                }
                DrawPoly();
            });
            markersObj.push(marker);
            markers.push({ lat: marker.position.lat(), lng: marker.position.lng() });
            
            DrawPoly();
        }

        function DrawPoly() {

            for (var i = 0; i < markersObj.length; i++) {
                markersObj[i].addListener('click', function (event) {
                    for (var i = 0; i < markers.length; i++) {
                        if (markers[i] != undefined)
                            if (markers[i].lat == this.position.lat() && markers[i].lng == this.position.lng()) {
                                delete markers[i];
                                this.setMap(null);
                            }
                    }
                    DrawPoly();
                });
            }

            for (var i = 0; i < polys.length; i++) {
                polys[i].setMap(null);
            }

            var marksPoint = markers.filter(function (ele) {
                return ele != undefined;
            });
            markers = marksPoint;
            bermudaTriangle = new google.maps.Polygon({
                paths: marksPoint,
                editable: true,

                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                draggable: true,
                geodesic: true,
                fillOpacity: 0.35
            });
            bermudaTriangle.setMap(map);
            polys.push(bermudaTriangle);
        }

        function getCordinatesOfPoly() {
            vm.CordinatesOfPoly.length = 0;
            if (bermudaTriangle != undefined) {
                var vertices = bermudaTriangle.getPath();
                for (var i = 0; i < vertices.getLength(); i++) {
                    var xy = vertices.getAt(i);
                    vm.CordinatesOfPoly.push({ lat: xy.lat(), lng: xy.lng() });
                }
            }
            console.log(vm.CordinatesOfPoly)
            return vm.CordinatesOfPoly;
        }

        // Create the search box and link it to the UI element.
        // var input = document.getElementById('pac-input');
        // var searchBox = new google.maps.places.SearchBox(input);
        // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // // Bias the SearchBox results towards current map's viewport.
        // map.addListener('bounds_changed', function () {
        //     searchBox.setBounds(map.getBounds());
        // });

        // // var markers = [];
        // // Listen for the event fired when the user selects a prediction and retrieve
        // // more details for that place.
        // searchBox.addListener('places_changed', function () {
        //     var places = searchBox.getPlaces();

        //     if (places.length == 0) {
        //         return;
        //     }

        //     // Clear out the old markers.
        //     markers.forEach(function (marker) {
        //         marker.setMap(null);
        //     });
        //     markers = [];

        //     // For each place, get the icon, name and location.
        //     var bounds = new google.maps.LatLngBounds();
        //     places.forEach(function (place) {
        //         if (!place.geometry) {
        //             console.log("Returned place contains no geometry");
        //             return;
        //         }
        //         var icon = {
        //             url: place.icon,
        //             size: new google.maps.Size(71, 71),
        //             origin: new google.maps.Point(0, 0),
        //             anchor: new google.maps.Point(17, 34),
        //             scaledSize: new google.maps.Size(25, 25)
        //         };

        //         // Create a marker for each place.
        //         markers.push(new google.maps.Marker({
        //             map: map,
        //             icon: icon,
        //             title: place.name,
        //             position: place.geometry.location
        //         }));

        //         if (place.geometry.viewport) {
        //             // Only geocodes have viewport.
        //             bounds.union(place.geometry.viewport);
        //         } else {
        //             bounds.extend(place.geometry.location);
        //         }
        //     });
        //     map.fitBounds(bounds);
        // });

    }
}());
