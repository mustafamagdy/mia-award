(function () {
  'use strict';

  angular
    .module('home')
    .controller('editManufactureDialogController', ['$rootScope', 'ContactTypePrepService', 'CityResource', 'GovernrateResource', 'CountriesPrepService', 'CountryResource', 'blockUI', '$filter', '$http', '$state', 'appCONSTANTS', '$translate',
      'ManufactureResource', 'ToastService', 'ManfactureEditPrepService', editManufactureDialogController])

  function editManufactureDialogController($rootScope, ContactTypePrepService, CityResource, GovernrateResource, CountriesPrepService, CountryResource, blockUI, $filter, $http, $state, appCONSTANTS, $translate, ManufactureResource,
    ToastService, ManfactureEditPrepService) {
    var vm = this;
    vm.language = appCONSTANTS.supportedLanguage;
    vm.Manufacture = ManfactureEditPrepService;
    console.log("m", vm.Manufacture);
    // vm.ContactList=vm.Manufacture.manufactureContactInformation;
    $rootScope.image = appCONSTANTS.Image_URL_ACTOR + vm.Manufacture.companyLogo;
    vm.currentStep = 1;
    vm.ManufactureLogo;
    vm.nameStepOne;
    vm.address;
    vm.taxId;
    vm.commercialReg;
    vm.emailStepOne;
    vm.webSite;
    vm.countryId;
    vm.ContactList = [];
    vm.cityId;
    vm.governrateId;
    vm.ContactList = [];
    console.log("vm.ContactList ", vm.ContactList)
    vm.contactType;
    vm.ContactTypeList = ContactTypePrepService;
    vm.Contacts = [];
    vm.user = {};
    vm.companyLogo;
    vm.imageData;


    // binding contact list
    vm.openDeleteContactTypeDialog = function (e) {
      vm.Manufacture.manufactureContactInformation.splice(e, 1);
      //vm.ContactList.splice(e, 1);
    };
    vm.openDeleteContactTypeDialogContactList = function (e) {
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
      if (vm.Manufacture.manufactureContactInformation.length != 0) {
        var checkContact = vm.Manufacture.manufactureContactInformation.find(v => v.mobileNumber == vm.conactObject.mobileNumber);
        if (checkContact != null) {
          ToastService.show("right", "bottom", "fadeInUp", $translate.instant('must insert uniqe contact'), "error");
          return;
        }
      }
      if (vm.name == null) {
        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('you should put name'), "error"); return;
      }
      if (vm.mobileNumber == null) {
        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('you should put correct mobileNumber'), "error"); return;
      }


      vm.Manufacture.manufactureContactInformation.push(vm.conactObject);
      // angular.forEach(vm.ContactList, function (value, key) {
      //   vm.Manufacture.manufactureContactInformation.push(value);
      // });
    }
    vm.setContactMain = function (index) {
      
      var checkIfContactHasMain = vm.Manufacture.manufactureContactInformation.find(v => v.main == true && v.mobileNumber != index.mobileNumber);
      if (checkIfContactHasMain) {
        index.main = false;
        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('just one contact must be main '), "error"); return;
      }
    }


    vm.steps = [
      {
        step: 1,
        name: "First step",
        template: "./app/GlobalAdmin/Manufacture/templates/editstep1.html"
      },
      {
        step: 2,
        name: "Second step",
        template: "./app/GlobalAdmin/Manufacture/templates/editstep2.html"
      },
      {
        step: 3,
        name: "Third step",
        template: "./app/GlobalAdmin/Manufacture/templates/editstep3.html"
      },
    ];
    var checkboxValue = [];
    vm.gotoStep = function (newStep) {
      
      if (vm.currentStep == 1) {
        if (vm.Manufacture.name == null) {
          ToastService.show("right", "bottom", "fadeInUp", $translate.instant('you should edit Name'), "error");
          return;
        }
        if (vm.Manufacture.address == null) {
          ToastService.show("right", "bottom", "fadeInUp", $translate.instant('you should edit Address'), "error");
          return;
        }
        if (vm.selectedCityId == 0 || vm.selectedCountryId == 0 || vm.selectedGovernrateId == 0) {
          ToastService.show("right", "bottom", "fadeInUp", $translate.instant('you should edit location'), "error");
          return;
        }
      }
      if (vm.currentStep == 2) {

        // if (vm.ContactList.length == 0) 
        // {
        //   ToastService.show("right", "bottom", "fadeInUp", $translate.instant('you should edit contact list'), "error");
        //   return;
        // }    
        if (vm.Manufacture.manufactureContactInformation != 0) 
        {

          for (let i = 0; i < vm.Manufacture.manufactureContactInformation.length; i++) {
            var value = vm.Manufacture.manufactureContactInformation[i].main;
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
      $state.go('Manufacture');
    }
    vm.UpdateManufacture = function () {

      blockUI.start("Loading...");
      var updateObj = new ManufactureResource();
      var splitImage = $rootScope.image.split(',');
      updateObj.code = vm.Manufacture.code;
      updateObj.name = vm.Manufacture.name;
      updateObj.manufactureId = vm.Manufacture.manufactureId;
      updateObj.address = vm.Manufacture.address;
      updateObj.email = vm.Manufacture.email;
      updateObj.webSite = vm.Manufacture.webSite;
      updateObj.code = vm.Manufacture.code;
      updateObj.cityId = vm.selectedCityId;
      updateObj.countryId = vm.selectedCountryId;
      updateObj.governrateId = vm.selectedGovernrateId;
      updateObj.manufactureContactInformation = vm.Manufacture.manufactureContactInformation;
      updateObj.taxId = vm.Manufacture.taxId;
      updateObj.commercialReg = vm.Manufacture.commercialReg;
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
              $state.go('Manufacture');
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

      var indexRate = vm.countries.indexOf($filter('filter')(vm.countries, { 'countryId': vm.Manufacture.country.countryId }, true)[0]);
      vm.selectedCountryId = vm.countries[indexRate].countryId;
      console.log(vm.cities);
      vm.Governrates = [];
      vm.cities = [];
      vm.Governrates.push({ id: 0, titles: { "en-uk": "Select Governrate", "ar-eg": "اختار اقليم" } });
      GovernrateResource.GetAllActiveGovernrates({ countryId: vm.selectedCountryId }).$promise.then(function (results) {
        vm.selectedGovernrateId = 0;
        
        vm.Governrates = vm.Governrates.concat(results);
        
        var indexRate = vm.Governrates.indexOf($filter('filter')(vm.Governrates, { 'governrateId': vm.Manufacture.governrate.governrateId }, true)[0]);
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
              { 'cityId': vm.Manufacture.city.cityId }, true)[0]);
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
