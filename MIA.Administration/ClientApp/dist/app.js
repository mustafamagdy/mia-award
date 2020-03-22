(function () {
    'use strict';

    angular
        .module('home')
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('users', {
                    url: '/users',
                    templateUrl: './app/GlobalAdmin/user/templates/user.html',
                    controller: 'userController',
                    'controllerAs': 'userCtrl',
                    data: {
                        permissions: {
                            only: ['12'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('addUser', {
                    url: '/addUser/:tenantId/:userType/:userId',
                    templateUrl: './app/GlobalAdmin/user/templates/addUser.html',
                    controller: 'addUserController',
                    'controllerAs': 'addUserCtrl',
                    resolve: {
                        UserRoleByIdPrepService: UserRoleByIdPrepService,
                    },
                    data: {
                        permissions: {
                            only: ['12', '16', '17', '18'],
                            redirectTo: 'root'
                        }
                    }
                })
                .state('editUser', {
                    url: '/editUser/:userId/:userType',
                    templateUrl: './app/GlobalAdmin/user/templates/editUser.html',
                    controller: 'editUserController',
                    'controllerAs': 'editUserCtrl',
                    resolve: {
                        UserRoleByIdPrepService: UserRoleByIdPrepService,
                        EditUserPrepService: EditUserPrepService,
                    },
                    data: {
                        permissions: {
                            only: ['12', '16', '17', '18', '22', '21'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('Role', {
                    url: '/Role',
                    templateUrl: './app/GlobalAdmin/Role/templates/Role.html',
                    controller: 'RoleController',
                    'controllerAs': 'RoleCtrl',
                    resolve: {
                        RolePrepService: RolePrepService
                    },
                    data: {
                        permissions: {
                            only: ['11'],
                            redirectTo: 'root'
                        }
                    }
                })
                .state('newRole', {
                    url: '/newRole',
                    templateUrl: './app/GlobalAdmin/Role/templates/new.html',
                    controller: 'createRoleDialogController',
                    'controllerAs': 'newRoleCtrl',
                    resolve: {
                        PermissionPrepService: PermissionPrepService
                    },
                    data: {
                        permissions: {
                            only: ['11'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editRole', {
                    url: '/editRole/:roleId',
                    templateUrl: './app/GlobalAdmin/Role/templates/edit.html',
                    controller: 'editRoleDialogController',
                    'controllerAs': 'editRoleCtrl',
                    resolve: {
                        RoleByIdPrepService: RoleByIdPrepService,
                        PermissionPrepService: PermissionPrepService
                    },
                    data: {
                        permissions: {
                            only: ['11'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('News', {
                    url: '/News',
                    templateUrl: './app/GlobalAdmin/News/templates/News.html',
                    controller: 'NewsController',
                    'controllerAs': 'NewsCtrl',
                    resolve: {
                    },
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })

                .state('newNews', {
                    url: '/newNews',
                    templateUrl: './app/GlobalAdmin/News/templates/new.html',
                    controller: 'createNewsDialogController',
                    'controllerAs': 'newNewsCtrl',
                    resolve: {
                    },
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editNews', {
                    url: '/editnews/:id',
                    templateUrl: './app/GlobalAdmin/News/templates/edit.html',
                    controller: 'editNewsDialogController',
                    'controllerAs': 'editNewsCtrl',
                    resolve: {
                        NewsByIdPrepService: NewsByIdPrepService,
                    },
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
                .state('Dashboard', {
                    url: '/Dashboard',
                    templateUrl: './app/GlobalAdmin/dashboard/templates/dashboard.html',
                    controller: 'dashboardController',
                    'controllerAs': 'dashboardCtrl',
                    resolve: {
                    },
                    data: {
                        permissions: {
                            only: ['10'],
                            redirectTo: 'root'
                        }
                    }
                })
        })


    userPrepService.$inject = ['UserResource']
    function userPrepService(UserResource) {
        return UserResource.getAllUsers().$promise;
    }

    EditUserPrepService.$inject = ['UserResource', '$stateParams']
    function EditUserPrepService(GetUserResource, $stateParams) {
        return GetUserResource.getUser({ userId: $stateParams.userId }).$promise;
    }
    RolePrepService.$inject = ['RoleResource']
    function RolePrepService(RoleResource) {
        return RoleResource.getAllRoles().$promise;
    }
    RoleByIdPrepService.$inject = ['RoleResource', '$stateParams']
    function RoleByIdPrepService(RoleResource, $stateParams) {
        return RoleResource.getRole({ roleId: $stateParams.roleId }).$promise;
    }

    PermissionPrepService.$inject = ['RoleResource']
    function PermissionPrepService(RoleResource) {
        return RoleResource.getAllPermissions().$promise;
    }

    NewsPrepService.$inject = ['NewsResource']
    function NewsPrepService(NewsResource) {
        return NewsResource.getAllNewss({ pageNumber: 1, pageSize: 10 }).$promise;
    }

    NewssPrepService.$inject = ['NewsResource']
    function NewssPrepService(NewsResource) {
        return NewsResource.getAllNewss().$promise;
    }
    NewsByIdPrepService.$inject = ['NewsResource', '$stateParams']
    function NewsByIdPrepService(NewsResource, $stateParams) {
        return NewsResource.getNews({ id: $stateParams.id }).$promise;
    }

    AreasForUserPrepService.$inject = ['AreaResource', '$stateParams']
    function AreasForUserPrepService(AreaResource, $stateParams) {
        return AreaResource.getAllAreasForUser({ userId: $stateParams.userId }).$promise;
    }
    UserRoleByIdPrepService.$inject = ['UserResource', '$stateParams']
    function UserRoleByIdPrepService(UserResource, $stateParams) {
        return UserResource.getUserRole({ userId: $stateParams.userId }).$promise;
    }

}());(function() {
    'use strict';

      angular
      .module('home')
      .config(config)
      .run(runBlock);

      config.$inject = ['ngProgressLiteProvider'];
    runBlock.$inject = ['$rootScope', 'ngProgressLite','$transitions','blockUI'];

      function config(ngProgressLiteProvider) {
      ngProgressLiteProvider.settings.speed = 1000;

      }

      function runBlock($rootScope, ngProgressLite,$transitions,blockUI) {

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
          startProgress();
      });
      $transitions.onStart({}, function(transition) {
        blockUI.start("Loading..."); 
      });
      $transitions.onSuccess({}, function(transition) {
        blockUI.stop();
      });
      $transitions.onError({  }, function(transition) {
        blockUI.stop();
      });
      var routingDoneEvents = ['$stateChangeSuccess', '$stateChangeError', '$stateNotFound'];

        angular.forEach(routingDoneEvents, function(event) {
        $rootScope.$on(event, function(event, toState, toParams, fromState, fromParams) {
          endProgress();
        });
      });

        function startProgress() {
        ngProgressLite.start();
      }

        function endProgress() {
        ngProgressLite.done();
      }

      }
  })();
  (function () {
  "use strict";

  angular
    .module("home")
    .controller("ArtWorkController", [
      "appCONSTANTS",
      "$scope",
      "$translate",
      "ArtWorkResource",
      "blockUI",
      "$uibModal",
      "ToastService",
      ArtWorkController
    ]);

  function ArtWorkController(appCONSTANTS, $scope, $translate, ArtWorkResource, blockUI, $uibModal, ToastService) {
    $(".pmd-sidebar-nav>li>a").removeClass("active");
    $($(".pmd-sidebar-nav").children()[4].children[0]).addClass("active");
    var vm = this;

    vm.currentPage = 1;
    vm.appCONSTANTS = appCONSTANTS;
    refreshArtWorks();
    function refreshArtWorks() {
      blockUI.start("Loading...");

      var k = ArtWorkResource.getAllArtWorks({ pageNumber: vm.currentPage, pageSize: 10 }).$promise.then(
        function (results) {
          $scope.ArtWorkList = results.items;
          $scope.totalCount = results.metadata.totalItemCount;
          console.log($scope.ArtWorkList);
          blockUI.stop();
        },
        function (data, status) {
          blockUI.stop();
          ToastService.show("right", "bottom", "fadeInUp", data.data, "error");
        }
      );
    }
    function change(artWork, isDeleted) {
      var updateObj = new ArtWorkResource();
      updateObj.id = artWork.id;
      if (!isDeleted) updateObj.status = artWork.status == true ? false : true;
      updateObj.isDeleted = artWork.isDeleted;

      updateObj.$update().then(
        function (data, status) {
          refreshArtWorks();

          ToastService.show("right", "bottom", "fadeInUp", $translate.instant("Editeduccessfully"), "success");
          artWork.status = updateObj.status;
        },
        function (data, status) {
          ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
        }
      );
    }
    vm.UpdateArtWork = function (artWork) {
      change(artWork, false);
    };

    function confirmationDelete(model) {
      var updateObj = new ArtWorkResource();
      updateObj.$delete({ id: model.id }).then(
        function (data, status) {
          refreshArtWorks();
          ToastService.show("right", "bottom", "fadeInUp", $translate.instant("DeletedSuccessfully"), "success");
        },
        function (data, status) {
          ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
        }
      );
    }
    vm.openDeleteDialog = function (model, name, id) {
      var modalContent = $uibModal.open({
        templateUrl: "./app/core/Delete/templates/ConfirmDeleteDialog.html",
        controller: "confirmDeleteDialogController",
        controllerAs: "deleteDlCtrl",
        resolve: {
          model: function () {
            return model;
          },
          itemName: function () {
            return name;
          },
          itemId: function () {
            return id;
          },
          message: function () {
            return null;
          },
          callBackFunction: function () {
            return confirmationDelete;
          }
        }
      });
    };
    vm.ChangeStatus = function (model) {
      var updateObj = new ArtWorkResource();
      updateObj.id = model.id;
      updateObj.title = model.title;
      updateObj.body = model.body;
      updateObj.outdated = model.outdated == true ? false : true;
      updateObj.$update().then(
        function (data, status) {
          ToastService.show("right", "bottom", "fadeInUp", $translate.instant("Editeduccessfully"), "success");
          model.outdated = updateObj.outdated;
        },
        function (data, status) {
          ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
        }
      );
      return;
    };

    vm.changePage = function (page) {
      vm.currentPage = page;
      refreshArtWorks();
    };
  }
})();
(function () {
    angular
        .module('home')
        .factory('ArtWorkResource', ['$resource', 'appCONSTANTS', ArtWorkResource])

    function ArtWorkResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'artWorks', {}, {
            getAllArtWorks: { method: 'POST', url: appCONSTANTS.API_URL + 'artWorks/search', useToken: true, params: { lang: '@lang' } },
            getAllNominees: { method: 'GET', url: appCONSTANTS.API_URL + 'artWorks/nominees', useToken: true, isArray: true, params: { lang: '@lang' } },
            getAllAwards: { method: 'POST', url: appCONSTANTS.API_URL + 'Awards/search', useToken: true, params: { lang: '@lang' } },
            getAllCountries: { method: 'GET', url: appCONSTANTS.API_URL + 'artWorks/countries', useToken: true, isArray: true, params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'PUT', useToken: true },
            getArtWork: { method: 'GET', useToken: true },
            getPayment: { method: 'GET', url: appCONSTANTS.API_URL + 'artWorks/getPayment?id=:id', useToken: true },
            getArtWorkFiles: { method: 'GET', url: appCONSTANTS.API_URL + 'artWorks/getArtWorkFiles?id=:id', isArray: true, useToken: true },
            delete: { method: 'DELETE', useToken: true },
            changeStatus: { method: 'POST', url: appCONSTANTS.API_URL + 'artWorks/ChangeStatus/:id/:status', useToken: true },

            createPayment: { method: 'POST', url: appCONSTANTS.API_URL + 'artWorks/createPayment', useToken: true },
            updatePayment: { method: 'PUT', url: appCONSTANTS.API_URL + 'artWorks/updatePayment', useToken: true },
            UpdateTrailerVideoUrl: { method: 'PUT', url: appCONSTANTS.API_URL + 'artWorks/UpdateTrailerVideoUrl', useToken: true }

        })
    }

}());
(function () {
    'use strict';

    angular
        .module('home')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('ArtWork', {
                    url: '/ArtWork',
                    templateUrl: './app/GlobalAdmin/ArtWork/templates/ArtWork.html',
                    controller: 'ArtWorkController',
                    'controllerAs': 'ArtWorkCtrl',
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
                .state('newArtWork', {
                    url: '/newArtWork',
                    templateUrl: './app/GlobalAdmin/ArtWork/templates/new.html',
                    controller: 'createArtWorkDialogController',
                    'controllerAs': 'newArtWorkCtrl', 
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editArtWork', {
                    url: '/editArtWork/:id',
                    templateUrl: './app/GlobalAdmin/ArtWork/templates/edit.html',
                    controller: 'editArtWorkDialogController',
                    'controllerAs': 'editArtWorkCtrl',
                    resolve: {
                        ArtWorkByIdPrepService: ArtWorkByIdPrepService
                    },
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
                .state('ArtWorkpayment', {
                    url: '/ArtWorkpayment/:id',
                    templateUrl: './app/GlobalAdmin/ArtWork/templates/payment.html',
                    controller: 'artWorkPaymentDialogController',
                    'controllerAs': 'artWorkPaymentCtrl',
                    resolve: {
                        ArtWorkPaymentByArtWorkIdPrepService: ArtWorkPaymentByArtWorkIdPrepService
                    },
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
        });

    ArtWorkPrepService.$inject = ['ArtWorkResource']
    function ArtWorkPrepService(ArtWorkResource) {
        return ArtWorkResource.getAllArtWorks({ pageNumber: 1, pageSize: 10 }).$promise;
    }

    ArtWorkByIdPrepService.$inject = ['ArtWorkResource', '$stateParams']
    function ArtWorkByIdPrepService(ArtWorkResource, $stateParams) {
        return ArtWorkResource.getArtWork({ id: $stateParams.id }).$promise;
    }

    AllAwardPrepService.$inject = ['ArtWorkResource']
    function AllAwardPrepService(ArtWorkResource) {
        return ArtWorkResource.getAllAwards({ pageNumber: 1, pageSize: 10 }).$promise;
    }
 
    ArtWorkPaymentByArtWorkIdPrepService.$inject = ['ArtWorkResource', '$stateParams']
    function ArtWorkPaymentByArtWorkIdPrepService(ArtWorkResource, $stateParams) {
        return ArtWorkResource.getPayment({ id: $stateParams.id }).$promise;
    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('createArtWorkDialogController', ['$uibModal', '$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'ArtWorkResource', 'ToastService', '$rootScope', '$localStorage', createArtWorkDialogController])

    function createArtWorkDialogController($uibModal, $scope, blockUI, $http, $state, appCONSTANTS, $translate, ArtWorkResource,
        ToastService, $rootScope, $localStorage) {
        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.awardList = [];
        vm.nomineeList = [];
        vm.countryList = [];
        vm.selectedAward = "";
        vm.selectedNominee = "";
        vm.selectedCountry = "";
        vm.PaymentStatus = 0;
        vm.showStepOne = true;
        vm.showStepTwo = false;
        vm.receipt = "";

        refreshAwards();
        refreshNominees();
        refreshCountries();

        vm.close = function () {
            $state.go('ArtWork');
        }

        vm.nextStep = function () {
            vm.showStepOne = false;
            vm.showStepTwo = true;
        }

        vm.perviousStep = function () {
            vm.showStepOne = true;
            vm.showStepTwo = false;
        }
        $scope.dateIsValid = false;
        $scope.dateChange = function () {
            debugger;
            if ($('#paymentDate').data('date') == null || $('#paymentDate').data('date') == "") {
                $scope.dateIsValid = false;
            } else if ($scope.newArtWorkForm.$valid) {
                $scope.dateIsValid = true;
            }
        }
        $scope.uploadReceiptFile = function (element) {
            debugger;
            vm.receipt = $(element)[0].files[0];
        };


        vm.AddNewArtWork = function () {
            var splitPoster = vm.posterImage.split(',');
            var splitCover = vm.coverImage.split(',');
            blockUI.start("Loading...");
            var newObj = new ArtWorkResource();
            newObj.Title = vm.Title;
            newObj.AwardId = vm.selectedAward.id;
            newObj.NomineeId = vm.selectedNominee.id;
            newObj.FileCount = vm.FileCount;
            newObj.DateOfRelease = vm.DateOfRelease;
            newObj.Country = vm.selectedCountry.shortName;
            newObj.ShowDescription = vm.ShowDescription;
            newObj.Director = vm.Director.join(', ');
            newObj.Production = vm.Production.join(', ');
            newObj.Writers = vm.Writers.join(', ');
            newObj.Story = vm.Story.join(', ');
            newObj.Crew = vm.Crew.join(', ');

            newObj.Poster = splitPoster[1];
            newObj.PosterFileName = posterImage.type;

            newObj.Cover = splitCover[1];
            newObj.CoverFileName = splitCover[0];



            newObj.$create().then(
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                    debugger;
                    openUploadDialog(data.id, appCONSTANTS.API_URL + 'artWorks/artwork/' + data.id + '/files')


                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.title, "error");
                }
            );
        }


        function callBackUpload(model) {
            debugger
            var updateObj = new ArtWorkResource();
            updateObj.Id = model.id;
            updateObj.FileUrl = model.data.trailerUrl;
            updateObj.FileKey = model.data.trailerId;
            updateObj.$UpdateTrailerVideoUrl().then(
                function (data, status) {
                    debugger;
                    $state.go('ArtWork');

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('DeletedSuccessfully'), "success");
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        function openUploadDialog(id, url) {
            var modalContent = $uibModal.open({
                templateUrl: './app/core/UploadVideo/templates/UploadVideoDialog.html',
                controller: 'uploadVideoController',
                controllerAs: 'uploadDlCtrl',
                resolve: {
                    itemId: function () { return id },
                    url: function () { return url },
                    callBackFunction: function () { return callBackUpload }
                }

            });
        }
        function refreshNominees() {
            var k = ArtWorkResource.getAllNominees().$promise.then(function (results) {
                debugger;
                vm.nomineeList = results;
                blockUI.stop();

            },
                function (data, status) {

                    blockUI.stop();
                });
        }

        function refreshAwards() {
            var k = ArtWorkResource.getAllAwards({ pageNumber: 1, pageSize: 10 }).$promise.then(function (results) {

                vm.awardList = results.items;
                vm.totalCount = results.metadata.totalItemCount;
                blockUI.stop();

            },
                function (data, status) {

                    blockUI.stop();
                });
        }


        function refreshCountries() {
            var k = ArtWorkResource.getAllCountries().$promise.then(function (results) {
                vm.countryList = results;
                blockUI.stop();

            },
                function (data, status) {
                    blockUI.stop();
                });
        }

        vm.LoadUploadPoster = function () {
            $("#posterImage").click();
        }
        var posterImage;
        $scope.AddposterImage = function (element) {
            var logoFile = element[0];

            var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

            if (logoFile && logoFile.size >= 0 && ((logoFile.size / (1024 * 1000)) < 2)) {

                if (allowedImageTypes.indexOf(logoFile.type) !== -1) {
                    $scope.newArtWorkForm.$dirty = true;
                    $scope.$apply(function () {

                        posterImage = logoFile;
                        var reader = new FileReader();

                        reader.onloadend = function () {
                            vm.posterImage = reader.result;

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

        $scope.uploadPosterFile = function (element) {
            vm.posterImage = $(element)[0].files[0];
        };



        vm.LoadUploadTrailerPoster = function () {
            $("#trailerPoster").click();
        }
        var trailerPoster;
        $scope.AddTrailerPoster = function (element) {
            var logoFile = element[0];

            var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

            if (logoFile && logoFile.size >= 0 && ((logoFile.size / (1024 * 1000)) < 2)) {

                if (allowedImageTypes.indexOf(logoFile.type) !== -1) {
                    $scope.newArtWorkForm.$dirty = true;
                    $scope.$apply(function () {

                        trailerPoster = logoFile;
                        var reader = new FileReader();

                        reader.onloadend = function () {
                            vm.trailerPoster = reader.result;

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

        $scope.uploadTrailerPosterFile = function (element) {
            vm.trailerPoster = $(element)[0].files[0];
        };



        vm.LoadUploadCover = function () {
            $("#coverImage").click();
        }
        var coverImage;
        $scope.AddcoverImage = function (element) {
            var logoFile = element[0];

            var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

            if (logoFile && logoFile.size >= 0 && ((logoFile.size / (1024 * 1000)) < 2)) {

                if (allowedImageTypes.indexOf(logoFile.type) !== -1) {
                    $scope.newArtWorkForm.$dirty = true;
                    $scope.$apply(function () {

                        coverImage = logoFile;
                        var reader = new FileReader();

                        reader.onloadend = function () {
                            vm.coverImage = reader.result;

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

        $scope.uploadCoverFile = function (element) {
            vm.coverImage = $(element)[0].files[0];
        };


        vm.LoadUploadreceipt = function () {
            $("#receiptImage").click();
        }
        var receiptImage;
        $scope.AddreceiptImage = function (element) {
            var logoFile = element[0];

            var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

            if (logoFile && logoFile.size >= 0 && ((logoFile.size / (1024 * 1000)) < 2)) {

                if (allowedImageTypes.indexOf(logoFile.type) !== -1) {
                    $scope.newArtWorkForm.$dirty = true;
                    $scope.$apply(function () {

                        receiptImage = logoFile;
                        var reader = new FileReader();

                        reader.onloadend = function () {
                            vm.receiptImage = reader.result;

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

        $scope.uploadreceiptFile = function (element) {
            debugger;
            vm.receiptImage = $(element)[0].files[0];
        };
    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('editArtWorkDialogController', ['$rootScope', '$scope', 'blockUI', '$filter', '$http', '$state', 'appCONSTANTS', '$translate',
            'ArtWorkResource', 'ToastService', 'ArtWorkByIdPrepService', editArtWorkDialogController])

    function editArtWorkDialogController($rootScope, $scope, blockUI, $filter, $http, $state, appCONSTANTS, $translate, ArtWorkResource,
        ToastService, ArtWorkByIdPrepService) {

        refreshAwards();
        refreshNominees();
        refreshCountries();
        var posterImage;
        var vm = this;
        vm.awardList = [];
        vm.nomineeList = [];
        vm.countryList = [];
        vm.productionList = [];
        vm.selectedAward = "";
        vm.selectedNominee = "";
        vm.selectedCountry = "";
        vm.language = appCONSTANTS.supportedLanguage;
        vm.ArtWork = ArtWorkByIdPrepService;
        vm.selectedProduction = null;
        vm.posterImage = vm.ArtWork.posterUrl;
        if (vm.ArtWork.production.indexOf(',') != -1) {
            vm.productionList = vm.ArtWork.production.split(',');
        }
        console.log(vm.ArtWork);
        vm.Close = function () {
            $state.go('ArtWork');
        }
        vm.UpdateArtWork = function () {
            blockUI.start("Loading...");
            debugger;

            var updateObj = new ArtWorkResource();
            updateObj.Id = vm.ArtWork.id;
            updateObj.Title = vm.ArtWork.title;
            updateObj.AwardId = vm.selectedAward.id;
            updateObj.NomineeId = vm.selectedNominee.id;
            updateObj.FileCount = vm.ArtWork.fileCount;
            updateObj.DateOfRelease = vm.ArtWork.dateOfRelease;
            updateObj.Country = vm.selectedCountry.shortName;
            updateObj.ShowDescription = vm.ArtWork.showDescription;
            updateObj.Director = vm.ArtWork.director.join(', ');
            updateObj.Production = vm.ArtWork.production.join(', ');
            updateObj.Writers = vm.ArtWork.writers.join(', ');
            updateObj.Story = vm.ArtWork.story.join(', ');
            updateObj.Crew = vm.ArtWork.crew.join(', ');

            if (posterImage != null) {
                updateObj.Poster = posterImage;
                updateObj.Video = posterImage;

            }

            updateObj.$update().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    blockUI.stop();

                    $state.go('ArtWork');

                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }

        function refreshNominees() {
            var k = ArtWorkResource.getAllNominees().$promise.then(function (results) {
                vm.nomineeList = results;
                blockUI.stop();


                var index = vm.nomineeList.indexOf($filter('filter')(vm.nomineeList, { 'id': vm.ArtWork.nomineeId }, true)[0]);
                vm.selectedNominee = vm.nomineeList[index];
            },
                function (data, status) {

                    blockUI.stop();
                });
        }

        function refreshAwards() {
            var k = ArtWorkResource.getAllAwards({ pageNumber: 1, pageSize: 10 }).$promise.then(function (results) {

                vm.awardList = results.items;
                vm.totalCount = results.metadata.totalItemCount;
                blockUI.stop();
                var index = vm.awardList.indexOf($filter('filter')(vm.awardList, { 'id': vm.ArtWork.awardId }, true)[0]);
                vm.selectedAward = vm.awardList[index];

            },
                function (data, status) {

                    blockUI.stop();
                });
        }


        function refreshCountries() {
            var k = ArtWorkResource.getAllCountries().$promise.then(function (results) {
                vm.countryList = results;
                blockUI.stop();

                var indexRate = vm.countryList.indexOf($filter('filter')(vm.countryList, { 'shortName': vm.ArtWork.country }, true)[0]);
                vm.selectedCountry = vm.countryList[indexRate];


            },
                function (data, status) {
                    blockUI.stop();
                });
        }

        vm.LoadUploadPoster = function () {
            debugger
            $("#posterImage").click();
        }
        $scope.AddposterImage = function (element) {
            var logoFile = element[0];
            debugger
            var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

            if (logoFile && logoFile.size >= 0 && ((logoFile.size / (1024 * 1000)) < 2)) {

                if (allowedImageTypes.indexOf(logoFile.type) !== -1) {
                    $scope.editArtWorkForm.$dirty = true;
                    $scope.$apply(function () {

                        posterImage = logoFile;
                        var reader = new FileReader();

                        reader.onloadend = function () {
                            vm.posterImage = reader.result;

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

        $scope.uploadPosterFile = function (element) {
            debugger;
            vm.posterImage = $(element)[0].files[0];
        };




    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('artWorkPaymentDialogController', ['$scope', 'blockUI', 'status', '$state', '$stateParams', '$translate',
            'ArtWorkResource', 'ToastService', '$rootScope', 'ArtWorkPaymentByArtWorkIdPrepService', artWorkPaymentDialogController])

    function artWorkPaymentDialogController($scope, blockUI, status, $state, $stateParams, $translate, ArtWorkResource,
        ToastService, $rootScope, ArtWorkPaymentByArtWorkIdPrepService) {
        var vm = this;
        var receiptImage;

        vm.statusList = status.StatusList;
        vm.artWorkPayment = ArtWorkPaymentByArtWorkIdPrepService;
        console.log(vm.artWorkPayment)

        if (vm.artWorkPayment.paymentStatus == 'waiting')
            vm.selectedStatus = vm.statusList[0];
        if (vm.artWorkPayment.paymentStatus == 'confirmed')
            vm.selectedStatus = vm.statusList[1];
        if (vm.artWorkPayment.paymentStatus == 'rejected')
            vm.selectedStatus = vm.statusList[2];

        vm.receiptImage = vm.artWorkPayment.receiptUrl;
        vm.close = function () {
            $state.go('ArtWork');
        }

        $scope.dateIsValid = false;
        $scope.dateChange = function () {
            debugger;
            if ($('#paymentDate').data('date') == null || $('#paymentDate').data('date') == "") {
                $scope.dateIsValid = false;
            } else if ($scope.artWorkPaymentForm.$valid) {
                $scope.dateIsValid = true;
            }
        }
        $scope.uploadReceiptFile = function (element) {
            debugger;
            vm.receipt = $(element)[0].files[0];
        };


        vm.AddArtWorkPaymet = function () {
            var fileByte = "";
            var fileName = "";
            if (receiptImage != null) {
                var splitImage = vm.receiptImage.split(',');
                fileByte = splitImage[1];
                fileName = receiptImage.type;
            }

                        blockUI.start("Loading...");
           debugger;
            var newObj = new ArtWorkResource();
            newObj.ArtWorkId = $stateParams.id;
            newObj.PaymentStatus = vm.selectedStatus.Id;
            newObj.TransactionNumber = vm.artWorkPayment.transactionNumber;
            newObj.Amount = vm.artWorkPayment.amount;
            newObj.PaymentDate = +new Date($('#paymentDate').val());
            newObj.Receipt = fileByte;
            newObj.ReceiptFileName = fileName;

            newObj.$createPayment().then(
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                    $state.go('ArtWork');
                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.title, "error");
                }
            );
        }

        vm.UpdatePayment = function () {
            var fileByte = "";
            var fileName = "";
            if (receiptImage != null) {
                var splitImage = vm.receiptImage.split(',');
                fileByte = splitImage[1];
                fileName = receiptImage.type;
            }
            blockUI.start("Loading...");
            var newObj = new ArtWorkResource();
            newObj.Id = vm.artWorkPayment.id;
            newObj.ArtWorkId = $stateParams.id;
            newObj.PaymentStatus = vm.selectedStatus.Id;
            newObj.TransactionNumber = vm.artWorkPayment.transactionNumber;
            newObj.Amount = vm.artWorkPayment.amount;
            newObj.PaymentDate = +new Date($('#paymentDate').val());
            newObj.Receipt = fileByte;
            newObj.ReceiptFileName = fileName;

            newObj.$updatePayment().then(
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                    $state.go('ArtWork');
                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.title, "error");
                }
            );
        }
        vm.LoadUploadreceipt = function () {
            debugger;
            $("#receiptImage").click();
        }
        $scope.AddreceiptImage = function (element) {
            debugger;
            var logoFile = element[0];

            var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

            if (logoFile && logoFile.size >= 0 && ((logoFile.size / (1024 * 1000)) < 2)) {

                if (allowedImageTypes.indexOf(logoFile.type) !== -1) {
                    $scope.artWorkPaymentForm.$dirty = true;
                    $scope.$apply(function () {

                        receiptImage = logoFile;
                        var reader = new FileReader();

                        reader.onloadend = function () {
                            vm.receiptImage = reader.result;

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

        $scope.uploadreceiptFile = function (element) {
            debugger;
            vm.receiptImage = $(element)[0].files[0];
        };
    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('ArtWorkMediaController', ['appCONSTANTS', '$stateParams', 'ArtWorkMediaResource', '$translate', 'ArtWorkResource', 'blockUI', '$uibModal',
            'ToastService', ArtWorkMediaController]);


    function ArtWorkMediaController(appCONSTANTS, $stateParams, ArtWorkMediaResource, $translate, ArtWorkResource, blockUI, $uibModal, ToastService) {
        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[6].children[0]).addClass("active")
        var vm = this;

        vm.currentPage = 1;
        vm.appCONSTANTS = appCONSTANTS; 
        refreshArtWorks();
        function refreshArtWorks() {
            blockUI.start("Loading...");

            var k = ArtWorkResource.getArtWorkFiles({ id: $stateParams.id }).$promise.then(function (results) {
                vm.mediaItemList = results;
                console.log(vm.mediaItemList);
                blockUI.stop();

            },
                function (data, status) {
                    debugger;
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data, "error");
                });
        }


               function confirmationDelete(model) {
         debugger;
            var updateObj = new ArtWorkMediaResource();

                        updateObj.$deleteMediaItem({ id: model.id }).then(
                function (data, status) {
                    refreshArtWorks();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('DeletedSuccessfully'), "success");
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        vm.openDeleteDialog = function (model, name, id) {
            var modalContent = $uibModal.open({
                templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
                controller: 'confirmDeleteDialogController',
                controllerAs: 'deleteDlCtrl',
                resolve: {
                    model: function () { return model },
                    itemName: function () { return name },
                    itemId: function () { return id },
                    message: function () { return null },
                    callBackFunction: function () { return confirmationDelete }
                }

            });
        }


                vm.changePage = function (page) {
            vm.currentPage = page;
            refreshArtWorks();
        }

    }

})();
(function () {
    angular
        .module('home')
        .factory('ArtWorkMediaResource', ['$resource', 'appCONSTANTS', ArtWorkMediaResource])

    function ArtWorkMediaResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'artWorks', {}, {
            createMediaFile: { method: 'POST',url: appCONSTANTS.API_URL + 'artWorks/createMediaFile', useToken: true },
            UpdateMediaItemVideoUrl: { method: 'PUT', url: appCONSTANTS.API_URL + 'artWorks/UpdateMediaItemVideoUrl', useToken: true },
            deleteMediaItem: { method: 'DELETE', url: appCONSTANTS.API_URL + 'artWorks/deleteMediaItem', useToken: true },

              })
    }

}());
(function () {
    'use strict';

    angular
        .module('home')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('ArtWorkMedia', {
                    url: '/ArtWorkMedia/:id',
                    templateUrl: './app/GlobalAdmin/ArtWorkMedia/templates/ArtWorkMedia.html',
                    controller: 'ArtWorkMediaController',
                    'controllerAs': 'ArtWorkMediaCtrl',
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
                .state('newArtWorkMedia', {
                    url: '/newArtWorkMedia/:id',
                    templateUrl: './app/GlobalAdmin/ArtWorkMedia/templates/new.html',
                    controller: 'createArtWorkMediaDialogController',
                    'controllerAs': 'newArtWorkMediaCtrl',
                    resolve: {
                        ArtWorkMediaByArtWorkIdPrepService: ArtWorkMediaByArtWorkIdPrepService
                    },
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editArtWorkMedia', {
                    url: '/editArtWorkMedia/:countryId',
                    templateUrl: './app/GlobalAdmin/ArtWorkMedia/templates/edit.html',
                    controller: 'editArtWorkMediaDialogController',
                    'controllerAs': 'editArtWorkMediaCtrl',
                    resolve: {
                        ArtWorkMediaByIdPrepService: ArtWorkMediaByIdPrepService
                    },
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
        });

    ArtWorkMediaPrepService.$inject = ['ArtWorkMediaResource']
    function ArtWorkMediaPrepService(ArtWorkMediaResource) {
        return ArtWorkMediaResource.getAllArtWorkMedias({ pageNumber: 1, pageSize: 10 }).$promise;
    }

    ArtWorkMediaByIdPrepService.$inject = ['ArtWorkMediaResource', '$stateParams']
    function ArtWorkMediaByIdPrepService(ArtWorkMediaResource, $stateParams) {
        return ArtWorkMediaResource.getArtWorkMedia({ countryId: $stateParams.countryId }).$promise;
    }

    AllAwardPrepService.$inject = ['ArtWorkMediaResource']
    function AllAwardPrepService(ArtWorkMediaResource) {
        return ArtWorkMediaResource.getAllAwards({ pageNumber: 1, pageSize: 10 }).$promise;
    }

    ArtWorkMediaByArtWorkIdPrepService.$inject = ['ArtWorkResource', '$stateParams']
    function ArtWorkMediaByArtWorkIdPrepService(ArtWorkResource, $stateParams) {
        return ArtWorkResource.getArtWorkFiles({ id: $stateParams.id }).$promise;
    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('mediaItemController', ['appCONSTANTS', '$scope', '$translate', 'PhotoAlbumResource', 'blockUI', '$uibModal',
            'ToastService', '$stateParams', mediaItemController]);


    function mediaItemController(appCONSTANTS, $scope, $translate, PhotoAlbumResource, blockUI, $uibModal, ToastService, $stateParams) {
        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[6].children[0]).addClass("active")
        var vm = this;
        vm.currentPage = 1;
        vm.appCONSTANTS = appCONSTANTS;
        refreshMediaItems();
        function refreshMediaItems() {
            blockUI.start("Loading...");
            debugger;
            var k = PhotoAlbumResource.getMediaItems({ id: $stateParams.id }).$promise.then(function (results) {
                vm.mediaItemList = results;
                console.log(vm.mediaItemList);
                blockUI.stop();

            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data, "error");
                });
        } 
        function confirmationDelete(model) {
            var obj = new PhotoAlbumResource();
            obj.$deleteMediaItems({ id: model.id }).then(
                function (data, status) {
                    refreshMediaItems();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('DeletedSuccessfully'), "success");
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        vm.openDeleteDialog = function (model, name, id) {
            var modalContent = $uibModal.open({
                templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
                controller: 'confirmDeleteDialogController',
                controllerAs: 'deleteDlCtrl',
                resolve: {
                    model: function () { return model },
                    itemName: function () { return name },
                    itemId: function () { return id },
                    message: function () { return null },
                    callBackFunction: function () { return confirmationDelete }
                }

            });
        }
        vm.ChangeStatus = function (model) {
            var updateObj = new PhotoAlbumResource();
            updateObj.id = model.id; 
            updateObj.featured = (model.featured == true ? false : true);
            updateObj.$updateMediaItem().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    model.featured = updateObj.featured;
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                }
            );
            return;
        }

        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshMediaItems();
        }



            }

})();
(function () {
    'use strict';

    angular
        .module('home')
        .controller('createMediaItemController', ['$uibModal', '$scope', 'blockUI', '$stateParams', '$state', '$http', '$q', 'appCONSTANTS', '$translate',
            'PhotoAlbumResource', 'ToastService', '$rootScope', createMediaItemController])

    function createMediaItemController($uibModal, $scope, blockUI, $stateParams, $state, $http, $q, appCONSTANTS, $translate, PhotoAlbumResource,
        ToastService, $rootScope) {
        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.selectedMediaType = "";
        vm.close = function () {
            $state.go('PhotoAlbum');
        }


        vm.AddNewMediaItem = function () {

            blockUI.start("Loading...");
            var newObj = new PhotoAlbumResource();
            newObj.Title = vm.title;

            newObj.Featured = vm.isFeatured;
            newObj.MediaType = vm.selectedMediaType;
            newObj.AlbumId = $stateParams.id;
            debugger;
            if (vm.posterVideo != null) {
                var splitVideoImage = vm.posterVideo.split(',');
                newObj.Poster = splitVideoImage[1];
                newObj.PosterFileName = splitVideoImage[0];
            }
            else {
                var splitImage = vm.posterImage.split(',');
                newObj.Media = splitImage[1];
                newObj.MediaFileName = splitImage[0];
            }



            newObj.$createMediaItem().then(
                function (data, status) {
                    blockUI.stop();
                    debugger;
                    if (data.mediaType == 'image') {
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                        $state.go('mediaItems', { id: $stateParams.id });

                    } else {
                        openUploadDialog(data.id, appCONSTANTS.API_URL + 'albums/mediaItems/' + data.id + '/files')
                    }
                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.title, "error");
                }
            );
        }

        vm.LoadUploadPoster = function () {
            $("#posterImage").click();
            debugger;
        }
        var posterImage;
        $scope.AddposterImage = function (element) {
            debugger;
            var logoFile = element[0];
            var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

            if (logoFile && logoFile.size >= 0 && ((logoFile.size / (1024 * 1000)) < 2)) {

                if (allowedImageTypes.indexOf(logoFile.type) !== -1) {
                    $scope.newMediaItemForm.$dirty = true;
                    $scope.$apply(function () {

                        posterImage = logoFile;
                        var reader = new FileReader();

                        reader.onloadend = function () {
                            vm.posterImage = reader.result;

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

        $scope.uploadPosterFile = function (element) {
            debugger;
            vm.posterImage = $(element)[0].files[0];
        };



        vm.LoadUploadPosterVideo = function () {
            $("#posterVideo").click();
        }
        var posterVideo;
        $scope.AddposterVideo = function (element) {
            var logoFile = element[0];
            var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']
            if (logoFile && logoFile.size >= 0 && ((logoFile.size / (1024 * 1000)) < 2)) {

                if (allowedImageTypes.indexOf(logoFile.type) !== -1) {
                    $scope.newMediaItemForm.$dirty = true;
                    $scope.$apply(function () {

                        posterVideo = logoFile;
                        var reader = new FileReader();

                        reader.onloadend = function () {
                            vm.posterVideo = reader.result;

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

        $scope.uploadPosterVideoFile = function (element) {
            debugger;
            vm.posterVideo = $(element)[0].files[0];
        };

        function callBackUpload(model) {
            debugger
            var updateObj = new PhotoAlbumResource();
            updateObj.Id = model.id;
            updateObj.FileUrl = model.data.fileUrl;
            updateObj.FileKey = model.data.fileKey;
            updateObj.$UpdateMediaItemVideoUrl().then(
                function (data, status) {
                    debugger;
                    $state.go('mediaItems', { id: $stateParams.id });

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('DeletedSuccessfully'), "success");
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        function openUploadDialog(id, url) {
            var modalContent = $uibModal.open({
                templateUrl: './app/core/UploadVideo/templates/UploadVideoDialog.html',
                controller: 'uploadVideoController',
                controllerAs: 'uploadDlCtrl',
                resolve: {
                    itemId: function () { return id },
                    url: function () { return url },
                    callBackFunction: function () { return callBackUpload }
                }

            });
        }
    }
}());
(function () {
    'use strict';

    angular
        .module('home')

        .directive('fileModel', ['$parse', function ($parse) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var model, modelSetter;

                    attrs.$observe('fileModel', function (fileModel) {
                        model = $parse(attrs.fileModel);
                        modelSetter = model.assign;
                    });

                    element.bind('change', function () {
                        scope.$apply(function () {
                            modelSetter(scope.$parent, element[0].files[0]);
                        });
                    });
                }
            };
        }])
        .service('fileUpload', ['$http', function ($http) {
            this.uploadFileToUrl = function (file, uploadUrl) {
                var fd = new FormData();
                fd.append('file', file);
                $http.post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: { 'Content-Type': undefined }
                })
                    .success(function () {
                    })
                    .error(function () {
                    });
            }
        }])

        .filter("range", function () {
            return (x, n) => Array.from({ length: n }, (x, index) => (index));
        })
        .controller('createArtWorkMediaDialogController', ['$stateParams', 'blockUI', '$uibModal', '$state', 'appCONSTANTS', '$translate',
            'ArtWorkResource', 'ArtWorkMediaResource', 'ToastService', 'ArtWorkMediaByArtWorkIdPrepService', createArtWorkMediaDialogController])

    function createArtWorkMediaDialogController($stateParams, blockUI, $uibModal, $state, appCONSTANTS, $translate, ArtWorkResource,
        ArtWorkMediaResource, ToastService, ArtWorkMediaByArtWorkIdPrepService) {
        var vm = this;

        vm.language = appCONSTANTS.supportedLanguage;
        vm.close = function () {
            $state.go('ArtWorkMedia', { id: $stateParams.id });
        }

        vm.AddNewArtWorkMedia = function () {
            debugger;
            blockUI.start("Loading...");
            var newObj = new ArtWorkMediaResource();
            newObj.ArtWorkId = $stateParams.id;
            newObj.Description = vm.title;
            newObj.$createMediaFile().then(
                function (data, status) {
                    blockUI.stop();
                    openUploadDialog(data.id, appCONSTANTS.API_URL + 'artWorks/artwork/' + data.id + '/files')
                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data, "error");
                }
            );
        }

        function callBackUpload(model) {
            debugger
            var updateObj = new ArtWorkMediaResource();
            updateObj.Id = model.id;
            updateObj.FileUrl = model.data.trailerUrl;
            updateObj.FileKey = model.data.trailerId;
            updateObj.$UpdateMediaItemVideoUrl().then(
                function (data, status) {
                    debugger;
                    $state.go('ArtWorkMedia', { id: $stateParams.id });

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('DeletedSuccessfully'), "success");
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        function openUploadDialog(id, url) {
            var modalContent = $uibModal.open({
                templateUrl: './app/core/UploadVideo/templates/UploadVideoDialog.html',
                controller: 'uploadVideoController',
                controllerAs: 'uploadDlCtrl',
                resolve: {
                    itemId: function () { return id },
                    url: function () { return url },
                    callBackFunction: function () { return callBackUpload }
                }

            });
        }

    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('editArtWorkMediaDialogController', ['$rootScope', '$scope', 'blockUI', '$filter', '$http', '$state', 'appCONSTANTS', '$translate',
            'ArtWorkResource', 'ToastService', 'ArtWorkByIdPrepService', editArtWorkMediaDialogController])

    function editArtWorkMediaDialogController($rootScope, $scope, blockUI, $filter, $http, $state, appCONSTANTS, $translate, ArtWorkResource,
        ToastService, ArtWorkByIdPrepService) {
        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.ArtWork = ArtWorkByIdPrepService;
     debugger; 

        vm.Close = function () {
            $state.go('ArtWork');
        }
        vm.UpdateArtWork = function () {
            blockUI.start("Loading...");
            debugger;

            var updateObj = new ArtWorkResource();
            updateObj.Id = vm.ArtWork.id;
            updateObj.title = vm.ArtWork.title;
            updateObj.body = vm.ArtWork.body;
            if ($scope.file != null) {
                updateObj.Poster = $scope.file;

            }
            updateObj.$update().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    blockUI.stop();

                    $state.go('ArtWork');

                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('AwardController', ['appCONSTANTS', '$scope', '$translate', 'AwardResource', 'blockUI', '$uibModal',
            'ToastService', AwardController]);


    function AwardController(appCONSTANTS, $scope, $translate, AwardResource, blockUI, $uibModal, ToastService) {
        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[5].children[0]).addClass("active")
        var vm = this;

        vm.currentPage = 1;
        vm.appCONSTANTS = appCONSTANTS;

        refreshAwards();
        function refreshAwards() {
            blockUI.start("Loading...");

            var k = AwardResource.getAllAwards({ pageNumber: vm.currentPage, pageSize: 10 }).$promise.then(function (results) {
                $scope.AwardList = results.items;
                $scope.totalCount = results.metadata.totalItemCount;
                console.log($scope.AwardList);
                blockUI.stop();

            },
                function (data, status) { 
                blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data, "error");
                });
        }
        vm.showMore = function (element) {
            $(element.currentTarget).toggleClass("child-table-collapse");
        }

                function confirmationDelete(model) {
            var updateObj = new AwardResource();
            updateObj.$delete({ id: model.id }).then(
                function (data, status) {
                    refreshAwards();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('DeletedSuccessfully'), "success");
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        vm.openDeleteDialog = function (model, name, id) {
            var modalContent = $uibModal.open({
                templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
                controller: 'confirmDeleteDialogController',
                controllerAs: 'deleteDlCtrl',
                resolve: {
                    model: function () { return model },
                    itemName: function () { return name },
                    itemId: function () { return id },
                    message: function () { return null },
                    callBackFunction: function () { return confirmationDelete }
                }

            });
        }
        vm.ChangeStatus = function (model) {
            var updateObj = new AwardResource();
            updateObj.id = model.id;
            updateObj.title = model.title;
            updateObj.body = model.body;
            updateObj.outdated = (model.outdated == true ? false : true);
            updateObj.$update().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    model.outdated = updateObj.outdated;
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                }
            );
            return;
        }

        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshAwards();
        }

    }

})();
(function () {
    angular
        .module('home')
        .factory('AwardResource', ['$resource', 'appCONSTANTS', AwardResource])

    function AwardResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Awards', {}, {
            getAllAwards: { method: 'POST', url: appCONSTANTS.API_URL + 'Awards/search', useToken: true, params: { lang: '@lang' } },
            getAllJudges: { method: 'GET', url: appCONSTANTS.API_URL + 'Awards/judges', useToken: true, isArray: true, params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'PUT', useToken: true },
            getAward: { method: 'GET', useToken: true },
            delete: { method: 'DELETE', useToken: true },
            getAwardDetails: { method: 'GET', url: appCONSTANTS.API_URL + 'Awards/getAwardDetails?id=:id',  useToken: true },
        })
    }

}());
(function () {
    'use strict';

    angular
        .module('home')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('Award', {
                    url: '/Award',
                    templateUrl: './app/GlobalAdmin/Award/templates/Award.html',
                    controller: 'AwardController',
                    'controllerAs': 'AwardCtrl',
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
                .state('newAward', {
                    url: '/newAward',
                    templateUrl: './app/GlobalAdmin/Award/templates/new.html',
                    controller: 'createAwardDialogController',
                    'controllerAs': 'newAwardCtrl',
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editAward', {
                    url: '/editAward/:id',
                    templateUrl: './app/GlobalAdmin/Award/templates/edit.html',
                    controller: 'editAwardDialogController',
                    'controllerAs': 'editAwardCtrl',
                    resolve: {
                        AwardDetailsByAwardIdPrepService: AwardDetailsByAwardIdPrepService 
                    },
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
        });

    AwardPrepService.$inject = ['AwardResource']
    function AwardPrepService(AwardResource) {
        return AwardResource.getAllAwards({ pageNumber: 1, pageSize: 10 }).$promise;
    }

    AwardByIdPrepService.$inject = ['AwardResource', '$stateParams']
    function AwardByIdPrepService(AwardResource, $stateParams) {
        return AwardResource.getAward({ id: $stateParams.id }).$promise;
    }

    AllAwardPrepService.$inject = ['AwardResource']
    function AllAwardPrepService(AwardResource) {
        return AwardResource.getAllAwards({ pageNumber: 1, pageSize: 10 }).$promise;
    }

    AwardDetailsByAwardIdPrepService.$inject = ['AwardResource', '$stateParams']
    function AwardDetailsByAwardIdPrepService(AwardResource, $stateParams) {
        return AwardResource.getAwardDetails({ id: $stateParams.id }).$promise;
    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('createBoothDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'BoothResource', 'ToastService', '$rootScope', createBoothDialogController])

    function createBoothDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, BoothResource,
        ToastService, $rootScope) {
        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.close = function () {
            $state.go('Booth');
        }


        vm.AddNewBooth = function () {
            blockUI.start("Loading...");
            var newObj = new BoothResource();
            newObj.Description = vm.Description;
            newObj.Code = vm.Code;
            newObj.Price = vm.Price;
            newObj.$create().then(
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                    $state.go('Booth');
                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.title, "error");
                }
            );
        }

    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('editAwardDialogController', ['$rootScope', '$scope', 'blockUI', '$filter', '$http', '$state', 'appCONSTANTS', '$translate',
            'AwardResource', 'ToastService', 'AwardDetailsByAwardIdPrepService', editAwardDialogController])

    function editAwardDialogController($rootScope, $scope, blockUI, $filter, $http, $state, appCONSTANTS, $translate, AwardResource,
        ToastService, AwardDetailsByAwardIdPrepService) {
        var vm = this;
        vm.judgesList = [];
        vm.ManagerList = [];
        vm.selectedManager = "";
        vm.selectedJudges = [];
        vm.language = appCONSTANTS.supportedLanguage;
        vm.Award = AwardDetailsByAwardIdPrepService;
        console.log(vm.Award);
        refreshJudgess();
        vm.Close = function () {
            $state.go('Award');
        }
        vm.UpdateAward = function () {
            blockUI.start("Loading...");
            debugger;

            var updateObj = new AwardResource();
            updateObj.Id = vm.Award.id;
            updateObj.ManagerId = vm.selectedManager.id;
            updateObj.JudgeAwards = vm.selectedJudges;
            updateObj.Title = vm.Award.title;
            updateObj.Description = vm.Award.description;
            updateObj.$update().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    blockUI.stop();

                    $state.go('Award');

                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }

        function refreshJudgess() {
            var k = AwardResource.getAllJudges().$promise.then(function (results) {
                vm.judgesList = results;
                vm.ManagerList = results;
                blockUI.stop();
                debugger;
                if (vm.Award.judgeAwards != null) {
                    var i;
                    for (i = 0; i < vm.Award.judgeAwards.length; i++) {
                        var index = vm.judgesList.indexOf($filter('filter')(vm.judgesList, { 'id': vm.Award.judgeAwards[i].judgeId }, true)[0]);
                        vm.selectedJudges.push(vm.judgesList[index]);

                    }
                }
                var index = vm.ManagerList.indexOf($filter('filter')(vm.ManagerList, { 'id': vm.Award.managerId }, true)[0]);
                vm.selectedManager = vm.ManagerList[index];
            },
                function (data, status) {

                    blockUI.stop();
                });
        }
    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('BoothController', ['appCONSTANTS', '$scope', '$translate', 'BoothResource', 'blockUI', '$uibModal',
            'ToastService', BoothController]);


    function BoothController(appCONSTANTS, $scope, $translate, BoothResource, blockUI, $uibModal, ToastService) {
        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[3].children[0]).addClass("active")
        var vm = this; 
        vm.currentPage = 1;
        vm.appCONSTANTS = appCONSTANTS;

        refreshBooths();
        function refreshBooths() {
            blockUI.start("Loading...");

            var k = BoothResource.getAllBooths({ pageNumber: vm.currentPage, pageSize: 10 }).$promise.then(function (results) {
                $scope.BoothList = results.items;
                $scope.totalCount = results.metadata.totalItemCount;
                console.log($scope.BoothList);
                blockUI.stop();

            },
                function (data, status) { 
                blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data, "error");
                });
        }
        vm.showMore = function (element) {
            $(element.currentTarget).toggleClass("child-table-collapse");
        }

                function confirmationDelete(model) {
            var updateObj = new BoothResource();
            updateObj.$delete({ id: model.id }).then(
                function (data, status) {
                    refreshBooths();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('DeletedSuccessfully'), "success");
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        vm.openDeleteDialog = function (model, name, id) {
            var modalContent = $uibModal.open({
                templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
                controller: 'confirmDeleteDialogController',
                controllerAs: 'deleteDlCtrl',
                resolve: {
                    model: function () { return model },
                    itemName: function () { return name },
                    itemId: function () { return id },
                    message: function () { return null },
                    callBackFunction: function () { return confirmationDelete }
                }

            });
        }
        vm.ChangeStatus = function (model) {
            var updateObj = new BoothResource();
            updateObj.id = model.id;
            updateObj.title = model.title;
            updateObj.body = model.body;
            updateObj.outdated = (model.outdated == true ? false : true);
            updateObj.$update().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    model.outdated = updateObj.outdated;
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                }
            );
            return;
        }

        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshBooths();
        }

    }

})();
(function () {
    angular
        .module('home')
        .factory('BoothResource', ['$resource', 'appCONSTANTS', BoothResource])

    function BoothResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'booths', {}, {
            getAllBooths: { method: 'POST', url: appCONSTANTS.API_URL + 'booths/search', useToken: true, params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'PUT', useToken: true },
            getBooth: { method: 'GET', useToken: true },
            delete: { method: 'DELETE', useToken: true },
            changeStatus: { method: 'POST', url: appCONSTANTS.API_URL + 'booths/ChangeStatus/:id/:status', useToken: true },
            getPayment: { method: 'GET', url: appCONSTANTS.API_URL + 'booths/getPayment?id=:id', useToken: true },
            updatePayment: { method: 'PUT', url: appCONSTANTS.API_URL + 'booths/updatePayment', useToken: true },
            createPayment: { method: 'POST', url: appCONSTANTS.API_URL + 'booths/createPayment', useToken: true },
        })
    }

}());
(function () {
    'use strict';

    angular
        .module('home')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('Booth', {
                    url: '/Booth',
                    templateUrl: './app/GlobalAdmin/Booth/templates/Booth.html',
                    controller: 'BoothController',
                    'controllerAs': 'BoothCtrl',
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
                .state('newBooth', {
                    url: '/newBooth',
                    templateUrl: './app/GlobalAdmin/Booth/templates/new.html',
                    controller: 'createBoothDialogController',
                    'controllerAs': 'newBoothCtrl',
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editBooth', {
                    url: '/editBooth/:id',
                    templateUrl: './app/GlobalAdmin/Booth/templates/edit.html',
                    controller: 'editBoothDialogController',
                    'controllerAs': 'editBoothCtrl',
                    resolve: {
                        BoothByIdPrepService: BoothByIdPrepService
                    },
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })

                .state('boothPayment', {
                    url: '/boothPayment/:id',
                    templateUrl: './app/GlobalAdmin/Booth/templates/payment.html',
                    controller: 'boothPaymentDialogController',
                    'controllerAs': 'boothPaymentCtrl',
                    resolve: {
                        BoothPaymentByBoothIdPrepService: BoothPaymentByBoothIdPrepService
                    },
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })

                .state('newBoothPayment', {
                    url: '/newBoothPayment/:id',
                    templateUrl: './app/GlobalAdmin/Booth/templates/newBoothPayment.html',
                    controller: 'newBoothPaymentDialogController',
                    'controllerAs': 'newBoothPaymentCtrl',
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
        });

    BoothPrepService.$inject = ['BoothResource']
    function BoothPrepService(BoothResource) {
        return BoothResource.getAllBooths({ pageNumber: 1, pageSize: 10 }).$promise;
    }

    BoothByIdPrepService.$inject = ['BoothResource', '$stateParams']
    function BoothByIdPrepService(BoothResource, $stateParams) {
        return BoothResource.getBooth({ id: $stateParams.id }).$promise;
    }

    AllAwardPrepService.$inject = ['BoothResource']
    function AllAwardPrepService(BoothResource) {
        return BoothResource.getAllAwards({ pageNumber: 1, pageSize: 10 }).$promise;
    }

    BoothPaymentByBoothIdPrepService.$inject = ['BoothResource', '$stateParams']
    function BoothPaymentByBoothIdPrepService(BoothResource, $stateParams) {
        return BoothResource.getPayment({ id: $stateParams.id }).$promise;
    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('createBoothDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'BoothResource', 'ToastService', '$rootScope', createBoothDialogController])

    function createBoothDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, BoothResource,
        ToastService, $rootScope) {
        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.close = function () {
            $state.go('Booth');
        }


        vm.AddNewBooth = function () {
            blockUI.start("Loading...");
            var newObj = new BoothResource();
            newObj.Description = vm.Description;
            newObj.Code = vm.Code;
            newObj.Area = vm.Area;
            newObj.Price = vm.Price;
            newObj.$create().then(
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                    $state.go('Booth');
                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.title, "error");
                }
            );
        }

    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('editBoothDialogController', ['$rootScope', '$scope', 'blockUI', '$filter', '$http', '$state', 'appCONSTANTS', '$translate',
            'BoothResource', 'ToastService', 'BoothByIdPrepService', editBoothDialogController])

    function editBoothDialogController($rootScope, $scope, blockUI, $filter, $http, $state, appCONSTANTS, $translate, BoothResource,
        ToastService, BoothByIdPrepService) {
        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.Booth = BoothByIdPrepService; 
        console.log(vm.Booth);

        vm.Close = function () {
            $state.go('Booth');
        }
        vm.UpdateBooth = function () { 
            blockUI.start("Loading...");
            debugger;

            var updateObj = new BoothResource();
            updateObj.Id = vm.Booth.id;
            updateObj.Description = vm.Booth.description;
            updateObj.Code = vm.Booth.code;
            updateObj.Price = vm.Booth.price;
            updateObj.Area = vm.Booth.area;
            updateObj.$update().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    blockUI.stop();

                    $state.go('Booth');

                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('newBoothPaymentDialogController', ['$scope', 'blockUI', '$http', '$state', '$stateParams', '$translate',
            'BoothResource', 'ToastService', '$rootScope', 'status', newBoothPaymentDialogController])

    function newBoothPaymentDialogController($scope, blockUI, $http, $state, $stateParams, $translate, BoothResource,
        ToastService, $rootScope, status) {
        var vm = this;
        var receiptImage;
        vm.statusList = status.StatusList;

        vm.close = function () {
            $state.go('Booth');
        }

        $scope.dateIsValid = false;
        $scope.dateChange = function () {
            debugger;
            if ($('#paymentDate').data('date') == null || $('#paymentDate').data('date') == "") {
                $scope.dateIsValid = false;
            } else if ($scope.boothPaymentForm.$valid) {
                $scope.dateIsValid = true;
            }
        }

        vm.UpdatePayment = function () {
            debugger;
            var fileByte = "";
            var fileName = "";
            blockUI.start("Loading...");
            var newObj = new BoothResource();
            newObj.ContactName = vm.contactName;
            newObj.Phone1 = vm.phone1;
            newObj.Phone2 = vm.phone2;
            newObj.Email = vm.email;
            newObj.BoothId = $stateParams.id;
            if (receiptImage != null) {
                var splitImage = vm.receiptImage.split(',');
                fileByte = splitImage[1];
                fileName = receiptImage.type;
            }

            var Payment = {
                TransactionNumber: vm.payment.transactionNumber,
                Amount: vm.payment.amount,
                PaymentDate: +new Date($('#paymentDate').val()),
                PaymentStatus: vm.selectedStatus.Id,
                Receipt: fileByte,
                ReceiptFileName: fileName
            };
            newObj.Payment = Payment;

            newObj.$createPayment().then(
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                    $state.go('Booth');
                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data, "error");
                }
            );
        }
        vm.LoadUploadreceipt = function () {
            debugger;
            $("#receiptImage").click();
        }
        $scope.AddreceiptImage = function (element) {
            debugger;
            var logoFile = element[0];

            var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

            if (logoFile && logoFile.size >= 0 && ((logoFile.size / (1024 * 1000)) < 2)) {

                if (allowedImageTypes.indexOf(logoFile.type) !== -1) {
                    $scope.boothPaymentForm.$dirty = true;
                    $scope.$apply(function () {

                        receiptImage = logoFile;
                        var reader = new FileReader();

                        reader.onloadend = function () {
                            vm.receiptImage = reader.result;

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

        $scope.uploadreceiptFile = function (element) {
            debugger;
            vm.receiptImage = $(element)[0].files[0];
        };
    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('boothPaymentDialogController', ['$scope', 'blockUI', '$http', '$state', '$stateParams', '$translate',
            'BoothResource', 'ToastService', '$rootScope', 'status', 'BoothPaymentByBoothIdPrepService', boothPaymentDialogController])

    function boothPaymentDialogController($scope, blockUI, $http, $state, $stateParams, $translate, BoothResource,
        ToastService, $rootScope, status, BoothPaymentByBoothIdPrepService) {
        var vm = this;
        var receiptImage;
        debugger;
        vm.statusList = status.StatusList;
        vm.boothPayment = BoothPaymentByBoothIdPrepService;
        console.log(vm.boothPayment);

        if (vm.boothPayment.payment.paymentStatus == 'waiting')
            vm.selectedStatus = vm.statusList[0];
        if (vm.boothPayment.payment.paymentStatus == 'confirmed')
            vm.selectedStatus = vm.statusList[1];
        if (vm.boothPayment.payment.paymentStatus == 'rejected')
            vm.selectedStatus = vm.statusList[2];

        vm.receiptImage = vm.boothPayment.payment.receiptUrl;
        vm.close = function () {
            $state.go('Booth');
        }

        $scope.dateIsValid = false;
        $scope.dateChange = function () {
            debugger;
            if ($('#paymentDate').data('date') == null || $('#paymentDate').data('date') == "") {
                $scope.dateIsValid = false;
            } else if ($scope.boothPaymentForm.$valid) {
                $scope.dateIsValid = true;
            }
        }

        vm.UpdatePayment = function () {
            blockUI.start("Loading...");
            var newObj = new BoothResource();
            newObj.Id = vm.boothPayment.payment.id;
            newObj.PaymentStatus = vm.selectedStatus.Id;
            newObj.TransactionNumber = vm.boothPayment.payment.transactionNumber;
            newObj.Amount = vm.boothPayment.payment.amount;
            newObj.PaymentDate = +new Date($('#paymentDate').val());
            if (receiptImage != null) {
                var splitImage = vm.receiptImage.split(',');
                newObj.Receipt = splitImage[1];
                newObj.ReceiptFileName = receiptImage.type;
            }

            newObj.$updatePayment().then(
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                    $state.go('Booth');
                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.title, "error");
                }
            );
        }
        vm.LoadUploadreceipt = function () {
            debugger;
            $("#receiptImage").click();
        }
        $scope.AddreceiptImage = function (element) {
            debugger;
            var logoFile = element[0];

            var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

            if (logoFile && logoFile.size >= 0 && ((logoFile.size / (1024 * 1000)) < 2)) {

                if (allowedImageTypes.indexOf(logoFile.type) !== -1) {
                    $scope.boothPaymentForm.$dirty = true;
                    $scope.$apply(function () {

                        receiptImage = logoFile;
                        var reader = new FileReader();

                        reader.onloadend = function () {
                            vm.receiptImage = reader.result;

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

        $scope.uploadreceiptFile = function (element) {
            debugger;
            vm.receiptImage = $(element)[0].files[0];
        };
    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .directive('player', ['$sce', function ($sce) {
            'use strict';
            return {
                restrict: 'E',
                scope: {
                    videos: '='
                },
                link: function (scope, element, attrs) {
                    var video = element.find('video');
                    element.addClass('player');
                    scope.playing = false;
                    scope.trustSrc = function (src) {
                        return $sce.trustAsResourceUrl(src);
                    }

                    video.on('timeupdate', function (e) {
                        scope.$apply(function () {
                            scope.percent = (video[0].currentTime / video[0].duration) * 100;
                        });
                    });

                    scope.frame = function (num) {
                        if (video[0].readyState !== 0) {
                            video[0].currentTime += num;
                        }
                    };

                    scope.toggle = function () {
                        if (video[0].paused === true) {
                            video[0].play();
                            scope.playing = true;
                        } else {
                            video[0].pause();
                            scope.playing = false;
                        }
                    };
                },
                template: '<video preload="none" poster="{{ trustSrc(videos[0].poster) }}">' +
                    '<source ng-repeat="item in videos" ng-src="{{ trustSrc(item.src) }}" type="video/{{ item.type }}" />' +
                    '<track kind="captions" ng-src="{{ trustSrc(videos[0].captions) }}" srclang="en" label="English" />' +
                    '</video>' +
                    '<progressbar value="percent" max="100"></progressbar>' +
                    '<div class="controls noselect">' +
                    '<a ng-click="frame(-0.04)">&lt;</a>' +
                    '<a ng-click="toggle()"> <span ng-show="!playing">&#9654;</span><span ng-show="playing">&#9616;&#9616;</span> </a>' +
                    '<a ng-click="frame(0.04)">&gt;</a>' +
                    '</div>'
            };
        }])
        .controller('DisplayVideoController', ['appCONSTANTS', 'MediaFileByIdPrepService', '$scope', '$translate', 'JudgeArtWorkResource', 'blockUI', '$uibModal',
            'ToastService', '$stateParams', DisplayVideoController]);


    function DisplayVideoController(appCONSTANTS, MediaFileByIdPrepService, $scope, $translate, JudgeArtWorkResource, blockUI, $uibModal, ToastService, $stateParams) {
        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[6].children[0]).addClass("active")
        var vm = this;
        vm.currentPage = 1;
        vm.appCONSTANTS = appCONSTANTS;
        vm.mediaFile = MediaFileByIdPrepService;
        console.log('viedo', MediaFileByIdPrepService);


    }

})();
(function () {
    'use strict';

    angular
        .module('home')
        .controller('JudgeArtWorkController', ['appCONSTANTS', '$scope', '$translate', 'JudgeArtWorkResource', 'blockUI', '$uibModal',
            'ToastService', '$stateParams', JudgeArtWorkController]);


    function JudgeArtWorkController(appCONSTANTS, $scope, $translate, JudgeArtWorkResource, blockUI, $uibModal, ToastService, $stateParams) {
        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[6].children[0]).addClass("active")
        var vm = this;
        vm.currentPage = 1;
        vm.appCONSTANTS = appCONSTANTS;

        refreshJudgeArtWorks();
        function refreshJudgeArtWorks() {
            blockUI.start("Loading..."); 

            var k = JudgeArtWorkResource.getJudgeArtWorks({ id: $scope.user.id }, null).$promise.then(function (results) {

                               $scope.JudgeArtWorkList = results;
                console.log($scope.JudgeArtWorkList);
                blockUI.stop();

            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data, "error");
                });
        }
        vm.showMore = function (element) {
            $(element.currentTarget).toggleClass("child-table-collapse");
        }

        function confirmationDelete(model) {
            var updateObj = new JudgeArtWorkResource();
            updateObj.$delete({ id: model.id }).then(
                function (data, status) {
                    refreshJudgeArtWorks();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('DeletedSuccessfully'), "success");
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        vm.openDeleteDialog = function (model, name, id) {
            var modalContent = $uibModal.open({
                templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
                controller: 'confirmDeleteDialogController',
                controllerAs: 'deleteDlCtrl',
                resolve: {
                    model: function () { return model },
                    itemName: function () { return name },
                    itemId: function () { return id },
                    message: function () { return null },
                    callBackFunction: function () { return confirmationDelete }
                }

            });
        }
        vm.ChangeStatus = function (model) {
            var updateObj = new JudgeArtWorkResource();
            updateObj.id = model.id;
            updateObj.title = model.title;
            updateObj.body = model.body;
            updateObj.outdated = (model.outdated == true ? false : true);
            updateObj.$update().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    model.outdated = updateObj.outdated;
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                }
            );
            return;
        }

        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshJudgeArtWorks();
        }

    }

})();
(function () {
    angular
        .module('home')
        .factory('JudgeArtWorkResource', ['$resource', 'appCONSTANTS', JudgeArtWorkResource])

    function JudgeArtWorkResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'judgeVote', {}, {
            getAllVotingCriterias: { method: 'POST', url: appCONSTANTS.API_URL + 'votingCriterias/search', useToken: true, params: { lang: '@lang' } },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'judgeVote/submitJudgeVote', useToken: true },
            getJudgeArtWork: { method: 'GET', useToken: true },
            delete: { method: 'DELETE', useToken: true },
            getJudgeArtWorks: { method: 'POST', url: appCONSTANTS.API_URL + 'artWorks/getJudgeArtWorks?id=:id', isArray: true, useToken: true },
            getMediaFile: { method: 'GET', url: appCONSTANTS.API_URL + 'artWorks/getMediaFile?id=:id', useToken: true },
            getJudgeVoteCriteriaValues: { method: 'GET', url: appCONSTANTS.API_URL + 'judgeVote/getJudgeVoteCriteriaValues?id=:id', isArray: true, useToken: true }
        })
    }

}());
(function () {
    'use strict';

    angular
        .module('home')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('JudgeArtWork', {
                    url: '/JudgeArtWork',
                    templateUrl: './app/GlobalAdmin/JudgeArtWork/templates/JudgeArtWork.html',
                    controller: 'JudgeArtWorkController',
                    'controllerAs': 'JudgeArtWorkCtrl', 
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
                .state('viewJudgeArtWork', {
                    url: '/viewJudgeArtWork/:id',
                    templateUrl: './app/GlobalAdmin/JudgeArtWork/templates/view.html',
                    controller: 'viewJudgeArtWorkController',
                    'controllerAs': 'viewJudgeArtWorkCtrl',
                    resolve: {
                        ArtWorkByIdPrepService: ArtWorkByIdPrepService,
                        ArtWorkMediaByArtWorkIdPrepService: ArtWorkMediaByArtWorkIdPrepService
                    },
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
                .state('displayVideo', {
                    url: '/displayVideo/:id',
                    templateUrl: './app/GlobalAdmin/JudgeArtWork/templates/displayVideo.html',
                    controller: 'DisplayVideoController',
                    'controllerAs': 'displayVideoCtrl',
                    resolve: {
                        MediaFileByIdPrepService: MediaFileByIdPrepService, 
                    },
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
        });

    JudgeArtWorkPrepService.$inject = ['JudgeArtWorkResource']
    function JudgeArtWorkPrepService(JudgeArtWorkResource) {
        return JudgeArtWorkResource.getAllJudgeArtWorks({ pageNumber: 1, pageSize: 10 }).$promise;
    }

    JudgeArtWorkByIdPrepService.$inject = ['JudgeArtWorkResource', '$stateParams']
    function JudgeArtWorkByIdPrepService(JudgeArtWorkResource, $stateParams) {
        return JudgeArtWorkResource.getJudgeArtWork({ id: $stateParams.id }).$promise;
    }

    AllJudgeArtWorkPrepService.$inject = ['JudgeArtWorkResource']
    function AllJudgeArtWorkPrepService(JudgeArtWorkResource) {
        return JudgeArtWorkResource.getAllJudgeArtWorks({ pageNumber: 1, pageSize: 10 }).$promise;
    }

    JudgeArtWorkDetailsByArtWorkIdPrepService.$inject = ['JudgeArtWorkResource', '$stateParams']
    function JudgeArtWorkDetailsByArtWorkIdPrepService(JudgeArtWorkResource, $stateParams) {
        return JudgeArtWorkResource.getJudgeArtWorkDetails({ id: $stateParams.id }).$promise;
    }

    ArtWorkByIdPrepService.$inject = ['ArtWorkResource', '$stateParams']
    function ArtWorkByIdPrepService(ArtWorkResource, $stateParams) {
        return ArtWorkResource.getArtWork({ id: $stateParams.id }).$promise;
    }

    ArtWorkMediaByArtWorkIdPrepService.$inject = ['ArtWorkResource', '$stateParams']
    function ArtWorkMediaByArtWorkIdPrepService(ArtWorkResource, $stateParams) {
        return ArtWorkResource.getArtWorkFiles({ id: $stateParams.id }).$promise;
    }
    MediaFileByIdPrepService.$inject = ['JudgeArtWorkResource', '$stateParams']
    function MediaFileByIdPrepService(JudgeArtWorkResource, $stateParams) {
        return JudgeArtWorkResource.getMediaFile({ id: $stateParams.id }).$promise;
    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('viewJudgeArtWorkController', ['ArtWorkMediaByArtWorkIdPrepService', '$scope', 'blockUI', '$stateParams', '$uibModal', '$state', 'appCONSTANTS', '$translate',
            'JudgeArtWorkResource', 'ToastService', 'ArtWorkByIdPrepService', viewJudgeArtWorkController])

    function viewJudgeArtWorkController(ArtWorkMediaByArtWorkIdPrepService, $scope, blockUI, $stateParams, $uibModal, $state, appCONSTANTS, $translate, JudgeArtWorkResource,
        ToastService, ArtWorkByIdPrepService) {
        var vm = this;
        vm.JudgeArtWork = ArtWorkByIdPrepService;
        vm.artWorkMedia = ArtWorkMediaByArtWorkIdPrepService;
        vm.votingCriteriaList = [];
        console.log('sdsd', vm.JudgeArtWork);
        refreshVotingCriterias();
        vm.Close = function () {
            $state.go('JudgeArtWork');
        }
        vm.changeValue = function (value, index) {
            debugger;
            vm.votingCriteriaList[index].value = value;

        }
        vm.UpdateJudgeArtWork = function (judgeComplete) {
            blockUI.start("Loading...");

            var updateObj = new JudgeArtWorkResource();
            updateObj.Id = vm.JudgeArtWork.id;
            updateObj.ArtWorkId = vm.JudgeArtWork.id;
            updateObj.JudgeId = $scope.user.id;
            updateObj.CriteriaValues = vm.votingCriteriaList;
            updateObj.JudgeComplete = judgeComplete;
            updateObj.$update().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    blockUI.stop();


                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }

        function refreshVotingCriterias() {
            var k = JudgeArtWorkResource.getJudgeVoteCriteriaValues({ id: $stateParams.id }).$promise.then(function (results) {
                vm.votingCriteriaList = results;
                console.log(vm.votingCriteriaList);
                vm.totalCount = results.length;
                blockUI.stop();
            },
                function (data, status) {

                    blockUI.stop();
                });
        }

        function confirmationMessage() {
            var updateObj = new JudgeArtWorkResource();
            updateObj.Id = vm.JudgeArtWork.id;
            updateObj.ArtWorkId = vm.JudgeArtWork.id;
            updateObj.JudgeId = $scope.user.id;
            updateObj.CriteriaValues = vm.votingCriteriaList;
            updateObj.JudgeComplete = true;
            updateObj.$update().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    blockUI.stop();
                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        vm.openMessageDialog = function () { 
            var modalContent = $uibModal.open({
                templateUrl: './app/core/ConfirmationMessage/templates/ConfirmMessageDialog.html',
                controller: 'confirmMessageDialogController',
                controllerAs: 'messageDlCtrl',
                resolve: { 
                    callBackFunction: function () { return confirmationMessage }
                }

            });
        }
    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('NewsController', ['appCONSTANTS', '$scope', '$translate', 'NewsResource', 'blockUI', '$uibModal',
            'ToastService', NewsController]);


    function NewsController(appCONSTANTS, $scope, $translate, NewsResource, blockUI, $uibModal, ToastService) {

              $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[2].children[0]).addClass("active")

        var vm = this;

        vm.currentPage = 1;
        vm.appCONSTANTS = appCONSTANTS;

        refreshNewss();
        function refreshNewss() {
            blockUI.start("Loading...");

            var k = NewsResource.getAllNewss({ pageNumber: vm.currentPage, pageSize: 10 }).$promise.then(function (results) {
                debugger;
                $scope.NewsList = results.items;
                $scope.totalCount = results.metadata.totalItemCount;
                console.log($scope.NewsList);
                blockUI.stop();

            },
                function (data, status) {
                debugger;
                blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data, "error");
                });
        }
        function change(news, isDeleted) {
            var updateObj = new NewsResource();
            updateObj.id = news.id;
            if (!isDeleted)
                updateObj.status = (news.status == true ? false : true);
            updateObj.isDeleted = news.isDeleted;

            updateObj.$update().then(
                function (data, status) {
                    refreshNewss();

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    news.status = updateObj.status;

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );

        }
        vm.UpdateNews = function (news) {
            change(news, false);
        }

        function confirmationDelete(model) {
            var updateObj = new NewsResource();
            updateObj.$delete({ id: model.id }).then(
                function (data, status) {
                    refreshNewss();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('DeletedSuccessfully'), "success");
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        vm.openDeleteDialog = function (model, name, id) {
            var modalContent = $uibModal.open({
                templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
                controller: 'confirmDeleteDialogController',
                controllerAs: 'deleteDlCtrl',
                resolve: {
                    model: function () { return model },
                    itemName: function () { return name },
                    itemId: function () { return id },
                    message: function () { return null },
                    callBackFunction: function () { return confirmationDelete }
                }

            });
        }
        vm.ChangeStatus = function (model) {
            var updateObj = new NewsResource();
            updateObj.id = model.id;
            updateObj.title = model.title;
            updateObj.body = model.body;
            updateObj.outdated = (model.outdated == true ? false : true);
            updateObj.$update().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    model.outdated = updateObj.outdated;
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                }
            );
            return;
        }

        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshNewss();
        }

    }

})();
(function () {
    angular
        .module('home')
        .factory('NewsResource', ['$resource', 'appCONSTANTS', NewsResource])

    function NewsResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'news', {}, {
            getAllNewss: { method: 'POST', url: appCONSTANTS.API_URL + 'news/search', useToken: true, params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'PUT', useToken: true },
            getNews: { method: 'GET', useToken: true },
            delete: { method: 'DELETE', useToken: true },
            changeStatus: { method: 'POST', url: appCONSTANTS.API_URL + 'news/ChangeStatus/:id/:status', useToken: true }

        })
    }

}());
(function () {
    'use strict';

    angular
        .module('home')
        .directive('imgUpload', ['$rootScope', function (rootScope) {
            return {
                restrict: 'A',
                link: function (scope, elem, attrs) {
                    var canvas = document.createElement("canvas");
                    var extensions = 'jpeg ,jpg, png, gif';
                    rootScope.isValid = true;
                    elem.on('change', function () {
                        reader.readAsDataURL(elem[0].files[0]);
                        var filename = elem[0].files[0].name;
                        debugger;
                        var extensionlist = filename.split('.');
                        rootScope.imageType = extensionlist[1];

                        var extension = extensionlist[extensionlist.length - 1];
                        if (extensions.indexOf(extension) == -1) {
                            alert("File extension , Only 'jpeg', 'jpg', 'png', 'gif', 'bmp' are allowed.");
                            scope.imageName = null;
                            rootScope.isValid = false;
                        } else {
                            scope.file = elem[0].files[0];
                            scope.imageName = filename;
                            rootScope.isValid = true;
                        }
                    });

                    var reader = new FileReader();

                    reader.onload = function (e) {
                        debugger;
                        if (rootScope.isValid == false) {
                            rootScope.image = null;
                            scope.$apply();
                        }
                        else {
                            rootScope.image = e.target.result;
                            scope.$apply();
                        }
                    }
                }
            }
        }])
        .controller('createNewsDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'NewsResource', 'ToastService', '$rootScope', createNewsDialogController])

    function createNewsDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, NewsResource,
        ToastService, $rootScope) {
        var vm = this;
        $rootScope.image = null;

        vm.language = appCONSTANTS.supportedLanguage;
        vm.close = function () {
            $state.go('News');
        }


        vm.AddNewNews = function () { 
            var splitImage = vm.posterImage.split(',');
            blockUI.start("Loading...");
            var newObj = new NewsResource();
            newObj.Title = vm.titleDictionary;
            newObj.Body = vm.bodyDictionary; 
            newObj.Poster = splitImage[1];
            newObj.PosterFileName = posterImage.type;
            newObj.$create().then(
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                    $state.go('News');
                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.title, "error");
                }
            );
        }

        vm.LoadUploadPoster = function () {
            $("#posterImage").click();
        }
        var posterImage;
        $scope.AddposterImage = function (element) {
            var logoFile = element[0];

            var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

            if (logoFile && logoFile.size >= 0 && ((logoFile.size / (1024 * 1000)) < 2)) {

                if (allowedImageTypes.indexOf(logoFile.type) !== -1) {
                    $scope.newNewsForm.$dirty = true;
                    $scope.$apply(function () {

                        posterImage = logoFile;
                        var reader = new FileReader();

                        reader.onloadend = function () {
                            vm.posterImage = reader.result;

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

        $scope.uploadPosterFile = function (element) {
            vm.posterImage = $(element)[0].files[0];
        };

    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('editNewsDialogController', ['$rootScope', '$scope', 'blockUI', '$filter', '$http', '$state', 'appCONSTANTS', '$translate',
            'NewsResource', 'ToastService', 'NewsByIdPrepService', editNewsDialogController])

    function editNewsDialogController($rootScope, $scope, blockUI, $filter, $http, $state, appCONSTANTS, $translate, NewsResource,
        ToastService, NewsByIdPrepService) {
        var vm = this;
        var posterImage;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.News = NewsByIdPrepService;
        vm.posterImage= vm.News.posterUrl;
        console.log(vm.News);

        vm.Close = function () {
            $state.go('News');
        }
        vm.UpdateNews = function () {
            var splitImage = vm.posterImage.split(',');
            blockUI.start("Loading...");
            debugger;

            var updateObj = new NewsResource();
            updateObj.Id = vm.News.id;
            updateObj.title = vm.News.title;
            updateObj.body = vm.News.body;
            if ( posterImage != null) {

                updateObj.Poster = splitImage[1];
                updateObj.PosterFileName = posterImage.type;
            }
            updateObj.$update().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    blockUI.stop();

                    $state.go('News');

                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }

        vm.LoadUploadPoster = function () {
            $("#posterImage").click();
        }
        $scope.AddposterImage = function (element) {
            var logoFile = element[0];

            var allowedImageTypes = ['image/jpg', 'image/png', 'image/gif']

            if (logoFile && logoFile.size >= 0 && ((logoFile.size / (1024 * 1000)) < 2)) {

                if (allowedImageTypes.indexOf(logoFile.type) !== -1) {
                    $scope.editNewsForm.$dirty = true;
                    $scope.$apply(function () {

                        posterImage = logoFile;
                        var reader = new FileReader();

                        reader.onloadend = function () {
                            vm.posterImage = reader.result;

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

        $scope.uploadPosterFile = function (element) {
            vm.posterImage = $(element)[0].files[0];
        };

    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('mediaItemController', ['appCONSTANTS', '$scope', '$translate', 'PhotoAlbumResource', 'blockUI', '$uibModal',
            'ToastService', '$stateParams', mediaItemController]);


    function mediaItemController(appCONSTANTS, $scope, $translate, PhotoAlbumResource, blockUI, $uibModal, ToastService, $stateParams) {
        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[6].children[0]).addClass("active")
        var vm = this;
        vm.currentPage = 1;
        vm.appCONSTANTS = appCONSTANTS;
        refreshMediaItems();
        function refreshMediaItems() {
            blockUI.start("Loading...");
            debugger;
            var k = PhotoAlbumResource.getMediaItems({ id: $stateParams.id }).$promise.then(function (results) {
                vm.mediaItemList = results;
                console.log(vm.mediaItemList);
                blockUI.stop();

            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data, "error");
                });
        } 
        function confirmationDelete(model) {
            var obj = new PhotoAlbumResource();
            obj.$deleteMediaItems({ id: model.id }).then(
                function (data, status) {
                    refreshMediaItems();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('DeletedSuccessfully'), "success");
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        vm.openDeleteDialog = function (model, name, id) {
            var modalContent = $uibModal.open({
                templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
                controller: 'confirmDeleteDialogController',
                controllerAs: 'deleteDlCtrl',
                resolve: {
                    model: function () { return model },
                    itemName: function () { return name },
                    itemId: function () { return id },
                    message: function () { return null },
                    callBackFunction: function () { return confirmationDelete }
                }

            });
        }
        vm.ChangeStatus = function (model) {
            var updateObj = new PhotoAlbumResource();
            updateObj.id = model.id; 
            updateObj.featured = (model.featured == true ? false : true);
            updateObj.$updateMediaItem().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    model.featured = updateObj.featured;
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                }
            );
            return;
        }

        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshMediaItems();
        }



            }

})();
(function () {
    'use strict';

    angular
        .module('home')
        .controller('PhotoAlbumController', ['appCONSTANTS', '$scope', '$translate', 'PhotoAlbumResource', 'blockUI', '$uibModal',
            'ToastService', PhotoAlbumController]);


    function PhotoAlbumController(appCONSTANTS, $scope, $translate, PhotoAlbumResource, blockUI, $uibModal, ToastService) {
        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[7].children[0]).addClass("active")
        var vm = this;

        vm.currentPage = 1;
        vm.appCONSTANTS = appCONSTANTS;

        refreshPhotoAlbums();
        function refreshPhotoAlbums() {
            blockUI.start("Loading...");

            var k = PhotoAlbumResource.getAllPhotoAlbums({ pageNumber: vm.currentPage, pageSize: 10 }).$promise.then(function (results) {
                $scope.PhotoAlbumList = results.items;
                $scope.totalCount = results.metadata.totalItemCount;
                console.log($scope.PhotoAlbumList);
                blockUI.stop();

            },
                function (data, status) {
                    debugger;
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data, "error");
                });
        }
        function change(PhotoAlbum, isDeleted) {
            var updateObj = new PhotoAlbumResource();
            updateObj.id = PhotoAlbum.id;
            if (!isDeleted)
                updateObj.status = (PhotoAlbum.status == true ? false : true);
            updateObj.isDeleted = PhotoAlbum.isDeleted;

            updateObj.$update().then(
                function (data, status) {
                    refreshPhotoAlbums();

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    PhotoAlbum.status = updateObj.status;

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );

        }
        vm.UpdatePhotoAlbum = function (PhotoAlbum) {
            change(PhotoAlbum, false);
        }

        function confirmationDelete(model) {
            var updateObj = new PhotoAlbumResource();
            updateObj.$delete({ id: model.id }).then(
                function (data, status) {
                    refreshPhotoAlbums();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('DeletedSuccessfully'), "success");
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        vm.openDeleteDialog = function (model, name, id) {
            var modalContent = $uibModal.open({
                templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
                controller: 'confirmDeleteDialogController',
                controllerAs: 'deleteDlCtrl',
                resolve: {
                    model: function () { return model },
                    itemName: function () { return name },
                    itemId: function () { return id },
                    message: function () { return null },
                    callBackFunction: function () { return confirmationDelete }
                }

            });
        }
        vm.ChangeStatus = function (model) {
            var updateObj = new PhotoAlbumResource();
            updateObj.id = model.id;
            updateObj.title = model.title;
            updateObj.body = model.body;
            updateObj.outdated = (model.outdated == true ? false : true);
            updateObj.$update().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    model.outdated = updateObj.outdated;
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                }
            );
            return;
        }

        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshPhotoAlbums();
        }

    }

})();
(function () {
    angular
        .module('home')
        .factory('PhotoAlbumResource', ['$resource', 'appCONSTANTS', PhotoAlbumResource])

    function PhotoAlbumResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'albums', {}, {
            getAllPhotoAlbums: { method: 'POST', url: appCONSTANTS.API_URL + 'albums/search', useToken: true, params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'PUT', useToken: true },
            getPhotoAlbum: { method: 'GET', useToken: true },
            delete: { method: 'DELETE', useToken: true },
            updateMediaItem: { method: 'PUT', url: appCONSTANTS.API_URL + 'albums/UpdateMediaItem', useToken: true },
            getMediaItems: { method: 'GET', url: appCONSTANTS.API_URL + 'albums/getMediaItems', useToken: true, isArray: true },
            createMediaItem: { method: 'POST',url: appCONSTANTS.API_URL + 'albums/createMediaItems', useToken: true },
            UpdateMediaItemVideoUrl: { method: 'PUT', url: appCONSTANTS.API_URL + 'albums/UpdateMediaItemVideoUrl', useToken: true }
        })
    }

}());
(function () {
    'use strict';

    angular
        .module('home')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('PhotoAlbum', {
                    url: '/PhotoAlbum',
                    templateUrl: './app/GlobalAdmin/PhotoAlbum/templates/PhotoAlbum.html',
                    controller: 'PhotoAlbumController',
                    'controllerAs': 'PhotoAlbumCtrl',
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
                .state('newPhotoAlbum', {
                    url: '/newPhotoAlbum',
                    templateUrl: './app/GlobalAdmin/PhotoAlbum/templates/new.html',
                    controller: 'createPhotoAlbumDialogController',
                    'controllerAs': 'newPhotoAlbumCtrl',
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editPhotoAlbum', {
                    url: '/editPhotoAlbum/:id',
                    templateUrl: './app/GlobalAdmin/PhotoAlbum/templates/edit.html',
                    controller: 'editPhotoAlbumDialogController',
                    'controllerAs': 'editPhotoAlbumCtrl',
                    resolve: {
                        PhotoAlbumByIdPrepService: PhotoAlbumByIdPrepService
                    },
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })

                .state('mediaItems', {
                    url: '/mediaItems/:id',
                    templateUrl: './app/GlobalAdmin/PhotoAlbum/templates/MediaItems.html',
                    controller: 'mediaItemController',
                    'controllerAs': 'mediaItemCtrl',

                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })

                .state('newMediaItem', {
                    url: '/newMediaItem/:id',
                    templateUrl: './app/GlobalAdmin/PhotoAlbum/templates/newMediaItem.html',
                    controller: 'createMediaItemController',
                    'controllerAs': 'newMediaItemCtrl',

                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
        });

    PhotoAlbumPrepService.$inject = ['PhotoAlbumResource']
    function PhotoAlbumPrepService(PhotoAlbumResource) {
        return PhotoAlbumResource.getAllPhotoAlbums({ pageNumber: 1, pageSize: 10 }).$promise;
    }

    PhotoAlbumByIdPrepService.$inject = ['PhotoAlbumResource', '$stateParams']
    function PhotoAlbumByIdPrepService(PhotoAlbumResource, $stateParams) {
        return PhotoAlbumResource.getPhotoAlbum({ id: $stateParams.id }).$promise;
    }

    AllAwardPrepService.$inject = ['PhotoAlbumResource']
    function AllAwardPrepService(PhotoAlbumResource) {
        return PhotoAlbumResource.getAllAwards({ pageNumber: 1, pageSize: 10 }).$promise;
    }

    MediaItemByIdPrepService.$inject = ['PhotoAlbumResource', '$stateParams']
    function MediaItemByIdPrepService(PhotoAlbumResource, $stateParams) {
        return PhotoAlbumResource.getMediaItems({ id: $stateParams.id }).$promise;
    }




}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('createMediaItemController', ['$uibModal', '$scope', 'blockUI', '$stateParams', '$state', '$http', '$q', 'appCONSTANTS', '$translate',
            'PhotoAlbumResource', 'ToastService', '$rootScope', createMediaItemController])

    function createMediaItemController($uibModal, $scope, blockUI, $stateParams, $state, $http, $q, appCONSTANTS, $translate, PhotoAlbumResource,
        ToastService, $rootScope) {
        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.selectedMediaType = "";
        vm.close = function () {
            $state.go('PhotoAlbum');
        }


        vm.AddNewMediaItem = function () {

            blockUI.start("Loading...");
            var newObj = new PhotoAlbumResource();
            newObj.Title = vm.title;

            newObj.Featured = vm.isFeatured;
            newObj.MediaType = vm.selectedMediaType;
            newObj.AlbumId = $stateParams.id;
            debugger;
            if (vm.posterVideo != null) {
                var splitVideoImage = vm.posterVideo.split(',');
                newObj.Poster = splitVideoImage[1];
                newObj.PosterFileName = splitVideoImage[0];
            }
            else {
                var splitImage = vm.posterImage.split(',');
                newObj.Media = splitImage[1];
                newObj.MediaFileName = splitImage[0];
            }



            newObj.$createMediaItem().then(
                function (data, status) {
                    blockUI.stop();
                    if (data.mediaType == 'image') {
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                        $state.go('mediaItems', { id: $stateParams.id });

                    } else {
                        debugger;
                        openUploadDialog(data.id, appCONSTANTS.API_URL + 'albums/mediaItems/' + data.id + '/files')
                    }
                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.title, "error");
                }
            );
        }

        vm.LoadUploadPoster = function () {
            $("#posterImage").click();
            debugger;
        }
        var posterImage;
        $scope.AddposterImage = function (element) {
            debugger;
            var logoFile = element[0];
            var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

            if (logoFile && logoFile.size >= 0 && ((logoFile.size / (1024 * 1000)) < 2)) {

                if (allowedImageTypes.indexOf(logoFile.type) !== -1) {
                    $scope.newMediaItemForm.$dirty = true;
                    $scope.$apply(function () {

                        posterImage = logoFile;
                        var reader = new FileReader();

                        reader.onloadend = function () {
                            vm.posterImage = reader.result;

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

        $scope.uploadPosterFile = function (element) {
            debugger;
            vm.posterImage = $(element)[0].files[0];
        };



        vm.LoadUploadPosterVideo = function () {
            $("#posterVideo").click();
        }
        var posterVideo;
        $scope.AddposterVideo = function (element) {
            var logoFile = element[0];
            var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']
            if (logoFile && logoFile.size >= 0 && ((logoFile.size / (1024 * 1000)) < 2)) {

                if (allowedImageTypes.indexOf(logoFile.type) !== -1) {
                    $scope.newMediaItemForm.$dirty = true;
                    $scope.$apply(function () {

                        posterVideo = logoFile;
                        var reader = new FileReader();

                        reader.onloadend = function () {
                            vm.posterVideo = reader.result;

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

        $scope.uploadPosterVideoFile = function (element) {
            debugger;
            vm.posterVideo = $(element)[0].files[0];
        };

        function callBackUpload(model) {
            debugger
            var updateObj = new PhotoAlbumResource();
            updateObj.Id = model.id;
            updateObj.FileUrl = model.data.fileUrl;
            updateObj.FileKey = model.data.fileKey;
            updateObj.$UpdateMediaItemVideoUrl().then(
                function (data, status) {
                    debugger;
                    $state.go('mediaItems', { id: $stateParams.id });

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('DeletedSuccessfully'), "success");
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        function openUploadDialog(id, url) {
            var modalContent = $uibModal.open({
                templateUrl: './app/core/UploadVideo/templates/UploadVideoDialog.html',
                controller: 'uploadVideoController',
                controllerAs: 'uploadDlCtrl',
                resolve: {
                    itemId: function () { return id },
                    url: function () { return url },
                    callBackFunction: function () { return callBackUpload }
                }

            });
        }
    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('createPhotoAlbumDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'PhotoAlbumResource', 'ToastService', '$rootScope', createPhotoAlbumDialogController])

    function createPhotoAlbumDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, PhotoAlbumResource,
        ToastService, $rootScope) {
        var vm = this;
        $rootScope.image = null;
        vm.selectedMediaType = "";
        vm.posterImage = [];
        vm.files = [];
        vm.language = appCONSTANTS.supportedLanguage;
        vm.close = function () {
            $state.go('PhotoAlbum');
        }


        vm.AddNewPhotoAlbum = function () {
            angular.forEach(vm.posterImage, function (value, key) {
                var splitImage = value.split(',');

                vm.files.push({
                    Media: splitImage[1],
                    MediaFileName: splitImage[0]
                });

            });
            blockUI.start("Loading...");
            var newObj = new PhotoAlbumResource();
            newObj.Title = vm.titleDictionary;
            newObj.Files = vm.files;
            newObj.$create().then(
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                    $state.go('PhotoAlbum');
                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.title, "error");
                }
            );
        }

        vm.LoadUploadPoster = function () {
            $("#posterImage").click();
        }
        var posterImage;
        $scope.AddposterImage = function (element) {
            var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']
            var logoFile = "";

            angular.forEach(element, function (value, key) {
                logoFile = value;
                if (logoFile && logoFile.size >= 0 && ((logoFile.size / (1024 * 1000)) < 2)) {

                    if (allowedImageTypes.indexOf(logoFile.type) !== -1) {
                        $scope.newPhotoAlbumForm.$dirty = true;
                        $scope.$apply(function () {

                            posterImage = logoFile;
                            var reader = new FileReader();

                            reader.onloadend = function () {
                                vm.posterImage.push(reader.result);

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
            });

            console.log(vm.posterImage);
        }

        $scope.uploadPosterFile = function (element) {
            debugger;
            vm.posterImage = $(element)[0].files[0];
        };

    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('editPhotoAlbumDialogController', ['$rootScope', '$scope', 'blockUI', '$filter', '$http', '$state', 'appCONSTANTS', '$translate',
            'PhotoAlbumResource', 'ToastService', 'PhotoAlbumByIdPrepService', editPhotoAlbumDialogController])

    function editPhotoAlbumDialogController($rootScope, $scope, blockUI, $filter, $http, $state, appCONSTANTS, $translate, PhotoAlbumResource,
        ToastService, PhotoAlbumByIdPrepService) {
        var vm = this;
        var posterImage;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.PhotoAlbum = PhotoAlbumByIdPrepService;
        vm.posterImage= vm.PhotoAlbum.posterUrl;
        console.log(vm.PhotoAlbum);

        vm.Close = function () {
            $state.go('PhotoAlbum');
        }
        vm.UpdatePhotoAlbum = function () {
            blockUI.start("Loading..."); 
            var updateObj = new PhotoAlbumResource();
            updateObj.Id = vm.PhotoAlbum.id;
            updateObj.title = vm.PhotoAlbum.title; 
            if ( posterImage != null) {

                updateObj.Poster = splitImage[1];
                updateObj.PosterFileName = posterImage.type;
            }
            updateObj.$update().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    blockUI.stop();

                    $state.go('PhotoAlbum');

                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }

        vm.LoadUploadPoster = function () {
            $("#posterImage").click();
        }
        $scope.AddposterImage = function (element) {
            var logoFile = element[0];

            var allowedImageTypes = ['image/jpg', 'image/png', 'image/gif']

            if (logoFile && logoFile.size >= 0 && ((logoFile.size / (1024 * 1000)) < 2)) {

                if (allowedImageTypes.indexOf(logoFile.type) !== -1) {
                    $scope.editPhotoAlbumForm.$dirty = true;
                    $scope.$apply(function () {

                        posterImage = logoFile;
                        var reader = new FileReader();

                        reader.onloadend = function () {
                            vm.posterImage = reader.result;

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

        $scope.uploadPosterFile = function (element) {
            vm.posterImage = $(element)[0].files[0];
        };

    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('createRoleDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'RoleResource', 'ToastService', '$rootScope', 'PermissionPrepService', createRoleDialogController])

    function createRoleDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, RoleResource,
        ToastService, $rootScope, PermissionPrepService) {
        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        $scope.permissionList = PermissionPrepService 
        vm.selectedModuleList = [];
        vm.selectedModule = "";
        vm.selectedPermissions = [];
        vm.ChangeSelectedModule = function () {
            angular.forEach(vm.selectedModule, function (value, key) {
                angular.forEach(value.permessions, function (valuePermission, key1) {
                    if (vm.selectedModuleList != 0) {
                        if (!vm.selectedModuleList.includes(valuePermission)) {
                            vm.selectedModuleList.push(valuePermission);
                        }

                    }
                    else
                        vm.selectedModuleList.push(valuePermission);

                });
            });

         }

         vm.close = function () {
            $state.go('Role');
        }

        vm.AddNewRole = function () {
            blockUI.start("Loading...");

            var newObj = new RoleResource();
            newObj.titles = vm.titles;
            newObj.roles = vm.selectedPermissions;
            newObj.$create().then(
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                    $state.go('Role');

                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }

    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('editRoleDialogController', ['blockUI', '$filter', '$state',
            'appCONSTANTS', '$translate', 'RoleResource', 'PermissionPrepService', 'ToastService',
            'RoleByIdPrepService', editRoleDialogController])

    function editRoleDialogController(blockUI, $filter, $state, appCONSTANTS, $translate, RoleResource,
        PermissionPrepService, ToastService, RoleByIdPrepService) {
        var vm = this;

        vm.selectedModuleList = [];
        vm.selectedModule = "";
        vm.language = appCONSTANTS.supportedLanguage;
        vm.permissionList = PermissionPrepService;
        vm.Role = RoleByIdPrepService;
        console.log(RoleByIdPrepService);
        vm.selectedPermissions = [];

        var i;
        for (i = 0; i < vm.Role.permessionTree.length; i++) {

            angular.forEach(vm.Role.permessionTree[i].permessions, function (valueModule, keyModule) {
                if (valueModule.seclected)
                    vm.selectedPermissions.push(valueModule.permessionId);
            });

        }
        vm.UpdateRole = function () {

            blockUI.start("Loading...");
            console.log(vm.Role);
            var updateObj = new RoleResource();
            updateObj.roleId = vm.Role.userGroupId;
            updateObj.roles = vm.selectedPermissions;
            updateObj.titles = vm.Role.titles;
            updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    $state.go('Role');

                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        vm.checkPermission = function (obj) {
            var checkIfPermissionExist = vm.selectedPermissions.indexOf(obj.permessionId);
            if (checkIfPermissionExist == -1) {
                vm.selectedPermissions.push(obj.permessionId);
            }
            else {
                var index = vm.selectedPermissions.indexOf(obj.permessionId);
                vm.selectedPermissions.splice(index, 1);
            }
        }
        vm.ChangeSelectedModule = function () {
            angular.forEach(vm.selectedModule, function (value, key) {
                angular.forEach(value.permessions, function (valuePermission, key1) {
                    if (vm.selectedModuleList != 0) {
                        if (!vm.selectedModuleList.includes(valuePermission)) {
                            vm.selectedModuleList.push(valuePermission);
                        }

                    }
                    else
                        vm.selectedModuleList.push(valuePermission);

                });
            });

        }
        vm.Close = function () {
            $state.go('Role');
        }
    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('RoleController', ['blockUI', '$scope', '$translate', 'RoleResource', 'RolePrepService',
            'ToastService', '$uibModal', RoleController]);


    function RoleController(blockUI, $scope, $translate, RoleResource, RolePrepService, ToastService, $uibModal) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[1].children[0]).addClass("active")

        blockUI.start("Loading...");

        var vm = this;

        $scope.totalCount = RolePrepService.totalCount;
        $scope.RoleList = RolePrepService;
        console.log($scope.RoleList)
        function refreshRoles() {
            blockUI.start("Loading...");

            var k = RoleResource.getAllRoles({ page: vm.currentPage }).$promise.then(function (results) {
                $scope.RoleList = results;
                blockUI.stop();

            },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }

        vm.ChangeStatus = function (model) {

                          var updateObj = new RoleResource();
              updateObj.roleId = model.userGroupId;
              updateObj.status = (model.isActive == true ? false : true);
              updateObj.$changeStatus({ roleId: model.userGroupId, status: updateObj.status }).then(
                  function (data, status) {
                      refreshRoles();
                      ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                      updateObj.status = model.isActive;
                  },
                  function (data, status) {
                      ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                  }
              );
              return;
          }

        function confirmationDelete(model) {

                        var deleteObj = new RoleResource();
            deleteObj.roleId = model.userGroupId;
            deleteObj.$delete({ roleId : model.userGroupId }).then(
                function (data, status) {
                    refreshRoles();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('DeleteSuccessfully'), "success");
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data, "error");
                }
            );
        }
        vm.openDeleteDialog = function (model, name, id) {

                        var modalContent = $uibModal.open({
                templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
                controller: 'confirmDeleteDialogController',
                controllerAs: 'deleteDlCtrl',
                resolve: {
                    model: function () { return model },
                    itemName: function () { return name },
                    itemId: function () { return id },
                    message: function () { return null },
                    callBackFunction: function () { return confirmationDelete }
                }

            });
        }


        vm.currentPage = 1;
        $scope.changePage = function (page) {
            vm.currentPage = page;
            refreshRoles();
        }
        blockUI.stop();

    }

})();(function () {
    angular
        .module('home')
        .factory('RoleResource', ['$resource', 'appCONSTANTS', RoleResource])

    function RoleResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Role/CreateRole', {}, {
            getAllRoles: { method: 'GET', url: appCONSTANTS.API_URL + 'admin/roles', useToken: true, isArray: true },
            getAllActivateRoles: { method: 'GET', url: appCONSTANTS.API_URL + 'Roles/GetAllActivateRoles', useToken: true, params: { lang: '@lang' } },
            getAllPermissions: { method: 'GET', url: appCONSTANTS.API_URL + 'admin/permissions', isArray: true, useToken: true, params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Role/UpdateRole', useToken: true },
            delete: { method: 'DELETE', url: appCONSTANTS.API_URL + 'Role/Delete/:roleId', useToken: true },
            getRole: { method: 'GET', url: appCONSTANTS.API_URL + 'Role/GetRoleById/:roleId', useToken: true },
            changeStatus: { method: 'POST', url: appCONSTANTS.API_URL + 'Role/ChangeStatus/:roleId/:status', useToken: true },

        })
    }
}());

(function () {
    angular
        .module('home')
        .factory('UploadChunkResource', ['$resource', 'appCONSTANTS', UploadChunkResource])

    function UploadChunkResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'UploadChunks', {}, {
            getAllUploadChunks: { method: 'POST', url: appCONSTANTS.API_URL + 'UploadChunks/search', useToken: true, params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'PUT', useToken: true },
            getUploadChunk: { method: 'GET', useToken: true },
            delete: { method: 'DELETE', useToken: true },
            changeStatus: { method: 'POST', url: appCONSTANTS.API_URL + 'UploadChunks/ChangeStatus/:id/:status', useToken: true }

        })
    }

}());
(function () {
    'use strict';

    angular
        .module('home')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('UploadChunk', {
                    url: '/UploadChunk',
                    templateUrl: './app/GlobalAdmin/UploadChunk/templates/UploadChunk.html',
                    controller: 'UploadChunkController',
                    'controllerAs': 'UploadChunkCtrl',
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
                .state('newUploadChunk', {
                    url: '/newUploadChunk',
                    templateUrl: './app/GlobalAdmin/UploadChunk/templates/new.html',
                    controller: 'createUploadChunkDialogController',
                    'controllerAs': 'newUploadChunkCtrl', 
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editUploadChunk', {
                    url: '/editUploadChunk/:id',
                    templateUrl: './app/GlobalAdmin/UploadChunk/templates/edit.html',
                    controller: 'editUploadChunkDialogController',
                    'controllerAs': 'editUploadChunkCtrl',
                    resolve: {
                        UploadChunkByIdPrepService: UploadChunkByIdPrepService
                    },
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
        });

    UploadChunkPrepService.$inject = ['UploadChunkResource']
    function UploadChunkPrepService(UploadChunkResource) {
        return UploadChunkResource.getAllUploadChunks({ pageNumber: 1, pageSize: 10 }).$promise;
    }

    UploadChunkByIdPrepService.$inject = ['UploadChunkResource', '$stateParams']
    function UploadChunkByIdPrepService(UploadChunkResource, $stateParams) {
        return UploadChunkResource.getUploadChunk({ id: $stateParams.id }).$promise;
    }

    AllAwardPrepService.$inject = ['UploadChunkResource']
    function AllAwardPrepService(UploadChunkResource) {
        return UploadChunkResource.getAllAwards({ pageNumber: 1, pageSize: 10 }).$promise;
    }
 
}());
(function () {
    'use strict';

    angular
        .module('home')

        .directive("uploadVideoDirective", function ($http, $stateParams) {
            return {
                restrict: 'E',
                scope: {
                    itemId: '=id'
                },
                templateUrl: './app/core/UploadVideo/templates/UploadVideoDialog.html',
                link: function ($scope, ToastService, itemId) {
                    $scope.LoadUploadVideo = function () {
                        $("#file").click();
                    }
                    $scope.uploadVideo = function (id) {
                        $scope.onProgress && $scope.onProgress(0);
                        debugger
                        itemId = $stateParams.id
                        const file = $('#file').get(0).files[0];
                        $scope.processFile(file);
                    };

                    const sliceSize = 5 * 1024 * 1024; 

                    $scope.size = 0;
                    $scope.processFile = function (file) {
                        let start = 0;
                        let uploadId = "";
                        $scope.size = file.size;
                        const totalChunks = Math.ceil($scope.size / sliceSize);
                        const chunkIndex = 0;
                        let end = 0;
                        start = chunkIndex * sliceSize;
                        end = start + sliceSize;
                        $scope.send(file, start, end, chunkIndex, totalChunks, [], uploadId);
                    };
                    $scope.slice = function (file, start, end) {
                        let slice = file.mozSlice ? file.mozSlice : file.webkitSlice ? file.webkitSlice : file.slice ? file.slice : $scope.noop;
                        return slice.bind(file)(start, end);
                    };
                    $scope.noop = function () { };
                    $scope.send = function (file, start, end, chunkIndex, totalChunks, etags, uploadId) {
                        if (chunkIndex >= totalChunks) {
                            return;
                        }
                        var reader = new FileReader();
                        reader.onload = function () {
                            var dataUrl = reader.result;
                            var base64 = dataUrl.split(",")[1];
                            console.log("sending ", file.name, chunkIndex);

                            $scope.uploadChunkApi({ id: itemId, fileName: file.name, uploadId, chunkIndex, totalChunks, chunk: base64, eTags: etags })
                                .then(
                                    function (data, status) {
                                        debugger;
                                        var a = data;
                                        if (a.status == 200) {
                                            if (end < $scope.size) {
                                                chunkIndex = chunkIndex + 1;
                                                const newEnd = start + sliceSize * 2;
                                                const newStart = start + sliceSize;
                                                const percent = (chunkIndex / totalChunks) * 100;
                                                $scope.onProgress && $scope.onProgress(percent);
                                                $scope.send(file, newStart, newEnd, chunkIndex, totalChunks, a.data.eTags, a.data.uploadId);
                                            } else {
                                                $scope.onProgress && $scope.onProgress(100);
                                                ToastService.show("right", "bottom", "fadeInUp", "File uploaded", "success");

                                            }
                                        } else {
                                            ToastService.show("right", "bottom", "fadeInUp", a.data.errors, "error");
                                            console.error("sending error", file.name, chunkIndex, a.data);
                                        }
                                    },
                                    function (data, status) {
                                        ToastService.show("right", "bottom", "fadeInUp", data.data.title, "error");
                                    }
                                );
                        };

                        const slicedPart = $scope.slice(file, start, end);
                        reader.readAsDataURL(slicedPart);
                    };

                    $scope.uploadChunkApi = function ({ id, ...data }) {


                        return $http({
                            method: 'POST',
                            url: apiBaseUrl + `/api/test/artwork/${id}/files`,
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            data: data,
                        });
                    };
                    $scope.onProgress = function (evt) {
                        debugger;
                        var element = angular.element(document.querySelector('#dvProgress'));
                        $scope.Progress = Math.round(evt);
                        element.html('<div style="width: ' + $scope.Progress + '%">' + $scope.Progress + '%</div>');
                    }
                }
            };
        })
        .controller('uploadVideoController', ['$uibModalInstance', 'itemId', 'url', '$scope', '$http', 'ToastService', 'callBackFunction', uploadVideoController])

    function uploadVideoController($uibModalInstance, itemId, url, $scope, $http, ToastService, callBackFunction) {
        var vm = this;
        $scope.LoadUploadVideo = function () {
            $("#file").click();
        }
        $scope.uploadVideo = function (id) {
            $scope.onProgress && $scope.onProgress(0);
            debugger
            const file = $('#file').get(0).files[0];
            $scope.processFile(file);
        };

        const sliceSize = 5 * 1024 * 1024; 

        $scope.size = 0;
        $scope.processFile = function (file) {
            let start = 0;
            let uploadId = "";
            $scope.size = file.size;
            const totalChunks = Math.ceil($scope.size / sliceSize);
            const chunkIndex = 0;
            let end = 0;
            start = chunkIndex * sliceSize;
            end = start + sliceSize;
            $scope.send(file, start, end, chunkIndex, totalChunks, [], uploadId);
        };
        $scope.slice = function (file, start, end) {
            let slice = file.mozSlice ? file.mozSlice : file.webkitSlice ? file.webkitSlice : file.slice ? file.slice : $scope.noop;
            return slice.bind(file)(start, end);
        };
        $scope.noop = function () { };
        $scope.send = function (file, start, end, chunkIndex, totalChunks, etags, uploadId) {
            if (chunkIndex >= totalChunks) {
                return;
            }
            var reader = new FileReader();
            reader.onload = function () {
                var dataUrl = reader.result;
                var base64 = dataUrl.split(",")[1];
                console.log("sending ", file.name, chunkIndex);

                $scope.uploadChunkApi({ id: itemId, fileName: file.name, uploadId, chunkIndex, totalChunks, chunk: base64, eTags: etags })
                    .then(
                        function (data, status) {
                            debugger;
                            var a = data;
                            if (a.status == 200) {
                                if (end < $scope.size) {
                                    chunkIndex = chunkIndex + 1;
                                    const newEnd = start + sliceSize * 2;
                                    const newStart = start + sliceSize;
                                    const percent = (chunkIndex / totalChunks) * 100;
                                    $scope.onProgress && $scope.onProgress(percent);
                                    $scope.send(file, newStart, newEnd, chunkIndex, totalChunks, a.data.eTags, a.data.uploadId);
                                } else {
                                    $scope.onProgress && $scope.onProgress(100);
                                    ToastService.show("right", "bottom", "fadeInUp", "File uploaded", "success");
                                    $uibModalInstance.dismiss();
                                    data.id = itemId;
                                    callBackFunction(data);
                                }
                            } else {
                                ToastService.show("right", "bottom", "fadeInUp", a.data.errors, "error");
                                console.error("sending error", file.name, chunkIndex, a.data);
                            }
                        },
                        function (data, status) {
                            ToastService.show("right", "bottom", "fadeInUp", data.data.title, "error");
                        }
                    );
            };

            const slicedPart = $scope.slice(file, start, end);
            reader.readAsDataURL(slicedPart);
        };

        $scope.uploadChunkApi = function ({ id, ...data }) {
            debugger;

            return $http({
                method: 'POST',
                url: url, 
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data,
            });
        };
        $scope.onProgress = function (evt) {
            debugger;
            var element = angular.element(document.querySelector('#dvProgress'));
            $scope.Progress = Math.round(evt);
            element.html('<div style="width: ' + $scope.Progress + '%">' + $scope.Progress + '%</div>');
        }
        vm.Confirm = function () {
            callBackFunction(model);
            $uibModalInstance.dismiss();
        }

    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('VotingCriteriaController', ['appCONSTANTS', '$scope', '$translate', 'VotingCriteriaResource', 'blockUI', '$uibModal',
            'ToastService', VotingCriteriaController]);


    function VotingCriteriaController(appCONSTANTS, $scope, $translate, VotingCriteriaResource, blockUI, $uibModal, ToastService) {
        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[6].children[0]).addClass("active")
        var vm = this;

        vm.currentPage = 1;
        vm.appCONSTANTS = appCONSTANTS;

        refreshVotingCriterias();
        function refreshVotingCriterias() {
            blockUI.start("Loading...");

            var k = VotingCriteriaResource.getAllVotingCriterias({ pageNumber: vm.currentPage, pageSize: 10 }).$promise.then(function (results) {
                $scope.VotingCriteriaList = results.items;
                $scope.totalCount = results.metadata.totalItemCount; 
                blockUI.stop();

            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data, "error");
                });
        }
        vm.showMore = function (element) {
            $(element.currentTarget).toggleClass("child-table-collapse");
        }

        function confirmationDelete(model) {
            var updateObj = new VotingCriteriaResource();
            updateObj.$delete({ id: model.id }).then(
                function (data, status) {
                    refreshVotingCriterias();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('DeletedSuccessfully'), "success");
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        vm.openDeleteDialog = function (model, name, id) {
            var modalContent = $uibModal.open({
                templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
                controller: 'confirmDeleteDialogController',
                controllerAs: 'deleteDlCtrl',
                resolve: {
                    model: function () { return model },
                    itemName: function () { return name },
                    itemId: function () { return id },
                    message: function () { return null },
                    callBackFunction: function () { return confirmationDelete }
                }

            });
        } 

        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshVotingCriterias();
        }

    }

})();
(function () {
    angular
        .module('home')
        .factory('VotingCriteriaResource', ['$resource', 'appCONSTANTS', VotingCriteriaResource])

    function VotingCriteriaResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'VotingCriterias', {}, {
            getAllVotingCriterias: { method: 'POST', url: appCONSTANTS.API_URL + 'VotingCriterias/search', useToken: true, params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'PUT', useToken: true },
            getVotingCriteria: { method: 'GET', useToken: true },
            delete: { method: 'DELETE', useToken: true },
            changeStatus: { method: 'POST', url: appCONSTANTS.API_URL + 'VotingCriterias/ChangeStatus/:id/:status', useToken: true }

        })
    }

}());
(function () {
    'use strict';

    angular
        .module('home')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('VotingCriteria', {
                    url: '/VotingCriteria',
                    templateUrl: './app/GlobalAdmin/VotingCriteria/templates/VotingCriteria.html',
                    controller: 'VotingCriteriaController',
                    'controllerAs': 'VotingCriteriaCtrl',
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
                .state('newVotingCriteria', {
                    url: '/newVotingCriteria',
                    templateUrl: './app/GlobalAdmin/VotingCriteria/templates/new.html',
                    controller: 'createVotingCriteriaDialogController',
                    'controllerAs': 'newVotingCriteriaCtrl', 
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editVotingCriteria', {
                    url: '/editVotingCriteria/:id',
                    templateUrl: './app/GlobalAdmin/VotingCriteria/templates/edit.html',
                    controller: 'editVotingCriteriaDialogController',
                    'controllerAs': 'editVotingCriteriaCtrl',
                    resolve: {
                        VotingCriteriaByIdPrepService: VotingCriteriaByIdPrepService
                    },
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
        });

    VotingCriteriaPrepService.$inject = ['VotingCriteriaResource']
    function VotingCriteriaPrepService(VotingCriteriaResource) {
        return VotingCriteriaResource.getAllVotingCriterias({ pageNumber: 1, pageSize: 10 }).$promise;
    }

    VotingCriteriaByIdPrepService.$inject = ['VotingCriteriaResource', '$stateParams']
    function VotingCriteriaByIdPrepService(VotingCriteriaResource, $stateParams) {
        return VotingCriteriaResource.getVotingCriteria({ id: $stateParams.id }).$promise;
    }

    AllAwardPrepService.$inject = ['VotingCriteriaResource']
    function AllAwardPrepService(VotingCriteriaResource) {
        return VotingCriteriaResource.getAllAwards({ pageNumber: 1, pageSize: 10 }).$promise;
    }
 
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('createVotingCriteriaDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'VotingCriteriaResource', 'ToastService', '$rootScope', createVotingCriteriaDialogController])

    function createVotingCriteriaDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, VotingCriteriaResource,
        ToastService, $rootScope) {
        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.close = function () {
            $state.go('VotingCriteria');
        }


        vm.AddNewVotingCriteria = function () {
            blockUI.start("Loading...");
            var newObj = new VotingCriteriaResource();
            newObj.Name = vm.Name;
            newObj.Code = vm.Code; 
            newObj.Weight= vm.Weight;
            newObj.$create().then(
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                    $state.go('VotingCriteria');
                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.title, "error");
                }
            );
        }

    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('editVotingCriteriaDialogController', ['$rootScope', '$scope', 'blockUI', '$filter', '$http', '$state', 'appCONSTANTS', '$translate',
            'VotingCriteriaResource', 'ToastService', 'VotingCriteriaByIdPrepService', editVotingCriteriaDialogController])

    function editVotingCriteriaDialogController($rootScope, $scope, blockUI, $filter, $http, $state, appCONSTANTS, $translate, VotingCriteriaResource,
        ToastService, VotingCriteriaByIdPrepService) {
        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.VotingCriteria = VotingCriteriaByIdPrepService; 
        console.log(vm.VotingCriteria);

        vm.Close = function () {
            $state.go('VotingCriteria');
        }
        vm.UpdateVotingCriteria = function () { 
            blockUI.start("Loading...");
            debugger;

            var updateObj = new VotingCriteriaResource();
            updateObj.Id = vm.VotingCriteria.id;
            updateObj.name = vm.VotingCriteria.name;
            updateObj.Code = vm.VotingCriteria.code;
            updateObj.Weight= vm.VotingCriteria.weight; 
            updateObj.$update().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    blockUI.stop();

                    $state.go('VotingCriteria');

                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('dashboardController', ['blockUI', '$scope', '$state',
            '$translate', 'dashboardResource', 'QuestionResource', 'TicketDashboardPrepService',
            'AnswerQuestionPrepService', '$filter', 'allcategoryTypePrepService', 'AnswerQuestionResource', 'CountriesPrepService',
            'BranchManagerPrepService', 'TechnasianPrepService', 'DepartmentPrepService',
            'GovernrateResource', 'CityResource', 'AreaResource', 'UsersAnswersQuestionPrepService', dashboardController]);

    function dashboardController(blockUI, $scope, $state,
        $translate, dashboardResource, QuestionResource, TicketDashboardPrepService,
        AnswerQuestionPrepService, $filter, allcategoryTypePrepService, AnswerQuestionResource, CountriesPrepService,
        BranchManagerPrepService, TechnasianPrepService, DepartmentPrepService,
        GovernrateResource, CityResource, AreaResource, UsersAnswersQuestionPrepService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[10].children[0]).addClass("active")
        blockUI.start("Loading...");

        var Manufacture = this;

        function init() {
            Manufacture.ticketsFilter = [
                {
                    name: $translate.instant('Country'),
                    value: "country"
                },
                {
                    name: $translate.instant('Governrate'),
                    value: "Governrate"
                },
                {
                    name: $translate.instant('City'),
                    value: "city"
                },
                {
                    name: $translate.instant('Area'),
                    value: "area"
                },
                {
                    name: $translate.instant('Branch'),
                    value: "branch"
                },
                {
                    name: $translate.instant('Department'),
                    value: "department"
                },
                {
                    name: $translate.instant('CategoryLbl'),
                    value: "category"
                }
            ]
            Manufacture.selectedTicketFilter = "branch"
            Manufacture.options = {
                chart: {
                    type: 'multiBarChart',
                    height: 300,
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 65,
                        left: 50
                    },
                    stacked: true,

                    duration: 100,
                    xAxis: {
                        rotateLabels: 30
                    },
                    yAxis: {
                        axisLabel: $translate.instant('ticketsCount'),
                        axisLabelDistance: -10,

                    }
                }
            };
            loadTicketDashboard(TicketDashboardPrepService);
            Manufacture.questionList = AnswerQuestionPrepService.results;
            Manufacture.categoryTypes = [];
            Manufacture.selectedCategoryType = { categoryTypeId: 0, titleDictionary: { "en": "All", "ar": "كل" } };
            Manufacture.categoryTypes.push(Manufacture.selectedCategoryType);
            Manufacture.categoryTypes = Manufacture.categoryTypes.concat(allcategoryTypePrepService.results)

            Manufacture.countiesSurvey = [];
            Manufacture.selectedCountrySurvey = { countryId: 0, titleDictionary: { "en": "All Countries", "ar": "كل البلاد" } };
            Manufacture.countiesSurvey.push(Manufacture.selectedCountrySurvey);
            Manufacture.countiesSurvey = Manufacture.countiesSurvey.concat(CountriesPrepService.results)

            Manufacture.selectedGovernrateSurvey = { GovernrateId: 0, titleDictionary: { "en": "All Governrates", "ar": "كل الأقاليم" } };
            Manufacture.GovernratesSurvey = [];
            Manufacture.GovernratesSurvey.push(Manufacture.selectedGovernrateSurvey);
            Manufacture.selectedCitySurvey = { cityId: 0, titleDictionary: { "en": "All Cities", "ar": "كل المدن" } };
            Manufacture.citiesSurvey = [];
            Manufacture.citiesSurvey.push(Manufacture.selectedCitySurvey);
            Manufacture.selectedAreaSurvey = { areaId: 0, titleDictionary: { "en": "All Areas", "ar": "كل المناطق" } };
            Manufacture.areaListSurvey = [];
            Manufacture.areaListSurvey.push(Manufacture.selectedAreaSurvey);
            Manufacture.selectedBranchSurvey = { branchId: 0, titleDictionary: { "en": "All Branches", "ar": "كل الفروع" } };
            Manufacture.branchListSurvey = [];
            Manufacture.branchListSurvey.push(Manufacture.selectedBranchSurvey);

            Manufacture.selectedDepartmentSurvey = { departmentId: 0, titleDictionary: { "en": "All Departments", "ar": "كل الاقسام" } };
            Manufacture.departmentsSurvey = [];
            Manufacture.departmentsSurvey.push(Manufacture.selectedDepartmentSurvey);
            Manufacture.departmentsSurvey = Manufacture.departmentsSurvey.concat(DepartmentPrepService.results)
            Manufacture.selectedCategorySurvey = { categoryId: 0, titleDictionary: { "en": "All Categories", "ar": "كل الفئات" } };
            Manufacture.categoriesSurvey = [];
            Manufacture.categoriesSurvey.push(Manufacture.selectedCategorySurvey);

            Manufacture.selectedAnswersUser = { userId: 0, userName: $translate.instant('allUsers') };
            Manufacture.AnswersUsers = [];
            Manufacture.AnswersUsers.push(Manufacture.selectedAnswersUser);
            Manufacture.AnswersUsers = Manufacture.AnswersUsers.concat(UsersAnswersQuestionPrepService)

            Manufacture.counties = [];
            Manufacture.selectedCountry = { countryId: 0, titleDictionary: { "en": "All Countries", "ar": "كل البلاد" } };
            Manufacture.counties.push(Manufacture.selectedCountry);
            Manufacture.counties = Manufacture.counties.concat(CountriesPrepService.results)

            Manufacture.selectedGovernrate = { GovernrateId: 0, titleDictionary: { "en": "All Governrates", "ar": "كل الأقاليم" } };
            Manufacture.Governrates = [];
            Manufacture.Governrates.push(Manufacture.selectedGovernrate);
            Manufacture.selectedCity = { cityId: 0, titleDictionary: { "en": "All Cities", "ar": "كل المدن" } };
            Manufacture.cities = [];
            Manufacture.cities.push(Manufacture.selectedCity);
            Manufacture.selectedArea = { areaId: 0, titleDictionary: { "en": "All Areas", "ar": "كل المناطق" } };
            Manufacture.areaList = [];
            Manufacture.areaList.push(Manufacture.selectedArea);
            Manufacture.selectedBranch = { branchId: 0, titleDictionary: { "en": "All Branches", "ar": "كل الفروع" } };
            Manufacture.branchList = [];
            Manufacture.branchList.push(Manufacture.selectedBranch);

            Manufacture.selectedDepartment = { departmentId: 0, titleDictionary: { "en": "All Departments", "ar": "كل الاقسام" } };
            Manufacture.departments = [];
            Manufacture.departments.push(Manufacture.selectedDepartment);
            Manufacture.departments = Manufacture.departments.concat(DepartmentPrepService.results)
            Manufacture.selectedCategory = { categoryId: 0, titleDictionary: { "en": "All Categories", "ar": "كل الفئات" } };
            Manufacture.categories = [];
            Manufacture.categories.push(Manufacture.selectedCategory);

            Manufacture.selectedBranchManager = { userId: 0, userName: $translate.instant('allBranchesM') };
            Manufacture.BranchManagers = [];
            Manufacture.BranchManagers.push(Manufacture.selectedBranchManager);
            Manufacture.BranchManagers = Manufacture.BranchManagers.concat(BranchManagerPrepService.results)
            Manufacture.selectedTechnician = { userId: 0, userName: $translate.instant('allTechnasian') };
            Manufacture.Technicians = [];
            Manufacture.Technicians.push(Manufacture.selectedTechnician);
            Manufacture.Technicians = Manufacture.Technicians.concat(TechnasianPrepService.results)

        }
        Manufacture.countryChange = function () {
            Manufacture.selectedGovernrate = { GovernrateId: 0, titleDictionary: { "en": "All Governrates", "ar": "كل الأقاليم" } };
            Manufacture.selectedCity = { cityId: 0, titleDictionary: { "en": "All Cities", "ar": "كل المدن" } };
            Manufacture.selectedArea = { areaId: 0, titleDictionary: { "en": "All Areas", "ar": "كل المناطق" } };
            Manufacture.Governrates = [];
            Manufacture.cities = [Manufacture.selectedCity];
            Manufacture.areaList = [Manufacture.selectedArea];
            Manufacture.Governrates.push(Manufacture.selectedGovernrate);

            Manufacture.branchList = [];
            Manufacture.selectedBranch = { branchId: 0, titleDictionary: { "en": "All Branches", "ar": "كل الفروع" } };
            Manufacture.branchList.push(Manufacture.selectedBranch);
            GovernrateResource.getAllGovernrates({ countryId: Manufacture.selectedCountry.countryId, pageSize: 0 }).$promise.then(function (results) {

                Manufacture.Governrates = Manufacture.Governrates.concat(results.results);
            },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
            blockUI.stop();
        }
        Manufacture.GovernrateChange = function () {
            if (Manufacture.selectedGovernrate.GovernrateId != undefined) {
                Manufacture.cities = [];
                Manufacture.areaList = [];
                Manufacture.selectedCity = { cityId: 0, titleDictionary: { "en": "All Cities", "ar": "كل المدن" } };
                Manufacture.selectedArea = { areaId: 0, titleDictionary: { "en": "All Areas", "ar": "كل المناطق" } };
                Manufacture.cities.push(Manufacture.selectedCity);
                Manufacture.areaList = [Manufacture.selectedArea];

                Manufacture.branchList = [];
                Manufacture.selectedBranch = { branchId: 0, titleDictionary: { "en": "All Branches", "ar": "كل الفروع" } };
                Manufacture.branchList.push(Manufacture.selectedBranch);
                CityResource.getAllCities({ GovernrateId: Manufacture.selectedGovernrate.GovernrateId, pageSize: 0 }).$promise.then(function (results) {

                    Manufacture.cities = Manufacture.cities.concat(results.results);
                },
                    function (data, status) {
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    });
            }
        }
        Manufacture.cityChange = function () {
            if (Manufacture.selectedCity.cityId != undefined) {
                Manufacture.areaList = [];
                Manufacture.selectedArea = { areaId: 0, titleDictionary: { "en": "All Areas", "ar": "كل المناطق" } };
                Manufacture.areaList.push(Manufacture.selectedArea);

                Manufacture.branchList = [];
                Manufacture.selectedBranch = { branchId: 0, titleDictionary: { "en": "All Branches", "ar": "كل الفروع" } };
                Manufacture.branchList.push(Manufacture.selectedBranch);
                AreaResource.getAllAreas({ cityId: Manufacture.selectedCity.cityId, pageSize: 0 }).$promise.then(function (results) {
                    Manufacture.areaList = Manufacture.areaList.concat(results.results);
                },
                    function (data, status) {
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    });
            }
        }
        Manufacture.areaChange = function () {
            Manufacture.branchList = [];
            Manufacture.selectedBranch = { branchId: 0, titleDictionary: { "en": "All Branches", "ar": "كل الفروع" } };
            Manufacture.branchList.push(Manufacture.selectedBranch);
            if (Manufacture.selectedArea.areaId > 0)
                Manufacture.branchList = Manufacture.branchList.concat(Manufacture.selectedArea.branches);
        }

        Manufacture.departmentChange = function () {

            Manufacture.categories = [];
            Manufacture.selectedCategory = { categoryId: 0, titleDictionary: { "en": "All Categories", "ar": "كل الفئات" } };
            Manufacture.categories.push(Manufacture.selectedCategory);
            if (Manufacture.selectedDepartment.departmentId > 0)
                Manufacture.categories = Manufacture.categories.concat(Manufacture.selectedDepartment.categories);
        }
        Manufacture.countryId = 0;
        Manufacture.GovernrateId = 0;
        Manufacture.cityId = 0;
        Manufacture.areaId = 0;
        Manufacture.branchId = 0;
        Manufacture.departmentId = 0;
        Manufacture.categoryId = 0;

        Manufacture.branchManagerId = 0;
        Manufacture.technasianId = 0;
        Manufacture.from = "";
        Manufacture.to = "";
        Manufacture.applyFilter = function () {
            Manufacture.from = ""
            if ($('#fromdate').val() != "") {
                var fromDate = $('#fromdate').val().split('/')
                Manufacture.from = (new Date(fromDate[1] + "/" + fromDate[0] + "/" + fromDate[2])).toISOString().replace('Z', '');
            }
            Manufacture.to = ""
            if ($('#todate').val() != "") {
                var toDate = $('#todate').val().split('/')
                Manufacture.to = (new Date(toDate[1] + "/" + toDate[0] + "/" + toDate[2])).toISOString().replace('Z', '');
            }
            Manufacture.countryId = Manufacture.selectedCountry.countryId;
            Manufacture.GovernrateId = Manufacture.selectedGovernrate.GovernrateId;
            Manufacture.cityId = Manufacture.selectedCity.cityId;
            Manufacture.areaId = Manufacture.selectedArea.areaId;
            Manufacture.branchId = Manufacture.selectedBranch.branchId;
            Manufacture.branchManagerId = Manufacture.selectedBranchManager.userId;
            Manufacture.technasianId = Manufacture.selectedTechnician.userId;

            Manufacture.departmentId = Manufacture.selectedDepartment.departmentId;
            Manufacture.categoryId = Manufacture.selectedCategory.categoryId;
            Manufacture.status = Manufacture.selectedStatus;
            Manufacture.ticketFilterChange()
        }
        function loadTicketDashboard(tickets) {
            var assigned = [];
            var closed = [];
            var InProgress = [];
            var Pending = [];
            var Rejected = [];
            var Reassigned = [];
            var complete = [];
            tickets.forEach(function (element) {
                assigned.push({
                    x: element.xaxisName[$scope.selectedLanguage],
                    y: element.assignedCount
                })
                InProgress.push({
                    x: element.xaxisName[$scope.selectedLanguage],
                    y: element.inProgressCount
                })
                Pending.push({
                    x: element.xaxisName[$scope.selectedLanguage],
                    y: element.pendingCount
                })
                Rejected.push({
                    x: element.xaxisName[$scope.selectedLanguage],
                    y: element.rejectedCount
                })
                closed.push({
                    x: element.xaxisName[$scope.selectedLanguage],
                    y: element.closedCount
                })
                Reassigned.push({
                    x: element.xaxisName[$scope.selectedLanguage],
                    y: element.reassignedCount
                })
                complete.push({
                    x: element.xaxisName[$scope.selectedLanguage],
                    y: element.completedCount
                })
            }, this);
            Manufacture.data = [
                {
                    "key": $translate.instant('AssignedStatus'),
                    "values": assigned
                },
                {
                    "key": $translate.instant('InProgressStatus'),
                    "values": InProgress
                },
                {
                    "key": $translate.instant('Pending'),
                    "values": Pending
                },
                {
                    "key": $translate.instant('RejectedStatus'),
                    "values": Rejected
                },
                {
                    "key": $translate.instant('ClosedStatus'),
                    "values": closed
                },
                {
                    "key": $translate.instant('Reassigned'),
                    "values": Reassigned
                },
                {
                    "key": $translate.instant('completed'),
                    "values": complete
                }
            ];
        }
        init();

        Manufacture.ticketFilterChange = function () {
            dashboardResource.getTicketsDashboard({
                xaxis: Manufacture.selectedTicketFilter,
                countryId: Manufacture.countryId, GovernrateId: Manufacture.GovernrateId, cityId: Manufacture.cityId,
                areaId: Manufacture.areaId, branchId: Manufacture.branchId, from: Manufacture.from, to: Manufacture.to,
                departmentId: Manufacture.departmentId, categoryId: Manufacture.categoryId,
                branchManagerId: Manufacture.branchManagerId, technasianId: Manufacture.technasianId,
                status: Manufacture.status
            }).$promise
                .then(function (results) {
                    loadTicketDashboard(results)
                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }

        Manufacture.countrySurveyChange = function () {
            Manufacture.selectedGovernrateSurvey = { GovernrateId: 0, titleDictionary: { "en": "All Governrates", "ar": "كل الأقاليم" } };
            Manufacture.selectedCitySurvey = { cityId: 0, titleDictionary: { "en": "All Cities", "ar": "كل المدن" } };
            Manufacture.selectedAreaSurvey = { areaId: 0, titleDictionary: { "en": "All Areas", "ar": "كل المناطق" } };
            Manufacture.GovernratesSurvey = [];
            Manufacture.citiesSurvey = [Manufacture.selectedCitySurvey];
            Manufacture.areaListSurvey = [Manufacture.selectedAreaSurvey];
            Manufacture.GovernratesSurvey.push(Manufacture.selectedGovernrateSurvey);

            Manufacture.branchListSurvey = [];
            Manufacture.selectedBranchSurvey = { branchId: 0, titleDictionary: { "en": "All Branches", "ar": "كل الفروع" } };
            Manufacture.branchListSurvey.push(Manufacture.selectedBranchSurvey);
            GovernrateResource.getAllGovernrates({ countryId: Manufacture.selectedCountrySurvey.countryId, pageSize: 0 }).$promise.then(function (results) {

                Manufacture.GovernratesSurvey = Manufacture.GovernratesSurvey.concat(results.results);
            },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
            blockUI.stop();
        }
        Manufacture.GovernrateSurveyChange = function () {
            if (Manufacture.selectedGovernrateSurvey.GovernrateId != undefined) {
                Manufacture.citiesSurvey = [];
                Manufacture.areaListSurvey = [];
                Manufacture.selectedCitySurvey = { cityId: 0, titleDictionary: { "en": "All Cities", "ar": "كل المدن" } };
                Manufacture.selectedAreaSurvey = { areaId: 0, titleDictionary: { "en": "All Areas", "ar": "كل المناطق" } };
                Manufacture.citiesSurvey.push(Manufacture.selectedCitySurvey);
                Manufacture.areaListSurvey = [Manufacture.selectedAreaSurvey];

                Manufacture.branchListSurvey = [];
                Manufacture.selectedBranchSurvey = { branchId: 0, titleDictionary: { "en": "All Branches", "ar": "كل الفروع" } };
                Manufacture.branchListSurvey.push(Manufacture.selectedBranchSurvey);
                CityResource.getAllCities({ GovernrateId: Manufacture.selectedGovernrateSurvey.GovernrateId, pageSize: 0 }).$promise.then(function (results) {
                    Manufacture.citiesSurvey = Manufacture.citiesSurvey.concat(results.results);
                },
                    function (data, status) {
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    });
            }
        }
        Manufacture.citySurveyChange = function () {
            if (Manufacture.selectedCitySurvey.cityId != undefined) {
                Manufacture.areaListSurvey = [];
                Manufacture.selectedAreaSurvey = { areaId: 0, titleDictionary: { "en": "All Areas", "ar": "كل المناطق" } };
                Manufacture.areaListSurvey.push(Manufacture.selectedAreaSurvey);

                Manufacture.branchListSurvey = [];
                Manufacture.selectedBranchSurvey = { branchId: 0, titleDictionary: { "en": "All Branches", "ar": "كل الفروع" } };
                Manufacture.branchListSurvey.push(Manufacture.selectedBranchSurvey);
                AreaResource.getAllAreas({ cityId: Manufacture.selectedCitySurvey.cityId, pageSize: 0 }).$promise.then(function (results) {
                    Manufacture.areaListSurvey = Manufacture.areaListSurvey.concat(results.results);
                },
                    function (data, status) {
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    });
            }
        }
        Manufacture.areaSurveyChange = function () {
            Manufacture.branchListSurvey = [];
            Manufacture.selectedBranchSurvey = { branchId: 0, titleDictionary: { "en": "All Branches", "ar": "كل الفروع" } };
            Manufacture.branchListSurvey.push(Manufacture.selectedBranchSurvey);
            if (Manufacture.selectedAreaSurvey.areaId > 0)
                Manufacture.branchListSurvey = Manufacture.branchListSurvey.concat(Manufacture.selectedAreaSurvey.branches);
        }

        Manufacture.departmentSurveyChange = function () {
            Manufacture.categoriesSurvey = [];
            Manufacture.selectedCategorySurvey = { categoryId: 0, titleDictionary: { "en": "All Categories", "ar": "كل الفئات" } };
            Manufacture.categoriesSurvey.push(Manufacture.selectedCategorySurvey);
            if (Manufacture.selectedDepartmentSurvey.departmentId > 0)
                Manufacture.categoriesSurvey = Manufacture.categoriesSurvey.concat(Manufacture.selectedDepartmentSurvey.categories);
        }
        Manufacture.countryIdSurvey = 0;
        Manufacture.GovernrateIdSurvey = 0;
        Manufacture.cityIdSurvey = 0;
        Manufacture.areaIdSurvey = 0;
        Manufacture.branchIdSurvey = 0;
        Manufacture.departmentIdSurvey = 0;
        Manufacture.categoryIdSurvey = 0;

        Manufacture.fromSurvey = "";
        Manufacture.toSurvey = "";

        Manufacture.applySurveyFilter = function () {
            blockUI.start("Loading...");
            Manufacture.fromSurvey = ""
            if ($('#fromdateSurvey').val() != "") {
                var fromDateSurvey = $('#fromdateSurvey').val().split('/')
                Manufacture.fromSurvey = (new Date(fromDateSurvey[1] + "/" + fromDateSurvey[0] + "/" + fromDateSurvey[2])).toISOString().replace('Z', '');
            }
            Manufacture.toSurvey = ""
            if ($('#todateSurvey').val() != "") {
                var toDateSurvey = $('#todateSurvey').val().split('/')
                Manufacture.toSurvey = (new Date(toDateSurvey[1] + "/" + toDateSurvey[0] + "/" + toDateSurvey[2])).toISOString().replace('Z', '');
            }
            Manufacture.countryIdSurvey = Manufacture.selectedCountrySurvey.countryId;
            Manufacture.GovernrateIdSurvey = Manufacture.selectedGovernrateSurvey.GovernrateId;
            Manufacture.cityIdSurvey = Manufacture.selectedCitySurvey.cityId;
            Manufacture.areaIdSurvey = Manufacture.selectedAreaSurvey.areaId;
            Manufacture.branchIdSurvey = Manufacture.selectedBranchSurvey.branchId;

            Manufacture.departmentIdSurvey = Manufacture.selectedDepartmentSurvey.departmentId;
            Manufacture.categoryIdSurvey = Manufacture.selectedCategorySurvey.categoryId;
            Manufacture.AnsweredBy = Manufacture.selectedAnswersUser.userId;

            AnswerQuestionResource.getAllQuestions({
                catgoryTypeId: Manufacture.selectedCategoryType.categoryTypeId,
                departmentId: Manufacture.departmentIdSurvey, categoryId: Manufacture.categoryIdSurvey
            }).$promise.then(function (results) {
                Manufacture.questionList = results.results;

                blockUI.stop();
            },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }
        Manufacture.getQuestionDashbard = function (question) {
            question.isloading = true;
            QuestionResource.getQuestionDashBoard({
                questionId: question.questionId,
                countryId: Manufacture.countryIdSurvey, GovernrateId: Manufacture.GovernrateIdSurvey, cityId: Manufacture.cityIdSurvey,
                areaId: Manufacture.areaIdSurvey, branchId: Manufacture.branchIdSurvey, from: Manufacture.fromSurvey, to: Manufacture.toSurvey,
                AnsweredBy: Manufacture.AnsweredBy
            }).$promise
                .then(function (results) {
                    question.dashboard = results;
                    question.isloading = false;
                    if (question.questionTypeId == 0) {
                        question.data = []
                        if (question.dashboard.optionsCount != undefined) {
                            for (var element in question.dashboard.optionsCount) {
                                question.data.push({
                                    key: ($filter('filter')(question.questionDetailses, { questionDetailsId: element }))[0].titleDictionary[$scope.selectedLanguage],
                                    y: question.dashboard.optionsCount[element]
                                })
                            }

                            question.options = {
                                chart: {
                                    type: 'pieChart',
                                    height: 350,
                                    x: function (d) { return d.key; },
                                    y: function (d) { return d.y; },
                                    showLabels: true,
                                    duration: 500,
                                    legend: {
                                        margin: {
                                            top: 5,
                                            right: 35,
                                            bottom: 5,
                                            left: 0
                                        }
                                    }
                                }
                            };
                        }
                    }
                    if (question.questionTypeId == 1) {
                        question.data = [
                            {
                                key: $translate.instant('onestar'),
                                y: question.dashboard.oneStartCount
                            },
                            {
                                key: $translate.instant('twostar'),
                                y: question.dashboard.twoStartCount
                            },
                            {
                                key: $translate.instant('threestar'),
                                y: question.dashboard.threeStartCount
                            },
                            {
                                key: $translate.instant('fourstar'),
                                y: question.dashboard.fourStartCount
                            },
                            {
                                key: $translate.instant('fivestar'),
                                y: question.dashboard.fiveStartCount
                            }
                        ]
                        question.options = {
                            chart: {
                                type: 'pieChart',
                                height: 350,
                                x: function (d) { return d.key; },
                                y: function (d) { return d.y; },
                                showLabels: true,
                                duration: 500,
                                legend: {
                                    margin: {
                                        top: 5,
                                        right: 35,
                                        bottom: 5,
                                        left: 0
                                    }
                                }
                            }
                        };
                    }
                    if (question.questionTypeId == 2) {
                        question.data = [
                            {
                                key: $translate.instant('LikeLbl'),
                                y: question.dashboard.likeCount
                            },
                            {
                                key: $translate.instant('DisLikeLbl'),
                                y: question.dashboard.disLikeCount
                            }
                        ]
                        question.options = {
                            chart: {
                                type: 'pieChart',
                                height: 300,
                                x: function (d) { return d.key; },
                                y: function (d) { return d.y; },
                                showLabels: true,
                                donut: true,
                                pie: {
                                    startAngle: function (d) { return d.startAngle / 2 - Math.PI / 2 },
                                    endAngle: function (d) { return d.endAngle / 2 - Math.PI / 2 }
                                },
                                legend: {
                                    margin: {
                                        top: 5,
                                        right: 35,
                                        bottom: 5,
                                        left: 0
                                    }
                                }
                            }
                        };
                    }
                },
                function (data, status) {
                    question.isloading = false;
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }
        blockUI.stop();

        Manufacture.exportPDF = function(){

                        html2canvas(document.getElementById('surveyDiv')).then(function(canvas) {
                var data = canvas.toDataURL();
                var docDefinition = {
                    content: [{
                        image: data,
                        height:canvas.height,
                        width:500   
                    }],
                };
                pdfMake.createPdf(docDefinition).download("test.pdf");
            });
        }


    }

}());(function () {
    angular
        .module('home')
        .factory('dashboardResource', ['$resource', 'appCONSTANTS', dashboardResource])

    function dashboardResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Tickets/', {}, {
            getTicketsDashboard: { method: 'GET', url: appCONSTANTS.API_URL + 'Tickets/dashboard', useToken: true,isArray:true },
        })
    }

}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('editBranchFeesController', ['$scope', 'blockUI', '$filter', '$translate',
            '$state', '$localStorage', 'authorizationService', 'appCONSTANTS', 'ToastService', '$stateParams'
            , 'branchFeesPrepService' , '$uibModalInstance', 'BranchResource', editBranchFeesController]);


    function editBranchFeesController($scope, blockUI, $filter, $translate,
        $state, $localStorage, authorizationService, appCONSTANTS, ToastService, $stateParams,
        branchFeesPrepService, $uibModalInstance, BranchResource) {

        $scope.selectedLanguage = $localStorage.language;
        var Manufacture = this;
        Manufacture.language = appCONSTANTS.supportedLanguage;
        blockUI.stop();
        $scope.branch = branchFeesPrepService[0];

        Manufacture.close = function () {
            $uibModalInstance.dismiss();
        }


        Manufacture.UpdateFees = function () {
            var branch = new BranchResource();

                        branch.deliveryCost = $scope.branch.deliveryCost;
            branch.deliveryPrice = $scope.branch.deliveryPrice;
            branch.isFees = true;
            branch.branchId = $scope.branch.branchId;

            branch.$update().then(
                function (data, status) {
                    $uibModalInstance.dismiss();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('EditedSuccessfully'), "success");

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
    }

})();
(function () {
    'use strict';

    angular
        .module('home')
        .controller('settingController', ['$rootScope', 'blockUI', '$scope', '$http', '$filter', '$translate',
            '$state', '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', '$stateParams'
            , '$uibModal', 'settingsPrepService', 'BranchPrepService', 'AddSettingsResource', 'UpdateSettingsResource', settingController]);


    function settingController($rootScope, blockUI, $scope, $http, $filter, $translate,
        $state, $localStorage, authorizationService,
        appCONSTANTS, ToastService, $stateParams, $uibModal, settingsPrepService
        , BranchPrepService, AddSettingsResource, UpdateSettingsResource) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[14].children[0]).addClass("active")


        var Manufacture = this;
        $scope.settingsPrepService = settingsPrepService;
        console.log($scope.settingsPrepService);
        Manufacture.orderType = {
            type: 'item'
        };

        Manufacture.currency;
        Manufacture.minDays;
        Manufacture.maxPause;
        Manufacture.allowPause;
        Manufacture.allowHistory;
        Manufacture.programDiscount=$scope.settingsPrepService.programDiscount;

        if ($scope.settingsPrepService.isActive != undefined) {
            if ($scope.settingsPrepService.isSMS && $scope.settingsPrepService.isMail) {
                Manufacture.orderType.type = "both"
            }
            else if ($scope.settingsPrepService.isSMS) {
                Manufacture.orderType.type = "sms"
            }
            else if ($scope.settingsPrepService.isMail) {
                Manufacture.orderType.type = "mail"
            }
            else {
                Manufacture.orderType.type = "none"
            }

        }


        $scope.BranchPrepService = BranchPrepService;

        Manufacture.currentPage = 1;
        $scope.changePage = function (page) {
            Manufacture.currentPage = page;
            refreshAreas();
        }

        Manufacture.UpdateProgram = function (program) {
            change(program, false);
        }



        Manufacture.AddSetting = function () {
            blockUI.start("Loading...");

            var setting = new AddSettingsResource();

            if (Manufacture.orderType.type == "none") {
                setting.isSMS = false;
                setting.isMail = false;
            }
            else if (Manufacture.orderType.type == "sms") {
                setting.isSMS = true;
                setting.isMail = false;
            }
            else if (Manufacture.orderType.type == "mail") {
                setting.isSMS = false;
                setting.isMail = true;
            }
            else if (Manufacture.orderType.type == "both") {
                setting.isSMS = true;
                setting.isMail = true;
            }

            setting.isDeleted = false;
            setting.isPause = Manufacture.allowPause;

            if (Manufacture.allowPause == true) {
                setting.maxPauseDays = Manufacture.maxPause;
            }
            else if (Manufacture.allowPause == false) {
                setting.maxPauseDays = 0;
            }
            setting.allowHistory = Manufacture.allowHistory;
            setting.currencyCode = Manufacture.currency;
            setting.minNoDaysPerProgram = Manufacture.minDays;
            setting.isDeleted = false;
            setting.isActive = true;
            setting.programDiscount = Manufacture.programDiscount;

            setting.$create().then(
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");


                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }

        Manufacture.UpdateSetting = function () {
            blockUI.start("Loading...");

            var setting = new UpdateSettingsResource();

            if (Manufacture.orderType.type == "none") {
                setting.isSMS = false;
                setting.isMail = false;
            }
            else if (Manufacture.orderType.type == "sms") {
                setting.isSMS = true;
                setting.isMail = false;
            }
            else if (Manufacture.orderType.type == "mail") {
                setting.isSMS = false;
                setting.isMail = true;
            }
            else if (Manufacture.orderType.type == "both") {
                setting.isSMS = true;
                setting.isMail = true;
            }

            setting.isDeleted = false;
            setting.isPause = $scope.settingsPrepService.isPause;

            if (setting.isPause == true) {
                setting.maxPauseDays = $scope.settingsPrepService.maxPauseDays;
            }
            else if (setting.isPause == false) {
                setting.maxPauseDays = 0;
            }
            setting.allowHistory = $scope.settingsPrepService.allowHistory;
            setting.currencyCode = $scope.settingsPrepService.currencyCode;
            setting.minNoDaysPerProgram = $scope.settingsPrepService.minNoDaysPerProgram;
            setting.isDeleted = false;
            setting.isActive = true;
            setting.programDiscount = Manufacture.programDiscount;


            setting.$update().then(
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");


                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }

        $scope.EditBranchDialog = function (branchIdd) {
            blockUI.stop();
            Manufacture.branch = $scope.BranchPrepService.results.filter(x => x.branchId == branchIdd);

            $uibModal.open({
                templateUrl: './app/GlobalAdmin/setting/templates/editBranchFees.html',
                controller: 'editBranchFeesController',
                controllerAs: 'editBranchFeesCtrl',
                resolve: {
                    branchFeesPrepService: function () { return Manufacture.branch; }
                }
            });
        }

        function change(program, isDeleted) {

                        var updateObj = new UpdateProgramResource();
            updateObj.ProgramId = program.programId;
            if (!isDeleted)
                updateObj.isActive = (program.isActive == true ? false : true);
            updateObj.isDeleted = program.isDeleted;

            updateObj.$update().then(
                function (data, status) {
                    if (isDeleted)
                        refreshPrograms();

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    program.isActive = updateObj.isActive;

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );

        }

        function refreshPrograms() {
            blockUI.start("Loading...");

            var k = GetProgramResource.gatAllPrograms().$promise.then(function (results) {
                $scope.programList = results;

                console.log($scope.programList);
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }


    }

})();
(function () {
  angular
    .module('home')
    .factory('GetSettingsResource', ['$resource', 'appCONSTANTS', GetSettingsResource])
    .factory('UpdateSettingsResource', ['$resource', 'appCONSTANTS', UpdateSettingsResource])
    .factory('AddSettingsResource', ['$resource', 'appCONSTANTS', AddSettingsResource])
    .factory('UpdateBranchFeesResource', ['$resource', 'appCONSTANTS', UpdateBranchFeesResource])
    ;


  function GetSettingsResource($resource, appCONSTANTS) {
    return $resource(appCONSTANTS.API_URL + 'Setting/GetSetting', {}, {
      getAllSettings: { method: 'GET', useToken: true }
    })
  }

  function UpdateSettingsResource($resource, appCONSTANTS) {
    return $resource(appCONSTANTS.API_URL + 'Setting/UpdateSetting', {}, {
      update: { method: 'POST', useToken: true },
    })
  }

  function AddSettingsResource($resource, appCONSTANTS) {
    return $resource(appCONSTANTS.API_URL + 'Setting/AddSettings', {}, {
      create: { method: 'POST', useToken: true },
    })
  }

  function UpdateBranchFeesResource($resource, appCONSTANTS) {
    return $resource(appCONSTANTS.API_URL + 'Branchs/UpdateBranchFees', {}, {
      updateBranchFees: { method: 'POST', useToken: true },
    })
  }

}());

(function () {
    'use strict';

    angular
        .module('home')
        .controller('addOperationUserController', ['blockUI', 'UserRoleByIdPrepService','$stateParams', '$translate', '$state', 'UserResource', '$scope', 'ToastService', addOperationUserController]);

    function addOperationUserController(blockUI,UserRoleByIdPrepService, $stateParams, $translate, $state, UserResource, $scope, ToastService, ) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[4].children[0]).addClass("active")

        var vm = this;
        vm.selectedTypeId = 0;
        blockUI.start("Loading...");
        vm.Role = UserRoleByIdPrepService;
        console.log(UserRoleByIdPrepService);
        vm.selectedModuleList = [];
        vm.selectedModule = ""; 
        vm.UnSelectedPermissions = [];
        vm.checkPermission = function (obj) {
            var checkIfPermissionExist = vm.UnSelectedPermissions.indexOf(obj.permessionId);
            if (checkIfPermissionExist == -1) {
                vm.UnSelectedPermissions.push(obj.permessionId);
            }
            else {
                var index = vm.UnSelectedPermissions.indexOf(obj.permessionId);
                vm.UnSelectedPermissions.splice(index, 1);
            }
        }
        vm.AddNewUser = function () {

                        blockUI.start("Loading...");
            var newUser = new UserResource();
            newUser.fullName = vm.fullName;
            newUser.username = vm.userName;
            newUser.unSelectedRoles = vm.UnSelectedPermissions;
            newUser.email = vm.email;
            newUser.mobileNumber = vm.mobileNumber;
            newUser.password = vm.password;
            newUser.$createOperationUser({ userType: $stateParams.userType }).then(
                function (data, status) {
                    blockUI.stop();
                    if (data.message != null)
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    else {
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('ClientAddSuccess'), "success");
                        if ($scope.user.userTypeId == 1)
                            $state.go('RetailerUser');
                        if ($scope.user.userTypeId == 2)
                            $state.go('ManufactureUser');
                        if ($scope.user.userTypeId == 3)
                            $state.go('DistributerUser');
                        if ($scope.user.userTypeId == 4)
                            $state.go('users');
                        if ($scope.user.userTypeId == 5)
                            $state.go('IooUser');
                        if ($scope.user.userTypeId == 255)
                            $state.go('IoaUser');
                    }
                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                }
            );
        }
        vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshUsers();
        }
        vm.close = function () {
            if ($scope.user.userTypeId == 1)
                $state.go('RetailerUser');
            if ($scope.user.userTypeId == 2)
                $state.go('ManufactureUser');
            if ($scope.user.userTypeId == 3)
                $state.go('DistributerUser');
            if ($scope.user.userTypeId == 4)
                $state.go('users');
            if ($scope.user.userTypeId == 5)
                $state.go('IooUser');
            if ($scope.user.userTypeId == 255)
                $state.go('IoaUser');
        }
        blockUI.stop();




    }

}());(function () {
    'use strict';

    angular
        .module('home')
        .controller('addUserController', ['blockUI', 'UserRoleByIdPrepService','$stateParams', '$translate', '$state', 'UserResource', '$scope', 'ToastService', addUserController]);

    function addUserController(blockUI,UserRoleByIdPrepService, $stateParams, $translate, $state, UserResource, $scope, ToastService, ) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[4].children[0]).addClass("active")

        var vm = this;
        vm.selectedRoleId = 0;
        blockUI.start("Loading...");
        vm.phoneNumbr = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;

        vm.Role = UserRoleByIdPrepService;
        console.log(UserRoleByIdPrepService);
        vm.selectedModuleList = [];
        vm.selectedModule = ""; 
        vm.UnSelectedPermissions = [];


        vm.checkPermission = function (obj) {
            var checkIfPermissionExist = vm.UnSelectedPermissions.indexOf(obj.permessionId);
            if (checkIfPermissionExist == -1) {
                vm.UnSelectedPermissions.push(obj.permessionId);
            }
            else {
                var index = vm.UnSelectedPermissions.indexOf(obj.permessionId);
                vm.UnSelectedPermissions.splice(index, 1);
            }
        }
        console.log(vm.permissionList);
        vm.AddNewUser = function () {

                        blockUI.start("Loading...");
            var newUser = new UserResource();
            newUser.fullName = vm.fullName;
            newUser.username = vm.userName;
            newUser.unSelectedRoles = vm.UnSelectedPermissions;
            newUser.email = vm.email;
            newUser.mobileNumber = vm.mobileNumber;
            newUser.password = vm.password;
            newUser.tenantId = $stateParams.tenantId;
            newUser.userType = $stateParams.userType;
            newUser.$create().then(
                function (data, status) {
                    blockUI.stop();
                    if (data.message != null)
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    else {
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('ClientAddSuccess'), "success");
                        if ($scope.user.userTypeId == 1)
                            $state.go('RetailerUser');
                        if ($scope.user.userTypeId == 2)
                            $state.go('ManufactureUser');
                        if ($scope.user.userTypeId == 3)
                            $state.go('DistributerUser');
                        if ($scope.user.userTypeId == 4)
                            $state.go('users');
                        if ($scope.user.userTypeId == 5)
                            $state.go('IooUser');
                        if ($scope.user.userTypeId == 255)
                            $state.go('IoaUser');
                    }
                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                }
            );
        }
        vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshUsers();
        }
        vm.close = function () {
            if ($scope.user.userTypeId == 1)
                $state.go('RetailerUser');
            if ($scope.user.userTypeId == 2)
                $state.go('ManufactureUser');
            if ($scope.user.userTypeId == 3)
                $state.go('DistributerUser');
            if ($scope.user.userTypeId == 4)
                $state.go('users');
            if ($scope.user.userTypeId == 5)
                $state.go('IooUser');
            if ($scope.user.userTypeId == 255)
                $state.go('IoaUser');
        }
        blockUI.stop();




    }

}());(function () {
    'use strict';

    angular
        .module('home')
        .controller('editUserController', ['$stateParams','UserRoleByIdPrepService', 'blockUI', '$scope', '$filter', '$translate', '$state', 'UserResource',
            'EditUserPrepService', 'ToastService', editUserController]);


    function editUserController($stateParams,UserRoleByIdPrepService, blockUI, $scope, $filter, $translate, $state, UserResource,
        EditUserPrepService, ToastService) {

        blockUI.start("Loading...");

        $scope.isPaneShown = true;
        $scope.$emit('LOAD')
        var vm = this;

        vm.userObj = EditUserPrepService;

        vm.Role = UserRoleByIdPrepService;
        console.log(UserRoleByIdPrepService);
        vm.selectedModuleList = [];
        vm.selectedModule = ""; 
        vm.UnSelectedPermissions = [];
        vm.checkPermission = function (obj) {
            var checkIfPermissionExist = vm.UnSelectedPermissions.indexOf(obj.permessionId);
            if (checkIfPermissionExist == -1) {
                vm.UnSelectedPermissions.push(obj.permessionId);
            }
            else {
                var index = vm.UnSelectedPermissions.indexOf(obj.permessionId);
                vm.UnSelectedPermissions.splice(index, 1);
            }
        }
        vm.EditUser = function () {
            blockUI.start("Loading...");
            vm.show = false;
            var updateUser = new UserResource();
            updateUser.userId = vm.userObj.userId;
            updateUser.fullName = vm.userObj.fullName;
            updateUser.username = vm.userObj.userName;
            updateUser.unSelectedRoles = vm.UnSelectedPermissions;
            updateUser.email = vm.userObj.email;
            updateUser.mobileNumber = vm.userObj.mobileNumber;
            updateUser.password = vm.userObj.password;

            updateUser.$update().then(
                function (data, status) {
                    blockUI.stop();
                    if (data.message != null)
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    else {
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                        if ($scope.user.userTypeId == 1)
                            $state.go('RetailerUser');
                        if ($scope.user.userTypeId == 2)
                            $state.go('ManufactureUser');
                        if ($scope.user.userTypeId == 3)
                            $state.go('DistributerUser');
                        if ($scope.user.userTypeId == 4)
                            $state.go('users');
                        if ($scope.user.userTypeId == 5)
                            $state.go('IooUser');
                        if ($scope.user.userTypeId == 255)
                            $state.go('IoaUser');

                    }
                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                }
            );
        }
        vm.close = function () {

                        if ($scope.user.userTypeId == 1)
                $state.go('RetailerUser');
            if ($scope.user.userTypeId == 2)
                $state.go('ManufactureUser');
            if ($scope.user.userTypeId == 3)
                $state.go('DistributerUser');
            if ($scope.user.userTypeId == 4)
                $state.go('users');
            if ($scope.user.userTypeId == 5)
                $state.go('IooUser');
            if ($scope.user.userTypeId == 255)
                $state.go('IoaUser');
        }
        blockUI.stop();

    }

})();(function () {
    'use strict';

    angular
        .module('home')
        .controller('userController', ['blockUI', '$translate', '$state', 'UserResource',
            'appCONSTANTS', 'ToastService', userController]);

    function userController(blockUI, $translate, $state, UserResource, appCONSTANTS, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[5].children[0]).addClass("active")

        var vm = this;
        vm.currentTenantType = 0;
        blockUI.start("Loading...");
        vm.close = function () {

                        $state.go('users');
        }


        function refreshUsers() {
            blockUI.start("Loading...");
            var k = UserResource.getAllUsersByUserType({ userType: vm.currentTenantType, page: vm.currentPage }).$promise.then(function (results) {

                vm.totalCount = results.totalCount;
                vm.userList = results.results;
                console.log(vm.userList);
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }


        vm.showMore = function (element) {
            $(element.currentTarget).toggleClass("child-table-collapse");
        }
        vm.changeUserType = function (id) {
            blockUI.start("Loading...");
            var k = UserResource.getAllUsersByUserType({ userType: id }).$promise.then(function (results) {
                vm.currentTenantType = id;
                vm.totalCount = results.totalCount;
                vm.userList = results.results;
                console.log(vm.userList);
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }
        vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshUsers();
        }
        blockUI.stop();

        vm.ChangeStatus = function (model) {

                        var updateObj = new UserResource();
            updateObj.userId = model.userId;
            updateObj.$changeStatus({ userId: model.userId }).then(
                function (data, status) {
                    if (data.message != null)
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    else {
                        refreshUsers();
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    }
                    updateObj.status = model.isActive;
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
            return;
        }


        vm.ChangeRole = function (model) {

                        var updateObj = new UserResource();
            updateObj.userId = model.userId;
            updateObj.userType = 2;
            updateObj.$changeRole({ userType: 2, userId: model.userId }).then(
                function (data, status) {
                    refreshUsers();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
            return;
        }
    }

}());(function () {
    angular
        .module('home')
        .factory('UserResource', ['$resource', 'appCONSTANTS', UserResource])

    function UserResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Account/CreateUser', {}, {
            getAllUsersByUserType: { method: 'GET', url: appCONSTANTS.API_URL + 'Account/GetUsers/:userType', useToken: true, params: { lang: '@lang' } },
            getAllUsersForManufacture: { method: 'GET', url: appCONSTANTS.API_URL + 'Account/GetTenantUsers/:tenantId', useToken: true, params: { lang: '@lang' } },
            getAllAdminUsers: { method: 'GET', url: appCONSTANTS.API_URL + 'Account/GetAdminUsers/:userType', useToken: true, params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Account/UpdateUser', useToken: true },
            createOperationUser: { method: 'POST', url: appCONSTANTS.API_URL + 'Account/CreateOperationUser/:userType', useToken: true },
            getUser: { method: 'GET', url: appCONSTANTS.API_URL + 'Account/GetUserById/:userId', useToken: true },
            changeStatus: { method: 'POST', url: appCONSTANTS.API_URL + 'Account/ChangeStatus/:userId', useToken: true },
            changeRole: { method: 'POST', url: appCONSTANTS.API_URL + 'Account/MoveToAdminRole/:userType/:userId', useToken: true },
            getUserRole: { method: 'GET', url: appCONSTANTS.API_URL + 'Role/RoleForUser/:userId', useToken: true},
            refreshLogin: { method: 'POST', url: appCONSTANTS.API_URL + 'Account/RefreshLogin', useToken: true },
        })
    }

}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('userDistributerController', ['blockUI', '$translate', '$state', 'UserResource',
            'appCONSTANTS', 'ToastService', userDistributerController]);

    function userDistributerController(blockUI, $translate, $state, UserResource, appCONSTANTS, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[5].children[0]).addClass("active")
        var vm = this;
        vm.currentTenantType = 0;
        blockUI.start("Loading...");
        vm.close = function () {

                        $state.go('users');
        }


        vm.showMore = function (element) {
            $(element.currentTarget).toggleClass("child-table-collapse");
        }
        refreshUsers()
        function refreshUsers() {
            blockUI.start("Loading...");
            var k = UserResource.getAllUsersByUserType({ userType: 3, page: vm.currentPage }).$promise.then(function (results) {

                vm.totalCount = results.totalCount;
                vm.userList = results.results;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }

        vm.ChangeStatus = function (model) {

                        var updateObj = new UserResource();
            updateObj.userId = model.userId;
            updateObj.$changeStatus({ userId: model.userId }).then(
                function (data, status) {
                    if (data.message != null) {
                        if (data.message == "Optimistic concurrency failure, object has been modified.")
                            return;
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");

                    } else {
                        refreshUsers();
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    }
                    updateObj.status = model.isActive;
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
            return;
        }


        vm.ChangeRole = function (model) {

                        var updateObj = new UserResource();
            updateObj.userId = model.userId;
            updateObj.roleId = vm.masterUserId;
            updateObj.$changeStatus({ userId: model.userId, roleId: vm.masterUserId }).then(
                function (data, status) {
                    refreshUsers();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
            return;
        }
        vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshUsers();
        }
        blockUI.stop();
    }

}());(function () {
    'use strict';

    angular
        .module('home')
        .controller('userIoaController', ['blockUI', '$translate', '$state', 'UserResource',
            'appCONSTANTS', 'ToastService', userIoaController]);

    function userIoaController(blockUI, $translate, $state, UserResource, appCONSTANTS, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[5].children[0]).addClass("active")
        var vm = this;
        vm.currentTenantType = 0;
        blockUI.start("Loading..."); 

        vm.showMore = function(element)
        {
            $(element.currentTarget).toggleClass( "child-table-collapse" );
        } 
        refreshUsers();
        function refreshUsers() {
            blockUI.start("Loading...");
            var k = UserResource.getAllAdminUsers({ userType: 5, page: vm.currentPage }).$promise.then(function (results) {

                vm.totalCount = results.totalCount;
                vm.userList = results.results;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }

        vm.ChangeStatus = function (model) {

                        var updateObj = new UserResource();
            updateObj.userId = model.userId;
            updateObj.$changeStatus({ userId: model.userId }).then(
                function (data, status) {
                    if (data.message != null){
                        if (data.message == "Optimistic concurrency failure, object has been modified.")
                        return;
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");

                }
                    else {
                        refreshUsers();
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    }
                    updateObj.status = model.isActive;
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
            return;
        }


        vm.ChangeRole = function (model) {

                        var updateObj = new UserResource();
            updateObj.userId = model.userId;
            updateObj.roleId = vm.masterUserId;
            updateObj.$changeStatus({ userId: model.userId, roleId: vm.masterUserId  }).then(
                function (data, status) {
                    refreshUsers();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
            return;
        }
        vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshUsers();
        }
        blockUI.stop();
    }

}());(function () {
    'use strict';

    angular
        .module('home')
        .controller('userIooController', ['blockUI', '$translate', '$state', 'UserResource',
            'appCONSTANTS', 'ToastService', userIooController]);

    function userIooController(blockUI, $translate, $state, UserResource, appCONSTANTS, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[5].children[0]).addClass("active")

        var vm = this;
        vm.currentTenantType = 0;
        blockUI.start("Loading...");


             vm.showMore = function(element)
        {
            $(element.currentTarget).toggleClass( "child-table-collapse" );
        } 
        refreshUsers()
        function refreshUsers() {
            blockUI.start("Loading...");
            var k = UserResource.getAllAdminUsers({ userType: 4, page: vm.currentPage }).$promise.then(function (results) {

                vm.totalCount = results.totalCount;
                vm.userList = results.results;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }

        vm.ChangeStatus = function (model) {

                        var updateObj = new UserResource();
            updateObj.userId = model.userId;
            updateObj.$changeStatus({ userId: model.userId }).then(
                function (data, status) {
                    if (data.message != null){
                        if (data.message == "Optimistic concurrency failure, object has been modified.")
                        return;
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                }
                    else {
                        refreshUsers();
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    }
                    updateObj.status = model.isActive;
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
            return;
        }


        vm.ChangeRole = function (model) {

                        var updateObj = new UserResource();
            updateObj.userId = model.userId;
            updateObj.roleId = vm.masterUserId;
            updateObj.$changeStatus({ userId: model.userId, roleId: vm.masterUserId  }).then(
                function (data, status) {
                    refreshUsers();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
            return;
        }
        vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshUsers();
        }
        blockUI.stop();
    }

}());(function () {
    'use strict';

    angular
        .module('home')
        .controller('userManufactureController', ['blockUI', '$translate', '$state', 'UserResource',
            '$scope', 'ToastService', userManufactureController]);

    function userManufactureController(blockUI, $translate, $state, UserResource, $scope, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[5].children[0]).addClass("active")

                var vm = this;
        vm.currentTenantType = 0;
        vm.masterUserId = 0;
        blockUI.start("Loading...");

                if ($scope.user.userTypeId == 4 || $scope.user.userTypeId == 5)
            refreshUsers()
        if ($scope.user.userTypeId == 2 || $scope.user.userTypeId == 7)
            refreshManufactureUsers($scope.user.tenantId);



        vm.showMore = function (element) {
            $(element.currentTarget).toggleClass("child-table-collapse");
        }

        function refreshUsers() {
            blockUI.start("Loading...");
            var k = UserResource.getAllUsersByUserType({ userType: 2, page: vm.currentPage }).$promise.then(function (results) {

                vm.totalCount = results.totalCount;
                vm.userList = results.results;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }

        function refreshManufactureUsers(tenant) {
            blockUI.start("Loading...");
            var k = UserResource.getAllUsersForManufacture({ tenantId: tenant, page: vm.currentPage }).$promise.then(function (results) {

                vm.totalCount = results.totalCount;
                vm.userList = results.results;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }

        vm.ChangeStatus = function (model) {

                        var updateObj = new UserResource();
            updateObj.userId = model.userId;
            updateObj.$changeStatus({ userId: model.userId }).then(
                function (data, status) {
                    if (data.message != null){
                        if (data.message == "Optimistic concurrency failure, object has been modified.")
                        return;
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error"); 
                }
                    else {
                        refreshUsers();
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    }
                    updateObj.status = model.isActive;
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
            return;
        }


        vm.ChangeRole = function (model) {

                        var updateObj = new UserResource();
            updateObj.userId = model.userId;
            updateObj.userType = 2;
            updateObj.$changeRole({ userType: 2, userId: model.userId }).then(
                function (data, status) {
                    refreshUsers();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
            return;
        }
        vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshUsers();
        }
        blockUI.stop();
    }

}());(function () {
    'use strict';

    angular
        .module('home')
        .controller('userRetailerController', ['blockUI', '$translate', '$state', 'UserResource',
            'appCONSTANTS', 'ToastService', userRetailerController]);

    function userRetailerController(blockUI, $translate, $state, UserResource, appCONSTANTS, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[5].children[0]).addClass("active")

                var vm = this;
        vm.currentTenantType = 0;
        blockUI.start("Loading...");
        refreshUsers();
        vm.close = function () {

                        $state.go('users');
        }


        vm.showMore = function (element) {
            $(element.currentTarget).toggleClass("child-table-collapse");
        }

        function refreshUsers() {
            blockUI.start("Loading...");
            var k = UserResource.getAllUsersByUserType({ userType: 1, page: vm.currentPage }).$promise.then(function (results) {

                vm.totalCount = results.totalCount;
                vm.userList = results.results;
                console.log(vm.userList);
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }



        vm.ChangeStatus = function (model) {

                        var updateObj = new UserResource();
            updateObj.userId = model.userId;
            updateObj.$changeStatus({ userId: model.userId }).then(
                function (data, status) {
                        if (data.message != null){
                            if (data.message == "Optimistic concurrency failure, object has been modified.")
                            return;
                            ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    }
                    else {
                        refreshUsers();
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    }
                    updateObj.status = model.isActive;
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
            return;
        }


        vm.ChangeRole = function (model) {

                        var updateObj = new UserResource();
            updateObj.userId = model.userId;
            updateObj.roleId = vm.masterUserId;
            updateObj.$changeStatus({ userId: model.userId, roleId: vm.masterUserId }).then(
                function (data, status) {
                    refreshUsers();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
            return;
        }
        vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshUsers();
        }
        blockUI.stop();
    }

}());