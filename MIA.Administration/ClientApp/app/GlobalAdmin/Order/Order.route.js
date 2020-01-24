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
                        // OrderPrepService: OrderPrepService
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
