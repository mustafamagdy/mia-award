(function() {
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

                .state('DistributerUser', {
                    url: '/distributerUser',
                    templateUrl: './app/GlobalAdmin/user/templates/userDistributer.html',
                    controller: 'userDistributerController',
                    'controllerAs': 'userDistributerCtrl',
                    data: {
                        permissions: {
                            only: ['16'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('RetailerUser', {
                    url: '/retailerUsers',
                    templateUrl: './app/GlobalAdmin/user/templates/userRetailer.html',
                    controller: 'userRetailerController',
                    'controllerAs': 'userRetailerCtrl',
                    data: {
                        permissions: {
                            only: ['17'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('ManufactureUser', {
                    url: '/manufactureUser',
                    templateUrl: './app/GlobalAdmin/user/templates/userManufacture.html',
                    controller: 'userManufactureController',
                    'controllerAs': 'userManufactureCtrl',
                    data: {
                        permissions: {
                            only: ['18'],
                            redirectTo: 'root'
                        }
                    }

                })

                .state('IoaUser', {
                    url: '/IoaUser',
                    templateUrl: './app/GlobalAdmin/user/templates/userIoa.html',
                    controller: 'userIoaController',
                    'controllerAs': 'userIoaCtrl',
                    data: {
                        permissions: {
                            only: ['22'],
                            redirectTo: 'root'
                        }
                    }

                })

                .state('IooUser', {
                    url: '/IooUser',
                    templateUrl: './app/GlobalAdmin/user/templates/userIoo.html',
                    controller: 'userIooController',
                    'controllerAs': 'userIooCtrl',
                    data: {
                        permissions: {
                            only: ['21'],
                            redirectTo: 'root'
                        }
                    }

                })

                .state('addOperationUser', {
                    url: '/addOperationUser/:userType/:userId',
                    templateUrl: './app/GlobalAdmin/user/templates/addOperationUser.html',
                    controller: 'addOperationUserController',
                    'controllerAs': 'addOperationUserCtrl',
                    resolve: {
                        UserRoleByIdPrepService: UserRoleByIdPrepService,
                    },
                    data: {
                        permissions: {
                            only: ['22','21'],
                            redirectTo: 'root'
                        }
                    }
                }).state('addUser', {
                    url: '/addUser/:tenantId/:userType/:userId',
                    templateUrl: './app/GlobalAdmin/user/templates/addUser.html',
                    controller: 'addUserController',
                    'controllerAs': 'addUserCtrl',
                    resolve: {
                        UserRoleByIdPrepService: UserRoleByIdPrepService,
                    },
                    data: {
                        permissions: {
                            only: ['12','16','17','18'],
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
                        UserRoleByIdPrepService:UserRoleByIdPrepService,
                        EditUserPrepService: EditUserPrepService,
                    },
                    data: {
                        permissions: {
                            only: ['12','16','17','18','22','21'],
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
                        NewsPrepService: NewsPrepService
                    },
                    data: {
                        permissions: {
                            only: ['1'],
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
                            only: ['1'],
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
                            only: ['1'],
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
                .state('Retailer', {
                    url: '/Retailer',
                    templateUrl: './app/GlobalAdmin/Retailer/templates/Retailer.html',
                    controller: 'RetailerController',
                    'controllerAs': 'RetailerCtrl',
                    resolve: {
                        RetailerPrepService: RetailerPrepService,
                        RetailersPrepService: RetailersPrepService,
                    },
                    data: {
                        permissions: {
                            only: ['5'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('newRetailer', {
                    url: '/newRetailer',
                    templateUrl: './app/GlobalAdmin/Retailer/templates/new.html',
                    controller: 'createRetailerDialogController',
                    'controllerAs': 'newRetailerCtrl',
                    data: {
                        permissions: {
                            only: ['5'],
                            redirectTo: 'root'
                        }
                    },
                    resolve: {
                        ContactTypePrepService: ContactTypePrepService,
                        CountriesPrepService: CountriesPrepService,
                        getRetailerPrepService: getRetailerPrepService
                    }

                })
                .state('editRetailer', {
                    url: '/editRetailer/:retailerId',
                    templateUrl: './app/GlobalAdmin/Retailer/templates/edit.html',
                    controller: 'editRetailerDialogController',
                    'controllerAs': 'editRetailerCtrl',
                    data: {
                        permissions: {
                            only: ['5'],
                            redirectTo: 'root'
                        }
                    },
                    resolve: {
                        CountriesPrepService: CountriesPrepService,
                        ContactTypePrepService: ContactTypePrepService,
                        RetailerEditIdPrepService: RetailerEditIdPrepService
                    }
                })
                .state('RetailerMap', {
                    url: '/CreateMap/:retailerId',
                    templateUrl: './app/GlobalAdmin/Retailer/templates/newMap.html',
                    controller: 'RetailerMapController',
                    'controllerAs': 'RetailerMapCtrl',
                    resolve: { 
                        RetailerEditIdPrepService: RetailerEditIdPrepService,
                    },
                    data: {
                        permissions: {
                            only: ['13'],
                            redirectTo: 'root'
                        }
                    }

                })



                .state('Distributor', {
                    url: '/Distributor',
                    templateUrl: './app/GlobalAdmin/Distributors/templates/Distributors.html',
                    controller: 'DistributorsController',
                    'controllerAs': 'DistributorCtrl',
                    resolve: {
                        DistributorsPrepService: DistributorsPrepService,
                        DistributorPrepService:DistributorPrepService,

                    },
                    data: {
                        permissions: {
                            only: ['7'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('newDistributor', {
                    url: '/newDistributor',
                    templateUrl: './app/GlobalAdmin/Distributors/templates/new.html',
                    controller: 'createDistributorDialogController',
                    'controllerAs': 'newDistributorCtrl',
                    data: {
                        permissions: {
                            only: ['7'],
                            redirectTo: 'root'
                        }
                    },
                    resolve: {
                        ContactTypePrepService: ContactTypePrepService,
                        CountriesPrepService: CountriesPrepService,
                        getDistributorsPrepService: getDistributorsPrepService
                    }

                })
                .state('editDistributor', {
                    url: '/editDistributor/:distributorId',
                    templateUrl: './app/GlobalAdmin/Distributors/templates/edit.html',
                    controller: 'editDistributorDialogController',
                    'controllerAs': 'editDistributorCtrl',
                    resolve: {
                        ContactTypePrepService: ContactTypePrepService,
                        CountriesPrepService: CountriesPrepService,
                        DistributorEditByIdPrepService: DistributorEditByIdPrepService,
                    },
                    data: {
                        permissions: {
                            only: ['7'],
                            redirectTo: 'root'
                        }
                    }
                })
                .state('Manufacture', {
                    url: '/Manufacture',
                    templateUrl: './app/GlobalAdmin/Manufacture/templates/Manufacture.html',
                    controller: 'ManufactureController',
                    'controllerAs': 'ManufactureCtrl',
                    resolve: {
                        ManufacturePrepService: ManufacturePrepService,
                        ManfacturePrepService:ManfacturePrepService,
                    },
                    data: {
                        permissions: {
                            only: ['6'],
                            redirectTo: 'root'
                        }
                    }
                })
                .state('newManufacture', {
                    url: '/newManufacture',
                    templateUrl: './app/GlobalAdmin/Manufacture/templates/new.html',
                    controller: 'createManufactureDialogController',
                    'controllerAs': 'newManufactureCtrl',
                    data: {
                        permissions: {
                            only: ['6'],
                            redirectTo: 'root'
                        }
                    },
                    resolve: {
                        ContactTypePrepService: ContactTypePrepService,
                        CountriesPrepService: CountriesPrepService,
                        getManufacturePrepService: getManufacturePrepService
                    }



                })
                .state('editManufacture', {
                    url: '/editManufacture/:manufactureId',
                    templateUrl: './app/GlobalAdmin/Manufacture/templates/edit.html',
                    controller: 'editManufactureDialogController',
                    'controllerAs': 'editManufactureCtrl',
                    data: {
                        permissions: {
                            only: ['6'],
                            redirectTo: 'root'
                        }
                    },
                    resolve: {
                        CountriesPrepService: CountriesPrepService,
                        ContactTypePrepService: ContactTypePrepService,
                        ManfactureEditPrepService: ManfactureEditPrepService
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
    AreaPrepService.$inject = ['AreaResource', '$stateParams']
    function AreaPrepService(AreaResource, $stateParams) {
        return AreaResource.getAllAreas({ cityId: $stateParams.cityId }).$promise;
    }

    AllAreaPrepService.$inject = ['AreaResource']
    function AllAreaPrepService(AreaResource) {
        return AreaResource.getAllAreas({ pageSize: 0 }).$promise;
    }

    AreaByIdPrepService.$inject = ['AreaResource', '$stateParams']
    function AreaByIdPrepService(AreaResource, $stateParams) {
        return AreaResource.getArea({ areaId: $stateParams.areaId }).$promise;
    }

    BranchPrepService.$inject = ['BranchResource']
    function BranchPrepService(BranchResource) {
        return BranchResource.getAllBranchs().$promise;
    }

    BranchByIdPrepService.$inject = ['BranchResource', '$stateParams']
    function BranchByIdPrepService(BranchResource, $stateParams) {
        return BranchResource.getBranch({ branchId: $stateParams.branchId }).$promise;
    }

    progDetailsPrepService.$inject = ['GetProgramDetailResource', '$stateParams']
    function progDetailsPrepService(GetProgramDetailResource, $stateParams) {
        return GetProgramDetailResource.getProgramDetail({ programId: $stateParams.programId }).$promise;
    }

    NewsPrepService.$inject = ['NewsResource']
    function NewsPrepService(NewsResource) {
        return NewsResource.getAllCategories({pageNumber:1,pageSize :10}).$promise;
    }

    CategoriesPrepService.$inject = ['NewsResource']
    function CategoriesPrepService(NewsResource) {
        return NewsResource.getAllCategories().$promise;
    }
    itemsssPrepService.$inject = ['GetItemsssResource']
    function itemsssPrepService(GetItemsssResource) {
        return GetItemsssResource.getAllItemsss().$promise;
    }

    NewsByIdPrepService.$inject = ['NewsResource', '$stateParams']
    function NewsByIdPrepService(NewsResource, $stateParams) {
        return NewsResource.getNews({ id: $stateParams.id }).$promise;
    }
    itemsPrepService.$inject = ['GetItemsResource', '$stateParams']
    function itemsPrepService(GetItemsResource, $stateParams) {
        return GetItemsResource.getAllItems({ NewsId: $stateParams.newsId }).$promise;
    }

    itemPrepService.$inject = ['ItemResource', '$stateParams']
    function itemPrepService(ItemResource, $stateParams) {
        return ItemResource.getItem({ itemId: $stateParams.itemId }).$promise;
    }
    CityByIdPrepService.$inject = ['CityResource', '$stateParams']
    function CityByIdPrepService(CityResource, $stateParams) {
        return CityResource.getCity().$promise;
    }
    GovernrateByIdPrepService.$inject = ['GovernrateResource', '$stateParams']
    function GovernrateByIdPrepService(GovernrateResource, $stateParams) {
        return GovernrateResource.getGovernrate().$promise;
    }
    GovernratesForUserPrepService.$inject = ['GovernrateResource', '$stateParams']
    function GovernratesForUserPrepService(GovernrateResource, $stateParams) {
        return GovernrateResource.getAllGovernratesForUser({ userId: $stateParams.userId }).$promise;
    }
    CountriesPrepService.$inject = ['CountryResource']
    function CountriesPrepService(CountryResource) {
        return CountryResource.getAllCountries().$promise;
    }
    CitiesForUserPrepService.$inject = ['CityResource', '$stateParams']
    function CitiesForUserPrepService(CityResource, $stateParams) {
        return CityResource.getAllCitiesForUser({ userId: $stateParams.userId }).$promise;
    }
    AreasForUserPrepService.$inject = ['AreaResource', '$stateParams']
    function AreasForUserPrepService(AreaResource, $stateParams) {
        return AreaResource.getAllAreasForUser({ userId: $stateParams.userId }).$promise;
    }
    UserRoleByIdPrepService.$inject = ['UserResource' , '$stateParams']
    function UserRoleByIdPrepService(UserResource , $stateParams) {
        return UserResource.getUserRole({ userId: $stateParams.userId }).$promise;
    }
    ManufacturePrepService.$inject = ['ManufactureResource']
    function ManufacturePrepService(ManufactureResource) {
        return ManufactureResource.getAllManufactures().$promise;
    }

    ManfactureEditPrepService.$inject = ['ManufactureResource', '$stateParams']
    function ManfactureEditPrepService(ManufactureResource, $stateParams) {
        return ManufactureResource.getManufacture({ manufactureId: $stateParams.manufactureId }).$promise;
    }
    ContactTypePrepService.$inject = ['ContactTypeResource']
    function ContactTypePrepService(ContactTypeResource) {
        return ContactTypeResource.GetAllActiveContactType().$promise;
    }
    getManufacturePrepService.$inject = ['ManufactureResource', '$stateParams']
    function getManufacturePrepService(ManufactureResource, $stateParams) {
        return ManufactureResource.GenerateNewManufactureId().$promise;
    }

    ManfacturePrepService.$inject = ['ManufactureResource']
    function ManfacturePrepService(ManufactureResource) {
        return ManufactureResource.search().$promise;
    }

    DistributorsPrepService.$inject = ['DistributorsResource']
    function DistributorsPrepService(DistributorsResource) {
        return DistributorsResource.getAllDistributors().$promise;
    }
    DistributorEditByIdPrepService.$inject = ['DistributorsResource', '$stateParams']
    function DistributorEditByIdPrepService(DistributorsResource, $stateParams) {
        return DistributorsResource.getDistributors({ distributorId: $stateParams.distributorId }).$promise;
    }
    getDistributorsPrepService.$inject = ['DistributorsResource', '$stateParams']
    function getDistributorsPrepService(DistributorsResource, $stateParams) {
        return DistributorsResource.GenerateNewDistributorId().$promise;
    }
    DistributorPrepService.$inject = ['DistributorsResource']
    function DistributorPrepService(DistributorsResource) {
        return DistributorsResource.search().$promise;
    }

    RetailerPrepService.$inject = ['RetailerResource']
    function RetailerPrepService(RetailerResource) {
        return RetailerResource.getAllRetailers().$promise;
    }

    RetailerEditIdPrepService.$inject = ['RetailerResource', '$stateParams']
    function RetailerEditIdPrepService(RetailerResource, $stateParams) {
        return RetailerResource.getRetailer({ retailerId: $stateParams.retailerId }).$promise;
    }
    getRetailerPrepService.$inject = ['RetailerResource', '$stateParams']
    function getRetailerPrepService(RetailerResource, $stateParams) {
        return RetailerResource.GenerateNewRetailerId().$promise;
    }
    RetailersPrepService.$inject = ['RetailerResource']
    function RetailersPrepService(RetailerResource) {
        return RetailerResource.search().$promise;
    }
}());(function () {
    'use strict';

    angular
        .module('home')
        .controller('AreaController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'AreaResource', 'AreaPrepService',  '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService','CityByIdPrepService','GovernrateByIdPrepService','$stateParams', AreaController]);


    function AreaController($rootScope, blockUI, $scope, $filter, $translate,
        $state, AreaResource, AreaPrepService, $localStorage, authorizationService,
        appCONSTANTS, ToastService,CityByIdPrepService,GovernrateByIdPrepService,$stateParams) { 


        blockUI.start("Loading..."); 

                    var Manufacture = this;
        $scope.totalCount = AreaPrepService.totalCount;  


                $scope.AreaList = AreaPrepService;
        console.log($scope.AreaList);
        $scope.countryName = GovernrateByIdPrepService.countryNameDictionary[$scope.selectedLanguage];
        $scope.GovernrateName = GovernrateByIdPrepService.titleDictionary[$scope.selectedLanguage];
        $scope.cityName = CityByIdPrepService.titleDictionary[$scope.selectedLanguage];
        function refreshAreas() {

            blockUI.start("Loading..."); 

                        var k = AreaResource.getAllAreas({cityId: $stateParams.cityId, page:Manufacture.currentPage}).$promise.then(function (results) { 
                $scope.AreaList = results  
                blockUI.stop();

                            },
            function (data, status) {
                blockUI.stop();

                                ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
            });
        }
        Manufacture.showMore = function (element) {
            $(element.currentTarget).toggleClass("child-table-collapse");
        }
        Manufacture.currentPage = 1;
        $scope.changePage = function (page) {
            Manufacture.currentPage = page;
            refreshAreas();
        }
        blockUI.stop();

            }

})();
(function () {
    angular
      .module('home')
        .factory('AreaResource', ['$resource', 'appCONSTANTS', AreaResource]) 

    function AreaResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Areas/', {}, {
            getAllAreas: { method: 'GET', url: appCONSTANTS.API_URL + 'Cities/:cityId/Areas/GetAllAreas', useToken: true,  params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Areas/EditArea', useToken: true },
            getArea: { method: 'GET', url: appCONSTANTS.API_URL + 'Areas/GetAreaById/:AreaId', useToken: true },
            getAllAreasForUser: { method: 'GET', url: appCONSTANTS.API_URL + 'Users/:userId/Areas', useToken: true, isArray:true }
        })
    } 

}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('createAreaDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'AreaResource', 'ToastService', '$stateParams', 'CityByIdPrepService', 'GovernrateByIdPrepService', createAreaDialogController])

    function createAreaDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, AreaResource,
        ToastService, $stateParams, CityByIdPrepService, GovernrateByIdPrepService) {

        blockUI.start("Loading...");

        var Manufacture = this;
        Manufacture.language = appCONSTANTS.supportedLanguage;
        $scope.countryName = GovernrateByIdPrepService.countryNameDictionary[$scope.selectedLanguage];
        $scope.GovernrateName = GovernrateByIdPrepService.titleDictionary[$scope.selectedLanguage];
        $scope.cityName = CityByIdPrepService.titleDictionary[$scope.selectedLanguage];
        Manufacture.close = function () {
            $state.go('Area', { countryId: $stateParams.countryId, GovernrateId: $stateParams.GovernrateId, cityId: $stateParams.cityId });
        }

        Manufacture.AddNewArea = function () {
            blockUI.start("Loading...");

            var newObj = new AreaResource();
            newObj.cityId = $stateParams.cityId;
            newObj.titleDictionary = Manufacture.titleDictionary;
            newObj.IsDeleted = false;
            newObj.IsStatic = false;
            newObj.$create().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                    $state.go('Area', { countryId: $stateParams.countryId, GovernrateId: $stateParams.GovernrateId, cityId: $stateParams.cityId }, { reload: true });
                    blockUI.stop();


                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        blockUI.stop();

    }
}());
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('editAreaDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate', 'AreaResource', 'ToastService',
            'AreaByIdPrepService','$stateParams','CityByIdPrepService','GovernrateByIdPrepService', editAreaDialogController])

    function editAreaDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, AreaResource, ToastService, 
        AreaByIdPrepService, $stateParams, CityByIdPrepService, GovernrateByIdPrepService) {
        blockUI.start("Loading..."); 

                var Manufacture = this; 
		Manufacture.language = appCONSTANTS.supportedLanguage;
        Manufacture.Area = AreaByIdPrepService; 
        $scope.countryName = GovernrateByIdPrepService.countryNameDictionary[$scope.selectedLanguage];
        $scope.GovernrateName = GovernrateByIdPrepService.titleDictionary[$scope.selectedLanguage];
        $scope.cityName = CityByIdPrepService.titleDictionary[$scope.selectedLanguage];
        Manufacture.Close = function () {
            $state.go('Area',{countryId: $stateParams.countryId,GovernrateId: $stateParams.GovernrateId,cityId:$stateParams.cityId});
        }
        Manufacture.UpdateArea = function () { 
            blockUI.start("Loading..."); 

                        var updateObj = new AreaResource();
            updateObj.AreaId = Manufacture.Area.areaId;
            updateObj.cityId= $stateParams.cityId;                        
            updateObj.titleDictionary = Manufacture.Area.titleDictionary;
		    updateObj.IsDeleted = false;
		    updateObj.IsStatic = false;
		    updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();

                                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");

                     $state.go('Area',{countryId: $stateParams.countryId,GovernrateId: $stateParams.GovernrateId,cityId:$stateParams.cityId},{ reload: true });

                },
                function (data, status) {
                    blockUI.stop();

                                        ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        blockUI.stop();

        	}	
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('BranchController', ['$rootScope', '$scope', '$filter', '$translate',
            '$state', 'BranchResource',   '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', BranchController]);


    function BranchController($rootScope, $scope, $filter, $translate,
        $state, BranchResource,  $localStorage, authorizationService,
        appCONSTANTS, ToastService) {

        blockUI.start("Loading..."); 

                    refreshBranchs();

        function refreshBranchs() {
           blockUI.start("Loading..."); 

                        var k = BranchResource.getAllBranchs().$promise.then(function (results) {
                $scope.BranchList = results;
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
        .factory('BranchResource', ['$resource', 'appCONSTANTS', BranchResource]) 

    function BranchResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Branchs/', {}, {
            getAllBranchs: { method: 'GET', url: appCONSTANTS.API_URL + 'Branchs/GetAllBranchs', useToken: true,  params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Branchs/EditBranch', useToken: true },
            getBranch: { method: 'GET', url: appCONSTANTS.API_URL + 'Branchs/GetBranchById/:BranchId', useToken: true }
        })
    } 

}());
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('createBranchDialogController', ['$scope', 'blockUI','$http', '$state', 'appCONSTANTS', '$translate',
            'BranchResource', 'ToastService', '$stateParams', 'AreaByIdPrepService','CityByIdPrepService', 'GovernrateByIdPrepService', createBranchDialogController])

    function createBranchDialogController($scope, blockUI,$http, $state, appCONSTANTS, $translate, BranchResource,
        ToastService, $stateParams, AreaByIdPrepService,CityByIdPrepService, GovernrateByIdPrepService) {
		var Manufacture = this;
		Manufacture.Area = AreaByIdPrepService;
        Manufacture.language = appCONSTANTS.supportedLanguage;
        $scope.countryName = GovernrateByIdPrepService.countryNameDictionary[$scope.selectedLanguage];
        $scope.GovernrateName = GovernrateByIdPrepService.titleDictionary[$scope.selectedLanguage];
        $scope.cityName = CityByIdPrepService.titleDictionary[$scope.selectedLanguage];
        $scope.areaName = AreaByIdPrepService.titleDictionary[$scope.selectedLanguage];
		Manufacture.close = function(){
		    $state.go('Area',{ countryId: $stateParams.countryId, GovernrateId: $stateParams.GovernrateId, cityId: $stateParams.cityId });
		} 

		 		Manufacture.AddNewBranch = function () {
            blockUI.start("Loading...");
            var newObj = new BranchResource();
		    newObj.AreaId = Manufacture.Area.areaId;
            newObj.titleDictionary = Manufacture.titleDictionary;
            newObj.IsDeleted = false; 
            newObj.IsStatic =false;
            newObj.$create().then(
                function (data, status) {
                blockUI.stop();
                ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success"); 
                    $state.go('Area',{ countryId: $stateParams.countryId, GovernrateId: $stateParams.GovernrateId, cityId: $stateParams.cityId },{ reload: true });

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
        .controller('editBranchDialogController', ['$scope', 'blockUI','$http', '$state', 'appCONSTANTS', '$translate', 'BranchResource', 'ToastService',
            'BranchByIdPrepService','$stateParams','AreaByIdPrepService','CityByIdPrepService', 'GovernrateByIdPrepService', editBranchDialogController])

    function editBranchDialogController($scope,blockUI, $http, $state, appCONSTANTS, $translate, BranchResource, ToastService,
         BranchByIdPrepService,$stateParams,AreaByIdPrepService,CityByIdPrepService, GovernrateByIdPrepService) {
        var Manufacture = this;
        Manufacture.language = appCONSTANTS.supportedLanguage;
        Manufacture.Branch = BranchByIdPrepService;

                $scope.countryName = GovernrateByIdPrepService.countryNameDictionary[$scope.selectedLanguage];
        $scope.GovernrateName = GovernrateByIdPrepService.titleDictionary[$scope.selectedLanguage];
        $scope.cityName = CityByIdPrepService.titleDictionary[$scope.selectedLanguage];
        $scope.areaName = AreaByIdPrepService.titleDictionary[$scope.selectedLanguage];

                    Manufacture.close = function () {
            $state.go('Area', { countryId: $stateParams.countryId, GovernrateId: $stateParams.GovernrateId, cityId: $stateParams.cityId });
        }
        Manufacture.UpdateBranch = function () {
            blockUI.start("Loading...");
            var updateObj = new BranchResource();
            updateObj.BranchId = Manufacture.Branch.branchId;
            updateObj.titleDictionary = Manufacture.Branch.titleDictionary;
            updateObj.IsDeleted = false;
            updateObj.IsStatic = false;
            updateObj.$update().then(
                function (data, status) {
                blockUI.stop();
                ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");

                    $state.go('Area', { countryId: $stateParams.countryId, GovernrateId: $stateParams.GovernrateId, cityId: $stateParams.cityId },{ reload: true });

                },
                function (data, status) {
                blockUI.stop();
                ToastService.show("right", "bottom", "fadeInUp", data.title, "error");
                }
            );
        }
    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('CityController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'CityResource', 'CitiesPrepService',  '$stateParams', 'appCONSTANTS',
            'ToastService','GovernrateByIdPrepService','CountryByIdPrepService', CityController]);


    function CityController($rootScope, blockUI, $scope, $filter, $translate,
        $state, CityResource, CitiesPrepService, $stateParams, appCONSTANTS, ToastService,GovernrateByIdPrepService,CountryByIdPrepService) { 


        blockUI.start("Loading..."); 

                    var vm = this;
        $scope.totalCount = CitiesPrepService.totalCount;
        $scope.Cities  = CitiesPrepService;
        console.log($scope.Cities);
        $scope.countryName = CountryByIdPrepService.titles[$scope.selectedLanguage];

               $scope.GovernrateName = GovernrateByIdPrepService.titles[$scope.selectedLanguage];
        function refreshCities() {

            blockUI.start("Loading..."); 

                        var k = CityResource.getAllCities({governrateId: $stateParams.governrateId ,page:vm.currentPage}).$promise.then(function (results) { 
                $scope.Cities = results  
                blockUI.stop();

                            },
            function (data, status) {
                blockUI.stop();

                                ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
            });
        }

                vm.ChangeCityStatus = function (model) {

                        var updateObj = new CityResource();
            updateObj.cityId = model.cityId;
            updateObj.status =   (model.isActive == true ? false : true); 
            updateObj.$ChangeCityStatus({cityId:model.cityId,status:updateObj.status}).then(
                function (data, status) {
                    refreshCities();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    updateObj.status = model.isActive;
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
            return;
        }

            vm.currentPage = 1;
        $scope.changePage = function (page) {
            vm.currentPage = page;
            refreshCities();
        }
        blockUI.stop();

            }

})();
(function () {
    angular
      .module('home')
        .factory('CityResource', ['$resource', 'appCONSTANTS', CityResource]) 

    function CityResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL+ 'City/CreateCity' , {}, {
            getAllCities: { method: 'GET', url: appCONSTANTS.API_URL + 'City/GetCityByGovernrateId/:governrateId', useToken: true, params: { lang: '@lang' } , isArray:true },
            getAllActiveCities: { method: 'GET', url: appCONSTANTS.API_URL + 'City/GetAllActiveCities/:governrateId', useToken: true, params: { lang: '@lang' } , isArray:true },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'City/UpdateCity', useToken: true },
            getCity: { method: 'GET', url: appCONSTANTS.API_URL + 'City/GetCityById/:cityId', useToken: true },
            ChangeCityStatus: { method: 'POST', url: appCONSTANTS.API_URL + 'City/ChangeCityStatus/:cityId/:status', useToken: true},

        })
    } 

}());
(function () {
    'use strict';

    angular
        .module('home')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('Cities', {
                    url: '/:governrateId/City',
                    views: {
                        '@': {
                            templateUrl: './app/GlobalAdmin/City/templates/Cities.html',
                            controller: 'CityController',
                            'controllerAs': 'CityCtrl',
                        }
                    },
                    resolve: {
                        CitiesPrepService: CitiesPrepService,
                        GovernrateByIdPrepService: GovernrateByIdPrepService,
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    },
                    parent:"Governrates",
                    ncyBreadcrumb: {
                        label: '{{GovernrateName}}'
                    }
                })
                .state('newCity', {
                    url: '/:governrateId/newCity',
                    views: {
                        '@': {
                            templateUrl: './app/GlobalAdmin/City/templates/new.html',
                            controller: 'createCityDialogController',
                            'controllerAs': 'newCityCtrl',
                        }
                    },
                    resolve: {
                        GovernrateByIdPrepService: GovernrateByIdPrepService,
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    },
                    parent:"Governrates",
                    ncyBreadcrumb: {
                        label: '{{GovernrateName}}'
                    }

                })
                .state('editCity', {
                    url: '/:governrateId/editCity/:cityId',
                    views: {
                        '@': {
                            templateUrl: './app/GlobalAdmin/City/templates/edit.html',
                            controller: 'editCityDialogController',
                            'controllerAs': 'editCityCtrl',
                        }

                                            },
                    resolve: {
                        CityByIdPrepService: CityByIdPrepService,
                        GovernrateByIdPrepService: GovernrateByIdPrepService,
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    },
                    parent:"Governrates",
                    ncyBreadcrumb: {
                        label: '{{GovernrateName}}'
                    }

                })
        });

    CitiesPrepService.$inject = ['CityResource', '$stateParams']
    function CitiesPrepService(CityResource, $stateParams) {
        return CityResource.getAllCities({ governrateId: $stateParams.governrateId }).$promise;
    }

    CityByIdPrepService.$inject = ['CityResource', '$stateParams']
    function CityByIdPrepService(CityResource, $stateParams) {
        return CityResource.getCity({ cityId: $stateParams.cityId }).$promise;
    }

    GovernrateByIdPrepService.$inject = ['GovernrateResource', '$stateParams']
    function GovernrateByIdPrepService(GovernrateResource, $stateParams) {
        return GovernrateResource.getGovernrate({ governrateId: $stateParams.governrateId }).$promise;
    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('createCityDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'CityResource', 'ToastService', '$stateParams', 'GovernrateByIdPrepService', createCityDialogController])

    function createCityDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, CityResource,
        ToastService, $stateParams, GovernrateByIdPrepService) {

        blockUI.start("Loading...");

        var Manufacture = this;
        Manufacture.language = appCONSTANTS.supportedLanguage;
        $scope.GovernrateName = GovernrateByIdPrepService.titles[$scope.selectedLanguage];
        Manufacture.close = function () {
            $state.go('Cities', { countryId: $stateParams.countryId, governrateId: $stateParams.governrateId });
        }

        Manufacture.AddNewCity = function () {
            blockUI.start("Loading...");

            var newObj = new CityResource();
            newObj.ParentId = $stateParams.governrateId;
            newObj.titles = Manufacture.titles;
            newObj.IsDeleted = false;
            newObj.IsStatic = false;
            newObj.$create().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                    $state.go('Cities', { countryId: $stateParams.countryId, governrateId: $stateParams.governrateId }, { reload: true });
                    blockUI.stop();


                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        blockUI.stop();

    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('editCityDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate', 'CityResource', 'ToastService',
            'CityByIdPrepService', '$stateParams', 'GovernrateByIdPrepService', editCityDialogController])

    function editCityDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, CityResource, ToastService,
        CityByIdPrepService, $stateParams, GovernrateByIdPrepService) {
        blockUI.start("Loading...");

        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.City = CityByIdPrepService;
        $scope.GovernrateName = GovernrateByIdPrepService.titles[$scope.selectedLanguage];

        vm.Close = function () {
           $state.go('Cities', { governrateId: $stateParams.governrateId });
        }
        vm.UpdateCity = function () {
            blockUI.start("Loading...");

            var updateObj = new CityResource();
            updateObj.cityId = vm.City.cityId;
            updateObj.ParentId = $stateParams.governrateId;
            updateObj.titles = vm.City.titles;
            updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    $state.go('Cities', { governrateId: $stateParams.governrateId });

                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                }
            );
        }
        blockUI.stop();

    }
}());
(function () {
    angular
        .module('home')
        .factory('DistributorsResource', ['$resource', 'appCONSTANTS', DistributorsResource])

    function DistributorsResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL, {}, {
            create: { method: 'POST', url: appCONSTANTS.API_URL + 'Distributor/CreateDistributor', useToken: true, params: { lang: '@lang' } },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Distributor/UpdateDistributor', useToken: true},
            GenerateNewDistributorId: { method: 'GET', url: appCONSTANTS.API_URL + 'Distributor/GenerateDistributorCode', useToken: true },
            getAllDistributors: { method: 'GET', url: appCONSTANTS.API_URL + 'Distributor/GetAllDistributors', useToken: true, params: { lang: '@lang' } },
            delete: { method: 'DELETE', url: appCONSTANTS.API_URL + 'Distributor/DeleteDistributor/:distributorId', useToken: true },
            getDistributors: { method: 'GET', url: appCONSTANTS.API_URL + 'Distributor/GetDistributorById/:distributorId', useToken: true },
            ChangeDistributors: { method: 'POST', url: appCONSTANTS.API_URL + 'Distributor/ChangeDistributorStatus/:distributorId/:status', useToken: true },
            GetAllActiveDistributers: { method: 'GET', url: appCONSTANTS.API_URL + 'Distributor/GetAllActiveDistributor', useToken: true, isArray: true },
            search: { method: 'GET', url: appCONSTANTS.API_URL + 'Distributor/Search', useToken: true},

        })
    }

}());
(function () {
    'use strict';
    angular
        .module('home')
        .controller('DistributorsController', ["DistributorPrepService",'appCONSTANTS','$translate', 'DistributorsResource',
            'blockUI', '$uibModal', 'DistributorsPrepService',
            'ToastService', DistributorsController]);

    function DistributorsController(DistributorPrepService,appCONSTANTS,$translate, DistributorsResource,
        blockUI, $uibModal, DistributorsPrepService, ToastService) {
        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[11].children[0]).addClass("active")
        var vm = this;
        vm.currentPage =2;
        vm.appCONSTANTS = appCONSTANTS;
        vm.totalCount = DistributorsPrepService.totalCount;
        vm.DistributorsList = DistributorsPrepService.results;

        console.log(DistributorsPrepService);

                function refreshDistributors() {
            blockUI.start("Loading...");

            var k = DistributorsResource.getAllDistributors({ page: vm.currentPage }).$promise.then(function (results) {
                vm.DistributorsList = results.results;
                vm.totalCount = results.totalCount;
                 console.log(vm.DistributorsList);
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }
        function change(Distributors, isDeleted) {
            var updateObj = new DistributorsResource();
            updateObj.distributorId = Distributors.distributorId;
            updateObj.name =Distributors.name;
            updateObj.address = Distributors.address;
            updateObj.code = Distributors.code;
            if (!isDeleted)
            updateObj.isActive = (Distributors.isActive == true ? false : true);
            updateObj.isDeleted = Distributors.isDeleted;

            updateObj.$update().then(
                function (data, status) {
                    if (isDeleted)
                        refreshDistributors();

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    Distributors.isActive = updateObj.isActive;

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );

        }
        vm.ChangeDistributorsStatus = function (model) {


                        var updateObj = new DistributorsResource();
            updateObj.distributorId = model.distributorId;
            updateObj.status =   (model.isActive == true ? false : true);
            updateObj.$ChangeDistributors({distributorId:model.distributorId,status:updateObj.status}).then(
                function (data, status) {
                    refreshDistributors();
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

                        var updateObj = new DistributorsResource();
            updateObj.distributorId = model.distributorId;
            updateObj.$delete({ distributorId: model.distributorId }).then(
                function (data, status) {
                    refreshDistributors();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('DeletedSuccessfully'), "success");
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        vm.openDeleteDialog = function (model, name, distributorId) {
            var modalContent = $uibModal.open({
                templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
                controller: 'confirmDeleteDialogController',
                controllerAs: 'deleteDlCtrl',
                resolve: {
                    model: function () { return model },
                    itemName: function () { return name },
                    itemId: function () { return distributorId },
                    message: function () { return null },
                    callBackFunction: function () { return confirmationDelete }
                }

            });
        }
        vm.filterDistributor = function (name, page) {

                        refreshDistributor(name, page);
            vm.name = "";
          }
        function refreshDistributor(name, page) {
            blockUI.start("Loading...");
            var k = DistributorsResource.search({ name: name, page: page }).$promise.then(function (results) {
              vm.DistributorsList= results.results;
              vm.totalCount = results.totalCount;
              blockUI.stop();
            },
              function (data, status) {
                blockUI.stop();
                ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
              });
          }

        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshDistributors();
        }
    }

})();
(function () {
  angular.module('home')
    .controller("createDistributorDialogController", ['ContactTypePrepService', 'getDistributorsPrepService', '$rootScope', '$scope', 'DistributorsResource',
      'CountryResource', 'GovernrateResource', 'CityResource',
      'appCONSTANTS', 'ToastService',
      '$translate', 'blockUI', '$http', '$state', 'CountriesPrepService',
      createDistributorDialogController]);

  function createDistributorDialogController(ContactTypePrepService, getDistributorsPrepService, $rootScope, $scope, DistributorsResource,
    CountryResource, GovernrateResource,
    CityResource, appCONSTANTS, ToastService, $translate, blockUI, $http,
    $state, CountriesPrepService) {
    var vm = this;
    vm.code = getDistributorsPrepService.id;
    vm.language = appCONSTANTS.supportedLanguage;
    vm.currentStep = 1;
    vm.DistributorLogo;
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
    $rootScope.image = null;



    vm.steps = [
      {
        step: 1,
        name: "First step",
        template: "./app/GlobalAdmin/Distributors/templates/step1.html"
      },
      {
        step: 2,
        name: "Second step",
        template: "./app/GlobalAdmin/Distributors/templates/step2.html"
      },
      {
        step: 3,
        name: "Third step",
        template: "./app/GlobalAdmin/Distributors/templates/step3.html"
      },
    ];

    vm.LoadUploadLogo = function () {
      $("#DistributorLogo ").click();
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
          $scope.newDistributorsForm = true;
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
    var checkboxValue=[];
    vm.gotoStep = function (newStep) {

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
      if (vm.currentStep == 2) {
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

    vm.addNewDistributors = function () {
      blockUI.start("Loading...");

      var splitImage = $rootScope.image.split(',');
      var newDistributors = new DistributorsResource();
      newDistributors.name = vm.nameStepOne;
      newDistributors.address = vm.address;
      newDistributors.email = vm.emailStepOne;
      newDistributors.url = vm.url;
      newDistributors.code = vm.code;
      newDistributors.cityId = vm.selectedCityId;
      newDistributors.countryId = vm.selectedCountryId;
      newDistributors.governrateId = vm.selectedGovernrateId;
      newDistributors.distributorContactInformation = vm.ContactList;
      newDistributors.taxId = vm.taxId;
      newDistributors.commercialReg = vm.commercialReg;
      newDistributors.companyLogo = splitImage[1];
      newDistributors.logoContentType = $rootScope.imageType;

      newDistributors.$create().then
        (
          function (data, status) {
            blockUI.stop();
            if (data.isSuccsess) {
              ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
              $state.go('Distributor');
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
    vm.countries.push({ countryId: 0, titles: { "en-uk": "Select Country", "ar-eg": "اختار بلد" } });
    vm.selectedCountryId = 0;
    console.log(vm.countries);
    CountryResource.getAllCountries().$promise.then(function (results) {

      vm.countries = vm.countries.concat(results.results);
      console.log(vm.countries);
    },
      function (data, status) {
        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
      });
    vm.resetDLL = function () {
      vm.countries = [];
      vm.countries.push({ id: 0, titles: { "en-uk": "Select Country", "ar-eg": "اختار بلد" } });
      vm.selectedCountryId = 0;
      vm.countries = vm.countries.concat(CountriesPrepService.results)
      vm.Governrates = [];
      vm.cities = [];
      vm.categoryList = [];
    }
    vm.countryChange = function () {

      vm.Governrates = [];
      vm.cities = [];

      if (vm.selectedCountryId == null)
        return;
      vm.Governrates.push({ governrateId: 0, titles: { "en-uk": "Select Governrate", "ar-eg": "اختار اقليم" } });
      GovernrateResource.GetAllActiveGovernrates({ countryId: vm.selectedCountryId }).$promise.then(function (results) {
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


})();(function () {
  'use strict';

  angular
    .module('home')
    .controller('editDistributorDialogController', ['$rootScope', 'ContactTypePrepService', 'CityResource', 'GovernrateResource', 'CountriesPrepService', 'CountryResource', 'blockUI', '$filter', '$http', '$state', 'appCONSTANTS', '$translate',
      'DistributorsResource', 'ToastService', 'DistributorEditByIdPrepService', editDistributorDialogController])

  function editDistributorDialogController($rootScope, ContactTypePrepService, CityResource, GovernrateResource, CountriesPrepService, CountryResource, blockUI, $filter, $http, $state, appCONSTANTS, $translate, DistributorsResource,
    ToastService, DistributorEditByIdPrepService) {
    var vm = this;
    vm.language = appCONSTANTS.supportedLanguage;
    vm.Distributor = DistributorEditByIdPrepService;
    console.log("m", vm.Distributor);
    $rootScope.image = appCONSTANTS.Image_URL_ACTOR + vm.Distributor.companyLogo;
    vm.currentStep = 1;
    vm.DistributorLogo;
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
    vm.Contacts = [];
    vm.user = {};
    vm.companyLogo;
    vm.imageData;


    vm.openDeleteContactTypeDialog = function(e){
      vm.Distributor.distributorContactInformation.splice(e, 1);
   };
   vm.openDeleteContactTypeDialogContactList = function(e){
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
      if (vm.Distributor.distributorContactInformation.length != 0) {
        var checkContact = vm.Distributor.distributorContactInformation.find(v => v.mobileNumber == vm.conactObject.mobileNumber);
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


      vm.Distributor.distributorContactInformation.push(vm.conactObject);
    }
    vm.setContactMain = function (index) {
      var checkIfContactHasMain = vm.Distributor.distributorContactInformation.find(v => v.main == true && v.mobileNumber != index.mobileNumber);
      if (checkIfContactHasMain) {
        index.main = false;
        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('just one contact must be main '), "error"); return;
      }
    }


    vm.steps = [
      {
        step: 1,
        name: "First step",
        template: "./app/GlobalAdmin/Distributors/templates/editstep1.html"
      },
      {
        step: 2,
        name: "Second step",
        template: "./app/GlobalAdmin/Distributors/templates/editstep2.html"
      },
      {
        step: 3,
        name: "Third step",
        template: "./app/GlobalAdmin/Distributors/templates/editstep3.html"
      },
    ];
    vm.gotoStep = function (newStep) {

      if (vm.currentStep == 1) {
        if (vm.Distributor.name == null) {
          ToastService.show("right", "bottom", "fadeInUp", $translate.instant('you should edit Name'), "error");
          return;
        }
        if (vm.Distributor.address == null) {
          ToastService.show("right", "bottom", "fadeInUp", $translate.instant('you should edit Address'), "error");
          return;
        }
        if (vm.selectedCityId == 0 || vm.selectedCountryId == 0 || vm.selectedGovernrateId == 0) {
          ToastService.show("right", "bottom", "fadeInUp", $translate.instant('you should edit location'), "error");
          return;
        }
      }
      if (vm.Distributor.currentStep == 2) 
      {
        if (vm.Distributor.distributorContactInformation != 0) 
        {

          for (let i = 0; i < vm.Distributor.distributorContactInformation.length; i++) {
            var value = vm.Distributor.distributorContactInformation[i].main;
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
      $state.go('Distributor');
    }
    vm.UpdateDistributor = function () {

            blockUI.start("Loading...");
      var updateObj = new DistributorsResource();
      var splitImage = $rootScope.image.split(',');
      updateObj.code = vm.Distributor.code;
      updateObj.name = vm.Distributor.name;
      updateObj.distributorId = vm.Distributor.distributorId;
      updateObj.address = vm.Distributor.address;
      updateObj.email = vm.Distributor.email;
      updateObj.url = vm.Distributor.webSite;
      updateObj.code = vm.Distributor.code;
      updateObj.cityId = vm.selectedCityId;
      updateObj.countryId = vm.selectedCountryId;
      updateObj.governrateId = vm.selectedGovernrateId;
      updateObj.distributorContactInformation = vm.Distributor.distributorContactInformation;
      updateObj.taxId = vm.Distributor.taxId;
      updateObj.commercialReg = vm.Distributor.commercialReg;
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
              $state.go('Distributor');
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

      var indexRate = vm.countries.indexOf($filter('filter')(vm.countries, { 'countryId': vm.Distributor.country.countryId }, true)[0]);
      vm.selectedCountryId = vm.countries[indexRate].countryId;
      console.log(vm.cities);
      vm.Governrates = [];
      vm.cities = [];
      vm.Governrates.push({ id: 0, titles: { "en-uk": "Select Governrate", "ar-eg": "اختار اقليم" } });
      GovernrateResource.GetAllActiveGovernrates({ countryId: vm.selectedCountryId }).$promise.then(function (results) {
        vm.selectedGovernrateId = 0;

                vm.Governrates = vm.Governrates.concat(results);
        var indexRate = vm.Governrates.indexOf($filter('filter')(vm.Governrates, { 'governrateId': vm.Distributor.governrate.governrateId }, true)[0]);
        vm.selectedGovernrateId = vm.Governrates[indexRate].governrateId;
        if (vm.selectedGovernrateId != undefined) {
          for (var i = vm.Governrates.length - 1; i >= 0; i--) {
            if (vm.Governrates[i].id == 0) {
              vm.Governrates.splice(i, 1);
            }
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
              { 'cityId': vm.Distributor.city.cityId }, true)[0]);
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
    vm.resetDLL = function () {
      vm.countries = [];
      vm.countries.push({ id: 0, titles: { "en-uk": "Select Country", "ar-eg": "اختار بلد" } });
      vm.selectedCountryId = 0;
      vm.countries = vm.countries.concat(CountriesPrepService.results)
      vm.Governrates = [];
      vm.cities = [];
      vm.categoryList = [];
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
    vm.LoadUploadLogo = function () {
			$("#imageName").click();
		}
  }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('CountryController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'CountryResource', 'CountryPrepService',  '$localStorage', 'appCONSTANTS',
            'ToastService', CountryController]);


    function CountryController($rootScope, blockUI, $scope, $filter, $translate,
        $state, CountryResource, CountryPrepService, $localStorage, appCONSTANTS, ToastService) { 
        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[2].children[0]).addClass("active")

        blockUI.start("Loading..."); 

                    var Manufacture = this;
        $scope.totalCount = CountryPrepService.totalCount;
        $scope.Countries  = CountryPrepService.results;
        console.log($scope.Countries);
        function refreshCountries() {

            blockUI.start("Loading..."); 

                     var k = CountryResource.getAllCountries({page:Manufacture.currentPage}).$promise.then(function (results) { 
                $scope.Countries = results  
                blockUI.stop();

                            },

                        function (data, status) {
                blockUI.stop();
                ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
            });
        }

                Manufacture.currentPage = 1;
        $scope.changePage = function (page) {
            Manufacture.currentPage = page;
            refreshCountries();
        }
        blockUI.stop();

            }

})();
(function () {
    angular
        .module('home')
        .factory('CountryResource', ['$resource', 'appCONSTANTS', CountryResource])

    function CountryResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Country/CreateCountry', {}, {
            getAllCountries: { method: 'GET', url: appCONSTANTS.API_URL + 'Country/GetAllCountry',useToken: true, params: { lang: '@lang' } },
            GetAllActiveCountries: { method: 'GET', url: appCONSTANTS.API_URL + 'Country/GetAllActiveCountries',useToken: true, params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Country/UpdateCountry', useToken: true },
            getCountry: { method: 'GET', url: appCONSTANTS.API_URL + 'Country/GetCountryById/:countryId', useToken: true }

        })
    }

}());
(function () {
    'use strict';

    angular
        .module('home')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('Countries', {
                    url: '/Country',
                    templateUrl: './app/GlobalAdmin/Country/templates/Countries.html',
                    controller: 'CountryController',
                    'controllerAs': 'CountryCtrl',
                    resolve: {
                        CountryPrepService: CountryPrepService
                    },
                    data: {
                        permissions: {
                            only: ['9'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('newCountry', {
                    url: '/newCountry',
                    templateUrl: './app/GlobalAdmin/Country/templates/new.html',
                    controller: 'createCountryDialogController',
                    'controllerAs': 'newCountryCtrl',
                    data: {
                        permissions: {
                            only: ['9'],
                            redirectTo: 'root'
                        }
                    }


                })
                .state('editCountry', {
                    url: '/editCountry/:countryId',
                    templateUrl: './app/GlobalAdmin/Country/templates/edit.html',
                    controller: 'editCountryDialogController',
                    'controllerAs': 'editCountryCtrl',
                    resolve: {
                        CountryByIdPrepService: CountryByIdPrepService
                    },
                    data: {
                        permissions: {
                            only: ['9'],
                            redirectTo: 'root'
                        }
                    }

                })
        });

    CountryPrepService.$inject = ['CountryResource']
    function CountryPrepService(CountryResource) {
        return CountryResource.getAllCountries().$promise;
    }

    CountryByIdPrepService.$inject = ['CountryResource', '$stateParams']
    function CountryByIdPrepService(CountryResource, $stateParams) {
        return CountryResource.getCountry({ countryId: $stateParams.countryId }).$promise;
    }

}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('createCountryDialogController', ['blockUI', '$state', 'appCONSTANTS', '$translate',
            'CountryResource', 'ToastService', createCountryDialogController])

    function createCountryDialogController(blockUI, $state, appCONSTANTS, $translate, CountryResource,
        ToastService) {

        blockUI.start("Loading...");

        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.close = function () {
            $state.go('Countries');
        }

        vm.AddNewCountry = function () {
            blockUI.start("Loading...");

                        var newObj = new CountryResource();
            newObj.titles = vm.titles;
            newObj.$create().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                    $state.go('Countries');
                    blockUI.stop();


                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data, "error");
                }
            );
        }
        blockUI.stop();

    }
}());
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('editCountryDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate', 'CountryResource', 'ToastService',
            'CountryByIdPrepService', editCountryDialogController])

    function editCountryDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, CountryResource, ToastService, CountryByIdPrepService) {
        blockUI.start("Loading..."); 

                var vm = this; 
		vm.language = appCONSTANTS.supportedLanguage;
        vm.Country = CountryByIdPrepService; 
        vm.Close = function () {
            $state.go('Countries');
        }
        vm.UpdateCountry  = function () { 
            blockUI.start("Loading..."); 

                        var updateObj = new CountryResource();
            updateObj.countryId = vm.Country.countryId;
            updateObj.titles = vm.Country.titles; 
		    updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();


                                                            ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");

                     $state.go('Countries');

                },
                function (data, status) {
                    blockUI.stop();

                                        ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        blockUI.stop();

        	}	
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('ContactTypeController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'ContactTypeResource', 'ContactTypePrepService', '$localStorage', 'appCONSTANTS',
            'ToastService', ContactTypeController]);


    function ContactTypeController($rootScope, blockUI, $scope, $filter, $translate,
        $state, ContactTypeResource, ContactTypePrepService, $localStorage, appCONSTANTS, ToastService) {
        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[3].children[0]).addClass("active")

        blockUI.start("Loading...");

        var vm = this;
        $scope.totalCount = ContactTypePrepService.totalCount;
        vm.ContactTypes = ContactTypePrepService.results;
        console.log(vm.ContactTypes);
        function refreshContactType() {

                        blockUI.start("Loading...");

            var k = ContactTypeResource.getAllContactType({ page: vm.currentPage }).$promise.then(function (results) {
                vm.ContactTypes = results.results;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }

        vm.ChangeContactTypeStatus = function (model) {


                        var updateObj = new ContactTypeResource();
            updateObj.$ChangeStatus({ contactTypeId: model.contactTypeId, status: (model.status == true ? false : true) }).then(
                function (data, status) {

                                        refreshContactType();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    updateObj.status = model.status;
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
            return;
        }
        vm.currentPage = 1;
        $scope.changePage = function (page) {
            vm.currentPage = page;
            refreshContactType();
        }
        blockUI.stop();

    }

})();
(function () {
    angular
        .module('home')
        .factory('ContactTypeResource', ['$resource', 'appCONSTANTS', ContactTypeResource])

    function ContactTypeResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'ContactType/CreateContactType', {}, {
            getAllContactType: { method: 'GET', url: appCONSTANTS.API_URL + 'ContactType/GetAllContactType',useToken: true, params: { lang: '@lang' } },
            GetAllActiveContactType: { method: 'GET', url: appCONSTANTS.API_URL + 'ContactType/GetAllActiveContactType',useToken: true,isArray:true },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'ContactType/UpdateContactType', useToken: true ,},
            getContactType: { method: 'GET', url: appCONSTANTS.API_URL + 'ContactType/GetContactTypeById/:contactTypeId', useToken: true },
            ChangeStatus: { method: 'POST', url: appCONSTANTS.API_URL + 'ContactType/ChangeContactTypeStatus/:contactTypeId/:status', useToken: true},
            getAllActiveContactType: { method: 'GET', url: appCONSTANTS.API_URL + 'ContactType/GetAllActiveContactType',useToken: true,isArray:true}

        })
    }

}());
(function () {
    'use strict';

    angular
        .module('home')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('ContactType', {
                    url: '/ContactType',
                    templateUrl: './app/GlobalAdmin/ContactType/templates/ContactType.html',
                    controller: 'ContactTypeController',
                    'controllerAs': 'ContactTypeCtrl',
                    resolve: {
                        ContactTypePrepService: ContactTypePrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('newContactType', {
                    url: '/newContactType',
                    templateUrl: './app/GlobalAdmin/ContactType/templates/new.html',
                    controller: 'createContactTypeDialogController',
                    'controllerAs': 'newContactTypeCtrl',
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editContactType', {
                    url: '/editContactType/:contactTypeId',
                    templateUrl: './app/GlobalAdmin/ContactType/templates/edit.html',
                    controller: 'editContactTypeDialogController',
                    'controllerAs': 'editContactTypeCtrl',
                    resolve: {
                        ContactTypeByIdPrepService: ContactTypeByIdPrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
        });

    ContactTypePrepService.$inject = ['ContactTypeResource']
    function ContactTypePrepService(ContactTypeResource) {
        return ContactTypeResource.getAllContactType().$promise;
    }

    ContactTypeByIdPrepService.$inject = ['ContactTypeResource', '$stateParams']
    function ContactTypeByIdPrepService(ContactTypeResource, $stateParams) {
        return ContactTypeResource.getContactType({ contactTypeId: $stateParams.contactTypeId }).$promise;
    }

}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('createContactTypeDialogController', ['blockUI', '$state', 'appCONSTANTS', '$translate',
            'ContactTypeResource', 'ToastService', createContactTypeDialogController])

    function createContactTypeDialogController(blockUI, $state, appCONSTANTS, $translate, ContactTypeResource,
        ToastService) {

        blockUI.start("Loading...");

        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.close = function () {
            $state.go('ContactType');
        }

        vm.AddNewContactType = function () {
            blockUI.start("Loading...");

                        var newObj = new ContactTypeResource();
            newObj.titles = vm.titles;
            newObj.$create().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                    $state.go('ContactType');
                    blockUI.stop();
                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data, "error");
                }
            );
        }
        blockUI.stop();

    }
}());
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('editContactTypeDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate', 'ContactTypeResource', 'ToastService',
            'ContactTypeByIdPrepService', editContactTypeDialogController])

    function editContactTypeDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, ContactTypeResource, ToastService, ContactTypeByIdPrepService) {
        blockUI.start("Loading..."); 

                var vm = this; 
		vm.language = appCONSTANTS.supportedLanguage;
        vm.ContactType = ContactTypeByIdPrepService; 
        console.log(ContactTypeByIdPrepService);
        vm.Close = function () {
            $state.go('ContactType');
        }
        vm.UpdateContactType  = function () { 

                        blockUI.start("Loading..."); 

                        var updateObj = new ContactTypeResource();
            updateObj.contactTypeId = vm.ContactType.contactTypeId;
            updateObj.titles = vm.ContactType.titles; 
		    updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();

                                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");

                     $state.go('ContactType');

                },
                function (data, status) {
                    blockUI.stop();

                                        ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        blockUI.stop();

        	}	
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('GovernrateController', ['$rootScope', 'GovernrateSearchPrepService', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'GovernrateResource', 'GovernratesPrepService', '$stateParams', 'appCONSTANTS',
            'ToastService', 'CountryByIdPrepService', GovernrateController]);


    function GovernrateController($rootScope, GovernrateSearchPrepService, blockUI, $scope, $filter, $translate,
        $state, GovernrateResource, GovernratesPrepService, $stateParams, appCONSTANTS, ToastService, CountryByIdPrepService) {


        blockUI.start("Loading...");

        var vm = this;

                vm.currentPage = 1;
        $scope.totalCount = GovernratesPrepService.totalCount;
        $scope.Governrates = GovernratesPrepService.results;
        $scope.countryName = CountryByIdPrepService.titles[$scope.selectedLanguage];
        function refreshGovernrates() {

            blockUI.start("Loading...");

            var k = GovernrateResource.getAllGovernrates({ countryId: $stateParams.countryId, page: vm.currentPage }).$promise.then(function (results) {
                $scope.Governrates = results.results
                blockUI.stop();

            },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }


                vm.ChangeGovernrateStatus = function (model) {

                        var updateObj = new GovernrateResource();
            updateObj.governrateId = model.governrateId;
            updateObj.status = (model.isActive == true ? false : true);
            updateObj.$ChangeGovernrateStatus({ governrateId: model.governrateId, status: updateObj.status }).then(
                function (data, status) {
                    refreshGovernrates();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    updateObj.status = model.isActive;
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
            return;
        }


        vm.filterGovernrate = function (name) {

                        refreshGovernrate(name);
            vm.name = "";
        }
        function refreshGovernrate(name) {
            blockUI.start("Loading...");

                        var k = GovernrateResource.search({ text: name, page: vm.currentPage, countryId: $stateParams.countryId }).$promise.then(function (results) {
                $scope.Governrates = results.results;
                $scope.totalCount = results.totalCount;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }

        $scope.changePage = function (page) {
            vm.currentPage = page;
            refreshGovernrates();
        }
        blockUI.stop();




    }

})();
(function () {
    angular
        .module('home')
        .factory('GovernrateResource', ['$resource', 'appCONSTANTS', GovernrateResource])

    function GovernrateResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL, {}, {
            getAllGovernrates: { method: 'GET', url: appCONSTANTS.API_URL + 'Governrate/GetGovernrateByCountryId/:countryId', useToken: true, params: { lang: '@lang' }  },
            GetAllActiveGovernrates: { method: 'GET', url: appCONSTANTS.API_URL + 'Governrate/GetAllActiveGovernrates/:countryId', useToken: true, params: { lang: '@lang' }, isArray: true },
            GetGovernrateById: {
                method: 'GET', url: appCONSTANTS.API_URL + 'Governrate/GetGovernrateById/:countryId',
                useToken: true, params: { lang: '@lang' }
            },
            create: { method: 'POST', useToken: true, url: appCONSTANTS.API_URL + 'Governrate/CreateGovernrate' },
            search: { method: 'GET', useToken: true, url: appCONSTANTS.API_URL + 'Governrate/GetAllGovernrate' },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Governrate/UpdateGovernrate', useToken: true },
            getGovernrate: { method: 'GET', url: appCONSTANTS.API_URL + 'Governrate/GetGovernrateById/:governrateId', useToken: true },
            ChangeGovernrateStatus: { method: 'POST', url: appCONSTANTS.API_URL + 'Governrate/ChangeGovernrateStatus/:governrateId/:status', useToken: true },

        })
    }

}());
(function () {
    'use strict';

    angular
        .module('home')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('Governrates', {
                    url: '/Country/:countryId/Governrate',
                    templateUrl: './app/GlobalAdmin/Governrate/templates/Governrate.html',
                    controller: 'GovernrateController',
                    'controllerAs': 'GovernrateCtrl',
                    resolve: {
                        GovernratesPrepService: GovernratesPrepService,
                        CountryByIdPrepService: CountryByIdPrepService ,
                        GovernrateSearchPrepService:GovernrateSearchPrepService                       
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    },
                    ncyBreadcrumb: {
                        label: '{{countryName}}'
                    }
                })
                .state('newGovernrate', {
                    url: '/Country/:countryId/newGovernrate',
                    templateUrl: './app/GlobalAdmin/Governrate/templates/new.html',
                    controller: 'createGovernrateDialogController',
                    'controllerAs': 'newGovernrateCtrl',
                    resolve: {
                        CountryByIdPrepService: CountryByIdPrepService                        
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    },
                    ncyBreadcrumb: {
                        label: '{{countryName}}'
                    }

                })

                                .state('editGovernrate', {
                    url: '/Country/:countryId/editGovernrate/:governrateId',
                    templateUrl: './app/GlobalAdmin/Governrate/templates/edit.html',
                    controller: 'editGovernrateDialogController',
                    'controllerAs': 'editGovernrateCtrl',
                    resolve: {
                        GovernrateByIdPrepService: GovernrateByIdPrepService,
                        CountryByIdPrepService: CountryByIdPrepService                        
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    },
                    ncyBreadcrumb: {
                        label: '{{countryName}}'
                    }

                })
        });

    GovernratesPrepService.$inject = ['GovernrateResource', '$stateParams']
    function GovernratesPrepService(GovernrateResource, $stateParams) {
        return GovernrateResource.getAllGovernrates({ countryId: $stateParams.countryId }).$promise;
    }

    GovernrateByIdPrepService.$inject = ['GovernrateResource', '$stateParams']
    function GovernrateByIdPrepService(GovernrateResource, $stateParams) {
        return GovernrateResource.getGovernrate({ governrateId: $stateParams.governrateId }).$promise;
    }
    CountryByIdPrepService.$inject = ['CountryResource', '$stateParams']
    function CountryByIdPrepService(CountryResource, $stateParams) {
        return CountryResource.getCountry({ countryId: $stateParams.countryId }).$promise;
    }
    GovernrateSearchPrepService.$inject = ['GovernrateResource']
    function GovernrateSearchPrepService(GovernrateResource) {
        return GovernrateResource.search().$promise;
    }


    }());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('createGovernrateDialogController', ['GovernrateResource', '$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'ToastService', '$stateParams', 'CountryByIdPrepService'
            , createGovernrateDialogController])

    function createGovernrateDialogController(GovernrateResource, $scope, blockUI, $http, $state, appCONSTANTS, $translate,
        ToastService, $stateParams, CountryByIdPrepService) {

        blockUI.start("Loading...");

        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        $scope.countryName = CountryByIdPrepService.titles[$scope.selectedLanguage];

        vm.close = function () {
            $state.go('Governrates', { countryId: $stateParams.countryId });
        }

        vm.AddNewGovernrate = function () {
            blockUI.start("Loading...");

                        var newObj = new GovernrateResource();
            newObj.parentId = $stateParams.countryId;
            newObj.titles = vm.titles;
            newObj.IsDeleted = false;
            newObj.IsStatic = false;
            newObj.$create().then(
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                    $state.go('Governrates', { countryId: $stateParams.countryId }, { reload: true });

                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        blockUI.stop();

    }
}());
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('editGovernrateDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate', 'GovernrateResource', 'ToastService',
            'GovernrateByIdPrepService','$stateParams','CountryByIdPrepService', editGovernrateDialogController])

    function editGovernrateDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, GovernrateResource, ToastService, 
        GovernrateByIdPrepService,$stateParams,CountryByIdPrepService) {
        blockUI.start("Loading..."); 

                var vm = this; 
		vm.language = appCONSTANTS.supportedLanguage;
        vm.Governrate = GovernrateByIdPrepService; 
        $scope.countryName = CountryByIdPrepService.titles[$scope.selectedLanguage];

                vm.Close = function () {
            $state.go('Governrates',{countryId: $stateParams.countryId });
        }
        vm.UpdateGovernrate  = function () { 
            blockUI.start("Loading..."); 

                        var updateObj = new GovernrateResource();
            updateObj.GovernrateId = vm.Governrate.governrateId;
            updateObj.countryId= $stateParams.countryId;
            updateObj.titles = vm.Governrate.titles; 
		    updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();

                                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");

                     $state.go('Governrates',{countryId: $stateParams.countryId },{ reload: true });

                },
                function (data, status) {
                    blockUI.stop();

                                        ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        blockUI.stop();

        	}	
}());
(function () {
    'use strict';
    angular
        .module('home')
        .controller('ManufactureController', ['ManfacturePrepService', '$rootScope', 'appCONSTANTS', '$translate', 'ManufactureResource',
            'blockUI', '$uibModal', 'ManufacturePrepService',
            'ToastService', ManufactureController]);

    function ManufactureController(ManfacturePrepService, $rootScope, appCONSTANTS, $translate, ManufactureResource,
        blockUI, $uibModal, ManufacturePrepService, ToastService) {
        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[12].children[0]).addClass("active")
        var vm = this;
        vm.currentPage = 1;
        vm.appCONSTANTS = appCONSTANTS;
        vm.Manfactures = {};
        vm.totalCount = ManfacturePrepService.totalCount;
        console.log(ManfacturePrepService.totalCount);
        vm.totalCount = ManufacturePrepService.totalCount;
        vm.ManufactureList = ManufacturePrepService;
        function refreshManufactures() {
            blockUI.start("Loading...");

            var k = ManufactureResource.getAllManufactures({ page: vm.currentPage }).$promise.then(function (results) {
                vm.ManufactureList = results;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }
        vm.ChangeManufactureStatus = function (model) {


                        var updateObj = new ManufactureResource();
            updateObj.manufactureId = model.manufactureId;
            updateObj.status = (model.isActive == true ? false : true);
            updateObj.$ChangeManufacture({ manufactureId: model.manufactureId, status: updateObj.status }).then(
                function (data, status) {

                                        refreshManufactures();
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

                        var updateObj = new ManufactureResource();
            updateObj.manufactureId = model.manufactureId;
            updateObj.$delete({ manufactureId: model.manufactureId }).then(
                function (data, status) {
                    refreshManufactures();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('DeletedSuccessfully'), "success");
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        vm.openDeleteDialog = function (model, name, manufactureId) {

                        var modalContent = $uibModal.open({
                templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
                controller: 'confirmDeleteDialogController',
                controllerAs: 'deleteDlCtrl',
                resolve: {
                    model: function () { return model },
                    itemName: function () { return name },
                    itemId: function () { return manufactureId },
                    message: function () { return null },
                    callBackFunction: function () { return confirmationDelete }
                }

            });
        }

             vm.filterManfacture = function (name, page) {

                        refreshManfacture(name, page);
            vm.name = "";
        }
        function refreshManfacture(name, page) {
            blockUI.start("Loading...");
            var k = ManufactureResource.search({ name: name, page: page }).$promise.then(function (results) {
                vm.ManufactureList = results;
                vm.totalCount = results.totalCount;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }

        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshmanufactures();
        }
    }

})();
(function () {
    angular
        .module('home')
        .factory('ManufactureResource', ['$resource', 'appCONSTANTS', ManufactureResource])

    function ManufactureResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL, {}, {
            create: { method: 'POST', url: appCONSTANTS.API_URL + 'Manufacture/CreateManufacture', useToken: true, params: { lang: '@lang' } },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Manufacture/UpdateManufacture', useToken: true},
            GenerateNewManufactureId: { method: 'GET', url: appCONSTANTS.API_URL + 'Manufacture/GenerateNewManufactureCode', useToken: true },
            getAllManufactures: { method: 'GET', url: appCONSTANTS.API_URL + 'Manufacture/GetAllManufacture', useToken: true, params: { lang: '@lang' } },
            delete: { method: 'DELETE', url: appCONSTANTS.API_URL + 'Manufacture/DeleteManufacture/:manufactureId', useToken: true },
            getManufacture: { method: 'GET', url: appCONSTANTS.API_URL + 'Manufacture/GetManufactureById/:manufactureId', useToken: true },
            ChangeManufacture: { method: 'POST', url: appCONSTANTS.API_URL + 'Manufacture/ChangeManufactureStatus/:manufactureId/:status', useToken: true },
            search: { method: 'GET', url: appCONSTANTS.API_URL + 'Manufacture/Search', useToken: true },

        })
    }

}());
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


})();(function () {
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


    vm.openDeleteContactTypeDialog = function (e) {
      vm.Manufacture.manufactureContactInformation.splice(e, 1);
    };
    vm.openDeleteContactTypeDialogContactList = function (e) {
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
    vm.resetDLL = function () {
      vm.countries = [];
      vm.countries.push({ id: 0, titles: { "en-uk": "Select Country", "ar-eg": "اختار بلد" } });
      vm.selectedCountryId = 0;
      vm.countries = vm.countries.concat(CountriesPrepService.results)
      vm.Governrates = [];
      vm.cities = [];
      vm.categoryList = [];

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
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('NewsController', ['appCONSTANTS','$scope', '$translate', 'NewsResource', 'blockUI', '$uibModal', 'NewsPrepService',
            'ToastService', NewsController]);


    function NewsController(appCONSTANTS,$scope, $translate, NewsResource, blockUI, $uibModal, NewsPrepService, ToastService) {
        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[6].children[0]).addClass("active")
        var vm = this;
       debugger;
        vm.currentPage = 1;
        vm.appCONSTANTS = appCONSTANTS;
        $scope.totalCount = NewsPrepService.metadata.totalItemCount;
        $scope.NewsList = NewsPrepService.items;
        console.log(NewsPrepService);
        function refreshNewss() {
            blockUI.start("Loading...");

            var k = NewsResource.getAllCategories({ page: vm.currentPage }).$promise.then(function (results) {
                $scope.NewsList = results;

                console.log($scope.NewsList);
                blockUI.stop();

            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }
        function change(category, isDeleted) {
            var updateObj = new NewsResource();
            updateObj.NewsId = category.categoryId;
            if (!isDeleted)
                updateObj.status = (category.status == true ? false : true);
            updateObj.isDeleted = category.isDeleted;

            updateObj.$update().then(
                function (data, status) {
                    if (isDeleted)
                        refreshNewss();

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    category.status = updateObj.status;

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );

        }
        vm.UpdateNews = function (category) {
            change(category, false);
        }

        function confirmationDelete(model) {

                        var updateObj = new NewsResource();
            updateObj.id = model.id;
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
              updateObj.categoryId = model.categoryId;
              updateObj.status = (model.isActive == true ? false : true);
              updateObj.$changeStatus({ categoryId: updateObj.categoryId, status: updateObj.status }).then(
                  function (data, status) {
                    refreshNewss();
                      ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                      updateObj.status = model.isActive;
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
            getAllCategories: { method: 'POST', url: appCONSTANTS.API_URL + 'news/search', useToken: true, params: { lang: '@lang' }  },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'News/UpdateNews', useToken: true },
            getNews: { method: 'GET', url: appCONSTANTS.API_URL + 'News/GetNewsById/:id', useToken: true },
            delete: { method: 'DELETE', url: appCONSTANTS.API_URL + 'News/DeleteNews/:id', useToken: true }, 
            getAllActiveCategories: { method: 'GET', url: appCONSTANTS.API_URL + 'News/GetallActivateCategories', useToken: true, isArray:true},
            changeStatus: { method: 'POST', url: appCONSTANTS.API_URL + 'News/ChangeNewsStatus/:NewsId/:status', useToken: true },

        })
    }

}());
(function () {
    'use strict';

    angular
        .module('home')
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
          debugger;
            var splitImage = $rootScope.image.split(',');
            blockUI.start("Loading...");
            var newObj = new NewsResource();
            newObj.Title = vm.titleDictionary;
            newObj.Image = splitImage[1];
            newObj.imageContentType = $rootScope.imageType;
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

    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('editCategoryDialogController', ['$rootScope','$scope','blockUI', '$filter', '$http', '$state', 'appCONSTANTS', '$translate',
            'CategoryResource', 'ToastService', 'CategoryByIdPrepService', editCategoryDialogController])

    function editCategoryDialogController($rootScope,$scope,blockUI, $filter, $http, $state, appCONSTANTS, $translate, CategoryResource,
        ToastService, CategoryByIdPrepService) {
        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.Category = CategoryByIdPrepService;
        $rootScope.image = appCONSTANTS.Image_URL_ORDER + vm.Category.image;

        vm.Close = function () {
            $state.go('Category');
        }
        vm.UpdateCategory = function () {
            var splitImage = $rootScope.image.split(',');
            blockUI.start("Loading...");

                        var updateObj = new CategoryResource();
            updateObj.CategoryId = vm.Category.id;
            updateObj.titles = vm.Category.titles;  
            if ($rootScope.imageType != null) {
                updateObj.image = splitImage[1];
                updateObj.imageContentType = $rootScope.imageType;
            }
            updateObj.$update().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    blockUI.stop();

                    $state.go('Category');

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
        .controller('ProductController', ['blockUI', '$translate', '$uibModal', 'appCONSTANTS', '$scope', 'ProductResource', 'ProductPrepService',
            'ToastService', ProductController]);


    function ProductController(blockUI, $translate, $uibModal, appCONSTANTS, $scope, ProductResource, ProductPrepService, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[7].children[0]).addClass("active")

        blockUI.start("Loading...");

        var vm = this;
        vm.appCONSTANTS = appCONSTANTS;
        $scope.totalCount = ProductPrepService.totalCount;
        $scope.Products = ProductPrepService;
        console.log($scope.Products)



        function confirmationDelete(model) {

                        var updateObj = new ProductResource();
            updateObj.id = model.productId;
            updateObj.$delete({ id: model.productId }).then(
                function (data, status) {
                    if (data.isSuccsess) {
                        refreshProducts();
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('DeletedSuccessfully'), "success");
                    }
                    else {
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    }
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

        function refreshProducts() {
            blockUI.start("Loading...");
            var k = ProductResource.getAllProducts({ page: vm.currentPage }).$promise.then(function (results) {
                $scope.Products = results;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }
        vm.ChangeStatus = function (model) {

                        var updateObj = new ProductResource();
            updateObj.productId = model.productId;
            updateObj.status = (model.isActive == true ? false : true);
            updateObj.$changeStatus({ productId: model.productId, status: updateObj.status }).then(
                function (data, status) {
                    if (data.isSuccsess) {
                        refreshProducts();
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    } else {
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    }
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                }
            );
            return;
        }
        vm.filterProduct = function (description, page) {

                        refreshProduct(description, page);
            vm.description = "";
        }
        function refreshProduct(description, page) {
            blockUI.start("Loading...");
            var k = ProductResource.search({ Title: description, page: page }).$promise.then(function (results) {
                $scope.Products = results;
                $scope.totalCount = results.totalCount;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }

        vm.currentPage = 1;
        $scope.changePage = function (page) {
            vm.currentPage = page;
            refreshProducts();
        }
        blockUI.stop();

    }

})();(function () {
    angular
        .module('home')
        .factory('ProductResource', ['$resource', 'appCONSTANTS', ProductResource])

    function ProductResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Product/CreateProduct', {}, {
            getAllProducts: { method: 'GET', url: appCONSTANTS.API_URL + 'Product/GetAllProduct', useToken: true, params: { lang: '@lang' } },
            getAllActivateProduct: { method: 'GET', url: appCONSTANTS.API_URL + 'Product/GetAllActivateProduct', useToken: true, params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Product/UpdateProduct', useToken: true },
            delete: { method: 'DELETE', url: appCONSTANTS.API_URL + 'Product/DeleteProduct/:id', useToken: true },
            getProduct: { method: 'GET', url: appCONSTANTS.API_URL + 'Product/GetProductById/:id', useToken: true },
            generateNewProductCode: { method: 'GET', url: appCONSTANTS.API_URL + 'Product/GenerateNewProductCode', useToken: true },
            getProductDetails: { method: 'GET', url: appCONSTANTS.API_URL + 'Product/GetAllProductDetialsByProductId/:produdctId ', useToken: true },
            changeStatus: { method: 'POST', url: appCONSTANTS.API_URL + 'Product/ChangeProductStatus/:productId/:status', useToken: true },
            search: { method: 'GET', url: appCONSTANTS.API_URL + 'Product/ProdudctSearch', useToken: true },

            getAllSKUConversion: { method: 'GET', url: appCONSTANTS.API_URL + 'SKU/GetAllActivatedSKU ', useToken: true,isArray:true },
            createSKUConversion: { method: 'POST', url: appCONSTANTS.API_URL + 'Product/CreateProductDetial', useToken: true },
            updateSKUConversion: { method: 'POST', url: appCONSTANTS.API_URL + 'Product/UpdateProductDetails', useToken: true },

        })
    }

}());
(function () {
    'use strict';

    angular
        .module('home')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('Products', {
                    url: '/Product',
                    templateUrl: './app/GlobalAdmin/Product/templates/Product.html',
                    controller: 'ProductController',
                    'controllerAs': 'ProductCtrl',
                    resolve: {
                        ProductPrepService: ProductPrepService
                    },
                    data: {
                        permissions: {
                            only: ['3'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('newProduct', {
                    url: '/newProduct',
                    templateUrl: './app/GlobalAdmin/Product/templates/new.html',
                    controller: 'createProductDialogController',
                    'controllerAs': 'newProductCtrl',
                    resolve: {
                        CategoryPrepService: CategoryPrepService,
                        ProductNewCodePrepService: ProductNewCodePrepService
                    },
                    data: {
                        permissions: {
                            only: ['3'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editProduct', {
                    url: '/editProduct/:id',
                    templateUrl: './app/GlobalAdmin/Product/templates/edit.html',
                    controller: 'editProductDialogController',
                    'controllerAs': 'editProductCtrl',
                    resolve: {
                        CategoryPrepService: CategoryPrepService,
                        ProductByIdPrepService: ProductByIdPrepService
                    },
                    data: {
                        permissions: {
                            only: ['3'],
                            redirectTo: 'root'
                        }
                    }

                })

                .state('ProductDetails', {
                    url: '/ProductDetails/:produdctId',
                    templateUrl: './app/GlobalAdmin/Product/templates/ProductDetails.html',
                    controller: 'ProductDetailsController',
                    'controllerAs': 'ProductDetailsCtrl',
                    resolve: {
                        ProductDetaqilsByProductIdPrepService: ProductDetaqilsByProductIdPrepService,
                        ProductInfoByIdPrepService: ProductInfoByIdPrepService
                    },
                    data: {
                        permissions: {
                            only: ['3'],
                            redirectTo: 'root'
                        }
                    }

                })

                .state('newProductDetails', {
                    url: '/newProductDetails/:produdctId',
                    templateUrl: './app/GlobalAdmin/Product/templates/NewProductDetailsDialog.html',
                    controller: 'createProductDetailsDialog',
                    'controllerAs': 'createProductDetailsDialoglCtrl',
                    resolve: {
                        SKUConversionPrepService: SKUConversionPrepService
                    },
                    data: {
                        permissions: {
                            only: ['3'],
                            redirectTo: 'root'
                        }
                    }

                })
        });

    ProductPrepService.$inject = ['ProductResource']
    function ProductPrepService(ProductResource) {
        return ProductResource.getAllProducts().$promise;
    }

    ProductByIdPrepService.$inject = ['ProductResource', '$stateParams']
    function ProductByIdPrepService(ProductResource, $stateParams) {
        return ProductResource.getProduct({ id: $stateParams.id }).$promise;
    }
    ProductInfoByIdPrepService.$inject = ['ProductResource', '$stateParams']
    function ProductInfoByIdPrepService(ProductResource, $stateParams) {
        return ProductResource.getProduct({ id: $stateParams.produdctId }).$promise;
    }

    ProductDetaqilsByProductIdPrepService.$inject = ['ProductResource', '$stateParams']
    function ProductDetaqilsByProductIdPrepService(ProductResource, $stateParams) {
        return ProductResource.getProductDetails({ produdctId: $stateParams.produdctId }).$promise;
    }

    ProductNewCodePrepService.$inject = ['ProductResource', '$stateParams']
    function ProductNewCodePrepService(ProductResource, $stateParams) {
        return ProductResource.generateNewProductCode().$promise;
    }

    SKUConversionPrepService.$inject = ['ProductResource']
    function SKUConversionPrepService(ProductResource) {
        return ProductResource.getAllSKUConversion().$promise;
    }
    ProductPrepService.$inject = ['ProductResource']
    function ProductPrepService(ProductResource) {
        return ProductResource.search().$promise;
    }

    CategoryPrepService.$inject = ['CategoryResource']
    function CategoryPrepService(CategoryResource) {
        return CategoryResource.getAllActiveCategories().$promise;
    }

}());

(function () {
    'use strict';

    angular
        .module('home')
        .controller('ProductDetailsController', ['blockUI', '$uibModal', 'appCONSTANTS', '$scope','ProductInfoByIdPrepService', 'ProductResource', 'ProductDetaqilsByProductIdPrepService',
            'ToastService', ProductDetailsController]);


    function ProductDetailsController(blockUI, $uibModal, appCONSTANTS, $scope,ProductInfoByIdPrepService, ProductResource, ProductDetaqilsByProductIdPrepService, ToastService) {


              $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[7].children[0]).addClass("active")

        blockUI.start("Loading...");

        var vm = this;
        vm.appCONSTANTS = appCONSTANTS;
        $scope.totalCount = ProductDetaqilsByProductIdPrepService.totalCount;
        $scope.ProductDetails = ProductDetaqilsByProductIdPrepService;
        $scope.Product = ProductInfoByIdPrepService;

              var k = ProductResource.getAllSKUConversion().$promise.then(function (results) {

              vm.SKUConversion = results;
        blockUI.stop();
    },
        function (data, status) {
            blockUI.stop();
            ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
        });


        blockUI.stop();
        vm.openProductDetails = function (model) {

                        blockUI.start("Loading...");
            var modalContent = $uibModal.open({
                templateUrl: './app/GlobalAdmin/Product/templates/ProductDetailsDialog.html',
                controller: 'ProductDetailsDialogController',
                controllerAs: 'ProductDetailsDialoglCtrl',
                resolve: {
                    model: function () { return model },
                    SKUConversion: function () { return vm.SKUConversion },
                    callBackFunction: function () { return confirmationDelete }
                }

            });
        }

        function getAllSKUConversion() {
            var k = ProductResource.getAllSKUConversion().$promise.then(function (results) {
                console.log("sku", results.results)
                vm.SKUConversion = results.results;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }
        function confirmationDelete() {
            alert("sdsd");
        }

    }

})();
(function () {
	'use strict';
	angular
		.module('home')
		.controller('ProductDetailsDialogController', ['$uibModalInstance', 'ToastService', '$translate', '$state', '$stateParams', '$filter', 'SKUConversion', 'blockUI', '$localStorage', '$scope', 'ProductResource', 'model', 'callBackFunction', ProductDetailsDialogController])

	function ProductDetailsDialogController($uibModalInstance, ToastService, $translate, $state, $stateParams, $filter, SKUConversion, blockUI, $localStorage, $scope, ProductResource, model, callBackFunction) {
		var vm = this;
		vm.model = model;
		vm.close = function () {
			$uibModalInstance.dismiss();
		}
		$scope.selectedLanguage = $localStorage.language;
		vm.Confirm = function () {
			callBackFunction(model);
			$uibModalInstance.dismiss();
		}

				vm.SKUConversion = SKUConversion;

		var index = vm.SKUConversion.indexOf($filter('filter')(vm.SKUConversion, { 'skuId': vm.model.priceList[0].skuId }, true)[0]);
		vm.selectedskuId = vm.SKUConversion[index].skuId;
		blockUI.stop();


		$scope.dateIsValid = false;
		$scope.dateChange = function () {

						if ($('#startdate').data('date') == null || $('#startdate').data('date') == "") {
				$scope.dateIsValid = false;
			} else if ($scope.editProductDetailsForm.$valid) {
				$scope.dateIsValid = true;
			}
		}

		vm.UpdateSKUConversion = function () {
			blockUI.start("Loading...");

						vm.data = {
				"productDetialsId": vm.model.productDetailsId,
				"barCode": vm.model.barCode,
				"minorderQty": vm.model.minorderQty,
				"blockOnDate": $('#startdate').val(),
				"isPormotedAllow": vm.model.isPormotedAllow,
				"isActive": vm.model.isActive,
				"priceList": [{
					"skuId": vm.selectedskuId,
					"price": vm.model.priceList[0].price
				}]

			}
			var updateObj = new ProductResource();
			updateObj.productId = $stateParams.produdctId;
			updateObj.data = vm.data;
			updateObj.$updateSKUConversion().then(
				function (data, status) {
					blockUI.stop();

										if (data.isSuccsess) {
						model.blockOnDate = $('#startdate').val();
						vm.model.priceList[0].skuId = vm.selectedskuId;
						$uibModalInstance.dismiss();
						ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
					}
					else {
						ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
					}

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
		.controller('createProductDetailsDialog', ['ToastService', '$translate', '$state', '$stateParams', '$filter', 'SKUConversionPrepService', 'blockUI', '$localStorage', '$scope', 'ProductResource', createProductDetailsDialog])

	function createProductDetailsDialog(ToastService, $translate, $state, $stateParams, $filter, SKUConversionPrepService, blockUI, $localStorage, $scope, ProductResource) {
		var vm = this;
		vm.selectedskuId = 0;
		vm.minQty = 0;
		vm.price = 1;
		vm.close = function () {
			$state.go('ProductDetails', { produdctId: $stateParams.produdctId });
		}
		$scope.selectedLanguage = $localStorage.language;
		vm.Confirm = function () {
		}
		debugger
		vm.SKUConversion = SKUConversionPrepService;

		blockUI.stop();


		$scope.dateIsValid = false;
		$scope.dateChange = function () {

						if ($('#startdate').data('date') == null || $('#startdate').data('date') == "") {
				$scope.dateIsValid = false;
			} else if ($scope.addProductDetailsForm.$valid) {
				$scope.dateIsValid = true;
			}
		}

		vm.AddSKUConversion = function () {
			blockUI.start("Loading...");
			if (vm.price <= 0) {
				ToastService.show("right", "bottom", "fadeInUp", $translate.instant('mustisertpricevalue'),"error");
				blockUI.stop();
				return;
			}
			vm.data = {
				"barCode": vm.barCode,
				"minorderQty": vm.minQty,
				"blockOnDate": $('#startdate').val(),
				"isPormotedAllow": vm.isPormotedAllow,
				"isActive": vm.status,
				"priceList": [{
					"skuId": vm.selectedskuId,
					"price": vm.price
				}]

			}
			var createObj = new ProductResource();
			createObj.productId = $stateParams.produdctId;
			createObj.data = vm.data;
			createObj.$createSKUConversion().then(
				function (data, status) {
					blockUI.stop();

										if (data.isSuccsess) {
						ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
						$state.go('ProductDetails', { produdctId: $stateParams.produdctId });
					}
					else {
						ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
					}

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
        .controller('createProductDialogController', ['blockUI', '$rootScope', '$state', 'appCONSTANTS', '$translate',
            'ProductResource', 'ProductNewCodePrepService', 'CategoryPrepService', 'ToastService', createProductDialogController])

    function createProductDialogController(blockUI, $rootScope, $state, appCONSTANTS, $translate, ProductResource,
        ProductNewCodePrepService, CategoryPrepService, ToastService) {

        blockUI.start("Loading...");
        var vm = this;
        $rootScope.image = null;
        vm.language = appCONSTANTS.supportedLanguage;
        if (CategoryPrepService == null)
            ToastService.show("right", "bottom", "fadeInUp", $translate.instant('NoCategorysAvailable'), "success");

        vm.categories = CategoryPrepService;

        vm.selectedCategoryId = 0;
        vm.code = ProductNewCodePrepService.id;

        vm.AddNewProduct = function () {


                        var splitImage = $rootScope.image.split(',');
            blockUI.start("Loading...");
            var newObj = new ProductResource();
            newObj.code = vm.code;
            newObj.categoryId = vm.selectedCategoryId;
            newObj.description = vm.description;
            newObj.image = splitImage[1];
            newObj.imageContentType = $rootScope.imageType;
            newObj.$create().then(
                function (data, status) {
                    blockUI.stop();
                    if (data.isSuccsess) {
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                        $state.go('Products');
                    }
                    else {
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    }
                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        blockUI.stop();
        vm.close = function () {
            $state.go('Products');
        }

    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('editProductDialogController', ['$rootScope', '$filter', 'blockUI', 'CategoryPrepService', '$state', 'appCONSTANTS', '$translate', 'ProductResource', 'ToastService',
            'ProductByIdPrepService', editProductDialogController])

    function editProductDialogController($rootScope, $filter, blockUI, CategoryPrepService, $state, appCONSTANTS, $translate, ProductResource, ToastService, ProductByIdPrepService) {
        blockUI.start("Loading...");

        var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.Product = ProductByIdPrepService;
        vm.categories = CategoryPrepService;

        $rootScope.image = appCONSTANTS.Image_URL_ORDER + vm.Product.image;

        var indexRate = vm.categories.indexOf($filter('filter')(vm.categories, { 'id': vm.Product.category.id }, true)[0]);
        vm.selectedCategoryId = vm.categories[indexRate].id;



        vm.UpdateProduct = function () {
            blockUI.start("Loading...");
            var splitImage = $rootScope.image.split(',');

            var updateObj = new ProductResource();
            updateObj.code = vm.Product.code;
            updateObj.productId = vm.Product.productId;
            updateObj.categoryId = vm.selectedCategoryId;
            updateObj.description = vm.Product.description;
            if ($rootScope.imageType != null) {
                updateObj.image = splitImage[1];
                updateObj.imageContentType = $rootScope.imageType;
            }



            updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();
                    if (data.isSuccsess) {
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                        $state.go('Products');
                    }
                    else {
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    }

                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        blockUI.stop();
        vm.Close = function () {
            $state.go('Products');
        }
    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('OrderIooController', ['blockUI', '$translate', '$uibModal', 'appCONSTANTS', '$scope', 'OrderResource',
            'ToastService', OrderIooController]);

    function OrderIooController(blockUI, $translate, $uibModal, appCONSTANTS, $scope, OrderResource, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[4].children[0]).addClass("active")

        blockUI.start("Loading...");

        var vm = this;
        refreshOrders();
        vm.filterOrder = function (all) {

            if (all) { 
                vm.searchBasket = "";
                vm.searchRetailer = "";
                vm.searchOrder = "";
                vm.from = "";
                vm.to = "";
            }
            filterBasket();
        }

        function filterBasket() {
            blockUI.start("Loading...");
            var k = OrderResource.getFilterBaskets({ retailerTitle: vm.searchRetailer, orderNo: vm.searchOrder, basketNo: vm.searchBasket, from: vm.from, to: vm.to, page: vm.currentPage }).$promise.then(function (results) {
                vm.Orders = results.results;
                vm.totalCount = results.totalCount;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();

                                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }

        function refreshOrders() {
            blockUI.start("Loading...");
            var k = OrderResource.getAllBasketsBy({ page: vm.currentPage }).$promise.then(function (results) {
                vm.Orders = results.results;
                vm.totalCount = results.totalCount;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }
        vm.ChangeStatus = function (model) {

                        var updateObj = new OrderResource();
            updateObj.OrderId = model.OrderId;
            updateObj.status = (model.isActive == true ? false : true);
            updateObj.$changeStatus({ OrderId: model.OrderId, status: updateObj.status }).then(
                function (data, status) {
                    refreshOrders();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    updateObj.status = model.isActive;
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                }
            );
            return;
        }
        vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshOrders();
        }
        blockUI.stop();

        vm.dateIsValid = false;
        $scope.dateFromChange = function () {
            if ($('#startdate').data('date') == null || $('#startdate').data('date') == "") {
                vm.dateIsValid = false;
            }
            else {

                                vm.from = $('#startdate').data('date');
                $scope.$apply();
            }
        }

        $scope.dateToChange = function () {
            if ($('#enddate').data('date') == null || $('#enddate').data('date') == "") {
                vm.dateIsValid = false;
            }
            else {

                                vm.to = $('#enddate').data('date');
                $scope.$apply();
            }
        }
        vm.showMore = function (element) {
            $(element.currentTarget).toggleClass("child-table-collapse");
        }
    }

})();
(function () {
    angular
        .module('home')
        .factory('OrderResource', ['$resource', 'appCONSTANTS', OrderResource])

    function OrderResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Order/CreateOrder', {}, {
            getAllOrdersBy: { method: 'GET', url: appCONSTANTS.API_URL + 'Order/GetOrders', useToken: true },
            getAllBasketsBy: { method: 'GET', url: appCONSTANTS.API_URL + 'Order/GetBaskets', useToken: true },
            getFilterBaskets: { method: 'GET', url: appCONSTANTS.API_URL + 'Order/GetBasketsOperation', useToken: true },
            getOrder: { method: 'GET', url: appCONSTANTS.API_URL + 'Order/GetOrderById/:id', useToken: true },
            getOrderDetails: { method: 'GET', url: appCONSTANTS.API_URL + 'Order/GetOrderDetails/:orderId ', useToken: true },
            getOrderById: { method: 'GET', url: appCONSTANTS.API_URL + 'Order/GetOrderById/:orderId ', useToken: true },
            changeStatusOpen: { method: 'POST', url: appCONSTANTS.API_URL + 'Order/Open/:orderId', useToken: true },
            forwordFor: { method: 'POST', url: appCONSTANTS.API_URL + 'Order/ForwordFor/:orderItemIds', useToken: true },
            cancelFor: { method: 'POST', url: appCONSTANTS.API_URL + 'Order/CancelFor/:orderItemIds', useToken: true },
        })
    }

}());
(function () {
    'use strict';

    angular
        .module('home')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('OrdersIoo', {
                    url: '/Order',
                    templateUrl: './app/GlobalAdmin/Order/templates/IooOrder.html',
                    controller: 'OrderIooController',
                    'controllerAs': 'OrderIooCtrl',
                    resolve: {
                    },
                    data: {
                        permissions: {
                            only: ['23'],
                            redirectTo: 'root'
                        }
                    }

                })

                .state('OrdersM', {
                    url: '/OrderM',
                    templateUrl: './app/GlobalAdmin/Order/templates/mOrder.html',
                    controller: 'OrderMController',
                    'controllerAs': 'OrderMCtrl', 
                    data: {
                        permissions: {
                            only: ['24'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('OrderDetails', {
                    url: '/OrderDetails/:orderId',
                    templateUrl: './app/GlobalAdmin/Order/templates/OrderDetails.html',
                    controller: 'OrderDetailsController',
                    'controllerAs': 'OrderDetailsCtrl',
                    resolve: {
                        OrderDetaqilsByOrderIdPrepService: OrderDetaqilsByOrderIdPrepService
                    },
                    data: {
                        permissions: {
                            only: ['23'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('OrderDetailsByTenant', {
                    url: '/OrderMDetails/:orderId',
                    templateUrl: './app/GlobalAdmin/Order/templates/OrderDetailsByTenant.html',
                    controller: 'OrderDetailsByTenantController',
                    'controllerAs': 'OrderDetailsByTenantCtrl',
                    resolve: {
                        OrderDetaqilsByOrderIdPrepService: OrderDetaqilsByOrderIdPrepService
                    },
                    data: {
                        permissions: {
                            only: ['24'],
                            redirectTo: 'root'
                        }
                    }

                })

         });


     OrderDetaqilsByOrderIdPrepService.$inject = ['OrderResource', '$stateParams']
    function OrderDetaqilsByOrderIdPrepService(OrderResource, $stateParams) {
        return OrderResource.getOrderDetails({ orderId: $stateParams.orderId }).$promise;
    }

 }());

(function () {
    'use strict';

    angular
        .module('home')
        .controller('OrderDetailsController', ['blockUI', '$stateParams', 'appCONSTANTS', '$scope', 'OrderResource', 'OrderDetaqilsByOrderIdPrepService',
            'ToastService', OrderDetailsController]);


    function OrderDetailsController(blockUI, $stateParams, appCONSTANTS, $scope, OrderResource, OrderDetaqilsByOrderIdPrepService, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[4].children[0]).addClass("active")

        blockUI.start("Loading...");

        var vm = this;
        vm.appCONSTANTS = appCONSTANTS;
        vm.totalCount = OrderDetaqilsByOrderIdPrepService.totalCount;
        vm.OrderDetails = OrderDetaqilsByOrderIdPrepService;
        vm.listSelected = [];
        console.log(vm.OrderDetails);
        getOrderById();
        function getOrderById() {
            blockUI.start("Loading...");
            var k = OrderResource.getOrderById({ orderId: $stateParams.orderId }).$promise.then(function (results) {

                vm.order = results;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }
        function getOrderDetailsById() {
            blockUI.start("Loading...");
            var k = OrderResource.getOrderDetails({ orderId: $stateParams.orderId }).$promise.then(function (results) {

                vm.totalCount = results.totalCount;
                vm.OrderDetails = results.results;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }
        blockUI.stop();
        vm.forwardSelected = function () {
            blockUI.start("Loading...");
            var updateObj = new OrderResource();
            updateObj.orderItemIds = vm.listSelected;
            updateObj.$forwordFor().then(
                function (data, status) {
                    blockUI.stop();

                                        if (data.isSuccsess) {
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                        vm.listSelected = [];
                        getOrderDetailsById();
                    }
                    else {
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    }
                    blockUI.stop();

                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                }
            ); 
        }
        vm.refreshOrder = function () {

                        getOrderById();
        }
        vm.cancelSelected = function () {
            blockUI.start("Loading...");
            var updateObj = new OrderResource();
            updateObj.orderItemIds = vm.listSelected;
            updateObj.$cancelFor().then(
                function (data, status) {

                                        if (data.isSuccsess) {
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                        vm.listSelected = [];
                        getOrderDetailsById();
                    }
                    else {
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    }
                    blockUI.stop();

                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                }
            );
        }

        vm.toggleSelection = function toggleSelection(order) {
            var idx = vm.listSelected.indexOf(order);
            if (idx > -1) {
                vm.listSelected.splice(idx, 1);
            }
            else {
                vm.listSelected.push(order);
            }
        };


    }

})();

(function () {
    'use strict';

    angular
        .module('home')
        .controller('OrderDetailsByTenantController', ['blockUI', '$translate', '$uibModal', 'appCONSTANTS', '$stateParams', 'OrderResource', 'OrderDetaqilsByOrderIdPrepService',
            'ToastService', OrderDetailsByTenantController]);


    function OrderDetailsByTenantController(blockUI, $translate, $uibModal, appCONSTANTS, $stateParams, OrderResource, OrderDetaqilsByOrderIdPrepService, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[4].children[0]).addClass("active")

        blockUI.start("Loading...");

        var vm = this;
        vm.appCONSTANTS = appCONSTANTS;
        vm.totalCount = OrderDetaqilsByOrderIdPrepService.totalCount;
        vm.OrderDetails = OrderDetaqilsByOrderIdPrepService.results;
        vm.listSelected = [];
        getOrderById();
        function getOrderById() {
            blockUI.start("Loading...");
            var k = OrderResource.getOrderById({ orderId: $stateParams.orderId }).$promise.then(function (results) {

                vm.order = results;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }
        function getOrderDetailsById() {
            blockUI.start("Loading...");
            var k = OrderResource.getOrderDetails({ orderId: $stateParams.orderId }).$promise.then(function (results) {

                vm.totalCount = results.totalCount;
                vm.OrderDetails = results.results;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }
        blockUI.stop();
        vm.forwardSelected = function () {
            blockUI.start("Loading...");
            var updateObj = new OrderResource();
            updateObj.orderItemIds = vm.listSelected;
            updateObj.$forwordFor().then(
                function (data, status) {
                    blockUI.stop();

                                        if (data.isSuccsess) {
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                        vm.listSelected = [];
                        getOrderDetailsById();
                    }
                    else {
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    }
                    blockUI.stop();

                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                }
            );


        }
        vm.cancelSelected = function () {
            blockUI.start("Loading...");
            var updateObj = new OrderResource();
            updateObj.orderItemIds = vm.listSelected;
            updateObj.$cancelFor().then(
                function (data, status) {

                                        if (data.isSuccsess) {
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                        vm.listSelected = [];
                        getOrderDetailsById();
                    }
                    else {
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    }
                    blockUI.stop();

                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                }
            );
        }

        vm.toggleSelection = function toggleSelection(order) {
            var idx = vm.listSelected.indexOf(order);
            if (idx > -1) {
                vm.listSelected.splice(idx, 1);
            }
            else {
                vm.listSelected.push(order);
            }
        };
        vm.refreshDetails = function () {
            getOrderDetailsById();
        }
    }

})();
(function () {
    'use strict';

    angular
        .module('home')
        .controller('OrderMController', ['blockUI', 'appCONSTANTS', '$scope', '$interval', 'OrderResource', '$state', 'ToastService', OrderMController]);

    function OrderMController(blockUI, appCONSTANTS, $scope, $interval, OrderResource, $state, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[4].children[0]).addClass("active")

        blockUI.start("Loading...");
        var vm = this;
        vm.connectionId = 0;
        vm.connection = new signalR.HubConnectionBuilder().withUrl(appCONSTANTS.SIGNAL_URL + "newOrder").build();

        vm.connection.on("NewOrder", function () {
            refreshOrders();
            return console.log(vm.connection);
        });

        vm.connection.on("RefreshOrder", function () {
            refreshOrders();
            return console.log(vm.connection);
        });

        vm.connection.start().then(function () {

            console.log(vm.connection);

        }).catch(function (err) {
            return console.error(err.toString());
        });

        vm.appCONSTANTS = appCONSTANTS;
        refreshOrders();
        $scope.openOrder = function (orderId) {
            blockUI.start("Loading...");


                        vm.connection.invoke('getConnectionId')
                .then(function (connectionId) {

                                        vm.connectionId = connectionId;
                    vm.connection.invoke('refresh'); 
                });


            var updateObj = new OrderResource();
            updateObj.orderId = orderId;
            updateObj.$changeStatusOpen({ orderId: orderId }).then(
                function (data, status) {
                    blockUI.stop();
                    $state.go('OrderDetailsByTenant', { orderId: orderId });
                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                }
            );
        }
        function refreshOrders() {
            blockUI.start("Loading...");
            var k = OrderResource.getAllOrdersBy({ page: vm.currentPage }).$promise.then(function (results) {
                vm.Orders = results.results;
                vm.totalCount = results.totalCount;
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
            refreshOrders();
        }
        blockUI.stop();
        $scope.checkAll = function () {
            if (!$scope.selectedAll) {
                $scope.selectedAll = true;
            } else {
                $scope.selectedAll = false;
            }
        }
    }

})();
(function () {
    'use strict';

    angular
        .module('home')
        .controller('RegionController', ['$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'RegionResource', 'RegionsPrepService',  '$stateParams', 'appCONSTANTS',
            'ToastService','CountryByIdPrepService', RegionController]);


    function RegionController($rootScope, blockUI, $scope, $filter, $translate,
        $state, RegionResource, RegionsPrepService, $stateParams, appCONSTANTS, ToastService,CountryByIdPrepService) { 


        blockUI.start("Loading..."); 

                    var Manufacture = this;
        $scope.totalCount = RegionsPrepService.totalCount;
        $scope.Regions  = RegionsPrepService;
        $scope.countryName = CountryByIdPrepService.titles[$scope.selectedLanguage];
        function refreshRegions() {

            blockUI.start("Loading..."); 

                        var k = RegionResource.getAllRegions({countryId: $stateParams.countryId ,page:Manufacture.currentPage}).$promise.then(function (results) { 
                $scope.Regions = results  
                blockUI.stop();

                            },
            function (data, status) {
                blockUI.stop();

                                ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
            });
        }

                Manufacture.currentPage = 1;
        $scope.changePage = function (page) {
            Manufacture.currentPage = page;
            refreshRegions();
        }
        blockUI.stop();

            }

})();
(function () {
    angular
      .module('home')
        .factory('RegionResource', ['$resource', 'appCONSTANTS', RegionResource]) 

    function RegionResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Regions/', {}, {
            getAllRegions: { method: 'GET', url: appCONSTANTS.API_URL + 'Countries/:countryId/Regions', useToken: true,  params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Regions/EditRegion', useToken: true },
            getRegion: { method: 'GET', url: appCONSTANTS.API_URL + 'Regions/:regionId', useToken: true },
            getAllRegionsForUser: { method: 'GET', url: appCONSTANTS.API_URL + 'Users/:userId/Regions', useToken: true, isArray:true }

                    })
    } 

}());
(function () {
    'use strict';

    angular
        .module('home')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('Regions', {
                    url: '/Country/:countryId/Region',
                    templateUrl: './app/GlobalAdmin/Region/templates/Regions.html',
                    controller: 'RegionController',
                    'controllerAs': 'RegionCtrl',
                    resolve: {
                        RegionsPrepService: RegionsPrepService,
                        CountryByIdPrepService: CountryByIdPrepService                        
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    },
                    ncyBreadcrumb: {
                        label: '{{countryName}}'
                    }
                })
                .state('newRegion', {
                    url: '/Country/:countryId/newRegion',
                    templateUrl: './app/GlobalAdmin/Region/templates/new.html',
                    controller: 'createRegionDialogController',
                    'controllerAs': 'newRegionCtrl',
                    resolve: {
                        CountryByIdPrepService: CountryByIdPrepService                        
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    },
                    ncyBreadcrumb: {
                        label: '{{countryName}}'
                    }

                })
                .state('editRegion', {
                    url: '/Country/:countryId/editRegion/:regionId',
                    templateUrl: './app/GlobalAdmin/Region/templates/edit.html',
                    controller: 'editRegionDialogController',
                    'controllerAs': 'editRegionCtrl',
                    resolve: {
                        RegionByIdPrepService: RegionByIdPrepService,
                        CountryByIdPrepService: CountryByIdPrepService                        
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    },
                    ncyBreadcrumb: {
                        label: '{{countryName}}'
                    }

                })
        });

    RegionsPrepService.$inject = ['RegionResource', '$stateParams']
    function RegionsPrepService(RegionResource, $stateParams) {
        return RegionResource.getAllRegions({ countryId: $stateParams.countryId }).$promise;
    }

    RegionByIdPrepService.$inject = ['RegionResource', '$stateParams']
    function RegionByIdPrepService(RegionResource, $stateParams) {
        return RegionResource.getRegion({ regionId: $stateParams.regionId }).$promise;
    }
    CountryByIdPrepService.$inject = ['CountryResource', '$stateParams']
    function CountryByIdPrepService(CountryResource, $stateParams) {
        return CountryResource.getCountry({ countryId: $stateParams.countryId }).$promise;
    }

}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('createRegionDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate',
            'RegionResource', 'ToastService', '$stateParams', 'CountryByIdPrepService', createRegionDialogController])

    function createRegionDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, RegionResource,
        ToastService, $stateParams, CountryByIdPrepService) {

        blockUI.start("Loading...");

        var Manufacture = this;
        Manufacture.language = appCONSTANTS.supportedLanguage;
        $scope.countryName = CountryByIdPrepService.titles[$scope.selectedLanguage];

        Manufacture.close = function () {
            $state.go('Regions', { countryId: $stateParams.countryId });
        }

        Manufacture.AddNewRegion = function () {
            blockUI.start("Loading...");

            var newObj = new RegionResource();
            newObj.countryId = $stateParams.countryId;
            newObj.titles = Manufacture.titles;
            newObj.IsDeleted = false;
            newObj.IsStatic = false;
            newObj.$create().then(
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                    $state.go('Regions', { countryId: $stateParams.countryId }, { reload: true });


                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        blockUI.stop();

    }
}());
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('editRegionDialogController', ['$scope', 'blockUI', '$http', '$state', 'appCONSTANTS', '$translate', 'RegionResource', 'ToastService',
            'RegionByIdPrepService','$stateParams','CountryByIdPrepService', editRegionDialogController])

    function editRegionDialogController($scope, blockUI, $http, $state, appCONSTANTS, $translate, RegionResource, ToastService, 
        RegionByIdPrepService,$stateParams,CountryByIdPrepService) {
        blockUI.start("Loading..."); 

                var Manufacture = this; 
		Manufacture.language = appCONSTANTS.supportedLanguage;
        Manufacture.Region = RegionByIdPrepService; 
        $scope.countryName = CountryByIdPrepService.titles[$scope.selectedLanguage];

                Manufacture.Close = function () {
            $state.go('Regions',{countryId: $stateParams.countryId });
        }
        Manufacture.UpdateRegion  = function () { 
            blockUI.start("Loading..."); 

                        var updateObj = new RegionResource();
            updateObj.regionId = Manufacture.Region.regionId;
            updateObj.countryId= $stateParams.countryId;
            updateObj.titles = Manufacture.Region.titles;
		    updateObj.IsDeleted = false;
		    updateObj.IsStatic = false;
		    updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();

                                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");

                     $state.go('Regions',{countryId: $stateParams.countryId },{ reload: true });

                },
                function (data, status) {
                    blockUI.stop();

                                        ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        blockUI.stop();

        	}	
}());
(function () {
    'use strict';
    angular
        .module('home')
        .controller('RetailerController', ['RetailersPrepService','appCONSTANTS', '$scope','$stateParams','$translate', 'RetailerResource',
            'blockUI', '$uibModal', 'RetailerPrepService',
            'ToastService', RetailerController]);

    function RetailerController(RetailersPrepService,appCONSTANTS,$scope,$stateParams, $translate, RetailerResource,
        blockUI, $uibModal, RetailerPrepService, ToastService) {
        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[10].children[0]).addClass("active")
        var vm = this;
        vm.currentPage = 1;
        vm.appCONSTANTS = appCONSTANTS;
        $scope.totalCount = RetailersPrepService.totalCount;
        vm.RetailerList = RetailerPrepService;

        console.log("R", RetailerPrepService.results);

        function refreshRetailers() {
            blockUI.start("Loading...");
            var k = RetailerResource.getAllRetailers({ page: vm.currentPage }).$promise.then(function (results) {
                vm.RetailerList = results;
                console.log(vm.RetailerList);
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        } 
        vm.ChangeRetailerStatus = function (model) {


                        var updateObj = new RetailerResource();
            updateObj.retailerId = model.retailerId;
            updateObj.status = (model.isActive == true ? false : true);
            updateObj.$ChangeRetailer({ retailerId: model.retailerId, status: updateObj.status }).then(
                function (data, status) {
                    refreshRetailers();
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

                        var updateObj = new RetailerResource();
            updateObj.retailerId = model.retailerId;
            updateObj.$delete({ retailerId: model.retailerId }).then(
                function (data, status) {
                    refreshRetailers();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('DeletedSuccessfully'), "success");
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        vm.openDeleteDialog = function (model, name, retailerId) {
            var modalContent = $uibModal.open({
                templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
                controller: 'confirmDeleteDialogController',
                controllerAs: 'deleteDlCtrl',
                resolve: {
                    model: function () { return model },
                    itemName: function () { return name },
                    itemId: function () { return retailerId },
                    message: function () { return null },
                    callBackFunction: function () { return confirmationDelete }
                }

            });
        }


        vm.filterRetailer = function (name, page) {

                        refreshRetailer(name, page);
            vm.name = "";
          }
        function refreshRetailer(name, page) {
            blockUI.start("Loading...");
            var k = RetailerResource.search({name: name, page: page }).$promise.then(function (results) {
              vm.RetailerList = results;
              vm.totalCount = results.totalCount;
              blockUI.stop();
            },
              function (data, status) {
                blockUI.stop();
                ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
              });
          }

        $scope.changePage = function (page) {
             vm.currentPage = page;
            refreshRetailers();
        }
    }

})();
(function () {
    angular
        .module('home')
        .factory('RetailerResource', ['$resource', 'appCONSTANTS', RetailerResource])

    function RetailerResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL, {}, {
            create: { method: 'POST', url: appCONSTANTS.API_URL + 'Retailer/CreateRetailer', useToken: true, params: { lang: '@lang' } },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Retailer/UpdateRetailer', useToken: true},
            GenerateNewRetailerId: { method: 'GET', url: appCONSTANTS.API_URL + 'Retailer/GenerateRetailerCode', useToken: true },
            getAllRetailers: { method: 'GET', url: appCONSTANTS.API_URL + 'Retailer/GetAllRetailer', useToken: true, params: { lang: '@lang' } },
            delete: { method: 'DELETE', url: appCONSTANTS.API_URL + 'Retailer/DeleteRetailer/:retailerId', useToken: true },
            getRetailer: { method: 'GET', url: appCONSTANTS.API_URL + 'Retailer/GetRetailerById/:retailerId', useToken: true },
            ChangeRetailer: { method: 'POST', url: appCONSTANTS.API_URL + 'Retailer/ChangeRetailerStatus/:retailerId/:status', useToken: true },
            GetAllActiveRetailers: { method: 'GET', url: appCONSTANTS.API_URL + 'Retailer/GetAllActiveRetailer', useToken: true, isArray: true },
            search: { method: 'GET', url: appCONSTANTS.API_URL + 'Retailer/Search', useToken: true},


        })
    }

}());
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
            updateObj.companyLogo = "";
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

        function showArrays(event) {
            var vertices = this.getPath();

            var contentString = '<b>Bermuda Triangle polygon</b><br>' +
                'Clicked location: <br>' + event.latLng.lat() + ',' + event.latLng.lng() +
                '<br>';

            for (var i = 0; i < vertices.getLength(); i++) {
                var xy = vertices.getAt(i);
                contentString += '<br>' + 'Coordinate ' + i + ':<br>' + xy.lat() + ',' +
                    xy.lng();
            }
            infoWindow.setContent(contentString);
            infoWindow.setPosition(event.latLng);

            infoWindow.open(map);
        }
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


      map.addListener("click", function(event) {
        addMarker(event.latLng);
      });
      infoWindow = new google.maps.InfoWindow();
    }

    function showArrays(event) {
      var vertices = this.getPath();

      var contentString =
        "<b>Bermuda Triangle polygon</b><br>" + "Clicked location: <br>" + event.latLng.lat() + "," + event.latLng.lng() + "<br>";

      for (var i = 0; i < vertices.getLength(); i++) {
        var xy = vertices.getAt(i);
        contentString += "<br>" + "Coordinate " + i + ":<br>" + xy.lat() + "," + xy.lng();
      }

      infoWindow.setContent(contentString);
      infoWindow.setPosition(event.latLng);

      infoWindow.open(map);
    }

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
    vm.resetDLL = function() {
      vm.countries = [];
      vm.countries.push({ id: 0, titles: { "en-uk": "Select Country", "ar-eg": "اختار بلد" } });
      vm.selectedCountryId = 0;
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
      if (vm.selectedGovernrateId != undefined) {
        for (var i = vm.Governrates.length - 1; i >= 0; i--) {
          if (vm.Governrates[i].id == 0) {
            vm.Governrates.splice(i, 1);
          }
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
    vm.Contacts = [];
    vm.user = {};
    vm.companyLogo;
    vm.imageData;


    vm.openDeleteContactTypeDialog = function(e){
      vm.Retailer.retailerContactInformation.splice(e, 1);
   };
   vm.openDeleteContactTypeDialogContactList = function(e){
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
    vm.resetDLL = function () {
      vm.countries = [];
      vm.countries.push({ id: 0, titles: { "en-uk": "Select Country", "ar-eg": "اختار بلد" } });
      vm.selectedCountryId = 0;
      vm.countries = vm.countries.concat(CountriesPrepService.results)
      vm.Governrates = [];
      vm.cities = [];
      vm.categoryList = [];
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
        $($('.pmd-sidebar-nav').children()[2].children[0]).addClass("active")

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
            getAllRoles: { method: 'GET', url: appCONSTANTS.API_URL + 'Role/GetAllRoles', useToken: true },
            getAllActivateRoles: { method: 'GET', url: appCONSTANTS.API_URL + 'Roles/GetAllActivateRoles', useToken: true, params: { lang: '@lang' } },
            getAllPermissions: { method: 'GET', url: appCONSTANTS.API_URL + 'Role/PermessionTree', isArray: true, useToken: true, params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Role/UpdateRole', useToken: true },
            delete: { method: 'DELETE', url: appCONSTANTS.API_URL + 'Role/Delete/:roleId', useToken: true },
            getRole: { method: 'GET', url: appCONSTANTS.API_URL + 'Role/GetRoleById/:roleId', useToken: true },
            changeStatus: { method: 'POST', url: appCONSTANTS.API_URL + 'Role/ChangeStatus/:roleId/:status', useToken: true },

        })
    } 
}());

(function () {
    'use strict';

    angular
        .module('home')
        .controller('SKUController', ['$uibModal', '$rootScope', 'blockUI', '$scope', '$filter', '$translate',
            '$state', 'SKUResource', 'SKUPrepService', '$localStorage', 'appCONSTANTS',
            'ToastService', SKUController]);

    function SKUController($uibModal, $rootScope, blockUI, $scope, $filter, $translate,
        $state, SKUResource, SKUPrepService, $localStorage, appCONSTANTS, ToastService) {
        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[8].children[0]).addClass("active")

        blockUI.start("Loading...");
        var vm = this;
        $scope.totalCount = SKUPrepService.totalCount;
        $scope.SKUs = SKUPrepService.results;
        console.log($scope.SKUs);

        vm.currentPage = 1;
        $scope.changePage = function (page) {
            vm.currentPage = page;
            refreshSKUs();
        }
        function confirmationDelete(model) {

                        var updateObj = new SKUResource();
            updateObj.skuId = model.skuId;
            updateObj.$delete({ skuId: model.skuId }).then(
                function (data, status) {
                    refreshSKUs();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('DeletedSuccessfully'), "success");
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }

        vm.openDeleteDialog = function (model, titles, skuId) {

            var modalContent = $uibModal.open({
                templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
                controller: 'confirmDeleteDialogController',
                controllerAs: 'deleteDlCtrl',
                resolve: {
                    model: function () { return model },
                    itemName: function () { return titles },
                    itemId: function () { return skuId },
                    message: function () { return null },
                    callBackFunction: function () { return confirmationDelete }
                }

            });
        }

                function change(sku, isDeleted) {
            var updateObj = new SKUResource();
            updateObj.skuId = sku.skuId;
            if (!isDeleted)
                updateObj.status = (sku.status == true ? false : true);
            updateObj.isDeleted = sku.isDeleted;

            updateObj.$update().then(
                function (data, status) {
                    if (isDeleted)
                        refreshSKUs();

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    sku.status = updateObj.status;

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );

        }

                vm.ChangeSKYStatus = function (model) {

                        var updateObj = new SKUResource();
            updateObj.skuId = model.skuId;
            updateObj.status = (model.isActive == true ? false : true);
            updateObj.$ChangeSKYStatus({ skuId: model.skuId, status: updateObj.status }).then(
                function (data, status) {
                    if (data.isSuccsess) {
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                        refreshSKUs();
                        $state.go('SKU');
                    }
                    else {
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    }

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
            return;
        }


                function refreshSKUs() {
            blockUI.start("Loading...");

            var k = SKUResource.getAllSKUs({ page: vm.currentPage }).$promise.then(function (result) {
                $scope.SKUs = result.results;
                blockUI.stop();

            },

                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }
        blockUI.stop();
    }

})();
(function () {
    angular
        .module('home')
        .factory('SKUResource', ['$resource', 'appCONSTANTS', SKUResource])

    function SKUResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL , {}, {
            getAllSKUs: { method: 'GET', url: appCONSTANTS.API_URL + 'SKU/GetAllSKU',useToken: true, params: { lang: '@lang' } },
            create: { method: 'POST', url: appCONSTANTS.API_URL + 'SKU/CreateSKU',useToken: true, params: { lang: '@lang' } },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'SKU/UpdateSKU', useToken: true },
            getSKU: { method: 'GET', url: appCONSTANTS.API_URL + 'SKU/GetSKUById/:skuId', useToken: true },
            GenerateNewSKUCode: { method: 'GET', url: appCONSTANTS.API_URL + 'SKU/GenerateNewSKUCode', useToken: true },
            ChangeSKYStatus: { method: 'POST', url: appCONSTANTS.API_URL  + 'SKU/ChangeSKUStatus/:skuId/:status', useToken: true},
            delete: { method: 'DELETE', url: appCONSTANTS.API_URL + 'SKU/DeleteSKU/:skuId', useToken: true },


        })
    }


     }());
(function () {
    'use strict';

    angular
        .module('home')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('SKU', {
                    url: '/SKU',
                    templateUrl: './app/GlobalAdmin/Sku/templates/SKU.html',
                    controller: 'SKUController',
                    'controllerAs': 'SKUCtrl',
                    resolve: {
                        SKUPrepService: SKUPrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('newSKU', {
                    url: '/newSKU',
                    templateUrl: './app/GlobalAdmin/Sku/templates/new.html',
                    controller: 'createSKUDialogController',
                    'controllerAs': 'newSKUCtrl',
                    resolve: {
                        GeneratCodePrepService: GeneratCodePrepService
                    },

                                        data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }


                })
                .state('editSKU', {
                    url: '/editSKU/:skuId',
                    templateUrl: './app/GlobalAdmin/Sku/templates/edit.html',
                    controller: 'editSKUDialogController',
                    'controllerAs': 'editSKUCtrl',
                    resolve: {
                        SKUByIdPrepService: SKUByIdPrepService
                    },
                    data: {
                        permissions: {
                            only: ['4'],
                            redirectTo: 'root'
                        }
                    }

                })
        });

    SKUPrepService.$inject = ['SKUResource']
    function SKUPrepService(SKUResource) {
        return SKUResource.getAllSKUs().$promise;
    }
    GeneratCodePrepService.$inject = ['SKUResource', '$stateParams']
    function GeneratCodePrepService(SKUResource, $stateParams) {
        return SKUResource.GenerateNewSKUCode().$promise;
    }
    SKUByIdPrepService.$inject = ['SKUResource', '$stateParams']
    function SKUByIdPrepService(SKUResource, $stateParams) {
        return SKUResource.getSKU({ skuId: $stateParams.skuId }).$promise;
    }

}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('createSKUDialogController', ['blockUI', '$state', 'appCONSTANTS', '$translate',
            'SKUResource', 'ToastService', 'GeneratCodePrepService', createSKUDialogController])

    function createSKUDialogController(blockUI, $state, appCONSTANTS, $translate, SKUResource,
        ToastService, GeneratCodePrepService) {
        blockUI.start("Loading...");
        var vm = this;
        vm.code = GeneratCodePrepService.id;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.close = function () {
            $state.go('SKU');
        }

        vm.AddNewSKU = function () {
            blockUI.start("Loading...");
            var newObj = new SKUResource();
            newObj.titles = vm.titles;
            newObj.isBasic = vm.isBasic;
            newObj.code = vm.code;
            newObj.$create().then(
                function (data, status) {
                    blockUI.stop();
                    if (data.isSuccsess) {
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");
                        $state.go('SKU');
                    }
                    else {
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    }

                },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.data, "error");
                }
            );
        }
        blockUI.stop();

    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('editSKUDialogController', ['blockUI', '$http', '$state', 'appCONSTANTS', '$translate', 'SKUResource', 'ToastService',
            'SKUByIdPrepService', '$stateParams', editSKUDialogController])

    function editSKUDialogController(blockUI, $http, $state, appCONSTANTS, $translate, SKUResource, ToastService,
        SKUByIdPrepService, $stateParams) {
        blockUI.start("Loading...");


                var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.sku = SKUByIdPrepService;
        console.log(vm.sku.titles);

        vm.Close = function () {
            $state.go('SKU');
        }
        vm.UpdateSKU = function () {

                        blockUI.start("Loading...");
            var updateObj = new SKUResource();
            updateObj.skuId = vm.sku.skuId;
            updateObj.titles = vm.sku.titles;
            updateObj.isBasic = vm.sku.isBasic;
            updateObj.code = vm.sku.code;
            updateObj.$update().then(
                function (data, status) {
                    blockUI.stop();
                    if (data.isSuccsess) {
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");

                        $state.go('SKU');
                    }
                    else
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");


                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        blockUI.stop();

    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('createDistributorZoneController', ['blockUI','$translate', '$uibModal', 'appCONSTANTS', '$scope', 'ZoneResource', 'getDistributorZonePrepService',
            'ToastService', createDistributorZoneController]);


    function createDistributorZoneController(blockUI,$translate, $uibModal, appCONSTANTS, $scope, ZoneResource, getDistributorZonePrepService, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[3].children[0]).addClass("active")

        blockUI.start("Loading...");

        var vm = this;
        vm.appCONSTANTS = appCONSTANTS;
        vm.currentPage = 1;

                vm.totalCount = getDistributorZonePrepService.totalCount;
        vm.DistributorZoneList = getDistributorZonePrepService.results;
        $scope.DistributorZones = getDistributorZonePrepService;
        console.log(getDistributorZonePrepService);
        console.log($scope.DistributorZones)
        function refreshDistributorZones() {
            blockUI.start("Loading...");
            var k = ZoneResource.getDistributorZone({ page: vm.currentPage }).$promise.then(function (results) {
                $scope.DistributorZones = results;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshDistributorZones();
        }
        blockUI.stop();

    }


})();
(function () {
    'use strict';

    angular
        .module('home')
        .controller('createRetailerZoneController', ['blockUI','$translate', '$uibModal', 'appCONSTANTS', '$scope', 'ZoneResource', 'getRetailerZonePrepService',
            'ToastService', createRetailerZoneController]);


    function createRetailerZoneController(blockUI,$translate, $uibModal, appCONSTANTS, $scope, ZoneResource, getRetailerZonePrepService, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[3].children[0]).addClass("active")

        blockUI.start("Loading...");

         var vm = this;
        vm.appCONSTANTS = appCONSTANTS;
        vm.currentPage = 1;

                vm.totalCount = getRetailerZonePrepService.totalCount;
        vm.RetailerZoneList = getRetailerZonePrepService.results;
        $scope.RetailerZones = getRetailerZonePrepService;
        console.log(getRetailerZonePrepService);
        console.log($scope.RetailerZones)
        function refreshRetailerZones() {
            blockUI.start("Loading...");
            var k = ZoneResource.getRetailerZone({ page: vm.currentPage }).$promise.then(function (results) {
                $scope.RetailerZones = results;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }
        vm.filterRetailer = function (searchText, page) {

                        refreshRetailer(searchText, page);
            vm.searchText = "";
          }
        function refreshRetailer(searchTitle, page) {
            blockUI.start("Loading...");
            var k = ZoneResource.getRetailer({ productId: $stateParams.productId, description: searchTitle, page: page }).$promise.then(function (results) {
              vm.retailers.entities = results.results;
              vm.retailerTotalCount = results.totalCount;
              blockUI.stop();
            },
              function (data, status) {
                blockUI.stop();
                ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
              });
          }

        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshRetailerZones();
        }
        blockUI.stop();

    }

})();
(function () {
    'use strict';

    angular
        .module('home')
        .controller('ZoneController', ['blockUI','$translate', '$uibModal', 'appCONSTANTS', '$scope', 'ZoneResource', 'ZonePrepService',
            'ToastService', ZoneController]);


    function ZoneController(blockUI,$translate, $uibModal, appCONSTANTS, $scope, ZoneResource, ZonePrepService, ToastService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[9].children[0]).addClass("active")

        blockUI.start("Loading...");

        var vm = this;
        vm.appCONSTANTS = appCONSTANTS;
        $scope.totalCount = ZonePrepService.totalCount;
        $scope.Zones = ZonePrepService;
        console.log($scope.Zones)

                function confirmationDelete(model) {
            var updateObj = new ZoneResource();
            updateObj.id = model.ZoneId;
            updateObj.$delete({ id: model.ZoneId }).then(
                function (data, status) {
                    if (data.isSuccsess) {
                        refreshZones();
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    }
                    else {
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    }
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

        function refreshZones() {
            blockUI.start("Loading...");
            var k = ZoneResource.getAllZones({ page: vm.currentPage }).$promise.then(function (results) {
                $scope.Zones = results;
                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }
        vm.ChangeStatus = function (model) {

                      var updateObj = new ZoneResource();
            updateObj.ZoneId = model.ZoneId;
            updateObj.status = (model.isActive == true ? false : true);
            updateObj.$changeStatus({ ZoneId: model.ZoneId, status: updateObj.status }).then(
                function (data, status) {
                    refreshZones();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    updateObj.status = model.isActive;
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
            return;
        }
        vm.currentPage = 1;
        $scope.changePage = function (page) {
            vm.currentPage = page;
            refreshZones();
        }
        blockUI.stop();

    }

})();
(function () {
    angular
        .module('home')
        .factory('ZoneResource', ['$resource', 'appCONSTANTS', ZoneResource])

    function ZoneResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Zone/CreateZone', {}, {
            getAllZones: { method: 'GET', url: appCONSTANTS.API_URL + 'Zone/GetAllZones', useToken: true, params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'Zone/UpdateZone', useToken: true },
            delete: { method: 'DELETE', url: appCONSTANTS.API_URL + 'Zone/DeleteZone/:id', useToken: true },
            getZone: { method: 'GET', url: appCONSTANTS.API_URL + 'Zone/GetZoneById/:zoneId', useToken: true },
            generateNewZoneCode: { method: 'GET', url: appCONSTANTS.API_URL + 'Zone/GenerateNewZoneCode', useToken: true },
            getZoneDetails: { method: 'GET', url: appCONSTANTS.API_URL + 'Zone/GetAllZoneDetialsByZoneId/:produdctId ', useToken: true },
            getDistributorZone: { method: 'GET', url: appCONSTANTS.API_URL + 'Distributor/Search', useToken: true },
            getRetailerZone: { method: 'GET', url: appCONSTANTS.API_URL + 'Retailer/Search', useToken: true },

        })
    }

}());
(function () {
    'use strict';

    angular
        .module('home')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('Zone', {
                    url: '/Zone',
                    templateUrl: './app/GlobalAdmin/Zone/templates/Zone.html',
                    controller: 'ZoneController',
                    'controllerAs': 'ZoneCtrl',
                    resolve: {
                        ZonePrepService: ZonePrepService
                    },
                    data: {
                        permissions: {
                            only: ['13'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('newZone', {
                    url: '/newZone',
                    templateUrl: './app/GlobalAdmin/Zone/templates/new.html',
                    controller: 'createZoneDialogController',
                    'controllerAs': 'newZoneCtrl',
                    resolve: {
                        CategoryPrepService: CategoryPrepService,
                        ZoneNewCodePrepService: ZoneNewCodePrepService
                    },
                    data: {
                        permissions: {
                            only: ['13'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editZone', {
                    url: '/editZone/:id',
                    templateUrl: './app/GlobalAdmin/Zone/templates/edit.html',
                    controller: 'editZoneDialogController',
                    'controllerAs': 'editZoneCtrl',
                    resolve: {
                        CategoryPrepService: CategoryPrepService,
                    },
                    data: {
                        permissions: {
                            only: ['13'],
                            redirectTo: 'root'
                        }
                    }

                })

                                .state('CreateMap', {
                    url: '/CreateMap/:zoneId',
                    templateUrl: './app/GlobalAdmin/Zone/templates/newMap.html',
                    controller: 'zoneMapController',
                    'controllerAs': 'zoneMapCtrl',
                    resolve: { 
                        ZoneByIdPrepService: ZoneByIdPrepService
                    },
                    data: {
                        permissions: {
                            only: ['13'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('ZoneDetails', {
                    url: '/ZoneDetails/:produdctId',
                    templateUrl: './app/GlobalAdmin/Zone/templates/ZoneDetails.html',
                    controller: 'ZoneDetailsController',
                    'controllerAs': 'ZoneDetailsCtrl',
                    resolve: {
                        ZoneDetaqilsByZoneIdPrepService: ZoneDetaqilsByZoneIdPrepService
                    },
                    data: {
                        permissions: {
                            only: ['13'],
                            redirectTo: 'root'
                        }
                    }

                })

                                .state('newZoneDetails', {
                    url: '/newZoneDetails/:produdctId',
                    templateUrl: './app/GlobalAdmin/Zone/templates/NewZoneDetailsDialog.html',
                    controller: 'createZoneDetailsDialog',
                    'controllerAs': 'createZoneDetailsDialoglCtrl',
                    resolve: {
                        SKUConversionPrepService: SKUConversionPrepService
                    },
                    data: {
                        permissions: {
                            only: ['13'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('RetailerZone', {
                    url: '/RetailerZone',
                    templateUrl: './app/GlobalAdmin/Zone/templates/RetailerZone.html',
                    controller: 'createRetailerZoneController',
                    'controllerAs': 'createRetailerZoneCtrl',
                    resolve: {
                        getRetailerZonePrepService: getRetailerZonePrepService
                    },
                    data: {
                        permissions: {
                            only: ['19'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('DistributorZone', {
                    url: '/DistributorZone',
                    templateUrl: './app/GlobalAdmin/Zone/templates/DistributorZone.html',
                    controller: 'createDistributorZoneController',
                    'controllerAs': 'createDistributorZoneCtrl',
                    resolve: {
                        getDistributorZonePrepService: getDistributorZonePrepService
                    },
                    data: {
                        permissions: {
                            only: ['19'],
                            redirectTo: 'root'
                        }
                    }

                })
        });

    ZonePrepService.$inject = ['ZoneResource']
    function ZonePrepService(ZoneResource) {
        return ZoneResource.getAllZones().$promise;
    }

    ZoneByIdPrepService.$inject = ['ZoneResource', '$stateParams']
    function ZoneByIdPrepService(ZoneResource, $stateParams) {
        return ZoneResource.getZone({ zoneId: $stateParams.zoneId }).$promise;
    }

    ZoneDetaqilsByZoneIdPrepService.$inject = ['ZoneResource', '$stateParams']
    function ZoneDetaqilsByZoneIdPrepService(ZoneResource, $stateParams) {
        return ZoneResource.getZoneDetails({ produdctId: $stateParams.produdctId }).$promise;
    }
    getDistributorZonePrepService.$inject = ['ZoneResource', '$stateParams']
    function getDistributorZonePrepService(ZoneResource, $stateParams) {
        return ZoneResource.getDistributorZone({forTenant:true}).$promise;
    }
    getRetailerZonePrepService.$inject = ['ZoneResource', '$stateParams']
    function getRetailerZonePrepService(ZoneResource, $stateParams) {
        return ZoneResource.getRetailerZone({forTenant:true}).$promise;
    }


        ZoneNewCodePrepService.$inject = ['ZoneResource', '$stateParams']
    function ZoneNewCodePrepService(ZoneResource, $stateParams) {
        return ZoneResource.generateNewZoneCode().$promise;
    }

     SKUConversionPrepService.$inject = ['ZoneResource']
    function SKUConversionPrepService(ZoneResource) {
        return ZoneResource.getAllSKUConversion().$promise;
    }

    CategoryPrepService.$inject = ['CategoryResource']
    function CategoryPrepService(CategoryResource) {
        return CategoryResource.getAllActiveCategories().$promise;
    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('createZoneDialogController', ['CountryResource', 'GovernrateResource', 'CityResource', 'blockUI', '$rootScope', '$state', 'appCONSTANTS', '$translate',
            'ZoneResource', 'ZoneNewCodePrepService', 'ToastService', createZoneDialogController])

    function createZoneDialogController(CountryResource, GovernrateResource, CityResource, blockUI, $rootScope, $state, appCONSTANTS, $translate, ZoneResource,
        ZoneNewCodePrepService, ToastService) {

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
        vm.selectedCityId = 0;
        vm.language = appCONSTANTS.supportedLanguage;
        vm.zoneCode = ZoneNewCodePrepService.id;

        vm.AddNewZone = function () {

                        getCordinatesOfPoly();
            blockUI.start("Loading...");
            var newObj = new ZoneResource();
            newObj.titles = vm.titles;
            newObj.cityId = vm.selectedCityId;
            newObj.governrateId = vm.selectedGovernrateId;
            newObj.zoneCode = vm.zoneCode;
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
    vm.countries.push({ id: 0, titles: { "en-uk": "Select Country", "ar-eg": "اختار بلد" } });
    vm.selectedCountryId = 0;
    console.log(vm.countries);
    CountryResource.getAllCountries().$promise.then(function (results) {

      vm.countries = vm.countries.concat(results.results);
      console.log(vm.countries);
    },
      function (data, status) {
        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
      });
    vm.resetDLL = function () {
      vm.countries = [];
      vm.countries.push({ id: 0, titles: { "en-uk": "Select Country", "ar-eg": "اختار بلد" } });
      vm.selectedCountryId = 0;
      vm.countries = vm.countries.concat(CountriesPrepService.results)
      vm.Governrates = [];
      vm.cities = [];
      vm.categoryList = [];
    }
    vm.countryChange = function () {

            vm.Governrates = [];
      vm.cities = [];
      vm.Governrates.push({ id: 0, titles: { "en-uk": "Select Governrate", "ar-eg": "اختار اقليم" } });
      GovernrateResource.GetAllActiveGovernrates({ countryId: vm.selectedCountryId }).$promise.then(function (results) {
    vm.selectedCountryId = 1;
    vm.countries[1];
        vm.Governrates = vm.Governrates.concat(results);
        console.log(vm.Governrates);

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
        vm.cities.push({ id: 0, titles: { "en-uk": "Select City", "ar-eg": "اختار مدينة" } });
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








        function showArrays(event) {
            var vertices = this.getPath();

            var contentString = '<b>Bermuda Triangle polygon</b><br>' +
                'Clicked location: <br>' + event.latLng.lat() + ',' + event.latLng.lng() +
                '<br>';

            for (var i = 0; i < vertices.getLength(); i++) {
                var xy = vertices.getAt(i);
                contentString += '<br>' + 'Coordinate ' + i + ':<br>' + xy.lat() + ',' +
                    xy.lng();
            }

            infoWindow.setContent(contentString);
            infoWindow.setPosition(event.latLng);

            infoWindow.open(map);
        }

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









    }
}());
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
            if (vm.selectedGovernrateId != undefined) {
                for (var i = vm.Governrates.length - 1; i >= 0; i--) {
                    if (vm.Governrates[i].id == 0) {
                        vm.Governrates.splice(i, 1);
                    }
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



            map.addListener('click', function (event) {
                addMarker(event.latLng);
            });
            infoWindow = new google.maps.InfoWindow;


        }

        function showArrays(event) {
            var vertices = this.getPath();

            var contentString = '<b>Bermuda Triangle polygon</b><br>' +
                'Clicked location: <br>' + event.latLng.lat() + ',' + event.latLng.lng() +
                '<br>';

            for (var i = 0; i < vertices.getLength(); i++) {
                var xy = vertices.getAt(i);
                contentString += '<br>' + 'Coordinate ' + i + ':<br>' + xy.lat() + ',' +
                    xy.lng();
            }

            infoWindow.setContent(contentString);
            infoWindow.setPosition(event.latLng);

            infoWindow.open(map);
        }

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









    }
}());
(function () {
    'use strict';

    angular
        .module('home')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('newZoneRelation', {
                    url: '/newZoneRelation/:zoneId',
                    templateUrl: './app/GlobalAdmin/ZoneRelation/templates/new.html',
                    controller: 'createZoneRelationDialogController',
                    'controllerAs': 'newZoneRelationCtrl',
                    resolve: {
                        ActiveDistributersPrepService: ActiveDistributersPrepService,
                        ActiveRetailersPrepService: ActiveRetailersPrepService,
                        ActiveProductsPrepService: ActiveProductsPrepService
                    },
                    data: {
                        permissions: {
                            only: ['13'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editZoneRelation', {
                    url: '/editZoneRelation/:zoneId',
                    templateUrl: './app/GlobalAdmin/ZoneRelation/templates/editZone.html',
                    controller: 'editZoneRelationController',
                    'controllerAs': 'editZoneRelationCtrl',
                    resolve: {
                        ActiveDistributersPrepService: ActiveDistributersPrepService,
                        ZoneDistributerPrepService: ZoneDistributerPrepService,
                        ActiveRetailersPrepService: ActiveRetailersPrepService,
                        ActiveProductsPrepService: ActiveProductsPrepService,
                        ZoneByIdPrepService: ZoneByIdPrepService
                    },
                    data: {
                        permissions: {
                            only: ['13'],
                            redirectTo: 'root'
                        }
                    }

                })

                .state('zoneRelationDetails', {
                    url: '/zoneRelationDetails/:zoneId',
                    templateUrl: './app/GlobalAdmin/ZoneRelation/templates/ZoneDetails.html',
                    controller: 'zoneRelationDetailsController',
                    'controllerAs': 'zoneRelationDetailsCtrl',
                    resolve: {
                        ActiveDistributersPrepService: ActiveDistributersPrepService,
                        ZoneDistributerPrepService: ZoneDistributerPrepService,
                        SelectedRetailersPrepService: SelectedRetailersPrepService,
                        SelectedProductsPrepService: SelectedProductsPrepService,
                        ZoneByIdPrepService: ZoneByIdPrepService
                    },
                    data: {
                        permissions: {
                            only: ['13'],
                            redirectTo: 'root'
                        }
                    }

                })
        });



    ZoneByIdPrepService.$inject = ['ZoneResource', '$stateParams']
    function ZoneByIdPrepService(ZoneResource, $stateParams) {
        return ZoneResource.getZone({ zoneId: $stateParams.zoneId }).$promise;
    }
    ZoneRelationByIdPrepService.$inject = ['ZoneRelationResource', '$stateParams']
    function ZoneRelationByIdPrepService(ZoneRelationResource, $stateParams) {
        return ZoneRelationResource.getZoneRelation({ zoneId: $stateParams.zoneId }).$promise;
    }


    ActiveRetailersPrepService.$inject = ['ZoneRelationResource', '$stateParams']
    function ActiveRetailersPrepService(ZoneRelationResource, $stateParams) {
        return ZoneRelationResource.getZoneRetailer({ zoneId: $stateParams.zoneId }).$promise;
    }
    SelectedRetailersPrepService.$inject = ['ZoneRelationResource', '$stateParams']
    function SelectedRetailersPrepService(ZoneRelationResource, $stateParams) {
        return ZoneRelationResource.getZoneRetailer({ zoneId: $stateParams.zoneId, isChecked: true }).$promise;
    }

    SelectedProductsPrepService.$inject = ['ZoneRelationResource', '$stateParams']
    function SelectedProductsPrepService(ZoneRelationResource, $stateParams) {
        return ZoneRelationResource.getZoneProduct({ zoneId: $stateParams.zoneId , isChecked: true}).$promise;
    }
    ActiveProductsPrepService.$inject = ['ZoneRelationResource', '$stateParams']
    function ActiveProductsPrepService(ZoneRelationResource, $stateParams) {
        return ZoneRelationResource.getZoneProduct({ zoneId: $stateParams.zoneId }).$promise;
    }

    ZoneDistributerPrepService.$inject = ['ZoneRelationResource', '$stateParams']
    function ZoneDistributerPrepService(ZoneRelationResource, $stateParams) {
        return ZoneRelationResource.getDistributor({ zoneId: $stateParams.zoneId }).$promise;
    }
    ActiveDistributersPrepService.$inject = ['DistributorsResource']
    function ActiveDistributersPrepService(DistributorsResource) {
        return DistributorsResource.GetAllActiveDistributers().$promise;
    }
}());
(function () {
    angular
        .module('home')
        .factory('ZoneRelationResource', ['$resource', 'appCONSTANTS', ZoneRelationResource])

    function ZoneRelationResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL, {}, {
            getDistributor: { method: 'GET', url: appCONSTANTS.API_URL + 'Relation/GetDistributorZone/:zoneId', useToken: true },
            setDistributor: { method: 'POST', url: appCONSTANTS.API_URL + 'Relation/SetDistributor/:zoneId/:distributorId', useToken: true, params: { lang: '@lang' } },

            getZoneRetailer: { method: 'GET', url: appCONSTANTS.API_URL + 'Relation/GetZoneRetailer/:zoneId', useToken: true },
            zoneRetailerStatus: { method: 'POST', url: appCONSTANTS.API_URL + 'Relation/ZoneRetailerStatus/:zoneId/:zoneRetailerId/:status', useToken: true },

            getZoneProduct: { method: 'GET', url: appCONSTANTS.API_URL + 'Relation/GetZoneProduct/:zoneId', useToken: true },
            zoneProductStatus: { method: 'POST', url: appCONSTANTS.API_URL + 'Relation/ZoneProductStatus/:zoneId/:zoneProductId/:status', useToken: true },

        })
    }

}());
(function () {
  angular.module('home')
    .controller("createZoneRelationDialogController", ['ActiveProductsPrepService', 'ActiveDistributersPrepService', 'ActiveRetailersPrepService', '$stateParams', '$scope', 'ZoneRelationResource',
      'appCONSTANTS', 'ToastService', '$translate', 'blockUI', '$state', createZoneRelationDialogController]);

  function createZoneRelationDialogController(ActiveProductsPrepService, ActiveDistributersPrepService, ActiveRetailersPrepService, $stateParams, $scope, ZoneRelationResource,
    appCONSTANTS, ToastService, $translate, blockUI, $state) {
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
    vm.selectedDistributerId = 0;


    vm.products.allProductSelected = true;
    vm.products.entities = ActiveProductsPrepService.results;
    vm.productTotalCount = ActiveProductsPrepService.totalCount;
    initSelectAllProduct();

    vm.selectProduct = function (product) {

            ChangeProductStatus(product)

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
      }
    }

    function refreshProduct(searchTitle, page,isChecked) {
      blockUI.start("Loading...");
      var k = ZoneRelationResource.getZoneProduct({ zoneId: $stateParams.zoneId, description: searchTitle,isChecked: isChecked,  page: page }).$promise.then(function (results) {
        vm.products.entities = results.results;
        vm.productTotalCount = results.totalCount;
        blockUI.stop();
      },
        function (data, status) {
          blockUI.stop();
          ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
        });
    }

    vm.changeProductPage = function (page, isChecked) {
      vm.currentProductPage = page;
      refreshProduct("", page, isChecked);
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


    vm.retailers.allRetailerSelected = true;

    vm.retailers.entities = ActiveRetailersPrepService.results;
    vm.retailerTotalCount = ActiveRetailersPrepService.totalCount;
    iniSelectAllRetailers();

    vm.selectRetailer = function (retailer) {

      ChangeRetailerStatus(retailer)
      for (var i = 0; i < vm.retailers.entities.length; i++) {
        if (!vm.retailers.entities[i].isChecked) {
          vm.retailers.allRetailerSelected = false;
          return;
        }
      }

      vm.retailers.allRetailerSelected = true;
    };

    vm.selectAllRetailer = function () {
      iniSelectAllRetailers();
    };
    vm.filterRetailer = function (searchText, page, isChecked) {

            refreshRetailer(searchText, page, isChecked);
      vm.searchText = "";
    }
    function iniSelectAllRetailers() {
      for (var i = 0; i < vm.retailers.entities.length; i++) {
        if (!vm.selectedRetailer.includes(vm.retailers.entities[i].retailerId)) {
          vm.selectedRetailer.push(vm.retailers.entities[i].retailerId);
        } else {
          var index = vm.selectedRetailer.indexOf(vm.retailers.entities[i].retailerId);
          vm.selectedRetailer.splice(index, 1);
        }
      }
    }

    function refreshRetailer(searchTitle, page, isChecked) {
      blockUI.start("Loading...");
      var k = ZoneRelationResource.getZoneRetailer({ zoneId: $stateParams.zoneId, title: searchTitle,isChecked:isChecked, page: page }).$promise.then(function (results) {
        vm.retailers.entities = results.results;
        vm.retailerTotalCount = results.totalCount;
        blockUI.stop();
      },
        function (data, status) {
          blockUI.stop();
          ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
        });
    }

    vm.changeRetailerPage = function (page, isChecked) {
      vm.currentRetailerPage = page;
      refreshRetailer("", page, isChecked);
    }
    function ChangeRetailerStatus(model) {

            var updateObj = new ZoneRelationResource();
      updateObj.$zoneRetailerStatus({ zoneId: $stateParams.zoneId, zoneRetailerId: model.zoneRetailerRelationId, status: model.isChecked }).then(
        function (data, status) {
          blockUI.stop();
          if (data.isSuccsess) {
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

    vm.steps = [
      {
        step: 1,
        name:  $translate.instant('ChooseDistributer'),
        template: "./app/GlobalAdmin/ZoneRelation/templates/step1.html"
      },
      {
        step: 2,
        name:  $translate.instant('ChooseRetailer'),
         template: "./app/GlobalAdmin/ZoneRelation/templates/step2.html"
      },
      {
        step: 3,
        name:  $translate.instant('ChooseProduct'),
        template: "./app/GlobalAdmin/ZoneRelation/templates/step3.html"
      },
    ];

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


})();(function () {
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


    vm.products.allProductSelected = true;
    vm.products.entities = ActiveProductsPrepService.results;
    vm.productTotalCount = ActiveProductsPrepService.totalCount;
    initSelectAllProduct();

    vm.selectProduct = function (product) {

            ChangeProductStatus(product)

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


    vm.retailers.allRetailerSelected = true;

    vm.retailers.entities = ActiveRetailersPrepService.results;
    vm.retailerTotalCount = ActiveRetailersPrepService.totalCount;
    iniSelectAllRetailers();

    vm.selectRetailer = function (retailer) {

      ChangeRetailerStatus(retailer)
      for (var i = 0; i < vm.retailers.entities.length; i++) {
        if (!vm.retailers.entities[i].isChecked) {
          vm.retailers.allRetailerSelected = false;
          return;
        }
      }

      vm.retailers.allRetailerSelected = true;
    };

    vm.selectAllRetailer = function () {
      iniSelectAllRetailers();
    };
    vm.filterRetailer = function (searchText, page, isChecked) {

            refreshRetailer(searchText, page, isChecked);
      vm.searchText = "";
    }
    function iniSelectAllRetailers() {
      for (var i = 0; i < vm.retailers.entities.length; i++) {
        if (!vm.selectedRetailer.includes(vm.retailers.entities[i].retailerId)) {
          vm.selectedRetailer.push(vm.retailers.entities[i].retailerId);
        } else {
          var index = vm.selectedRetailer.indexOf(vm.retailers.entities[i].retailerId);
          vm.selectedRetailer.splice(index, 1);
        }
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


})();(function () {
  angular.module('home')
    .controller("zoneRelationDetailsController", ['SelectedProductsPrepService', 'ActiveDistributersPrepService', 'ZoneDistributerPrepService', 'SelectedRetailersPrepService', '$stateParams', '$scope', 'ZoneRelationResource',
      'appCONSTANTS', 'ToastService', '$translate', 'blockUI', '$state', 'ZoneByIdPrepService', zoneRelationDetailsController]);

  function zoneRelationDetailsController(SelectedProductsPrepService, ActiveDistributersPrepService, ZoneDistributerPrepService, SelectedRetailersPrepService, $stateParams, $scope, ZoneRelationResource,
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


    vm.products.allProductSelected = true;
    vm.products.entities = SelectedProductsPrepService.results;
    vm.productTotalCount = SelectedProductsPrepService.totalCount;
    initSelectAllProduct();

    vm.selectProduct = function (product) {

            ChangeProductStatus(product)

    };

    vm.selectAllProduct = function () {
      initSelectAllProduct();
    };
    vm.filterProduct = function (searchText, page) {
      refreshProduct(searchText, page);
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
      }
    }

    function refreshProduct(searchTitle, page) {
      blockUI.start("Loading...");
      var k = ZoneRelationResource.getZoneProduct({ zoneId: $stateParams.zoneId, description: searchTitle, page: page }).$promise.then(function (results) {
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
      refreshProduct("", page);
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


    vm.retailers.allRetailerSelected = true;

    vm.retailers.entities = SelectedRetailersPrepService.results;
    vm.retailerTotalCount = SelectedRetailersPrepService.totalCount;
    iniSelectAllRetailers();

    vm.selectRetailer = function (retailer) {

      ChangeRetailerStatus(retailer)
      for (var i = 0; i < vm.retailers.entities.length; i++) {
        if (!vm.retailers.entities[i].isChecked) {
          vm.retailers.allRetailerSelected = false;
          return;
        }
      }

      vm.retailers.allRetailerSelected = true;
    };

    vm.selectAllRetailer = function () {
      iniSelectAllRetailers();
    };
    vm.filterRetailer = function (searchText, page) {

            refreshRetailer(searchText, page);
      vm.searchText = "";
    }
    function iniSelectAllRetailers() {
      for (var i = 0; i < vm.retailers.entities.length; i++) {
        if (!vm.selectedRetailer.includes(vm.retailers.entities[i].retailerId)) {
          vm.selectedRetailer.push(vm.retailers.entities[i].retailerId);
        } else {
          var index = vm.selectedRetailer.indexOf(vm.retailers.entities[i].retailerId);
          vm.selectedRetailer.splice(index, 1);
        }
      }
    }

    function refreshRetailer(searchTitle, page) {
      blockUI.start("Loading...");
      var k = ZoneRelationResource.getZoneRetailer({ zoneId: $stateParams.zoneId, title: searchTitle, page: page }).$promise.then(function (results) {
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
      refreshRetailer("", page);
    }
    function ChangeRetailerStatus(model) {

            var updateObj = new ZoneRelationResource();
      updateObj.$zoneRetailerStatus({ zoneId: $stateParams.zoneId, zoneRetailerId: model.zoneRetailerRelationId, status: model.isChecked }).then(
        function (data, status) {
          blockUI.stop();
          if (data.isSuccsess) {
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


})();(function () {
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