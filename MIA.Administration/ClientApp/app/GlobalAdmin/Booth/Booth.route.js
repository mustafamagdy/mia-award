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
