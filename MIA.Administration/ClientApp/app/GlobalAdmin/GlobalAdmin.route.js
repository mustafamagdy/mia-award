(function () {
    'use strict';

    angular
        .module('home')
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                // user
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
                // Rple
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
                // News
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
                // Dashboard
                .state('Dashboard', {
                    url: '/Dashboard',
                    templateUrl: './app/GlobalAdmin/dashboard/templates/dashboard.html',
                    controller: 'dashboardController',
                    'controllerAs': 'dashboardCtrl',
                    resolve: {
                        //CountriesPrepService: CountriesPrepService,
                    },
                    data: {
                        permissions: {
                            only: ['10'],
                            redirectTo: 'root'
                        }
                    }
                })
                // Retailer
                .state('Retailer', {
                    url: '/Retailer',
                    templateUrl: './app/GlobalAdmin/Retailer/templates/Retailer.html',
                    controller: 'RetailerController',
                    'controllerAs': 'RetailerCtrl',
                    resolve: {
                        RetailerPrepService: RetailerPrepService,
                        RetailersPrepService: RetailersPrepService,
                        // RetailerEditIdPrepService:RetailerEditIdPrepService
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
                        // getRetailerPrepService:getRetailerPrepService,
                        // ContactTypePrepService :ContactTypePrepService 
                    },
                    data: {
                        permissions: {
                            only: ['13'],
                            redirectTo: 'root'
                        }
                    }

                })



                // Distributors
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
                // Manufacture
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


    /*User */
    userPrepService.$inject = ['UserResource']
    function userPrepService(UserResource) {
        return UserResource.getAllUsers().$promise;
    }

    EditUserPrepService.$inject = ['UserResource', '$stateParams']
    function EditUserPrepService(GetUserResource, $stateParams) {
        return GetUserResource.getUser({ userId: $stateParams.userId }).$promise;
    }
    /*Role */
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
    /*Area */
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

    /*Branch */
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

    /*News */
    NewsPrepService.$inject = ['NewsResource']
    function NewsPrepService(NewsResource) {
        return NewsResource.getAllCategories({pageNumber:1,pageSize :10}).$promise;
    }

    CategoriesPrepService.$inject = ['NewsResource']
    function CategoriesPrepService(NewsResource) {
        return NewsResource.getAllCategories().$promise;
    }
    // Item
    itemsssPrepService.$inject = ['GetItemsssResource']
    function itemsssPrepService(GetItemsssResource) {
        return GetItemsssResource.getAllItemsss().$promise;
    }

    NewsByIdPrepService.$inject = ['NewsResource', '$stateParams']
    function NewsByIdPrepService(NewsResource, $stateParams) {
        return NewsResource.getNews({ id: $stateParams.id }).$promise;
    }
    /*Items */
    itemsPrepService.$inject = ['GetItemsResource', '$stateParams']
    function itemsPrepService(GetItemsResource, $stateParams) {
        return GetItemsResource.getAllItems({ NewsId: $stateParams.newsId }).$promise;
    }

    itemPrepService.$inject = ['ItemResource', '$stateParams']
    function itemPrepService(ItemResource, $stateParams) {
        return ItemResource.getItem({ itemId: $stateParams.itemId }).$promise;
    }
    // City
    CityByIdPrepService.$inject = ['CityResource', '$stateParams']
    function CityByIdPrepService(CityResource, $stateParams) {
        return CityResource.getCity().$promise;
    }
    // Governrate
    GovernrateByIdPrepService.$inject = ['GovernrateResource', '$stateParams']
    function GovernrateByIdPrepService(GovernrateResource, $stateParams) {
        return GovernrateResource.getGovernrate().$promise;
    }
    GovernratesForUserPrepService.$inject = ['GovernrateResource', '$stateParams']
    function GovernratesForUserPrepService(GovernrateResource, $stateParams) {
        return GovernrateResource.getAllGovernratesForUser({ userId: $stateParams.userId }).$promise;
    }
    // Country
    CountriesPrepService.$inject = ['CountryResource']
    function CountriesPrepService(CountryResource) {
        return CountryResource.getAllCountries().$promise;
    }
    // cities
    CitiesForUserPrepService.$inject = ['CityResource', '$stateParams']
    function CitiesForUserPrepService(CityResource, $stateParams) {
        return CityResource.getAllCitiesForUser({ userId: $stateParams.userId }).$promise;
    }
    // area for user
    AreasForUserPrepService.$inject = ['AreaResource', '$stateParams']
    function AreasForUserPrepService(AreaResource, $stateParams) {
        return AreaResource.getAllAreasForUser({ userId: $stateParams.userId }).$promise;
    }
    UserRoleByIdPrepService.$inject = ['UserResource' , '$stateParams']
    function UserRoleByIdPrepService(UserResource , $stateParams) {
        return UserResource.getUserRole({ userId: $stateParams.userId }).$promise;
    }
    /*Manufacture */
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

    /*Distributor */
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

    /*Retailer */
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
}());