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
