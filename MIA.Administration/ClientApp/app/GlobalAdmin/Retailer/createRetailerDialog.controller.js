(function() {
  angular
    .module("home")
    .controller("createRetailerDialogController", [
      "ContactTypePrepService",
      "getRetailerPrepService",
      "$rootScope",
      "$scope",
      "RetailerResource",
      "CountryResource",
      "GovernrateResource",
      "CityResource",
      "appCONSTANTS",
      "ToastService",
      "$translate",
      "blockUI",
      "$http",
      "$state",
      "CountriesPrepService",
      createRetailerDialogController
    ]);

  function createRetailerDialogController(
    ContactTypePrepService,
    getRetailerPrepService,
    $rootScope,
    $scope,
    RetailerResource,
    CountryResource,
    GovernrateResource,
    CityResource,
    appCONSTANTS,
    ToastService,
    $translate,
    blockUI,
    $http,
    $state,
    CountriesPrepService
  ) {
    var vm = this;
    vm.code = getRetailerPrepService.id;
    vm.language = appCONSTANTS.supportedLanguage;
    vm.currentStep = 1;
    vm.RetailerLogo;
    vm.nameStepOne;
    vm.address;
    vm.taxId;
    vm.commercialReg;
    vm.emailStepOne;
    vm.url;
    vm.countryId;
    vm.cityId;
    vm.governrateId;
    vm.ContactList = [];
    vm.contactType;
    vm.ContactTypeList = ContactTypePrepService;
    vm.Contacts = [];
    vm.user = {};
    vm.companyLogo;
    vm.imageData;
    vm.district;
    vm.pStation;
    vm.center;
    vm.area;
    vm.village;
    $rootScope.image = null;

    var bermudaTriangle;
    var markers = [];
    var markersObj = [];
    var polys = [];
    var map;
    var infoWindow;

    vm.CordinatesOfPoly = [];

    function initMap() {
      map = new google.maps.Map(document.getElementById("map"), {
        zoom: 5,
        center: { lat: 26.8446991, lng: 26.3796329 },
        mapTypeId: "terrain"
      });

      // Add a listener for the click event.

      // This event listener will call addMarker() when the map is clicked.
      map.addListener("click", function(event) {
        addMarker(event.latLng);
      });
      infoWindow = new google.maps.InfoWindow();
    }

    /** @this {google.maps.Polygon} */
    function showArrays(event) {
      // Since this polygon has only one path, we can call getPath() to return the
      // MVCArray of LatLngs.
      var vertices = this.getPath();

      var contentString =
        "<b>Bermuda Triangle polygon</b><br>" + "Clicked location: <br>" + event.latLng.lat() + "," + event.latLng.lng() + "<br>";

      // Iterate over the vertices.
      for (var i = 0; i < vertices.getLength(); i++) {
        var xy = vertices.getAt(i);
        contentString += "<br>" + "Coordinate " + i + ":<br>" + xy.lat() + "," + xy.lng();
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
        icon: "https://www.kingsway-tyres.co.uk/wp-content/uploads/2017/04/map-marker-pin-icon.svg",
        map: map
      });

      marker.addListener("click", function(event) {
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
        markersObj[i].addListener("click", function(event) {
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

      var marksPoint = markers.filter(function(ele) {
        return ele != undefined;
      });
      markers = marksPoint;
      bermudaTriangle = new google.maps.Polygon({
        paths: marksPoint,
        editable: true,

        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
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
      console.log(vm.CordinatesOfPoly);
      return vm.CordinatesOfPoly;
    }
    // form steps
    vm.steps = [
      {
        step: 1,
        name: "First step",
        template: "./app/GlobalAdmin/Retailer/templates/step1.html"
      },
      {
        step: 2,
        name: "Second step",
        template: "./app/GlobalAdmin/Retailer/templates/step2.html"
      },
      {
        step: 3,
        name: "Third step",
        template: "./app/GlobalAdmin/Retailer/templates/step3.html"
      }
    ];

    // Loadding image
    vm.LoadUploadLogo = function() {
      $("#RetailerLogo ").click();
    };
    vm.LoadUploadLogo = function() {
      $("#companyLogo").click();
    };
    var companyLogo;
    $scope.AddcompanyLogo = function(element) {
      var logoFile = element[0];
      var allowedImageTypes = ["image/jpg", "image/png", "image/jpeg"];

      if (logoFile && logoFile.size >= 0 && logoFile.size / (1024 * 1000) < 2) {
        if (allowedImageTypes.indexOf(logoFile.type) !== -1) {
          $scope.newRetailerForm = true;
          $scope.$apply(function() {
            companyLogo = logoFile;
            var reader = new FileReader();

            reader.onloadend = function() {
              vm.companyLogo = reader.result;

              $scope.$apply();
            };
            if (logoFile) {
              reader.readAsDataURL(logoFile);
            }
          });
        } else {
          $("#logoImage").val("");
          ToastService.show("right", "bottom", "fadeInUp", $translate.instant("imageTypeError"), "error");
        }
      } else {
        if (logoFile) {
          $("#logoImage").val("");
          ToastService.show("right", "bottom", "fadeInUp", $translate.instant("imgaeSizeError"), "error");
        }
      }
    };
    // binding contact list
    vm.openDeleteContactTypeDialog = function(e) {
      vm.ContactList.splice(e, 1);
    };
    vm.AddContact = function() {
      vm.conactObject = {
        name: vm.name,
        title: vm.title,
        mobileNumber: vm.mobileNumber,
        email: vm.email,
        checkbox: false,
        contactTypeId: vm.selectedContactType
      };
      // check if the contact already exist
      if (vm.ContactList.length != 0) {
        var checkContact = vm.ContactList.find(v => v.mobileNumber == vm.conactObject.mobileNumber);
        if (checkContact != null) {
          ToastService.show("right", "bottom", "fadeInUp", $translate.instant("must insert uniqe contact"), "error");
          return;
        }
      }
      if (vm.name == null) {
        ToastService.show("right", "bottom", "fadeInUp", $translate.instant("you should put name"), "error");
        return;
      }
      if (vm.mobileNumber == null) {
        ToastService.show("right", "bottom", "fadeInUp", $translate.instant("you should put mobileNumber"), "error");
        return;
      }

      vm.ContactList.push(vm.conactObject);
    };
    vm.setContactMain = function(index) {
      var checkIfContactHasMain = vm.ContactList.find(v => v.checkbox == true && v.mobileNumber != index.mobileNumber);
      if (checkIfContactHasMain) {
        index.checkbox = false;
        ToastService.show("right", "bottom", "fadeInUp", $translate.instant("just one contact must be main "), "error");
        return;
      }
    };
    //Model
    //Functions
    // step validation
    var checkboxValue = [];
    vm.gotoStep = function(newStep) {
      if (vm.currentStep == 1) {
        if (vm.nameStepOne == null) {
          ToastService.show("right", "bottom", "fadeInUp", $translate.instant("you should put Name"), "error");
          return;
        }
        if (vm.address == null) {
          ToastService.show("right", "bottom", "fadeInUp", $translate.instant("you should put Address"), "error");
          return;
        }
        if (vm.selectedCityId == 0 || vm.selectedCountryId == 0 || vm.selectedGovernrateId == 0) {
          ToastService.show("right", "bottom", "fadeInUp", $translate.instant("you should put location"), "error");
          return;
        }
      }
      if (vm.currentStep == 2) {
        if (vm.ContactList.length == 0) {
          ToastService.show("right", "bottom", "fadeInUp", $translate.instant("you should put contact list"), "error");
          return;
        } else {
          for (i = 0; i < vm.ContactList.length; i++) {
            var value = vm.ContactList[i].checkbox;
            checkboxValue.push(value);
          }
          if (!checkboxValue.includes(true)) {
            ToastService.show("right", "bottom", "fadeInUp", $translate.instant("you should Check at least one Contact"), "error");
            return;
          }
        }
      }

      vm.currentStep = newStep;
    };
    vm.getStepTemplate = function() {
      for (var i = 0; i < vm.steps.length; i++) {
        if (vm.currentStep == vm.steps[i].step) {
          return vm.steps[i].template;
        }
      }
    };
    // validation save button

    vm.addNewRetailer = function() {
      blockUI.start("Loading...");

      
      var splitImage = $rootScope.image.split(",");
      var newRetailer = new RetailerResource();
      newRetailer.name = vm.nameStepOne;
      newRetailer.address = vm.address;
      newRetailer.retailerId = vm.retailerId;
      newRetailer.email = vm.emailStepOne;
      newRetailer.url = vm.url;
      newRetailer.code = vm.code;
      // newObj.zoneCoordinatesCommands = vm.CordinatesOfPoly;
      newRetailer.cityId = vm.selectedCityId;
      newRetailer.countryId = vm.selectedCountryId;
      newRetailer.governrateId = vm.selectedGovernrateId;
      newRetailer.retailerContactInformation = vm.ContactList;
      newRetailer.taxId = vm.taxId;
      newRetailer.commercialReg = vm.commercialReg;
      newRetailer.companyLogo = splitImage[1];
      newRetailer.logoContentType = $rootScope.imageType;
      newRetailer.district = vm.district;
      newRetailer.pStation = vm.pStation;
      newRetailer.center = vm.center;
      newRetailer.area = vm.area;
      newRetailer.village = vm.village;

      newRetailer.$create().then(
        function(data, status) {
          blockUI.stop();
          if (data.isSuccsess) {
            ToastService.show("right", "bottom", "fadeInUp", $translate.instant("AddedSuccessfully"), "success");
            $state.go("Retailer");
          } else {
            ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
          }
        },
        function(data, status) {
          blockUI.stop();
          console.log(data.data);
          ToastService.show("right", "bottom", "fadeInUp", data.data, "error");
        }
      );
    };

    // end validation save button

    vm.countries = [];
    vm.countries.push({ id: 0, titles: { "en-uk": "Select Country", "ar-eg": "اختار بلد" } });
    vm.selectedCountryId = 0;
    console.log(vm.countries);
    CountryResource.getAllCountries().$promise.then(
      function(results) {
        vm.countries = vm.countries.concat(results.results);
        console.log(vm.countries);
      },
      function(data, status) {
        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
      }
    );
    // static country value
    vm.resetDLL = function() {
      vm.countries = [];
      vm.countries.push({ id: 0, titles: { "en-uk": "Select Country", "ar-eg": "اختار بلد" } });
      vm.selectedCountryId = 0;
      // return result from DB
      vm.countries = vm.countries.concat(CountriesPrepService.results);
      vm.Governrates = [];
      vm.cities = [];
      vm.categoryList = [];
    };
    vm.countryChange = function() {
      
      vm.Governrates = [];
      vm.cities = [];
      vm.Governrates.push({ id: 0, titles: { "en-uk": "Select Governrate", "ar-eg": "اختار اقليم" } });
      GovernrateResource.GetAllActiveGovernrates({ countryId: vm.selectedCountryId }).$promise.then(
        function(results) {
          vm.selectedGovernrateId = 0;
          vm.Governrates = vm.Governrates.concat(results);
          console.log(vm.Governrates);
        },
        function(data, status) {
          ToastService.show("right", "bottom", "fadeInUp", data.message, "You should put city");
        }
      );
      blockUI.stop();
    };
    vm.GovernrateChange = function() {
      // vm.Governrates.splice(0, 1);
      if (vm.selectedGovernrateId != undefined) {
        for (var i = vm.Governrates.length - 1; i >= 0; i--) {
          if (vm.Governrates[i].id == 0) {
            vm.Governrates.splice(i, 1);
          }
          // console.log(vm.Governrates);
        }
        vm.cities = [];
        vm.cities.push({ id: 0, titles: { "en-uk": "Select City", "ar-eg": "اختار مدينة" } });
        CityResource.getAllActiveCities({ governrateId: vm.selectedGovernrateId }).$promise.then(
          function(results) {
            vm.selectedCityId = 0;
            vm.cities = vm.cities.concat(results);
          },
          function(data, status) {
            ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
          }
        );
      }
    };
    vm.cityChange = function() {
      // vm.cities.splice(0, 1);
      if (vm.selectedCityId != undefined) {
        for (var i = vm.cities.length - 1; i >= 0; i--) {
          if (vm.cities[i].id == 0) {
            vm.cities.splice(i, 1);
          }
        }
      }
    };
  }
})();
