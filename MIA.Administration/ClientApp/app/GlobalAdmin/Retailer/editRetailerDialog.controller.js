(function () {
  'use strict';

  angular
    .module('home')
    .controller('editRetailerDialogController', ['$rootScope', 'ContactTypePrepService', 'CityResource', 'GovernrateResource', 'CountriesPrepService', 'CountryResource', 'blockUI', '$filter', '$http', '$state', 'appCONSTANTS', '$translate',
      'RetailerResource', 'ToastService', 'RetailerEditIdPrepService', editRetailerDialogController])

  function editRetailerDialogController($rootScope, ContactTypePrepService, CityResource, GovernrateResource, CountriesPrepService, CountryResource, blockUI, $filter, $http, $state, appCONSTANTS, $translate, RetailerResource,
    ToastService, RetailerEditIdPrepService) {
    var vm = this;
    vm.language = appCONSTANTS.supportedLanguage;
    vm.Retailer = RetailerEditIdPrepService;
    console.log("m", vm.Retailer);
    // vm.ContactList=vm.Retailer.retailerContactInformation;
    $rootScope.image = appCONSTANTS.Image_URL_ACTOR + vm.Retailer.companyLogo;
    vm.currentStep = 1;
    vm.RetailerLogo;
    vm.nameStepOne;
    vm.address;
    vm.taxId;
    vm.commercialReg;
    vm.emailStepOne;
    vm.url;
    vm.countryId;
    vm.ContactList = [];
    vm.cityId;
    vm.governrateId;
    vm.ContactList = [];
    vm.contactType;
    vm.ContactTypeList = ContactTypePrepService;
    // console.log("contact", vm.ContactTypeList);
    vm.Contacts = [];
    vm.user = {};
    vm.companyLogo;
    vm.imageData;


    // binding contact list
    vm.openDeleteContactTypeDialog = function(e){
      vm.Retailer.retailerContactInformation.splice(e, 1);
      //vm.ContactList.splice(e, 1);
   };
   vm.openDeleteContactTypeDialogContactList = function(e){
    vm.ContactList.splice(e, 1);
    //vm.ContactList.splice(e, 1);
 };
    vm.AddContact = function () {

      vm.conactObject =
        {
          name: vm.name,
          title: vm.title,
          mobileNumber: vm.mobileNumber,
          email: vm.email,
          checkbox: false,
          contactTypeId: vm.selectedContactType
        }
      // check if the contact already exist
      if (vm.Retailer.retailerContactInformation.length != 0) {
        var checkContact = vm.Retailer.retailerContactInformation.find(v => v.mobileNumber == vm.conactObject.mobileNumber);
        if (checkContact != null) {
          ToastService.show("right", "bottom", "fadeInUp", $translate.instant('must insert uniqe contact'), "error");
          return;
        }
      }
      if (vm.name == null) {
        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('you should put name'), "error"); return;
      }
      if (vm.mobileNumber == null) {
        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('you should put mobileNumber'), "error"); return;
      }

      vm.Retailer.retailerContactInformation.push(vm.conactObject);
      // angular.forEach(vm.ContactList, function (value, key) { 
      //   vm.Retailer.retailerContactInformation.push(value); 
      // });
    }
    vm.setContactMain = function (index) {
      
      var checkIfContactHasMain = vm.Retailer.retailerContactInformation.find(v => v.main ==true && v.mobileNumber != index.mobileNumber);
      if (checkIfContactHasMain) {
        index.main = false;
        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('just one contact must be main '), "error"); return;
      }
    }


    vm.steps = [
      {
        step: 1,
        name: "First step",
        template: "./app/GlobalAdmin/Retailer/templates/editstep1.html"
      },
      {
        step: 2,
        name: "Second step",
        template: "./app/GlobalAdmin/Retailer/templates/editstep2.html"
      },
      {
        step: 3,
        name: "Third step",
        template: "./app/GlobalAdmin/Retailer/templates/editstep3.html"
      },
    ];
    vm.gotoStep = function (newStep) {

      if (vm.currentStep == 1) {
        if (vm.Retailer.name == null) {
          ToastService.show("right", "bottom", "fadeInUp", $translate.instant('you should edit Name'), "error");
          return;
        }
        if (vm.Retailer.address == null) {
          ToastService.show("right", "bottom", "fadeInUp", $translate.instant('you should edit Address'), "error");
          return;
        }
        if (vm.selectedCityId == 0 || vm.selectedCountryId == 0 || vm.selectedGovernrateId == 0) {
          ToastService.show("right", "bottom", "fadeInUp", $translate.instant('you should edit location'), "error");
          return;
        }
      }
      if (vm.Retailer.currentStep == 2) {
        // if (vm.ContactList.length == 0) {
        //   ToastService.show("right", "bottom", "fadeInUp", $translate.instant('you should edit contact list'), "error");
        //   return;
        // }
        if (vm.Retailer.retailerContactInformation != 0) 
        {

          for (let i = 0; i < vm.Retailer.retailerContactInformation.length; i++) {
            var value = vm.Retailer.retailerContactInformation[i].main;
            checkboxValue.push(value);
          }
          if (!checkboxValue.includes(true)) {
            ToastService.show("right", "bottom", "fadeInUp", $translate.instant('you should Check at least one Contact'), "error");
            return;
          }
        }
      }
      vm.currentStep = newStep;


    }
    vm.getStepTemplate = function () {
      for (var i = 0; i < vm.steps.length; i++) {
        if (vm.currentStep == vm.steps[i].step) {
          return vm.steps[i].template;
        }
      }
    }
    vm.Close = function () {
      $state.go('Retailer');
    }
    vm.UpdateRetailer = function () {
 

      
      blockUI.start("Loading...");
      var updateObj = new RetailerResource();
      var splitImage = $rootScope.image.split(',');
      updateObj.code = vm.Retailer.code;
      updateObj.name = vm.Retailer.name;
      updateObj.lat = vm.lat;
      updateObj.lng = vm.lng;
      updateObj.retailerId = vm.Retailer.retailerId;
      updateObj.address = vm.Retailer.address;
      updateObj.email = vm.Retailer.email;
      updateObj.url = vm.Retailer.webSite;
      updateObj.code = vm.Retailer.code;
      updateObj.cityId = vm.selectedCityId;
      updateObj.countryId = vm.selectedCountryId;
      updateObj.governrateId = vm.selectedGovernrateId;
      // updateObj.ContactList = vm.Retailer.ContactList;
      // updateObj.retailerContactInformation = vm.ContactList;
      updateObj.retailerContactInformation = vm.Retailer.retailerContactInformation;
      updateObj.taxId = vm.Retailer.taxId;
      updateObj.commercialReg = vm.Retailer.commercialReg;
      if ($rootScope.imageType != null) {
        updateObj.companyLogo = splitImage[1];
        updateObj.logoContentType = $rootScope.imageType;
      }

      updateObj.$update().then
        (
          function (data, status) {
            blockUI.stop();
            if (data.isSuccsess) {
              ToastService.show("right", "bottom", "fadeInUp", $translate.instant('EditedSuccessfully'), "success");
              $state.go('Retailer');
            }
            else {
              ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
            }
          },
          function (data, status) {
            blockUI.stop();
            console.log(data.data);
            ToastService.show("right", "bottom", "fadeInUp", data.data, "error");
          }
        );

    }

    vm.countries = [];
    vm.countries.push({ id: 0, titles: { "en-uk": "Select Country", "ar-eg": "اختار بلد" } });
    vm.selectedCountryId = 0;
    CountryResource.getAllCountries().$promise.then(function (results) {

      vm.countries = vm.countries.concat(results.results)

      var indexRate = vm.countries.indexOf($filter('filter')(vm.countries, { 'countryId': vm.Retailer.country.countryId }, true)[0]);
      vm.selectedCountryId = vm.countries[indexRate].countryId;
      console.log(vm.cities);
      vm.Governrates = [];
      vm.cities = [];
      vm.Governrates.push({ id: 0, titles: { "en-uk": "Select Governrate", "ar-eg": "اختار اقليم" } });
      GovernrateResource.GetAllActiveGovernrates({ countryId: vm.selectedCountryId }).$promise.then(function (results) {
        vm.selectedGovernrateId = 0;
        
        vm.Governrates = vm.Governrates.concat(results);
        var indexRate = vm.Governrates.indexOf($filter('filter')(vm.Governrates, { 'governrateId': vm.Retailer.governrate.governrateId }, true)[0]);
        vm.selectedGovernrateId = vm.Governrates[indexRate].governrateId;
        if (vm.selectedGovernrateId != undefined) {
          for (var i = vm.Governrates.length - 1; i >= 0; i--) {
            if (vm.Governrates[i].id == 0) {
              vm.Governrates.splice(i, 1);
            }
            // console.log(vm.Governrates);
          }
          vm.GovernrateChange = function () {
            if (vm.selectedGovernrateId != undefined) {
              for (var i = vm.Governrates.length - 1; i >= 0; i--) {
                if (vm.Governrates[i].id == 0) {
                  vm.Governrates.splice(i, 1);
                }
              }
      
              vm.cities = [];
      
              if (vm.selectedGovernrateId == null)
                return;
              vm.cities.push({ cityId: 0, titles: { "en-uk": "Select City", "ar-eg": "اختار مدينة" } });
              CityResource.getAllActiveCities({ governrateId: vm.selectedGovernrateId }).$promise.then(function (results) {
                vm.selectedCityId = 0;
                vm.cities = vm.cities.concat(results);
              },
                function (data, status) {
                  ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
            }
          }
          vm.cities = [];
          vm.area = [];
          vm.cities.push({ id: 0, titles: { "en-uk": "Select City", "ar-eg": "اختار مدينة" } });
          CityResource.getAllActiveCities({ governrateId: vm.selectedGovernrateId }).$promise.then(function (results) {
            vm.selectedCityId = 0;
            vm.cities = vm.cities.concat(results);
            var indexRate = vm.cities.indexOf($filter('filter')(vm.cities,
              { 'cityId': vm.Retailer.city.cityId }, true)[0]);
            vm.selectedCityId = vm.cities[indexRate].cityId;
          },
            function (data, status) {
              ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
            });
        }
      },
        function (data, status) {
          ToastService.show("right", "bottom", "fadeInUp", data.message, "You should put city");
        });
    },
      function (data, status) {
        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
      });
    // static country value 
    vm.resetDLL = function () {
      vm.countries = [];
      vm.countries.push({ id: 0, titles: { "en-uk": "Select Country", "ar-eg": "اختار بلد" } });
      vm.selectedCountryId = 0;
      // return result from DB
      vm.countries = vm.countries.concat(CountriesPrepService.results)
      vm.Governrates = [];
      vm.cities = [];
      vm.categoryList = [];
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

  }
}());
