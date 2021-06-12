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
