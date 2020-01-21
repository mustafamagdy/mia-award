(function () {
  angular.module('home')
    .controller("createManufactureDialogController", ['ContactTypePrepService', 'getManufacturePrepService', '$rootScope', '$scope', 'ManufactureResource',
      'CountryResource', 'GovernrateResource', 'CityResource',
      'appCONSTANTS', 'ToastService',
      '$translate', 'blockUI', '$http', '$state', 'CountriesPrepService',
      createManufactureDialogController]);

  function createManufactureDialogController(ContactTypePrepService, getManufacturePrepService, $rootScope, $scope, ManufactureResource,
    CountryResource, GovernrateResource, CityResource, appCONSTANTS, ToastService, $translate, blockUI, $http,
    $state, CountriesPrepService) {
    var vm = this;
    vm.code = getManufacturePrepService.id;
    vm.language = appCONSTANTS.supportedLanguage;
    vm.currentStep = 1;
    vm.ManufactureLogo;
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
    vm.contactType;
    vm.ContactTypeList = ContactTypePrepService;
    vm.user = {};
    vm.companyLogo;
    vm.imageData;

    vm.selectedCountryId = 0;
    vm.selectedCityId = 0;
    vm.selectedGovernrateId = 0;
    $rootScope.image = null;
  
    // form steps
    vm.steps = [
      {
        step: 1,
        name: "First step",
        template: "./app/GlobalAdmin/Manufacture/templates/step1.html"
      },
      {
        step: 2,
        name: "Second step",
        template: "./app/GlobalAdmin/Manufacture/templates/step2.html"
      },
      {
        step: 3,
        name: "Third step",
        template: "./app/GlobalAdmin/Manufacture/templates/step3.html"
      },
    ];

    // Loadding image 
    vm.LoadUploadLogo = function () {
      $("#ManufactureLogo ").click();
    }
    vm.LoadUploadLogo = function () {
      $("#companyLogo").click();
    }
    var companyLogo;
    $scope.AddcompanyLogo = function (element) {
      var logoFile = element[0];
      var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

      if (logoFile && logoFile.size >= 0 && ((logoFile.size / (1024 * 1000)) < 2)) {

        if (allowedImageTypes.indexOf(logoFile.type) !== -1) {
          $scope.newManufactureForm = true;
          $scope.$apply(function () {

            companyLogo = logoFile;
            var reader = new FileReader();

            reader.onloadend = function () {
              vm.companyLogo = reader.result;

              $scope.$apply();
            };
            if (logoFile) {
              reader.readAsDataURL(logoFile);
            }
          })
        } else {
          $("#logoImage").val('');
          ToastService.show("right", "bottom", "fadeInUp", $translate.instant('imageTypeError'), "error");
        }

      } else {
        if (logoFile) {
          $("#logoImage").val('');
          ToastService.show("right", "bottom", "fadeInUp", $translate.instant('imgaeSizeError'), "error");
        }


      }


    }
    // binding contact list
    vm.openDeleteContactTypeDialog = function(e){
      vm.ContactList.splice(e, 1);
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
      if (vm.ContactList.length != 0) {
        var checkContact = vm.ContactList.find(v => v.mobileNumber == vm.conactObject.mobileNumber);
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


      vm.ContactList.push(vm.conactObject);
    }
    vm.setContactMain = function (index) {
      var checkIfContactHasMain = vm.ContactList.find(v => v.checkbox == true && v.mobileNumber != index.mobileNumber);
      if (checkIfContactHasMain) {
        index.checkbox = false;
        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('just one contact must be main '), "error"); return;
      }
    }
    //Model
    //Functions
    // step validation 
    var checkboxValue=[];
    vm.gotoStep = function (newStep) 
    {

      if (vm.currentStep == 1) {
        if (vm.nameStepOne == null) {
          ToastService.show("right", "bottom", "fadeInUp", $translate.instant('you should put Name'), "error");
          return;
        }
        if (vm.address == null) {
          ToastService.show("right", "bottom", "fadeInUp", $translate.instant('you should put Address'), "error");
          return;
        }
        if (vm.selectedCityId == 0 || vm.selectedCountryId == 0 || vm.selectedGovernrateId == 0) {
          ToastService.show("right", "bottom", "fadeInUp", $translate.instant('you should put location'), "error");
          return;
        }
      }
      if (vm.currentStep == 2) 
      {
        if (vm.ContactList.length == 0) 
        {
          ToastService.show("right", "bottom", "fadeInUp", $translate.instant('you should put contact list'), "error");
          return;
        }
        else
        {
          for (i = 0; i < vm.ContactList.length; i++) 
          { 
            var value =vm.ContactList[i].checkbox;
            checkboxValue.push(value);
          }
         if (!checkboxValue.includes(true))
         {
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
    // validation save button 
  
    vm.addNewManufacture = function () {
      blockUI.start("Loading...");

      
      var splitImage = $rootScope.image.split(',');
      var newManufacture = new ManufactureResource();
      newManufacture.name = vm.nameStepOne;
      newManufacture.address = vm.address;
      newManufacture.email = vm.emailStepOne;
      newManufacture.url = vm.url;
      newManufacture.code = vm.code;
      newManufacture.cityId = vm.selectedCityId;
      newManufacture.countryId = vm.selectedCountryId;
      newManufacture.governrateId = vm.selectedGovernrateId;
      newManufacture.manufactureContactInformation = vm.ContactList;
      newManufacture.taxId = vm.taxId;
      newManufacture.commercialReg = vm.commercialReg;
      newManufacture.companyLogo = splitImage[1];
      newManufacture.logoContentType = $rootScope.imageType;

      newManufacture.$create().then
        (
          function (data, status) {
            blockUI.stop();
            if (data.isSuccsess) {
              ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
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

    // end validation save button 

    vm.countries = [];
    vm.countries.push({ countryId: 0, titles: { "en-uk": "Select Country", "ar-eg": "اختار بلد" } });
    vm.selectedCountryId = 0;
    CountryResource.getAllCountries().$promise.then(function (results) {

      vm.countries = vm.countries.concat(results.results);
    },
      function (data, status) {
        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
      });

    vm.countryChange = function () {
      
      vm.Governrates = [];
      vm.cities = [];
      vm.Governrates.push({ governrateId: 0, titles: { "en-uk": "Select Governrate", "ar-eg": "اختار اقليم" } });

      if (vm.selectedCountryId == null)
        return;

      GovernrateResource.GetAllActiveGovernrates({ countryId: vm.selectedCountryId }).$promise.then(function (results) {
        vm.selectedGovernrateId = 0;
        vm.Governrates = vm.Governrates.concat(results);
      },
        function (data, status) {
          ToastService.show("right", "bottom", "fadeInUp", data.message, "You should put city");
        });
      blockUI.stop();
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
    vm.cityChange = function () {
      if (vm.selectedCityId != undefined) {
        for (var i = vm.cities.length - 1; i >= 0; i--) {
          if (vm.cities[i].id == 0) {
            vm.cities.splice(i, 1);
          }
        }
      }
    }

  }


})();