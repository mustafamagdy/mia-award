(function () {
    'use strict';

    angular
        .module('home')
        .controller('RetailerMapController', ['CountryResource', 'RetailerEditIdPrepService', '$rootScope', 'GovernrateResource', 'CityResource', 'blockUI', '$stateParams', '$state', 'appCONSTANTS', '$translate',
            'RetailerResource', 'ToastService', RetailerMapController])

    function RetailerMapController(CountryResource, RetailerEditIdPrepService, $rootScope, GovernrateResource, CityResource, blockUI, $stateParams, $state, appCONSTANTS, $translate, RetailerResource,
        ToastService) {
        blockUI.start("Loading...");
        var vm = this;
        var bermudaTriangle;
        var markers = [];
        var markersObj = [];
        var polys = [];
        var map;
        var infoWindow;
        vm.lat = 0;
        vm.lng = 0;
        vm.CordinatesOfPoly = [];
        vm.countryId;
        vm.ContactList = [];
        vm.cityId;
        vm.governrateId;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.Retailer = RetailerEditIdPrepService;
        console.log(RetailerEditIdPrepService);
        initMap();

        vm.updateRetailer = function () {
            
            getCordinatesOfPoly();
            if (vm.lat == 0) {
                ToastService.show("right", "bottom", "fadeInUp", $translate.instant('should put location'), "error");
                return;
            }
            blockUI.start("Loading...");
            var updateObj = new RetailerResource();
            // var splitImage = $rootScope.image.split(',');
            updateObj.lat = vm.lat;
            updateObj.lng = vm.lng;
            updateObj.name = vm.Retailer.name;
            updateObj.retailerId = vm.Retailer.retailerId;
            updateObj.code = vm.Retailer.code;
            updateObj.address = vm.Retailer.address;
            updateObj.email = vm.Retailer.email;
            updateObj.cityId = vm.Retailer.city.cityId;
            updateObj.countryId = vm.Retailer.country.countryId;
            updateObj.governrateId = vm.Retailer.governrate.governrateId;
            updateObj.retailerContactInformation = vm.Retailer.retailerContactInformation;
            updateObj.commercialReg = vm.Retailer.commercialReg;
            // if ($rootScope.imageType != null) {
            updateObj.companyLogo = "";
            //updateObj.logoContentType = $rootScope.imageType;
            //}
            updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();
                    if (data.isSuccsess) {
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                        $state.go('Retailer');
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
            $state.go('Retailer');
        }
        function initMap() {

            if (vm.Retailer.lat == 0) {
                map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 5,
                    center: { lat: 26.8446991, lng: 26.3796329 },
                    mapTypeId: 'terrain'
                });
                map.addListener('click', function (event) {
                    
                    if (vm.lat == 0) addMarker(event.latLng);
                });
                infoWindow = new google.maps.InfoWindow;
            }
            else {
                vm.lat = vm.Retailer.lat;
                vm.lng = vm.Retailer.lng;
                map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 5,
                    center: { lat: vm.Retailer.lat, lng: vm.Retailer.lng },
                    mapTypeId: 'terrain'
                });
                map.addListener('click', function (event) {
                    
                    if (vm.lat == 0) addMarker(event.latLng);
                });
                infoWindow = new google.maps.InfoWindow;
            }

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
            
            vm.lat = marker.position.lat();
            vm.lng = marker.position.lng();
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
                });
            }
            var marksPoint = markers.filter(function (ele) {
                return ele != undefined;
            });
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

    }
}());
