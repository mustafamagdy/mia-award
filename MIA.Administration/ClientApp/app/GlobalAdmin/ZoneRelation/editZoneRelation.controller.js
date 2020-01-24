(function () {
  angular.module('home')
    .controller("editZoneRelationController", ['ActiveProductsPrepService', 'ActiveDistributersPrepService', 'ZoneDistributerPrepService', 'ActiveRetailersPrepService', '$stateParams', '$scope', 'ZoneRelationResource',
      'appCONSTANTS', 'ToastService', '$translate', 'blockUI', '$state', 'ZoneByIdPrepService', editZoneRelationController]);
 
  function editZoneRelationController(ActiveProductsPrepService, ActiveDistributersPrepService, ZoneDistributerPrepService, ActiveRetailersPrepService, $stateParams, $scope, ZoneRelationResource,
    appCONSTANTS, ToastService, $translate, blockUI, $state, ZoneByIdPrepService) {
    var vm = this;
    vm.appCONSTANTS = appCONSTANTS;
    vm.language = appCONSTANTS.supportedLanguage;
    vm.currentStep = 1;
    vm.distributers = ActiveDistributersPrepService;
    vm.selectedProduct = [];
    vm.currentProductPage = 1;
    vm.products = {};
    vm.selectedRetailer = [];
    vm.retailers = {};
    vm.currentRetailerPage = 1;
    vm.zone = ZoneByIdPrepService;
    vm.manufacture = ZoneByIdPrepService.manufacture;
    vm.selectedDistributerId = ZoneDistributerPrepService.results[0].distributorId;


    //****************** Product Functions  */ 
    vm.products.allProductSelected = true;
    vm.products.entities = ActiveProductsPrepService.results;
    vm.productTotalCount = ActiveProductsPrepService.totalCount;
    initSelectAllProduct();

    vm.selectProduct = function (product) {
      
      ChangeProductStatus(product)
      // if (!vm.selectedProduct.includes(product.productId))
      //   vm.selectedProduct.push(product.productId);
      // else {
      //   var index = vm.selectedProduct.indexOf(product.productId);
      //   vm.selectedProduct.splice(index, 1);
      // }
      // // If any entity is not checked, then uncheck the "allProductSelected" checkbox
      // for (var i = 0; i < vm.products.entities.length; i++) {
      //   if (!vm.products.entities[i].isChecked) {
      //     vm.products.allProductSelected = false;
      //     return;
      //   }
      // }

      // //If not the check the "allProductSelected" checkbox
      // vm.products.allProductSelected = true;
    };

    vm.selectAllProduct = function () {
      initSelectAllProduct();
    };
    vm.filterProduct = function (searchText, page, isChecked) {
      refreshProduct(searchText, page, isChecked);
      vm.searchText = "";
    }
    function initSelectAllProduct() {
      for (var i = 0; i < vm.products.entities.length; i++) {
        if (!vm.selectedProduct.includes(vm.products.entities[i].productId))
          vm.selectedProduct.push(vm.products.entities[i].productId);
        else {
          var index = vm.selectedProduct.indexOf(vm.products.entities[i].productId);
          vm.selectedProduct.splice(index, 1);
        }
        // vm.products.entities[i].isChecked = vm.products.allProductSelected;
      }
    }

    function refreshProduct(searchTitle, page, isChecked) {
      blockUI.start("Loading...");
      var k = ZoneRelationResource.getZoneProduct({ zoneId: $stateParams.zoneId, description: searchTitle, isChecked: isChecked, page: page }).$promise.then(function (results) {
        vm.products.entities = results.results;
        vm.productTotalCount = results.totalCount;
        blockUI.stop();
      },
        function (data, status) {
          blockUI.stop();
          ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
        });
    }

    vm.changeProductPage = function (page) {
      vm.currentProductPage = page;
      refreshProduct("", page,"");
    }
    function ChangeProductStatus(model) {
      var updateObj = new ZoneRelationResource();
      updateObj.$zoneProductStatus({ zoneId: $stateParams.zoneId, zoneProductId: model.zoneProductRelationId, status: model.isChecked }).then(
        function (data, status) {
          blockUI.stop();
          if (!data.isSuccsess)
            ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
        },
        function (data, status) {
          
          ToastService.show("right", "bottom", "fadeInUp", data, "error");
        }
      );
      return;
    }
    //*********************** Close Product Function */


    //****************** Retailer Functions  */
    // This property will be bound to checkbox in table header
    vm.retailers.allRetailerSelected = true;

    // Here first initialize all name list
    vm.retailers.entities = ActiveRetailersPrepService.results;
    vm.retailerTotalCount = ActiveRetailersPrepService.totalCount;
    iniSelectAllRetailers();

    // This executes when entity in table is checked
    vm.selectRetailer = function (retailer) {
      
      // if (!vm.selectedRetailer.includes(retailer.retailerId)) {
      //   vm.selectedRetailer.push(retailer.retailerId);
      ChangeRetailerStatus(retailer)
      // }
      // else {
      //   var index = vm.selectedRetailer.indexOf(retailer.retailerId);
      //   vm.selectedRetailer.splice(index, 1);
      // }
      // If any entity is not checked, then uncheck the "allRetailerSelected" checkbox
      for (var i = 0; i < vm.retailers.entities.length; i++) {
        if (!vm.retailers.entities[i].isChecked) {
          vm.retailers.allRetailerSelected = false;
          return;
        }
      }

      //If not the check the "allRetailerSelected" checkbox
      vm.retailers.allRetailerSelected = true;
    };

    // This executes when checkbox in table header is checked
    vm.selectAllRetailer = function () {
      iniSelectAllRetailers();
    };
    vm.filterRetailer = function (searchText, page, isChecked) {
      
      refreshRetailer(searchText, page, isChecked);
      vm.searchText = "";
    }
    function iniSelectAllRetailers() {
      // Loop through all the entities and set their isChecked property
      for (var i = 0; i < vm.retailers.entities.length; i++) {
        if (!vm.selectedRetailer.includes(vm.retailers.entities[i].retailerId)) {
          vm.selectedRetailer.push(vm.retailers.entities[i].retailerId);
          // ChangeRetailerStatus(vm.retailers.entities[i].retailerId);
        } else {
          var index = vm.selectedRetailer.indexOf(vm.retailers.entities[i].retailerId);
          vm.selectedRetailer.splice(index, 1);
        }
        //  vm.retailers.entities[i].isChecked = vm.retailers.allRetailerSelected;
      }
    }

    function refreshRetailer(searchTitle, page, isChecked) {
      blockUI.start("Loading...");
      var k = ZoneRelationResource.getZoneRetailer({ zoneId: $stateParams.zoneId, title: searchTitle, isChecked: isChecked, page: page }).$promise.then(function (results) {
        vm.retailers.entities = results.results;
        vm.retailerTotalCount = results.totalCount;
        blockUI.stop();
      },
        function (data, status) {
          blockUI.stop();
          ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
        });
    }

    vm.changeRetailerPage = function (page) {
      vm.currentRetailerPage = page;
      refreshRetailer("", page, "");
    }
    function ChangeRetailerStatus(model) {
      
      var updateObj = new ZoneRelationResource();
      updateObj.$zoneRetailerStatus({ zoneId: $stateParams.zoneId, zoneRetailerId: model.zoneRetailerRelationId, status: model.isChecked }).then(
        function (data, status) {
          blockUI.stop();
          if (data.isSuccsess) {
            // ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
            // updateObj.status = model.status;
          } else {
            
            ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
          }
        },
        function (data, status) {
          
          ToastService.show("right", "bottom", "fadeInUp", data, "error");
        }
      );
      return;
    }
    //*********************** Close Retailer Function */

    // form steps
    vm.steps = [
      {
        step: 1,
        name: "First step",
        template: "./app/GlobalAdmin/ZoneRelation/templates/step1.html"
      },
      {
        step: 2,
        name: "Second step",
        template: "./app/GlobalAdmin/ZoneRelation/templates/step2.html"
      },
      {
        step: 3,
        name: "Third step",
        template: "./app/GlobalAdmin/ZoneRelation/templates/step3.html"
      },
    ];

    //Model
    //Functions
    // step validation 
    vm.gotoStep = function (newStep) {

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

    vm.addNewZoneRelation = function () {

      var newZoneRelation = new ZoneRelationResource();
      newZoneRelation.zoneId = $stateParams.zoneId;

      newZoneRelation.$setDistributor({ zoneId: $stateParams.zoneId, distributorId: vm.selectedDistributerId }).then
        (
          function (data, status) {

            ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
            $state.go('ZoneRelation');

            blockUI.stop();

          },
          function (data, status) {
            blockUI.stop();
            console.log(data.data);
            ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
          }
        );


    }


  }


})();